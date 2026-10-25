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
works["raindrop"] = (() => { const module = {exports:{}};
'use strict';
// The invariant pulse reappears inside changing space. Editorial, not audio sync.
const TAU=Math.PI*2;
function render(c,w,h,time){
 const p=TAU*((((Number.isFinite(time)?time:0)%24)+24)%24)/24;
 c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;
 c.fillStyle='#101d30';c.fillRect(0,0,w,h);
 const wash=c.createLinearGradient(0,0,w,h);wash.addColorStop(0,'#18253a');wash.addColorStop(.52,'#273a4a');wash.addColorStop(1,'#151c2b');c.fillStyle=wash;c.fillRect(0,0,w,h);
 const centers=[[.26,.28,0],[.74,.71,2.1],[.55,1.13,4.2]];
 const rows=118,steps=64;
 for(let j=-12;j<rows+12;j++){
  const v=j/rows;
  c.beginPath();
  let intensity=0;
  for(let i=0;i<=steps;i++){
   const u=-.14+1.28*i/steps;
   let d=0,light=0;
   for(const [cx,cy,ph]of centers){
    const dx=(u-cx)*.64,dy=v-cy,rr=Math.sqrt(dx*dx+dy*dy+.003);
    const wave=rr*13-p*2+ph;
    const envelope=.55+.45*Math.cos(rr*3-p+ph*.4);
    d+=Math.sin(wave)*.039*envelope/(1+rr*1.4);
    light+=Math.pow(.5+.5*Math.cos(wave),8)*envelope*.34;
   }
   const y=(v+d+.07*Math.sin(u*3+p)*Math.cos(v*2-p))*h;
   const x=u*w;
   if(i===0)c.moveTo(x,y);else c.lineTo(x,y);
   intensity+=light/(steps+1);
  }
  const gl=.5+.5*Math.sin(v*8-p*2);
  const g=c.createLinearGradient(0,0,w,0);
  g.addColorStop(0,`rgba(144,179,201,${.26+intensity*.7})`);
  g.addColorStop(.32,`rgba(223,237,235,${.58+intensity*.5})`);
  g.addColorStop(.7,`rgba(242,215,172,${.38+gl*.4+intensity*.4})`);
  g.addColorStop(1,`rgba(154,186,209,${.26+intensity*.7})`);
  c.strokeStyle=g;c.lineWidth=(.35+4.5*Math.pow(gl,12))*Math.max(1,h/600);c.stroke();
 }
 c.restore();
}
module.exports={render,id:'raindrop',duration:24};

return module.exports; })();
works["traumerei"] = (() => { const module = {exports:{}};
'use strict';
// Returning open contours reveal different inner depths. Editorial time only.
const TAU=Math.PI*2;
function render(c,w,h,time){
 const p=TAU*((((Number.isFinite(time)?time:0)%24)+24)%24)/24;
 c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;
 const bg=c.createLinearGradient(0,0,w,h);bg.addColorStop(0,'#182039');bg.addColorStop(.5,'#342c45');bg.addColorStop(1,'#192638');c.fillStyle=bg;c.fillRect(0,0,w,h);
 for(let k=0;k<5;k++){
  const ph=p+k*1.43,base=-.13+k*.29+.075*Math.sin(ph),bend=.2+.65*(.5+.5*Math.sin(p+k*.7));
  const lift=.09+.15*Math.sin(k*1.1+.7);
  const plane=c.createLinearGradient(0,(base-.2)*h,w,(base+.4)*h);
  plane.addColorStop(0,'rgba(184,184,220,.08)');plane.addColorStop(.45,'rgba(242,216,205,.38)');plane.addColorStop(1,'rgba(174,186,221,.10)');
  c.fillStyle=plane;c.beginPath();c.moveTo(-.15*w,(base+.12)*h);
  c.bezierCurveTo((bend-.56)*w,(base-lift)*h,(bend+.04)*w,(base-lift+.07*Math.sin(ph))*h,1.15*w,(base+.13+.05*Math.sin(ph))*h);
  c.lineTo(1.15*w,(base+.39+.05*Math.sin(ph))*h);
  c.bezierCurveTo((bend+.04)*w,(base+.26-lift+.07*Math.sin(ph+1))*h,(bend-.56)*w,(base+.26-lift-.10)*h,-.15*w,(base+.38)*h);c.closePath();c.fill();
  for(let n=0;n<42;n++){
   const q=n/41,depth=Math.pow(q,1.8),rise=.09+.15*Math.sin(k*1.1+.7);
   const yy=base+depth*.26;
   const alpha=(.18+.82*Math.pow(.5+.5*Math.cos(q*4.5-p+k),3))*(.50+.50*Math.sin(Math.PI*(.06+.88*q)));
   const gx=(.2+.6*(.5+.5*Math.sin(ph)))*w;
   const g=c.createLinearGradient(-.1*w,0,1.1*w,0);
   const col=k%2?'222,186,180':'206,211,235';
   g.addColorStop(0,`rgba(${col},.015)`);g.addColorStop(.20,`rgba(${col},${alpha*.6})`);g.addColorStop(.54,`rgba(249,233,211,${alpha})`);g.addColorStop(.83,`rgba(${col},${alpha*.48})`);g.addColorStop(1,`rgba(${col},.015)`);
   c.strokeStyle=g;c.lineWidth=(.6+5.8*Math.pow(q,3))*Math.max(1,h/600);
   c.beginPath();c.moveTo(-.15*w,(yy+.12)*h);
   c.bezierCurveTo((bend-.56)*w,(yy-rise-.10*depth)*h,(bend+.04)*w,(yy-rise+.07*Math.sin(ph+q))*h,1.15*w,(yy+.13+.05*Math.sin(ph))*h);c.stroke();
  }
 }
 c.restore();
}
module.exports={render,id:'traumerei',duration:24};

return module.exports; })();
works["liebestraum-3"] = (() => { const module = {exports:{}};
'use strict';
// Sustained cantabile light, with two branching responses which rejoin the span.
// An editorial spatial interpretation, not music analysis or fluid simulation.
const TAU=Math.PI*2;
function render(c,w,h,time){
 const p=TAU*(((Number.isFinite(time)?time:0)%24+24)%24)/24;
 c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;
 c.fillStyle='#291E35';c.fillRect(0,0,w,h);
 const rows=Math.ceil(h/2),dy=h/rows;
 for(let j=0;j<rows;j++){
  const v=(j+.5)/rows,flow=.24+.54*v+.10*Math.sin(TAU*v+p),fork=Math.pow(Math.sin(Math.PI*v),2);
  const left=flow-.52*fork*(.8+.2*Math.cos(p)),right=flow+.48*fork*(.8-.2*Math.cos(p));
  const width=.075+.045*(.5+.5*Math.cos(p-TAU*v));
  const g=c.createLinearGradient(0,0,w,0);
  for(let n=0;n<=64;n++){
   const u=n/64;
   const main=.45*Math.exp(-Math.pow((u-flow)/width,2))+.6*Math.exp(-Math.pow((u-flow)/(width*.4),2));
   const sides=.32*Math.exp(-Math.pow((u-left)/.11,2))+.47*Math.exp(-Math.pow((u-left)/.039,2))+.3*Math.exp(-Math.pow((u-right)/.12,2))+.43*Math.exp(-Math.pow((u-right)/.046,2));
   const surrounding=.13+.14*(.5+.5*Math.cos(TAU*(u*.7-v*.4)+p));
   const light=1-Math.exp(-(main+sides+surrounding)*1.2);
   const rose=.5+.5*Math.sin(p+TAU*v*.7-u*2);
   const r=Math.round(41+205*light),gg=Math.round(30+(195-12*rose)*light),b=Math.round(53+(176-8*rose)*light);
   g.addColorStop(u,`rgb(${r},${gg},${b})`);
  }
  c.fillStyle=g;c.fillRect(0,j*dy,w,dy+.15);
 }
 // Fine internal articulations stay within the broad light spans.
 c.lineCap='round';c.lineJoin='round';
 for(let arm=-1;arm<=1;arm++)for(let k=0;k<11;k++){
  const u=(k-5)/5,g=c.createLinearGradient(0,0,w,h);
  const alpha=.46+.35*(.5+.5*Math.cos(p+arm*.8+u));
  g.addColorStop(0,'rgba(231,194,207,0)');g.addColorStop(.22,`rgba(237,207,208,${alpha*.65})`);g.addColorStop(.52,`rgba(255,242,221,${alpha})`);g.addColorStop(.82,`rgba(216,189,216,${alpha*.6})`);g.addColorStop(1,'rgba(197,177,208,0)');
  c.strokeStyle=g;c.lineWidth=.52+.16*(1-Math.abs(u));c.beginPath();
  for(let j=0;j<=100;j++){
   const v=-.1+1.2*j/100,flow=.24+.54*v+.10*Math.sin(TAU*v+p),fork=Math.pow(Math.sin(Math.PI*v),2);
   const mid=flow+(arm<0?-.52*fork*(.8+.2*Math.cos(p)):arm>0?.48*fork*(.8-.2*Math.cos(p)):0);
   const x=mid+u*(.024+.012*Math.sin(TAU*v-p)*Math.sin(TAU*v-p))+.004*Math.sin(TAU*v*3+p+u*2)*fork;
   if(j===0)c.moveTo(x*w,v*h);else c.lineTo(x*w,v*h);
  }
  c.stroke();
 }
 c.restore();
}
module.exports={render,id:'liebestraum-3',duration:24};

return module.exports; })();
works["flaxen-hair"] = (() => { const module = {exports:{}};
'use strict';
// Five open tonal regions: pentatonic simplicity as editorial spatial organization.
const TAU=Math.PI*2;
function render(c,w,h,time){
 const p=TAU*(((Number.isFinite(time)?time:0)%24+24)%24)/24;
 c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;
 c.fillStyle='#243B3C';c.fillRect(0,0,w,h);
 const a=.32+.055*Math.sin(p),b=.63+.04*Math.cos(p),y=.4+.045*Math.sin(p+.7),z=.72+.035*Math.cos(p-.4);
 const cells=[[[0,0],[a,0],[a+.08,y],[0,y+.2]],[[a,0],[1,0],[b,y-.03],[a+.08,y]],[[0,y+.2],[a+.08,y],[b,z],[0,1]],[[a+.08,y],[b,y-.03],[1,.34],[1,.85],[b,z]],[[0,1],[b,z],[1,.85],[1,1]]];
 const colors=[['#9B9878','#E8E0BD','#809A8C'],['#6E968D','#CBD9BD','#81977E'],['#7F9E90','#E7E5CA','#BDAC83'],['#C3BE91','#FAEBCD','#91AB98'],['#74958C','#D9DAC2','#C9B48C']];
 for(let k=0;k<5;k++){
  const pts=cells[k],cx=pts.reduce((s,v)=>s+v[0],0)/pts.length,cy=pts.reduce((s,v)=>s+v[1],0)/pts.length;
  // Broad interiors carry the light; shallow open seams retain negative space.
  const g=c.createLinearGradient(w*(cx-.5+.13*Math.sin(p+k)),h*(cy-.4),w*(cx+.45),h*(cy+.5+.11*Math.cos(p-k)));
  g.addColorStop(0,colors[k][0]);g.addColorStop(.48+.17*Math.sin(p-k*.8),colors[k][1]);g.addColorStop(1,colors[k][2]);c.fillStyle=g;
  c.beginPath();pts.forEach((v,i)=>{const x=(cx+(v[0]-cx)*.985)*w,yy=(cy+(v[1]-cy)*.985)*h;i?c.lineTo(x,yy):c.moveTo(x,yy);});c.closePath();c.fill();
  c.save();c.clip();
  // Fine internal lamination bends toward each region's own edge, rather than a shared mesh.
  const angle=[.24,1.06,-.48,.7,-.18][k],dx=Math.cos(angle),dy=Math.sin(angle);
  for(let line=0;line<46;line++){
   const u=-.35+1.7*line/45,lit=.5+.5*Math.cos(TAU*u-p-k*.8);
   const gl=c.createLinearGradient(w*(cx-.45),h*(cy-.5),w*(cx+.45),h*(cy+.5));
   gl.addColorStop(0,'rgba(255,247,216,0)');gl.addColorStop(.5,`rgba(255,252,233,${.12+.32*lit})`);gl.addColorStop(1,'rgba(50,88,79,.08)');c.strokeStyle=gl;c.lineWidth=.48+.2*lit;c.beginPath();
   for(let j=0;j<=18;j++){
    const q=-.8+1.6*j/18;
    const xx=cx+q*dx-(u-.5)*dy+.025*Math.sin(q*2+p+k)*(u-.5);
    const yy=cy+q*dy+(u-.5)*dx+.045*Math.cos(q*2-p+k)*(u-.5);
    if(j===0)c.moveTo(xx*w,yy*h);else c.lineTo(xx*w,yy*h);
   }
   c.stroke();
  }
  c.restore();
 }
 c.restore();
}
module.exports={render,id:'flaxen-hair',duration:24};

return module.exports; })();
works["arabesque-1"] = (() => { const module = {exports:{}};
'use strict';
// Interlaced ornament: editorial association with continuous figuration.
const TAU=Math.PI*2;
function render(c,w,h,time){
 const p=TAU*((((Number.isFinite(time)?time:0)%24)+24)%24)/24;
 c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.lineCap='round';c.lineJoin='round';
 const bg=c.createLinearGradient(0,0,w,h);bg.addColorStop(0,'#042c2e');bg.addColorStop(.55,'#063c35');bg.addColorStop(1,'#061f2d');c.fillStyle=bg;c.fillRect(0,0,w,h);
 const point=(f,k,t)=>{const q=-.3+k*.23,phase=TAU*(t*1.13)+p+k*.5;return f===0?{x:q+.14*Math.sin(phase),y:t}:{x:t,y:q+.14*Math.sin(phase+.9)};};
 const thick=Math.min(w,h)*.055;
 function strand(f,k){
  for(let n=-3;n<=3;n++){
   const off=n*thick/7,edge=.72+.28*(n+3)/6;
   const g=c.createLinearGradient(0,0,f?w:0,f?0:h),a=.5+.5*Math.sin(p+k*.8);
   const color=f?[210,231,208]:[62,203,172];
   for(const [q,intensity]of[[0,.4],[.25,.63],[.5,.65+.35*a],[.8,.66],[1,.42]]){const z=intensity*edge;g.addColorStop(q,`rgb(${Math.round(5+color[0]*z)},${Math.round(25+color[1]*z*.9)},${Math.round(26+color[2]*z*.88)})`);}
   c.strokeStyle=g;c.lineWidth=thick/7*1.04;c.beginPath();
   for(let j=0;j<=100;j++){const t=-.2+1.4*j/100,a=point(f,k,t),b=point(f,k,t+.0001),dx=(b.x-a.x)*w,dy=(b.y-a.y)*h,len=Math.hypot(dx,dy),x=a.x*w-dy/len*off,y=a.y*h+dx/len*off;if(j===0)c.moveTo(x,y);else c.lineTo(x,y);}c.stroke();
  }
 }
 for(let f=0;f<2;f++)for(let k=0;k<8;k++)strand(f,k);
 // Alternating crossings: redraw the same continuous strand only locally.
 for(let a=0;a<8;a++)for(let b=0;b<8;b++)if((a+b)%2===0){
  let x=-.3+a*.23,y=-.3+b*.23;
  let lo=x-.14,hi=x+.14;
  for(let i=0;i<36;i++){const mid=(lo+hi)*.5,ym=point(1,b,mid).y;if(mid-point(0,a,ym).x>0)hi=mid;else lo=mid;}
  x=(lo+hi)*.5;y=point(1,b,x).y;
  c.save();c.beginPath();c.arc(x*w,y*h,thick*1.8/Math.max(.12,Math.abs(1-(.14*TAU*1.13*Math.cos(TAU*y*1.13+p+a*.5))*(.14*TAU*1.13*Math.cos(TAU*x*1.13+p+b*.5+.9)))/Math.hypot(1,.14*TAU*1.13*Math.cos(TAU*y*1.13+p+a*.5)*w/h)/Math.hypot(1,.14*TAU*1.13*Math.cos(TAU*x*1.13+p+b*.5+.9)*h/w)),0,TAU);c.clip();strand(0,a);c.restore();
 }
 c.restore();
}
module.exports={render,id:'arabesque-1',duration:24};

return module.exports; })();
works["prelude-bwv846"] = (() => { const module = {exports:{}};
'use strict';
// An invariant broken route reveals changing harmonic illumination, not MIDI.
const TAU=Math.PI*2;
function render(c,w,h,time){
 const p=TAU*((((Number.isFinite(time)?time:0)%24)+24)%24)/24;
 c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.lineJoin='miter';c.lineCap='butt';
 const bg=c.createLinearGradient(0,0,w,h);bg.addColorStop(0,'#1d2c3b');bg.addColorStop(.5,'#34434b');bg.addColorStop(1,'#182a34');c.fillStyle=bg;c.fillRect(0,0,w,h);
 for(let j=-2;j<13;j++)for(let n=0;n<5;n++){
  const off=n*.009,base=j*.115+off;
  const pts=[];
  for(let k=-1;k<=5;k++){
   const x=k*.25,up=(k+j)%2===0?.064:-.064;
   pts.push([x,base+up], [x+.145,base+up],[x+.145,base-up],[x+.25,base-up]);
  }
  const width=(n===2?2.2:.7)*Math.max(1,h/600);
  for(let k=0;k<pts.length-1;k++){
   const a=pts[k],b=pts[k+1],cx=(a[0]+b[0])*.5,cy=(a[1]+b[1])*.5;
   const wave=.5+.5*Math.cos(cx*4+cy*5-p*2+j*.37),slow=.5+.5*Math.sin(p-cy*3);
   const intensity=.14+.86*Math.pow(wave,4),warm=slow*.6;
   const r=Math.round(85+159*intensity),g=Math.round(112+132*intensity),bl=Math.round(130+(105-75*warm)*intensity);
   c.strokeStyle=`rgb(${r},${g},${bl})`;c.lineWidth=width*(1+3.1*Math.pow(wave,9));c.beginPath();c.moveTo(a[0]*w,a[1]*h);c.lineTo(b[0]*w,b[1]*h);c.stroke();
  }
 }
 c.restore();
}
module.exports={render,id:'prelude-bwv846',duration:24};

return module.exports; })();
works["nocturne-20"] = (() => { const module = {exports:{}};
'use strict';
// Long recollective phrases and reconnected ornamental intervals; editorial, not score sync.
const TAU=Math.PI*2;
function render(c,w,h,time){
 const p=TAU*(((Number.isFinite(time)?time:0)%24+24)%24)/24;
 c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;
 c.fillStyle='#071F32';c.fillRect(0,0,w,h);
 const seams=[.22+.055*Math.sin(p),.55+.07*Math.cos(p+.6),.81+.04*Math.sin(p-1)];
 for(let row=-1;row<16;row++){
  const y=(row/14+.018*Math.sin(p+row*.58))*h;
  const peak=.5+.5*Math.cos(p-row*.52),thick=(.009+.025*peak)*h;
  let edges=[-.1,...seams,1.1];
  for(let s=0;s<4;s++){
   const reconnect=.5+.5*Math.cos(p+row*.43+s),gap=.012+.034*(1-reconnect);
   const x1=(edges[s]+(s?gap:0))*w,x2=(edges[s+1]-(s<3?gap:0))*w;
   const g=c.createLinearGradient(x1,y,x2,y+thick);
   g.addColorStop(0,`rgba(116,157,183,${.18+.25*peak})`);
   g.addColorStop(.5,`rgba(206,199,232,${.24+.58*peak})`);
   g.addColorStop(1,`rgba(239,201,144,${(.12+.6*peak)*reconnect})`);
   c.fillStyle=g;c.fillRect(x1,y,x2-x1,thick);
   for(let k=0;k<4;k++){
    c.fillStyle=`rgba(234,236,246,${(.1+.38*peak)*(1-k/5)})`;
    c.fillRect(x1,y+(k+.5)*thick/4,x2-x1,.5);
   }
  }
 }
 // Upright ornamental ladders link adjacent phrases, rather than background grid.
 for(let s=0;s<3;s++)for(let j=0;j<20;j++){
  const y=(j/19)*h,energy=Math.pow(.5+.5*Math.cos(p-j*.3-s*1.7),4);
  const x=seams[s]*w,len=(.012+.045*energy)*w;
  c.fillStyle=`rgba(227,187,125,${.08+.67*energy})`;
  c.fillRect(x-len*.5,y,len,.6+energy*.6);
  c.fillStyle=`rgba(178,203,226,${.05+.22*energy})`;
  c.fillRect(x-.35,y-.012*h,.7,.024*h);
 }
 c.restore();
}
module.exports={render,id:'nocturne-20',duration:24};

return module.exports; })();
works["pathetique-2"] = (() => { const module = {exports:{}};
'use strict';
// Alternating broad sheltering spans and inner moving light; editorial interpretation.
const TAU=Math.PI*2;
function render(c,w,h,time){
 const p=TAU*(((Number.isFinite(time)?time:0)%24+24)%24)/24;
 c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;
 c.fillStyle='#153D40';c.fillRect(0,0,w,h);c.lineCap='round';c.lineJoin='round';
 // The spans enter alternately from both edges, with asymmetric corner heights.
 for(let k=-1;k<7;k++){
  const left=k%2===0,phase=p-k*.75,energy=.5+.5*Math.cos(phase);
  const y=(k*.185+.04*Math.sin(phase))*h;
  const reach=(.65+.22*energy)*w,turn=(left?reach:w-reach),start=left?-.18*w:1.18*w;
  const inner=y+.14*h,far=left?1.15*w:-.15*w;
  const path=()=>{c.beginPath();c.moveTo(start,y);c.lineTo(turn+(left?-.12:.12)*w,y);c.bezierCurveTo(turn,y,turn,inner,turn+(left?.12:-.12)*w,inner);c.lineTo(far,inner);};
  const grad=c.createLinearGradient(0,y,w,inner);
  const warm=left?energy:1-energy;
  grad.addColorStop(0,`rgba(188,113,77,${.55+.25*warm})`);
  grad.addColorStop(.34,`rgba(220,198,152,${.65+.28*energy})`);
  grad.addColorStop(.66,`rgba(247,230,192,${.65+.3*energy})`);
  grad.addColorStop(1,'rgba(92,164,160,.65)');
  c.strokeStyle=grad;c.lineWidth=h*(.046+.027*energy);path();c.stroke();
  // Closely inset light tracery reveals thickness without turning every area into a mesh.
  for(let f=0;f<8;f++){
   c.save();c.translate(0,(f-3.5)*h*.0048);
   c.lineWidth=.52;c.strokeStyle=`rgba(255,239,210,${(.15+.48*energy)*(1-Math.abs(f-3.5)/5)})`;path();c.stroke();c.restore();
  }
 }
 c.restore();
}
module.exports={render,id:'pathetique-2',duration:24};

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
window.ClassicaVisual=Object.freeze({create,has:id=>Object.prototype.hasOwnProperty.call(works,id),list:()=>Object.keys(works),version:'20261025-visual16'});
})();
