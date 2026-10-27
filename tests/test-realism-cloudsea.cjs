'use strict';
const fs=require('fs'),vm=require('vm'),assert=require('assert'),path=require('path');
const root=path.resolve(__dirname,'..'),source=fs.readFileSync(path.join(root,'realism-nature-cloudsea.js'),'utf8');
assert(source.includes("id='nessun-dorma'"));assert(!source.includes('vec2(.565,.455)'));
assert(source.includes("material(id,'assets/realism/cloudsea-motion-mask.png'"));
let checked=0;
function harness({maskState='ready',lost=false,failSlot=-1,noGL=false}={}){
 let slot=0,uploads=0,deleted=0,fallback=0,draws=0;const times=[],releases=[],requests=[],listeners={};
 const constants={VERTEX_SHADER:1,FRAGMENT_SHADER:2,COMPILE_STATUS:3,LINK_STATUS:4,ARRAY_BUFFER:5,STATIC_DRAW:6,TEXTURE0:100,TEXTURE1:101,NO_ERROR:0};
 const gl=new Proxy({...constants,createProgram:()=>({}),createShader:()=>({}),getShaderParameter:()=>true,getProgramParameter:()=>true,createBuffer:()=>({}),getUniformLocation:(_,k)=>k,getAttribLocation:()=>0,isContextLost:()=>lost,getError:()=>0,createTexture:()=>({}),activeTexture:n=>{slot=n-100;},texImage2D:()=>{uploads++;if(slot===failSlot)throw Error('upload failed');},deleteTexture:()=>deleted++,uniform1f:(u,t)=>times.push(t),drawArrays:()=>draws++},{get:(o,k)=>k in o?o[k]:(()=>{})});
 const canvas={width:0,height:0,addEventListener:(n,f)=>listeners[n]=f};
 const legacy={has:()=>false,describe:()=> 'unchanged',list:()=>[{id:'nessun-dorma'},{id:'other'}],available:()=>false,init:id=>({id}),draw:()=>{fallback++;return 'fallback';}};
 const window={ClassicaRealism:legacy,dispatchEvent(){},ClassicaNatureGL:{acquire:()=>noGL?null:{canvas,gl},material(id,url,announce,release){requests.push({id,url});releases.push(release);return {state:url.endsWith('.png')?maskState:'ready',value:{url}};}}};
 vm.runInNewContext(source,{window,CustomEvent:function(){}});const api=window.ClassicaRealism,st=api.init('nessun-dorma'),ctx={drawImage(){}};
 return {api,st,ctx,canvas,listeners,releases,requests,times,draw:(t=4)=>api.draw(ctx,390,844,t,st),counts:()=>({uploads,deleted,fallback,draws})};
}
let h=harness();assert.equal(h.draw(),true);assert.equal(h.counts().uploads,2);assert(h.requests.every(r=>r.id==='nessun-dorma'));assert.equal(h.requests.length,2);checked+=4;
h.draw(4);assert.equal(h.counts().uploads,2);assert.deepEqual(h.times,[4,4]);h.draw(92);assert.equal(h.times.at(-1),92);h.draw(NaN);assert.equal(h.times.at(-1),0);checked+=4;
assert.equal(h.canvas.width,277);assert.equal(h.canvas.height,600);checked+=2;
h.releases[0]();assert.equal(h.counts().deleted,2);h.draw();assert.equal(h.counts().uploads,4);checked+=2;
assert.equal(h.api.describe('other'),'unchanged');assert.equal(h.api.draw(h.ctx,10,10,0,{id:'other'}),'fallback');checked+=2;
for(const maskState of ['queued','loading','failed','inactive']){h=harness({maskState});assert.equal(h.draw(),'fallback');assert.equal(h.counts().draws,0);checked+=2;}
for(const failSlot of [0,1]){h=harness({failSlot});assert.equal(h.draw(),'fallback');assert.equal(h.counts().draws,0);h.draw();assert.equal(h.counts().draws,0);checked+=3;}
for(const cfg of [{lost:true},{noGL:true}]){h=harness(cfg);assert.equal(h.draw(),'fallback');checked++;}
h=harness();h.draw();h.listeners.webglcontextrestored();assert.equal(h.counts().deleted,2);h.draw();assert.equal(h.counts().uploads,4);checked+=2;
console.log(JSON.stringify({pass:true,checks:checked,scope:'nessun-dorma only',twoMaterialsSameScene:true,fallback:true,releaseRestore:true,timeForwarded:true,physicalGpu:false}));
