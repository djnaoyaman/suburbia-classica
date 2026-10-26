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
// Private reconsideration only. A lyrical field, not score or audio simulation.
const TAU=Math.PI*2;
function render(c,w,h,time){
 const p=TAU*((((Number.isFinite(time)?time:0)%24)+24)%24)/24;
 c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.lineCap='round';c.lineJoin='round';
 const bg=c.createLinearGradient(0,0,w,h);bg.addColorStop(0,'#111d30');bg.addColorStop(.5,'#24263c');bg.addColorStop(1,'#192438');c.fillStyle=bg;c.fillRect(0,0,w,h);
 const cx1=.29+.15*Math.sin(p),cy1=.30+.17*Math.cos(p),cx2=.70+.14*Math.cos(p),cy2=.69+.16*Math.sin(p);
 for(let line=0;line<270;line++){
  let x=-.24,y=-.48+1.96*line/269;
  const key=line/269,phase=key*TAU*1.4-p,bright=.5+.5*Math.cos(phase);
  const pts=[[x,y]];
  for(let step=0;step<170;step++){
   const a=Math.exp(-((x-cx1)*(x-cx1)/.11+(y-cy1)*(y-cy1)/.20)),b=Math.exp(-((x-cx2)*(x-cx2)/.13+(y-cy2)*(y-cy2)/.16));
   const dx=.88+.28*a-.12*b,dy=(.67+.20*Math.sin(p)) *a-(.73+.19*Math.cos(p))*b+.09*Math.sin(p+y*2.4);
   x+=dx*.0105;y+=dy*.0105;pts.push([x,y]);
  }
  const g=c.createLinearGradient(pts[0][0]*w,0,pts[pts.length-1][0]*w,0);let peak=0;
  for(let j=0;j<=12;j++){
   const a=pts[Math.round(j*(pts.length-1)/12)],q=(a[0]-pts[0][0])/(pts[pts.length-1][0]-pts[0][0]);
   const first=Math.exp(-((a[0]-cx1)**2/.15+(a[1]-cy1)**2/.055))*(.76+.24*(.5+.5*Math.cos(p)));
   const second=Math.exp(-((a[0]-cx2)**2/.15+(a[1]-cy2)**2/.070))*(.76+.24*(.5+.5*Math.sin(p)));
   const energy=Math.min(1,(first+second)*1.26);peak=Math.max(peak,energy);
   g.addColorStop(q,`rgba(${Math.round(155+100*energy)},${Math.round(175+69*energy)},${Math.round(208+25*energy)},${.22+.77*energy})`);
  }
  c.strokeStyle=g;c.lineWidth=(.43+1.15*Math.pow(peak,2))*Math.max(1,h/600);c.beginPath();pts.forEach((a,i)=>i?c.lineTo(a[0]*w,a[1]*h):c.moveTo(a[0]*w,a[1]*h));c.stroke();
 }
 c.restore();
}
module.exports={render,id:'fur-elise-private-reconsideration',duration:24};

