'use strict';
const assert=require('assert'),fs=require('fs'),path=require('path'),vm=require('vm');
const root=path.resolve(__dirname,'..'),Timing=require(path.join(root,'visual-timing.js'));
let checks=0;const ok=(x,m)=>{assert(x,m);checks++;};
for(const hz of [60,59.94,120,144])for(const heavy of [false,true]){
 const p=Timing.create({heavy}),out=[];
 for(let i=0;i<=hz*10;i++){const t=i*1000/hz;if(p.due(t)){out.push(t);p.record(5);}}
 const target=heavy?20:30;ok(Math.abs((out.length-1)/10-target)<.2,'pacing average');
 const deltas=out.slice(1).map((x,i)=>x-out[i]);ok(Math.min(...deltas)>=1000/hz-.01,'no burst');
 if(hz===60)ok(Math.max(...deltas)-Math.min(...deltas)<.01,'60Hz even cadence');
 ok(p.due(15000),'stall one frame');ok(!p.due(15000),'no backlog');
}
{const p=Timing.create();for(let i=0;i<12;i++)p.record(80);ok(p.interval()===100,'load sheds');for(let i=0;i<400;i++)p.record(4);ok(Math.abs(p.interval()-1000/30)<1e-6,'recovery');p.record(500);p.reset();ok(p.interval()<34,'resume resets transientcost');}
function run(read,rate=1){const p=Timing.create();let last=-1;for(let ms=0;ms<=5000;ms+=1000/60){const t=p.time(ms,ms/1000,true,()=>({time:read(ms),rate}));ok(t>=last-1e-9,'monotonic ordinaryclock');last=t;}return [p,last];}
run(ms=>Math.floor(ms/250)*.25);run(ms=>Math.floor(ms/1000));run(()=>10);run(ms=>ms<2500?10:10.01);
for(const rate of [.5,1,2]){const [p,last]=run(ms=>ms/1000*rate,rate);ok(Math.abs(last-5*rate)<.06,'rate interpolation');}
{const p=Timing.create();p.time(0,0,true,()=>({time:20}));ok(p.time(300,0,true,()=>({time:5}))===5,'backseek');ok(p.time(600,0,true,()=>({time:50}))===50,'forwardseek');p.reset();ok(p.time(900,0,false,()=>({time:3}))===3,'paused anchor');ok(p.time(1200,0,false,()=>({time:2.8}))===2.8,'small pausedseek');ok(p.time(1250,0,false,()=>({time:2.8}))===2.8,'paused hold');p.reset();ok(p.time(1300,0,true,()=>({time:2.8}))===2.8,'resume no doubleadvance');p.reset();ok(p.time(100000,0,true,()=>({time:100}))===100,'hidden freshanchor');p.reset();ok(p.time(100100,0,false,()=>({time:0}))===0,'new song zero');}
{const p=Timing.create();ok(p.time(0,12,true,()=>{throw Error()})===12,'throwfallback');ok(p.time(300,13,true,()=>({time:NaN}))===13,'nanfallback');ok(p.time(600,14,true,()=>null)===14,'missingfallback');}
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
function fn(s,name){const i=s.indexOf('function '+name+'('),end=s.indexOf('\nfunction ',i+1);return s.slice(i,end);}
ok(require('crypto').createHash('sha256').update(fn(html,'ssImpressiveTime')).digest('hex')==='c89dbad0aef3d36c62408cbc714f11ba6ee3daa65c2da2da6e70a3a80e555801','Impressiveclock exact');
const context={SS:{on:true,visual:true,paused:false,elapsed:0,t0:0,dirty:true,timing:Timing.create(),art:{draw(){return true}},st:{},W:277,H:600},REDUCED:false,playing:true,ytReady:true,player:{getCurrentTime:()=>0,getPlaybackRate:()=>1},document:{hidden:false},performance:{now:()=>0},requestAnimationFrame:()=>1,SONGS:[{id:'clair-de-lune'}],ssArtIndex:()=>0,artMode:'visual',cx:{},ssArtNote:()=>{throw Error('Visual DOM redraw')},ssImpressiveTime:()=>{throw Error('Impressive touched')},ssClearFrame:()=>{}};
vm.createContext(context);vm.runInContext(['ssResetVisualTiming','ssVisualTime','ssLoop'].map(x=>fn(html,x)).join('\n'),context);context.ssLoop(0);ok(context.SS.visualTime===0,'actual loop clock');context.REDUCED=true;context.SS.dirty=true;context.ssLoop(40);ok(context.SS.visualTime===12,'actual reduced12');context.REDUCED=false;context.document.hidden=true;context.SS.dirty=true;context.ssLoop(80);ok(context.SS.dirty,'hidden no draw');
// Compile every inline script, without executing page or audio code.
for(const m of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g))if(m[1].trim()&&!m[0].includes('application/ld+json'))new vm.Script(m[1]);
console.log(JSON.stringify({pass:true,checks,pacing:'30/20 ceilings, adaptive cost buckets; not delivered FPS',clock:'monotonic ordinary polling; explicit reset and large seek snaps',sceneSources:'not modified'}));
