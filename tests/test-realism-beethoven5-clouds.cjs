'use strict';
const fs=require('fs'),vm=require('vm'),assert=require('assert'),crypto=require('crypto'),path=require('path');
const repoRoot=path.resolve(process.argv[2]||path.join(__dirname,'..'));
const source=fs.readFileSync(path.join(repoRoot,'realism-nature-storm.js'),'utf8');
const shared=fs.readFileSync(path.join(repoRoot,'realism-context.js'),'utf8');
const html=fs.readFileSync(path.join(repoRoot,'index.html'),'utf8');
assert(html.includes('realism-nature-storm.js?v=20261026-cloudmotion1'));
assert.equal(crypto.createHash('sha256').update(source).digest('hex'),'e7a8364f4cf8dd79eb7a3da000bf69668bbba97dd904bd8a30b333b26ac769f7');
assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(repoRoot,'assets/realism/storm-material.webp'))).digest('hex'),'a4df1257b4254484ad21c91026f6274edade8585d4f52a7616d1d26a78b5e6de');
assert(!/Date\.now|performance\.now|Math\.random|requestAnimationFrame/.test(source),'renderer is entirely caller-clock driven');
assert(html.includes('const t=REDUCED?12:'),'host keeps the static reduced-motion frame');
const ids=['beethoven-5',...Array.from({length:73},(_,i)=>'other-'+i)];
function setup({noGL=false,failUpload=false}={}){
 const stats={created:0,deleted:0,programs:0,deletedPrograms:0,drawn:0,fallback:0,events:[],times:[],uploads:0}, handlers={},images=[];
 let lost=false,serial=1;
 const base={NO_ERROR:0,TEXTURE0:1000,isContextLost:()=>lost,getError:()=>0,createTexture(){stats.created++;return {texture:serial++};},deleteTexture(t){assert(t);stats.deleted++;},createShader(){return {};},getShaderParameter:()=>true,createProgram(){stats.programs++;return {};},getProgramParameter:()=>true,deleteProgram(){stats.deletedPrograms++;},createBuffer(){return {};},getUniformLocation:(p,k)=>k,getAttribLocation:()=>0,texImage2D(){stats.uploads++;if(failUpload)throw Error('mock allocation failure');},drawArrays(){stats.drawn++;},uniform1f(k,t){if(k==='time')stats.times.push(t);}};
 const gl=new Proxy(base,{get(o,k){if(k in o)return o[k];if(/^[A-Z0-9_]+$/.test(k))return 10;return ()=>{};}});
 const canvas={width:0,height:0,getContext(){return noGL?null:gl;},addEventListener(k,f){handlers[k]=f;}};
 const legacy={has:id=>ids.includes(id),describe:id=>'old '+id,list:()=>ids.map((id,i)=>({id,scene:i,variation:i%5,description:'old '+id})),available:()=>true,init:id=>({id,legacy:true}),draw(c,w,h,t,st){stats.fallback++;assert(st.legacy);return true;}};
 class FakeImage{constructor(){images.push(this);}decode(){return Promise.resolve();}set src(s){this.url=s;}}
 const win={ClassicaRealism:legacy,dispatchEvent(e){stats.events.push(e.detail.id);}};
 const sandbox={window:win,document:{createElement:()=>canvas},Image:FakeImage,CustomEvent:function(n,o){this.type=n;this.detail=o.detail;},console,Map,Set,Number,Float32Array,Promise};
 vm.createContext(sandbox);vm.runInContext(shared,sandbox);vm.runInContext(source,sandbox);
 return {win,stats,images,handlers,canvas,gl,legacy,setLost:v=>lost=v};
}
(async()=>{
 const e=setup();const a=e.win.ClassicaRealism,g=e.win.ClassicaNatureGL,c={drawImage(){}};
 assert.equal(a.list().length,74);assert.equal(a.has('beethoven-5'),true);assert.equal(a.has('absent'),false);
 for(const id of ids.slice(1)){assert.deepEqual(a.init(id),e.legacy.init(id));assert.equal(a.describe(id),e.legacy.describe(id));assert.deepEqual(a.list().find(i=>i.id===id),e.legacy.list().find(i=>i.id===id));a.draw(c,1,1,1,a.init(id));}
 assert.equal(e.stats.fallback,73);g.activate('beethoven-5');assert(a.available('beethoven-5'));assert.equal(e.images.length,1);assert.equal(g.materialState().running,1);
 const st=a.init('beethoven-5');a.draw(c,960,540,0,st);assert.equal(e.stats.drawn,0);
 e.images.forEach(img=>img.onload());await new Promise(r=>setImmediate(r));assert.equal(g.materialState().running,0);assert.equal(e.stats.events.length,1);
 assert(a.draw(c,1920,1080,3,st));assert.equal(e.canvas.width,960);assert.equal(e.canvas.height,540);assert.equal(e.stats.created,1);
 a.draw(c,277,600,12,st);a.draw(c,277,600,12,st);a.draw(c,960,540,48,st);a.draw(c,960,540,0,st);a.draw(c,960,540,NaN,st);a.draw(c,960,540,Infinity,st);
 assert.equal(e.stats.created,1);assert.equal(e.stats.uploads,1);assert.deepEqual(e.stats.times,[3,12,12,48,0,0,0]);assert.equal(a.draw(c,0,600,0,st),false);
 e.setLost(true);const before=e.stats.drawn;a.draw(c,277,600,1,st);assert.equal(e.stats.drawn,before);e.setLost(false);
 e.handlers.webglcontextrestored();assert.equal(e.stats.deleted,1);assert.equal(e.stats.deletedPrograms,1);
 a.draw(c,277,600,4,st);assert.equal(e.stats.created,2);
 for(const id of ['other-0','other-1']){g.activate(id);g.material(id,id+'.webp',()=>{},()=>{});}assert(!g.materialState().retained.includes('beethoven-5'));assert.equal(e.stats.deleted,2);
 g.activate('beethoven-5');a.available('beethoven-5');assert.equal(g.materialState().retained.length,2);
 const bad=setup({failUpload:true});bad.win.ClassicaNatureGL.activate('beethoven-5');bad.win.ClassicaRealism.available('beethoven-5');bad.images.forEach(img=>img.onload());await new Promise(r=>setImmediate(r));const bst=bad.win.ClassicaRealism.init('beethoven-5');bad.win.ClassicaRealism.draw(c,960,540,1,bst);bad.win.ClassicaRealism.draw(c,960,540,2,bst);assert.equal(bad.stats.created,1);assert.equal(bad.stats.deleted,1);assert.equal(bad.stats.drawn,0);assert.equal(bad.stats.fallback,2);
 const nogl=setup({noGL:true});nogl.win.ClassicaNatureGL.activate('beethoven-5');nogl.win.ClassicaRealism.draw(c,960,540,0,nogl.win.ClassicaRealism.init('beethoven-5'));assert.equal(nogl.stats.fallback,1);
 console.log('PASS: 74 IDs/73 delegates, 1-slot async material ready, bounded texture cache, invalid size/time, repeated draw/reduced12/seek, lost/restore disposal, 2-scene eviction release, upload fail-once fallback, unavailable GL fallback.');
 console.log(JSON.stringify({texturesCreated:e.stats.created,texturesDeleted:e.stats.deleted,draws:e.stats.drawn,retained:e.win.ClassicaNatureGL.materialState().retained}));
})().catch(e=>{console.error(e);process.exit(1);});

