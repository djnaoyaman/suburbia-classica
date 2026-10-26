// Read-only regression: node test-production-bwv.cjs CANDIDATE_ROOT BASELINE_ROOT
// Requires @napi-rs/canvas; absence is an error unless --allow-native-skip is explicit.
const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert'),crypto=require('crypto');
const root=path.resolve(process.argv[2]||''),baseline=path.resolve(process.argv[3]||'');
if(!process.argv[2]||!process.argv[3])throw new Error('Usage: test-production-bwv.cjs CANDIDATE_ROOT BASELINE_ROOT [--allow-native-skip]');
let createCanvas;try{({createCanvas}=require('@napi-rs/canvas'));}catch(e){if(process.argv.includes('--allow-native-skip')){console.log(JSON.stringify({status:'SKIP',reason:'Native Canvas unavailable; no native or lifecycle PASS claimed.'}));process.exit(0);}throw e;}
const base=fs.readFileSync(path.join(baseline,'visual-art.js'),'utf8'),candidate=fs.readFileSync(path.join(root,'visual-art.js'),'utf8'),index=fs.readFileSync(path.join(root,'index.html'),'utf8');
let allocations=0;const buffers=[];
function load(text){const window={},document={createElement(tag){assert.equal(tag,'canvas');allocations++;const c=createCanvas(1,1);for(const key of ['width','height']){let proto=c;while(!Object.getOwnPropertyDescriptor(proto,key))proto=Object.getPrototypeOf(proto);const descriptor=Object.getOwnPropertyDescriptor(proto,key);let logical=1;Object.defineProperty(c,key,{get(){return logical;},set(v){logical=v;descriptor.set.call(c,v||1);}});}buffers.push(c);return c;}};vm.runInNewContext(text,{window,document,console,Proxy,Number,Math,Float64Array});return window.ClassicaVisual;}
const a=load(base),b=load(candidate),report={otherPixelCases:0,bwvCapCases:0,lifecycle:[],limits:'Native Canvas/VM, not browser/mobile. Canvas dimension setters model browser zero dimensions because napi native maps zero to its default size; released test storage uses 1px and logical zero. Y cap is intentionally not pixel-identical to full DPR.'};
function cv(w,h,dpr){return createCanvas(Math.round(w*dpr),Math.round(h*dpr));}
function pix(c){return Buffer.from(c.getContext('2d').getImageData(0,0,c.width,c.height).data);}
for(const id of a.list())if(id!=='prelude-bwv846'){
 const aa=a.create(id),bb=b.create(id);
 for(const [w,h,dpr]of[[277,600,1],[277,600,2],[960,540,1]])for(const t of[0,6,12,18]){const x=cv(w,h,dpr),y=cv(w,h,dpr);aa.draw(x.getContext('2d'),w,h,t);bb.draw(y.getContext('2d'),w,h,t);assert(pix(x).equals(pix(y)),id);report.otherPixelCases++;x.width=x.height=y.width=y.height=1;}
 bb.dispose();
}
assert.equal(allocations,0);
const marker='works["prelude-bwv846"] = (() => { const module = {exports:{}};';
const start=candidate.indexOf(marker);assert(start>=0,'embedded BWV missing');
const end=candidate.indexOf('return module.exports; })();',start);assert(end>start);
const embedded=candidate.slice(start+marker.length,end),moduleContext={module:{exports:{}},Math,Number,Float64Array};
vm.runInNewContext(embedded,moduleContext);const opt=moduleContext.module.exports;assert.equal(typeof opt.render,'function');
report.embeddedBwvSha256=crypto.createHash('sha256').update(embedded).digest('hex');
function expected(w,h,dpr,t){const x=cv(w,h,dpr),W=x.width,H=x.height,capH=Math.min(H,Math.round(h)),s=createCanvas(W,capH),c=s.getContext('2d'),unit=Math.min(w,h)/277,lw=w/unit,lh=h/unit,sx=W/lw,sy=capH/lh;const proxy=new Proxy(c,{get(ctx,k){if(k==='setTransform')return(a,b,d,e,x,y)=>ctx.setTransform(a*sx,b*sy,d*sx,e*sy,x*sx,y*sy);const v=ctx[k];return typeof v==='function'?v.bind(ctx):v},set(ctx,k,v){ctx[k]=v;return true}});opt.render(proxy,lw,lh,t);const out=x.getContext('2d');out.imageSmoothingQuality='high';out.drawImage(s,0,0,W,H);const bytes=pix(x);s.width=s.height=x.width=x.height=1;return bytes;}
const bw=b.create('prelude-bwv846');
for(const[w,h,dpr]of[[277,600,2],[390,844,2],[960,540,2],[960,405,2],[600,600,2],[277,600,3]])for(const t of[0,6,12,18,24]){const x=cv(w,h,dpr);bw.draw(x.getContext('2d'),w,h,t);assert(pix(x).equals(expected(w,h,dpr,t)));report.bwvCapCases++;x.width=x.height=1;}
assert.equal(allocations,1);report.lifecycle.push('30 draws/resizes reuse exactly one backing');
let active=buffers.filter(c=>c.width>0&&c.height>0);assert.equal(active.length,1);
const second=b.create('prelude-bwv846'),out=cv(277,600,2);second.draw(out.getContext('2d'),277,600,6);assert.equal(buffers.filter(c=>c.width>0&&c.height>0).length,1);bw.dispose();assert.equal(buffers.filter(c=>c.width>0&&c.height>0).length,1);second.dispose();assert.equal(buffers.filter(c=>c.width>0&&c.height>0).length,0);report.lifecycle.push('owner replacement releases old backing; stale owner dispose cannot release current; dispose zeros final backing');
const direct=b.create('prelude-bwv846'),count=allocations;direct.draw(cv(277,600,1).getContext('2d'),277,600,6);assert.equal(allocations,count);direct.dispose();report.lifecycle.push('DPR1 direct rendering allocates no backing');
const seek=b.create('prelude-bwv846'),o=cv(277,600,2);seek.draw(o.getContext('2d'),277,600,6);const p=pix(o);seek.draw(o.getContext('2d'),277,600,18);seek.draw(o.getContext('2d'),277,600,6);assert(p.equals(pix(o)));seek.draw(o.getContext('2d'),277,600,6);assert(p.equals(pix(o)));seek.dispose();report.lifecycle.push('seek and repeated paused/reduced time are pixel-identical');
// Real index function bodies executed against controlled DOM/player dependencies.
function extract(name,next){const from=index.indexOf('function '+name+'('),to=index.indexOf('function '+next+'(',from+1);assert(from>=0&&to>from,name+' missing');return index.slice(from,to);}
const elements=new Map(),events=[];
const previous=b.create('prelude-bwv846');previous.draw(cv(277,600,2).getContext('2d'),277,600,6);
let disposed=0;const dispose=previous.dispose;previous.dispose=()=>{events.push('dispose');disposed++;dispose();};
const song={id:'prelude-bwv846',title:'Prelude',en:'Prelude — BWV846',composer:'Bach',year:'1722',yt:{who:'Artist',rec:'2000'}};
const ctx={SS:{visual:true,art:previous,on:true,W:277,H:600},SONGS:[song],artMode:'visual',playing:false,
 window:{ClassicaVisual:b,ClassicaImpressive:{create:()=>null,activate:()=>events.push('impressiveActivate')},ClassicaNatureGL:{activate:()=>events.push('natureActivate')}},
 performance:{now:()=>123},ssVisualMode:()=>{},ssClearFrame:()=>events.push('clear'),ssArtNote:()=>{},ssSyncArtTone:()=>{},ssSyncCredit:()=>{},ssMaterialPhase:()=>'',
 $:id=>{if(!elements.has(id))elements.set(id,{});return elements.get(id);},
 cancelAnimationFrame:()=>{},clearTimeout:()=>{},ssTouchInert:()=>{},ssEl:{classList:{remove:()=>{}},setAttribute:()=>{},inert:false},document:{fullscreenElement:null}};
