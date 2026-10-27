/* Build-time only. Public fixed city coordinates; never visitor coordinates. */
'use strict';
const fs=require('node:fs');
const path=require('node:path');
const selection=require('../entry-selection.js');
const CITIES=[
  {id:'sapporo',name:'札幌',latitude:43.0618,longitude:141.3545,weight:0.125},
  {id:'sendai',name:'仙台',latitude:38.2682,longitude:140.8694,weight:0.125},
  {id:'tokyo',name:'東京',latitude:35.6762,longitude:139.6503,weight:0.125},
  {id:'niigata',name:'新潟',latitude:37.9162,longitude:139.0364,weight:0.125},
  {id:'nagoya',name:'名古屋',latitude:35.1815,longitude:136.9066,weight:0.125},
  {id:'osaka',name:'大阪',latitude:34.6937,longitude:135.5023,weight:0.125},
  {id:'fukuoka',name:'福岡',latitude:33.5902,longitude:130.4017,weight:0.125},
  {id:'naha',name:'那覇',latitude:26.2124,longitude:127.6809,weight:0.125}
];
function forecastURL(){const u=new URL('https://api.open-meteo.com/v1/forecast');u.search=new URLSearchParams({latitude:CITIES.map(c=>c.latitude).join(','),longitude:CITIES.map(c=>c.longitude).join(','),daily:'temperature_2m_mean',timezone:'Asia/Tokyo',temperature_unit:'celsius',forecast_days:'2'});return u;}
function buildCache(payload,previous,now=new Date()){
  if(!Array.isArray(payload)||payload.length!==CITIES.length)throw new Error('Expected forecasts for all eight cities');
  const today=selection.context(now).date,days=[];
  for(let offset=0;offset<2;offset++){
    const date=new Date(Date.parse(today+'T00:00:00Z')+offset*86400000).toISOString().slice(0,10);
    const values=payload.map((city,i)=>{
      if(city.timezone!=='Asia/Tokyo'||city.daily_units?.temperature_2m_mean!=='°C'||Math.abs(city.latitude-CITIES[i].latitude)>0.5||Math.abs(city.longitude-CITIES[i].longitude)>0.5)throw new Error('Unexpected city, timezone or temperature unit');
      const position=city.daily?.time?.indexOf(date),value=position>=0?city.daily.temperature_2m_mean?.[position]:null;
      if(typeof value!=='number'||!Number.isFinite(value)||value < -60||value > 60)throw new Error('Missing or invalid temperature for '+date);
      return value;
    });
    // Freeze a published day's value: API model updates cannot reshuffle that day.
    const frozen=selection.dailyWeather(previous,date);
    days.push(frozen||{date,fetchedAt:now.toISOString(),cityCount:CITIES.length,cityMeanC:values,meanC:Number((values.reduce((a,b)=>a+b,0)/CITIES.length).toFixed(2))});
  }
  return {version:1,timezone:'Asia/Tokyo',unit:'celsius',description:'固定8都市の日平均気温予報の等重み平均。公式の全国平均・観測値ではありません。',source:{name:'Open-Meteo',url:'https://open-meteo.com/',license:'CC BY 4.0',licenseUrl:'https://creativecommons.org/licenses/by/4.0/',variable:'temperature_2m_mean',aggregation:'equal-weight mean of eight daily forecast means'},cityIds:CITIES.map(c=>c.id),cities:CITIES,days};
}
async function update(output=path.join(__dirname,'../data/entry-weather.json'),fetcher=fetch,now=new Date()){
  const previous=fs.existsSync(output)?JSON.parse(fs.readFileSync(output,'utf8')):null;
  const response=await fetcher(forecastURL(),{signal:AbortSignal.timeout(20000)});
  if(!response.ok)throw new Error('Open-Meteo HTTP '+response.status);
  const cache=buildCache(await response.json(),previous,now);
  fs.mkdirSync(path.dirname(output),{recursive:true});
  const temporary=output+'.tmp';fs.writeFileSync(temporary,JSON.stringify(cache,null,2)+'\n');fs.renameSync(temporary,output);
  return cache;
}
if(require.main===module)update().then(c=>console.log('Updated fixed-city forecast cache: '+c.days.map(d=>d.date).join(', '))).catch(error=>{console.error('Weather refresh failed; existing cache left untouched. '+error.message);process.exitCode=1;});
module.exports={CITIES,forecastURL,buildCache,update};