const loopStart=html.indexOf('function ssLoop('),loopEnd=html.indexOf('\nfunction ',loopStart+1);
const times=[],host={SS:{on:true,real:true,visual:false,dirty:true,paused:false,t0:1000,elapsed:3000,W:277,H:600,realState:{id:'beethoven-5'}},REDUCED:false,
window:{ClassicaRealism:{draw(c,w,h,t){times.push(t);return true;}}},ssClearFrame(){},ssMaterialPhase:()=> 'ready',ssArtNote(){},ssArtIndex:()=>0,cx:{},raf:0,requestAnimationFrame(){host.raf++;return host.raf;}};
vm.createContext(host);vm.runInContext(html.slice(loopStart,loopEnd),host);
host.ssLoop(2000);assert.deepEqual(times,[4]);
host.SS.paused=true;host.SS.elapsed=4000;host.SS.dirty=true;host.ssLoop(5000);host.ssLoop(5100);assert.deepEqual(times,[4,4]);
host.SS.dirty=true;host.ssLoop(6000);assert.deepEqual(times,[4,4,4]);
host.SS.elapsed=22000;host.SS.dirty=true;host.ssLoop(6500);assert.equal(times.at(-1),22,'external seek/phase input is unchanged');
host.REDUCED=true;host.SS.dirty=true;const beforeRAF=host.raf;host.ssLoop(7000);assert.equal(times.at(-1),12);assert.equal(host.raf,beforeRAF);
console.log('PASS: actual host Realism clock / paused dirty redraw / caller phase update / reduced-motion t=12 without RAF.');