vm.createContext(ctx);vm.runInContext(extract('ssSet','ssImpressiveTime')+extract('ssHide','ssSwap'),ctx);
ctx.ssSet(0);assert.equal(disposed,1);assert.equal(events[0],'dispose');assert.equal(buffers.filter(c=>c.width>0&&c.height>0).length,0);assert.equal(ctx.SS.paused,true);assert.equal(ctx.SS.dirty,true);assert.equal(elements.get('#ssTj').textContent,'Prelude');
ctx.SS.art.draw(cv(277,600,2).getContext('2d'),277,600,6);assert.equal(buffers.filter(c=>c.width>0&&c.height>0).length,1);ctx.ssHide();assert.equal(ctx.SS.on,false);assert.equal(buffers.filter(c=>c.width>0&&c.height>0).length,0);ctx.ssHide();
// Open mode switch leaves no BWV backing and preserves the existing fallback creation path.
ctx.SS.on=true;ctx.SS.visual=true;ctx.SS.art=b.create('prelude-bwv846');ctx.SS.art.draw(cv(277,600,2).getContext('2d'),277,600,6);ctx.artMode='impressive';ctx.ssSet(0);assert.equal(ctx.SS.visual,false);assert.equal(buffers.filter(c=>c.width>0&&c.height>0).length,0);
report.lifecycle.push('actual ssSet/ssHide bodies: dispose precedes replacement, hide releases, repeat hide safe, mode change releases; paused/dirty and title retained');
// Full 24-second bounded-raster sequence and loop boundary, 25fps.
const seq=b.create('prelude-bwv846'),screen=cv(277,600,2),sc=screen.getContext('2d');let first,last,previousPixels,maxMean=0;
for(let frame=0;frame<=600;frame++){const t=frame/25;seq.draw(sc,277,600,t);const px=pix(screen);if(frame===0)first=Buffer.from(px);if(previousPixels){let sum=0;for(let k=0;k<px.length;k+=4)sum+=Math.abs(px[k]-previousPixels[k])+Math.abs(px[k+1]-previousPixels[k+1])+Math.abs(px[k+2]-previousPixels[k+2]);maxMean=Math.max(maxMean,sum/(px.length*.75));}if([0,75,150,225,300,450,599,600].includes(frame))assert(px.equals(expected(277,600,2,t)),'fresh cap frame '+frame);previousPixels=px;last=px;}
assert(first.equals(last),'loop endpoint');
function difference(t1,t2){seq.draw(sc,277,600,t1);const p=pix(screen);seq.draw(sc,277,600,t2);const q=pix(screen);let sum=0,max=0;for(let k=0;k<p.length;k+=4)for(let c=0;c<3;c++){const d=Math.abs(p[k+c]-q[k+c]);sum+=d;max=Math.max(max,d);}return{mean:sum/(p.length*.75),max};}
const nearwrap={before:difference(23.999,24),after:difference(24,24.001)};assert(nearwrap.before.mean<1&&nearwrap.after.mean<1,'near-wrap discontinuity');seq.dispose();assert.equal(buffers.filter(c=>c.width>0&&c.height>0).length,0);
report.sequence={frames:601,logical:[277,600],dpr:2,loopExact:true,freshCapComparisons:8,maxMeanRgbStep:maxMean,nearwrap};
report.status='PASS';report.sha256=Object.fromEntries(['visual-art.js','index.html'].map(f=>[f,crypto.createHash('sha256').update(fs.readFileSync(path.join(root,f))).digest('hex')]));console.log(JSON.stringify(report,null,2));
