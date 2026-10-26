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
// Only BWV uses the bounded raster. One backing maximum across all instances.
let bwvBacking=null,bwvContext=null,bwvOwner=null;
function releaseBwv(owner){
 if(owner!==bwvOwner)return;
 if(bwvBacking){bwvBacking.width=0;bwvBacking.height=0;}
 bwvBacking=null;bwvContext=null;bwvOwner=null;
}
function drawBwv(owner,work,c,w,h,time){
 const W=c.canvas.width,H=c.canvas.height,capH=Math.min(H,Math.max(1,Math.round(h)));
 if(capH===H){releaseBwv(bwvOwner);return false;}
 if(bwvOwner!==owner){releaseBwv(bwvOwner);bwvOwner=owner;}
 if(!bwvBacking){bwvBacking=document.createElement('canvas');bwvContext=bwvBacking.getContext('2d');}
 if(!bwvContext){releaseBwv(owner);throw new Error('Visual backing unavailable');}
 if(bwvBacking.width!==W)bwvBacking.width=W;
 if(bwvBacking.height!==capH)bwvBacking.height=capH;
 const unit=Math.min(w,h)/277,lw=w/unit,lh=h/unit,sx=W/lw,sy=capH/lh;
 const proxy=new Proxy(bwvContext,{
  get(ctx,key){if(key==='setTransform')return(a,b,d,e,x,y)=>ctx.setTransform(a*sx,b*sy,d*sx,e*sy,x*sx,y*sy);
   const value=ctx[key];return typeof value==='function'?value.bind(ctx):value;},
  set(ctx,key,value){ctx[key]=value;return true;}
 });
 bwvContext.setTransform(1,0,0,1,0,0);bwvContext.clearRect(0,0,W,capH);
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
  if(id==='prelude-bwv846'&&drawBwv(owner,work,c,w,h,time))return true;
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
window.ClassicaVisual=Object.freeze({create,has:id=>Object.prototype.hasOwnProperty.call(works,id),list:()=>Object.keys(works),version:'20261026-nocturne9-1'});
})();
