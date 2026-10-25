/* Visual: four approved full-field works. Editorial animation, not audio analysis. */
(function(){'use strict';
const works = Object.create(null);
works["clair-de-lune"] = (() => { const module = {exports:{}};
'use strict';
// Original field of light trajectories. Editorial time, not an audio/physical solver.
const TAU=Math.PI*2;
function render(c,w,h,time){const t=((time%24)+24)%24,ph=TAU*t/24;c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';
const bg=c.createLinearGradient(0,0,w,h);bg.addColorStop(0,'#071630');bg.addColorStop(.52,'#062536');bg.addColorStop(1,'#10172f');c.fillStyle=bg;c.fillRect(0,0,w,h);
c.lineCap='round';c.lineJoin='round';
const count=208;
for(let i=0;i<count;i++){
 const v=-.32+1.64*i/(count-1),phase=v*TAU;
 const lit=.5+.5*Math.sin(phase*1.6-ph);
 const g=c.createLinearGradient(-w*.1,h*v,w*1.1,h*(v+.1));
 const center=.5+.30*Math.sin(ph+phase*.7);
 g.addColorStop(0,`rgba(60,137,233,${.43+.14*lit})`);g.addColorStop(Math.max(.05,center-.25),`rgba(78,204,233,${.62+.18*lit})`);g.addColorStop(center,`rgba(224,247,251,${.80+.18*lit})`);g.addColorStop(Math.min(.95,center+.24),`rgba(104,202,242,${.60+.18*lit})`);g.addColorStop(1,`rgba(94,123,222,${.46+.16*lit})`);
 c.strokeStyle=g;c.lineWidth=.48+.30*lit;c.beginPath();
 for(let j=0;j<=112;j++){
  const u=-.12+1.24*j/112;
  const a=TAU*(u*.76)-ph+v*3.9;
  const b=TAU*(u*1.31)+v*5.4+Math.sin(ph)*.8;
  const y=v+.138*Math.sin(a)+.088*Math.sin(b)+.032*Math.sin(TAU*u*2.1-v*8+ph);
  const x=u+.025*Math.sin(v*8-ph)*Math.sin(Math.PI*u);
  if(j===0)c.moveTo(x*w,y*h);else c.lineTo(x*w,y*h);
 }
 c.stroke();
}
}
module.exports={render,id:'clair-fullfield',duration:24};

return module.exports; })();
works["moonlight"] = (() => { const module = {exports:{}};
'use strict';
// A continuous vertical register compressed and released across the full viewport.
// Independent visual phrase, not a waveform or recorded musical timing.
const TAU=Math.PI*2;
function render(c,w,h,time){const ph=TAU*((time%24+24)%24)/24;
c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';
const bg=c.createLinearGradient(0,0,w,h);bg.addColorStop(0,'#111a38');bg.addColorStop(.48,'#14223b');bg.addColorStop(1,'#16142f');c.fillStyle=bg;c.fillRect(0,0,w,h);
c.lineCap='round';c.lineJoin='round';
// Parallel registrations remain ordered: a travelling compression changes spacing,
// unlike the horizontal folded-wave field in the approved Clair study.
for(let i=0;i<242;i++){
 const u=-2+5*i/241;
 const strength=.68+.22*Math.cos(u*4.7-ph);
 const g=c.createLinearGradient(0,-h*.08,0,h*1.08);
 g.addColorStop(0,`rgba(106,119,204,${strength*.62})`);g.addColorStop(.26,`rgba(150,189,238,${strength*.9})`);g.addColorStop(.58,`rgba(237,243,252,${strength})`);g.addColorStop(.82,`rgba(159,175,232,${strength*.9})`);g.addColorStop(1,`rgba(113,101,196,${strength*.65})`);
 c.strokeStyle=g;c.lineWidth=.65+.18*(.5+.5*Math.sin(u*5+ph));c.beginPath();
 for(let j=0;j<=112;j++){
 const v=-.12+1.24*j/112;
 const contraction=.35+.65*(.5+.5*Math.cos(TAU*v-ph));
 const center=.5+.16*Math.sin(ph)+.065*Math.sin(TAU*v+ph);
 const x=center+(u-.5)*contraction;
 if(j===0)c.moveTo(x*w,v*h);else c.lineTo(x*w,v*h);
 }
 c.stroke();
}
}
module.exports={render,id:'moonlight-fullfield',duration:24};

return module.exports; })();
works["gymnopedie-1"] = (() => { const module = {exports:{}};
'use strict';
const TAU=Math.PI*2;
const smooth=x=>{x=Math.max(0,Math.min(1,x));return x*x*(3-2*x);};
function render(c,w,h,time){
 const t=((Number.isFinite(time)?time:0)%24+24)%24,p=TAU*t/24;
 c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;
 const bg=c.createLinearGradient(0,0,w,h);bg.addColorStop(0,'#082C36');bg.addColorStop(.5,'#12474B');bg.addColorStop(1,'#092C38');c.fillStyle=bg;c.fillRect(0,0,w,h);
 // Broad horizontal strata. Counter-propagating fronts, not sinuous curves.
 const rows=Math.max(220,Math.ceil(h/.9)),dy=h/rows;
 for(let j=0;j<rows;j++){
  const v=(j+.5)/rows,layer=Math.floor(v*8),local=v*8-layer;
  const q=p-layer*.54;
  const left=.16+.66*(.5-.5*Math.cos(q));
  const right=.18+.66*(.5+.5*Math.cos(q-.92));
  const edge=smooth(local/.16)*smooth((1-local)/.18);
  const fine=.80+.14*Math.cos(j*2.399)+.06*Math.cos(j*.63);
  const slab=.63+.37*edge;
  const g=c.createLinearGradient(0,0,w,0);
  for(let k=0;k<=24;k++){
   const u=k/24;
   const a=1-smooth((u-left+.23)/.46);
   const b=smooth((u-right+.23)/.46);
   const cross=a*b;
   const facing=Math.exp(-Math.pow((u-left)/.18,2))*.20+Math.exp(-Math.pow((u-right)/.18,2))*.18;
   const rawIvory=(cross*1.48+facing)*slab;
   const ivory=rawIvory<=.75?rawIvory:.75+.25*(1-Math.exp(-(rawIvory-.75)/.25));
   const amber=(layer===2||layer===5)?.28*b*(1-a)*edge:0;
   const lum=(.25+.26*a+.23*b)*fine;
   const R=Math.round(12+lum*38+ivory*177+amber*103);
   const G=Math.round(44+lum*82+ivory*150+amber*49);
   const B=Math.round(52+lum*86+ivory*132-amber*4);
   g.addColorStop(u,`rgb(${R},${G},${B})`);
  }
  c.fillStyle=g;c.fillRect(0,j*dy,w,dy+.35);
  // Fine horizontal density marks remain part of each plane, not a point grid.
  if(j%4===0){c.fillStyle=`rgba(5,29,34,${.10+.09*(1-edge)})`;c.fillRect(0,j*dy,w,Math.max(.3,dy*.35));}
 }
 // The staggered joins articulate the layers without framing them as boxes.
 for(let n=1;n<8;n++){
  const y=h*n/8;const g=c.createLinearGradient(0,0,w,0);
  const center=.5+.30*Math.cos(p-n*.54);
  g.addColorStop(0,'rgba(210,228,220,.02)');g.addColorStop(center,'rgba(210,228,220,.28)');g.addColorStop(1,'rgba(210,228,220,.02)');
  c.fillStyle=g;c.fillRect(0,y, w,Math.max(.45,h/1400));
 }
 c.restore();
}
module.exports={render,id:'gymnopedie-fullfield',duration:24};

return module.exports; })();
works["pavane"] = (() => { const module = {exports:{}};
'use strict';
// Private full-field Visual. Rectilinear stepped planes receive unequal local light responses.
// Editorial walking/returning phrase; not score, FFT/MIDI or physical simulation.
const TAU=Math.PI*2;
function render(c,w,h,time){const t=((Number(time)||0)%24+24)%24,ph=TAU*t/24;
 c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;
 const bg=c.createLinearGradient(0,0,w,h);bg.addColorStop(0,'#211126');bg.addColorStop(.54,'#231322');bg.addColorStop(1,'#170e20');c.fillStyle=bg;c.fillRect(0,0,w,h);c.lineJoin='miter';c.lineCap='butt';
 for(let layer=1;layer>=0;layer--){
  const n=layer?24:30,dx=w/n,dy=h*(layer?-.014:.018),pitch=h/(layer?102:128);
  const role=layer?.35+.22*(.5-.5*Math.cos(ph)):.75+.25*(.5+.5*Math.cos(ph));
  for(let row=-96;row<230;row++){
   const stagger=(row%9)/9*dx,base=row*pitch;
   for(let col=-2;col<=n+2;col++){
    const x=col*dx+stagger,y=base+col*dy;if(x>w+dx||x+dx<0||y< -Math.abs(dy)-pitch||y>h+Math.abs(dy))continue;
    const u=(x+dx*.5)/w,v=y/h;
    // Two broad moving response domains. Outside them, the field stays dark.
    const signed=Math.sin(TAU*(layer?(-.34*u+.62*v):(.52*u+.30*v))+(layer?2*ph+1.05:-ph));
    const crest=Math.exp(-Math.pow(signed/(layer?.28:.34),2))*role;
    const baseRGB=layer?[117,79,126]:[128,70,69],litRGB=layer?[203,153,183]:[250,222,163];
    const rgb=baseRGB.map((a,k)=>Math.round(a+(litRGB[k]-a)*crest));
    // A local plane tone, not just a grid of equal-brightness threads.
    if(!layer){c.fillStyle=`rgba(${rgb},${.025+.51*crest})`;c.fillRect(x,y+pitch*.09,dx+.35,pitch*.72);}
    c.strokeStyle=`rgba(${rgb},${layer?.10+.42*crest:.13+.84*crest})`;c.lineWidth=layer?.35:.42+.75*crest;
    c.beginPath();c.moveTo(x,y-dy);c.lineTo(x,y);c.lineTo(x+dx,y);c.stroke();
   }
  }
 }
 c.restore();
}
module.exports={render,id:'pavane-fullfield',duration:24};

return module.exports; })();
works["fur-elise"] = (() => { const module = {exports:{}};
'use strict';
// Broad paired return gestures, not notation or measured sound.
const TAU=Math.PI*2;
function render(c,w,h,time){
 const p=TAU*((((Number.isFinite(time)?time:0)%24)+24)%24)/24;
 c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;
 const bg=c.createLinearGradient(0,0,w,h);bg.addColorStop(0,'#1c1c2b');bg.addColorStop(.5,'#33242d');bg.addColorStop(1,'#1b2332');c.fillStyle=bg;c.fillRect(0,0,w,h);
 const episode=.5-.5*Math.cos(p);
 c.lineCap='butt';c.lineJoin='miter';
 for(let k=0;k<13;k++){
  const v=(k-2)/8,y=v*h;
  const answer=.5+.5*Math.sin(p-v*3.7);
  const center=(.47+.22*Math.sin(p+v*2.1))*w;
  const rise=(.065+.07*episode)*h;
  const thickness=(.016+.025*Math.pow(answer,2))*h;
  const gap=(.045+.10*(1-answer))*w;
  for(let side=0;side<2;side++){
   const sign=side?1:-1;
   const hinge=center+sign*gap;
   const g=c.createLinearGradient(side?w:0,y,hinge,y+rise);
   g.addColorStop(0,side?'rgba(185,146,163,.19)':'rgba(199,150,140,.25)');
   g.addColorStop(.65,`rgba(230,174,158,${.38+.42*answer})`);
   g.addColorStop(1,`rgba(251,239,216,${.62+.32*answer})`);
   c.strokeStyle=g;c.lineWidth=thickness;
   c.beginPath();c.moveTo(side?w*1.08:-w*.08,y);
   c.lineTo(hinge,y);c.lineTo(hinge,y+sign*rise);
   c.lineTo(hinge-sign*(.08+.08*answer)*w,y+sign*rise);c.stroke();
  }
 }
 c.restore();
}
module.exports={render,id:'fur-elise',duration:24};

return module.exports; })();
works["tristesse"] = (() => { const module = {exports:{}};
'use strict';
// Three independent light planes: melody, inner voice and accompaniment as an
// editorial spatial association, not measured music or composer intention.
const TAU=Math.PI*2;
function render(c,w,h,time){
 const p=TAU*((((Number.isFinite(time)?time:0)%24)+24)%24)/24;
 c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;
 const bg=c.createLinearGradient(0,0,w,h);bg.addColorStop(0,'#2a253e');bg.addColorStop(.55,'#3e2a35');bg.addColorStop(1,'#202d3d');c.fillStyle=bg;c.fillRect(0,0,w,h);
 const planes=[
  {angle:-.65+.25*Math.sin(p),x:.34+.12*Math.sin(p),y:.35+.14*Math.cos(p),width:.47,color:'249,214,179',alpha:.83},
  {angle:1.07+.23*Math.sin(p+.8),x:.62+.14*Math.cos(p),y:.56+.18*Math.sin(p+.6),width:.32,color:'184,170,224',alpha:.70},
  {angle:.10+.27*Math.sin(p+2.4),x:.46+.20*Math.sin(p+1.7),y:.70+.18*Math.cos(p+1.2),width:.36,color:'243,232,215',alpha:.70}
 ];
 for(let k=0;k<3;k++){
  const q=planes[k],co=Math.cos(q.angle),si=Math.sin(q.angle);
  const point=(u,v)=>[(q.x+co*u-si*v)*w,(q.y+si*u+co*v)*h];
  const a=point(-1.4,-q.width/2),b=point(1.4,-q.width/2),d=point(1.4,q.width/2),e=point(-1.4,q.width/2);
  const lo=point(0,-q.width/2),hi=point(0,q.width/2),g=c.createLinearGradient(lo[0],lo[1],hi[0],hi[1]);
  const gleam=.33+.24*Math.sin(p+k*1.8);
  g.addColorStop(0,`rgba(${q.color},.07)`);g.addColorStop(gleam,`rgba(${q.color},${q.alpha})`);g.addColorStop(1,`rgba(${q.color},.12)`);
  c.fillStyle=g;c.beginPath();c.moveTo(...a);c.lineTo(...b);c.lineTo(...d);c.lineTo(...e);c.closePath();c.fill();
 }
 c.restore();
}
module.exports={render,id:'tristesse',duration:24};

return module.exports; })();
works["fantaisie-impromptu"] = (() => { const module = {exports:{}};
'use strict';
// Opposing four/three spatial registrations: editorial cross-rhythm, not MIDI.
const TAU=Math.PI*2;
function render(c,w,h,time){
 const p=TAU*(((Number.isFinite(time)?time:0)%24+24)%24)/24;
 c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;
 const bg=c.createLinearGradient(0,0,w,h);bg.addColorStop(0,'#13253A');bg.addColorStop(.52,'#251A3C');bg.addColorStop(1,'#0C303D');c.fillStyle=bg;c.fillRect(0,0,w,h);
 c.lineCap='round';c.lineJoin='round';
 // A broad, breathing release in the middle; both registrations remain present.
 const calm=.5-.5*Math.cos(p);
 for(let family=0;family<2;family++){
  const sign=family?1:-1,group=family?3:4;
  for(let k=0;k<248;k++){
   const u=-.8+2.6*k/247;
   const packet=.5+.5*Math.cos(group*TAU*u+sign*p);
   const alpha=.48+.47*packet;
   const g=c.createLinearGradient(0,family?h:0,w,family?0:h);
   g.addColorStop(0,family?'rgba(153,127,186,.24)':'rgba(88,161,190,.28)');
   g.addColorStop(.25,`rgba(${family?'189,177,224':'148,220,238'},${alpha})`);
   g.addColorStop(.55,`rgba(${family?'225,218,244':'222,249,250'},${alpha*.95})`);
   g.addColorStop(.82,`rgba(${family?'166,158,221':'103,200,225'},${alpha*.8})`);
   g.addColorStop(1,'rgba(111,150,190,.24)');
   c.strokeStyle=g;c.lineWidth=.78+.25*packet;c.beginPath();
   for(let j=0;j<=68;j++){
    const x=-.12+1.24*j/68;
    const bow=.085*Math.sin(Math.PI*x)*Math.sin(p+u*1.6);
    const release=calm*.095*Math.sin(Math.PI*x)*Math.sin(TAU*u);
    const gathering=.032*Math.sin(group*TAU*u+sign*p+1.5*x);
    const y=u+gathering+sign*(x-.5)*.88+bow+release;
    if(j===0)c.moveTo(x*w,y*h);else c.lineTo(x*w,y*h);
   }
   c.stroke();
  }
 }
 c.restore();
}
module.exports={render,id:'fantaisie-impromptu',duration:24};

return module.exports; })();
works["nocturne-9-2"] = (() => { const module = {exports:{}};
'use strict';
// Broad asymmetric returns of light; changing inflections over a slower support.
// Editorial composition grounded in recurring ornamented melody, not audio analysis.
const TAU=Math.PI*2;
function render(c,w,h,time){
 const p=TAU*(((Number.isFinite(time)?time:0)%24+24)%24)/24;
 c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;
 const bg=c.createLinearGradient(0,0,w,h);bg.addColorStop(0,'#12294A');bg.addColorStop(.55,'#192941');bg.addColorStop(1,'#2A223A');c.fillStyle=bg;c.fillRect(0,0,w,h);
 const point=(theta,r,k)=>{
  const bend=.1*Math.sin(theta-p)+.035*Math.sin(3*theta+p)*(k/8);
  return [( -.58+.13*Math.sin(k*.55+p)+r*(.93*Math.cos(theta)+.18*Math.cos(2*theta)+bend))*w,
   (-.12+.08*Math.cos(k*.4-p)+r*(.62*Math.sin(theta)+.1*Math.sin(2*theta-.5))+.035*Math.sin(p+k*.35))*h];
 };
 // Nine broad planes with large clear intervals, not a woven fine-line field.
 for(let k=8;k>=0;k--){
  const r=.55+k*.26+.045*Math.sin(p+k*.7),width=.065+.045*(.5+.5*Math.sin(p-k*.8));
  const phase=p+k*.35;
  const g=c.createLinearGradient(w*(-.2+.2*Math.sin(phase)),h*.1,w*1.1,h*.92);
  g.addColorStop(0,'rgba(101,142,190,.18)');g.addColorStop(.27,'rgba(191,164,179,.4)');
  g.addColorStop(.53,`rgba(247,226,198,${.73+.14*Math.sin(phase)})`);
  g.addColorStop(.74,'rgba(197,133,153,.54)');g.addColorStop(1,'rgba(87,123,176,.18)');
  c.fillStyle=g;
  for(let soft=0;soft<5;soft++){
   const edge=soft/5,wi=width*(1-.32*edge);c.globalAlpha=.3+soft*.04;c.beginPath();
   for(let j=0;j<=120;j++){const a=TAU*j/120,xy=point(a,r+wi,k);j?c.lineTo(...xy):c.moveTo(...xy);}
   for(let j=120;j>=0;j--){const a=TAU*j/120,xy=point(a,Math.max(.012,r-wi),k);c.lineTo(...xy);}
   c.closePath();c.fill('evenodd');
  }
 }
 c.restore();
}
module.exports={render,id:'nocturne-9-2',duration:24};

return module.exports; })();
function create(id){
 const work=works[id];if(!work)return null;
 let target=null,proxy=null,scale=1;
 return {light:false,init(){return null;},draw(c,w,h,time){
  if(!(w>0&&h>0))return false;
  // Keep the approved 277px logical short edge and line widths at every DPR.
  const unit=Math.min(w,h)/277, lw=w/unit, lh=h/unit;
  scale=(c.canvas.width/w)*unit;
  if(target!==c){target=c;proxy=new Proxy(c,{
   get(ctx,key){if(key==='setTransform')return(a,b,d,e,x,y)=>ctx.setTransform(a*scale,b*scale,d*scale,e*scale,x*scale,y*scale);
    const value=ctx[key];return typeof value==='function'?value.bind(ctx):value;},
   set(ctx,key,value){ctx[key]=value;return true;}
  });}
  c.save();try{work.render(proxy,lw,lh,Number.isFinite(time)?Math.max(0,time):0);}finally{c.restore();}
  return true;
 }};
}
window.ClassicaVisual=Object.freeze({create,has:id=>Object.prototype.hasOwnProperty.call(works,id),list:()=>Object.keys(works),version:'20261025-visual8'});
})();
