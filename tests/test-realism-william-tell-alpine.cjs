'use strict';
const fs=require('fs'),vm=require('vm'),assert=require('assert');
const path=require('path');
const repoRoot=path.resolve(process.argv[2]||path.join(__dirname,'..'));
const source=fs.readFileSync(path.join(repoRoot,'realism-william-tell-alpine.js'),'utf8');
const shared=fs.readFileSync(path.join(repoRoot,'realism-context.js'),'utf8');
// Integration scope: remove the unrelated dust devil wrapper, retain base fallback.
const html=fs.readFileSync(path.join(repoRoot,'index.html'),'utf8');
const base=fs.readFileSync(path.join(repoRoot,'realism.js'),'utf8');
assert(html.includes('realism-william-tell-alpine.js?v=20261026-alpine1'));
assert(!html.includes('<script src="realism-nature-dustdevil.js'));
assert(/'william-tell-overture':\[/.test(base));
assert(!/requestAnimationFrame|setInterval|Date\.now|performance\.now/.test(source),'must use caller clock only');
assert(source.includes('sky(p)*cloudShift+grass(p)*bladeShift'),'sky and foreground grass only');
assert(source.includes('mod(mod(time,240.)+240.,240.)'),'continuous caller-time loop');

// Load the actual 74-entry script chain, not only synthetic delegation IDs.
function catalog(withCandidate){
 const win={dispatchEvent(){}};const sb={window:win,document:{createElement:()=>({getContext:()=>null,addEventListener(){}})},Image:class{},CustomEvent:class{},console};vm.createContext(sb);
 for(const m of html.matchAll(/<script src="(realism[^"?]+)(?:\?[^"]*)?"><\/script>/g)){
  if(!withCandidate&&m[1]==='realism-william-tell-alpine.js')continue;
  vm.runInContext(fs.readFileSync(path.join(repoRoot,m[1]),'utf8'),sb,{filename:m[1]});
 }
 return win.ClassicaRealism;
}
const realOld=catalog(false),realNew=catalog(true),before=JSON.parse(JSON.stringify(realOld.list())),after=JSON.parse(JSON.stringify(realNew.list()));
assert.equal(before.length,74);assert.equal(after.length,74);assert.deepEqual(after.map(x=>x.id),before.map(x=>x.id));
for(const old of before){const now=after.find(x=>x.id===old.id);assert(realNew.has(old.id));if(old.id!=='william-tell-overture'){assert.deepEqual(now,old);assert.equal(realNew.describe(old.id),realOld.describe(old.id));}}
assert.notEqual(realNew.describe('william-tell-overture'),realOld.describe('william-tell-overture'));

const ids=['william-tell-overture',...Array.from({length:73},(_,i)=>'other-'+i)];
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
 assert.equal(a.list().length,74);assert.equal(a.has('william-tell-overture'),true);assert.equal(a.has('absent'),false);
 for(const id of ids.slice(1)){assert.deepEqual(a.init(id),e.legacy.init(id));assert.equal(a.describe(id),e.legacy.describe(id));assert.deepEqual(a.list().find(i=>i.id===id),e.legacy.list().find(i=>i.id===id));a.draw(c,1,1,1,a.init(id));}
 assert.equal(e.stats.fallback,73);g.activate('william-tell-overture');assert(a.available('william-tell-overture'));assert.equal(e.images.length,1);assert.equal(g.materialState().running,1);
 const st=a.init('william-tell-overture');a.draw(c,960,540,0,st);assert.equal(e.stats.drawn,0);
 e.images.forEach(img=>img.onload());await new Promise(r=>setImmediate(r));assert.equal(g.materialState().running,0);assert.equal(e.stats.events.length,1);
 assert(a.draw(c,1920,1080,3,st));assert.equal(e.canvas.width,960);assert.equal(e.canvas.height,540);assert.equal(e.stats.created,1);
 a.draw(c,277,600,12,st);a.draw(c,277,600,12,st);a.draw(c,960,540,48,st);a.draw(c,960,540,0,st);a.draw(c,960,540,NaN,st);a.draw(c,960,540,Infinity,st);
 assert.equal(e.stats.created,1);assert.equal(e.stats.uploads,1);assert.deepEqual(e.stats.times,[3,12,12,48,0,0,0]);assert.equal(a.draw(c,0,600,0,st),false);
 e.setLost(true);const before=e.stats.drawn;a.draw(c,277,600,1,st);assert.equal(e.stats.drawn,before);e.setLost(false);
 e.handlers.webglcontextrestored();assert.equal(e.stats.deleted,1);assert.equal(e.stats.deletedPrograms,1);
 a.draw(c,277,600,4,st);assert.equal(e.stats.created,2);
 for(const id of ['other-0','other-1']){g.activate(id);g.material(id,id+'.webp',()=>{},()=>{});}assert(!g.materialState().retained.includes('william-tell-overture'));assert.equal(e.stats.deleted,2);
 g.activate('william-tell-overture');a.available('william-tell-overture');assert.equal(g.materialState().retained.length,2);
 const bad=setup({failUpload:true});bad.win.ClassicaNatureGL.activate('william-tell-overture');bad.win.ClassicaRealism.available('william-tell-overture');bad.images.forEach(img=>img.onload());await new Promise(r=>setImmediate(r));const bst=bad.win.ClassicaRealism.init('william-tell-overture');bad.win.ClassicaRealism.draw(c,960,540,1,bst);bad.win.ClassicaRealism.draw(c,960,540,2,bst);assert.equal(bad.stats.created,1);assert.equal(bad.stats.deleted,1);assert.equal(bad.stats.drawn,0);assert.equal(bad.stats.fallback,2);
 const failed=setup();failed.win.ClassicaNatureGL.activate('william-tell-overture');failed.win.ClassicaRealism.available('william-tell-overture');failed.images[0].onerror();assert.equal(failed.win.ClassicaNatureGL.materialState().running,0);failed.win.ClassicaRealism.draw(c,960,540,4,failed.win.ClassicaRealism.init('william-tell-overture'));assert.equal(failed.stats.drawn,0);assert.equal(failed.stats.fallback,1);
 const old=setup();old.win.ClassicaNatureGL.material=undefined;old.win.ClassicaNatureGL.activate('william-tell-overture');old.win.ClassicaRealism.draw(c,960,540,4,old.win.ClassicaRealism.init('william-tell-overture'));assert.equal(old.images.length,0);assert.equal(old.stats.fallback,1);
 const nogl=setup({noGL:true});nogl.win.ClassicaNatureGL.activate('william-tell-overture');nogl.win.ClassicaRealism.draw(c,960,540,0,nogl.win.ClassicaRealism.init('william-tell-overture'));assert.equal(nogl.stats.fallback,1);
 console.log('PASS: 74 IDs/73 delegates, 1-slot async material ready, bounded texture cache, invalid size/time, repeated draw/reduced12/seek, lost/restore disposal, 2-scene eviction release, upload fail-once fallback, image failure, unavailable material API / GL fallback.');
 console.log(JSON.stringify({texturesCreated:e.stats.created,texturesDeleted:e.stats.deleted,draws:e.stats.drawn,retained:e.win.ClassicaNatureGL.materialState().retained}));
})().catch(e=>{console.error(e);process.exit(1);});