return module.exports; })();
works["tristesse"] = (() => { const module = {exports:{}};
'use strict';
// Private continuous light study: independent voice tension/reunion, not audio analysis.
const TAU=Math.PI*2;
function render(c,w,h,time){
 const p=TAU*(((Number.isFinite(time)?time:0)%24+24)%24)/24;
 c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;
 const bg=c.createLinearGradient(0,0,w,h);bg.addColorStop(0,'#24213E');bg.addColorStop(.55,'#322537');bg.addColorStop(1,'#182C3D');c.fillStyle=bg;c.fillRect(0,0,w,h);c.lineCap='round';c.lineJoin='round';
 const tension=.5-.5*Math.cos(p),count=224;
 for(let i=0;i<count;i++){
  const v=-.32+1.64*i/(count-1),lit=.5+.5*Math.cos(v*6.3-p),center=.45+.27*Math.sin(p+v*2.2);
  const g=c.createLinearGradient(0,0,w,h);
  g.addColorStop(0,`rgba(155,139,205,${.38+.18*lit})`);g.addColorStop(Math.max(.03,center-.22),`rgba(228,178,156,${.55+.21*lit})`);g.addColorStop(center,`rgba(255,239,213,${.79+.19*lit})`);g.addColorStop(Math.min(.97,center+.21),`rgba(210,181,206,${.6+.18*lit})`);g.addColorStop(1,'rgba(126,160,203,.48)');
  c.strokeStyle=g;c.lineWidth=.47+.32*lit;c.beginPath();
  for(let j=0;j<=120;j++){
   const u=-.12+1.24*j/120,arch=Math.sin(Math.PI*u);
   const bend=.22*Math.sin(v*4.2+.6)*arch;
   const shear=.18*tension*Math.sin(v*5.1-p)*arch*Math.tanh((u-.52)*7);
   const inner=.032*Math.sin(TAU*u*1.8+v*7+p)*arch;
   const y=v+bend+shear+inner;
   const x=u+.06*Math.sin(v*4.6-p)*arch;
   j?c.lineTo(x*w,y*h):c.moveTo(x*w,y*h);
  }
  c.stroke();
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
// Private layered open-fan light study. Editorial time, not audio or note analysis.
const TAU=Math.PI*2;
function render(c,w,h,time){
 const p=TAU*(((Number.isFinite(time)?time:0)%24+24)%24)/24;
 c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;
 const bg=c.createLinearGradient(0,0,w,h);bg.addColorStop(0,'#080F25');bg.addColorStop(.55,'#17233D');bg.addColorStop(1,'#141627');c.fillStyle=bg;c.fillRect(0,0,w,h);
 c.lineCap='round';
 for(let layer=0;layer<3;layer++){
  const phase=p+layer*2.05;
  for(let i=0;i<112;i++){
   const raw=i/111, u=raw+.065*Math.sin(raw*TAU*2+layer*.7), q=u*2-1;
   const focus=.46+.31*Math.sin(p+layer*1.9);
   const crest=Math.exp(-Math.pow((u-focus)/.18,2));
   const g=c.createLinearGradient(0,h*(.15+layer*.25),w,h*(.8-layer*.2));
   const rgb=layer===0?'249,225,184':layer===1?'228,164,177':'144,184,219';
   g.addColorStop(0,`rgba(${rgb},${.06+.2*crest})`);g.addColorStop(.28,`rgba(${rgb},${.12+.48*crest})`);g.addColorStop(.62,`rgba(${rgb},${.18+.77*crest})`);g.addColorStop(1,`rgba(${rgb},${.08+.3*crest})`);
   c.strokeStyle=g;c.lineWidth=.5+.57*crest;c.beginPath();
   for(let j=0;j<=100;j++){
    const v=-.22+1.44*j/100;
    // Wide open fans have different vanishing directions, never a shared central star.
    let x,y;
    const ornament=.023*Math.sin(v*15+u*6+phase)*Math.sin(Math.PI*u)*(.55+.45*Math.cos(p-layer));
    if(layer===0){
     x=v;y=.12+.83*u+.28*q*Math.sin(v*2.8+.3)+.16*Math.sin(v*4.1+phase)*Math.sin(Math.PI*u)+ornament;
    }else if(layer===1){
     y=v;x=.06+.89*u+.38*q*Math.sin(v*2.4-1)+.13*Math.sin(v*4.7-phase)*Math.sin(Math.PI*u)+ornament;
    }else{
     x=v;y=.94-.9*u+.22*q*Math.cos(v*3.6+phase*.0)+.085*Math.sin(v*5+phase)*Math.sin(Math.PI*u)+ornament*.55;
    }
    if(j===0)c.moveTo(x*w,y*h);else c.lineTo(x*w,y*h);
   }c.stroke();
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
// Private replacement study: continuous luminous density, not literal facets or audio analysis.
const TAU=Math.PI*2;
function render(c,w,h,time){
 const p=TAU*(((Number.isFinite(time)?time:0)%24+24)%24)/24;
 c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;
 const bg=c.createLinearGradient(0,0,w,h);bg.addColorStop(0,'#092D31');bg.addColorStop(.6,'#173F3C');bg.addColorStop(1,'#182C35');c.fillStyle=bg;c.fillRect(0,0,w,h);
 c.lineCap='round';c.lineJoin='round';
 const count=240;
 for(let i=0;i<count;i++){
  const v=-.3+1.6*i/(count-1),phase=v*TAU;
  const crest=.5+.5*Math.cos(phase-p),center=.48+.27*Math.sin(p+v*2.3);
  const g=c.createLinearGradient(0,h*v,w,h*v);
  g.addColorStop(0,`rgba(91,179,156,${.4+.2*crest})`);
  g.addColorStop(Math.max(.02,center-.2),`rgba(191,194,116,${.6+.2*crest})`);
  g.addColorStop(center,`rgba(255,242,198,${.83+.15*crest})`);
  g.addColorStop(Math.min(.98,center+.2),`rgba(214,190,106,${.65+.22*crest})`);
  g.addColorStop(1,`rgba(107,185,167,${.43+.2*crest})`);
  c.strokeStyle=g;c.lineWidth=.48+.32*crest;c.beginPath();
  for(let j=0;j<=120;j++){
   const u=-.12+j*1.24/120;
   const hinge=.5+.17*Math.sin(p)+.12*Math.sin(v*4-p);
   const turn=Math.tanh((u-hinge)*5.5);
   const y=v+.24*turn*Math.sin(v*3.6+.4)+.055*Math.sin(TAU*u+p)*Math.cos(v*5.1-p)+.018*Math.sin(v*TAU*2.5+u*3+p);
   const x=u+.045*Math.sin(v*4-p)*Math.sin(Math.PI*u);
   j?c.lineTo(x*w,y*h):c.moveTo(x*w,y*h);
  }
  c.stroke();
 }
 c.restore();
}
module.exports={render,id:'flaxen-hair',duration:24};

return module.exports; })();
works["arabesque-1"] = (() => { const module = {exports:{}};
'use strict';
// Editorial curved counterpoint; independent of audio/score events.
const TAU=Math.PI*2;
function render(c,w,h,time){
 const p=TAU*((((Number.isFinite(time)?time:0)%24)+24)%24)/24,short=Math.min(w,h);
 c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.lineCap='round';
 const bg=c.createLinearGradient(0,0,w,h);bg.addColorStop(0,'#031c24');bg.addColorStop(.48,'#07302e');bg.addColorStop(1,'#082333');c.fillStyle=bg;c.fillRect(0,0,w,h);
 // Unequal curved directions form changing open cells, never a radial fan.
 for(let family=0;family<2;family++){
  const count=family?109:121,phase=p+(family?1.4:0),depth=.5+.5*Math.sin(phase),rgb=family?'231,239,212':'115,217,192';
  for(let i=-17;i<count+17;i++){
   const u=i/(count-1),spacing=u+.037*Math.sin(u*TAU*1.8+phase)+.011*Math.sin(u*TAU*4.7-phase),focus=.5+.5*Math.sin(u*5-phase);
   const g=family?c.createLinearGradient(0,0,w,0):c.createLinearGradient(0,0,0,h);
   for(let k=0;k<=20;k++){
    const v=k/20;
    // Two traveling phrases, elongated along the actual filament rather than detached dots.
    const a=Math.pow(.5+.5*Math.cos(v*TAU*1.6-phase-u*4.1),5);
    const b=Math.pow(.5+.5*Math.cos(v*TAU*.85+phase*2+u*6.2),8);
    const passage=.003+.94*a+.56*b,interlace=.55+.45*Math.cos(v*TAU*2+u*7.5+phase);
    g.addColorStop(v,`rgba(${rgb},${Math.min(.96,(.8+.8*focus)*passage*(.78+.22*depth)*interlace)})`);
   }
   c.strokeStyle=g;c.lineWidth=(.58+.26*depth)*Math.max(1,short/277);c.beginPath();
   const point=v=>{
    if(family===0){
     const a=v*TAU*1.15+.65*Math.sin(phase)+u*2.1,b=v*TAU*2.1-phase+u*5;
     return [(spacing+.12*Math.sin(a)+.048*Math.sin(b))*w,v*h,(.12*TAU*1.15*Math.cos(a)+.048*TAU*2.1*Math.cos(b))*w,h];
    }
    const a=v*TAU*.72+u*2.5+phase,b=v*TAU*1.7+phase*2-u*4;
    return [v*w,(spacing+.19*Math.sin(a)+.045*Math.sin(b))*h,w,(.19*TAU*.72*Math.cos(a)+.045*TAU*1.7*Math.cos(b))*h];
   };
   // Cubic Hermite reconstruction preserves tangent continuity, unlike polyline knots.
   const step=1.36/16;let previous=point(-.18);c.moveTo(previous[0],previous[1]);
   for(let j=1;j<=16;j++){
    const next=point(-.18+step*j);
    c.bezierCurveTo(previous[0]+previous[2]*step/3,previous[1]+previous[3]*step/3,next[0]-next[2]*step/3,next[1]-next[3]*step/3,next[0],next[1]);
    previous=next;
   }c.stroke();
  }
 }
 c.restore();
}
module.exports={render,id:'arabesque-1',duration:24};

return module.exports; })();
works["prelude-bwv846"] = (() => { const module = {exports:{}};
'use strict';
// Private reconsideration. Three fine light strata exchange depth, not MIDI.
const TAU=Math.PI*2;
function render(c,w,h,time){
 const moveTo=c.moveTo.bind(c),lineTo=c.lineTo.bind(c);
 const p=TAU*((((Number.isFinite(time)?time:0)%24)+24)%24)/24;
 c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.lineCap='round';
 const bg=c.createLinearGradient(0,0,w,h);bg.addColorStop(0,'#0c192a');bg.addColorStop(.5,'#1b2936');bg.addColorStop(1,'#112337');c.fillStyle=bg;c.fillRect(0,0,w,h);
 for(let voice=0;voice<3;voice++){
  const phase=p-voice*TAU/3,depth=.5+.5*Math.sin(phase),tilt=.12*Math.sin(phase+.4);
  const strength=.36+.64*depth,amplitude=.055+.025*depth,lineWidth=(.42+.58*depth)*Math.max(1,w/277),rgb=voice===1?'246,232,207':'211,228,244';
  for(let i=-14;i<112;i++){
   const u=i/97,center=.5+.48*Math.sin(u*4.2-phase+voice*.7),accent=.45+.55*(.5+.5*Math.cos(u*5-phase));
   const xs=new Float64Array(81);let minX=Infinity,maxX=-Infinity;
   for(let j=0;j<=80;j++){const v=-.1+j*1.2/80,x=u+tilt*(v-.5)+amplitude*Math.sin(v*4.3+phase+u*1.8);xs[j]=x*w;minX=Math.min(minX,xs[j]);maxX=Math.max(maxX,xs[j]);}
   // Entire polyline bounds plus stroke/AA margin, never its origin alone.
   const margin=lineWidth*.5+4;
   if(maxX < -margin || minX > w+margin)continue;
   const g=c.createLinearGradient(0,0,0,h);
   for(let j=0;j<=32;j++){
    const v=j/32,main=Math.exp(-Math.pow((v-center)/.19,2)),memory=.42*Math.exp(-Math.pow((v-center-.18)/.22,2));
    const energy=(1-Math.exp(-(main+memory)*accent*2.4))*strength;
    g.addColorStop(v,`rgba(${rgb},${.025+.78*energy})`);
   }
   c.strokeStyle=g;c.lineWidth=lineWidth;c.beginPath();
   for(let j=0;j<=80;j++){const v=-.1+j*1.2/80;
    if(j===0)moveTo(xs[j],v*h);else lineTo(xs[j],v*h);
   }c.stroke();
  }
 }
 c.restore();
}
module.exports={render,id:'prelude-bwv846-private-reconsideration',duration:24};

return module.exports; })();
works["nocturne-20"] = (() => { const module = {exports:{}};
'use strict';
// Fine phrases fade into and reconnect across depth; no hard strip grid or score sync.
const TAU=Math.PI*2;
function render(c,w,h,time){
 const p=TAU*(((Number.isFinite(time)?time:0)%24+24)%24)/24;
 c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;
 const bg=c.createLinearGradient(0,0,w,h);bg.addColorStop(0,'#101E37');bg.addColorStop(.6,'#162C43');bg.addColorStop(1,'#242239');c.fillStyle=bg;c.fillRect(0,0,w,h);c.lineCap='round';c.lineJoin='round';
 for(let i=0;i<248;i++){
  const v=-.18+1.36*i/247,crest=.5+.5*Math.sin(v*5.4-p),gap=.42+.24*Math.sin(v*4.7+p),open=.065+.04*(.5+.5*Math.cos(p-v*3));
  const g=c.createLinearGradient(-.1*w,0,1.1*w,0);
  g.addColorStop(0,`rgba(153,175,222,${.42+.18*crest})`);
  g.addColorStop(Math.max(.01,gap-open-.08),`rgba(224,223,242,${.72+.2*crest})`);
  g.addColorStop(gap,'rgba(138,158,200,.035)');
  g.addColorStop(Math.min(.99,gap+open+.08),`rgba(242,214,165,${.65+.25*(1-crest)})`);
  g.addColorStop(1,`rgba(160,172,219,${.43+.2*crest})`);
  c.strokeStyle=g;c.lineWidth=.48+.27*crest;c.beginPath();
  for(let j=0;j<=112;j++){
   const u=-.13+j*1.26/112;
   const long=.074*Math.sin(u*3.8+v*3.4+p);
   const response=.052*Math.cos(v*6.2-p)*Math.tanh((u-gap)*6);
   const fine=.012*Math.sin(u*12+v*9-p);
   const density=.085*Math.sin(v*6.3-p+.4*Math.sin(u*3+p));
   const y=v+long+response+fine+density;
   j?c.lineTo(u*w,y*h):c.moveTo(u*w,y*h);
  }
  c.stroke();
 }
 c.restore();
}
module.exports={render,id:'nocturne-20',duration:24};

return module.exports; })();
works["pathetique-2"] = (() => { const module = {exports:{}};
'use strict';
// Private point-density cantabile study. Deterministic editorial motion, not audio analysis.
const TAU=Math.PI*2;
function render(c,w,h,time){
 const p=TAU*(((Number.isFinite(time)?time:0)%24+24)%24)/24;
 c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;
 const bg=c.createLinearGradient(0,0,w,h);bg.addColorStop(0,'#092F37');bg.addColorStop(.6,'#0B4145');bg.addColorStop(1,'#162D35');c.fillStyle=bg;c.fillRect(0,0,w,h);
 // Twenty-four batched tonal strata; point populations never spawn or reset.
 const bins=Array.from({length:24},()=>[]);
 for(let iy=0;iy<150;iy++)for(let ix=0;ix<180;ix++){
  const seed=((ix*73+iy*151)%211)/211;
  const u=-.18+1.36*(ix+seed*.6)/179,v=-.18+1.36*(iy+((ix*37+iy*19)%131)/131*.6)/149;
  const depth=(ix+iy*2)%3;
  const x=u+.075*Math.sin(v*5.4+p+depth*.35)*Math.sin(Math.PI*u);
  const y=v+.105*Math.sin(u*5.2-p)*Math.sin(v*4.3+.4)+.026*Math.sin(v*9+p*2+u*2);
  const cantus=.42+.17*Math.sin(x*4.1+.3)+.06*Math.sin(p)*Math.sin(Math.PI*x);
  const main=Math.exp(-Math.pow((y-cantus)/.145,2));
  const answer=Math.exp(-Math.pow((y-(.77-.11*Math.sin(x*4.7+p)))/.17,2));
  const light=Math.min(.999,.12+.7*main+.38*answer);
  const shimmer=.8+.2*Math.sin(x*8-y*6+p+depth*.7);
  const tone=Math.min(7,Math.floor(light*shimmer*8));
  const size=(.55+1.25*light)*(depth===0?1.15:depth===1?.95:.85);
  bins[depth*8+tone].push([x*w,y*h,size]);
 }
 for(let depth=0;depth<3;depth++)for(let tone=0;tone<8;tone++){
  const a=.20+tone*.105,colors=depth===0?[249,232,190]:depth===1?[137,216,200]:[197,151,112];
  c.fillStyle=`rgba(${colors.join(',')},${a})`;c.beginPath();
  for(const [x,y,s]of bins[depth*8+tone])c.rect(x-s*.5,y-s*.36,s,s*.72);
  c.fill();
 }
 c.restore();
}
module.exports={render,id:'pathetique-2',duration:24};

return module.exports; })();

works["reverie"] = (() => { const module = {exports:{}};
'use strict';
const TAU=Math.PI*2;
// Memory-like optical fields, not physical refraction or audio-derived data.
function render(c,w,h,time){
 const p=TAU*((((Number.isFinite(time)?time:0)%24)+24)%24)/24,s=Math.min(w,h);
 c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.lineJoin='round';
 // A continuous luminous field: no opaque windows or finite plane outlines.
 const rows=180;
 for(let j=0;j<rows;j++){
  const y=(j+.5)/rows,g=c.createLinearGradient(0,0,w,0);
  for(let k=0;k<=20;k++){
   const x=k/20,a=x-y*.52-.25-.16*Math.sin(p),b=x*.6+y-.72-.17*Math.sin(p+2),d=x+y*.38-.9-.18*Math.cos(p);
   const lightA=Math.exp(-a*a/.038)*(.74+.26*Math.cos(y*3-p)),lightB=Math.exp(-b*b/.055)*(.72+.28*Math.sin(x*3+p)),memory=Math.exp(-d*d/.023)*(.6+.4*Math.cos(p-1.4));
   const red=13+58*lightA+33*lightB+38*memory,green=23+47*lightA+48*lightB+31*memory,blue=43+62*lightA+49*lightB+22*memory;
   g.addColorStop(x,`rgb(${Math.round(red)},${Math.round(green)},${Math.round(blue)})`);
  }
  c.fillStyle=g;c.fillRect(0,j*h/rows,w,h/rows+1);
 }
 // Fine refractive fringes belong to the same field, softly slipping through its depths.
 for(let i=-18;i<155;i++){
  const u=i/135,phase=p+.28*Math.sin(u*5-p),g=c.createLinearGradient(0,0,w,h);
  for(let k=0;k<=16;k++){
   const v=k/16,focus=Math.pow(.5+.5*Math.cos(v*TAU*.9-phase-u*4),5);
   g.addColorStop(v,`rgba(${i%3===0?'243,224,190':'181,209,243'},${.045+.65*focus+.18*Math.pow(.5+.5*Math.sin(v*TAU*.8+phase+u*2),4)})`);
  }
  c.strokeStyle=g;c.lineWidth=.55*Math.max(1,s/277);c.beginPath();
  for(let j=0;j<=120;j++){
   const v=-.18+j*1.36/120,x=v*w;
   const lens=Math.exp(-Math.pow((v-(.48+.16*Math.sin(p)))/.32,2));
   const y=(u+.22*v+.065*Math.sin(v*5.2-phase+u*3)+lens*.045*Math.sin(u*7+phase))*h;
   if(j===0)c.moveTo(x,y);else c.lineTo(x,y);
  }c.stroke();
 }
 c.restore();
}
module.exports={render,id:'reverie',duration:24};

return module.exports; })();

works["k331-1"] = (() => { const module = {exports:{}};
'use strict';
// 96-second cycle; only editorial time is slowed fourfold from frozen granular source.
// Siciliana-like compound-duple sway, six authored variations; no audio sync.
const TAU=Math.PI*2;
function render(c,w,h,time){
const t=((((Number.isFinite(time)?time:0)/4)%24)+24)%24,p=t/24*TAU,z=t/4,k=Math.floor(z),f=z-k,e=f*f*(3-2*f);
const states=[[.23,.72,.16],[.31,.58,.26],[.27,.82,-.12],[.20,.67,-.25],[.35,.9,.08],[.25,.62,.22]],a=states[k],b=states[(k+1)%6],q=a.map((v,i)=>v+(b[i]-v)*e);
c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.fillStyle='#261e34';c.fillRect(0,0,w,h);
const centers=[[
 .20+.065*Math.sin(p),.20+.04*Math.sin(p+.5)],
 [.76+.055*Math.sin(p+2.1),.45+.06*Math.sin(p+2.6)],
 [.38+.10*Math.sin(p+4.2),.81+.035*Math.sin(p+4.7)]];
const unit=Math.min(w,h)/277;
const bins=Array.from({length:24},()=>[]);
for(let iy=0;iy<128;iy++)for(let ix=0;ix<160;ix++){
const seed=((ix*73+iy*151)%211)/211,u=-.14+1.28*(ix+seed*.63)/159,v=-.14+1.28*(iy+((ix*37+iy*19)%131)/131*.63)/127;
let x=u,y=v,density=0,turn=0;
for(let j=0;j<3;j++){
const dx=u-centers[j][0],dy=v-centers[j][1],rx=q[0]*(1+j*.08),ry=rx*q[1],g=Math.exp(-.5*(dx*dx/(rx*rx)+dy*dy/(ry*ry)));
const sense=j===1?-1:1;
x+=(-.56*dx-q[2]*1.7*sense*dy)*g;y+=(-.56*dy+q[2]*1.7*sense*dx)*g;
density+=g;turn+=sense*g;
}
const depth=(ix+iy*2)%3,light=Math.min(.999,.04+.95*density);
const modulation=.78+.22*Math.sin(u*16-v*11+Math.sin(p)*.5+depth*.8),tone=Math.min(7,Math.floor(light*modulation*8));
const size=unit*(.45+1.4*light)*(depth===0?1.1:depth===1?.9:.78);
bins[depth*8+tone].push(x*w,y*h,size,turn);
}
for(let depth=0;depth<3;depth++)for(let tone=0;tone<8;tone++){
const colors=depth===0?[250,232,197]:depth===1?[160,184,221]:[220,141,135],alpha=.16+tone*.105;
c.fillStyle=`rgba(${colors.join(',')},${alpha})`;c.beginPath();const bin=bins[depth*8+tone];
for(let j=0;j<bin.length;j+=4){const x=bin[j],y=bin[j+1],s=bin[j+2];c.rect(x-s*.5,y-s*.42,s,s*.84);}c.fill();
}
c.restore();}
module.exports={render,id:'k331-1',duration:96};

return module.exports; })();

works["prelude-7"] = (() => { const module = {exports:{}};
'use strict';
// Two interacting open light fronts; brief idea and altered response, not audio sync.
const TAU=Math.PI*2;
function render(c,w,h,time){
const t=(((Number.isFinite(time)?time:0)%48)+48)%48,p=t/48*TAU;
c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.fillStyle='#342b2d';c.fillRect(0,0,w,h);
const bins=Array.from({length:24},()=>[]),unit=Math.min(w,h)/277;
for(let iy=0;iy<160;iy++)for(let ix=0;ix<190;ix++){
 const seed=((ix*73+iy*151)%211)/211,u=-.25+1.5*(ix+seed*.65)/189,v=-.25+1.5*(iy+((ix*37+iy*19)%131)/131*.65)/159;
 const a=TAU*1.65*(.65*u+.45*v)+p,b=TAU*1.35*(-.3*u+.7*v)-p+.8;
 const ca=Math.cos(a),cb=Math.cos(b),sa=Math.sin(a),sb=Math.sin(b);
 const x=u+(.13/1.65)*sa+(.07/1.35)*sb,y=v+(.07/1.65)*sa-(.12/1.35)*sb;
 // Analytic Jacobian of exactly the same mapping used for point positions.
 const xu=1+TAU*(.13*.65*ca-.07*.3*cb),xv=TAU*(.13*.45*ca+.07*.7*cb);
 const yu=TAU*(.07*.65*ca+.12*.3*cb),yv=1+TAU*(.07*.45*ca-.12*.7*cb);
 const determinant=xu*yv-xv*yu,trace=xu*xu+xv*xv+yu*yu+yv*yv;
 const minimumStretch=Math.sqrt(Math.max(.001,(trace-Math.sqrt(Math.max(0,trace*trace-4*determinant*determinant)))/2));
 // Directional crowding gives each front light; area crowding deepens overlaps.
 const light=Math.min(.999,.58*Math.pow(.36/(.12+Math.abs(determinant)),.72)+.42*Math.pow(.32/(.12+minimumStretch),.72));
 const depth=(ix+iy*2)%3,tone=Math.min(7,Math.floor(light*8));
 const size=unit*(.37+1.27*light)*(depth===0?1.12:depth===1?.96:.78);
 if(x<-.04||x>1.04||y<-.04||y>1.04)continue;
 bins[depth*8+tone].push(x*w,y*h,size);
}
for(let depth=0;depth<3;depth++)for(let tone=0;tone<8;tone++){
 const color=depth===0?[252,234,196]:depth===1?[221,196,147]:[166,122,113];c.fillStyle=`rgba(${color.join(',')},${.18+tone*.105})`;c.beginPath();const b=bins[depth*8+tone];
 for(let i=0;i<b.length;i+=3){const s=b[i+2];c.rect(b[i]-s*.5,b[i+1]-s*.4,s,s*.8);}c.fill();
}
c.restore();}
module.exports={render,id:'prelude-7',duration:48};

return module.exports; })();

works["goldberg-aria"] = (() => { const module = {exports:{}};
'use strict';
const TAU=Math.PI*2;
// Private non-exact analytic tangent cubic approximation: 20 segments per contour.
// Stable return centres and mobile ornament: editorial association, not score/audio sync.
function render(c,w,h,time){
 const moveTo=c.moveTo.bind(c),bezierCurveTo=c.bezierCurveTo.bind(c);
 const p=TAU*((((Number.isFinite(time)?time:0)%24)+24)%24)/24,s=Math.min(w,h);
 c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.lineJoin='round';
 const bg=c.createLinearGradient(0,0,w,h);bg.addColorStop(0,'#101a2b');bg.addColorStop(.5,'#231f30');bg.addColorStop(1,'#102232');c.fillStyle=bg;c.fillRect(0,0,w,h);c.globalCompositeOperation='screen';
 const anchors=[[.17,.2,.3],[.82,.64,-.5],[-.1,1.06,.8]];
 for(let voice=0;voice<3;voice++){
  const [cx,cy,rotation]=anchors[voice],phase=p-voice*TAU/3,cr=Math.cos(rotation),sr=Math.sin(rotation),depth=.5+.5*Math.sin(phase);

  for(let i=0;i<93;i++){
   const u=i/92,r=.08+u*1.27+.018*Math.sin(u*5+phase),g=c.createLinearGradient(cx*w-s*.8,cy*h-s*.9,cx*w+s*.8,cy*h+s*.9);
   for(let k=0;k<=16;k++){
    const v=k/16,a=Math.pow(.5+.5*Math.cos(v*TAU*1.1-phase-u*2.4),4),b=Math.pow(.5+.5*Math.sin(v*TAU*.7+phase+u*4.4),6),fade=Math.sin(Math.PI*(i+1)/94);
    g.addColorStop(v,`rgba(${voice===1?'237,213,162':'221,225,241'},${Math.min(.98,(.04+1.65*a+.9*b)*(.65+.35*depth)*fade*(.3+.7*Math.exp(-Math.pow((u-(.48+.23*Math.sin(phase)))/.27,2))))})`);
   }
   c.strokeStyle=g;c.lineWidth=(.55+.22*depth)*Math.max(1,s/277);c.beginPath();
   const step=TAU/20,handles=[];
   for(let j=0;j<=20;j++){
    const a=step*j,cosA=Math.cos(a),sinA=Math.sin(a),shape=1+.09*Math.cos(3*a+.35*Math.sin(phase))+.03*Math.cos(a*5+phase+u*3);
    const derivative=-.27*Math.sin(3*a+.35*Math.sin(phase))-.15*Math.sin(a*5+phase+u*3);
    const xx=cosA*r*s*.95*shape,yy=sinA*r*s*1.6*shape;
    const dx=r*s*.95*(-sinA*shape+cosA*derivative),dy=r*s*1.6*(cosA*shape+sinA*derivative);
    handles.push([cx*w+xx*cr-yy*sr,cy*h+xx*sr+yy*cr,(dx*cr-dy*sr)*step/3,(dx*sr+dy*cr)*step/3]);
   }
   moveTo(handles[0][0],handles[0][1]);
   for(let j=1;j<=20;j++){
    const a=handles[j-1],b=handles[j];bezierCurveTo(a[0]+a[2],a[1]+a[3],b[0]-b[2],b[1]-b[3],b[0],b[1]);
   }c.closePath();c.stroke();
  }
 }
 c.restore();
}
module.exports={render,id:'goldberg-aria',duration:24};

return module.exports; })();

works["waltz-64-2"] = (() => { const module = {exports:{}};
'use strict';
// Three-beat editorial turn, opposing cantabile and piu mosso fields, not audio analysis.
const TAU=Math.PI*2;
function render(c,w,h,time){
 const t=(((Number.isFinite(time)?time:0)%96)+96)%96,p=TAU*t/96,unit=Math.min(w,h)/277;
 c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.fillStyle='#261e2d';c.fillRect(0,0,w,h);
 const bins=Array.from({length:72},()=>[]);
 for(let field=0;field<2;field++)for(let ring=0;ring<125;ring++)for(let j=0;j<144;j++){
  const r=(ring+.2+((j*71+ring*19)%127)/127)*.0074,theta=TAU*(j+((ring*37+j*13)%109)/109)/144;
  const direction=field===0?1:-1,a=theta+.28*Math.sin(3*theta-direction*p),turn=a+direction*p+.85*Math.sin(r*5-p);
  const breath=1+.12*Math.cos(3*theta-direction*p*3);
  const rx=r*breath,ry=r*(.72+.13*Math.sin(theta*2+p));
  const x=(field===0?.12:.88)+rx*Math.cos(turn)*1.15;
  const y=(field===0?.30:.72)+ry*Math.sin(turn);
  if(x<-.01||x>1.01||y<-.01||y>1.01)continue;
  // Light follows crowded turn sectors, retaining the deep opposing field.
  const angularStretch=1+.84*Math.cos(3*theta-direction*p);
  const light=Math.min(.999,Math.pow(.3/(.1+angularStretch),.65));
  const tone=Math.min(8,Math.floor(light*9)),size=unit*(.45+1.45*light);
  // Eliminate hard inner radial cutoff; smoothly reduce crowded inner density.
  const inner=Math.min(1,r/.13),fade=inner*inner*(3-2*inner),opacity=Math.min(3,Math.floor(fade*4));
  bins[field*36+opacity*9+tone].push(x*w,y*h,size*(.55+.45*fade));
 }
 for(let field=0;field<2;field++)for(let opacity=0;opacity<4;opacity++)for(let tone=0;tone<9;tone++){
  c.globalAlpha=[.045,.3,.65,1][opacity];
  c.fillStyle=field===0?`rgba(217,166,147,${.18+tone*.085})`:`rgba(177,167,215,${.14+tone*.08})`;c.beginPath();const b=bins[field*36+opacity*9+tone];for(let j=0;j<b.length;j+=3)c.rect(b[j],b[j+1],b[j+2],b[j+2]*.75);c.fill();
 }c.restore();
}
module.exports={id:'waltz-64-2',duration:96,render};

return module.exports; })();

works["schubert-impromptu-90-3"] = (() => { const module = {exports:{}};
'use strict';
// Editorial interpretation of sustained melody above unbroken arpeggios; not audio sync.
const TAU=Math.PI*2;
function render(c,w,h,time){
 const t=(((Number.isFinite(time)?time:0)%96)+96)%96,p=TAU*t/96,unit=Math.min(w,h)/277;
 c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.fillStyle='#181f2b';c.fillRect(0,0,w,h);
 // Three uninterrupted depth currents. Compression illuminates strands, no solid carrier.
 c.globalCompositeOperation='screen';
 for(let layer=0;layer<3;layer++){
  const count=[84,64,52][layer]; c.lineWidth=unit*(layer===0?.52:.62);
  for(let j=0;j<count;j++){
   const v=(j+.5+.2*Math.sin(j*2.399))/count,phase=v*TAU,slow=p+(layer*2.1),level=.5+.5*Math.cos(phase*2-slow);
   // The same mapping's local dv compression controls light along each continuous strand.
   const gradient=c.createLinearGradient(-.08*w,0,1.08*w,0),rgb=layer===0?'112,160,204':layer===1?'214,225,233':'221,175,140';
   for(let q=0;q<=12;q++){
    const u=-.08+1.16*q/12;
    const compress=.52+.29*Math.cos(u*TAU*.75+p+layer);
    const derivative=compress+.055*.22*TAU*Math.cos(u*TAU*1.5-slow+phase*.22)+.09*TAU*Math.cos(phase+slow)*Math.sin(u*Math.PI);
    const crowd=Math.min(1,.16/(.10+Math.abs(derivative)));
    gradient.addColorStop(q/12,`rgba(${rgb},${.17+.58*crowd})`);
   }
   c.strokeStyle=gradient;
   c.beginPath();
   function point(u){
    const curve=.13*Math.sin(u*TAU*.75+slow)+.055*Math.sin(u*TAU*1.5-slow+phase*.22);
    const compress=.52+.29*Math.cos(u*TAU*.75+p+layer);
    const y=.5+(v-.5)*compress+curve+(layer-1)*.22+.09*Math.sin(phase+slow)*Math.sin(u*Math.PI);
    const x=u+.028*Math.sin(phase+slow+u*3);
    const dx=1+.084*Math.cos(phase+slow+u*3);
    const dy=-(v-.5)*.29*TAU*.75*Math.sin(u*TAU*.75+p+layer)+.13*TAU*.75*Math.cos(u*TAU*.75+slow)+.055*TAU*1.5*Math.cos(u*TAU*1.5-slow+phase*.22)+.09*Math.sin(phase+slow)*Math.PI*Math.cos(u*Math.PI);
    return [x*w,y*h,dx*w,dy*h];
   }
   let prior=point(-.08);c.moveTo(prior[0],prior[1]);const step=1.16/20;
   for(let k=1;k<=20;k++){const next=point(-.08+step*k);c.bezierCurveTo(prior[0]+prior[2]*step/3,prior[1]+prior[3]*step/3,next[0]-next[2]*step/3,next[1]-next[3]*step/3,next[0],next[1]);prior=next;}
c.stroke();
  }
 }
 c.restore();
}
module.exports={id:'schubert-impromptu-90-3',duration:96,render};

return module.exports; })();

works["tchaikovsky-october"] = (() => { const module = {exports:{}};
'use strict';
const TAU=Math.PI*2;
function render(c,w,h,time){
const p=TAU*((((Number.isFinite(time)?time:0)%96)+96)%96)/96;
c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.fillStyle='#292e2b';c.fillRect(0,0,w,h);
const bins=Array.from({length:24},()=>[]),unit=Math.min(w,h)/277;
for(let iy=0;iy<160;iy++)for(let ix=0;ix<190;ix++){
const seed=((ix*73+iy*151)%211)/211,u=-.25+1.5*(ix+seed*.65)/189,v=-.25+1.5*(iy+((ix*37+iy*19)%131)/131*.65)/159;
// Descending bowed sheet with uneven countercurrent; brightness derives from the same sheet's compression.
const a=TAU*(1.5*v+(.16+.06*Math.sin(p))*Math.sin(u*4.2+.35*Math.sin(p)))-p;
const b=TAU*(.85*u-.22*v)+.45*Math.sin(p);
const ca=Math.cos(a),sa=Math.sin(a),cb=Math.cos(b),sb=Math.sin(b);
const au=TAU*(.16+.06*Math.sin(p))*4.2*Math.cos(u*4.2+.35*Math.sin(p)),av=TAU*1.5,bu=TAU*.85,bv=-TAU*.22;
const strength=.083+.002*Math.sin(p+.4);
const x=u+.010*sa+.045*sb,y=v+strength*sa-.036*sb;
const xu=1+.010*ca*au+.045*cb*bu,xv=.010*ca*av+.045*cb*bv;
const yu=strength*ca*au-.036*cb*bu,yv=1+strength*ca*av-.036*cb*bv;
const determinant=xu*yv-xv*yu;
const light=Math.min(.999,.06+.84*Math.pow(.40/(.14+Math.abs(determinant)),.9));

const depth=(ix+iy*2)%3,tone=Math.min(7,Math.floor(light*8));
const size=unit*(.35+1.25*light)*(depth===0?1.1:depth===1?.94:.8);
if(x<-.04||x>1.04||y<-.04||y>1.04)continue;
bins[depth*8+tone].push(x*w,y*h,size);
}
for(let depth=0;depth<3;depth++)for(let tone=0;tone<8;tone++){
const color=depth===0?[239,224,177]:depth===1?[188,168,113]:[177,126,102];c.fillStyle=`rgba(${color.join(',')},${.17+tone*.105})`;c.beginPath();const b=bins[depth*8+tone];
for(let i=0;i<b.length;i+=3){const s=b[i+2];c.rect(b[i]-s*.5,b[i+1]-s*.4,s,s*.8);}c.fill();
}c.restore();}
module.exports={render,id:'tchaikovsky-october',duration:96};

return module.exports; })();

works["canon"] = (() => { const module = {exports:{}};
'use strict';
// Three delayed identical light gestures above a steady basis; editorial, not audio sync.
const TAU=Math.PI*2;
function render(c,w,h,time){
const p=TAU*((((Number.isFinite(time)?time:0)%96)+96)%96)/96,unit=Math.min(w,h)/277;
c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.fillStyle='#142c35';c.fillRect(0,0,w,h);c.lineCap='round';
// The basis is continuous and quiet, not eight architectural bars.
c.strokeStyle='rgba(159,180,159,.13)';c.lineWidth=.38*unit;c.beginPath();for(let i=-5;i<52;i++){let v=i/46;c.moveTo(-.1*w,v*h);c.bezierCurveTo(.3*w,(v-.025)*h,.7*w,(v+.025)*h,1.1*w,v*h);}c.stroke();
c.globalCompositeOperation='screen';
for(let voice=0;voice<3;voice++){
const phase=p-voice*TAU/5,rgb=['244,224,178','151,207,194','214,160,132'][voice];
for(let j=0;j<78;j++){
const v=-.25+1.5*(j+.17*Math.sin(j*2.399))/77;
function field(u){const a=TAU*.68*u+phase+1.1*Math.sin(v*3.6),b=TAU*1.12*u-v*2.8+phase*.0;return [u,v+.29*Math.sin(a)+.045*Math.sin(b),.29*TAU*.68*Math.cos(a)+.045*TAU*1.12*Math.cos(b),1+.29*1.1*3.6*Math.cos(a)*Math.cos(v*3.6)-.045*2.8*Math.cos(b)];}
const g=c.createLinearGradient(-.12*w,0,1.12*w,0);for(let q=0;q<=12;q++){const a=field(-.12+1.24*q/12),crowd=Math.min(1,.25/(.18+Math.abs(a[3])));g.addColorStop(q/12,`rgba(${rgb},${.20+.55*crowd})`);}c.strokeStyle=g;c.lineWidth=.55*unit;c.beginPath();let old=field(-.12);c.moveTo(old[0]*w,old[1]*h);const step=1.24/10;for(let k=1;k<=10;k++){let next=field(-.12+k*step);c.bezierCurveTo((old[0]+step/3)*w,(old[1]+old[2]*step/3)*h,(next[0]-step/3)*w,(next[1]-next[2]*step/3)*h,next[0]*w,next[1]*h);old=next;}c.stroke();
}}
c.restore();}
module.exports={render,id:'canon',duration:96};

return module.exports; })();

works["brahms-waltz-15"] = (() => { const module = {exports:{}};
'use strict';
// Three unequal returning currents: an editorial association with gentle lyrical sway.
// Compression moves the grain itself; no measured beat, audio or physical-fluid claim.
const TAU=Math.PI*2;
function render(c,w,h,time){
 const p=TAU*((((Number.isFinite(time)?time:0)%96)+96)%96)/96,unit=Math.min(w,h)/277;
 c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;
 const bg=c.createLinearGradient(0,0,w,h);bg.addColorStop(0,'#251b35');bg.addColorStop(.55,'#392332');bg.addColorStop(1,'#291e37');c.fillStyle=bg;c.fillRect(0,0,w,h);
 const bins=Array.from({length:24},()=>[]),widths=[.125,.17,.115];
 for(let iy=0;iy<150;iy++)for(let ix=0;ix<176;ix++){
  const seed=((ix*73+iy*151)%211)/211,u=-.19+1.38*(ix+seed*.94)/175,v=-.19+1.38*(iy+((ix*37+iy*19)%131)/131*.94)/149,depth=(ix+iy*2)%3;
  const q0=.20+.17*Math.sin(u*4.2+.62*Math.sin(p)),q1=.54+.13*Math.sin(u*5.4-1.3+.55*Math.cos(p)),q2=.83+.14*Math.cos(u*3.6+.7*Math.sin(p+1.1));
  let x=u,y=v,compress=0;
  for(let j=0;j<3;j++){
   const dy=v-(j===0?q0:j===1?q1:q2),g=Math.exp(-.5*dy*dy/(widths[j]*widths[j]));
   const strength=.40+.1*Math.sin(p+j*2.1+u*.8);
   y-=strength*dy*g;
   x+=.035*(j===1?-1:1)*g*Math.sin(p+v*4.3+j*.8);
   compress+=strength*g;
  }
  x+=.014*Math.sin(v*7+p+depth*.3);y+=.015*Math.sin(u*7-p+depth*.4);
  const light=Math.min(.999,.1+1.23*compress),grain=.83+.17*Math.sin(u*13-v*8+depth*.9+.25*Math.sin(p));
  const tone=Math.min(7,Math.floor(light*grain*8)),size=unit*(.55+1.7*light)*(depth===0?1.08:depth===1?.92:.83);
  bins[depth*8+tone].push(x*w,y*h,size);
 }
 for(let depth=0;depth<3;depth++)for(let tone=0;tone<8;tone++){
  const rgb=depth===0?[255,227,203]:depth===1?[235,192,182]:[189,179,216];c.fillStyle=`rgba(${rgb.join(',')},${.17+tone*.107})`;c.beginPath();const a=bins[depth*8+tone];
  for(let k=0;k<a.length;k+=3){const x=a[k],y=a[k+1],s=a[k+2];c.rect(x-s*.5,y-s*.38,s,s*.76);}c.fill();
 }
 c.restore();
}
module.exports={render,id:'brahms-waltz-15',duration:96};

return module.exports; })();

works["gnossienne-1"] = (() => { const module = {exports:{}};
'use strict';
// Asymmetric returning depth; editorial phrasing, no measured metre or audio input.
const TAU=Math.PI*2;
function render(c,w,h,time){
 const p=TAU*((((Number.isFinite(time)?time:0)%96)+96)%96)/96,unit=Math.min(w,h)/277;
 c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;
 const bg=c.createLinearGradient(0,0,w,h);bg.addColorStop(0,'#24232d');bg.addColorStop(.55,'#342d30');bg.addColorStop(1,'#20222c');c.fillStyle=bg;c.fillRect(0,0,w,h);
 const bins=Array.from({length:24},()=>[]);
 for(let iy=0;iy<152;iy++)for(let ix=0;ix<176;ix++){
  const u=-.18+1.36*(ix+((ix*73+iy*151)%211)/211*.91)/175,v=-.18+1.36*(iy+((ix*37+iy*19)%131)/131*.91)/151,depth=(ix+iy*2)%3;
  const a=u+.42*v-(.48+.19*Math.sin(v*4.6+.8*Math.sin(p))),b=v-.48*u-(.46+.22*Math.cos(u*4.1-.9*Math.cos(p)));
  const ga=Math.exp(-.5*a*a/.070),gb=Math.exp(-.5*b*b/.060);
  const wa=.30+.09*Math.sin(p+.7),wb=.29+.10*Math.sin(p*2-1.1);
  const x=u-wa*a*ga+.48*wb*b*gb+.037*Math.sin(v*5+p)*gb;
  const y=v-.42*wa*a*ga-wb*b*gb+.034*Math.cos(u*6-p)*ga;
  const compress=wa*ga+wb*gb,light=Math.min(.999,.095+1.55*compress),mod=.83+.17*Math.sin(u*9+v*12+depth*.7+.2*Math.sin(p));
  const tone=Math.min(7,Math.floor(light*mod*8)),size=unit*(.5+1.75*light)*(depth===0?1.05:depth===1?.93:.8);
  bins[depth*8+tone].push(x*w,y*h,size);
 }
 for(let depth=0;depth<3;depth++)for(let tone=0;tone<8;tone++){
  const rgb=depth===0?[237,230,217]:depth===1?[211,167,133]:[172,181,206];c.fillStyle=`rgba(${rgb.join(',')},${.17+tone*.107})`;c.beginPath();const a=bins[depth*8+tone];
  for(let k=0;k<a.length;k+=3){const x=a[k],y=a[k+1],s=a[k+2];c.rect(x-s*.5,y-s*.37,s,s*.74);}c.fill();
 }c.restore();
}
module.exports={render,id:'gnossienne-1',duration:96};

return module.exports; })();

works["k310-2"] = (() => { const module = {exports:{}};
'use strict';
// Two off-frame counterflow sources; editorial cantabile contrast, not audio or score synchronization.
const TAU=Math.PI*2;
function render(c,w,h,time){
 const p=TAU*((((Number.isFinite(time)?time:0)%96)+96)%96)/96,unit=Math.min(w,h)/277;
 c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;
 const bg=c.createLinearGradient(0,0,w,h);bg.addColorStop(0,'#172a40');bg.addColorStop(.55,'#263143');bg.addColorStop(1,'#20283e');c.fillStyle=bg;c.fillRect(0,0,w,h);
 const bins=Array.from({length:24},()=>[]);
 for(let iy=0;iy<152;iy++)for(let ix=0;ix<176;ix++){
  const u=-.18+1.36*(ix+((ix*73+iy*151)%211)/211*.91)/175,v=-.18+1.36*(iy+((ix*37+iy*19)%131)/131*.91)/151,depth=(ix+iy*2)%3;
  const side=depth===1?1:0,cx=side?1.22:-.22,cy=side?.77:.23,dx=side?cx-u:u-cx,dy=v-cy,r=Math.sqrt(dx*dx+dy*dy),a=Math.atan2(dy,dx);
  const target=side?-.46+.2*Math.cos(p-r*2.1):.44+.17*Math.sin(p+r*1.8);
  const delta=a-target,g=Math.exp(-.5*delta*delta/.080),strength=depth===2?.24:.43;
  const angle=a-strength*delta*g,rad=r+.032*Math.sin(a*4+(side?-p:p))*g;
  const x=cx+(side?-1:1)*rad*Math.cos(angle),y=cy+rad*Math.sin(angle);
  const light=Math.min(.999,.09+.85*g),mod=.82+.18*Math.sin(r*11-a*7+depth*.8+.3*Math.sin(p));
  const tone=Math.min(7,Math.floor(light*mod*8)),size=unit*(.52+1.7*light)*(depth===0?1.03:depth===1?.96:.8);
  bins[depth*8+tone].push(x*w,y*h,size);
 }
 for(let depth=0;depth<3;depth++)for(let tone=0;tone<8;tone++){
  const rgb=depth===0?[248,231,193]:depth===1?[164,197,232]:[220,176,142];c.fillStyle=`rgba(${rgb.join(',')},${.17+tone*.107})`;c.beginPath();const a=bins[depth*8+tone];
  for(let k=0;k<a.length;k+=3){const x=a[k],y=a[k+1],s=a[k+2];c.rect(x-s*.5,y-s*.37,s,s*.74);}c.fill();
 }c.restore();
}
module.exports={render,id:'k310-2',duration:96};

return module.exports; })();

works["mendelssohn-spring-song"] = (() => { const module = {exports:{}};
'use strict';
// One private performance variant520×64 plus complete-run bounds culling.
// Private causal-light study: the unchanged mapping's analytic Jacobian controls radiance.
// Editorial visual cycle, not score timing or recording analysis.
const TAU=2*Math.PI;
function render(c,w,h,time){
 const p=TAU*(((Number.isFinite(time)?time:0)%48+48)%48)/48;
 c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;
 c.fillStyle='#0d302d';c.fillRect(0,0,w,h);
 const bins=Array.from({length:48},()=>[]),N=520,S=64;
 const rows=Array.from({length:S+1},(_,j)=>{
  const v=-.13+1.26*j/S,F=.55+.45*Math.cos(v*5-p),G=.5+.5*Math.sin(v*4.8+p+.4);
  return {v,F,G,broad:.10*Math.sin(v*5.2+p)+.045*Math.sin(v*10.3+1.2),bv:.52*Math.cos(v*5.2+p)+.4635*Math.cos(v*10.3+1.2),Fv:-2.25*Math.sin(v*5-p),Gv:2.4*Math.cos(v*4.8+p+.4)};
 });
 for(let i=0;i<N;i++){
  const seed=((i*137)%661)/661,depth=i%3,u=-.35+1.7*(i+.85*seed)/(N-1)+.004*Math.sin(i*1.87),s8=Math.sin(u*8),c8=Math.cos(u*8),ybase=.016*Math.sin(u*9+p),yuBase=.144*Math.cos(u*9+p);
  let last,lastBin=-1,run;
  for(let j=0;j<=S;j++){
   const {v,F,G,broad,bv,Fv,Gv}=rows[j],A=u*14+v*4.1-p,B=u*37-v*8+p,C=v*24+u*17+p,K=v*11+u*14-p;
   const sa=Math.sin(A),ca=Math.cos(A),sb=Math.sin(B),cb=Math.cos(B),sc=Math.sin(C),cc=Math.cos(C),sk=Math.sin(K),ck=Math.cos(K);
   const x=(u+broad+.070*sa*F+.030*sb*G*G+.008*sc*s8)*w;
   const y=(v+ybase+.006*sk)*h;
   const xu=1+.98*ca*F+1.11*cb*G*G+.008*(17*cc*s8+8*sc*c8);
   const xv=bv+.070*(4.1*ca*F+sa*Fv)+.030*(-8*cb*G*G+2*sb*G*Gv)+.192*cc*s8;
   const yu=yuBase+.084*ck,yv=1+.066*ck,J=xu*yv-xv*yu;
   // Broad bounded compression response; no singular bright spikes at J=0.
   const compression=1/(1+J*J/.9025),tone=Math.min(15,Math.floor((.06+.92*compression)*16)),bin=depth*16+tone;
   if(last){
    if(bin!==lastBin){run=[last[0],last[1],x,y];bins[bin].push(run)}else run.push(x,y);
    lastBin=bin;
   }
   last=[x,y];
  }
 }
 for(let d=0;d<3;d++)for(let t=0;t<16;t++){
  const k=t/15,r=Math.round(57+185*k),g=Math.round(119+122*k),b=Math.round(94+(d===1?64:98)*k);
  c.strokeStyle=`rgba(${r},${g},${b},${.10+.37*k})`;
  c.lineWidth=(.36+d*.09)*(Math.min(w,h)/277);c.beginPath();
  for(const a of bins[d*16+t]){
   // Cull only an entire run whose actual bounds miss the padded viewport.
   let minX=Infinity,maxX=-Infinity,minY=Infinity,maxY=-Infinity;
   for(let q=0;q<a.length;q+=2){minX=Math.min(minX,a[q]);maxX=Math.max(maxX,a[q]);minY=Math.min(minY,a[q+1]);maxY=Math.max(maxY,a[q+1]);}
   const margin=c.lineWidth*2+1;
   if(maxX < -margin || minX > w+margin || maxY < -margin || minY > h+margin)continue;
   c.moveTo(a[0],a[1]);for(let q=2;q<a.length;q+=2)c.lineTo(a[q],a[q+1]);
  }c.stroke();
 }
 c.restore();
}
module.exports={render,id:'mendelssohn-spring-song',duration:48};

return module.exports; })();

works["brahms-op118-2"] = (() => { const module = {exports:{}};
'use strict';
// Reciprocal folding of an inner field: editorial reflection, not a score simulation.
const TAU=Math.PI*2;
function render(c,w,h,time){
 const p=TAU*((((Number.isFinite(time)?time:0)%96)+96)%96)/96,unit=Math.min(w,h)/277;
 c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;
 const bg=c.createLinearGradient(0,0,w,h);bg.addColorStop(0,'#292132');bg.addColorStop(.5,'#382535');bg.addColorStop(1,'#271e30');c.fillStyle=bg;c.fillRect(0,0,w,h);
 const bins=Array.from({length:24},()=>[]);
 for(let iy=0;iy<152;iy++)for(let ix=0;ix<176;ix++){
  const u=-.18+1.36*(ix+((ix*73+iy*151)%211)/211*.91)/175,v=-.18+1.36*(iy+((ix*37+iy*19)%131)/131*.91)/151,depth=(ix+iy*2)%3;
  const phase=p+depth*.28,a=.075+.018*Math.sin(phase),b=.080+.018*Math.cos(phase);
  const ax=TAU*(1.3*u+.25*v)+.6*Math.sin(phase),ay=Math.PI*v+.4*Math.cos(phase),bx=Math.PI*u-.4*Math.sin(phase),by=TAU*(1.2*v-.22*u)-.6*Math.cos(phase);
  const sa=Math.sin(ax),ca=Math.cos(ax),sy=Math.sin(ay),cy=Math.cos(ay),sx=Math.sin(bx),cx=Math.cos(bx),sb=Math.sin(by),cb=Math.cos(by);
  const x=u+a*sa*sy,y=v-b*sx*sb;
  const ux=1+a*TAU*1.3*ca*sy,uy=a*(TAU*.25*ca*sy+Math.PI*sa*cy),vx=-b*(Math.PI*cx*sb-TAU*.22*sx*cb),vy=1-b*TAU*1.2*sx*cb,J=ux*vy-uy*vx;
  const density=Math.min(.999,Math.max(.12,(1/Math.sqrt(Math.max(.12,J))-.45)*.78));
  const modulation=.85+.15*Math.sin(u*9+v*11+depth*.6+.25*Math.sin(p));
  const tone=Math.min(7,Math.floor(density*modulation*8)),size=unit*(.5+1.55*density)*(depth===0?1.05:depth===1?.95:.83);
  bins[depth*8+tone].push(x*w,y*h,size);
 }
 for(let depth=0;depth<3;depth++)for(let tone=0;tone<8;tone++){
  const rgb=depth===0?[244,224,193]:depth===1?[192,177,215]:[209,139,155];c.fillStyle=`rgba(${rgb.join(',')},${.16+tone*.108})`;c.beginPath();const a=bins[depth*8+tone];
  for(let k=0;k<a.length;k+=3){const x=a[k],y=a[k+1],s=a[k+2];c.rect(x-s*.5,y-s*.37,s,s*.74);}c.fill();
 }c.restore();
}
module.exports={render,id:'brahms-op118-2',duration:96};

return module.exports; })();

works["rach-pc2-2"] = (() => { const module = {exports:{}};
'use strict';
// Reciprocal piano/woodwind-like foreground exchange; editorial, never recording sync.
const TAU=Math.PI*2;
function render(c,w,h,time){
const p=TAU*((((Number.isFinite(time)?time:0)%96)+96)%96)/96,unit=Math.min(w,h)/277;
c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.fillStyle='#202839';c.fillRect(0,0,w,h);c.globalCompositeOperation='screen';c.lineCap='round';
for(let voice=0;voice<2;voice++){
 const phase=p+voice*Math.PI,angle=voice?-.23:.18,cr=Math.cos(angle),sr=Math.sin(angle),n=voice?96:108,rgb=voice?'227,181,164':'178,212,235',presence=.73+.22*Math.cos(p-voice*Math.PI);
 for(let i=0;i<n;i++){
  const v=-.38+1.76*(i+.15*Math.sin(i*2.399))/(n-1);
  function field(u){
   const a=1.6*Math.PI*v+phase,sa=Math.sin(a),ca=Math.cos(a),su=Math.sin(Math.PI*u),cu=Math.cos(Math.PI*u),s2=Math.sin(TAU*u),c2=Math.cos(TAU*u);
   const x=u+.05*s2*ca,y=v+.2125*su*sa,xu=1+.05*TAU*c2*ca,yu=.2125*Math.PI*cu*sa,xv=-.08*Math.PI*s2*sa,yv=1+.34*Math.PI*su*ca;
   const dx=x-.5,dy=y-.5,normal=Math.abs(xu*yv-xv*yu)/Math.hypot(xu,yu);
   return [.5+dx*cr-dy*sr,.5+dx*sr+dy*cr,xu*cr-yu*sr,xu*sr+yu*cr,normal];
  }
  const g=c.createLinearGradient(-.1*w,0,1.1*w,0);for(let k=0;k<=8;k++){const a=field(-.1+1.2*k/8),light=Math.min(1,Math.pow(.35/(.2+a[4]),.6));g.addColorStop(k/8,`rgba(${rgb},${presence*(.18+.63*light)})`);}c.strokeStyle=g;c.lineWidth=.56*unit;
  c.beginPath();let old=field(-.1);c.moveTo(old[0]*w,old[1]*h);const step=1.2/8;for(let j=1;j<=8;j++){const next=field(-.1+j*step);c.bezierCurveTo((old[0]+old[2]*step/3)*w,(old[1]+old[3]*step/3)*h,(next[0]-next[2]*step/3)*w,(next[1]-next[3]*step/3)*h,next[0]*w,next[1]*h);old=next;}c.stroke();
 }
}
c.restore();}
module.exports={render,id:'rach-pc2-2',duration:96};

return module.exports; })();

works["schubert-ave-maria"] = (() => { const module = {exports:{}};
'use strict';
// Liszt piano arrangement: held middle cantabile with breathing surrounding support.
const TAU=Math.PI*2;
function render(c,w,h,time){
const p=TAU*((((Number.isFinite(time)?time:0)%96)+96)%96)/96,unit=Math.min(w,h)/277;
c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.fillStyle='#332b2d';c.fillRect(0,0,w,h);
function field(u,v){const a=TAU*.55*u+.2*Math.sin(p),b=TAU*v+p,compress=.65+.16*Math.cos(TAU*.55*u);const x=u+.035*Math.sin(b),y=.5+(v-.5)*compress+.10*Math.sin(a)+.06*Math.sin(b)*Math.sin(Math.PI*u);const xu=1,xv=.035*TAU*Math.cos(b),yu=-(v-.5)*.16*TAU*.55*Math.sin(TAU*.55*u)+.1*TAU*.55*Math.cos(a)+.06*Math.PI*Math.sin(b)*Math.cos(Math.PI*u),yv=compress+.06*TAU*Math.cos(b)*Math.sin(Math.PI*u);return[x,y,xu,yu,Math.abs(xu*yv-xv*yu)];}
const bins=Array.from({length:24},()=>[]);
for(let iy=0;iy<204;iy++)for(let ix=0;ix<176;ix++){
const seed=((ix*73+iy*151)%211)/211,u=-.16+1.32*(ix+seed*.6)/175,v=-1+3*(iy+((ix*37+iy*19)%131)/131*.6)/203,a=field(u,v),light=Math.min(.999,Math.pow(.30/(.12+a[4]),.72)),depth=(ix+iy*2)%3,tone=Math.min(7,Math.floor(light*8)),size=unit*(.40+1.12*light)*(depth===0?1.08:depth===1?.93:.78);
if(a[0]<-.04||a[0]>1.04||a[1]<-.04||a[1]>1.04)continue;bins[depth*8+tone].push(a[0]*w,a[1]*h,size);
}
for(let depth=0;depth<3;depth++)for(let tone=0;tone<8;tone++){const rgb=depth===0?'236,218,192':depth===1?'162,175,195':'194,146,127';c.fillStyle=`rgba(${rgb},${.16+tone*.095})`;c.beginPath();let b=bins[depth*8+tone];for(let i=0;i<b.length;i+=3){let s=b[i+2];c.rect(b[i]-s*.5,b[i+1]-s*.4,s,s*.8);}c.fill();}
// The central cantabile stays continuous while the surrounding granules breathe.
c.lineWidth=.44*unit;for(let i=0;i<96;i++){const v=-.5+2*(i+.5)/96;c.strokeStyle=`rgba(252,232,204,${.06+.5*Math.exp(-Math.pow((v-.5)/.38,2))})`;c.beginPath();let old=field(-.12,v);c.moveTo(old[0]*w,old[1]*h);const step=1.24/8;for(let j=1;j<=8;j++){let next=field(-.12+j*step,v);c.bezierCurveTo((old[0]+old[2]*step/3)*w,(old[1]+old[3]*step/3)*h,(next[0]-next[2]*step/3)*w,(next[1]-next[3]*step/3)*h,next[0]*w,next[1]*h);old=next;}c.stroke();}
c.restore();}
module.exports={render,id:'schubert-ave-maria',duration:96};

return module.exports; })();

works["vocalise"] = (() => { const module = {exports:{}};
'use strict';
// An extended breath and a quieter answering depth: editorial, not audio-derived.
const TAU=Math.PI*2;
function render(c,w,h,time){
 const p=TAU*((((Number.isFinite(time)?time:0)%96)+96)%96)/96,unit=Math.min(w,h)/277;
 c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;
 const bg=c.createLinearGradient(0,0,w,h);bg.addColorStop(0,'#242c44');bg.addColorStop(.5,'#302b42');bg.addColorStop(1,'#392732');c.fillStyle=bg;c.fillRect(0,0,w,h);
 const bins=Array.from({length:24},()=>[]);
 for(let iy=0;iy<152;iy++)for(let ix=0;ix<176;ix++){
  const u=-.18+1.36*(ix+((ix*73+iy*151)%211)/211*.91)/175,v=-.18+1.36*(iy+((ix*37+iy*19)%131)/131*.91)/151,depth=(ix+iy*2)%3;
  const phase=p+depth*.36,slope=.35+.15*Math.sin(p),a=.095+.012*Math.cos(phase),b=.12;
  const q=TAU*(v-slope*u)+phase+.45*Math.sin(Math.PI*u),r=Math.PI*v+.7*Math.sin(phase);
  const sq=Math.sin(q),cq=Math.cos(q),sr=Math.sin(r),cr=Math.cos(r);
  const x=u+b*sr,y=v+a*sq;
  const yu=a*cq*(-TAU*slope+.45*Math.PI*Math.cos(Math.PI*u)),yv=1+a*TAU*cq,xv=b*Math.PI*cr,J=yv-xv*yu;
  const light=Math.min(.999,Math.max(.08,(1/Math.sqrt(Math.max(.16,J))-.46)*.86));
  const grain=.89+.11*Math.sin(u*8+v*13+depth*.9),tone=Math.min(7,Math.floor(light*grain*8)),size=unit*(.43+1.65*light)*(1-depth*.07);
  bins[depth*8+tone].push(x*w,y*h,size);
 }
 for(let depth=0;depth<3;depth++)for(let tone=0;tone<8;tone++){
  const rgb=depth===0?[238,222,224]:depth===1?[177,189,229]:[224,161,158];c.fillStyle=`rgba(${rgb.join(',')},${.16+tone*.108})`;c.beginPath();const a=bins[depth*8+tone];
  for(let k=0;k<a.length;k+=3){const x=a[k],y=a[k+1],s=a[k+2];c.rect(x-s*.5,y-s*.37,s,s*.74);}c.fill();
 }c.restore();
}
module.exports={render,id:'vocalise',duration:96};

return module.exports; })();

works["mozart-pc21-2"] = (() => { const module = {exports:{}};
'use strict';
// Muted-string support, triplet motion and piano response interpreted as three optical currents.
const T=2*Math.PI;
function render(c,w,h,time){const p=T*((((Number.isFinite(time)?time:0)%96)+96)%96)/96,s=Math.min(w,h)/277;c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.fillStyle='#253248';c.fillRect(0,0,w,h);const bins=Array.from({length:24},()=>[]);
for(let iy=0;iy<196;iy++)for(let ix=0;ix<188;ix++){const u=-.4+1.8*(ix+((iy*37+ix*13)%131)/180)/187,v=-.45+1.9*(iy+((iy*19+ix*53)%137)/190)/195,a=T*(1.394*u+.493*v)+p,b=T*(-.348*u+1.0585*v)-p,c1=.105/1.7,c2=.13/1.45,x=u+c1*Math.sin(a)+.045/1.45*Math.sin(b),y=v+.065/1.7*Math.sin(a)+c2*Math.sin(b),xu=1+c1*T*1.394*Math.cos(a)-.045*T*.24*Math.cos(b),xv=c1*T*.493*Math.cos(a)+.045*T*.73*Math.cos(b),yu=.065*T*.82*Math.cos(a)-c2*T*.348*Math.cos(b),yv=1+.065*T*.29*Math.cos(a)+c2*T*1.0585*Math.cos(b),jac=Math.abs(xu*yv-xv*yu),fro=xu*xu+xv*xv+yu*yu+yv*yv,small=Math.sqrt(Math.max(.0001,(fro-Math.sqrt(Math.max(0,fro*fro-4*jac*jac)))/2)),density=.45*jac+.55*small;if(x<-.02||x>1.02||y<-.02||y>1.02)continue;let q=Math.min(.999,Math.pow(.29/(.11+density),.82)),d=(ix+2*iy)%3,tone=Math.floor(q*8),size=s*(.42+.8*q);bins[d*8+tone].push(x*w,y*h,size);}
for(let d=0;d<3;d++)for(let t=0;t<8;t++){c.fillStyle=`rgba(${d===0?'207,225,239':d===1?'146,188,220':'183,174,216'},${.14+t*.1})`;c.beginPath();let b=bins[d*8+t];for(let i=0;i<b.length;i+=3)c.rect(b[i],b[i+1],b[i+2],b[i+2]*.72);c.fill();}c.restore();}
module.exports={render,id:'mozart-pc21-2',duration:96};

return module.exports; })();

works["paganini-var18"] = (() => { const module = {exports:{}};
'use strict';
// Opposed optical inversions: editorial association, not score or orchestral simulation.
const TAU=Math.PI*2;
function render(c,w,h,time){
 const p=TAU*((((Number.isFinite(time)?time:0)%96)+96)%96)/96,unit=Math.min(w,h)/277;
 c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;
 const bg=c.createLinearGradient(0,0,w,h);bg.addColorStop(0,'#1f3029');bg.addColorStop(.5,'#2a3830');bg.addColorStop(1,'#272e31');c.fillStyle=bg;c.fillRect(0,0,w,h);
 const bins=Array.from({length:24},()=>[]);
 for(let i=0;i<39000;i++){
  const u=-.2+1.4*((.5+i*.7548776662466927)%1),v=-.2+1.4*((.5+i*.5698402909980532)%1),depth=i%3;
  const phase=p+depth*.70,ca=.68+.28*Math.sin(phase),cb=.03+.28*Math.cos(phase);
  const aa=(u+v)*Math.SQRT1_2,bb=(v-u)*Math.SQRT1_2;
  const ta=Math.tanh((aa-ca)/.23),tb=Math.tanh((bb-cb)/.24);
  const A=aa-.145*ta,B=bb-.135*tb;
  const x=(A-B)*Math.SQRT1_2+.035*Math.sin(phase),y=(A+B)*Math.SQRT1_2;
  const J=(1-.145/.23*(1-ta*ta))*(1-.135/.24*(1-tb*tb));
  const light=Math.min(.999,Math.max(.1,(1/Math.sqrt(Math.max(.12,J))-.72)*.66));
  const tone=Math.min(7,Math.floor(light*8)),size=unit*(.42+1.30*light)*(1-depth*.055);
  bins[depth*8+tone].push(x*w,y*h,size);
 }
 for(let depth=0;depth<3;depth++)for(let tone=0;tone<8;tone++){
  const rgb=depth===0?[247,232,191]:depth===1?[210,172,104]:[153,194,166];c.fillStyle=`rgba(${rgb.join(',')},${.16+tone*.108})`;c.beginPath();const a=bins[depth*8+tone];
  for(let k=0;k<a.length;k+=3){const x=a[k],y=a[k+1],s=a[k+2];c.rect(x-s*.5,y-s*.37,s,s*.74);}c.fill();
 }c.restore();
}
module.exports={render,id:'paganini-var18',duration:96};

return module.exports; })();

works["solveigs-song"] = (() => { const module = {exports:{}};
'use strict';
// Unequal returning depths: editorial association with waiting, not a measured performance.
const TAU=Math.PI*2;
function render(c,w,h,time){
 const p=TAU*((((Number.isFinite(time)?time:0)%96)+96)%96)/96,unit=Math.min(w,h)/277;
 c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;
 const bg=c.createLinearGradient(0,0,w,h);bg.addColorStop(0,'#2b303b');bg.addColorStop(.5,'#353232');bg.addColorStop(1,'#282b37');c.fillStyle=bg;c.fillRect(0,0,w,h);
 const bins=Array.from({length:24},()=>[]);
 for(let iy=0;iy<160;iy++)for(let ix=0;ix<180;ix++){
  const depth=(ix+iy*2)%3,u=-.22+1.44*(ix+((ix*73+iy*151)%211)/211*.95)/179,v=-.22+1.44*(iy+((ix*37+iy*19)%131)/131*.95)/159;
  const phase=p+depth*1.1,turn=depth===1;
  const a=turn?v:u,b=turn?u:v,centre=.5+.23*Math.sin(Math.PI*b+.8*Math.sin(phase))+.12*Math.cos(phase);
  const z=Math.tanh((a-centre)/.23),A=a-.145*z,B=b+.07*Math.sin(Math.PI*a+phase)*Math.sin(Math.PI*b);
  const da=1-.145/.23*(1-z*z),db=.145/.23*(1-z*z)*.23*Math.PI*Math.cos(Math.PI*b+.8*Math.sin(phase));
  const ba=.07*Math.PI*Math.cos(Math.PI*a+phase)*Math.sin(Math.PI*b),bb=1+.07*Math.PI*Math.sin(Math.PI*a+phase)*Math.cos(Math.PI*b),J=da*bb-db*ba;
  const x=turn?B:A,y=turn?A:B;
  const light=Math.min(.999,Math.max(.1,(1/Math.sqrt(Math.max(.16,J))-.52)*.71));
  const tone=Math.min(7,Math.floor(light*8)),size=unit*(.37+1.2*light)*(1-depth*.055);
  bins[depth*8+tone].push(x*w,y*h,size);
 }
 for(let depth=0;depth<3;depth++)for(let tone=0;tone<8;tone++){
  const rgb=depth===0?[239,225,205]:depth===1?[182,198,224]:[210,158,113];c.fillStyle=`rgba(${rgb.join(',')},${.16+tone*.108})`;c.beginPath();const a=bins[depth*8+tone];
  for(let k=0;k<a.length;k+=3){const x=a[k],y=a[k+1],s=a[k+2];c.rect(x-s*.5,y-s*.37,s,s*.74);}c.fill();
 }c.restore();
}
module.exports={render,id:'solveigs-song',duration:96};

return module.exports; })();

works["figaro-letter-duet"] = (() => { const module = {exports:{}};
'use strict';
// Offset dictation and response in a shared optical field: editorial, not score-derived.
const TAU=Math.PI*2;
function render(c,w,h,time){
 const p=TAU*((((Number.isFinite(time)?time:0)%96)+96)%96)/96,unit=Math.min(w,h)/277;
 c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;
 const bg=c.createLinearGradient(0,0,w,h);bg.addColorStop(0,'#282a34');bg.addColorStop(.5,'#332d32');bg.addColorStop(1,'#242b35');c.fillStyle=bg;c.fillRect(0,0,w,h);
 const bins=Array.from({length:24},()=>[]);
 for(let iy=0;iy<160;iy++)for(let ix=0;ix<180;ix++){
  const depth=(ix+iy*2)%3,u=-.22+1.44*(ix+((ix*73+iy*151)%211)/211*.95)/179,v=-.22+1.44*(iy+((ix*37+iy*19)%131)/131*.95)/159;
  const phase=p+depth*.85,Y=v+.085*Math.sin(TAU*u+phase),scale=1+.11*TAU*Math.cos(TAU*u+phase)*Math.cos(Math.PI*Y+.6*Math.sin(phase));
  const x=u+.11*Math.sin(TAU*u+phase)*Math.cos(Math.PI*Y+.6*Math.sin(phase))+.08*Math.sin(TAU*Y-phase),y=Y;
  const light=Math.min(.999,Math.max(.1,(1/Math.sqrt(scale)-.48)*.76));
  const tone=Math.min(7,Math.floor(light*8)),size=unit*(.42+1.28*light)*(1-depth*.055);
  bins[depth*8+tone].push(x*w,y*h,size);
 }
 for(let depth=0;depth<3;depth++)for(let tone=0;tone<8;tone++){
  const rgb=depth===0?[244,226,191]:depth===1?[207,165,130]:[170,194,211];c.fillStyle=`rgba(${rgb.join(',')},${.16+tone*.108})`;c.beginPath();const a=bins[depth*8+tone];
  for(let k=0;k<a.length;k+=3){const x=a[k],y=a[k+1],s=a[k+2];c.rect(x-s*.5,y-s*.37,s,s*.74);}c.fill();
 }c.restore();
}
module.exports={render,id:'figaro-letter-duet',duration:96};

return module.exports; })();

works["flower-duet"] = (() => { const module = {exports:{}};
'use strict';
// Neighboring optical depths converge and return: editorial association, not measured voices.
const TAU=Math.PI*2;
function render(c,w,h,time){
 const p=TAU*((((Number.isFinite(time)?time:0)%96)+96)%96)/96,unit=Math.min(w,h)/277;
 c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;
 const bg=c.createLinearGradient(0,0,w,h);bg.addColorStop(0,'#242b36');bg.addColorStop(.5,'#30323a');bg.addColorStop(1,'#292535');c.fillStyle=bg;c.fillRect(0,0,w,h);
 const bins=Array.from({length:24},()=>[]);
 for(let iy=0;iy<160;iy++)for(let ix=0;ix<180;ix++){
  const depth=(ix+iy*2)%3,u=-.22+1.44*(ix+((ix*73+iy*151)%211)/211*.95)/179,v=-.22+1.44*(iy+((ix*37+iy*19)%131)/131*.95)/159;
  const phase=p+depth*.85,cx=.5+.24*Math.sin(phase),cy=.5+.23*Math.cos(phase+.4),dx=u-cx,dy=v-cy;
  const r2=dx*dx/(.78*.78)+dy*dy/(.56*.56),e=.55*Math.exp(-r2),scale=1-e;
  const y=cy+dy*scale,x=cx+dx*scale+.06*Math.sin(TAU*y-phase);
  const J=scale*(scale+2*e*r2),light=Math.min(.999,Math.max(.12,(1/Math.sqrt(Math.max(.16,J))-.55)*.72));
  const tone=Math.min(7,Math.floor(light*8)),size=unit*(.40+1.22*light)*(1-depth*.055);
  bins[depth*8+tone].push(x*w,y*h,size);
 }
 for(let depth=0;depth<3;depth++)for(let tone=0;tone<8;tone++){
  const rgb=depth===0?[235,236,209]:depth===1?[163,204,179]:[202,172,207];c.fillStyle=`rgba(${rgb.join(',')},${.16+tone*.108})`;c.beginPath();const a=bins[depth*8+tone];
  for(let k=0;k<a.length;k+=3){const x=a[k],y=a[k+1],s=a[k+2];c.rect(x-s*.5,y-s*.37,s,s*.74);}c.fill();
 }c.restore();
}
module.exports={render,id:'flower-duet',duration:96};

return module.exports; })();

works["beethoven-5"] = (() => { const module = {exports:{}};
'use strict';
// Editorial development of one pressured field, not four objects or audio timing.
const TAU=2*Math.PI;
function render(c,w,h,time){
 const p=TAU*(((Number.isFinite(time)?time:0)%48+48)%48)/48;
 c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.fillStyle='#191e2a';c.fillRect(0,0,w,h);
 const bins=Array.from({length:24},()=>[]),scale=Math.min(w,h)/277;
 for(let iy=0;iy<150;iy++)for(let ix=0;ix<180;ix++){
  const seed=((ix*71+iy*193)%223)/223,xx=-1+2*(ix+.7*seed)/179,yy=-1+2*(iy+.7*((ix*37+iy*11)%137)/137)/149,r=Math.max(.0001,Math.sqrt(xx*xx+yy*yy)),theta=Math.atan2(yy,xx),a=theta*3-p,b=r*9+p;
  const R=r*(1+.06*Math.sin(a))+.075*r/(r+.2)*Math.sin(b),rr=1+.06*Math.sin(a)+.075*(.2/((r+.2)*(r+.2))*Math.sin(b)+9*r/(r+.2)*Math.cos(b)),rt=.18*r*Math.cos(a),turn=theta+.36*Math.sin(r*5-p),tr=1.8*Math.cos(r*5-p);
  const J=(R/r)*(rr-rt*tr),compression=1/(1+J*J),ton=Math.min(7,Math.floor((.12+.87*compression)*8)),d=(ix+iy)%3;
  const x=(.47+.80*R*Math.cos(turn))*w,y=(.53+.80*R*Math.sin(turn))*h,s=(.7+1.25*compression+.20*seed)*scale;
  if(x < -1.2*s||x > w+s||y < -s||y > h+s)continue;
  bins[d*8+ton].push(x,y,s);
 }
 for(let d=0;d<3;d++)for(let t=0;t<8;t++){
  const k=t/7,colors=d===0?[239,191,126]:d===1?[173,111,104]:[189,184,201];c.fillStyle=`rgba(${colors.join(',')},${.18+.78*k})`;c.beginPath();const a=bins[d*8+t];for(let j=0;j<a.length;j+=3)c.rect(a[j],a[j+1],a[j+2]*1.2,a[j+2]*.65);c.fill();
 }
 c.restore();
}
module.exports={id:'beethoven-5',duration:48,render};

return module.exports; })();

works["bolero"] = (() => { const module = {exports:{}};
'use strict';
// Continuous circulation with a slow change of orchestral breadth; editorial, not audio sync.
const T=2*Math.PI;
function render(c,w,h,time){const p=T*((((Number.isFinite(time)?time:0)%96)+96)%96)/96,s=Math.min(w,h)/277,margin=Math.max(4,2*s),cx=.46+.035*Math.sin(p),cy=.5+.025*Math.cos(p),bins=Array.from({length:24},()=>[]);c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.fillStyle='#253239';c.fillRect(0,0,w,h);
for(let j=0;j<180;j++){let a=.32+.035*Math.cos(p);for(let i=0;i<200;i++){let hash=Math.imul(i+1,1597334677)^Math.imul(j+1,3812015801);hash=Math.imul(hash^(hash>>>16),2246822519);let r=Math.sqrt((j+(hash>>>0)/4294967296)/180)*1.08,twist=.75*r+.25*Math.sin(p),t=T*(i+((i*31+j*47)%173)/240)/200,theta=t+twist+a*Math.sin(2*t-p),jac=1+2*a*Math.cos(2*t-p),x=(cx+.90*r*Math.cos(theta))*w,y=(cy+.90*r*Math.sin(theta))*h;if(x<-margin||x>w+margin||y<-margin||y>h+margin)continue;let light=Math.min(.999,.14+.68/(.38+jac)),d=(i+2*j)%3,z=s*(.48+1.45*light),tone=Math.floor(light*8);bins[d*8+tone].push(x,y,z);}}
for(let d=0;d<3;d++)for(let k=0;k<8;k++){c.fillStyle=`rgba(${d===0?'247,196,139':d===1?'113,199,208':'214,133,123'},${.17+k*.105})`;c.beginPath();let b=bins[d*8+k];for(let i=0;i<b.length;i+=3)c.rect(b[i]-.5*b[i+2],b[i+1]-.36*b[i+2],b[i+2],b[i+2]*.72);c.fill();}c.restore();}
module.exports={render,id:'bolero',duration:96};

return module.exports; })();

works["farandole"] = (() => { const module = {exports:{}};
'use strict';
// Two distinct open currents interweave, editorial counterpoint rather than recording sync.
const T=2*Math.PI;
function render(c,w,h,time){const p=T*((((Number.isFinite(time)?time:0)%96)+96)%96)/96,s=Math.min(w,h)/277,margin=Math.max(4,2*s),bins=Array.from({length:24},()=>[]);c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.fillStyle='#19383d';c.fillRect(0,0,w,h);
for(let layer=0;layer<2;layer++){let phase=p+layer*2.4,angle=layer?-.42:.31,cr=Math.cos(angle),sr=Math.sin(angle);for(let j=0;j<110;j++)for(let i=0;i<132;i++){let hash=Math.imul(i+1,1597334677)^Math.imul(j+1+layer*137,3812015801);hash=Math.imul(hash^(hash>>>16),2246822519);const u=-.28+1.56*(i+((i*37+j*71)%193)/250)/131,v=-.40+1.8*(j+(hash>>>0)/4294967296)/109,a=T*.85*v+phase,y0=v+.16*Math.sin(Math.PI*u+layer*.7)+.13*Math.sin(a),jac=1+.13*T*.85*Math.cos(a),x0=u+.035*Math.sin(a+phase),dx=x0-.5,dy=y0-.5,x=(.5+dx*cr-dy*sr)*w,y=(.5+dx*sr+dy*cr)*h;if(x<-margin||x>w+margin||y<-margin||y>h+margin)continue;const light=Math.min(.999,.12+.76/(.5+Math.abs(jac))),z=s*(.48+1.45*light),depth=layer?2:(i+j)%2;bins[depth*8+Math.floor(light*8)].push(x,y,z);}}
for(let d=0;d<3;d++)for(let k=0;k<8;k++){c.fillStyle=`rgba(${d===0?'240,224,156':d===1?'115,219,209':'239,157,132'},${.16+k*.105})`;c.beginPath();let b=bins[d*8+k];for(let i=0;i<b.length;i+=3)c.rect(b[i]-.5*b[i+2],b[i+1]-.35*b[i+2],b[i+2],b[i+2]*.7);c.fill();}c.restore();}
module.exports={render,id:'farandole',duration:96};

return module.exports; })();

works["pictures"] = (() => { const module = {exports:{}};
'use strict';
// Broad woven arches for the currently selected Great Gate track; no literal building.
const TAU=2*Math.PI;
function render(c,w,h,time){
 const p=TAU*(((Number.isFinite(time)?time:0)%72+72)%72)/72;
 c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.fillStyle='#183b42';c.fillRect(0,0,w,h);
 const bins=Array.from({length:48},()=>[]),N=430,S=56;
 const columns=Array.from({length:3},(_,depth)=>{const q=p+depth*.32;return Array.from({length:S+1},(_,j)=>{const u=-.3+1.6*j/S,U=u+.11*Math.sin(u*4.4+q),du=1+.484*Math.cos(u*4.4+q),vshift=.08*Math.sin(U*5+q);return {U,du,vshift};});});
 for(let i=0;i<N;i++){
  const depth=i%3,q=p+depth*.32,seed=((i*137)%433)/433,v=-.3+1.6*(i+.75*seed)/(N-1),dv=1+.42*Math.cos(v*6-q),vbase=v+.07*Math.sin(v*6-q);let last,lastBin=-1,run;
  for(let j=0;j<=S;j++){
   const {U,du,vshift}=columns[depth][j],V=vbase+vshift,X=U+.11*Math.sin(V*4+q),Y=V+.05*Math.sin(X*5-q),J=du*dv;
   // Positive determinant >=.516*.58: no fold singularity or black compensation hole.
   const light=Math.max(0,Math.min(.999,(1.85-J)/1.55)),bin=depth*16+Math.floor(light*16),x=X*w,y=Y*h;
   if(last){if(bin!==lastBin){run=[last[0],last[1],x,y];bins[bin].push(run)}else run.push(x,y);lastBin=bin}last=[x,y];
  }
 }
 for(let depth=0;depth<3;depth++)for(let t=0;t<16;t++){
  const k=t/15;c.strokeStyle=`rgba(${Math.round(48+191*k)},${Math.round(113+116*k)},${Math.round(122+(42+depth*18)*k)},${(.14+.52*k)*(1-.10*depth)})`;c.lineWidth=(.28+.58*k)*(1-.16*depth)*Math.min(w,h)/277;c.beginPath();
  for(const a of bins[depth*16+t]){let lo=Infinity,hi=-Infinity;for(let q=1;q<a.length;q+=2){lo=Math.min(lo,a[q]);hi=Math.max(hi,a[q])}if(hi < -10||lo > h+10)continue;c.moveTo(a[0],a[1]);for(let q=2;q<a.length;q+=2)c.lineTo(a[q],a[q+1])}c.stroke();
 }
 c.restore();
}
module.exports={id:'pictures',duration:72,render};

return module.exports; })();

works["orpheus-overture"] = (() => { const module = {exports:{}};
'use strict';
// Broad theatrical exchanges between two open light gatherings; editorial, not audio sync.
const T=2*Math.PI;
function render(c,w,h,time){const p=T*((((Number.isFinite(time)?time:0)%96)+96)%96)/96,s=Math.min(w,h)/277,margin=Math.max(4,2*s),bins=Array.from({length:24},()=>[]),fields=[{x:.35+.05*Math.sin(p),y:.30+.08*Math.cos(p),a:.34+.19*Math.sin(p),width:.17+.02*Math.cos(p)},{x:.65+.04*Math.cos(p),y:.70-.07*Math.sin(p),a:-.28+.17*Math.cos(p),width:.22-.025*Math.sin(p)}].map(q=>({...q,cr:Math.cos(q.a),sr:Math.sin(q.a)}));c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.fillStyle='#233653';c.fillRect(0,0,w,h);
for(let j=0;j<150;j++)for(let i=0;i<170;i++){let hash=Math.imul(i+1,1597334677)^Math.imul(j+1,3812015801);hash=Math.imul(hash^(hash>>>16),2246822519);const u=-.18+1.36*(i+((i*31+j*47)%181)/240)/169,v=-.18+1.36*(j+(hash>>>0)/4294967296)/149;let x=u,y=v,light=.08,turn=0;for(let k=0;k<2;k++){const q=fields[k],dx=u-q.x,dy=v-q.y,along=dx*q.cr+dy*q.sr,across=-dx*q.sr+dy*q.cr,g=Math.exp(-.5*(along*along/.49+across*across/(q.width*q.width))),normal=-.38*across*g,slide=(k?-.035:.035)*g*Math.sin(p);x+=-q.sr*normal+q.cr*slide;y+=q.cr*normal+q.sr*slide;light+=g*(k?.65:.8);turn+=g*(k?1:-1);}light=Math.min(.999,light);if(x*w<-margin||x*w>w+margin||y*h<-margin||y*h>h+margin)continue;const d=(i+2*j)%3,z=s*(.48+1.42*light);bins[d*8+Math.floor(light*8)].push(x*w,y*h,z);}
for(let d=0;d<3;d++)for(let k=0;k<8;k++){c.fillStyle=`rgba(${d===0?'243,220,170':d===1?'143,199,232':'234,151,160'},${.17+k*.105})`;c.beginPath();let b=bins[d*8+k];for(let i=0;i<b.length;i+=3)c.rect(b[i]-.5*b[i+2],b[i+1]-.36*b[i+2],b[i+2],b[i+2]*.72);c.fill();}c.restore();}
module.exports={render,id:'orpheus-overture',duration:96};

return module.exports; })();

works["rojo-no-tsuki"] = (() => { const module = {exports:{}};
'use strict';
// Returning phrasing seen through separated optical depths; editorial time, not the recorded score.
const TAU=2*Math.PI;
function hash(n){n=Math.imul(n^n>>>16,0x45d9f3b);n=Math.imul(n^n>>>16,0x45d9f3b);return((n^n>>>16)>>>0)/4294967296;}
function render(c,w,h,time){
 const p=TAU*((((Number.isFinite(time)?time:0)%96)+96)%96)/96,unit=Math.min(w,h)/277;
 c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;
 const bg=c.createLinearGradient(0,0,w,h);bg.addColorStop(0,'#2c303b');bg.addColorStop(.5,'#33323b');bg.addColorStop(1,'#252f3c');c.fillStyle=bg;c.fillRect(0,0,w,h);
 const bins=Array.from({length:24},()=>[]),states=[0,1,2].map(d=>{const phase=p+d*2.07,angle=[-.20,.28,-.06][d]+.06*Math.sin(phase);return{phase,ca:Math.cos(angle),sa:Math.sin(angle),frequency:.62+d*.13};});
 for(let iy=0;iy<180;iy++)for(let ix=0;ix<180;ix++){
  const i=iy*180+ix,depth=Math.min(2,Math.floor(hash(i+7529)*3)),s=states[depth];
  const u=-.38+1.76*(ix+hash(i+149))/180,v=-.38+1.76*(iy+hash(i+9187))/180;
  const x0=u+.11*Math.sin(TAU*v*.65+s.phase);
  const centre=.5+.23*Math.sin(s.phase)+.14*Math.sin(TAU*s.frequency*x0+s.phase);
  const q=Math.tanh((v-centre)/.32),y0=v-.20*q,J=1-.20/.32*(1-q*q);
  const x=.5+s.ca*(x0-.5)-s.sa*(y0-.5),y=.5+s.sa*(x0-.5)+s.ca*(y0-.5);
  const light=Math.min(.999,Math.max(.12,(1/Math.sqrt(J)-.55)*.72)),tone=Math.min(7,Math.floor(light*8)),size=unit*(.40+1.22*light)*(1-depth*.055);
  bins[depth*8+tone].push(x*w,y*h,size);
 }
 for(let d=0;d<3;d++)for(let t=0;t<8;t++){
  const rgb=d===0?[233,228,211]:d===1?[174,200,215]:[205,174,151];c.fillStyle=`rgba(${rgb.join(',')},${.16+t*.108})`;c.beginPath();const a=bins[d*8+t];
  for(let k=0;k<a.length;k+=3){const x=a[k],y=a[k+1],s=a[k+2];c.rect(x-s*.5,y-s*.37,s,s*.74);}c.fill();
 }c.restore();
}
module.exports={render,id:'rojo-no-tsuki',duration:96};

return module.exports; })();

works["queen-of-night"] = (() => { const module = {exports:{}};
'use strict';
// Articulated opposing light planes, editorial vocal/register contrast; never audio sync.
const T=2*Math.PI;
function render(c,w,h,time){const p=T*((((Number.isFinite(time)?time:0)%96)+96)%96)/96,s=Math.min(w,h)/277,margin=Math.max(4,2*s),bins=Array.from({length:24},()=>[]);c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.fillStyle='#242b49';c.fillRect(0,0,w,h);
for(let j=0;j<156;j++)for(let i=0;i<174;i++){let hash=Math.imul(i+1,1597334677)^Math.imul(j+1,3812015801);hash=Math.imul(hash^(hash>>>16),2246822519);const u=-.2+1.4*(i+((i*31+j*47)%181)/240)/173,v=-.2+1.4*(j+(hash>>>0)/4294967296)/155,a=.25+.16*Math.sin(v*4.5+p),b=.77+.12*Math.cos(v*5.3-p),d=u-a,d2=u-b,g=Math.exp(-.5*d*d/.0324),g2=Math.exp(-.5*d2*d2/.0256),x=u-.32*d*g-.26*d2*g2,y=v+.035*Math.sin(p)*(g-g2),light=Math.min(.999,.08+.77*g+.65*g2),depth=(i+2*j)%3,z=s*(.48+1.42*light);if(x*w<-margin||x*w>w+margin||y*h<-margin||y*h>h+margin)continue;bins[depth*8+Math.floor(light*8)].push(x*w,y*h,z);}
for(let d=0;d<3;d++)for(let k=0;k<8;k++){c.fillStyle=`rgba(${d===0?'222,231,248':d===1?'157,160,231':'226,151,194'},${.17+k*.105})`;c.beginPath();let b=bins[d*8+k];for(let i=0;i<b.length;i+=3)c.rect(b[i]-.5*b[i+2],b[i+1]-.36*b[i+2],b[i+2],b[i+2]*.72);c.fill();}c.restore();}
module.exports={render,id:'queen-of-night',duration:96};

return module.exports; })();

works["brahms-lullaby"] = (() => { const module = {exports:{}};
'use strict';
// Two unequal continuous transmitted-light populations; editorial, not audio-synchronized.
const TAU=Math.PI*2;
function render(c,w,h,time){const p=TAU*((((Number.isFinite(time)?time:0)%96)+96)%96)/96,s=Math.min(w,h)/277;c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.fillStyle='#142733';c.fillRect(0,0,w,h);
for(let d=0;d<2;d++){const phase=d===0?p:-p+1.1,N=d===0?410:330,slope=d===0?.27:-.19,amp=d===0?.12:.155,fre=d===0?3.4:2.7;const g=c.createLinearGradient(0,0,w,h);if(d===0){g.addColorStop(0,'rgba(244,222,177,.38)');g.addColorStop(.48,'rgba(242,229,201,.58)');g.addColorStop(1,'rgba(195,173,151,.28)')}else{g.addColorStop(0,'rgba(121,192,206,.18)');g.addColorStop(.63,'rgba(173,223,219,.37)');g.addColorStop(1,'rgba(199,213,230,.24)')}c.strokeStyle=g;c.lineWidth=(d===0?.48:.42)*s;c.beginPath();const basis=Array.from({length:13},(_,j)=>{const u=-.15+1.3*j/12;return [u,Math.sin(fre*u+.7*Math.sin(phase)),Math.cos(fre*u+.7*Math.sin(phase)),Math.cos(2.4*u-phase),Math.sin(2.4*u-phase)]});
for(let i=0;i<N;i++){const q=-.4+1.8*i/(N-1),Q=q+.11*Math.sin(4.4*q+.55*Math.sin(phase)+d*.8),a=.10*Math.sin(2.5*q+.4+d),b=amp*(.8+.2*Math.cos(3*q-phase));const y=k=>Q+a*basis[k][1]+b*basis[k][3]+slope*(basis[k][0]-.5);const dy=k=>a*fre*basis[k][2]-b*2.4*basis[k][4]+slope;let x0=-.15,y0=y(0),dy0=dy(0);c.moveTo(x0*w,y0*h);for(let j=1;j<=12;j++){let x1=-.15+1.3*j/12,y1=y(j),dy1=dy(j),dx=(x1-x0)/3;c.bezierCurveTo((x0+dx)*w,(y0+dx*dy0)*h,(x1-dx)*w,(y1-dx*dy1)*h,x1*w,y1*h);x0=x1;y0=y1;dy0=dy1}}
c.stroke()}c.restore()}
module.exports={id:'brahms-lullaby',duration:96,render};

return module.exports; })();

works["faure-apres-un-reve"] = (() => { const module = {exports:{}};
'use strict';
const TAU=2*Math.PI;
function render(c,w,h,time){const p=TAU*((((Number.isFinite(time)?time:0)%96)+96)%96)/96,s=Math.min(w,h)/277;
c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.lineCap='round';c.lineJoin='round';c.fillStyle='#261e30';c.fillRect(0,0,w,h);
for(let i=0;i<240;i++){
 const q=-.32+1.64*i/239,a=.17*Math.sin(6*q-p),b=.12*Math.cos(4.5*q+.6*Math.sin(p)),d=.06*Math.sin(q*8+p),sway=.045*Math.sin(4*q-p),lit=.5+.5*Math.sin(5*q-p+.6),center=.5+.27*Math.sin(4*q-p);
 const x=u=>u+sway*Math.sin(Math.PI*u),dx=u=>1+sway*Math.PI*Math.cos(Math.PI*u);
 const y=u=>q+a*Math.sin(Math.PI*u)+b*Math.sin(2*Math.PI*u+.5)+d*(u-.5),dy=u=>a*Math.PI*Math.cos(Math.PI*u)+b*2*Math.PI*Math.cos(2*Math.PI*u+.5)+d;
 const g=c.createLinearGradient(-.1*w,y(-.1)*h,1.1*w,y(1.1)*h);
 g.addColorStop(0,`rgba(139,130,190,${.40+.15*lit})`);g.addColorStop(center-.20,`rgba(221,152,157,${.60+.20*lit})`);g.addColorStop(center,`rgba(255,239,209,${.82+.16*lit})`);g.addColorStop(center+.20,`rgba(229,184,191,${.62+.18*lit})`);g.addColorStop(1,`rgba(142,158,195,${.42+.17*lit})`);
 c.strokeStyle=g;c.lineWidth=(.50+.32*lit)*s;c.beginPath();let u0=-.12,X=x(u0),Y=y(u0),DX=dx(u0),DY=dy(u0);c.moveTo(X*w,Y*h);
 for(let j=1;j<=6;j++){const u1=-.12+1.24*j/6,Z=x(u1),V=y(u1),DZ=dx(u1),DV=dy(u1),du=(u1-u0)/3;c.bezierCurveTo((X+du*DX)*w,(Y+du*DY)*h,(Z-du*DZ)*w,(V-du*DV)*h,Z*w,V*h);u0=u1;X=Z;Y=V;DX=DZ;DY=DV;}c.stroke();
}c.restore();}
module.exports={render,id:'faure-apres-un-reve',duration:96};

return module.exports; })();

works["o-mio-babbino"] = (() => { const module = {exports:{}};
'use strict';
// A long appeal and quiet return, editorial rather than score/recording synchronized.
const TAU=2*Math.PI;
function render(c,w,h,time){const p=TAU*((((Number.isFinite(time)?time:0)%96)+96)%96)/96,s=Math.min(w,h)/277;
c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.lineCap='round';c.lineJoin='round';c.fillStyle='#092f32';c.fillRect(0,0,w,h);
const vertex=.38+.10*Math.sin(p),breath=.84+.16*Math.sin(p);
for(let i=0;i<260;i++){
 const q=-.45+1.9*i/259,phase=q*5-p,tilt=.32*Math.sin(phase),curve=.90*breath*Math.cos(q*5+.45*Math.sin(p)),turn=.40*Math.sin(q*3.7+p),lit=.5+.5*Math.sin(phase+.65),center=.50+.25*Math.sin(phase+.3);
 const y=u=>{const z=u-vertex;return q+tilt*z+curve*z*z+turn*z*z*z;},dy=u=>{const z=u-vertex;return tilt+2*curve*z+3*turn*z*z;};
 const g=c.createLinearGradient(-.12*w,y(-.12)*h,1.12*w,y(1.12)*h);
 g.addColorStop(0,`rgba(63,151,145,${.44+.16*lit})`);g.addColorStop(center-.21,`rgba(121,210,176,${.62+.19*lit})`);g.addColorStop(center,`rgba(255,239,195,${.82+.16*lit})`);g.addColorStop(center+.21,`rgba(223,185,133,${.62+.18*lit})`);g.addColorStop(1,`rgba(85,161,177,${.43+.17*lit})`);
 c.strokeStyle=g;c.lineWidth=(.50+.32*lit)*s;c.beginPath();const u=-.12,v=1.12,d=(v-u)/3;c.moveTo(u*w,y(u)*h);c.bezierCurveTo((u+d)*w,(y(u)+d*dy(u))*h,(v-d)*w,(y(v)-d*dy(v))*h,v*w,y(v)*h);c.stroke();
}c.restore();}
module.exports={render,id:'o-mio-babbino',duration:96};

return module.exports; })();

works["jesu-joy"] = (() => { const module = {exports:{}};
'use strict';
const TAU=Math.PI*2;
function render(c,w,h,time){const p=TAU*((((Number.isFinite(time)?time:0)%96)+96)%96)/96,s=Math.min(w,h)/277;
c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.lineCap='round';c.lineJoin='round';c.fillStyle='#171e36';c.fillRect(0,0,w,h);
for(let depth=1;depth>=0;depth--){const N=depth?112:144;
for(let i=0;i<N;i++){
 const q=-.36+1.72*i/(N-1),phase=4.9*q+(depth?p:-2*p),lit=.5+.5*Math.sin(phase+.5),center=.5+.27*Math.sin(phase),bend=.24*Math.sin(phase),answer=.18*Math.cos(3.7*q-p);
 const g=depth?c.createLinearGradient(-.12*w,0,1.12*w,h*.25):c.createLinearGradient(0,1.12*h,w*.25,-.12*h);
 const colors=depth?['122,130,190','171,160,208','231,216,231','169,179,220','110,133,185']:['153,133,174','224,184,137','255,242,206','235,202,157','152,158,202'];
 const e=depth?.76+.18*lit:.82+.16*lit;
 for(const[z,k,a]of[[0,0,.49],[center-.20,1,.79],[center,2,1],[center+.20,3,.79],[1,4,.49]])g.addColorStop(z,`rgba(${colors[k]},${e*a})`);
 c.strokeStyle=g;c.lineWidth=(depth?.47+.26*lit:.52+.32*lit)*s;c.beginPath();
 if(!depth){
  const mid=q+bend,ym=.5+.07*Math.sin(3*q+p),tangent=.13+answer;
  c.moveTo((q-.23)*w,1.12*h);
  c.bezierCurveTo((q-.23+answer)*w,.82*h,(mid-tangent)*w,(ym+.22)*h,mid*w,ym*h);
  c.bezierCurveTo((mid+tangent)*w,(ym-.22)*h,(q+.23-answer)*w,.16*h,(q+.23)*w,-.12*h);
 }else{
  const mid=q+.18*Math.cos(phase),xm=.5+.08*Math.sin(q*3-p),tangent=.10*Math.sin(q*5+p);
  c.moveTo(-.12*w,(q+.17)*h);
  c.bezierCurveTo(.15*w,(q+.17+bend)*h,(xm-.22)*w,(mid-tangent)*h,xm*w,mid*h);
  c.bezierCurveTo((xm+.22)*w,(mid+tangent)*h,.86*w,(q-.17+answer)*h,1.12*w,(q-.17)*h);
 }
 c.stroke();
}}c.restore();}
module.exports={render,id:'jesu-joy',duration:96};

return module.exports; })();

works["lascia-ch-io-pianga"] = (() => { const module = {exports:{}};
'use strict';
const TAU=Math.PI*2;
function render(c,w,h,time){const t=TAU*((((Number.isFinite(time)?time:0)%120)+120)%120)/120,p=t-.32*Math.sin(t),s=Math.min(w,h)/277;
c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.lineCap='round';c.lineJoin='round';c.fillStyle='#202436';c.fillRect(0,0,w,h);
for(let i=0;i<316;i++){
 const q=-.20+2.14*i/315,phase=4.8*q-p,cx=.44+.17*Math.sin(3.7*q-p),cy=1.25+.13*Math.sin(6.7*q+p),rx=1.02*q+.14*Math.sin(6*q-p),ry=.91*q+.17*Math.cos(7.3*q+.5*Math.sin(p)),tilt=.12*Math.sin(3*q+p),lit=.5+.5*Math.sin(phase+.4),center=.5+.27*Math.sin(phase);
 const at=a=>[cx+rx*Math.cos(a)+tilt*Math.sin(a),cy+ry*Math.sin(a)],der=a=>[-rx*Math.sin(a)+tilt*Math.cos(a),ry*Math.cos(a)];
 const g=c.createLinearGradient((cx-rx)*w,cy*h,(cx+rx)*w,cy*h);
 g.addColorStop(0,`rgba(127,140,191,${.44+.15*lit})`);g.addColorStop(center-.20,`rgba(182,168,192,${.63+.18*lit})`);g.addColorStop(center,`rgba(247,240,229,${.83+.15*lit})`);g.addColorStop(center+.20,`rgba(218,192,185,${.63+.19*lit})`);g.addColorStop(1,`rgba(139,159,194,${.44+.15*lit})`);
 c.strokeStyle=g;c.lineWidth=(.51+.32*lit)*s;c.beginPath();let a0=Math.PI,P=at(a0),D=der(a0);c.moveTo(P[0]*w,P[1]*h);
 for(let j=1;j<=4;j++){const a1=Math.PI+Math.PI*j/4,Q=at(a1),E=der(a1),k=4/3*Math.tan((a1-a0)/4);c.bezierCurveTo((P[0]+k*D[0])*w,(P[1]+k*D[1])*h,(Q[0]-k*E[0])*w,(Q[1]-k*E[1])*h,Q[0]*w,Q[1]*h);a0=a1;P=Q;D=E;}c.stroke();
}c.restore();}
module.exports={render,id:'lascia-ch-io-pianga',duration:120};

return module.exports; })();

works["liebesgruss"] = (() => { const module = {exports:{}};
'use strict';
const TAU=Math.PI*2;
function render(c,w,h,time){
 const p=TAU*((((Number.isFinite(time)?time:0)%96)+96)%96)/96,s=Math.min(w,h)/277;
 c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.shadowOffsetX=0;c.shadowOffsetY=0;c.shadowColor='rgba(0,0,0,0)';c.lineCap='butt';c.lineJoin='miter';c.miterLimit=10;c.setLineDash([]);c.lineDashOffset=0;c.fillStyle='#171d29';c.fillRect(0,0,w,h);
 for(let i=0;i<360;i++){
  const q=-.60+2.20*i/359,z=5.4*q-p,near=.5+.5*Math.sin(z),answer=Math.sin(8.1*q+p);
  const start=-.35+.17*Math.sin(3.1*q+p),end=1.22+.14*Math.cos(4.2*q-p),mid=(start+end)/2;
  const rise=.24*Math.sin(z)+.075*answer,returning=.16*Math.sin(6.5*q+p+.8);
  const y0=q+.28+rise*.25,ym=q-.08+rise,y1=q-.12+returning;
  const d0=-.26+.20*Math.cos(z),dm=-.25+.35*Math.cos(4.8*q-p),d1=.18+.24*Math.sin(6.5*q+p);
  const a=mid-start,b=end-mid;
  const g=c.createLinearGradient(start*w,y0*h,end*w,y1*h),peak=.39+.14*Math.sin(z+.4);
  const alpha=.34+.40*near;
  g.addColorStop(0,'rgba(110,139,168,0)');g.addColorStop(.18,`rgba(120,150,180,${alpha*.60})`);g.addColorStop(peak,`rgba(255,222,205,${alpha})`);g.addColorStop(.79,`rgba(220,140,132,${alpha*.80})`);g.addColorStop(1,'rgba(152,119,150,0)');
  c.strokeStyle=g;c.lineWidth=(.52+.34*near)*s;c.beginPath();c.moveTo(start*w,y0*h);
  c.bezierCurveTo((start+a/3)*w,(y0+d0*a/3)*h,(mid-a/3)*w,(ym-dm*a/3)*h,mid*w,ym*h);
  c.bezierCurveTo((mid+b/3)*w,(ym+dm*b/3)*h,(end-b/3)*w,(y1-d1*b/3)*h,end*w,y1*h);c.stroke();
 }
 c.restore();
}
module.exports={render,id:'liebesgruss',duration:96};

return module.exports; })();

works["nessun-dorma"] = (() => { const module = {exports:{}};
'use strict';const TAU=Math.PI*2;
function render(c,w,h,time){const t=TAU*((((Number.isFinite(time)?time:0)%120)+120)%120)/120,p=t-.35*Math.sin(t),s=Math.min(w,h)/277;
c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.shadowOffsetX=0;c.shadowOffsetY=0;c.shadowColor='rgba(0,0,0,0)';c.lineCap='butt';c.lineJoin='miter';c.miterLimit=10;c.setLineDash([]);c.lineDashOffset=0;c.fillStyle='#101e2a';c.fillRect(0,0,w,h);
for(let i=0;i<280;i++){const q=-.7+2.4*i/279,z=5.1*q-p,near=.5+.5*Math.sin(z+.6),open=.5+.5*Math.cos(p-.5);
const x=[q+.08*Math.sin(3*q+p),q+.24*Math.sin(z)+.08*Math.sin(8*q+p),q+.29*Math.sin(4.4*q-p-1.1),q+.13*Math.sin(3.6*q+p+.7)];
const y=[1.26,.72+.13*Math.sin(3.2*q+p),.28+.11*Math.cos(4.3*q-p),-.26];
const dx=[.15*Math.cos(z),.22*Math.cos(4.2*q-p),-.21*Math.sin(5.2*q+p),-.13*Math.cos(z)];
const dy=[-.43,-.43,-.43,-.43];
const g=c.createLinearGradient(x[0]*w,y[0]*h,x[3]*w,y[3]*h),peak=.42+.17*Math.sin(z-.5),a=.38+.43*near;
g.addColorStop(0,`rgba(50,112,137,${a*.36})`);g.addColorStop(.15,`rgba(72,145,161,${a*.73})`);g.addColorStop(peak,`rgba(255,233,187,${a})`);g.addColorStop(.85,`rgba(106,155,192,${a*.75})`);g.addColorStop(1,`rgba(69,103,147,${a*.34})`);
c.strokeStyle=g;c.lineWidth=(.54+.35*near+.04*open)*s;c.beginPath();c.moveTo(x[0]*w,y[0]*h);for(let j=0;j<3;j++)c.bezierCurveTo((x[j]+dx[j]/3)*w,(y[j]+dy[j]/3)*h,(x[j+1]-dx[j+1]/3)*w,(y[j+1]-dy[j+1]/3)*h,x[j+1]*w,y[j+1]*h);c.stroke();}
c.restore();}
module.exports={render,id:'nessun-dorma',duration:120};

return module.exports; })();

works["pomp-circumstance-1"] = (() => { const module = {exports:{}};
'use strict';
// A single contiguous refracting field. Editorial phrase, not audio synchronization.
const TAU=2*Math.PI;
function render(c,w,h,time){
 const p=TAU*((((Number.isFinite(time)?time:0)%120)+120)%120)/120,s=Math.min(w,h)/277,opening=.5-.5*Math.cos(p),angle=.50*Math.cos(p)-.16*Math.cos(2*p),co=Math.cos(angle),si=Math.sin(angle);
 c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.shadowOffsetX=0;c.shadowOffsetY=0;c.shadowColor='rgba(0,0,0,0)';c.lineCap='butt';c.lineJoin='miter';c.miterLimit=10;c.setLineDash([]);c.lineDashOffset=0;
 c.fillStyle='#000000';c.fillRect(0,0,w,h);
 // Coverage assembly of disjoint neighboring facets; not layered glow.
 c.globalCompositeOperation='lighter';
 const N=420,lo=-.7,span=2.4,nodes=[],v=[-.7,.1,.9,1.7];
 function control(u){return[u+.135*Math.sin(3*u+p),u+.225*Math.sin(3.6*u-p+.6),u+.20*Math.sin(2.8*u+p+1.8),u+.17*Math.sin(3.2*u-p-1.1)];}
 function derivative(u){return[1+.405*Math.cos(3*u+p),1+.81*Math.cos(3.6*u-p+.6),1+.56*Math.cos(2.8*u+p+1.8),1+.544*Math.cos(3.2*u-p-1.1)];}
 function project(x,y){return[(.5+co*(x-.5)-si*(y-.5))*w,(.5+si*(x-.5)+co*(y-.5))*h];}
 for(let i=0;i<=N;i++){const xs=control(lo+span*i/N);nodes.push(xs.map((x,k)=>project(x,v[k])));}
 // Dual coordinate: gradient fraction exactly equals the underlying cubic's v parameter.
 const lx=-si/w,ly=co/h,norm=lx*lx+ly*ly,gx0=w*.5-1.2*lx/norm,gy0=h*.5-1.2*ly/norm,gx1=w*.5+1.2*lx/norm,gy1=h*.5+1.2*ly/norm;
 for(let i=0;i<N;i++){
  const a=nodes[i],b=nodes[i+1];if(Math.max(...a.map(x=>x[0]),...b.map(x=>x[0])) < -3*s||Math.min(...a.map(x=>x[0]),...b.map(x=>x[0]))>w+3*s||Math.max(...a.map(x=>x[1]),...b.map(x=>x[1])) < -3*s||Math.min(...a.map(x=>x[1]),...b.map(x=>x[1]))>h+3*s)continue;
  const u=lo+span*(i+.5)/N,xx=control(u),du=derivative(u),g=c.createLinearGradient(gx0,gy0,gx1,gy1),grain=.94+.06*Math.cos(i*2.399963),micro=.04*Math.cos(i*1.618034);
  for(let k=0;k<=12;k++){
   const z=k/12,z0=1-z,b0=z0*z0*z0,b1=3*z0*z0*z,b2=3*z0*z*z,b3=z*z*z;
   const density=b0*du[0]+b1*du[1]+b2*du[2]+b3*du[3];
   const slope=3*(z0*z0*(xx[1]-xx[0])+2*z0*z*(xx[2]-xx[1])+z*z*(xx[3]-xx[2]))/span;
   const tilt=-1.45*(density-1)+1.15*slope+micro,lightAxis=.20*Math.sin(p)+.08*Math.cos(2*p),spread=.22+.42*opening;
   const shine=Math.exp(-Math.pow((tilt-lightAxis)/spread,2)),warm=.5+.5*Math.tanh((tilt-lightAxis)*2.3),t=.06+.91*shine*grain;
   const base=[9+15*warm,25+13*warm,64+8*warm],ivory=[255-9*warm,246-20*warm,225-55*warm];
   const rgb=base.map((v,j)=>v+t*(ivory[j]-v));g.addColorStop(z,`rgb(${rgb[0]},${rgb[1]},${rgb[2]})`);
  }
  c.fillStyle=g;c.beginPath();c.moveTo(a[0][0],a[0][1]);c.bezierCurveTo(a[1][0],a[1][1],a[2][0],a[2][1],a[3][0],a[3][1]);c.lineTo(b[3][0],b[3][1]);c.bezierCurveTo(b[2][0],b[2][1],b[1][0],b[1][1],b[0][0],b[0][1]);c.closePath();c.fill();
 }
 c.restore();
}
module.exports={id:'pomp-circumstance-1',duration:120,render};

return module.exports; })();

works["jupiter"] = (() => { const module = {exports:{}};
'use strict';
// Jupiter — analytic-derivative trial. Same218 contours, material and120s phrase.
// Fixed per-contour angle count comes from a full-phase Hermite shape-error bound.
const TAU=Math.PI*2;
function render(c,w,h,time){
 const p=TAU*((((Number.isFinite(time)?time:0)%120)+120)%120)/120;
 const s=Math.min(w,h)/277,open=.5-.5*Math.cos(p),ang=.42*Math.sin(p)+.14*Math.sin(2*p),ca=Math.cos(ang),sa=Math.sin(ang);
 const cx=.42+.30*Math.cos(p),cy=.49+.17*Math.sin(p);
 c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.shadowOffsetX=0;c.shadowOffsetY=0;c.shadowColor='rgba(0,0,0,0)';c.lineCap='butt';c.lineJoin='round';c.miterLimit=10;c.setLineDash([]);c.lineDashOffset=0;
 const bg=c.createLinearGradient(0,0,w,h);bg.addColorStop(0,'#1b1729');bg.addColorStop(.53,'#142e39');bg.addColorStop(1,'#172332');c.fillStyle=bg;c.fillRect(0,0,w,h);
 const N=218,basis=new Map(),sp=Math.sin(p),cp=Math.cos(p),s2p=Math.sin(2*p),c2p=Math.cos(2*p);
 const tolerance=.08*s;
 function angles(n){
  if(basis.has(n))return basis.get(n);const a=[];
  for(let j=0;j<n;j++){
   const th=TAU*j/n,ct=Math.cos(th),st=Math.sin(th),c2=ct*ct-st*st,s2=2*st*ct,c3=c2*ct-s2*st,s3=s2*ct+c2*st;
   const sin2p=s2*cp+c2*sp,cos2p=c2*cp-s2*sp,sin3m2p=s3*c2p-c3*s2p,cos3m2p=c3*c2p+s3*s2p,sin3mp=s3*cp-c3*sp,cos3mp=c3*cp+s3*sp;
   a.push([s2,c2,.155*sin2p+.072*cos3m2p,.31*cos2p-.216*sin3m2p,ct+.09*cos2p,-st-.18*sin2p,st+.065*sin3mp,ct+.195*cos3mp]);
  }
  basis.set(n,a);return a;
 }
 for(let i=0;i<N;i++){
  const u=(i+.5)/N,raw=.014+1.62*u;
  const r=raw+.098*Math.sin(6.4*raw-p)-.098*Math.sin(-p);
  const density=1/(1+.6272*Math.cos(6.4*raw-p));
  const near=.5+.5*Math.sin(3.4*raw-p+.6);
  const rotation=.26*Math.sin(3*raw-p),cr=Math.cos(rotation),sr=Math.sin(rotation);
  const ax=(.85+.34*open),ay=(1.16-.25*open);
  // All-phase fourth-derivative bounds of the unprojected analytic curve.
  const rmax=raw+.196*Math.abs(Math.sin(3.2*raw)),bmax=.034*Math.min(1,5*rmax),a2=.155*rmax+bmax,a3=.072*rmax;
  const mx=2.44*rmax+52.52*a2+164.17*a3,my=6.265*rmax+61.345*a2+178.12*a3;
  // Each projected coordinate has bound1.19*dimension*hypot(mx,my).
  const M4=1.19*Math.hypot(w,h)*Math.hypot(mx,my);
  const S=Math.max(16,4*Math.ceil(TAU*Math.pow(M4/(384*tolerance),.25)/4)),step=TAU/S,table=angles(S);
  const points=new Float64Array(S*4),amp=.034*Math.min(1,r*5),bs=Math.sin(4*raw-p),bc=Math.cos(4*raw-p);
  const m00=w*(ca*ax*cr-sa*ay*sr),m01=w*(-ca*ax*sr-sa*ay*cr),m10=h*(sa*ax*cr+ca*ay*sr),m11=h*(-sa*ax*sr+ca*ay*cr);
  const ox=(cx+.08*raw*Math.sin(3*raw+p))*w,oy=(cy-.08*raw*Math.cos(2*raw-p))*h;
  for(let j=0;j<S;j++){
   const a=table[j],rr=r*(1+a[2])+amp*(a[0]*bc+a[1]*bs),dr=r*a[3]+2*amp*(a[1]*bc-a[0]*bs);
   const X=rr*a[4],Y=rr*a[6],dX=dr*a[4]+rr*a[5],dY=dr*a[6]+rr*a[7],k=j*4;
   points[k]=ox+m00*X+m01*Y;points[k+1]=oy+m10*X+m11*Y;
   points[k+2]=(m00*dX+m01*dY)*step/3;points[k+3]=(m10*dX+m11*dY)*step/3;
  }
  // The reflection axis follows the material's eccentric frame, not a fixed screen hotspot.
  const lx=Math.cos(ang+rotation-.55),ly=Math.sin(ang+rotation-.55);
  const span=Math.max(.08,r),g=c.createLinearGradient((cx-span*lx)*w,(cy-span*ly)*h,(cx+span*lx)*w,(cy+span*ly)*h);
  const shoulder=Math.sqrt(Math.min(2,density)/2);
  const a=.61+.24*near+.12*shoulder;
  g.addColorStop(0,`rgba(80,164,187,${a*.74})`);
  g.addColorStop(.28,`rgba(126,212,213,${a*.91})`);
  g.addColorStop(.42,`rgba(255,244,209,${a})`);
  g.addColorStop(.69,`rgba(255,224,170,${a})`);
  g.addColorStop(.86,`rgba(245,157,128,${a*.93})`);
  g.addColorStop(1,`rgba(173,112,144,${a*.76})`);
  c.strokeStyle=g;c.lineWidth=(.53+.36*near+.23*shoulder)*s;c.beginPath();
  const visible=new Uint8Array(S);let start=0,skipped=0;
  for(let j=0;j<S;j++){
   const a=j*4,b=((j+1)%S)*4,x0=points[a],y0=points[a+1],xe=points[b],ye=points[b+1];
   const x1=x0+points[a+2],y1=y0+points[a+3],x2=xe-points[b+2],y2=ye-points[b+3];
   const outside=Math.max(x0,xe,x1,x2)<-8*s||Math.min(x0,xe,x1,x2)>w+8*s||Math.max(y0,ye,y1,y2)<-8*s||Math.min(y0,ye,y1,y2)>h+8*s;
   if(outside){start=(j+1)%S;skipped++;}else visible[j]=1;
  }
  let pen=false;
  for(let k=0;k<S;k++){
   const j=(start+k)%S;if(!visible[j]){pen=false;continue;}
   const a=j*4,b=((j+1)%S)*4,x0=points[a],y0=points[a+1],xe=points[b],ye=points[b+1];
   if(!pen)c.moveTo(x0,y0);c.bezierCurveTo(x0+points[a+2],y0+points[a+3],xe-points[b+2],ye-points[b+3],xe,ye);pen=true;
  }
  if(!skipped)c.closePath();
  c.stroke();
 }
 c.restore();
}
module.exports={id:'jupiter',duration:120,render};

return module.exports; })();

works["vivaldi-spring"] = (() => { const module = {exports:{}};
'use strict';
// Returning breadth and contrasting open currents: editorial ritornello, not audio sync.
const T=2*Math.PI;
function render(c,w,h,time){const p=T*((((Number.isFinite(time)?time:0)%72)+72)%72)/72,s=Math.min(w,h)/277;c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.shadowColor='rgba(0,0,0,0)';c.shadowOffsetX=0;c.shadowOffsetY=0;c.lineCap='butt';c.lineJoin='miter';c.miterLimit=10;c.setLineDash([]);c.lineDashOffset=0;c.fillStyle='#123d3d';c.fillRect(0,0,w,h);const bins=Array.from({length:24},()=>[]),states=Array.from({length:3},(_,k)=>{const phase=p+k*T/3,width=.14+.025*Math.cos(phase);return{phase,base:.15+k*.34,width2:width*width,weight:k===1?.8:.65};});
for(let j=0;j<168;j++)for(let i=0;i<192;i++){let u=-.2+1.4*(i+((i*73+j*151)%211)/300)/191,v=-.2+1.4*(j+((i*37+j*19)%131)/190)/167,x=u,y=v,light=0;
for(let k=0;k<3;k++){const state=states[k],phase=state.phase,centre=state.base+.115*Math.sin(T*.65*u+phase),d=v-centre,g=Math.exp(-.5*d*d/state.width2),slope=.115*T*.65*Math.cos(T*.65*u+phase);y-=.34*d*g;x+=.04*Math.sin(phase+u*2)*g-.055*slope*d*g;light+=g*state.weight;}
light=Math.min(.999,.08+.78*light);let depth=(i+2*j)%3,tone=Math.floor(Math.min(.999,light*(.88+.12*Math.sin(u*9-v*8+p+depth)))*8),z=s*(.50+1.40*light)*(depth===0?1.08:depth===1?.95:.82);bins[depth*8+tone].push(x*w,y*h,z);}
for(let d=0;d<3;d++)for(let k=0;k<8;k++){c.fillStyle=`rgba(${d===0?'247,231,157':d===1?'121,220,189':'148,194,231'},${.18+k*.105})`;c.beginPath();const b=bins[d*8+k];for(let i=0;i<b.length;i+=3)c.rect(b[i]-.5*b[i+2],b[i+1]-.36*b[i+2],b[i+2],b[i+2]*.72);c.fill();}c.restore();}
module.exports={render,id:'vivaldi-spring',duration:72};

return module.exports; })();

works["heidenroslein"] = (() => { const module = {exports:{}};
'use strict';const TAU=Math.PI*2;
function render(c,w,h,time){const p=TAU*((((Number.isFinite(time)?time:0)%96)+96)%96)/96,s=Math.min(w,h)/277;
c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.shadowOffsetX=0;c.shadowOffsetY=0;c.shadowColor='rgba(0,0,0,0)';c.lineCap='butt';c.lineJoin='miter';c.miterLimit=10;c.setLineDash([]);c.lineDashOffset=0;c.fillStyle='#211d2b';c.fillRect(0,0,w,h);
for(let i=0;i<250;i++){const q=.025+1.56*i/249,z=5.6*q-p,breath=Math.sin(3*p+.6*q),near=.5+.5*Math.cos(z);
const cx=.48+.21*Math.sin(4.3*q-p),cy=.51+.16*Math.sin(5.2*q+p),rx=q*(.82+.06*breath)+.055*Math.sin(6*q-p),ry=q*(.48+.035*Math.cos(3*p))+.055*Math.sin(7.2*q+p),shear=.14*Math.sin(z);
const ax=.10*q*Math.sin(3.7*q+p),ay=.10*q*Math.cos(4.1*q-p);
const at=a=>[cx+rx*Math.cos(a)+shear*Math.sin(a)+ax*Math.cos(2*a),cy+ry*Math.sin(a)+ay*Math.sin(2*a)];
const der=a=>[-rx*Math.sin(a)+shear*Math.cos(a)-2*ax*Math.sin(2*a),ry*Math.cos(a)+2*ay*Math.cos(2*a)];
const angle=-.8+.35*Math.sin(z),start=at(angle+Math.PI),end=at(angle),g=c.createLinearGradient(start[0]*w,start[1]*h,end[0]*w,end[1]*h),a=.33+.45*near;
g.addColorStop(0,`rgba(99,111,163,${a*.45})`);g.addColorStop(.24,`rgba(158,126,170,${a*.78})`);g.addColorStop(.58,`rgba(239,182,183,${a*.88})`);g.addColorStop(.82,`rgba(255,229,215,${a})`);g.addColorStop(1,`rgba(184,122,149,${a*.64})`);
c.strokeStyle=g;c.lineWidth=(.50+.36*near)*s;c.beginPath();let v=at(0);c.moveTo(v[0]*w,v[1]*h);for(let j=0;j<4;j++){const t0=j*Math.PI/2,t1=(j+1)*Math.PI/2,k=(t1-t0)/3,u=at(t0),v=at(t1),du=der(t0),dv=der(t1);c.bezierCurveTo((u[0]+k*du[0])*w,(u[1]+k*du[1])*h,(v[0]-k*dv[0])*w,(v[1]-k*dv[1])*h,v[0]*w,v[1]*h)}c.closePath();c.stroke();}
c.restore();}module.exports={render,id:'heidenroslein',duration:96};

return module.exports; })();

works["le-cygne"] = (() => { const module = {exports:{}};
'use strict';
// An uninterrupted cantabile field over a quieter internal current; editorial, not audio-derived.
const TAU=Math.PI*2;
function render(c,w,h,time){
 const p=TAU*((((Number.isFinite(time)?time:0)%96)+96)%96)/96,unit=Math.min(w,h)/277;
 c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.shadowColor='rgba(0,0,0,0)';c.shadowOffsetX=0;c.shadowOffsetY=0;c.lineCap='butt';c.lineJoin='miter';c.miterLimit=10;c.setLineDash([]);c.lineDashOffset=0;
 const bg=c.createLinearGradient(0,0,w,h);bg.addColorStop(0,'#172a40');bg.addColorStop(.5,'#27334b');bg.addColorStop(1,'#292538');c.fillStyle=bg;c.fillRect(0,0,w,h);
 const basis=Array.from({length:3},(_,depth)=>{
  const phase=p+depth*.34,off=.7*Math.sin(phase),at=x=>[Math.cos(Math.PI*.9*x+off),Math.sin(x*4.9-phase),-Math.PI*.9*Math.sin(Math.PI*.9*x+off),4.9*Math.cos(x*4.9-phase)];
  return {ends:Array.from({length:19},(_,k)=>at(-.06+1.12*k/18)),stops:Array.from({length:9},(_,k)=>at(k/8))};
 });
 for(let j=0;j<480;j++){
  const depth=j%3,q=-.22+1.44*j/479,phase=p+depth*.34,v=q+.075*Math.sin(TAU*q-phase),spacing=1+.075*TAU*Math.cos(TAU*q-phase);
  const A=.13*Math.sin(v*4.8+phase),B=.08*Math.sin(Math.PI*v),C=.13*4.8*Math.cos(v*4.8+phase),D=.08*Math.PI*Math.cos(Math.PI*v),base=basis[depth];
  const yy=k=>v+A*base.ends[k][0]+B*base.ends[k][1],dy=k=>A*base.ends[k][2]+B*base.ends[k][3];
  const g=c.createLinearGradient(0,0,w,0),rgb=depth===0?[235,240,239]:depth===1?[169,193,223]:[198,170,216];
  for(let k=0;k<=8;k++){
   const x=k/8,J=(1+C*base.stops[k][0]+D*base.stops[k][1])*spacing;
   const light=Math.min(1,Math.max(.08,(1/Math.max(.2,J)-.5)*.45));g.addColorStop(x,`rgba(${rgb.join(',')},${.12+.72*light})`);
  }
  c.strokeStyle=g;c.lineWidth=unit*.54;c.beginPath();c.moveTo(-.06*w,yy(0)*h);
  for(let k=0;k<18;k++){const x=-.06+1.12*k/18,z=-.06+1.12*(k+1)/18,d=(z-x)/3;c.bezierCurveTo((x+d)*w,(yy(k)+d*dy(k))*h,(z-d)*w,(yy(k+1)-d*dy(k+1))*h,z*w,yy(k+1)*h);}c.stroke();
 }
 c.restore();
}
module.exports={render,id:'le-cygne',duration:96};

return module.exports; })();

works["barber-adagio"] = (() => { const module = {exports:{}};
'use strict';const TAU=Math.PI*2;
// Open, broad paired density shoulders with delayed response; no recording synchronization.
function render(c,w,h,time){const p=TAU*((((Number.isFinite(time)?time:0)%120)+120)%120)/120,s=Math.min(w,h)/277;c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.shadowColor='rgba(0,0,0,0)';c.shadowOffsetX=0;c.shadowOffsetY=0;c.lineCap='butt';c.lineJoin='miter';c.miterLimit=10;c.setLineDash([]);c.lineDashOffset=0;c.fillStyle='#15232e';c.fillRect(0,0,w,h);
for(let depth=2;depth>=0;depth--){const phase=p-depth*.85,center=.56-.27*Math.sin(phase),N=[300,240,140][depth],width=[.48,.45,.39][depth];const base=Array.from({length:17},(_,j)=>{const v=-.15+1.3*j/16,dv=v-center,g=Math.exp(-dv*dv/.19),amp=.018+.025*g,ap=-.05*dv/.19*g,phi=.65*Math.sin(3*v+phase)+depth*.42,phip=1.95*Math.cos(3*v+phase),bend=.075*Math.sin(3.8*v-phase)+.035*Math.sin(6*v+phase+depth),bendp=.285*Math.cos(3.8*v-phase)+.21*Math.cos(6*v+phase+depth);return{v,amp,ap,sp:Math.sin(phi),cp:Math.cos(phi),phip,bend,bendp}});const g=c.createLinearGradient(0,h,w*.2,0);if(depth===0){g.addColorStop(0,'rgba(179,169,153,.38)');g.addColorStop(.55,'rgba(231,222,198,.64)');g.addColorStop(1,'rgba(203,215,216,.43)')}else if(depth===1){g.addColorStop(0,'rgba(111,149,168,.32)');g.addColorStop(.45,'rgba(172,201,205,.48)');g.addColorStop(1,'rgba(156,173,190,.36)')}else{g.addColorStop(0,'rgba(98,129,151,.24)');g.addColorStop(.6,'rgba(140,162,179,.32)');g.addColorStop(1,'rgba(122,143,166,.22)')}c.strokeStyle=g;c.lineWidth=width*s;c.beginPath();
for(let i=0;i<N;i++){const q=-.2+1.4*i/(N-1),sq=Math.sin(2*TAU*q),cq=Math.cos(2*TAU*q);const at=k=>{const b=base[k],sn=sq*b.cp+cq*b.sp,cs=cq*b.cp-sq*b.sp;return[q+b.amp*sn+b.bend,b.ap*sn+b.amp*cs*b.phip+b.bendp]};let a=at(0),v0=base[0].v;c.moveTo(a[0]*w,v0*h);for(let j=1;j<17;j++){const b=at(j),v1=base[j].v,dv=(v1-v0)/3;c.bezierCurveTo((a[0]+dv*a[1])*w,(v0+dv)*h,(b[0]-dv*b[1])*w,(v1-dv)*h,b[0]*w,v1*h);a=b;v0=v1}}c.stroke()}c.restore()}
module.exports={id:'barber-adagio',duration:120,render};

return module.exports; })();

works["eine-kleine"] = (() => { const module = {exports:{}};
'use strict';
// Balanced opening and answering bowed fields, an editorial sonata dialogue.
const T=2*Math.PI;
function render(c,w,h,time){const p=T*((((Number.isFinite(time)?time:0)%96)+96)%96)/96,s=Math.min(w,h)/277;c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.shadowColor='rgba(0,0,0,0)';c.shadowOffsetX=0;c.shadowOffsetY=0;c.lineCap='butt';c.lineJoin='miter';c.miterLimit=10;c.setLineDash([]);c.lineDashOffset=0;c.fillStyle='#263246';c.fillRect(0,0,w,h);c.globalCompositeOperation='screen';c.lineWidth=.60*s;
for(let layer=0;layer<2;layer++){const sense=layer?-1:1,phase=p+layer*Math.PI,amp=.12+.025*Math.cos(phase),rgb=layer?[244,165,135]:[153,211,232];
function f(u,v){const freq=layer?1.3:.85,a=T*freq*v+phase+.25*Math.sin(Math.PI*u+phase),ux=layer?1.28:.82,b=Math.PI*ux*u+(layer?.9:0)+.35*Math.sin(p),height=layer?.20:.30,local=(.62+.38*Math.sin(Math.PI*u+(layer?.4:0))),warp=amp/freq,y=v+sense*height*Math.sin(b)+warp*Math.sin(a)*local,dy=sense*height*Math.PI*ux*Math.cos(b)+warp*(Math.cos(a)*.25*Math.PI*Math.cos(Math.PI*u+phase)*local+Math.sin(a)*.38*Math.PI*Math.cos(Math.PI*u+(layer?.4:0)));const spacing=1+warp*Math.cos(a)*T*freq*local;return[u,y,spacing,dy];}
for(let i=0;i<210;i++){const v=-.55+2.1*(i+.18*Math.sin(i*2.399))/209;const g=c.createLinearGradient(0,0,w,0);let mean=0;for(let k=0;k<5;k++){const u=k/4,J=f(u,v)[2],near=Math.exp(-Math.pow((J-.24)/.70,2));mean+=near/5;const color=rgb.map((a,j)=>a+( [255,241,207][j]-a)*near*.72);g.addColorStop(u,`rgba(${color.join(',')},${.20+.70*near})`);}c.strokeStyle=g;c.lineWidth=(.52+.34*mean)*s;c.beginPath();let old=f(-.1,v);c.moveTo(old[0]*w,old[1]*h);for(let j=1;j<=8;j++){let next=f(-.1+j*.15,v);c.bezierCurveTo((old[0]+.05)*w,(old[1]+old[3]*.05)*h,(next[0]-.05)*w,(next[1]-next[3]*.05)*h,next[0]*w,next[1]*h);old=next;}c.stroke();}}c.restore();}
module.exports={render,id:'eine-kleine',duration:96};

return module.exports; })();

works["habanera"] = (() => { const module = {exports:{}};
'use strict';const T=2*Math.PI;
function render(c,w,h,time){const p=T*((((Number.isFinite(time)?time:0)%96)+96)%96)/96,s=Math.min(w,h)/277,amp=(.13+.015*Math.sin(p))/1.7;c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.shadowColor='rgba(0,0,0,0)';c.shadowOffsetX=0;c.shadowOffsetY=0;c.lineCap='butt';c.lineJoin='miter';c.miterLimit=10;c.setLineDash([]);c.lineDashOffset=0;c.fillStyle='#352b43';c.fillRect(0,0,w,h);
for(let i=0;i<320;i++){const u=-.22+1.44*i/319,b=1.2*Math.PI*u-p,yoff=.10*Math.sin(b),yu=.12*Math.PI*Math.cos(b);
function at(v){const a=2.805*Math.PI*u+p+.8*Math.sin(Math.PI*v),ca=Math.cos(a),x=u+amp*Math.sin(a),dx=amp*.8*Math.PI*Math.cos(Math.PI*v)*ca,xu=1+amp*2.805*Math.PI*ca,J=Math.abs(xu-dx*yu),light=Math.min(.999,.1+.76/(.52+J));return[x,v+yoff,dx,light];}
const g=c.createLinearGradient(0,(-.2+yoff)*h,0,(1.2+yoff)*h);let mean=0;for(let k=0;k<7;k++){const z=k/6,light=at(-.2+1.4*z)[3],near=Math.max(0,(light-.45)/.55),rgb=[153+102*near,161+69*near,204-33*near];mean+=light/7;g.addColorStop(z,`rgba(${rgb.join(',')},${.22+.72*light})`);}c.strokeStyle=g;c.lineWidth=(.46+.45*mean)*s;c.beginPath();let v=-.2,a=at(v);c.moveTo(a[0]*w,a[1]*h);for(let k=1;k<=6;k++){const v1=-.2+1.4*k/6,b=at(v1),d=(v1-v)/3;c.bezierCurveTo((a[0]+a[2]*d)*w,(a[1]+d)*h,(b[0]-b[2]*d)*w,(b[1]-d)*h,b[0]*w,b[1]*h);v=v1;a=b;}c.stroke();}c.restore();}
module.exports={render,id:'habanera',duration:96};

return module.exports; })();

works["toreador"] = (() => { const module = {exports:{}};
'use strict';const T=2*Math.PI;
function render(c,w,h,time){const p=T*((((Number.isFinite(time)?time:0)%96)+96)%96)/96,s=Math.min(w,h)/277,opening=.86+.11*Math.sin(p);c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.shadowColor='rgba(0,0,0,0)';c.shadowOffsetX=0;c.shadowOffsetY=0;c.lineCap='butt';c.lineJoin='miter';c.miterLimit=10;c.setLineDash([]);c.lineDashOffset=0;c.fillStyle='#233b4c';c.fillRect(0,0,w,h);
for(let i=0;i<300;i++){const r=.12+1.98*i/299,b=5.25*r-p,rad=r+.16*Math.sin(b),rd=1+.84*Math.cos(b);
function at(t){const a=2*t+p,theta=opening*(t+.25*Math.sin(a)),dt=opening*(1+.5*Math.cos(a));return[(.5+.87*rad*Math.sin(theta)),(1.32-rad*Math.cos(theta)),.87*rad*Math.cos(theta)*dt,rad*Math.sin(theta)*dt];}
const g=c.createLinearGradient(0,0,w,0);let mean=0;for(let k=0;k<7;k++){const x=k/6,theta=Math.asin(Math.max(-1,Math.min(1,(x-.5)/(.87*rad))));let t=theta/opening;for(let n=0;n<4;n++)t-=(opening*(t+.25*Math.sin(2*t+p))-theta)/(opening*(1+.5*Math.cos(2*t+p)));const J=opening*(1+.5*Math.cos(2*t+p))*rd,light=Math.min(.999,.13+.73/(.48+Math.abs(J))),near=Math.max(0,(light-.45)/.55);mean+=light/7;g.addColorStop(x,`rgba(${143+112*near},${177+52*near},${201-49*near},${.22+.72*light})`);}c.strokeStyle=g;c.lineWidth=(.48+.42*mean)*s;c.beginPath();let t=-2.2,a=at(t);c.moveTo(a[0]*w,a[1]*h);for(let k=1;k<=12;k++){const t1=-2.2+4.4*k/12,b=at(t1),d=(t1-t)/3;c.bezierCurveTo((a[0]+a[2]*d)*w,(a[1]+a[3]*d)*h,(b[0]-b[2]*d)*w,(b[1]-b[3]*d)*h,b[0]*w,b[1]*h);a=b;t=t1;}c.stroke();}c.restore();}
module.exports={render,id:'toreador',duration:96};

return module.exports; })();

works["caccini-ave-maria"] = (() => { const module = {exports:{}};
'use strict';
// Editorial long-breath field; not audio or score synchronized.
const TAU=2*Math.PI,KX=6.8,KY=5.8,AX=.82/KX,AY=.4255/KY;
function render(c,w,h,time){
 const p=TAU*((((Number.isFinite(time)?time:0)%96)+96)%96)/96,unit=Math.min(w,h)/277;
 c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.shadowColor='rgba(0,0,0,0)';c.shadowOffsetX=0;c.shadowOffsetY=0;c.lineCap='butt';c.lineJoin='miter';c.miterLimit=10;c.setLineDash([]);c.lineDashOffset=0;
 c.fillStyle='#282a3d';c.fillRect(0,0,w,h);
 for(let d=2;d>=0;d--){
  const phase=p+d*2.13,ang=[-.38,.28,.81][d]+.045*Math.sin(phase),ca=Math.cos(ang),sa=Math.sin(ang),ux=[-.23,.13,.28][d],vy=[.14,-.22,.07][d];
  function at(u,v){
   const U=u-.5,V=v-.5,a=KX*(U+ux)+phase,b=KY*(V+vy)-phase,e=KX*(U+ux)-phase,f=KY*(V+vy)+phase;
   const x0=U+AX*Math.sin(a)*Math.cos(b),y0=V+AY*Math.cos(e)*Math.sin(f);
   const xu=1+AX*KX*Math.cos(a)*Math.cos(b),xv=-AX*KY*Math.sin(a)*Math.sin(b),yu=-AY*KX*Math.sin(e)*Math.sin(f),yv=1+AY*KY*Math.cos(e)*Math.cos(f);
   const J=xu*yv-xv*yu,spacing=J/Math.hypot(xv,yv),light=Math.min(1,Math.max(.08,(1/Math.sqrt(Math.max(.08,spacing))-.48)*.82));
   return{x:(.5+ca*x0-sa*y0)*w,y:(.5+sa*x0+ca*y0)*h,dx:(ca*xv-sa*yv)*w,dy:(sa*xv+ca*yv)*h,light};
  }
  for(let i=0;i<224;i++){
   const u=-.66+2.32*i/223,nodes=[];
   for(let j=0;j<=8;j++)nodes.push(at(u,-.9+2.8*j/8));
   const A=nodes[0],B=nodes[8],gx=B.x-A.x,gy=B.y-A.y,den=gx*gx+gy*gy,g=c.createLinearGradient(A.x,A.y,B.x,B.y);
   let mean=0;
   const stops=nodes.map((n,j)=>({s:j===0?0:j===8?1:Math.max(.001,Math.min(.999,((n.x-A.x)*gx+(n.y-A.y)*gy)/den)),l:n.light})).sort((a,b)=>a.s-b.s);
   for(const z of stops){const l=z.l;mean+=l;const base=[[151,137,179],[135,155,183],[116,151,181]][d],near=[[255,244,231],[232,226,249],[209,237,247]][d];const rgb=base.map((b,k)=>Math.round(b+(near[k]-b)*l));g.addColorStop(z.s,`rgba(${rgb.join(',')},${.14+.72*l})`);}
   c.strokeStyle=g;c.lineWidth=unit*(.48+1.28*mean/9)*(1-.07*d);c.beginPath();c.moveTo(A.x,A.y);
   const dv=2.8/8;
   for(let j=0;j<8;j++){const a=nodes[j],b=nodes[j+1];c.bezierCurveTo(a.x+a.dx*dv/3,a.y+a.dy*dv/3,b.x-b.dx*dv/3,b.y-b.dy*dv/3,b.x,b.y);}c.stroke();
  }
 }
 c.restore();
}
module.exports={render,id:'caccini-ave-maria',duration:96};

return module.exports; })();

works["ave-verum-corpus"] = (() => { const module = {exports:{}};
'use strict';
const TAU=2*Math.PI;
// Single connected field, editorial120s breath; not recorded-note synchronization.
function render(c,w,h,time){
 const p=TAU*((((Number.isFinite(time)?time:0)%120)+120)%120)/120,s=Math.min(w,h)/277;
 c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.shadowColor='rgba(0,0,0,0)';c.shadowOffsetX=0;c.shadowOffsetY=0;c.lineCap='butt';c.lineJoin='miter';c.miterLimit=10;c.setLineDash([]);c.lineDashOffset=0;c.fillStyle='#1c2d3c';c.fillRect(0,0,w,h);
 const cx=.35+.11*Math.sin(p),cy=.38+.08*Math.cos(p),ex=.69+.08*Math.cos(p+.7),ey=.67+.09*Math.sin(p-.5);
 function field(x,y){const a=x-cx,b=y-cy,aa=x-ex,bb=y-ey,n=Math.exp(-((a+.42*b)**2/.105+b*b/.075)),m=Math.exp(-((aa-.5*bb)**2/.085+bb*bb/.12)),light=Math.min(1,.09+.84*n+.60*m),slope=.38+.42*Math.sin(3.3*y)+.22*Math.cos(3.6*x)+.22*(n-m)*Math.sin(p+.6);return{slope,light};}
 const step=1.8/16;
 for(let i=0;i<400;i++){
  const q=-.9+2.8*i/399,ys=new Array(17);ys[8]=q;
  for(let direction of[-1,1])for(let j=8;direction<0?j>0:j<16;j+=direction){const x=-.4+j*step,y=ys[j],dt=direction*step,k=field(x,y).slope;ys[j+direction]=y+dt*field(x+dt*.5,y+dt*k*.5).slope;}
  const ns=ys.map((y,j)=>{const x=-.4+j*step,f=field(x,y);return{x,y,k:f.slope,l:f.light};}),g=c.createLinearGradient(-.4*w,0,1.4*w,0);let mean=0;
  for(let j=0;j<=16;j++){const l=ns[j].l;mean+=l;g.addColorStop(j/16,`rgba(${Math.round(112+143*l)},${Math.round(157+89*l)},${Math.round(182+50*l)},${.18+.76*l})`);}
  c.strokeStyle=g;c.lineWidth=s*(.42+1.62*mean/17);c.beginPath();c.moveTo(ns[0].x*w,ns[0].y*h);
  for(let j=0;j<16;j++){const a=ns[j],b=ns[j+1];c.bezierCurveTo((a.x+step/3)*w,(a.y+a.k*step/3)*h,(b.x-step/3)*w,(b.y-b.k*step/3)*h,b.x*w,b.y*h);}c.stroke();
 }
 c.restore();
}
module.exports={render,id:'ave-verum-corpus',duration:120};

return module.exports; })();

works["air-g-string"] = (() => { const module = {exports:{}};
'use strict';
const TAU=2*Math.PI;
// Wilhelmj long solo/support role, editorial only; no audio synchronization.
function render(c,w,h,time){
 const p=TAU*((((Number.isFinite(time)?time:0)%96)+96)%96)/96,s=Math.min(w,h)/277,sn=Math.sin(p),cs=Math.cos(p);
 c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.shadowColor='rgba(0,0,0,0)';c.shadowOffsetX=0;c.shadowOffsetY=0;c.lineCap='butt';c.lineJoin='miter';c.miterLimit=10;c.setLineDash([]);c.lineDashOffset=0;c.fillStyle='#302735';c.fillRect(0,0,w,h);
 for(let i=0;i<320;i++){
  const q=-.6+2.2*(i+.15*Math.sin(i*2.399))/319;
  function at(u){const a=4.2*q+.8*Math.sin(Math.PI*u)+.55*sn,y=q+.26*Math.sin(a)+.12*Math.sin(Math.PI*u+.55*sn)+(.16+.10*cs)*(u-.5),dy=.26*.8*Math.PI*Math.cos(Math.PI*u)*Math.cos(a)+.12*Math.PI*Math.cos(Math.PI*u+.55*sn)+.16+.10*cs,dq=1+.26*4.2*Math.cos(a),light=.12+.88*Math.exp(-.5*(dq/.62)**2);return{u,y,dy,light};}
  const ns=[];for(let j=0;j<=6;j++)ns.push(at(-.2+1.4*j/6));const g=c.createLinearGradient(-.2*w,0,1.2*w,0);let mean=0;
  ns.forEach((a,j)=>{const l=a.light;mean+=l;g.addColorStop(j/6,`rgba(${Math.round(159+96*l)},${Math.round(139+105*l)},${Math.round(165+58*l)},${.18+.74*l})`);});
  c.strokeStyle=g;c.lineWidth=s*(.45+1.3*mean/7);c.beginPath();c.moveTo(ns[0].u*w,ns[0].y*h);for(let j=0;j<6;j++){const a=ns[j],b=ns[j+1],d=(b.u-a.u)/3;c.bezierCurveTo((a.u+d)*w,(a.y+d*a.dy)*h,(b.u-d)*w,(b.y-d*b.dy)*h,b.u*w,b.y*h);}c.stroke();
 }
 c.restore();
}
module.exports={render,id:'air-g-string',duration:96};

return module.exports; })();

works["largo-new-world"] = (() => { const module = {exports:{}};
'use strict';const TAU=2*Math.PI;
// Geometry-attached artistic light; editorial144s breath, not recording sync.
function render(c,w,h,time){
 const t=TAU*((((Number.isFinite(time)?time:0)%144)+144)%144)/144,p=t-.30*Math.sin(t),s=Math.min(w,h)/277,breath=.5+.5*Math.sin(p);
 c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.shadowOffsetX=0;c.shadowOffsetY=0;c.shadowColor='rgba(0,0,0,0)';c.lineCap='butt';c.lineJoin='miter';c.miterLimit=10;c.setLineDash([]);c.lineDashOffset=0;c.fillStyle='#1b293a';c.fillRect(0,0,w,h);
 function shape(q){const z=5.4*q-p;return{x:[-.22,.25-.07*breath+.055*Math.sin(3.4*q+p),.72+.08*breath+.05*Math.cos(4*q-p),1.22],y:[q+.07*Math.sin(3*q+p),q+.25*Math.sin(z)+.05*Math.sin(8*q+p),q+.24*Math.sin(z+.48+.22*Math.sin(p)),q+.09*Math.sin(3.8*q-p)],dx:[.44,.47,.47,.44],dy:[.13*Math.sin(z),.08*Math.cos(4*q-p),-.10*Math.sin(5*q+p),-.14*Math.cos(z)]};}
 function sample(n,j,u){const v=1-u;function val(a,d){const b=a[j]+d[j]/3,e=a[j+1]-d[j+1]/3;return{v:v*v*v*a[j]+3*v*v*u*b+3*v*u*u*e+u*u*u*a[j+1],d:3*v*v*(b-a[j])+6*v*u*(e-b)+3*u*u*(a[j+1]-e)};}const x=val(n.x,n.dx),y=val(n.y,n.dy);return{x:x.v,y:y.v,dx:x.d,dy:y.d};}
 for(let i=0;i<400;i++){
  const q=-.55+2.1*i/399,n=shape(q),up=shape(q+.0001),down=shape(q-.0001),stops=[];let mean=0;
  for(let k=0;k<=9;k++){const j=Math.min(2,Math.floor(k/3)),u=k===9?1:(k%3)/3,a=sample(n,j,u),b=sample(up,j,u),d=sample(down,j,u),qx=(b.x-d.x)/.0002,qy=(b.y-d.y)/.0002,spacing=Math.abs(a.dx*qy-a.dy*qx)/Math.hypot(a.dx,a.dy),light=.12+.88*Math.exp(-.5*(spacing/.78)**2);mean+=light;stops.push({at:Math.max(0,Math.min(1,(a.x+.22)/1.44)),light});}
  const g=c.createLinearGradient(-.22*w,0,1.22*w,0);stops.sort((a,b)=>a.at-b.at);for(const z of stops){const l=z.light;g.addColorStop(z.at,`rgba(${Math.round(117+138*l)},${Math.round(153+88*l)},${Math.round(183+35*l)},${.15+.78*l})`);}
  c.strokeStyle=g;c.lineWidth=s*(.43+1.32*mean/10);c.beginPath();c.moveTo(n.x[0]*w,n.y[0]*h);for(let j=0;j<3;j++)c.bezierCurveTo((n.x[j]+n.dx[j]/3)*w,(n.y[j]+n.dy[j]/3)*h,(n.x[j+1]-n.dx[j+1]/3)*w,(n.y[j+1]-n.dy[j+1]/3)*h,n.x[j+1]*w,n.y[j+1]*h);c.stroke();
 }
 c.restore();
}
module.exports={render,id:'largo-new-world',duration:144};

return module.exports; })();

works["waltz-69-1"] = (() => { const module = {exports:{}};
'use strict';const TAU=2*Math.PI;
// Editorial96s departure/return with three slow sway roles; no audio synchronization.
function render(c,w,h,time){const p=TAU*((((Number.isFinite(time)?time:0)%96)+96)%96)/96,s=Math.min(w,h)/277;
c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.shadowOffsetX=0;c.shadowOffsetY=0;c.shadowColor='rgba(0,0,0,0)';c.lineCap='butt';c.lineJoin='miter';c.miterLimit=10;c.setLineDash([]);c.lineDashOffset=0;c.fillStyle='#152c2a';c.fillRect(0,0,w,h);
function shape(q){const z=5.4*q-p,sway=.08*Math.sin(3*p+.4*q),x0=-.28+1.15*q+.08*Math.sin(3*q+p),xm=.19+.75*q+.22*Math.sin(z),ym=.12+.65*q+.19*Math.sin(4.5*q+p),y1=-.36+.95*q+.09*Math.cos(3.7*q-p),dx=.62+.14*Math.sin(4*q+p),dy=-.40+.13*Math.cos(5*q-p);return[[[x0,1.30],[x0+.06+sway,.91],[xm-dx/3,ym-dy/3],[xm,ym]],[[xm,ym],[xm+dx/3,ym+dy/3],[.94,y1+.04-sway],[1.32,y1]]];}
function at(n,j,u){const a=n[j],v=1-u,r={};for(let k=0;k<2;k++){r[k]=v*v*v*a[0][k]+3*v*v*u*a[1][k]+3*v*u*u*a[2][k]+u*u*u*a[3][k];r[k+2]=3*v*v*(a[1][k]-a[0][k])+6*v*u*(a[2][k]-a[1][k])+3*u*u*(a[3][k]-a[2][k]);}return r;}
for(let i=0;i<360;i++){const q=-.65+2.3*i/359,n=shape(q),up=shape(q+.0001),dn=shape(q-.0001),A=n[0][0],B=n[1][3],gx=(B[0]-A[0])*w,gy=(B[1]-A[1])*h,den=gx*gx+gy*gy,stops=[];let mean=0;
 for(let k=0;k<=8;k++){const j=Math.min(1,Math.floor(k/4)),u=k===8?1:(k%4)/4,a=at(n,j,u),b=at(up,j,u),d=at(dn,j,u),qx=(b[0]-d[0])/.0002,qy=(b[1]-d[1])/.0002,spacing=Math.abs(a[2]*qy-a[3]*qx)/Math.max(.000001,Math.hypot(a[2],a[3])),light=.12+.88*Math.exp(-.5*(spacing/.68)**2);mean+=light;stops.push({v:k===0?0:k===8?1:Math.max(.001,Math.min(.999,((a[0]-A[0])*w*gx+(a[1]-A[1])*h*gy)/den)),l:light});}
 const g=c.createLinearGradient(A[0]*w,A[1]*h,B[0]*w,B[1]*h);stops.sort((a,b)=>a.v-b.v);for(const z of stops){const l=z.l;g.addColorStop(z.v,`rgba(${Math.round(76+179*l)},${Math.round(146+94*l)},${Math.round(151+56*l)},${.17+.76*l})`);}c.strokeStyle=g;c.lineWidth=s*(.45+1.35*mean/9);c.beginPath();c.moveTo(A[0]*w,A[1]*h);for(const a of n)c.bezierCurveTo(a[1][0]*w,a[1][1]*h,a[2][0]*w,a[2][1]*h,a[3][0]*w,a[3][1]*h);c.stroke();}
c.restore();}
module.exports={render,id:'waltz-69-1',duration:96};

return module.exports; })();

works["beethoven-9"] = (() => { const module = {exports:{}};
'use strict';const TAU=2*Math.PI;
// Editorial144s opening; no recording synchronization.
function render(c,w,h,time){const p=TAU*((((Number.isFinite(time)?time:0)%144)+144)%144)/144,s=Math.min(w,h)/277;
c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.shadowOffsetX=0;c.shadowOffsetY=0;c.shadowColor='rgba(0,0,0,0)';c.lineCap='butt';c.lineJoin='miter';c.miterLimit=10;c.setLineDash([]);c.lineDashOffset=0;c.fillStyle='#152a43';c.fillRect(0,0,w,h);
const opening=.5+.5*Math.sin(p-.7);
function shape(q){const z=5.5*q-p,angle=(.14+.32*opening)*Math.sin(3.9*q+.5*Math.sin(p))+.08*Math.sin(p),cs=Math.cos(angle),sn=Math.sin(angle),px=.48+.20*Math.sin(3.2*q-p),py=q+.07*Math.cos(4*q+p),point=(x,y)=>[px+(x-px)*cs-(y-py)*sn,py+(x-px)*sn+(y-py)*cs],vector=(x,y)=>[x*cs-y*sn,x*sn+y*cs],v0=point(-.38,q+.06*Math.sin(3*q+p)),vm=point(.45+.07*Math.sin(4*q+p),q+.24*Math.sin(z)),v1=point(1.38,q+.09*Math.sin(4.4*q-p)),d0=vector(.83,.18*Math.cos(z)),dm=vector(.84,.14*Math.sin(4.8*q+p)),d1=vector(.93,-.18*Math.cos(z));return[[v0,[v0[0]+d0[0]/3,v0[1]+d0[1]/3],[vm[0]-dm[0]/3,vm[1]-dm[1]/3],vm],[vm,[vm[0]+dm[0]/3,vm[1]+dm[1]/3],[v1[0]-d1[0]/3,v1[1]-d1[1]/3],v1]];}

function at(n,j,u){const a=n[j],v=1-u,r={};for(let k=0;k<2;k++){r[k]=v*v*v*a[0][k]+3*v*v*u*a[1][k]+3*v*u*u*a[2][k]+u*u*u*a[3][k];r[k+2]=3*v*v*(a[1][k]-a[0][k])+6*v*u*(a[2][k]-a[1][k])+3*u*u*(a[3][k]-a[2][k]);}return r;}
for(let i=0;i<400;i++){const q=-.65+2.3*i/399,n=shape(q),up=shape(q+.0001),dn=shape(q-.0001),A=n[0][0],B=n[1][3],gx=(B[0]-A[0])*w,gy=(B[1]-A[1])*h,den=gx*gx+gy*gy,stops=[];let mean=0;
 for(let k=0;k<=8;k++){const j=Math.min(1,Math.floor(k/4)),u=k===8?1:(k%4)/4,a=at(n,j,u),b=at(up,j,u),d=at(dn,j,u),qx=(b[0]-d[0])/.0002,qy=(b[1]-d[1])/.0002,spacing=Math.abs(a[2]*qy-a[3]*qx)/Math.max(.000001,Math.hypot(a[2],a[3])),light=.12+.88*Math.exp(-.5*(spacing/(.54+.40*opening))**2);mean+=light;stops.push({v:k===0?0:k===8?1:Math.max(.001,Math.min(.999,((a[0]-A[0])*w*gx+(a[1]-A[1])*h*gy)/den)),l:light});}
 const g=c.createLinearGradient(A[0]*w,A[1]*h,B[0]*w,B[1]*h);stops.sort((a,b)=>a.v-b.v);for(const z of stops){const l=z.l;g.addColorStop(z.v,`rgba(${Math.round(74+181*l)},${Math.round(144+98*l)},${Math.round(205+7*l)},${.17+.76*l})`);}c.strokeStyle=g;c.lineWidth=s*(.45+1.35*mean/9);c.beginPath();c.moveTo(A[0]*w,A[1]*h);for(const a of n)c.bezierCurveTo(a[1][0]*w,a[1][1]*h,a[2][0]*w,a[2][1]*h,a[3][0]*w,a[3][1]*h);c.stroke();}
c.restore();}
module.exports={render,id:'beethoven-9',duration:144};

return module.exports; })();

works["toccata-fugue-dm"] = (() => { const module = {exports:{}};
'use strict';const TAU=2*Math.PI;
// Editorial96s shear transport; no recording sync. Independent from Realism lightning.
function render(c,w,h,time){const p=TAU*((((Number.isFinite(time)?time:0)%96)+96)%96)/96,s=Math.min(w,h)/277;
c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.shadowOffsetX=0;c.shadowOffsetY=0;c.shadowColor='rgba(0,0,0,0)';c.lineCap='butt';c.lineJoin='miter';c.miterLimit=10;c.setLineDash([]);c.lineDashOffset=0;c.fillStyle='#252039';c.fillRect(0,0,w,h);
function at(u,v){const V=v+.10*Math.sin(v*5+p),Vv=1+.5*Math.cos(v*5+p),U=u+.19*Math.sin(u*4-p)+.14*Math.sin(V*5+p),Uu=1+.76*Math.cos(u*4-p),Uv=.7*Math.cos(V*5+p)*Vv,Y=V+.08*Math.sin(U*6-p),Yu=.48*Math.cos(U*6-p)*Uu,Yv=Vv+.48*Math.cos(U*6-p)*Uv,X=U+.06*Math.sin(Y*5+p),Xu=Uu+.3*Math.cos(Y*5+p)*Yu,Xv=Uv+.3*Math.cos(Y*5+p)*Yv,spacing=Math.abs(Xu*Yv-Xv*Yu)/Math.max(.000001,Math.hypot(Xv,Yv)),light=.14+.86*Math.exp(-.5*(spacing/.75)**2);return{x:X*w,y:Y*h,dx:Xv*w,dy:Yv*h,light};}
for(let i=0;i<400;i++){const u=-.7+2.4*i/399,ns=[];for(let j=0;j<=12;j++)ns.push(at(u,-.7+2.4*j/12));const A=ns[0],B=ns[12],gx=B.x-A.x,gy=B.y-A.y,den=gx*gx+gy*gy,stops=ns.map((a,j)=>({v:j===0?0:j===12?1:Math.max(.001,Math.min(.999,((a.x-A.x)*gx+(a.y-A.y)*gy)/den)),l:a.light})).sort((a,b)=>a.v-b.v),g=c.createLinearGradient(A.x,A.y,B.x,B.y);let mean=0;for(const z of stops){const l=z.l;mean+=l;g.addColorStop(z.v,`rgba(${Math.round(140+109*l)},${Math.round(131+113*l)},${Math.round(192+61*l)},${.17+.77*l})`);}c.strokeStyle=g;c.lineWidth=s*(.45+1.35*mean/13);c.beginPath();c.moveTo(A.x,A.y);for(let j=0;j<12;j++){const a=ns[j],b=ns[j+1],d=.2/3;c.bezierCurveTo(a.x+a.dx*d,a.y+a.dy*d,b.x-b.dx*d,b.y-b.dy*d,b.x,b.y);}c.stroke();}
c.restore();}
module.exports={render,id:'toccata-fugue-dm',duration:96};

return module.exports; })();

works["carmen-prelude"] = (() => { const module = {exports:{}};
'use strict';const T=2*Math.PI;
// Editorial96s opening and tightening, not recording synchronization.
function render(c,w,h,time){const p=T*((((Number.isFinite(time)?time:0)%96)+96)%96)/96,s=Math.min(w,h)/277,ax=.18+.02*Math.sin(p),ay=.20+.02*Math.cos(p),kv=T*.8,ku=T*.9;
c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.shadowOffsetX=0;c.shadowOffsetY=0;c.shadowColor='rgba(0,0,0,0)';c.lineCap='butt';c.lineJoin='miter';c.miterLimit=10;c.setLineDash([]);c.lineDashOffset=0;c.fillStyle='#382032';c.fillRect(0,0,w,h);
function at(u,q){const a=kv*q+p,b=ku*u-p,x=u+ax*Math.sin(a),y=q+ay*Math.sin(b),yu=ay*ku*Math.cos(b),xq=ax*kv*Math.cos(a),spacing=Math.abs(1-xq*yu)/Math.hypot(1,yu),light=.12+.88*Math.exp(-.5*(spacing/.72)**2);return{x:x*w,y:y*h,dx:w,dy:yu*h,light};}
for(let i=0;i<440;i++){const q=-.65+2.3*i/439,ns=[];for(let j=0;j<=12;j++)ns.push(at(-.65+2.3*j/12,q));const A=ns[0],B=ns[12],g=c.createLinearGradient(A.x,0,B.x,0);let mean=0;for(let j=0;j<=12;j++){const l=ns[j].light;mean+=l;g.addColorStop(j/12,`rgba(${Math.round(165+89*l)},${Math.round(102+138*l)},${Math.round(137+61*l)},${.18+.77*l})`);}c.strokeStyle=g;c.lineWidth=s*(.45+1.35*mean/13);c.beginPath();c.moveTo(A.x,A.y);for(let j=0;j<12;j++){const a=ns[j],b=ns[j+1],d=2.3/12/3;c.bezierCurveTo(a.x+a.dx*d,a.y+a.dy*d,b.x-b.dx*d,b.y-b.dy*d,b.x,b.y);}c.stroke();}
c.restore();}module.exports={render,id:'carmen-prelude',duration:96};

return module.exports; })();

works["brindisi"] = (() => { const module = {exports:{}};
'use strict';const TAU=2*Math.PI;
// Editorial invitation/response, not recording timing.
function render(c,w,h,time){const t=TAU*((((Number.isFinite(time)?time:0)%96)+96)%96)/96,p=t-.2*Math.sin(t),s=Math.min(w,h)/277,c1=.24+.12*Math.sin(p),c2=.77+.10*Math.sin(p-.8),r1=.33+.04*Math.cos(p),r2=.37+.04*Math.cos(p-.8);
c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.shadowOffsetX=0;c.shadowOffsetY=0;c.shadowColor='rgba(0,0,0,0)';c.lineCap='butt';c.lineJoin='miter';c.miterLimit=10;c.setLineDash([]);c.lineDashOffset=0;c.fillStyle='#192b32';c.fillRect(0,0,w,h);
for(let i=0;i<420;i++){const q=-.65+2.3*i/419,a=5.6*q-.55*Math.sin(p),b=5*q-.55*Math.sin(p-.8)-1.05,f1=.27*Math.sin(a),f2=.25*Math.sin(b);function at(u){const z1=(u-c1)/r1,z2=(u-c2)/r2,g1=Math.exp(-.5*z1*z1),g2=Math.exp(-.5*z2*z2),y=q-.18*(u-.5)+f1*g1+f2*g2,du=-.18-f1*g1*z1/r1-f2*g2*z2/r2,dq=1+.27*5.6*Math.cos(a)*g1+.25*5*Math.cos(b)*g2,spacing=Math.abs(dq)/Math.hypot(1,du),light=.14+.86*Math.exp(-.5*(spacing/.78)**2);return{y:y*h,dy:du*h,light};}const ns=[];for(let j=0;j<=12;j++)ns.push(at(-.35+1.7*j/12));const g=c.createLinearGradient(-.35*w,0,1.35*w,0);let mean=0;for(let j=0;j<=12;j++){const l=ns[j].light;mean+=l;g.addColorStop(j/12,`rgba(${Math.round(98+157*l)},${Math.round(154+81*l)},${Math.round(165+40*l)},${.18+.77*l})`);}c.strokeStyle=g;c.lineWidth=s*(.48+1.32*mean/13);c.beginPath();c.moveTo(-.35*w,ns[0].y);for(let j=0;j<12;j++){const u=-.35+1.7*j/12,v=-.35+1.7*(j+1)/12,d=1.7/12/3;c.bezierCurveTo((u+d)*w,ns[j].y+ns[j].dy*d,(v-d)*w,ns[j+1].y-ns[j+1].dy*d,v*w,ns[j+1].y);}c.stroke();}c.restore();}
module.exports={render,id:'brindisi',duration:96};

return module.exports; })();

works["cavalleria-intermezzo"] = (() => { const module = {exports:{}};
'use strict';const T=2*Math.PI;
// Sustained cantabile and foundation,96s editorial time only.
function render(c,w,h,time){const p=T*((((Number.isFinite(time)?time:0)%96)+96)%96)/96,s=Math.min(w,h)/277,sn=Math.sin(p),cs=Math.cos(p);
c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.shadowOffsetX=0;c.shadowOffsetY=0;c.shadowColor='rgba(0,0,0,0)';c.lineCap='butt';c.lineJoin='miter';c.miterLimit=10;c.setLineDash([]);c.lineDashOffset=0;c.fillStyle='#233432';c.fillRect(0,0,w,h);
for(const depth of[1,0]){const count=depth?224:256;for(let i=0;i<count;i++){const q=-.5+2*i/(count-1);function at(u){const z=u-.5,slope=.20+.14*cs,centre=depth?.79-.055*cs+.14*sn*z-(.65+.12*cs)*z*z:.28+.06*sn+(.18+.12*cs)*z+(1.05+.20*sn)*z*z+.20*z*z*z,cp=depth?.14*sn-2*(.65+.12*cs)*z:(.18+.12*cs)+2*(1.05+.20*sn)*z+.6*z*z,variance=depth?.09:.0484,k=depth?.40:.52,d=q-centre,g=Math.exp(-.5*d*d/variance),push=-k*d*g,pu=k*cp*g*(1-d*d/variance),pv=-k*g*(1-d*d/variance);let x,xu,xv;if(depth){const A=1-.13*Math.cos(Math.PI*q-.4*cs);x=.5+z*A+.025*cs*(q-.5);xu=A;xv=z*.13*Math.PI*Math.sin(Math.PI*q-.4*cs)+.025*cs;}else{const A=1+.22*Math.sin(Math.PI*q+.5*sn);x=.5+z*A-.12*slope*push;xu=A-.12*slope*pu;xv=z*.22*Math.PI*Math.cos(Math.PI*q+.5*sn)-.12*slope*pv;}const y=q+push,spacing=Math.abs(xu*(1+pv)-xv*pu)/Math.hypot(xu,pu),response=.35*g+.65*Math.exp(-.5*(spacing/.82)**2),light=.12+.88*response;return{x:x*w,y:y*h,dx:xu*w,dy:pu*h,light};}const ns=[];for(let j=0;j<=12;j++)ns.push(at(-.45+1.9*j/12));const A=ns[0],B=ns[12],gx=B.x-A.x,gy=B.y-A.y,den=gx*gx+gy*gy,g=c.createLinearGradient(A.x,A.y,B.x,B.y),st=ns.map((a,j)=>({v:j===0?0:j===12?1:Math.max(.001,Math.min(.999,((a.x-A.x)*gx+(a.y-A.y)*gy)/den)),l:a.light})).sort((a,b)=>a.v-b.v);let mean=0;for(const z of st){const l=z.l;mean+=l;g.addColorStop(z.v,depth?`rgba(${Math.round(104+117*l)},${Math.round(153+85*l)},${Math.round(153+74*l)},${.12+.63*l})`:`rgba(${Math.round(157+97*l)},${Math.round(149+88*l)},${Math.round(119+77*l)},${.17+.79*l})`);}c.strokeStyle=g;c.lineWidth=s*(.45+(depth?1.05:1.35)*mean/13);c.beginPath();c.moveTo(A.x,A.y);for(let j=0;j<12;j++){const a=ns[j],b=ns[j+1],d=1.9/12/3;c.bezierCurveTo(a.x+a.dx*d,a.y+a.dy*d,b.x-b.dx*d,b.y-b.dy*d,b.x,b.y);}c.stroke();}}
c.restore();}module.exports={render,id:'cavalleria-intermezzo',duration:96};

return module.exports; })();

works["william-tell-overture"] = (() => { const module = {exports:{}};
'use strict';const T=2*Math.PI;
// Four smooth editorial states, not timed recording sections.
function render(c,w,h,time){const t=((((Number.isFinite(time)?time:0)%96)+96)%96),p=T*t/96,k=Math.floor(t/24),f=t/24-k,e=f*f*(3-2*f),states=[[.22,.18,-.14],[.34,.22,.10],[.46,.18,.17],[.30,.16,-.10]],a=states[k],b=states[(k+1)%4],q=a.map((v,i)=>v+(b[i]-v)*e),s=Math.min(w,h)/277;
c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.shadowOffsetX=0;c.shadowOffsetY=0;c.shadowColor='rgba(0,0,0,0)';c.lineCap='butt';c.lineJoin='miter';c.miterLimit=10;c.setLineDash([]);c.lineDashOffset=0;c.fillStyle='#173e41';c.fillRect(0,0,w,h);
function at(u,v){const main=q[0]+.10*(u-.5)*(u-.5)+q[2]*(u-.5),mp=.20*(u-.5)+q[2],answer=.77+.08*Math.sin(Math.PI*u+p),ap=.08*Math.PI*Math.cos(Math.PI*u+p),d=v-main,d2=v-answer,variance=q[1]*q[1],g=Math.exp(-.5*d*d/variance),g2=Math.exp(-.5*d2*d2/.0324),gu=g*d*mp/variance,gv=-g*d/variance,g2u=g2*d2*ap/.0324,g2v=-g2*d2/.0324,x=u+q[2]*(g-.55*g2),y=v-.28*d*g-.20*d2*g2,xu=1+q[2]*(gu-.55*g2u),xv=q[2]*(gv-.55*g2v),yu=.28*mp*g*(1-d*d/variance)+.20*ap*g2*(1-d2*d2/.0324),yv=1-.28*g*(1-d*d/variance)-.20*g2*(1-d2*d2/.0324),spacing=Math.abs(xu*yv-xv*yu)/Math.hypot(xu,yu),envelope=Math.min(1,.68*g+.52*g2),light=.12+.88*(.40*envelope+.60*Math.exp(-.5*(spacing/.85)**2));return{x:x*w,y:y*h,dx:xu*w,dy:yu*h,light};}
for(let i=0;i<400;i++){const v=-.5+2*i/399,ns=[];for(let j=0;j<=12;j++)ns.push(at(-.5+2*j/12,v));const A=ns[0],B=ns[12],gx=B.x-A.x,gy=B.y-A.y,den=gx*gx+gy*gy,g=c.createLinearGradient(A.x,A.y,B.x,B.y),st=ns.map((a,j)=>({v:j===0?0:j===12?1:Math.max(.001,Math.min(.999,((a.x-A.x)*gx+(a.y-A.y)*gy)/den)),l:a.light})).sort((a,b)=>a.v-b.v);let mean=0;for(const z of st){const l=z.l;mean+=l;g.addColorStop(z.v,`rgba(${Math.round(101+151*l)},${Math.round(179+60*l)},${Math.round(183+12*l)},${.18+.77*l})`);}c.strokeStyle=g;c.lineWidth=s*(.45+1.4*mean/13);c.beginPath();c.moveTo(A.x,A.y);for(let j=0;j<12;j++){const a=ns[j],b=ns[j+1],d=2/12/3;c.bezierCurveTo(a.x+a.dx*d,a.y+a.dy*d,b.x-b.dx*d,b.y-b.dy*d,b.x,b.y);}c.stroke();}c.restore();}
module.exports={render,id:'william-tell-overture',duration:96};

return module.exports; })();

works["erlkonig"] = (() => { const module = {exports:{}};
'use strict';const T=2*Math.PI;
// Editorial96s transport, not score/recording synchronized.
function render(c,w,h,time){const p=T*((((Number.isFinite(time)?time:0)%96)+96)%96)/96,s=Math.min(w,h)/277;
c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.shadowOffsetX=0;c.shadowOffsetY=0;c.shadowColor='rgba(0,0,0,0)';c.lineCap='butt';c.lineJoin='miter';c.miterLimit=10;c.setLineDash([]);c.lineDashOffset=0;c.fillStyle='#13232d';c.fillRect(0,0,w,h);
for(const depth of[1,0]){const phase=p+depth*1.3;for(let i=0;i<240;i++){const v=-.7+2.6*i/239;function at(u){const A=4.4*u+phase,U=u+.10*Math.sin(A),Uu=1+.44*Math.cos(A),B=5.2*v+.95*Math.sin(4*U-phase),Bu=3.8*Math.cos(4*U-phase)*Uu,V=v+.125*Math.sin(B),Vu=.125*Math.cos(B)*Bu,Vv=1+.65*Math.cos(B),X=U+.07*Math.sin(6*V-phase),C=.42*Math.cos(6*V-phase),Xu=Uu+C*Vu,Xv=C*Vv,Y=V-.42*X+.07*Math.sin(5*X+phase),D=-.42+.35*Math.cos(5*X+phase),Yu=Vu+D*Xu,Yv=Vv+D*Xv,spacing=Math.abs(Xu*Yv-Xv*Yu)/Math.hypot(Xu,Yu),light=.12+.88*Math.exp(-.5*(spacing/.82)**2);return{x:X*w,y:Y*h,dx:Xu*w,dy:Yu*h,light};}const ns=[];for(let j=0;j<=16;j++)ns.push(at(-.4+1.8*j/16));const A=ns[0],B=ns[16],gx=B.x-A.x,gy=B.y-A.y,den=gx*gx+gy*gy,g=c.createLinearGradient(A.x,A.y,B.x,B.y),st=ns.map((a,j)=>({v:j===0?0:j===16?1:Math.max(.001,Math.min(.999,((a.x-A.x)*gx+(a.y-A.y)*gy)/den)),l:a.light})).sort((a,b)=>a.v-b.v);let mean=0;for(const z of st){const l=z.l;mean+=l;g.addColorStop(z.v,depth?`rgba(${Math.round(124+126*l)},${Math.round(109+112*l)},${Math.round(123+65*l)},${.14+.67*l})`:`rgba(${Math.round(98+152*l)},${Math.round(153+91*l)},${Math.round(180+73*l)},${.17+.78*l})`);}c.strokeStyle=g;c.lineWidth=s*(.45+(depth?1.15:1.45)*mean/17);c.beginPath();c.moveTo(A.x,A.y);for(let j=0;j<16;j++){const a=ns[j],b=ns[j+1],d=1.8/16/3;c.bezierCurveTo(a.x+a.dx*d,a.y+a.dy*d,b.x-b.dx*d,b.y-b.dy*d,b.x,b.y);}c.stroke();}}
c.restore();}module.exports={render,id:'erlkonig',duration:96};

return module.exports; })();
// BWV and Arabesque use the bounded raster. One backing maximum across all instances.
let bwvBacking=null,bwvContext=null,bwvOwner=null;
function releaseBwv(owner){
 if(owner!==bwvOwner)return;
 if(bwvBacking){bwvBacking.width=0;bwvBacking.height=0;}
 bwvBacking=null;bwvContext=null;bwvOwner=null;
}
function drawBwv(owner,work,c,w,h,time){
 const W=c.canvas.width,H=c.canvas.height,capW=work.id==='arabesque-1'?Math.min(W,Math.max(1,Math.round(w))):W,capH=Math.min(H,Math.max(1,Math.round(h)));
 if(capH===H){releaseBwv(bwvOwner);return false;}
 if(bwvOwner!==owner){releaseBwv(bwvOwner);bwvOwner=owner;}
 if(!bwvBacking){bwvBacking=document.createElement('canvas');bwvContext=bwvBacking.getContext('2d');}
 if(!bwvContext){releaseBwv(owner);throw new Error('Visual backing unavailable');}
 if(bwvBacking.width!==capW)bwvBacking.width=capW;
 if(bwvBacking.height!==capH)bwvBacking.height=capH;
 const unit=Math.min(w,h)/277,lw=w/unit,lh=h/unit,sx=capW/lw,sy=capH/lh;
 const proxy=new Proxy(bwvContext,{
  get(ctx,key){if(key==='setTransform')return(a,b,d,e,x,y)=>ctx.setTransform(a*sx,b*sy,d*sx,e*sy,x*sx,y*sy);
   const value=ctx[key];return typeof value==='function'?value.bind(ctx):value;},
  set(ctx,key,value){ctx[key]=value;return true;}
 });
 bwvContext.setTransform(1,0,0,1,0,0);bwvContext.clearRect(0,0,capW,capH);
 work.render(proxy,lw,lh,Number.isFinite(time)?Math.max(0,time):0);
 c.save();try{
  c.setTransform(1,0,0,1,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';c.shadowBlur=0;c.shadowColor='transparent';
  c.clearRect(0,0,W,H);c.imageSmoothingEnabled=true;c.imageSmoothingQuality='high';
  c.drawImage(bwvBacking,0,0,W,H);
 }finally{c.restore();}
 return true;
}
function create(id){
 const work=works[id];if(!work)return null;
 let target=null,proxy=null,sx=1,sy=1;const owner={};
 return {light:false,init(){return null;},dispose(){releaseBwv(owner);target=null;proxy=null;},draw(c,w,h,time){
  if(!(w>0&&h>0))return false;
  if((id==='prelude-bwv846'||id==='arabesque-1')&&drawBwv(owner,work,c,w,h,time))return true;
  // Keep the approved 277px logical short edge and line widths at every DPR.
  const unit=Math.min(w,h)/277, lw=w/unit, lh=h/unit;
  sx=(c.canvas.width/w)*unit;sy=c.canvas.height/h===c.canvas.width/w?sx:(c.canvas.height/h)*unit;
  if(target!==c){target=c;proxy=new Proxy(c,{
   get(ctx,key){if(key==='setTransform')return(a,b,d,e,x,y)=>ctx.setTransform(a*sx,b*sy,d*sx,e*sy,x*sx,y*sy);
    const value=ctx[key];return typeof value==='function'?value.bind(ctx):value;},
   set(ctx,key,value){ctx[key]=value;return true;}
  });}
  c.save();try{work.render(proxy,lw,lh,Number.isFinite(time)?Math.max(0,time):0);}finally{c.restore();}
  return true;
 }};
}
window.ClassicaVisual=Object.freeze({create,has:id=>Object.prototype.hasOwnProperty.call(works,id),list:()=>Object.keys(works),version:'20261026-erlkonig1'});
})();
