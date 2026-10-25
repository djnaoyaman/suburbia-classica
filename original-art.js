/* Original: resolution-independent, deterministic motion studies for each work.
 * Visual cadence is editorial, not microphone/FFT analysis of the YouTube iframe.
 * Every frame derives from media time: pause, seek and frame rate do not change it.
 */
(() => {
  'use strict';
  const TAU=Math.PI*2, sin=Math.sin, cos=Math.cos, pow=Math.pow;
  const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
  const fract=x=>x-Math.floor(x);
  const smooth=x=>{x=clamp(x);return x*x*(3-2*x);};
  const hash=s=>{let h=2166136261;for(const c of s)h=Math.imul(h^c.charCodeAt(0),16777619);return h>>>0;};
  function rng(seed){let a=seed;return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
  const color=(hex,a=1)=>{const n=parseInt(hex.replace('#',''),16);return `rgba(${n>>16},${n>>8&255},${n&255},${clamp(a)})`;};
  const palettes={
    rose:['#110c20','#34243d','#e8a0a9','#f7d6b2','#9e9cde'],
    moon:['#030c1b','#132c48','#8eb5e4','#f1eee2','#6582c1'],
    dusk:['#111025','#53334e','#f0ae8b','#f7d2b0','#ae93ce'],
    violet:['#09091e','#24234c','#a8a0f3','#f6c58d','#72ced6'],
    teal:['#03151d','#123e48','#78c5c6','#f2e1b4','#599cbd'],
    rain:['#061620','#1a3544','#8cc4d6','#dbe6d7','#8b9cc5'],
    paper:['#f1e9db','#ddd2bd','#b3614e','#284e57','#c59a58'],
    dawn:['#101b31','#53536a','#f2cab5','#f8e1bb','#b8bacd'],
    gold:['#130e15','#39222b','#e9b96c','#fff0bf','#ad738b'],
    emerald:['#071c23','#17454b','#8bdbc6','#f5dda0','#7ba9cf'],
    ivory:['#f3f0e7','#d5e3dc','#a57560','#387e7e','#b8a16c'],
    scarlet:['#100b17','#44202c','#e46f63','#f3ca89','#9e7dbe'],
    forest:['#04191c','#25453f','#8fbea1','#e5cc90','#66a9aa'],
    autumn:['#160e18','#48302a','#ce9964','#f7dbad','#998b9e'],
    pearl:['#0a1829','#294b61','#a5ccd9','#f3e8d3','#b6a0c8'],
    lilac:['#14132c','#37385b','#beb8e2','#eed5bd','#8cbfc6'],
    spring:['#eff1e3','#d3e0d3','#bf7d87','#5e9483','#d5b36e'],
    obsidian:['#050b13','#1f2939','#788fa9','#e1c9a5','#ab777b']
  };
  // id, scene, visual pulse/minute, phrase meter, movement energy, palette.
  const scores=[
    ['fur-elise','bloom',72,3,.40,'rose'],
    ['moonlight','nocturne',48,4,.21,'moon'],
    ['tristesse','silk',60,4,.40,'dusk'],
    ['fantaisie-impromptu','torrent',138,4,.89,'violet'],
    ['nocturne-9-2','bokeh',66,3,.37,'moon'],
    ['raindrop','rain',56,4,.44,'rain'],
    ['clair-de-lune','mist',54,3,.33,'pearl'],
    ['gymnopedie-1','mobile',60,3,.25,'paper'],
    ['traumerei','seeds',58,4,.30,'dawn'],
    ['liebestraum-3','aurora',72,3,.55,'rose'],
    ['flaxen-hair','garden',66,4,.31,'ivory'],
    ['arabesque-1','tide',98,3,.56,'emerald'],
    ['prelude-bwv846','canon',76,4,.43,'pearl'],
    ['pavane','prism',54,4,.26,'lilac'],
    ['nocturne-20','nocturne',58,4,.35,'violet'],
    ['pathetique-2','silk',64,4,.46,'autumn'],
    ['k331-1','mobile',84,3,.45,'paper'],
    ['prelude-7','bloom',72,3,.36,'spring'],
    ['brahms-waltz-15','waltz',80,3,.43,'gold'],
    ['mendelssohn-spring-song','garden',112,4,.66,'spring'],
    ['goldberg-aria','canon',58,3,.28,'gold'],
    ['reverie','mist',66,4,.36,'lilac'],
    ['gnossienne-1','dunes',56,4,.34,'paper'],
    ['waltz-64-2','waltz',116,3,.67,'rose'],
    ['waltz-69-1','waltz',88,3,.43,'lilac'],
    ['tchaikovsky-october','seeds',60,4,.36,'autumn'],
    ['k310-2','prism',62,3,.40,'pearl'],
    ['schubert-impromptu-90-3','tide',76,4,.50,'teal'],
    ['brahms-op118-2','silk',62,3,.41,'gold'],
    ['canon','canon',76,4,.46,'emerald'],
    ['air-g-string','strings',60,4,.35,'gold'],
    ['jesu-joy','cathedral',86,3,.52,'ivory'],
    ['rach-pc2-2','aurora',62,4,.58,'violet'],
    ['schubert-ave-maria','cathedral',56,4,.33,'moon'],
    ['liebesgruss','bloom',84,4,.47,'rose'],
    ['vocalise','silk',58,4,.44,'pearl'],
    ['brahms-lullaby','orbit',62,3,.27,'moon'],
    ['mozart-pc21-2','tide',66,4,.38,'ivory'],
    ['faure-apres-un-reve','mist',64,3,.45,'lilac'],
    ['paganini-var18','aurora',66,4,.67,'gold'],
    ['solveigs-song','nocturne',60,4,.36,'emerald'],
    ['beethoven-5','storm',108,4,.94,'scarlet'],
    ['beethoven-9','procession',108,4,.85,'gold'],
    ['vivaldi-spring','garden',132,4,.85,'spring'],
    ['largo-new-world','dunes',52,4,.33,'forest'],
    ['bolero','procession',72,3,.80,'scarlet'],
    ['pomp-circumstance-1','procession',112,4,.78,'violet'],
    ['eine-kleine','prism',132,4,.79,'ivory'],
    ['pictures','prism',96,4,.74,'gold'],
    ['le-cygne','tide',56,3,.28,'pearl'],
    ['jupiter','orbit',108,3,.87,'autumn'],
    ['toccata-fugue-dm','cathedral',100,4,.85,'obsidian'],
    ['farandole','embers',132,4,.91,'gold'],
    ['carmen-prelude','procession',144,4,.96,'scarlet'],
    ['cavalleria-intermezzo','strings',58,3,.48,'dusk'],
    ['barber-adagio','strings',48,4,.52,'obsidian'],
    ['nessun-dorma','aurora',62,4,.76,'moon'],
    ['brindisi','bokeh',120,3,.79,'gold'],
    ['habanera','waltz',96,4,.72,'scarlet'],
    ['orpheus-overture','embers',144,4,.95,'gold'],
    ['william-tell-overture','torrent',148,4,.98,'forest'],
    ['queen-of-night','orbit',132,4,.94,'violet'],
    ['toreador','storm',112,4,.85,'scarlet'],
    ['figaro-letter-duet','seeds',88,3,.45,'ivory'],
    ['flower-duet','bloom',72,3,.52,'lilac'],
    ['o-mio-babbino','silk',62,3,.54,'dusk'],
    ['lascia-ch-io-pianga','rain',52,3,.34,'pearl'],
    ['rojo-no-tsuki','nocturne',56,4,.31,'moon'],
    ['heidenroslein','garden',88,3,.46,'spring'],
    ['ave-verum-corpus','cathedral',56,4,.36,'lilac'],
    ['erlkonig','storm',144,3,.95,'forest'],
    ['caccini-ave-maria','cathedral',58,4,.51,'gold'],
    ['faure-pie-jesu','mist',54,4,.28,'pearl'],
    ['verdi-dies-irae','storm',144,4,1,'scarlet']
  ];
  const catalog=new Map(scores.map(([id,scene,pace,meter,energy,palette])=>{
    const seed=hash(id),r=rng(seed),source=palettes[palette];
    // A small per-work rotation gives shared families different compositions.
    return [id,Object.freeze({id,scene,pace,meter,energy,palette,seed,phase:r()*TAU,tilt:(r()-.5)*.5,
      colors:Object.freeze(source.slice()),light:['paper','ivory','spring'].includes(palette)})];
  }));
  function stroke(c,points,col,width=1,close=false){
    c.beginPath();for(let i=0;i<points.length;i++){const p=points[i];i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]);}
    if(close)c.closePath();c.strokeStyle=col;c.lineWidth=width;c.stroke();
  }
  function ellipse(c,x,y,rx,ry,angle,col,width=1){c.beginPath();c.ellipse(x,y,Math.max(.01,rx),Math.max(.01,ry),angle,0,TAU);c.strokeStyle=col;c.lineWidth=width;c.stroke();}
  function glow(c,x,y,r,col,alpha){
    const g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,color(col,alpha));g.addColorStop(.25,color(col,alpha*.45));g.addColorStop(1,color(col,0));c.fillStyle=g;c.fillRect(x-r,y-r,r*2,r*2);
  }
  function dot(c,x,y,r,col,a=1){c.fillStyle=color(col,a);c.beginPath();c.arc(x,y,r,0,TAU);c.fill();}
  function texture(r){
    const tile=document.createElement('canvas');tile.width=192;tile.height=192;
    const ctx=tile.getContext('2d');if(!ctx)return null;
    const image=ctx.createImageData(192,192);
    for(let i=0;i<image.data.length;i+=4){const v=r()>.5?255:0;image.data[i]=image.data[i+1]=image.data[i+2]=v;image.data[i+3]=Math.floor(r()*11);}
    ctx.putImageData(image,0,0);return tile;
  }
  function init(profile,w,h){
    const r=rng(profile.seed),p=profile.colors;
    return {profile,grain:texture(r),pattern:null,
      dust:Array.from({length:100},()=>({x:r(),y:r(),z:.2+r()*.8,phase:r()*TAU})),
      particles:Array.from({length:180},()=>({x:r(),y:r(),z:.25+r()*.75,phase:r()*TAU,size:r(),speed:.5+r(),color:r()<.65?2:4})),
      background:null,overlay:null,surfaceKey:'',p};
  }
  function prepareSurfaces(c,w,h,s){
    const transform=c.getTransform(),dx=Math.abs(transform.a)||1,dy=Math.abs(transform.d)||1;
    const width=Math.max(1,Math.round(w*dx)),height=Math.max(1,Math.round(h*dy)),key=width+'x'+height;
    if(s.surfaceKey===key)return;
    const make=()=>{const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;const context=canvas.getContext('2d');context.scale(dx,dy);return {canvas,context};};
    const {canvas:background,context:bg}=make(),{canvas:overlay,context:over}=make(),p=s.p;
    const gradient=bg.createLinearGradient(0,0,w*.3,h);gradient.addColorStop(0,p[0]);gradient.addColorStop(.55,p[1]);gradient.addColorStop(1,p[0]);bg.fillStyle=gradient;bg.fillRect(0,0,w,h);
    glow(bg,w*(.55+.10*sin(s.profile.phase)),h*.41,Math.max(w,h)*.66,p[2],s.profile.light ? .07 : .13);
    if(s.grain){over.fillStyle=over.createPattern(s.grain,'repeat');over.fillRect(0,0,w,h);}
    if(!s.profile.light){const g=over.createRadialGradient(w*.5,h*.44,Math.min(w,h)*.25,w*.5,h*.5,Math.max(w,h)*.78);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.42)');over.fillStyle=g;over.fillRect(0,0,w,h);}
    s.background=background;s.overlay=overlay;s.surfaceKey=key;
  }
  function backdrop(c,w,h,t,s,m){
    prepareSurfaces(c,w,h,s);const p=s.p;
    c.globalCompositeOperation='source-over';c.globalAlpha=1;c.drawImage(s.background,0,0,w,h);
    if(!s.profile.light){
      c.fillStyle=color(p[3],.23);
      for(const q of s.dust){const x=fract(q.x+t*.0016*q.z)*w,y=fract(q.y-t*.002*q.z)*h;
        c.globalAlpha=(.25+.4*(.5+.5*sin(t*.32+q.phase)))*q.z;c.fillRect(x,y,.5+q.z, .5+q.z);}
      c.globalAlpha=1;
    }
  }
  function finish(c,w,h,s){
    c.globalAlpha=1;c.globalCompositeOperation='source-over';
    c.drawImage(s.overlay,0,0,w,h);
  }
  function lensSprite(s,index){
    if(!s.lenses)s.lenses=new Map();if(s.lenses.has(index))return s.lenses.get(index);
    const canvas=document.createElement('canvas');canvas.width=canvas.height=384;
    const c=canvas.getContext('2d'),R=104,x=192,y=192,p=s.p;
    glow(c,x,y,R*1.8,p[index],.065);
    const g=c.createRadialGradient(x-R*.22,y-R*.22,R*.1,x,y,R);g.addColorStop(0,color(p[3],.015));g.addColorStop(.85,color(p[index],.025));g.addColorStop(1,color(p[index],.13));c.fillStyle=g;c.beginPath();c.arc(x,y,R,0,TAU);c.fill();
    s.lenses.set(index,canvas);return canvas;
  }
  // Phrase-scale breathing, articulation and gradual development; no flashes.
  function motion(profile,time,progress){
    const beat=time*profile.pace/60,bar=beat/profile.meter;
    const phrase=.5-.5*cos(TAU*bar/8+profile.phase);
    const pulse=pow(.5+.5*cos(TAU*beat),4);
    const development=Number.isFinite(progress)?sin(clamp(progress)*Math.PI):.5+.5*sin(time*.021+profile.phase);
    return {beat,bar,pulse,phrase,swell:clamp(.18+phrase*.37+development*.35),
      power:profile.energy*(.48+phrase*.28+development*.24),phase:profile.phase,
      t:time*(.30+profile.energy),light:profile.light};
  }
  const scenes={
    silk(c,w,h,t,s,m){
      const p=s.p,u=Math.min(w,h),n=36,pan=sin(t*.023+m.phase)*h*.06;
      c.save();c.translate(w*.5,h*.49+pan);c.rotate(s.profile.tilt*.38);
      for(let k=0;k<n;k++){
        const f=k/(n-1),points=[],offset=(f-.5)*u*.55;
        for(let j=0;j<=100;j++){
          const q=j/100,x=(q-.5)*w*1.45,envelope=pow(sin(Math.PI*q),.8);
          const y=sin(q*TAU*1.05-m.t*.24+f*.95+m.phase)*u*(.13+.12*m.swell)*envelope+sin(q*TAU*2.2+m.t*.14)*u*.05+offset*(.28+.72*envelope);
          points.push([x,y]);
        }
        const g=c.createLinearGradient(-w*.6,0,w*.6,0);g.addColorStop(0,color(p[2],0));g.addColorStop(.25,color(p[2],.15+.35*sin(f*Math.PI)));g.addColorStop(.62,color(p[3],.62));g.addColorStop(1,color(p[4],0));
        stroke(c,points,g,k%9===0?1.8:.65);
      }
      c.restore();glow(c,w*.65,h*.45,u*.3,p[3],.06+m.power*.06);
    },
    nocturne(c,w,h,t,s,m){
      const p=s.p,u=Math.min(w,h),hz=h*.57,mx=w*(.55+.12*sin(m.phase)),my=h*.27,R=u*.065;
      glow(c,mx,my,R*7,p[2],.2);dot(c,mx,my,R,p[3],.92);
      // Restrained lunar surface, soft rim, and a long reflected light path.
      c.save();c.beginPath();c.arc(mx,my,R,0,TAU);c.clip();
      for(let i=0;i<9;i++)dot(c,mx+sin(i*13+m.phase)*R*.8,my+cos(i*7)*R*.7,R*(.09+.03*(i%3)),p[1],.065);
      c.restore();ellipse(c,mx,my,R+1,R+1,0,color(p[3],.2));
      for(let layer=0;layer<3;layer++){
        c.beginPath();c.moveTo(0,hz);
        for(let x=0;x<=w+12;x+=12)c.lineTo(x,hz-h*(.012+layer*.018)-(sin(x/w*9+layer+m.phase)+sin(x/w*17+layer*3))*(8+layer*3));
        c.lineTo(w,hz+5);c.lineTo(0,hz+5);c.fillStyle=color(p[0],.35+layer*.18);c.fill();
      }
      for(let i=0;i<100;i++){
        const f=i/100,y=hz+pow(f,1.5)*(h-hz),spread=u*(.015+f*.19),dx=sin(i*9.17+m.t*.42)*spread*.6;
        const width=(.22+.78*(.5+.5*sin(i*2.3+t*.5)))*spread;
        c.strokeStyle=color(i%3?p[2]:p[3],(.12+.32*(1-f))*(.65+.35*sin(i*7+t*.7)));c.lineWidth=.5+f*1.3;
        c.beginPath();c.moveTo(mx+dx-width,y);c.bezierCurveTo(mx+dx,y-2-f*4,mx+dx,y+2+f*4,mx+dx+width,y);c.stroke();
      }
      for(let i=0;i<26;i++){const y=hz+(i/26)*(h-hz);stroke(c,[[0,y],[w*.3,y+sin(i+t*.3)*3],[w*.7,y-2],[w,y]],color(p[2],.055),.6);}
    },
    bloom(c,w,h,t,s,m){
      const p=s.p,u=Math.min(w,h),cx=w*.54,cy=h*.45,turn=m.t*.028+m.phase;
      glow(c,cx,cy,u*.6,p[2],.1);
      c.save();c.translate(cx,cy);c.rotate(turn);
      const petals=7+(s.profile.seed%5);
      for(let layer=3;layer>=0;layer--){
        for(let k=0;k<petals;k++){
          c.save();c.rotate(k*TAU/petals+layer*.23+sin(m.t*.12+layer)*.07);
          const len=u*(.14+layer*.064)*(1+.06*m.phrase),width=len*(.3+.06*sin(t*.12+k));
          const g=c.createLinearGradient(0,0,len,0);g.addColorStop(0,color(p[3],.03));g.addColorStop(.68,color(layer%2?p[2]:p[4],.16));g.addColorStop(1,color(p[3],.48));
          c.beginPath();c.moveTo(0,0);c.bezierCurveTo(len*.35,-width,len*.95,-width*.7,len,0);c.bezierCurveTo(len*.8,width*.8,len*.22,width*.7,0,0);c.fillStyle=g;c.fill();c.strokeStyle=color(p[3],.19);c.lineWidth=.65;c.stroke();
          for(let vein=1;vein<4;vein++){c.beginPath();c.moveTo(0,0);c.quadraticCurveTo(len*.55,width*(vein-2)*.12,len*.9,0);c.strokeStyle=color(p[3],.07);c.stroke();}
          c.restore();
        }
      }
      for(let i=0;i<42;i++){const a=i*2.39996,r=u*.004*Math.sqrt(i);dot(c,cos(a)*r,sin(a)*r,.8,p[3],.6);}
      c.restore();
      for(const q of s.particles.slice(0,20)){const x=fract(q.x+t*.007*q.speed)*w,y=fract(q.y-t*.012*q.z)*h;ellipse(c,x,y,2+q.z*5,1+q.z*2,sin(t*.3+q.phase),color(p[q.color],.18),.7);}
    },
    torrent(c,w,h,t,s,m){
      const p=s.p,u=Math.min(w,h),scale=u*(.24+.06*m.swell),speed=.07+m.power*.08;
      c.save();c.translate(w*.53,h*.46);c.rotate(s.profile.tilt+t*.009);
      const position=(q,a)=>{const angle=a*speed*q.speed+q.phase;const r=scale*(.18+q.z*.92+.13*sin(angle*2+q.phase));return [cos(angle*1.13)*r*(1.5+.15*sin(a*.1)),sin(angle*1.71+q.x*3)*r*.86];};
      for(let i=0;i<180;i++){
        const q=s.particles[i],points=[];
        for(let j=0;j<25;j++)points.push(position(q,m.t-j*.07*(1+q.z)));
        stroke(c,points,color(p[q.color],.18+q.z*.62),.6+q.z*1.1);
        const head=points[0];dot(c,head[0],head[1],.6+q.z*1.2,p[3],.5+q.z*.4);
      }
      for(let k=0;k<7;k++){const pts=[];for(let j=0;j<=130;j++){const a=j/130*TAU;const r=scale*(.8+k*.055+sin(a*3+m.t*.15)*.07);pts.push([cos(a)*r*1.5,sin(a*1.7+m.t*.07)*r*.86]);}stroke(c,pts,color(p[4],.065),.55);}
      c.restore();
    },
    bokeh(c,w,h,t,s,m){
      const p=s.p,u=Math.min(w,h);
      for(const q of s.particles.slice(0,34)){
        const x=fract(q.x+sin(t*.025+q.phase)*.06)*w,y=fract(q.y-t*.004*q.speed)*h,R=u*(.018+q.z*.085)*(1+.025*m.pulse);
        const size=R*384/104;c.drawImage(lensSprite(s,q.color),x-size*.5,y-size*.5,size,size);
        ellipse(c,x,y,R,R,0,color(p[3],.06+q.z*.12),.55);
        c.beginPath();c.arc(x,y,R*.98,q.phase+t*.04,q.phase+t*.04+.65);c.strokeStyle=color(p[3],.35*q.z);c.lineWidth=.7;c.stroke();
      }
      glow(c,w*.55,h*.48,u*.4,p[3],.07*m.swell);
    },
    rain(c,w,h,t,s,m){
      const p=s.p,u=Math.min(w,h);
      for(let i=0;i<23;i++){
        const q=s.particles[i],age=fract(t*(.13+q.z*.08)+q.phase),x=q.x*w,y=(.25+q.y*.72)*h,R=(12+age*u*(.08+q.z*.1));
        for(let k=0;k<4;k++){const r=R-k*5;if(r>0)ellipse(c,x+sin(t*.2+q.phase)*8,y,r,r*.25,0,color(k===0?p[3]:p[2],sin(age*Math.PI)*(.26-k*.047)),.65);}
      }
      for(let i=0;i<60;i++){const q=s.particles[i],y=fract(q.y+t*(.16+q.z*.2))*h,x=q.x*w-y*.035;stroke(c,[[x,y],[x+1,y-u*(.008+q.z*.017)]],color(p[3],.1+q.z*.17),.55);}
      for(let i=0;i<13;i++){const pts=[];for(let j=0;j<=60;j++){const x=j/60*w;pts.push([x,h*(.3+i*.06)+sin(x/w*9+t*.3+i)*h*.01]);}stroke(c,pts,color(p[2],.035),.7);}
    },
    mist(c,w,h,t,s,m){
      const p=s.p;
      for(let k=0;k<36;k++){
        const f=k/35,pts=[];
        for(let j=0;j<=80;j++){const x=j/80*w,y=h*(.28+f*.42)+sin(x/w*5-m.t*.09+f*3+m.phase)*h*.11+sin(x/w*12+m.t*.06+f*4)*h*.035;pts.push([x,y]);}
        c.beginPath();c.moveTo(pts[0][0],pts[0][1]);for(const pt of pts)c.lineTo(...pt);c.lineTo(w,h);c.lineTo(0,h);c.closePath();c.fillStyle=color(f<.5?p[4]:p[2],.018);c.fill();stroke(c,pts,color(p[3],.07+.08*sin(f*Math.PI)),.65);
      }
      glow(c,w*(.57+.1*sin(t*.03)),h*.42,Math.min(w,h)*.25,p[3],.12);
    },
    mobile(c,w,h,t,s,m){
      const p=s.p,u=Math.min(w,h),cx=w*.52,cy=h*.46,swing=sin(m.t*.13+m.phase)*.14;
      c.save();c.translate(cx,cy);c.rotate(swing+s.profile.tilt*.3);
      const joints=[[-u*.22,-u*.11],[u*.15,-u*.04],[-u*.03,u*.2]];
      stroke(c,[[0,-h*.6],[0,-u*.22]],color(p[3],.42),.8);
      stroke(c,[[-u*.3,-u*.17],[u*.26,-u*.26]],color(p[3],.65),1);
      joints.forEach(([x,y],i)=>{
        const lift=sin(m.t*.19+i*1.8)*u*.018;stroke(c,[[x,-u*.21],[x,y+lift]],color(p[3],.45),.65);
        c.save();c.translate(x,y+lift);c.rotate(sin(m.t*.11+i)*.22);
        if(i===0){c.fillStyle=color(p[2],.9);c.beginPath();c.ellipse(0,0,u*.12,u*.155,-.4,0,TAU);c.fill();}
        if(i===1){c.fillStyle=color(p[3],.83);c.beginPath();c.moveTo(-u*.09,u*.05);c.bezierCurveTo(-u*.12,-u*.12,u*.12,-u*.13,u*.12,u*.03);c.bezierCurveTo(u*.07,u*.14,-u*.03,u*.1,-u*.09,u*.05);c.fill();}
        if(i===2){c.fillStyle=color(p[4],.9);c.beginPath();c.arc(0,0,u*.065,0,TAU);c.fill();}
        c.restore();
      });
      for(let k=0;k<3;k++)ellipse(c,u*.23,u*.2,u*(.022+k*.014),u*(.022+k*.014),0,color(p[3],.3),.65);
      c.restore();
    },
    seeds(c,w,h,t,s,m){
      const p=s.p,u=Math.min(w,h);
      for(const q of s.particles.slice(0,32)){
        const x=fract(q.x+t*.009*q.speed)*w,y=fract(q.y-t*.0035*q.z+sin(t*.1+q.phase)*.025)*h,L=u*(.013+q.z*.026);
        c.save();c.translate(x,y);c.rotate(-.5+sin(t*.23+q.phase)*.4);c.globalAlpha=.2+q.z*.65;
        stroke(c,[[0,0],[L*.1,L*.9]],color(p[2],.8),.65);c.strokeStyle=color(p[3],.65);c.lineWidth=.55;
        for(let k=0;k<13;k++){const a=-Math.PI/2+(k-6)*.19,dx=cos(a)*L,dy=sin(a)*L;c.beginPath();c.moveTo(0,0);c.quadraticCurveTo(dx*.4,dy*.6,dx,dy);c.stroke();stroke(c,[[dx-1.5,dy-2],[dx,dy],[dx+1.5,dy-2]],color(p[3],.7),.45);}
        dot(c,L*.1,L*.9,1,p[2],.9);c.restore();
      }
    },
    aurora(c,w,h,t,s,m){
      const p=s.p,u=Math.min(w,h);
      c.save();c.globalCompositeOperation=m.light?'multiply':'screen';
      for(let layer=0;layer<3;layer++){
        const upper=[],lower=[];
        for(let j=0;j<=100;j++){
          const f=j/100,x=f*w,top=h*(.24+layer*.085)+sin(f*7+m.t*.16+layer+m.phase)*h*.09+sin(f*15-m.t*.09)*h*.025;
          const length=h*(.18+.16*(.5+.5*sin(f*11+m.t*.2+layer)))*(.8+.25*m.swell);
          upper.push([x,top]);lower.push([x+sin(f*9+m.t*.12)*u*.08,top+length]);
        }
        const g=c.createLinearGradient(0,h*.15,0,h*.85);g.addColorStop(0,color(p[2],0));g.addColorStop(.28,color(p[layer===1?4:2],.19));g.addColorStop(.52,color(p[3],.13));g.addColorStop(.8,color(p[4],.025));g.addColorStop(1,color(p[4],0));
        c.beginPath();c.moveTo(...upper[0]);for(const point of upper)c.lineTo(...point);for(let j=lower.length-1;j>=0;j--)c.lineTo(...lower[j]);c.closePath();c.fillStyle=g;c.fill();
        stroke(c,upper,color(p[3],.17),.7);
        c.beginPath();
        for(let j=0;j<upper.length;j+=2){const a=upper[j],b=lower[j];c.moveTo(...a);c.bezierCurveTo(a[0]+(b[0]-a[0])*.2,a[1]+(b[1]-a[1])*.3,b[0],b[1]-(b[1]-a[1])*.2,...b);}
        c.strokeStyle=color(p[2],.055);c.lineWidth=.65;c.stroke();
      }
      c.restore();
      for(let layer=0;layer<4;layer++){const pts=[];for(let j=0;j<=100;j++){const f=j/100;pts.push([f*w,h*(.30+layer*.065)+sin(f*7+m.t*.16+layer+m.phase)*h*.09]);}stroke(c,pts,color(p[3],.10),.6);}
    },
    canon(c,w,h,t,s,m){
      const p=s.p,u=Math.min(w,h),voices=3+(s.profile.seed%2);
      for(let voice=0;voice<voices;voice++){
        for(let line=0;line<13;line++){
          const pts=[],delay=voice*.9,off=(line-6)*u*.003;
          for(let j=0;j<=130;j++){const f=j/130,x=f*w,y=h*(.35+voice*.105)+sin(f*TAU*1.3-m.t*.35-delay)*u*.105+sin(f*TAU*2.6-m.t*.175-delay)*u*.027+off;pts.push([x,y]);}
          stroke(c,pts,color(p[voice%2?4:2],.16+(line===6?.35:0)),line===6?1.3:.5);
        }
        for(let n=0;n<4;n++){const f=fract(m.t*.028+n*.25-voice*.1),x=f*w,y=h*(.35+voice*.105)+sin(f*TAU*1.3-m.t*.35-voice*.9)*u*.105+sin(f*TAU*2.6-m.t*.175-voice*.9)*u*.027;glow(c,x,y,u*.018,p[3],.5);dot(c,x,y,1.5,p[3],.9);}
      }
    },
    strings(c,w,h,t,s,m){
      const p=s.p,u=Math.min(w,h);
      c.save();c.translate(w*.5,h*.48);c.rotate(-.14+s.profile.tilt*.6);
      for(let k=0;k<48;k++){
        const f=k/47,pts=[],spread=(f-.5)*u*.48;
        for(let j=0;j<=110;j++){
          const q=j/110,x=(q-.5)*w*1.5,envelope=sin(q*Math.PI);
          const vibrato=sin(q*TAU*(1+k%3)+m.t*(.4+k*.004)+f*2)*envelope*u*(.018+.035*m.power);
          pts.push([x,spread*(.45+.55*envelope)+vibrato]);
        }
        stroke(c,pts,color(k%5===0?p[3]:p[2],k%5===0?.55:.18),k%5===0?1:.55);
      }
      c.restore();glow(c,w*.64,h*.45,u*.32,p[3],.05+m.phrase*.04);
    },
    cathedral(c,w,h,t,s,m){
      const p=s.p,u=Math.min(w,h),cx=w*.53,cy=h*.6;
      const arch=(width,height,offset)=>{
        const x=cx+offset,y=cy+h*.18;c.beginPath();c.moveTo(x-width,y);c.lineTo(x-width,cy-height*.15);c.bezierCurveTo(x-width,cy-height*.60,x-width*.3,cy-height*.95,x,cy-height);c.bezierCurveTo(x+width*.3,cy-height*.95,x+width,cy-height*.60,x+width,cy-height*.15);c.lineTo(x+width,y);
      };
      for(let k=9;k>=0;k--){const f=k/9,width=u*(.09+f*.43),height=h*(.32+f*.3);arch(width,height,0);c.strokeStyle=color(k%3===0?p[3]:p[2],.15+(1-f)*.28);c.lineWidth=k%3===0?1.3:.65;c.stroke();}
      for(let k=0;k<7;k++){
        const x=cx+(k-3)*u*.04,bend=sin(m.t*.07+k)*u*.03;
        const g=c.createLinearGradient(x,h*.22,x,h*.86);g.addColorStop(0,color(p[k%2?4:3],0));g.addColorStop(.25,color(p[k%2?4:3],.09+.04*m.phrase));g.addColorStop(1,color(p[2],0));
        c.fillStyle=g;c.beginPath();c.moveTo(x,h*.22);c.lineTo(x+u*.02+bend,h*.86);c.lineTo(x-u*.02+bend,h*.86);c.closePath();c.fill();
      }
      for(const q of s.particles.slice(0,35)){const x=w*(.26+q.x*.55)+sin(t*.12+q.phase)*8,y=fract(q.y-t*.004*q.z)*h;dot(c,x,y,.5+q.z*.7,p[3],.15+q.z*.25);}
      glow(c,cx,h*.32,u*.17,p[3],.11+m.swell*.07);
    },
    orbit(c,w,h,t,s,m){
      const p=s.p,u=Math.min(w,h),cx=w*.55,cy=h*.45;
      glow(c,cx,cy,u*.28,p[2],.14);dot(c,cx,cy,u*.018,p[3],.8);glow(c,cx,cy,u*.055,p[3],.42);
      c.save();c.translate(cx,cy);c.rotate(-.3+s.profile.tilt);
      for(let k=0;k<9;k++){
        const r=u*(.065+k*.04),ry=r*(.46+.1*sin(k+m.phase)),angle=m.t*(.18/(1+k*.25))*(k%2?-1:1)+k*2.4;
        ellipse(c,0,0,r,ry,k*.11,color(p[k%3===0?3:2],.13),.65);
        c.save();c.rotate(k*.11);const x=cos(angle)*r,y=sin(angle)*ry;
        c.beginPath();c.ellipse(0,0,r,ry,0,angle-.32,angle);c.strokeStyle=color(p[3],.55);c.lineWidth=1;c.stroke();dot(c,x,y,1+k*.3,p[k%2?4:3],.9);if(k%3===0)glow(c,x,y,10,p[3],.25);c.restore();
      }
      // Slow precessing rosette: a second, independent scale of motion.
      const pts=[];for(let j=0;j<=360;j++){const a=j/360*TAU,r=u*(.37+.022*sin(a*8+m.t*.11));pts.push([cos(a)*r,sin(a)*r*.7]);}stroke(c,pts,color(p[4],.15),.55,true);c.restore();
    },
    tide(c,w,h,t,s,m){
      const p=s.p,u=Math.min(w,h),phase=m.phase;
      for(let k=0;k<52;k++){
        const f=k/51,pts=[];
        for(let j=0;j<=95;j++){
          const q=j/95,x=q*w;
          const y=h*(.25+f*.54)+sin(q*7+m.t*.22+f*4+phase)*u*(.045+.025*m.swell)+sin(q*13-m.t*.17+f*9)*u*.016;
          pts.push([x,y]);
        }
        stroke(c,pts,color(k%8===0?p[3]:p[k%2?2:4],k%8===0?.48:.18),k%8===0?1.1:.6);
      }
      for(let k=0;k<4;k++){const x=w*(.2+k*.21)+sin(t*.09+k)*u*.05,y=h*.5+sin(t*.12+k*2)*u*.1;glow(c,x,y,u*.06,p[3],.07);}
    },
    waltz(c,w,h,t,s,m){
      const p=s.p,u=Math.min(w,h),cx=w*.53,cy=h*.45;
      c.save();c.translate(cx,cy);c.rotate(m.t*.04+m.phase);
      for(let voice=0;voice<3;voice++){
        c.save();c.rotate(voice*TAU/3);
        for(let k=0;k<16;k++){
          const pts=[],r=u*(.10+k*.012);
          for(let j=0;j<=110;j++){const a=j/110*TAU*1.15+m.t*.045;const radius=r*(.65+.35*sin(a*.7+m.t*.07));pts.push([cos(a)*radius+u*.12,sin(a)*radius*.7]);}
          stroke(c,pts,color(p[voice===1?4:2],.12+k/16*.23),.55+(k%6===0?.6:0));
        }
        const a=m.t*.16;glow(c,u*.12+cos(a)*u*.18,sin(a)*u*.13,u*.025,p[3],.45);c.restore();
      }
      c.restore();
    },
    storm(c,w,h,t,s,m){
      const p=s.p,u=Math.min(w,h),cx=w*.56,cy=h*.43;
      c.save();c.translate(cx,cy);c.rotate(s.profile.tilt+sin(t*.04)*.1);
      for(let k=0;k<24;k++){
        const a=k/24*TAU,r=u*(.12+.08*sin(k*9+m.t*.17))*(.9+.15*m.phrase),length=u*(.16+.14*(.5+.5*sin(k*13+m.t*.12)));
        const x=cos(a)*r,y=sin(a)*r*.8;
        const g=c.createLinearGradient(x,y,x+cos(a)*length,y+sin(a)*length);g.addColorStop(0,color(p[k%3?2:3],.42));g.addColorStop(1,color(p[4],0));
        c.fillStyle=g;c.beginPath();c.moveTo(x,y);c.lineTo(x+cos(a-.045)*length,y+sin(a-.045)*length*.8);c.lineTo(x+cos(a+.02)*length,y+sin(a+.02)*length*.8);c.closePath();c.fill();
      }
      for(let k=0;k<9;k++){
        const pts=[];for(let j=0;j<=70;j++){const f=j/70,x=(f-.5)*w*1.35,y=sin(f*13+m.t*.28+k*.15)*u*.05+sin(f*31-m.t*.12)*u*.023+(k-4)*u*.018;pts.push([x,y]);}stroke(c,pts,color(k%3? p[2]:p[3],.2+(k===4?.35:0)),k===4?1.5:.65);
      }
      c.restore();
    },
    garden(c,w,h,t,s,m){
      const p=s.p,u=Math.min(w,h);
      for(let k=0;k<11;k++){
        const q=s.particles[k],x=w*(.09+k*.082),base=h*.82,height=u*(.15+q.z*.38),sway=sin(m.t*.17+q.phase)*u*.035;
        c.strokeStyle=color(p[3],.25+q.z*.25);c.lineWidth=.7;c.beginPath();c.moveTo(x,base);c.bezierCurveTo(x-sway,base-height*.4,x+sway,base-height*.75,x+sway,base-height);c.stroke();
        c.save();c.translate(x+sway,base-height);c.rotate(sin(t*.1+q.phase)*.18);
        const R=u*(.017+q.z*.022),petals=5+(k%3);
        for(let n=0;n<petals;n++){c.save();c.rotate(n*TAU/petals);c.beginPath();c.moveTo(0,0);c.bezierCurveTo(R*.45,-R*.42,R*1.3,-R*.35,R*1.35,0);c.bezierCurveTo(R*1.2,R*.45,R*.3,R*.45,0,0);c.fillStyle=color(k%2?p[2]:p[4],.14+q.z*.16);c.fill();c.strokeStyle=color(p[2],.48);c.lineWidth=.6;c.stroke();c.restore();}
        dot(c,0,0,1.5,p[4],.75);c.restore();
        for(let leaf=0;leaf<2;leaf++){const yy=base-height*(.28+leaf*.24),side=leaf%2?-1:1;c.beginPath();c.moveTo(x,yy);c.quadraticCurveTo(x+side*u*.045,yy-u*.045,x+side*u*.06,yy-u*.03);c.quadraticCurveTo(x+side*u*.03,yy,x,yy);c.fillStyle=color(p[3],.12);c.fill();c.strokeStyle=color(p[3],.25);c.lineWidth=.6;c.stroke();}
      }
      for(const q of s.particles.slice(20,45)){const x=fract(q.x+t*.008*q.z)*w,y=fract(q.y-t*.009*q.z)*h;dot(c,x,y,.6+q.z,p[4],.2+q.z*.3);}
    },
    embers(c,w,h,t,s,m){
      const p=s.p,u=Math.min(w,h);
      for(const q of s.particles){
        const age=fract(t*(.04+q.z*.025)+q.phase),x=w*.52+sin(q.phase+age*3)*u*(.07+age*.48),y=h*(.92-age*1.07),alpha=sin(age*Math.PI)*q.z;
        const tail=u*(.006+q.z*.02)*(1+m.power);
        stroke(c,[[x-sin(q.phase+age*3)*tail*.4,y+tail],[x,y]],color(p[q.color],alpha*.65),.6+q.z*.7);dot(c,x,y,.5+q.z*.7,p[3],alpha*.8);
        if(q.z>.85)glow(c,x,y,u*.012,p[2],alpha*.12);
      }
      for(let k=0;k<6;k++){const pts=[];for(let j=0;j<=85;j++){const f=j/85,y=h*(.95-f*1.05),x=w*.52+sin(f*6+m.t*.15+k*.5)*u*(.02+f*.22)+(k-2.5)*u*.016;pts.push([x,y]);}stroke(c,pts,color(p[2],.09),.65);}
      glow(c,w*.52,h*.85,u*.25,p[2],.15+.08*m.swell);
    },
    prism(c,w,h,t,s,m){
      const p=s.p,u=Math.min(w,h),cx=w*.53,cy=h*.44;
      c.save();c.translate(cx,cy);c.rotate(m.phase*.2+sin(m.t*.08)*.1);
      const vertices=[];
      for(let k=0;k<12;k++){const a=k/12*TAU,r=u*(.24+.035*sin(m.t*.13+k*1.7));vertices.push([cos(a)*r,sin(a)*r]);}
      for(let k=0;k<12;k++){
        const a=vertices[k],b=vertices[(k+1)%12],center=[sin(m.t*.11)*u*.07,cos(m.t*.13)*u*.06];
        const g=c.createLinearGradient(...a,...b);g.addColorStop(0,color(p[k%3===0?3:2],.04));g.addColorStop(1,color(p[k%2?4:2],.22));c.beginPath();c.moveTo(...a);c.lineTo(...b);c.lineTo(...center);c.closePath();c.fillStyle=g;c.fill();stroke(c,[a,b,center,a],color(p[3],.24),.7);
        for(let line=1;line<5;line++){const f=line/5;stroke(c,[[a[0]*(1-f)+center[0]*f,a[1]*(1-f)+center[1]*f],[b[0]*(1-f)+center[0]*f,b[1]*(1-f)+center[1]*f]],color(p[3],.08),.5);}
      }
      for(let k=0;k<4;k++)ellipse(c,0,0,u*(.30+k*.025),u*(.30+k*.025),0,color(p[3],.14-k*.025),.55);c.restore();
    },
    procession(c,w,h,t,s,m){
      const p=s.p,u=Math.min(w,h);
      c.save();c.translate(w*.53,h*.46);c.rotate(-.18+s.profile.tilt*.25);
      const cols=27,rows=9,gap=u*.031;
      for(let x=0;x<cols;x++)for(let y=0;y<rows;y++){
        const f=x/(cols-1),distance=Math.abs(y-(rows-1)/2)/4,phrase=.5+.5*sin(f*TAU-m.t*.45+y*.32);
        const height=gap*(.3+phrase*(1.2+m.power*.8)),xx=(x-(cols-1)/2)*gap,yy=(y-(rows-1)/2)*gap*1.9;
        c.fillStyle=color(p[(x+y)%5===0?3:2],.10+phrase*.45*(1-distance*.35));c.fillRect(xx-gap*.20,yy-height*.5,gap*.4,height);
        if(y===4){c.fillStyle=color(p[3],.6);c.fillRect(xx-gap*.20,yy-height*.5,gap*.4,.7);}
      }
      for(let y=-1;y<=1;y++)stroke(c,[[-u*.46,y*u*.29],[u*.46,y*u*.29]],color(p[3],.12),.7);c.restore();
    },
    dunes(c,w,h,t,s,m){
      const p=s.p,u=Math.min(w,h);
      for(let k=0;k<54;k++){
        const f=k/53,pts=[];
        for(let j=0;j<=95;j++){const q=j/95;pts.push([q*w,h*(.23+f*.55)+sin(q*6.5+m.t*.07+f*2+m.phase)*u*.08+cos(q*11-m.t*.05+f*4)*u*.025]);}
        stroke(c,pts,color(k%7===0?p[3]:p[2],k%7===0?.48:.19),k%7===0?1:.55);
      }
      const R=u*.045,x=w*.69,y=h*.24;ellipse(c,x,y,R,R,0,color(p[4],.55),.8);for(let k=1;k<4;k++)ellipse(c,x,y,R+k*4,R+k*4,0,color(p[4],.1),.6);
    }
  };
  function create(id){
    const profile=catalog.get(id);if(!profile)return null;
    return {light:profile.light,init:(w,h)=>init(profile,w,h),
      draw(c,w,h,time,state,info={}){
        if(!(w>0&&h>0))return;
        const t=Math.max(0,Number.isFinite(time)?time:0),m=motion(profile,t,info.progress);
        c.save();c.globalAlpha=1;c.globalCompositeOperation='source-over';c.shadowBlur=0;c.filter='none';c.lineCap='round';c.lineJoin='round';
        backdrop(c,w,h,t,state,m);
        // A small, smooth articulation is shared by a work's whole composition.
        // Main gestures still differ by scene, phrase and movement energy.
        const breath=1+(m.pulse-.2)*(.004+profile.energy*.008);
        c.save();c.translate(w*.53,h*.46);c.scale(breath,breath);c.translate(-w*.53,-h*.46);
        scenes[profile.scene](c,w,h,t,state,m);c.restore();finish(c,w,h,state);c.restore();
      }};
  }
  window.ClassicaOriginal=Object.freeze({create,has:id=>catalog.has(id),
    list:()=>[...catalog.values()].map(p=>({id:p.id,scene:p.scene,light:p.light})),version:'20261025-original2'});
})();
