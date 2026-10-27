/* Deterministic first-song selection; no storage, geolocation or playback side effects. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.ClassicaEntry=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const CITY_IDS=['sapporo','sendai','tokyo','niigata','nagoya','osaka','fukuoka','naha'];
  function context(now){
    const d=new Date(new Date(now).getTime()+9*60*60*1000);
    if(!Number.isFinite(d.getTime()))throw new Error('Invalid selection date');
    const hour=d.getUTCHours();
    return {date:d.toISOString().slice(0,10),weekday:d.getUTCDay(),hour,band:hour>=5&&hour<11?'morning':hour>=11&&hour<17?'day':hour>=17&&hour<21?'evening':'night'};
  }
  function temperatureBand(value){return typeof value!=='number'||!Number.isFinite(value)?null:value<10?'cold':value<20?'mild':value<28?'warm':'hot';}
  function dailyWeather(cache,date){
    if(cache?.version!==1||cache.timezone!=='Asia/Tokyo'||cache.unit!=='celsius'||cache.cityIds?.join(',')!==CITY_IDS.join(','))return null;
    const day=cache.days?.find(d=>d.date===date);
    if(!day||!Number.isFinite(day.meanC)||day.meanC < -60||day.meanC > 60||day.cityCount!==CITY_IDS.length)return null;
    if(!Array.isArray(day.cityMeanC)||day.cityMeanC.length!==CITY_IDS.length||day.cityMeanC.some(v=>typeof v!=='number'||!Number.isFinite(v)||v < -60||v > 60))return null;
    if(Math.abs(day.cityMeanC.reduce((a,b)=>a+b,0)/CITY_IDS.length-day.meanC)>0.011)return null;
    const fetched=Date.parse(day.fetchedAt),start=Date.parse(date+'T00:00:00+09:00');
    if(!Number.isFinite(fetched)||fetched<start-48*60*60*1000||fetched>=start+24*60*60*1000)return null;
    return day;
  }
  function hash(text){let h=2166136261;for(let i=0;i<text.length;i++){h^=text.charCodeAt(i);h=Math.imul(h,16777619);}return h>>>0;}
  function weight(song,ctx,temp){
    const mood=song.mood||[];let n=1;
    const preferred={morning:['穏やか','華やか'],day:['華やか','穏やか'],evening:['穏やか','切ない'],night:['夜','眠り']}[ctx.band];
    preferred.forEach((m,i)=>{if(mood.includes(m))n+=i===0?4:2;});
    if(mood.includes(ctx.weekday===0||ctx.weekday===6?'華やか':'穏やか'))n+=2;
    const extra={cold:'穏やか',mild:'華やか',warm:'穏やか',hot:'眠り'}[temp];
    if(extra&&mood.includes(extra))n+=2;
    return n;
  }
  function choose(songs,{now=new Date(),weather=null}={}){
    if(!songs.length)return null;
    const ctx=context(now),day=dailyWeather(weather,ctx.date),temp=temperatureBand(day?.meanC);
    // Keep the site's mellow entrance; dramatic pieces remain manually selectable.
    let candidates=songs.filter(s=>(s.mood||[]).some(m=>m==='穏やか'||m==='眠り'));
    if(!candidates.length)candidates=songs;
    const weights=candidates.map(s=>weight(s,ctx,temp)),total=weights.reduce((a,b)=>a+b,0);
    let pick=hash([ctx.date,ctx.weekday,ctx.band,temp||'no-weather'].join('|'))%total;
    let selected=candidates[candidates.length-1];
    for(let i=0;i<candidates.length;i++){pick-=weights[i];if(pick<0){selected=candidates[i];break;}}
    return {id:selected.id,...ctx,temperatureBand:temp,meanC:day?day.meanC:null};
  }
  function isGeneric(hash){return hash===''||hash==='#'||hash==='#/';}
  function index(songs,hash,selection){
    const match=hash.match(/^#\/song\/(.+)$/),explicit=match?songs.findIndex(s=>s.id===match[1]):-1;
    if(explicit>=0)return explicit;
    return isGeneric(hash)?Math.max(0,songs.findIndex(s=>s.id===selection?.id)):0;
  }
  async function loadWeather(fetcher,url='data/entry-weather.json',timeoutMs=1200){
    const controller=new AbortController();let timer;
    try{return await Promise.race([
      Promise.resolve().then(()=>fetcher(url,{cache:'no-cache',credentials:'omit',signal:controller.signal})).then(r=>{if(!r.ok)throw new Error('Weather cache unavailable');return r.json();}),
      new Promise(resolve=>{timer=setTimeout(()=>{controller.abort();resolve(null);},timeoutMs);})
    ]);}catch{return null;}finally{clearTimeout(timer);}
  }
  return {CITY_IDS,context,temperatureBand,dailyWeather,weight,choose,isGeneric,index,loadWeather};
});
