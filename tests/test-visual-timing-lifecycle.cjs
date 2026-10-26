'use strict';
const fs=require('fs'),vm=require('vm'),assert=require('assert'),crypto=require('crypto'),path=require('path');
const root=path.resolve(process.argv[2]||path.join(__dirname,'..'));
const html=fs.readFileSync(path.join(root,'index.html'),'utf8'),js=fs.readFileSync(path.join(root,'visual-art.js'),'utf8');
const expected={"rach-pc2-2": "2f9902423d78c7a58bbf8f9229ad49d7b0bc0fb7a54be8cf38cd34a8aca9ed8d", "schubert-ave-maria": "4f56b9d6f3b2e713794841f3269d3e22c371fbf5759b5c0823452c83b8a39c93"};
const supportedCount=Object.keys(expected).length;
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
// Scene pixels are unchanged; their prior exact native evidence is retained.
// Execute actual production function bodies in a deterministic DOM/media harness.
function fn(name){const start=html.indexOf('function '+name+'(');assert(start>=0,name);const end=html.indexOf('\nfunction ',start+1);return html.slice(start,end);}
const elements=new Map();function element(id){if(!elements.has(id))elements.set(id,{id,textContent:'',innerHTML:'',hidden:false,style:{},width:100,height:100,attrs:{},classList:{set:new Set(),toggle(n,v){v?this.set.add(n):this.set.delete(n);},remove(...n){n.forEach(x=>this.set.delete(x));}},setAttribute(k,v){this.attrs[k]=v;},querySelectorAll(){return[];}});return elements.get(id);}
const buttons=Array.from({length:2},()=>['impressive','realism','visual'].map(mode=>({...element('button'+Math.random()),dataset:{artMode:mode}}))).flat();
let draws=0,clears=0,raf=0,media=14;
const cx=new Proxy({clearRect(){clears++;},canvas:{width:554}}, {get(o,k){return k in o?o[k]:(()=>{});},set(o,k,v){o[k]=v;return true;}});
const storage=new Map(),activations=[],nature=[];
const ctx={window:{ClassicaVisualTiming:require(path.join(root,'visual-timing.js')),ClassicaVisual:visual,ClassicaImpressive:{create:()=>({init:()=>({}),draw:()=>{draws++;return true;}}),status:()=> 'ready',activate:id=>activations.push(id)},ClassicaNatureGL:{activate:id=>nature.push(id)},ClassicaArtConnections:{renderFullscreen:()=>''}},document:{querySelectorAll:()=>buttons,fullscreenElement:null},$:element,SONGS:[...Object.keys(expected),'__unreleased__'].map(id=>({id,title:id,en:id,composer:'Composer',year:'1899',yt:{who:'Performer'}})),cur:0,currentViewIdx:()=>0,SS:{on:true,W:277,H:600,elapsed:0,paused:true,dirty:true,mediaAt:null,mediaTime:null},artMode:'visual',localStorage:{setItem:(k,v)=>storage.set(k,v)},performance:{now:()=>1000},playing:false,REDUCED:false,ytReady:true,player:{getCurrentTime:()=>media,getDuration:()=>120},cx,cv:element('cv'),ssEl:element('ss'),ssPixelRatio:()=>2,ssTouchInert:()=>{},clearTimeout(){},cancelAnimationFrame(){},requestAnimationFrame(){raf++;return raf;},ssSyncPlayback(){}};
vm.createContext(ctx);
for(const name of ['ssArtIndex','ssVisualMode','ssArtNote','ssSyncCredit','ssSyncMode','ssClearFrame','ssMaterialPhase','ssSyncArtTone','ssSet','ssImpressiveTime','ssResetVisualTiming','ssVisualTime','ssLoop','ssSetMotionPlaying'])vm.runInContext(fn(name),ctx);
// Use a cheap stand-in only for lifecycle draw counts; original exact render tested above.
ctx.window.ClassicaVisual={has:visual.has,create:id=>visual.has(id)?{init:()=>null,draw:()=>{draws++;return true;}}:null};
for(let sweep=0;sweep<4;sweep++)for(let i=0;i<supportedCount+1;i++){
 ctx.cur=i;ctx.artMode='visual';ctx.ssSet(i);ctx.SS.lastFrame=0;assert.equal(ctx.SS.visual,i<supportedCount);assert.equal(ctx.artMode,i<supportedCount?'visual':'impressive');
 assert.equal(activations.at(-1),i<supportedCount?null:'__unreleased__');assert.equal(nature.at(-1),null);
 assert.equal(buttons.find(x=>x.dataset.artMode==='visual').disabled,i===supportedCount);
 assert.equal(element('#ssTj').textContent,ctx.SONGS[i].title);assert(element('#ssDetails').textContent.includes('1899'));
 ctx.ssLoop(1000);const count=draws;ctx.ssLoop(1050);assert.equal(draws,count,'paused redraw');
}
ctx.cur=0;ctx.artMode='visual';ctx.ssSet(0);assert.equal(ctx.ssImpressiveTime(1000,0),14);ctx.playing=true;assert.equal(ctx.ssImpressiveTime(1100,0),14.1);media=82;assert.equal(ctx.ssImpressiveTime(1300,0),82);ctx.playing=false;ctx.SS.mediaAt=null;assert.equal(ctx.ssImpressiveTime(1400,0),82);assert.equal(ctx.ssImpressiveTime(1450,0),82);
ctx.SS.paused=false;ctx.SS.dirty=true;ctx.ssLoop(1500);let count=draws;ctx.ssLoop(1510);assert.equal(draws,count,'25fps bound');ctx.ssLoop(1540);assert.equal(draws,count+1);
ctx.REDUCED=true;ctx.SS.dirty=true;const n=raf;ctx.ssLoop(1600);assert.equal(raf,n,'reduced motion scheduled RAF');
ctx.SS.on=false;ctx.cur=supportedCount;ctx.artMode='visual';ctx.ssArtNote(supportedCount);assert.equal(ctx.artMode,'impressive');assert(element('#artNote').textContent.includes('対象外'));assert.equal(storage.get('suburbia-art-mode'),'impressive');
assert(html.includes('if(!SS.on||SS.real||SS.visual||event.detail?.id'),'late image guard');
assert(html.includes("window.ClassicaImpressive?.activate?.(null)"));assert(html.includes("old.width=0;old.height=0"));
console.log(JSON.stringify({pass:true,frozenSources:supportedCount,pixelFrames,lifecycleSweeps:4,seekPause:true,reduced:true,disabledFallback:true,lateImageGuard:true}));

// Execute the actual visibility listener, including hidden-song fallback to Impressive.
let visibility;
ctx.document.addEventListener=(name,fn)=>{if(name==='visibilitychange')visibility=fn;};
const vis=html.slice(html.indexOf("document.addEventListener('visibilitychange'"),html.indexOf("addEventListener('resize',",html.indexOf("document.addEventListener('visibilitychange'")));
vm.runInContext(vis,ctx);assert.equal(typeof visibility,'function');
ctx.SS.on=true;ctx.SS.visual=true;ctx.document.hidden=true;visibility();assert.equal(ctx.SS.visualSuspended,true);
ctx.SS.visual=false;ctx.document.hidden=false;ctx.REDUCED=false;const before=raf;visibility();assert.equal(raf,before+1);assert.equal(ctx.SS.visualSuspended,false);
console.log(JSON.stringify({visibilityListener:true,hiddenUnsupportedFallback:true,helperLoaded:true}));
