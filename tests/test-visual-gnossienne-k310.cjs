'use strict';
const fs=require('fs'),vm=require('vm'),assert=require('assert'),crypto=require('crypto'),path=require('path');
const root=path.resolve(process.argv[2]||path.join(__dirname,'..'));
const html=fs.readFileSync(path.join(root,'index.html'),'utf8'),js=fs.readFileSync(path.join(root,'visual-art.js'),'utf8');
const expected={"gnossienne-1": "334e0da9e08f05078ebb8bcbe0ea7002b91c55abeb6ee8a0e90081f79b3ec3c8", "k310-2": "38c9f3d6d8eb082da3f7512e2f0998176a9f44f5c6f451d7d57d35b42a7793ab"};
const sources={};
for(const [id,hash]of Object.entries(expected)){
 const head='works['+JSON.stringify(id)+'] = (() => { const module = {exports:{}};\n';
 const source=js.split(head)[1].split('\nreturn module.exports; })();')[0];
 assert.equal(crypto.createHash('sha256').update(source).digest('hex'),hash,id+' source modified');
 const c={module:{exports:{}}};vm.runInNewContext(source,c);sources[id]=c.module.exports;
}
const win={};vm.runInNewContext(js,{window:win,document:{createElement(){return require('@napi-rs/canvas').createCanvas(1,1);}}});const visual=win.ClassicaVisual;
assert(Object.keys(expected).every(id=>visual.has(id)));assert.equal(new Set(visual.list()).size,visual.list().length);assert.equal(visual.create('__unreleased__'),null);
// Native Canvas is optional; source and lifecycle tests need only Node built-ins.
let pixelFrames=0;
try{
 const {createCanvas}=require('@napi-rs/canvas');
 for(const id of Object.keys(expected))for(const [w,h,dpr]of [[277,600,1],[277,600,2],[390,844,2],[960,540,1],[960,405,1]]){
  const a=createCanvas(Math.round(w*dpr),Math.round(h*dpr)),b=createCanvas(a.width,a.height),ca=a.getContext('2d'),cb=b.getContext('2d');
  const art=visual.create(id),unit=Math.min(w,h)/277,scale=(a.width/w)*unit;
  const proxy=new Proxy(cb,{get(c,k){if(k==='setTransform')return(a,b,d,e,x,y)=>c.setTransform(a*scale,b*scale,d*scale,e*scale,x*scale,y*scale);const v=c[k];return typeof v==='function'?v.bind(c):v;},set(c,k,v){c[k]=v;return true;}});
  for(const t of [0,12,24,48,72,95.96,96]){
   ca.fillStyle='#f0f';ca.fillRect(0,0,w*dpr,h*dpr);ca.setTransform(dpr,0,0,dpr,0,0);
   assert.equal(art.draw(ca,w,h,t),true);
   if((id==='prelude-bwv846'||id==='arabesque-1')&&dpr>1){
    const capW=id==='arabesque-1'?w:b.width,off=createCanvas(capW,h),oc=off.getContext('2d'),sx=capW/(w/unit),sy=h/(h/unit);
    const op=new Proxy(oc,{get(c,k){if(k==='setTransform')return(a,b,d,e,x,y)=>c.setTransform(a*sx,b*sy,d*sx,e*sy,x*sx,y*sy);const v=c[k];return typeof v==='function'?v.bind(c):v;},set(c,k,v){c[k]=v;return true;}});
    sources[id].render(op,w/unit,h/unit,t);cb.setTransform(1,0,0,1,0,0);cb.clearRect(0,0,b.width,b.height);cb.imageSmoothingQuality='high';cb.drawImage(off,0,0,b.width,b.height);off.width=1;off.height=1;
   }else sources[id].render(proxy,w/unit,h/unit,t);
   assert.equal(Buffer.compare(Buffer.from(ca.getImageData(0,0,a.width,a.height).data),Buffer.from(cb.getImageData(0,0,b.width,b.height).data)),0,id+' parity '+t);pixelFrames++;
  }
 }
}catch(e){if(e.code==='MODULE_NOT_FOUND')console.log('SKIP native pixels: install @napi-rs/canvas');else throw e;}
// Execute actual production function bodies in a deterministic DOM/media harness.
function fn(name){const start=html.indexOf('function '+name+'(');assert(start>=0,name);const end=html.indexOf('\nfunction ',start+1);return html.slice(start,end);}
const elements=new Map();function element(id){if(!elements.has(id))elements.set(id,{id,textContent:'',innerHTML:'',hidden:false,style:{},width:100,height:100,attrs:{},classList:{set:new Set(),toggle(n,v){v?this.set.add(n):this.set.delete(n);},remove(...n){n.forEach(x=>this.set.delete(x));}},setAttribute(k,v){this.attrs[k]=v;},querySelectorAll(){return[];}});return elements.get(id);}
const buttons=Array.from({length:2},()=>['impressive','realism','visual'].map(mode=>({...element('button'+Math.random()),dataset:{artMode:mode}}))).flat();
let draws=0,clears=0,raf=0,media=14;
const cx=new Proxy({clearRect(){clears++;},canvas:{width:554}}, {get(o,k){return k in o?o[k]:(()=>{});},set(o,k,v){o[k]=v;return true;}});
const storage=new Map(),activations=[],nature=[];
const ctx={window:{ClassicaVisual:visual,ClassicaImpressive:{create:()=>({init:()=>({}),draw:()=>{draws++;return true;}}),status:()=> 'ready',activate:id=>activations.push(id)},ClassicaNatureGL:{activate:id=>nature.push(id)},ClassicaArtConnections:{renderFullscreen:()=>''}},document:{querySelectorAll:()=>buttons,fullscreenElement:null},$:element,SONGS:[...Object.keys(expected),'__unreleased__'].map(id=>({id,title:id,en:id,composer:'Composer',year:'1899',yt:{who:'Performer'}})),cur:0,currentViewIdx:()=>0,SS:{on:true,W:277,H:600,elapsed:0,paused:true,dirty:true,mediaAt:null,mediaTime:null},artMode:'visual',localStorage:{setItem:(k,v)=>storage.set(k,v)},performance:{now:()=>1000},playing:false,REDUCED:false,ytReady:true,player:{getCurrentTime:()=>media,getDuration:()=>120},cx,cv:element('cv'),ssEl:element('ss'),ssPixelRatio:()=>2,ssTouchInert:()=>{},clearTimeout(){},cancelAnimationFrame(){},requestAnimationFrame(){raf++;return raf;},ssSyncPlayback(){}};
vm.createContext(ctx);
for(const name of ['ssArtIndex','ssVisualMode','ssArtNote','ssSyncCredit','ssSyncMode','ssClearFrame','ssMaterialPhase','ssSyncArtTone','ssSet','ssImpressiveTime','ssLoop','ssSetMotionPlaying'])vm.runInContext(fn(name),ctx);
// Use a cheap stand-in only for lifecycle draw counts; original exact render tested above.
ctx.window.ClassicaVisual={has:visual.has,create:id=>visual.has(id)?{init:()=>null,draw:()=>{draws++;return true;}}:null};
for(let sweep=0;sweep<4;sweep++)for(let i=0;i<3;i++){
 ctx.cur=i;ctx.artMode='visual';ctx.ssSet(i);ctx.SS.lastFrame=0;assert.equal(ctx.SS.visual,i<2);assert.equal(ctx.artMode,i<2?'visual':'impressive');
 assert.equal(activations.at(-1),i<2?null:'__unreleased__');assert.equal(nature.at(-1),null);
 assert.equal(buttons.find(x=>x.dataset.artMode==='visual').disabled,i===2);
 assert.equal(element('#ssTj').textContent,ctx.SONGS[i].title);assert(element('#ssDetails').textContent.includes('1899'));
 ctx.ssLoop(1000);const count=draws;ctx.ssLoop(1050);assert.equal(draws,count,'paused redraw');
}
ctx.cur=0;ctx.artMode='visual';ctx.ssSet(0);assert.equal(ctx.ssImpressiveTime(1000,0),14);ctx.playing=true;assert.equal(ctx.ssImpressiveTime(1100,0),14.1);media=82;assert.equal(ctx.ssImpressiveTime(1300,0),82);ctx.playing=false;ctx.SS.mediaAt=null;assert.equal(ctx.ssImpressiveTime(1400,0),82);assert.equal(ctx.ssImpressiveTime(1450,0),82);
ctx.SS.paused=false;ctx.SS.dirty=true;ctx.ssLoop(1500);let count=draws;ctx.ssLoop(1510);assert.equal(draws,count,'25fps bound');ctx.ssLoop(1540);assert.equal(draws,count+1);
ctx.REDUCED=true;ctx.SS.dirty=true;const n=raf;ctx.ssLoop(1600);assert.equal(raf,n,'reduced motion scheduled RAF');
ctx.SS.on=false;ctx.cur=2;ctx.artMode='visual';ctx.ssArtNote(2);assert.equal(ctx.artMode,'impressive');assert(element('#artNote').textContent.includes('対象外'));assert.equal(storage.get('suburbia-art-mode'),'impressive');
assert(html.includes('if(!SS.on||SS.real||SS.visual||event.detail?.id'),'late image guard');
assert(html.includes("window.ClassicaImpressive?.activate?.(null)"));assert(html.includes("old.width=0;old.height=0"));
console.log(JSON.stringify({pass:true,approvedSources:2,pixelFrames,lifecycleSweeps:4,seekPause:true,reduced:true,disabledFallback:true,lateImageGuard:true}));
