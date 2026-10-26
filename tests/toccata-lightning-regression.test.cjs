'use strict';
// Run: node tests/toccata-lightning-regression.test.cjs [repository-root]
// Pure Node: no browser, native Canvas, GPU, original source fixture or network needed.
const fs=require('fs'),vm=require('vm'),assert=require('assert'),path=require('path'),crypto=require('crypto');
const root=path.resolve(process.argv[2]||path.join(__dirname,'..'));
const after=fs.readFileSync(path.join(root,'realism-nature-lightning.js'),'utf8');
const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
const rendererStart=after.indexOf(' let renderer;');assert(rendererStart>=0);
assert.equal(sha(after.slice(rendererStart)),'77029ebecb11ecaa3be14ab8d302bfd43864cd48c5b0b5eef60a8714c1fbe7b1','Shared renderer/lifecycle changed; re-review deliberately');
const cloudStart=after.indexOf(' vec2 uv=gl_FragCoord.xy/resolution;'),cloudEnd=after.indexOf(' // Two staggered triplets');assert(cloudStart>=0&&cloudEnd>cloudStart);
assert.equal(sha(after.slice(cloudStart,cloudEnd)),'745e30f66adeecc468398f469921e2c56ad641d38851507c65f15360f7c11497','Existing photo/cloud motion changed; re-review deliberately');
assert(after.includes("id='toccata-fugue-dm'"));
assert(!after.includes('静かに現れて消える'));
const offsets=[...after.matchAll(/col\+=strike\(p,burst-([\d.]+),seed\+\d\.\);/g)].map(m=>+m[1]);assert.equal(offsets.length,6);
const onsets=Array.from({length:11},(_,cycle)=>offsets.map(t=>t+cycle*4.8)).flat();let maxPerSecond=0,minGap=Infinity;
for(let i=0;i<onsets.length;i++){if(i)minGap=Math.min(minGap,onsets[i]-onsets[i-1]);maxPerSecond=Math.max(maxPerSecond,onsets.filter(t=>t>=onsets[i]-1e-10&&t<onsets[i]+1-1e-10).length);}
assert(minGap>.43999999);assert.equal(maxPerSecond,3);
function exercise(source){
 const events=[],listeners={},calls=[],uniforms=[],state={lost:false,material:'ready'};let resource=0,release;
 const gl=new Proxy({NO_ERROR:0,COMPILE_STATUS:35713,LINK_STATUS:35714,VERTEX_SHADER:35633,FRAGMENT_SHADER:35632,isContextLost:()=>state.lost,getError:()=>0,getShaderParameter:()=>true,getProgramParameter:()=>true,getAttribLocation:()=>0,getUniformLocation:(_,name)=>name,
  shaderSource:()=>{},uniform1f:(name,t)=>uniforms.push([name,t]),
 },{get(o,k){if(k in o)return o[k];if(/^create/.test(k))return ()=>{calls.push([k,++resource]);return resource;};if(/^[A-Z_0-9]+$/.test(k))return k;return (...args)=>calls.push([k,...args.filter(a=>typeof a==='string'||typeof a==='number')]);}});
 const canvas={width:1,height:1,addEventListener:(type,fn)=>listeners[type]=fn};
 const legacy={has:key=>key==='other',describe:key=>'legacy '+key,list:()=>[{id:'toccata-fugue-dm'},{id:'other'}],available:key=>key==='other',init:key=>({id:key,legacy:true}),draw:(c,w,h,t,st)=>{events.push(['fallback',st.id,t]);return true;}};
 const window={ClassicaRealism:legacy,ClassicaNatureGL:{acquire:()=>({canvas,gl}),material:(id,url,a,r)=>{release=r;return {state:state.material,value:{}};}},dispatchEvent:e=>events.push(['event',e.type])};
 vm.runInNewContext(source,{window,CustomEvent:class{constructor(type,detail){this.type=type;this.detail=detail;}},Float32Array});
 const api=window.ClassicaRealism,c={drawImage:(...a)=>events.push(['draw',...a.slice(1)])};
 assert(api.has('toccata-fugue-dm'));assert(api.has('other'));assert(!api.has('unknown'));assert.equal(api.list().length,2);assert.equal(api.describe('other'),'legacy other');assert(api.available('toccata-fugue-dm'));
 let st=api.init('toccata-fugue-dm');
 for(const t of [0,.23,.65,12,48,.23,3.7,.23])assert(api.draw(c,1920,1080,t,st));
 assert.equal(canvas.width,960);assert.equal(canvas.height,540);
 assert.deepEqual(uniforms.map(u=>u[1]),[0,.23,.65,12,48,.23,3.7,.23]);
 // No retained animation history: pause, out-of-order seek-like time input and re-entry
 // all forward the exact supplied time; GLSL is a pure time function.
 st=api.init('toccata-fugue-dm');assert(api.draw(c,277,600,.23,st));assert.equal(uniforms.at(-1)[1],.23);
 assert(api.draw(c,277,600,NaN,st));assert.equal(uniforms.at(-1)[1],0);
 assert.equal(api.draw(c,0,0,0,st),false);
 assert(api.draw(c,277,600,2,api.init('other')));assert.equal(events.at(-1)[0],'fallback');
 state.material='failed';assert(api.draw(c,277,600,2,st));assert.equal(events.at(-1)[0],'fallback');state.material='ready';
 state.lost=true;assert(api.draw(c,277,600,2,st));assert.equal(events.at(-1)[0],'fallback');state.lost=false;
 const texturesBefore=calls.filter(c=>c[0]==='deleteTexture').length;release();assert.equal(calls.filter(c=>c[0]==='deleteTexture').length,texturesBefore+1);
 assert(api.draw(c,277,600,.23,st));listeners.webglcontextrestored();assert(calls.some(c=>c[0]==='deleteProgram'));assert(calls.some(c=>c[0]==='deleteBuffer'));assert(api.draw(c,277,600,.23,st));
 return {events,calls,uniforms};
}
exercise(after);
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
assert(html.includes('const t=REDUCED?12:'));assert(html.includes('if(!REDUCED) SS.raf=requestAnimationFrame(ssLoop)'));assert(html.includes('(SS.dirty||!SS.paused)'));
const report={pass:true,target:'toccata-fugue-dm Realism only',rendererLifecycleByteIdentical:true,cloudPhotoCodeByteIdentical:true,sourceHash:crypto.createHash('sha256').update(after).digest('hex'),minOnsetGapSeconds:minGap,maxOnsetGroupsInAnyOneSecond:maxPerSecond,strikeGroupsPer48Seconds:60,mainStrokeEndSeconds:.17,afterglowEndSeconds:.655,sharedReducedMotionStaticTime:12,tests:['pause/repeated time','out-of-order time','re-entry','finite-time normalization','unknown scene forwarding','material failure','lost context','texture release','context restoration','size cap'],scopeNote:'Time seeking is tested as renderer input. Existing Realism host uses elapsed animation time, not media-seek synchronization; it is unchanged.',flashNote:'Onset groups are not a formal WCAG flash count. No claim of formal flash compliance.'};
console.log(JSON.stringify(report,null,2));
