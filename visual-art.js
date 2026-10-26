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
 let target=null,proxy=null,scale=1;const owner={};
 return {light:false,init(){return null;},dispose(){releaseBwv(owner);target=null;proxy=null;},draw(c,w,h,time){
  if(!(w>0&&h>0))return false;
  if((id==='prelude-bwv846'||id==='arabesque-1')&&drawBwv(owner,work,c,w,h,time))return true;
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
window.ClassicaVisual=Object.freeze({create,has:id=>Object.prototype.hasOwnProperty.call(works,id),list:()=>Object.keys(works),version:'20261026-jesu1'});
})();
