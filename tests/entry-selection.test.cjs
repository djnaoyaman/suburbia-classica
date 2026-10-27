'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),os=require('node:os'),path=require('node:path');
const entry=require('../entry-selection.js'),builder=require('../scripts/update-entry-weather.cjs');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
const songs=[{id:'calm',mood:['穏やか']},{id:'bright',mood:['穏やか','華やか']},{id:'night',mood:['夜','穏やか']},{id:'sleep',mood:['眠り']},{id:'dramatic',mood:['華やか']}];
const now=new Date('2026-10-28T00:00:00Z');
function payload(values=[10,11,12,13,14,15,16,17]){return builder.CITIES.map((c,i)=>({latitude:c.latitude,longitude:c.longitude,timezone:'Asia/Tokyo',daily_units:{temperature_2m_mean:'°C'},daily:{time:['2026-10-28','2026-10-29'],temperature_2m_mean:[values[i],values[i]]}}));}
const cache=builder.buildCache(payload(),null,now);
test('JST midnight, Sunday/Monday and every time-band boundary are independent of machine timezone',()=>{
  assert.equal(entry.context('2026-10-27T14:59:59Z').date,'2026-10-27');assert.equal(entry.context('2026-10-27T15:00:00Z').date,'2026-10-28');
  assert.equal(entry.context('2026-10-25T15:00:00Z').weekday,1);assert.equal(entry.context('2026-10-25T14:59:59Z').weekday,0);
  for(const [hour,band] of [[0,'night'],[4,'night'],[5,'morning'],[10,'morning'],[11,'day'],[16,'day'],[17,'evening'],[20,'evening'],[21,'night'],[23,'night']])assert.equal(entry.context(`2026-10-28T${String(hour).padStart(2,'0')}:00:00+09:00`).band,band);
});
test('explicit song links win; filters and unknown routes are not generically reselected',()=>{
  for(const hash of ['#/song/bright','#/song/night'])assert.equal(songs[entry.index(songs,hash,{id:'sleep'})].id,hash.slice(7));
  for(const hash of ['','#','#/'])assert.equal(entry.index(songs,hash,{id:'sleep'}),3);
  for(const hash of ['#/mood/夜','#/?mood=夜','#/timeline','#/song/missing'])assert.equal(entry.index(songs,hash,{id:'sleep'}),0);
  assert.match(fs.readFileSync(path.join(__dirname,'../songs/fur-elise.html'),'utf8'),/index\.html#\/song\/fur-elise/);
});
test('selection is stable in a date/band, varies across dates, stays within catalog and mellow entrance',()=>{
  const first=entry.choose(songs,{now,weather:cache});assert.equal(first.id,entry.choose(songs,{now:new Date('2026-10-28T01:59:59Z'),weather:cache}).id);
  const choices=new Set();for(let day=1;day<=28;day++){const choice=entry.choose(songs,{now:`2026-10-${String(day).padStart(2,'0')}T00:00:00Z`});assert.notEqual(choice.id,'dramatic');choices.add(choice.id);}assert.ok(choices.size>1);
});
test('weekday and temperature rules affect weights with exact threshold boundaries',()=>{
  const song=songs[1];assert.ok(entry.weight(song,{band:'night',weekday:6},null)>entry.weight({id:'a',mood:['穏やか']},{band:'night',weekday:6},null));
  assert.equal(entry.weight(song,{band:'day',weekday:1},'mild'),entry.weight(song,{band:'day',weekday:1},null)+2);
  for(const [temperature,band] of [[-10,'cold'],[9.9,'cold'],[10,'mild'],[19.9,'mild'],[20,'warm'],[27.9,'warm'],[28,'hot'],[0,'cold'],[null,null],[NaN,null],['20',null]])assert.equal(entry.temperatureBand(temperature),band);
});
test('all eight daily forecast means are equally weighted, never max/min averaged',()=>{
  assert.equal(cache.days[0].meanC,13.5);assert.equal(cache.days[0].cityCount,8);assert.equal(cache.cities.reduce((a,c)=>a+c.weight,0),1);
  assert.equal(new URL(builder.forecastURL()).searchParams.get('daily'),'temperature_2m_mean');assert.equal(new URL(builder.forecastURL()).searchParams.get('timezone'),'Asia/Tokyo');
});
test('missing/null city, units, shifted city and failed response cannot produce partial or zero-filled average',()=>{
  for(const mutate of [p=>p.pop(),p=>p[0].daily.temperature_2m_mean[0]=null,p=>p[0].daily_units.temperature_2m_mean='°F',p=>p[0].latitude=0,p=>p[0].daily.time[0]='2026-10-27']){const p=payload();mutate(p);assert.throws(()=>builder.buildCache(p,null,now));}
});
test('published day values freeze against subsequent API revisions',()=>{
  const updated=builder.buildCache(payload([30,30,30,30,30,30,30,30]),cache,new Date('2026-10-28T04:00:00Z'));assert.deepEqual(updated.days,cache.days);
});
test('missing, stale-date, bad timestamps and malformed weather fall back to date/time, not fake 0°C',()=>{
  const base=entry.choose(songs,{now});
  for(const mutate of [c=>c.days=[],c=>c.days[0].date='2026-10-27',c=>c.days[0].fetchedAt='2026-10-20T00:00:00Z',c=>c.days[0].fetchedAt='bad',c=>c.days[0].meanC=null,c=>c.days[0].cityMeanC[0]=null,c=>c.days[0].meanC=0,c=>c.cityIds=['tokyo']]){const c=structuredClone(cache);mutate(c);assert.deepEqual(entry.choose(songs,{now,weather:c}),base);}
  assert.equal(entry.choose(songs,{now,weather:cache}).meanC,13.5);
});
test('fetch failure, invalid JSON and timeout are non-blocking; only same-origin JSON is requested',async()=>{
  for(const fetcher of [async()=>{throw Error('offline');},async()=>({ok:false}),async()=>({ok:true,json:async()=>{throw Error('bad JSON');}}),()=>new Promise(()=>{})])assert.equal(await entry.loadWeather(fetcher,undefined,5),null);
  let request;await entry.loadWeather(async(url,opts)=>{request={url,opts};return {ok:true,json:async()=>cache};});assert.equal(request.url,'data/entry-weather.json');assert.equal(request.opts.credentials,'omit');
});
test('failed refresh leaves last cache byte-for-byte intact',async()=>{
  const dir=fs.mkdtempSync(path.join(os.tmpdir(),'classica-weather-test-')),file=path.join(dir,'cache.json'),before=JSON.stringify(cache);fs.writeFileSync(file,before);
  await assert.rejects(builder.update(file,async()=>({ok:false,status:503}),now));assert.equal(fs.readFileSync(file,'utf8'),before);fs.rmSync(dir,{recursive:true});
});
test('initial cue does not autoplay; direct link and manual next remain authoritative after weather settles',async()=>{
  const block=html.match(/let entryWeather=null,[\s\S]*?\n}\n/)[0];let resolveWeather;
  const ctx={ClassicaEntry:{...entry,choose:(list,options)=>entry.choose(list,{...options,now}),loadWeather:()=>new Promise(r=>resolveWeather=r)},location:{protocol:'https:',hash:''},fetch:()=>{},window:{},SONGS:songs};vm.createContext(ctx);vm.runInContext(block,ctx);
  ctx.location.hash='#/song/night';resolveWeather(cache);await Promise.resolve();await Promise.resolve();assert.equal(vm.runInContext('initialSongIndex()',ctx),2);
  const ready=html.match(/onReady:\(\)=>\{ entryWeatherReady\.then\([\s\S]*?\); \},/)[0];assert.match(ready,/setNow\(initialSongIndex\(\), false\)/);assert.doesNotMatch(ready,/playSong|playVideo|loadVideoById/);
  assert.match(html,/const first=i>=0\?i:cur>=0\?cur:initialSongIndex\(\)/);assert.match(html,/QUEUE=QUEUE_PREVIEW\.slice\(\)/);
  assert.doesNotMatch(fs.readFileSync(path.join(__dirname,'../entry-selection.js'),'utf8'),/navigator\.|localStorage|sessionStorage|api\.open-meteo/);
});
test('workflow writes only JSON and explicitly builds existing Pages without new secrets or settings',()=>{
  const workflow=fs.readFileSync(path.join(__dirname,'../.github/workflows/entry-weather.yml'),'utf8');assert.match(workflow,/git add data\/entry-weather\.json/);assert.match(workflow,/pages\/builds/);assert.match(workflow,/git diff --cached --name-only/);assert.match(workflow,/git diff --name-only HEAD\^ HEAD/);assert.doesNotMatch(workflow,/secrets\.|admin:|id-token:|npm install|build-impressive/);
});
test('ready callback cues selected recording and matching title; navigation while weather pending wins',async()=>{
  const catalog=songs.map((song,i)=>({...song,title:'Title '+song.id,composer:'Composer',yt:{id:'video-'+i,who:'Performer'}}));
  for(const route of ['', '#/song/night']){
    let settleWeather;const calls=[],elements=new Map();const element=id=>{if(!elements.has(id))elements.set(id,{textContent:'',classList:{add(){},toggle(){}}});return elements.get(id);};
    const ctx={ClassicaEntry:{...entry,choose:(list,options)=>entry.choose(list,{...options,now}),loadWeather:()=>new Promise(resolve=>settleWeather=resolve)},location:{protocol:'https:',hash:''},fetch(){},window:{},SONGS:catalog,player:{cueVideoById:id=>calls.push(['cue',id]),loadVideoById:id=>calls.push(['load',id])},ytReady:false,cur:-1,errorSkipTimer:0,clearTimeout(){},$:element,ssSyncPlayback(){},ssArtNote(){},SS:{on:false},Date:class extends Date{constructor(value){super(value===undefined?now:value);}}};
    vm.createContext(ctx);vm.runInContext(html.match(/let entryWeather=null,[\s\S]*?\n}\n/)[0],ctx);
    const start=html.indexOf('function setNow('),end=html.indexOf('\nfunction playSong',start);vm.runInContext(html.slice(start,end),ctx);
    const callback=html.match(/onReady:\(\)=>\{ entryWeatherReady\.then\([\s\S]*?\); \},/)[0].slice('onReady:'.length,-1);vm.runInContext('('+callback+')()',ctx);
    ctx.location.hash=route;settleWeather(cache);await new Promise(resolve=>setImmediate(resolve));
    const selected=route?2:entry.index(catalog,'',entry.choose(catalog,{now,weather:cache}));
    assert.deepEqual(calls,[['cue',catalog[selected].yt.id]]);assert.equal(element('#nowTitle').textContent,catalog[selected].title);assert.equal(ctx.cur,selected);assert.equal(ctx.ytReady,true);
  }
});
