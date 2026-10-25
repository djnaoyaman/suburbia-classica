const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('assert');
const root=process.argv[2]?path.resolve(process.argv[2]):path.resolve(__dirname,'..'),index=fs.readFileSync(root+'/index.html','utf8');
const files=[...index.matchAll(/<script src="(realism[^"?]+)(?:\?[^\"]*)?"><\/script>/g)].map(m=>m[1]);
function setup(){let images=[],canvases=[],contexts=[],notices=[];
function GL(){let sets={},counts={program:0,buffer:0,texture:0,shader:0};let g={counts,lost:false,isContextLost(){return this.lost},getShaderParameter:()=>true,getProgramParameter:()=>true,getError(){let n=this.error||0;this.error=0;return n},getUniformLocation:()=>0,getAttribLocation:()=>0,NO_ERROR:0,uniform1f:(k,t)=>g.lastTime=t,texImage2D(){if(g.failUpload)g.error=1285;}};for(let t of Object.keys(counts)){sets[t]=new Set();g['create'+t[0].toUpperCase()+t.slice(1)]=()=>{let o={};sets[t].add(o);counts[t]++;return o};g['delete'+t[0].toUpperCase()+t.slice(1)]=o=>{if(sets[t].delete(o))counts[t]--};}return new Proxy(g,{get:(o,k)=>k in o?o[k]:()=>{}})}
const s={window:{dispatchEvent:e=>notices.push(e)},document:{createElement(){let gl=GL(),listeners={};contexts.push(gl);let c={width:0,height:0,listeners,getContext:()=>gl,addEventListener:(n,f,opt)=>(listeners[n]??=[]).push({f,once:opt?.once}),emit(n){let ls=listeners[n]||[];listeners[n]=ls.filter(x=>!x.once);for(let x of ls)x.f({preventDefault(){}})}};canvases.push(c);return c}},Image:class{constructor(){images.push(this)}decode(){return new Promise((resolve,reject)=>{this.resolve=resolve;this.reject=reject})}},CustomEvent:class{constructor(type,o){this.type=type;this.detail=o.detail}},Promise};vm.createContext(s);for(let f of files)vm.runInContext(fs.readFileSync(root+'/'+f,'utf8'),s,{filename:f});let r=s.window.ClassicaRealism,h=s.window.ClassicaNatureGL,c={drawImage(){}};
const frame=(id,t=4)=>{r.available(id);return r.draw(c,390,844,t,r.init(id))};
const activate=id=>h.activate(id);
async function settle(){for(let loops=0;loops<20;loops++){let moved=false;for(let img of images){if(img.onload&&!img.begun){img.begun=true;img.onload();moved=true;}if(img.resolve&&!img.resolved){img.resolved=true;img.resolve();moved=true;}}await Promise.resolve();await Promise.resolve();if(!moved&&h.materialState().running===0)return;}throw Error('settle stuck');}
const bound=()=>{const st=h.materialState();assert(st.retained.length<=2);assert(st.running<=2);assert(contexts[0]?.counts.texture<=2);return st;};return {s,images,contexts,canvases,notices,r,h,c,frame,activate,settle,bound};}
(async()=>{
const e=setup(),ids=e.r.list().map(x=>x.id);let peakTextures=0;assert.equal(ids.length,74);
for(const id of ids)e.r.available(id);assert.equal(e.images.length,0,'inactive availability probes must not load');
for(const seq of [ids,[...ids].reverse(),ids.slice(20).concat(ids.slice(0,20)),ids])for(const id of seq){e.activate(id);e.frame(id);await e.settle();e.frame(id,9.25);e.bound();peakTextures=Math.max(peakTextures,e.contexts[0].counts.texture);}
assert.equal(e.h.materialState().running,0);const plateau=e.contexts[0].counts.program;assert(plateau<=68);
const active=e.h.materialState().active;e.h.activate(null);let n=e.images.length;e.frame(active);assert.equal(e.images.length,n);e.activate(active);e.frame(active,12);assert.equal(e.contexts[0].lastTime,12,'caller clock unchanged');
for(const g of e.contexts)g.lost=true;e.canvases[0].emit('webglcontextlost');for(const g of e.contexts)g.lost=false;e.canvases[0].emit('webglcontextrestored');e.frame(active);await e.settle();e.frame(active);e.bound();
// Two decoding slots are occupied, a third scene queues, then a fourth replaces it.
const x=setup(),a='traumerei',b='flaxen-hair',d='prelude-bwv846',f='pathetique-2';
x.activate(a);x.frame(a);let ia=x.images[0],staleA=ia.onload;ia.begun=true;ia.onload();
x.activate(b);x.frame(b);let ib=x.images[1],staleB=ib.onload;ib.begun=true;ib.onload();
x.activate(d);x.frame(d);assert.equal(x.h.materialState().running,2);assert.equal(x.images.length,2);assert.equal(x.h.materialState().queued,1);
x.activate(f);x.frame(f);assert.equal(x.h.materialState().queued,2);const notices=x.notices.length;
ia.resolve();ia.resolved=true;await Promise.resolve();await Promise.resolve();assert.equal(x.notices.length,notices,'obsolete decode must not announce');assert.equal(x.images[2].src,'assets/realism/pathetique-leaf-material.webp','active queued scene gets priority');
staleA();assert.equal(x.notices.length,notices,'stale onload has no effect');
ib.reject(Error('late'));ib.resolved=true;await Promise.resolve();await Promise.resolve();await x.settle();x.frame(f);x.bound();
x.activate(a);x.frame(a);await x.settle();x.frame(a);x.bound();assert(x.images.length>3,'evicted scene reloads');
// Evicted network load cancels without consuming a decode slot forever.
const y=setup();y.activate(a);y.frame(a);const old=y.images[0],late=old.onload;y.activate(b);y.frame(b);y.activate(d);y.frame(d);assert.equal(old.src,'');late();assert(!old.resolve);await y.settle();y.frame(d);y.bound();
// Upload failure latches per renderer, resets after material eviction/revisit.
const z=setup();z.activate(a);z.frame(a);await z.settle();z.contexts[0].failUpload=true;z.frame(a);assert.equal(z.contexts[0].counts.texture,0);z.contexts[0].failUpload=false;z.frame(a);assert.equal(z.contexts[0].counts.texture,0);for(const id of [b,d,a]){z.activate(id);z.frame(id);await z.settle();z.frame(id);}assert(z.contexts[0].counts.texture>0);z.bound();
// Actual index hooks must also tolerate a cached old host without activate.
const hooks=[...index.matchAll(/window\.ClassicaNatureGL\?\.activate[^;]+;/g)].map(m=>m[0]);assert.equal(hooks.length,2);for(const hook of hooks)assert.doesNotThrow(()=>vm.runInNewContext(hook,{window:{ClassicaNatureGL:{}},wantsReal:true,s:{id:a}}));
// Mixed cache: new material wrapper with an old host falls back without throwing.
const compat=setup();compat.h.material=undefined;compat.activate(a);compat.frame(a);assert.equal(compat.images.length,0);
// Multiple assets belonging to one scene are atomic, not mutually evicted.
const bundle=setup();let releasedA=0,releasedB=0;
bundle.activate('bundle-a');bundle.h.material('bundle-a','first',()=>{},()=>releasedA++);bundle.h.material('bundle-a','second',()=>{},()=>releasedA++);
bundle.activate('bundle-b');bundle.h.material('bundle-b','third',()=>{},()=>releasedB++);assert.equal(bundle.h.materialState().retained.length,2);assert.equal(releasedA,0);
bundle.activate('bundle-c');bundle.h.material('bundle-c','fourth',()=>{},()=>{});assert.equal(releasedA,2);assert.equal(releasedB,0);assert.equal(bundle.h.materialState().retained.length,2);await bundle.settle();
console.log(JSON.stringify({sweeps:4,scenes:74,peakNatureTextures:peakTextures,programsBeforeRestore:plateau,retained:e.h.materialState(),natureCounts:e.contexts[0].counts,imagesCreated:e.images.length,raceCases:['stale decode','stale failure','stale onload','two decode slots','active priority','network cancellation','eviction revisit','upload failure reset','context restore','Original close/reopen'],limits:'VM/mock GL references and slots, not physical RAM/browser FPS'},null,2));console.log('PASS 4x74 sweeps / 2 scene bundles / 2 pending slots / races / clock / restore / failures');
})().catch(e=>{console.error(e);process.exit(1)});
