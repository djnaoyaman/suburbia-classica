/* Natural light studies for SUBURBIA CLASSICA. No media downloads required. */
window.ClassicaRealism = (() => {
  'use strict';
  // Every entry is deliberate: [scene family, variation, scene description].
  const catalog = {
    'fur-elise':[15,0,'窓辺の手紙と一輪の花'],
    'moonlight':[0,0,'月明かりが揺れる静かな湖'],
    'tristesse':[5,0,'夕暮れの湖と遠ざかる光'],
    'fantaisie-impromptu':[21,0,'岩をめぐり流れる渓流'],
    'nocturne-9-2':[5,1,'夜の湖畔に映る街の灯'],
    'raindrop':[2,0,'雨粒が水面に残す波紋'],
    'clair-de-lune':[1,0,'薄雲を透かす月と水面'],
    'gymnopedie-1':[7,0,'石壁に落ちる静かな午後の光'],
    'traumerei':[20,0,'夕陽を受けて漂う綿毛'],
    'liebestraum-3':[16,0,'柔らかな光に開く薔薇'],
    'flaxen-hair':[3,0,'金色の穂を揺らす草原の風'],
    'arabesque-1':[21,1,'木漏れ日が描く水の綾'],
    'prelude-bwv846':[9,0,'朝の光に浮かぶピアノの鍵盤'],
    'pavane':[7,1,'王宮の燭台に揺れる小さな炎'],
    'nocturne-20':[5,2,'深夜の水面と遠い窓明かり'],
    'pathetique-2':[9,1,'陰影に包まれた静かな鍵盤'],
    'k331-1':[22,0,'朝の光が差す古い舞踏室'],
    'prelude-7':[3,1,'風にそよぐ小さな野の花'],
    'brahms-waltz-15':[22,1,'琥珀色の灯に照らされた舞踏室'],
    'mendelssohn-spring-song':[3,2,'春の光の中に咲く花々'],
    'goldberg-aria':[7,2,'夜の書斎に灯る一本の蝋燭'],
    'reverie':[17,0,'星空にゆっくり流れるオーロラ'],
    'gnossienne-1':[4,0,'霧に沈む静かな林'],
    'waltz-64-2':[10,0,'夜の舞台に垂れる葡萄色の幕'],
    'waltz-69-1':[6,0,'夕暮れに舞い落ちる葉'],
    'tchaikovsky-october':[6,1,'秋の林と風に翻る落ち葉'],
    'k310-2':[9,2,'午後の窓辺に置かれたピアノ'],
    'schubert-impromptu-90-3':[21,2,'緩やかな川面を流れる光'],
    'brahms-op118-2':[7,3,'木の机と穏やかな燭光'],
    'canon':[9,3,'斜光に照らされた三本の弦'],
    'air-g-string':[9,4,'弦と磨かれた木肌の陰影'],
    'jesu-joy':[8,0,'聖堂の窓から差す朝の光'],
    'rach-pc2-2':[5,3,'夜明け前の湖と静かな雲'],
    'schubert-ave-maria':[8,1,'青い窓明かりに包まれた聖堂'],
    'liebesgruss':[15,1,'朝の手紙に添えられた薔薇'],
    'vocalise':[5,4,'霞の中に広がる湖の水平線'],
    'brahms-lullaby':[7,4,'夜更けの部屋に灯る柔らかな光'],
    'mozart-pc21-2':[5,5,'明るい空と雲を映す湖'],
    'faure-apres-un-reve':[17,1,'薄明の空にほどける光の帯'],
    'paganini-var18':[9,5,'暖かな光を返すヴァイオリンの弦'],
    'solveigs-song':[11,0,'北国の山々と薄い霧'],
    'beethoven-5':[19,0,'岩山を覆う重い嵐の雲'],
    'beethoven-9':[11,1,'山の稜線に広がる夜明け'],
    'vivaldi-spring':[3,3,'春風に揺れる草花と木漏れ日'],
    'largo-new-world':[11,2,'遠い山並みに沈む夕陽'],
    'bolero':[10,1,'暖かな舞台の光と深紅の布'],
    'pomp-circumstance-1':[22,2,'金色の光をたたえる大広間'],
    'eine-kleine':[22,3,'月明かりの差す夜の舞踏室'],
    'pictures':[14,0,'額装された絵画が並ぶ回廊'],
    'le-cygne':[12,0,'静かな湖を滑る白鳥と航跡'],
    'jupiter':[13,0,'陽光を受ける木星の雲の縞'],
    'toccata-fugue-dm':[8,2,'大聖堂の高い柱と深い陰影'],
    'farandole':[3,4,'南仏の風に揺れる草原'],
    'carmen-prelude':[10,2,'舞台照明を受ける緋色の幕'],
    'cavalleria-intermezzo':[8,3,'夕陽が差し込む村の聖堂'],
    'barber-adagio':[9,6,'静かな陰影に重なる弦'],
    'nessun-dorma':[5,6,'夜明けを待つ湖と遠い灯'],
    'brindisi':[18,0,'祝宴の灯を映すグラスと泡'],
    'habanera':[16,1,'深紅の薔薇に落ちる舞台の光'],
    'orpheus-overture':[10,3,'金色の照明に揺れる舞台の幕'],
    'william-tell-overture':[11,3,'朝の空気に浮かぶアルプスの稜線'],
    'queen-of-night':[17,2,'深い夜空と冷たい光のカーテン'],
    'toreador':[10,4,'強い斜光を受ける赤い布'],
    'figaro-letter-duet':[15,2,'そよ風がめくる窓辺の手紙'],
    'flower-duet':[3,5,'水辺の光に咲く二輪の花'],
    'o-mio-babbino':[5,7,'夕陽に染まる水面と遠い街'],
    'lascia-ch-io-pianga':[2,0,'静かな雨と消えてゆく水の輪'],
    'rojo-no-tsuki':[1,1,'古い石垣の上に浮かぶ月'],
    'heidenroslein':[16,2,'朝露をたたえる野ばら'],
    'ave-verum-corpus':[8,4,'聖堂の石床に届く穏やかな光'],
    'erlkonig':[4,1,'夜風に揺れる暗い森'],
    'caccini-ave-maria':[8,5,'蝋燭色の光に包まれた聖堂'],
    'faure-pie-jesu':[8,6,'白い朝霧のような聖堂の光'],
    'verdi-dies-irae':[19,1,'赤銅色の光が差す嵐の空']
  };

  const fragment = `
    precision highp float;
    uniform vec2 resolution;
    uniform float time;
    uniform float scene;
    float hash(vec2 p) { return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
    float noise(vec2 p) {
      vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
      return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+1.0),f.x),f.y);
    }
    float fbm(vec2 p) {
      float v=0.0, a=0.5;
      for(int i=0;i<5;i++){v+=a*noise(p);p=mat2(1.6,-1.2,1.2,1.6)*p+3.7;a*=0.5;}
      return v;
    }
    uniform float variation;
    uniform float seed;
    float disk2(vec2 p,vec2 scale) {return length(p/scale);}
    float shape(float d) {return 1.0-smoothstep(-0.002,0.002,d);}
    vec3 warmLight=vec3(1.0,0.72,0.39);
    vec3 coolLight=vec3(0.39,0.58,0.74);
    vec3 lightSky(vec2 uv,float night) {
      vec3 c=mix(vec3(0.62,0.68,0.63),vec3(0.16,0.31,0.41),uv.y);
      c=mix(c,mix(vec3(0.16,0.21,0.29),vec3(0.015,0.025,0.055),uv.y),night);
      float cl=fbm(vec2(uv.x*3.1+time*0.007,uv.y*4.5)+seed);
      c=mix(c,vec3(0.8,0.76,0.64)*(1.0-night*0.86),smoothstep(0.43,0.73,cl)*0.58);
      return c;
    }
    vec3 landscape(vec2 uv,float aspect,float v) {
      float night=(v==1.0||v==2.0||v==6.0)?1.0:((v==0.0||v==3.0||v==7.0)?0.48:0.0);
      float dawn=(v==3.0||v==7.0||v==0.0)?1.0:0.0;
      vec2 q=uv;q.x=(q.x-0.5)*aspect+0.5;
      vec3 c=lightSky(q,night);
      float sunset=(v==0.0||v==7.0)?1.0:0.0;
      c=mix(c,c*vec3(1.25,0.72,0.52)+vec3(0.10,0.025,0.008),sunset*0.7);
      float sx=0.65+0.1*sin(seed), sy=0.5+(v==3.0?0.06:0.14);
      c+=warmLight*exp(-length((q-vec2(sx,sy))*vec2(1,1.3))*5.0)*dawn*0.25;
      if(uv.y<0.48){
        float depth=0.025/(0.50-uv.y);
        vec2 p=vec2(q.x*depth,depth);
        float wave=sin(p.x*60.0+sin(p.y*28.0)+time*0.7)*0.004;
        vec2 r=vec2(q.x+wave,0.96-uv.y);
        c=lightSky(r,night)*vec3(0.52,0.62,0.65);
        c=mix(c,c*vec3(1.25,0.72,0.52),sunset*0.7);
        float glint=exp(-pow((q.x-sx+wave*4.0)/(0.018+(0.48-uv.y)*0.17),2.0));
        c+=warmLight*glint*(0.08+0.10*sin(depth*65.0+time*0.4))*dawn;
        c*=0.85+0.15*noise(p*90.0+time*0.08);
      }
      for(int k=0;k<3;k++){
        float f=float(k),h=0.48+0.035*fbm(vec2(q.x*(5.0+f*3.0)+seed,f))+f*0.016;
        float land=shape(h-uv.y)*shape(uv.y-h-0.03-f*0.006);
        c=mix(c,mix(vec3(0.055,0.09,0.095),vec3(0.22,0.28,0.27),f*0.3)*(1.0-night*0.6),land);
      }
      if(night>0.5||v==7.0){
        for(int i=0;i<24;i++){
          float f=float(i),x=0.2+hash(vec2(f,seed))*0.65,y=0.49+hash(vec2(f,4))*0.025;
          float d=length((q-vec2(x,y))*vec2(1,1.7));
          c+=warmLight*exp(-d*1100.0)*0.8;
          if(uv.y<0.48)c+=warmLight*exp(-abs(q.x-x)*600.0)*exp(-abs(uv.y-0.43)*17.0)*0.06;
        }
      }
      return c;
    }
    vec3 mountain(vec2 uv,float a,float v,bool storm) {
      vec2 q=vec2((uv.x-0.5)*a+0.5,uv.y);
      float night=storm?0.75:0.0;
      vec3 c=lightSky(q,night);
      if(v==2.0)c=c*vec3(1.15,0.75,0.56);
      float sun=exp(-length((q-vec2(0.72,0.65))*vec2(1,1.3))*7.0);
      c+=warmLight*sun*(storm?0.09:0.38);
      if(storm){
        float n=fbm(vec2(q.x*3.5-time*0.016,q.y*5.0)+seed);
        c=mix(vec3(0.035,0.05,0.065),vec3(0.27,0.29,0.29),n*n);
        c+=mix(vec3(0.4,0.44,0.48),vec3(0.7,0.23,0.09),v)*sun*0.22;
      }
      for(int k=0;k<5;k++){
        float f=float(k),x=q.x*(2.0+f*0.7)+seed*0.13+f*9.0;
        float h=0.3+0.36*noise(vec2(x,3.0))+0.10*noise(vec2(x*3.0,8.0))-f*0.065;
        float rough=fbm(vec2(x*15.0,uv.y*60.0));
        vec3 rock=mix(vec3(0.10,0.14,0.14),vec3(0.30,0.31,0.27),rough);
        float snow=smoothstep(0.42,0.61,uv.y+noise(vec2(x*13.0,uv.y*40.0))*0.11+f*0.05);
        rock=mix(rock,vec3(0.72,0.76,0.72)*(0.60+rough*0.4),snow*(storm?0.2:0.85));
        rock=mix(rock,c,0.58-f*0.10);
        c=mix(c,rock,shape(uv.y-h));
      }
      return c;
    }
    vec3 meadow(vec2 uv,float a,float v) {
      vec2 q=vec2((uv.x-0.5)*a+0.5,uv.y);
      vec3 c=lightSky(q,0.0);
      vec2 sun=vec2(0.72,0.72);c+=warmLight*exp(-length(q-sun)*5.0)*0.33;
      float horizon=0.44+noise(vec2(q.x*3.0+seed,2.0))*0.045;
      c=mix(c,vec3(0.17,0.24,0.13),shape(uv.y-horizon));
      c=mix(c,vec3(0.095,0.14,0.065),shape(uv.y-0.34)*(1.0-uv.y));
      for(int i=0;i<64;i++){
        float f=float(i),z=hash(vec2(f,seed)),x=(hash(vec2(f,8.0))-0.5)*a+0.5;
        if(v==5.0&&i<2){z=0.05;x=i==0?0.38:0.64;}
        float base=-0.14+z*0.51, height=0.11+0.32*(1.0-z);
        if(v==5.0&&i<2){base=0.04;height=i==0?0.45:0.39;}
        float wind=sin(time*0.45+z*3.0+f*0.3)*0.018+sin(time*0.23+f)*0.009;
        float k=clamp((uv.y-base)/height,0.0,1.0);
        float stemx=x+wind*k*k;
        float stem=exp(-abs(q.x-stemx)*(1400.0-600.0*z))*step(base,uv.y)*step(uv.y,base+height);
        c=mix(c,mix(vec3(0.18,0.25,0.08),vec3(0.56,0.56,0.25),z),stem*0.85);
        vec2 p=q-vec2(x+wind,base+height);
        float flowerSize=(v==0.0?0.006:0.013)*(1.0-z*0.5);
        if(v==5.0&&i<2)flowerSize=0.032;
        float angle=atan(p.y,p.x),r=length(p);
        float petals=flowerSize*(0.78+0.22*cos(angle*5.0+f));
        float bloom=1.0-smoothstep(petals,petals+0.002,r);
        vec3 color=v==0.0?vec3(0.65,0.55,0.27):mix(vec3(0.88,0.77,0.57),vec3(0.66,0.43,0.48),hash(vec2(f,3.0)));
        color*=0.72+0.28*cos(angle*5.0);
        c=mix(c,color,bloom);c=mix(c,vec3(0.6,0.39,0.1),exp(-r*r/(flowerSize*flowerSize*0.035)));
      }
      return c;
    }
    vec3 forest(vec2 uv,float a,float v) {
      vec2 q=vec2((uv.x-0.5)*a+0.5,uv.y);
      vec3 c=mix(vec3(0.12,0.16,0.15),vec3(0.27,0.30,0.26),uv.y);
      c*=v==1.0?0.45:1.0;
      for(int k=0;k<4;k++){
        float f=float(k);
        for(int i=0;i<13;i++){
          float fi=float(i),x=(fi/12.0-0.5)*a*1.4+0.5+hash(vec2(fi,f+seed))*0.11;
          float wind=sin(time*(v==1.0?0.65:0.12)+fi)*0.006*uv.y*uv.y;
          float width=0.007+f*0.004;
          float trunk=1.0-smoothstep(width,width+0.002,abs(q.x-x-wind));
          float bark=noise(vec2(q.x*800.0,uv.y*22.0)+fi);
          vec3 wood=mix(vec3(0.025,0.037,0.03),vec3(0.11,0.12,0.08),bark)*(1.0-v*0.4);
          wood=mix(wood,c,0.66-f*0.19);
          c=mix(c,wood,trunk);
          float branch=abs(q.x-x-wind-(uv.y-0.58)*(mod(fi,2.0)*2.0-1.0)*0.28);
          c=mix(c,wood,(1.0-smoothstep(width*0.26,width*0.4,branch))*smoothstep(0.55,0.7,uv.y));
        }
      }
      float fog=fbm(vec2(q.x*3.0+time*0.013,uv.y*6.0));
      c=mix(c,vec3(0.25,0.30,0.28)*(1.0-v*0.65),fog*0.23);
      c*=0.72+0.28*uv.y;
      return c;
    }
    vec3 autumn(vec2 uv,float a) {
      vec3 c=forest(uv,a,0.0)*vec3(1.35,0.94,0.62);
      vec2 q=vec2((uv.x-0.5)*a,uv.y);
      for(int i=0;i<24;i++){
        float f=float(i),z=hash(vec2(f,seed)),fall=fract(hash(vec2(f,1.0))+time*(0.013+z*0.012));
        vec2 center=vec2((hash(vec2(f,3.0))-0.5)*a+sin(time*0.21+f)*0.065,1.12-fall*1.25);
        vec2 p=q-center;
        float rot=sin(time*0.5+f)*1.2+f;
        p=mat2(cos(rot),-sin(rot),sin(rot),cos(rot))*p;
        p.x/=0.3+0.7*abs(cos(time*0.38+f));
        float size=0.008+z*0.019;
        float d=length(p/vec2(size,size*1.8));
        float serration=0.05*sin(atan(p.y,p.x)*13.0);
        float mask=1.0-smoothstep(0.91,1.05,d+serration);
        vec3 leaf=mix(vec3(0.55,0.18,0.045),vec3(0.82,0.49,0.10),z);
        leaf*=0.65+0.35*smoothstep(-size,size,p.x);
        float vein=exp(-abs(p.x)*1800.0)+0.25*pow(max(0.0,cos((p.y+abs(p.x)*0.7)*1800.0)),16.0);
        leaf=mix(leaf,leaf*0.55,vein*0.5);
        c=mix(c,leaf,mask);
      }
      return c;
    }
    vec3 curtain(vec2 uv,float a,float v) {
      vec2 q=vec2((uv.x-0.5)*a,uv.y);
      float sway=sin(time*0.18+q.y*2.0)*0.012*q.y;
      float folds=sin((q.x+sway)*(35.0+v*3.0)+sin(q.x*7.0+seed)*0.6);
      float micro=noise(q*vec2(1500,700));
      vec3 base=mix(vec3(0.24+v*0.012,0.014+v*0.002,0.026),vec3(0.18,0.035,0.10),v==0.0?0.75:0.0);
      float lighting=pow(max(0.0,folds*0.5+0.5),2.0)*0.8+0.16;
      vec3 c=base*lighting*(0.93+micro*0.07);
      float beam=exp(-pow((q.x-0.25-uv.y*0.25)*1.8,2.0));
      c+=vec3(0.35,0.11,0.025)*beam*pow(max(0.0,folds),10.0)*0.5;
      c*=0.6+0.4*uv.y;
      return c;
    }
    vec3 piano(vec2 uv,float a,float v) {
      vec2 q=vec2((uv.x-0.5)*a,uv.y);
      float stringMode=step(2.5,v);
      float depth=1.0/(0.40+(1.0-uv.y)*1.25);
      vec2 p=vec2(q.x*depth,(uv.y-0.36)*depth);
      vec3 wood=mix(vec3(0.075,0.033,0.016),vec3(0.31,0.14,0.052),noise(vec2(p.x*13.0,p.y*350.0)));
      wood*=0.6+0.4*fbm(p*10.0+seed);
      vec3 c=wood;
      if(stringMode<0.5){
        float key=fract(p.x*10.0), row=step(0.05,uv.y)*step(uv.y,0.76);
        vec3 ivory=mix(vec3(0.55,0.52,0.43),vec3(0.86,0.84,0.73),smoothstep(0.0,0.05,min(key,1.0-key)));
        ivory*=0.68+0.32*uv.y;
        c=mix(c,ivory,row);
        float n=mod(floor(p.x*10.0),7.0);
        float black=step(0.76,key)*step(0.36,uv.y)*step(uv.y,0.76)*(1.0-step(0.1,abs(n-2.0)))*(1.0-step(0.1,abs(n-6.0)));
        // Natural black-key groups: two, then three.
        black=step(0.73,key)*step(0.34,uv.y)*step(uv.y,0.76)*step(0.1,abs(n-2.0))*step(0.1,abs(n-6.0));
        vec3 ebony=vec3(0.012,0.016,0.018)+vec3(0.055)*pow(max(0.0,1.0-abs(key-0.79)*10.0),12.0);
        c=mix(c,ebony,black);
        c*=0.82+0.18*(1.0-smoothstep(0.6,0.74,uv.y));
      } else {
        for(int i=0;i<4;i++){
          if(v==3.0&&i==3)break;
          float f=float(i),x=(f-(v==3.0?1.0:1.5))*0.11;
          float d=abs(p.x-x-0.09*p.y);
          float wire=exp(-d*1300.0);
          c=mix(c,vec3(0.66,0.61,0.47),wire);
          c+=vec3(0.3,0.24,0.13)*exp(-d*300.0)*0.2;
        }
        float curve=length((p-vec2(0.44,0.15))/vec2(0.3,0.8));
        c=mix(c,vec3(0.025,0.013,0.008),1.0-smoothstep(0.12,0.16,abs(curve-1.0)));
      }
      float window=sin(q.x*9.0+uv.y*5.0+seed)*0.5+0.5;
      float light=exp(-length(q-vec2(0.4,0.65))*1.6)*(0.65+0.35*window);
      c*=0.45+light*0.85;
      c+=warmLight*light*0.06;
      return c;
    }
    vec3 hall(vec2 uv,float a,float v,bool gallery,bool ballroom) {
      vec2 q=vec2((uv.x-0.5)*a,(uv.y-0.51));
      float z=1.0/max(max(abs(q.x)*0.8,abs(q.y)),0.025);
      bool wall=abs(q.x)*0.8>abs(q.y);
      vec2 p=wall?vec2(z,q.y*z):vec2(q.x*z,z);
      float stone=0.55+0.10*noise(p*33.0+seed)+0.08*noise(p*2.0);
      vec3 material=mix(vec3(0.24,0.23,0.21),vec3(0.53,0.49,0.40),stone);
      if(ballroom)material*=vec3(1.40,1.26,1.08);
      material*=0.90+variation*0.018;
      float joints=wall?pow(abs(sin(p.x*1.1)),24.0):pow(abs(sin(p.x*4.0)*sin(p.y*1.3)),25.0);
      material*=0.85+0.15*joints;
      float light=0.12+0.75*exp(-z*0.12);
      vec3 c=material*light;
      if(wall){
        float column=pow(max(0.0,cos(p.x*1.5)),14.0);
        c*=0.65+column*0.85;
        float wx=abs(fract(p.x*0.24)-0.5);
        float window=step(wx,0.11*(1.0-smoothstep(0.48,0.85,p.y)))*step(0.08,p.y)*step(p.y,0.84);
        window*=0.65+0.35*step(0.006,wx);
        vec3 glow=mix(warmLight,coolLight,mod(v,3.0)==1.0?0.85:0.1);
        if(gallery){
          float fx=fract(p.x*0.27),fy=p.y;
          float frame=step(0.18,fx)*step(fx,0.82)*step(-0.2,fy)*step(fy,0.57);
          float painting=step(0.21,fx)*step(fx,0.79)*step(-0.17,fy)*step(fy,0.54);
          vec3 paint=landscape(vec2((fx-0.21)/0.58,(fy+0.17)/0.71),1.0,mod(floor(p.x*0.27),2.0)==0.0?5.0:0.0);
          c=mix(c,vec3(0.41,0.27,0.10)*light,frame);c=mix(c,paint*light,painting);
        } else c+=glow*window*1.15;
      }
      float arch=abs(length(q/vec2(0.43,0.68))-0.93);
      if(!gallery&&!ballroom){
        c*=0.8+0.2*smoothstep(0.012,0.04,arch);
        if(q.y>0.0&&!wall){
          float vault=abs(q.x)/(q.y+0.04);
          c*=0.63+0.37*pow(max(0.0,cos(vault*3.0)),2.0);
          c*=0.78+0.22*smoothstep(0.03,0.07,abs(sin(z*0.75)));
        }
      }
      float end=exp(-length(q*vec2(1.2,1.0))*15.0);
      c+=mix(warmLight,coolLight,mod(v,3.0)==1.0?0.8:0.1)*end*(gallery?0.1:0.32);
      float shaft=exp(-pow((q.x+q.y*0.8-0.11)*13.0,2.0))*smoothstep(-0.5,0.45,q.y)*0.11;
      c+=warmLight*shaft*(0.8+0.2*sin(time*0.12));
      if(ballroom){
        for(int i=0;i<9;i++){
          float f=float(i),r=0.024+0.015*mod(f,3.0),ang=f*2.4;
          vec2 p=q-vec2(cos(ang)*r,0.20+sin(ang)*r*0.6);
          c+=warmLight*exp(-length(p)*550.0)*0.9;
        }
      }
      return c;
    }
    vec3 candle(vec2 uv,float a,float v) {
      vec2 q=vec2((uv.x-0.5)*a,uv.y);
      float stone=fbm(q*vec2(12,8)+seed);
      vec3 c=mix(vec3(0.032,0.029,0.027),vec3(0.17,0.13,0.085),stone);
      float light=exp(-length((q-vec2(0.15+v*0.025,0.58))*vec2(1.4,1))*3.0);
      if(v==0.0){
        float window=step(-0.4,q.x)*step(q.x,0.32)*step(0.15,uv.y)*step(uv.y,0.93);
        float shadow=step(0.015,abs(q.x+uv.y*0.23))*step(0.012,abs(uv.y-0.59));
        return c+warmLight*window*shadow*0.18;
      }
      c+=warmLight*light*0.10;
      if(uv.y<0.25)c=mix(vec3(0.07,0.03,0.012),vec3(0.20,0.09,0.028),noise(vec2(q.x*7.0,uv.y*400.0)))*light;
      float wax=shape(abs(q.x-0.2)-0.035)*step(0.24,uv.y)*step(uv.y,0.52);
      vec3 waxcolor=vec3(0.56,0.43,0.27)*(0.6+0.4*exp(-abs(q.x-0.185)*40.0));
      c=mix(c,waxcolor,wax);
      vec2 fp=q-vec2(0.2+sin(time*2.1)*0.003,0.57);
      float flame=length(fp/vec2(0.013*(1.0-(fp.y+0.03)*6.0),0.052));
      c+=warmLight*exp(-length(fp)*35.0)*0.15;
      c=mix(c,vec3(1.0,0.69,0.28),1.0-smoothstep(0.85,1.0,flame));
      c=mix(c,vec3(1.0,0.94,0.69),1.0-smoothstep(0.25,0.65,flame));
      return c;
    }
    vec3 rose(vec2 uv,float a,float v) {
      vec2 q=vec2((uv.x-0.5)*a,uv.y);
      float b=fbm(q*5.0+seed);
      vec3 c=mix(vec3(0.025,0.055,0.035),vec3(0.13,0.19,0.11),b);
      vec2 center=vec2(0.17+sin(time*0.22)*0.005,0.61);
      float stem=exp(-abs(q.x-center.x-(uv.y-center.y)*0.08)*850.0)*step(uv.y,center.y);
      c=mix(c,vec3(0.15,0.22,0.075),stem);
      vec2 leaf=q-vec2(center.x+0.085,0.28);leaf=mat2(0.8,-0.6,0.6,0.8)*leaf;
      float lm=shape(disk2(leaf,vec2(0.10,0.033))-1.0);
      c=mix(c,vec3(0.10,0.21,0.06)*(0.75+0.25*sin(leaf.y*250.0)),lm);
      vec2 p=(q-center)*3.7;
      float r=length(p),ang=atan(p.y,p.x);
      vec3 color=v==1.0?vec3(0.72,0.035,0.075):(v==2.0?vec3(0.92,0.50,0.52):vec3(0.85,0.34,0.38));
      for(int i=0;i<21;i++){
        float f=float(i),u=f/20.0;
        if(v==2.0&&i>=5)break;
        float theta=v==2.0?f*1.256637:f*2.39996+seed;
        float radius=v==2.0?0.30:0.44*(1.0-u);
        vec2 offset=vec2(cos(theta),sin(theta))*radius;
        vec2 petal=p-offset;
        petal=mat2(cos(theta),-sin(theta),sin(theta),cos(theta))*petal;
        vec2 size=v==2.0?vec2(0.46,0.31):vec2(0.34*(1.0-u)+0.09,0.31*(1.0-u)+0.07);
        vec2 lp=petal/size;
        float d=dot(lp,lp);
        float pmask=1.0-smoothstep(0.91,1.02,d);
        float normal=sqrt(max(0.0,1.0-d));
        float shade=0.20+0.52*normal+0.13*lp.y+0.10*lp.x;
        vec3 petalColor=color*shade;
        petalColor+=vec3(0.10,0.055,0.04)*pow(max(0.0,1.0-abs(d-0.87)*9.0),4.0);
        petalColor*=0.95+0.05*noise(p*170.0+f);
        c=mix(c,petalColor,pmask);
      }
      if(v==2.0){
        float pollen=exp(-dot(p,p)*45.0);
        c=mix(c,vec3(0.59,0.40,0.08)*(0.7+0.3*noise(p*140.0)),pollen);
      }
      if(v==2.0){
        vec2 dp=p-vec2(0.25,-0.1);float droplet=length(dp);
        c+=vec3(0.6,0.72,0.62)*exp(-droplet*220.0);
      }
      c+=warmLight*exp(-length(q-vec2(0.4,0.9))*4.0)*0.08;
      return c;
    }
    vec3 letter(vec2 uv,float a) {
      vec2 q=vec2((uv.x-0.5)*a,uv.y-0.5);
      vec3 c=mix(vec3(0.09,0.052,0.026),vec3(0.26,0.14,0.062),noise(vec2(q.x*5.0,q.y*420.0)));
      float rot=0.07+variation*0.055;vec2 p=mat2(cos(rot),-sin(rot),sin(rot),cos(rot))*q;
      p.y+=sin(time*0.23+p.x*4.0)*0.002*smoothstep(-0.1,0.4,p.x);
      float shadow=shape(max(abs(p.x-0.012)-0.34,abs(p.y+0.016)-0.35));
      c*=1.0-shadow*0.5;
      float paper=shape(max(abs(p.x)-0.34,abs(p.y)-0.35));
      float grain=noise(p*700.0);
      vec3 parchment=vec3(0.72,0.65,0.49)*(0.92+grain*0.08);
      float lines=pow(max(0.0,cos(p.y*180.0+sin(p.x*140.0)*0.4)),30.0);
      float ink=lines*(1.0-smoothstep(0.27,0.30,abs(p.x)))*step(abs(p.y),0.25)*(0.4+0.6*noise(vec2(p.x*200.0,floor(p.y*28.6))));
      parchment=mix(parchment,vec3(0.15,0.12,0.085),ink*0.75);
      c=mix(c,parchment,paper);
      float sill=step(0.025,abs(q.x+uv.y*0.30-0.12))*step(0.021,abs(q.y-0.17));
      float light=exp(-length(q-vec2(0.25,0.4))*1.8)*(0.45+0.55*sill);
      c*=0.45+light*0.85;c+=warmLight*light*0.04;
      // A pressed flower resting beside the letter.
      vec2 fp=q-vec2(0.29,0.24);float ang=atan(fp.y,fp.x),r=length(fp);
      float flower=1.0-smoothstep(0.028+0.012*cos(ang*5.0),0.034+0.012*cos(ang*5.0),r);
      c=mix(c,vec3(0.49,0.16,0.14)*(0.7+0.3*cos(ang*5.0)),flower);
      return c;
    }
    vec3 planet(vec2 uv,float a) {
      vec2 q=vec2((uv.x-0.5)*a,uv.y-0.5);
      vec3 c=vec3(0.008,0.012,0.025);
      vec2 star=q*220.0;
      c+=vec3(0.6,0.69,0.8)*step(0.9975,hash(floor(star)))*pow(max(0.0,1.0-length(fract(star)-0.5)*2.0),10.0);
      vec2 p=(q-vec2(0.12,0.08))/0.31;
      float r=dot(p,p);
      if(r<1.0){
        vec3 n=vec3(p,sqrt(1.0-r));
        float lon=atan(n.x,n.z)+time*0.012,lat=asin(n.y);
        float turbulence=fbm(vec2(lon*9.0,lat*18.0))*0.10;
        float band=0.5+0.5*sin(lat*38.0+turbulence*18.0+sin(lon*6.0+lat*15.0)*0.7);
        vec3 gas=mix(vec3(0.42,0.24,0.13),vec3(0.82,0.73,0.57),band);
        gas*=0.83+0.17*fbm(vec2(lon*35.0,lat*70.0));
        vec2 storm=vec2(mod(lon+0.48+3.14159,6.28318)-3.14159,lat+0.23)/vec2(0.24,0.10);
        float spot=length(storm);
        gas=mix(gas,vec3(0.58,0.25,0.12)*(0.7+0.3*sin(spot*17.0+atan(storm.y,storm.x))),1.0-smoothstep(0.8,1.1,spot));
        float diffuse=max(0.0,dot(n,normalize(vec3(-0.6,0.45,0.85))));
        c=gas*(0.055+0.85*diffuse);
        c+=vec3(0.18,0.22,0.28)*pow(1.0-n.z,4.0)*diffuse;
      }
      return c;
    }
    float swanShape(vec2 p) {
      float body=disk2(p,vec2(0.075,0.033))-1.0;
      float head=disk2(p-vec2(0.072,0.105),vec2(0.015,0.012))-1.0;
      float d=min(body,head);
      for(int i=0;i<16;i++){
        float u=float(i)/15.0;
        vec2 n=vec2(0.040+0.028*sin(u*3.5),0.012+u*0.088);
        d=min(d,(length(p-n)-(0.009-u*0.004))*25.0);
      }
      return d;
    }
    vec3 swanLake(vec2 uv,float a) {
      vec3 c=landscape(uv,a,5.0)*vec3(0.75,0.9,1.0);
      vec2 q=vec2((uv.x-0.5)*a,uv.y);
      float sx=0.12+0.04*sin(time*0.025),sy=0.37;
      vec2 p=q-vec2(sx,sy);
      float mask=shape(swanShape(p));
      float feather=0.84+0.1*noise(p*350.0)+0.06*sin(p.x*500.0+p.y*120.0);
      vec3 white=vec3(0.78,0.80,0.73)*feather*(0.65+0.35*smoothstep(-0.03,0.03,p.y));
      c=mix(c,white,mask);
      vec2 beak=p-vec2(0.088,0.103);
      c=mix(c,vec3(0.55,0.24,0.07),shape(disk2(beak,vec2(0.012,0.004))-1.0));
      c=mix(c,vec3(0.01),exp(-length(p-vec2(0.077,0.108))*3200.0));
      if(p.y<0.0){
        vec2 rp=vec2(p.x+sin(uv.y*350.0-time)*0.003,-p.y*1.35);
        c=mix(c,white*0.48,shape(swanShape(rp))*0.33);
      }
      float wake=abs(p.y+0.012+abs(p.x+0.05)*0.12);
      float wave=exp(-wake*700.0)*exp(-abs(p.x+0.14)*9.0)*step(p.x,-0.04);
      c+=vec3(0.10,0.16,0.18)*wave;
      return c;
    }
    vec3 aurora(vec2 uv,float a,float v) {
      vec2 q=vec2((uv.x-0.5)*a,uv.y);
      vec3 c=mix(vec3(0.035,0.07,0.10),vec3(0.006,0.012,0.032),uv.y);
      vec2 sp=q*230.0;
      c+=vec3(0.6,0.7,0.8)*step(0.997,hash(floor(sp)))*pow(max(0.0,1.0-length(fract(sp)-0.5)*2.0),12.0)*0.7;
      for(int i=0;i<3;i++){
        float f=float(i),base=0.55+sin(q.x*2.6+time*0.025+f)*0.10+sin(q.x*5.0-time*0.04)*0.04+f*0.045;
        float h=uv.y-base;
        float rays=0.65+0.35*sin(q.x*140.0+noise(vec2(q.x*13.0,time*0.05))*7.0);
        float veil=exp(-max(h,0.0)*10.0)*smoothstep(-0.015,0.015,h)*rays;
        vec3 color=mix(vec3(0.08,0.40,0.23),vec3(0.18,0.17,0.40),clamp(h*5.0+v*0.15,0.0,1.0));
        c+=color*veil*0.29;
      }
      float ridge=0.20+0.055*fbm(vec2(q.x*9.0+seed,0.0));
      c=mix(c,vec3(0.009,0.018,0.023),shape(uv.y-ridge));
      return c;
    }
    vec3 glassScene(vec2 uv,float a) {
      vec2 q=vec2((uv.x-0.5)*a,uv.y);
      vec3 c=vec3(0.045,0.027,0.018);
      for(int i=0;i<12;i++){
        float f=float(i);vec2 pos=vec2((hash(vec2(f,seed))-0.5)*a,0.35+hash(vec2(f,4.0))*0.6);
        float r=0.012+hash(vec2(f,3.0))*0.02;
        c+=warmLight*exp(-dot(q-pos,q-pos)/(r*r))*0.3;
      }
      vec2 p=q-vec2(0.13,0.61);
      float bowl=disk2(p,vec2(0.11,0.20));
      float inside=shape(bowl-1.0)*step(-0.18,p.y)*step(p.y,0.12);
      float rim=exp(-abs(bowl-1.0)*180.0)*step(p.y,0.12);
      float liquid=inside*step(p.y,0.035);
      c=mix(c,c*vec3(0.95,0.66,0.26)+vec3(0.11,0.065,0.012),liquid*0.65);
      c+=warmLight*rim*0.35;
      float stem=exp(-abs(p.x)*1800.0)*step(-0.42,p.y)*step(p.y,-0.19);
      float foot=exp(-abs(disk2(p-vec2(0,-0.42),vec2(0.08,0.012))-1.0)*55.0);
      c+=vec3(0.6,0.61,0.54)*(stem*0.35+foot*0.25);
      c+=warmLight*exp(-abs(p.y-0.12)*1800.0)*step(abs(p.x),0.088)*0.3;
      for(int i=0;i<23;i++){
        float f=float(i),x=(hash(vec2(f,4))-0.5)*0.14;
        float y=-0.16+fract(time*(0.07+hash(vec2(f,5))*0.04)+f*0.37)*0.19;
        float d=length(p-vec2(x,y));
        c+=vec3(0.55,0.45,0.23)*exp(-abs(d-0.0018)*2200.0)*liquid*0.45;
      }
      return c;
    }
    float lineDistance(vec2 p,vec2 a,vec2 b){vec2 ab=b-a;return length(p-a-ab*clamp(dot(p-a,ab)/dot(ab,ab),0.0,1.0));}
    vec3 dandelion(vec2 uv,float a) {
      vec2 q=vec2((uv.x-0.5)*a,uv.y);
      vec3 c=mix(vec3(0.30,0.22,0.23),vec3(0.11,0.17,0.23),uv.y);
      c+=warmLight*exp(-length(q-vec2(-0.2,0.3))*3.0)*0.15;
      for(int i=0;i<17;i++){
        float f=float(i),z=hash(vec2(f,seed));
        vec2 pos=vec2(mod(hash(vec2(f,4.0))*a+time*(0.006+z*0.008),a)-a*0.5,fract(hash(vec2(f,8.0))+time*0.003)+sin(time*0.24+f)*0.014);
        vec2 p=q-pos;float rot=-0.4+sin(time*0.23+f)*0.3;
        p=mat2(cos(rot),-sin(rot),sin(rot),cos(rot))*p;
        float scale=0.012+z*0.020;
        if(abs(p.x)<scale*1.5&&abs(p.y)<scale*2.0){
          float filaments=0.0;
          for(int j=0;j<12;j++){
            float angle=0.35+float(j)/11.0*2.44;
            vec2 end=vec2(cos(angle),sin(angle))*scale;
            filaments+=exp(-lineDistance(p,vec2(0),end)*(1800.0-z*800.0));
          }
          c+=vec3(0.65,0.61,0.47)*min(filaments,1.0)*(0.3+0.5*z);
          float seedpod=exp(-disk2(p-vec2(0,-scale*0.3),vec2(scale*0.07,scale*0.28))*4.0);
          c=mix(c,vec3(0.16,0.08,0.025),seedpod);
        }
      }
      return c;
    }
    vec3 stream(vec2 uv,float a,float v) {
      vec2 q=vec2((uv.x-0.5)*a,uv.y);
      vec2 p=vec2(q.x/(0.4+uv.y),1.0/(0.25+uv.y));
      float flow=fbm(vec2(p.x*6.0+sin(p.y*3.0),p.y*8.0-time*0.24)+seed);
      vec3 c=mix(vec3(0.035,0.10,0.10),vec3(0.26,0.36,0.29),flow);
      float ripple=pow(max(0.0,sin(p.y*100.0+flow*9.0+time)),16.0);
      c+=vec3(0.22,0.30,0.25)*ripple*0.26;
      for(int i=0;i<7;i++){
        float f=float(i);vec2 pos=vec2((hash(vec2(f,seed))-0.5)*a,hash(vec2(f,8)));
        vec2 d=(q-pos)/vec2(0.065,0.045);
        float r=length(d);
        vec3 rock=mix(vec3(0.07,0.085,0.065),vec3(0.23,0.25,0.20),fbm(d*7.0));
        rock*=0.55+0.45*smoothstep(-1.0,1.0,d.x+d.y);
        c=mix(c,rock,1.0-smoothstep(0.9,1.0,r));
        c+=vec3(0.2,0.25,0.22)*exp(-abs(r-1.10)*55.0)*0.20;
      }
      c*=0.60+0.4*fbm(q*4.0+time*0.012);
      return c;
    }
    vec3 additionalScene(vec2 uv,float a) {
      float v=variation;vec3 c=vec3(0.0);
#if FAMILY == 3
      c=meadow(uv,a,v);
#elif FAMILY == 4
      c=forest(uv,a,v);
#elif FAMILY == 5
      c=landscape(uv,a,v);
#elif FAMILY == 6
      c=autumn(uv,a);
#elif FAMILY == 7
      c=candle(uv,a,v);
#elif FAMILY == 8
      c=hall(uv,a,v,false,false);
#elif FAMILY == 9
      c=piano(uv,a,v);
#elif FAMILY == 10
      c=curtain(uv,a,v);
#elif FAMILY == 11
      c=mountain(uv,a,v,false);
#elif FAMILY == 12
      c=swanLake(uv,a);
#elif FAMILY == 13
      c=planet(uv,a);
#elif FAMILY == 14
      c=hall(uv,a,v,true,false);
#elif FAMILY == 15
      c=letter(uv,a);
#elif FAMILY == 16
      c=rose(uv,a,v);
#elif FAMILY == 17
      c=aurora(uv,a,v);
#elif FAMILY == 18
      c=glassScene(uv,a);
#elif FAMILY == 19
      c=mountain(uv,a,v,true);
#elif FAMILY == 20
      c=dandelion(uv,a);
#elif FAMILY == 21
      c=stream(uv,a,v);
#elif FAMILY == 22
      c=hall(uv,a,v,false,true);
#endif
      // Airborne dust catches the light; no flashing or beat-driven camera motion.
      if(scene==7.0||scene==8.0||scene==9.0||scene==14.0||scene==15.0||scene==22.0){
        for(int i=0;i<15;i++){
          float f=float(i);vec2 pos=vec2(hash(vec2(f,seed)),fract(hash(vec2(f,4.0))+time*0.004));
          float d=length((uv-pos)*vec2(a,1.0));
          c+=warmLight*exp(-d*1300.0)*0.05;
        }
      }
      c*=1.0-0.38*dot(uv-0.5,uv-0.5);
      c+=(hash(gl_FragCoord.xy)-0.5)/512.0;
      return pow(max(c,vec3(0.0)),vec3(0.88));
    }

    vec3 sky(vec3 d) {
      float elevation=max(d.y,0.0);
      if(scene>1.5) {
        float cloud=fbm(d.xz/(abs(d.y)+0.3)*1.4+vec2(time*0.012,0));
        float light=pow(max(dot(d,normalize(vec3(-0.6,0.6,1.0))),0.0),8.0);
        return mix(vec3(0.065,0.095,0.11),vec3(0.24,0.30,0.31),light)*(0.7+0.45*cloud);
      }
      vec3 col=mix(vec3(0.095,0.14,0.19),vec3(0.014,0.025,0.055),smoothstep(0.0,0.5,elevation));
      vec3 md=normalize(vec3(scene<0.5?0.28:0.43,0.30,1.6));
      float dist=length(d-md);
      col+=vec3(0.24,0.30,0.37)*exp(-dist*15.0)*0.42;
      col+=vec3(0.16,0.20,0.27)*exp(-dist*4.0)*0.18;
      float disk=1.0-smoothstep(0.029,0.0305,dist);
      vec2 mp=(d.xy-md.xy)/0.030;
      float relief=fbm(mp*7.0)*0.16+fbm(mp*19.0)*0.09;
      float maria=smoothstep(0.43,0.69,fbm(mp*3.6+4.0))*0.27;
      vec3 moon=vec3(0.84,0.86,0.80)*(1.0-relief-maria);
      moon*=0.85+0.15*sqrt(max(0.0,1.0-dot(mp,mp)));
      col=mix(col,moon,disk);
      vec2 sp=d.xz/(elevation+0.22)*190.0;
      float star=step(0.998,hash(floor(sp)))*pow(max(0.0,1.0-length(fract(sp)-0.5)*2.0),12.0);
      col+=star*0.22*smoothstep(0.09,0.4,elevation);
      vec2 cp=d.xz/(elevation+0.36)*2.0+vec2(time*0.008,time*0.001);
      float clouds=smoothstep(scene<0.5?0.62:0.38,0.84,fbm(cp));
      float rim=exp(-dist*9.0)*0.16;
      col=mix(col,vec3(0.07,0.10,0.145)+rim,clouds*(scene<0.5?0.40:0.94));
      return col;
    }
    void main() {
      vec2 uv=gl_FragCoord.xy/resolution;
      float aspect=resolution.x/resolution.y;
#if FAMILY >= 3
      vec2 framed=uv;
#if FAMILY == 13 || FAMILY == 15 || FAMILY == 16 || FAMILY == 18
      float fit=min(1.0,aspect/0.95);
      framed=(uv-0.5)/fit+0.5;
#endif
      gl_FragColor=vec4(additionalScene(framed,aspect),1.0);
#else
      vec3 rd=normalize(scene>1.5?vec3((uv.x-0.5)*aspect,(uv.y-0.5)*0.65-0.65,1.2):vec3((uv.x-0.5)*aspect,uv.y-0.52,1.6));
      vec3 col;
      if(rd.y>=0.0) {
        col=sky(rd);
        if(scene<1.5) {
          float ridge=0.523+0.009*fbm(vec2(uv.x*19.0,2.0))+0.008*sin(uv.x*13.0);
          col=mix(col,vec3(0.025,0.043,0.055),1.0-smoothstep(ridge-0.001,ridge+0.002,uv.y));
        }
      } else {
        float depth=-1.0/rd.y;
        vec2 p=rd.xz*depth;
        vec2 slope=vec2(0.0);
        float rippleLight=0.0;
        for(int i=0;i<6;i++) {
          float f=float(i);
          vec2 dir=vec2(cos(f*2.39),sin(f*2.39));
          float freq=0.9+f*0.93;
          slope+=dir*cos(dot(p,dir)*freq+time*(0.35+f*0.12))*0.007;
        }
        slope+=vec2(noise(p*8.0+time*0.12)-0.5,noise(p*7.0-time*0.14)-0.5)*0.017;
        if(scene>1.5) {
          for(int i=0;i<22;i++) {
            float fi=float(i);
            vec2 hit=vec2(0.04+hash(vec2(fi,2.0+seed))*0.92,0.08+hash(vec2(fi,8.0+seed))*0.84);
            vec3 hr=normalize(vec3((hit.x-0.5)*aspect,(hit.y-0.5)*0.65-0.65,1.2));
            vec2 hp=hr.xz*(-1.0/hr.y);
            float age=mod(time+hash(vec2(fi,5.0+seed))*3.7,3.7)-0.6;
            vec2 diff=p-hp;
            float r=length(diff), radius=max(0.0,age)*0.18;
            float envelope=exp(-abs(r-radius)*22.0)*exp(-max(age,0.0)*1.1)*step(0.0,age);
            slope+=diff/max(r,0.01)*sin((r-radius)*90.0)*envelope*0.075;
            rippleLight+=sin((r-radius)*90.0)*envelope*0.045;
          }
        }
        vec3 n=normalize(vec3(-slope.x,1.0,-slope.y));
        vec3 reflection=reflect(rd,n);
        float fresnel=0.025+0.975*pow(1.0-max(dot(-rd,n),0.0),5.0);
        col=mix(vec3(0.016,0.035,0.039),sky(reflection),0.30+fresnel*0.70);
        col+=vec3(0.025,0.04,0.045)*(0.5+0.5*sin(p.y*4.0+time*0.3))*0.12;
        if(scene>1.5) {
          float foliage=smoothstep(0.38,0.72,fbm(reflection.xz*4.0+vec2(3.0,0.0)));
          col*=0.85+0.35*foliage;
          col+=vec3(0.65,0.78,0.80)*rippleLight;
          col+=vec3(0.06,0.075,0.08)*pow(max(dot(n,normalize(vec3(-0.4,1.0,0.6))),0.0),18.0);
        }
        float mist=exp(-1.0/max(depth*0.018,0.001));
        col=mix(col,scene>1.5?vec3(0.13,0.17,0.18):vec3(0.09,0.13,0.17),mist*0.65);
      }
      if(scene>1.5) {
        for(int i=0;i<22;i++) {
          float fi=float(i);
          vec2 hit=vec2(0.04+hash(vec2(fi,2.0+seed))*0.92,0.08+hash(vec2(fi,8.0+seed))*0.84);
          float age=mod(time+hash(vec2(fi,5.0+seed))*3.7,3.7)-0.6;
          vec2 pos=hit+vec2(-0.015,0.75)*max(-age,0.0);
          vec2 delta=(uv-pos)*vec2(aspect,1.0);
          float drop=exp(-abs(delta.x+delta.y*0.02)*1700.0)*exp(-abs(delta.y)*120.0)*step(age,0.0)*step(-0.6,age);
          float splash=exp(-length((uv-hit)*vec2(aspect,2.7))*480.0)*exp(-max(age,0.0)*24.0)*step(0.0,age);
          col+=vec3(0.4,0.49,0.51)*(drop*0.3+splash*0.6);
        }
      }
      if(scene==1.0&&variation>0.5){
        float top=0.16+0.055*step(0.38,fract(uv.x*12.0));
        float wall=1.0-smoothstep(top-0.002,top+0.002,uv.y);
        vec2 blocks=vec2(uv.x*18.0+mod(floor(uv.y*25.0),2.0)*0.5,uv.y*25.0);
        float joint=smoothstep(0.0,0.06,min(fract(blocks.x),fract(blocks.y)));
        vec3 rock=vec3(0.07,0.085,0.10)*(0.5+0.5*noise(uv*300.0))*joint;
        col=mix(col,rock,wall);
      }
      col*=1.0-0.22*dot(uv-0.5,uv-0.5);
      col+= (hash(gl_FragCoord.xy)-0.5)/255.0;
      gl_FragColor=vec4(pow(max(col,0.0),vec3(0.82)),1.0);
#endif
    }`;
  let renderer;
  function create() {
    const canvas=document.createElement('canvas');
    const gl=canvas.getContext('webgl',{alpha:false,antialias:false,depth:false,powerPreference:'low-power'});
    if(!gl) return null;
    const programs=new Map();
    const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
    function compile(type,source) {
      const shader=gl.createShader(type);gl.shaderSource(shader,source);gl.compileShader(shader);
      if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){gl.deleteShader(shader);throw new Error('Shader unavailable');}
      return shader;
    }
    function prepare(family) {
      if(programs.has(family))return programs.get(family);
      let program;
      try {
        program=gl.createProgram();
        const vertex=compile(gl.VERTEX_SHADER,'attribute vec2 p; void main(){gl_Position=vec4(p,0,1);}');
        const pixel=compile(gl.FRAGMENT_SHADER,'#define FAMILY '+family+'\n'+fragment);
        gl.attachShader(program,vertex);gl.attachShader(program,pixel);gl.linkProgram(program);
        gl.deleteShader(vertex);gl.deleteShader(pixel);
        if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw new Error('Program unavailable');
        const uniforms=Object.fromEntries(['resolution','time','scene','variation','seed'].map(n=>[n,gl.getUniformLocation(program,n)]));
        const result={program,uniforms,position:gl.getAttribLocation(program,'p')};
        programs.set(family,result);return result;
      } catch {
        if(program)gl.deleteProgram(program);programs.set(family,null);return null;
      }
    }
    return {canvas,gl,buffer,prepare};
  }
  return {
    has: id => Object.prototype.hasOwnProperty.call(catalog,id),
    describe: id => catalog[id] ? catalog[id][2] : '',
    list: () => Object.entries(catalog).map(([id,[scene,variation,description]])=>({id,scene,variation,description})),
    available(id) {
      if(renderer===undefined)renderer=create();
      return !!renderer&&!renderer.gl.isContextLost()&&(!id||!!renderer.prepare(catalog[id][0]));
    },
    init(id) {
      const entry=catalog[id];
      if(!entry) throw new Error('Unknown artwork: '+id);
      let seed=0;for(const ch of id)seed=(seed*31+ch.charCodeAt(0))>>>0;
      return {id,scene:entry[0],variation:entry[1],seed:(seed%10000)/1000};
    },
    draw(c,w,h,t,st) {
      if(!this.available(st.id)) return false;
      const {canvas,gl,buffer}=renderer;
      const {program,uniforms,position}=renderer.prepare(st.scene);
      gl.useProgram(program);gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
      gl.enableVertexAttribArray(position);gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
      // Bound fragment work on phones and high-DPI displays.
      const scale=Math.min(1,960/w,600/h), rw=Math.max(1,Math.round(w*scale)), rh=Math.max(1,Math.round(h*scale));
      if(canvas.width!==rw||canvas.height!==rh){canvas.width=rw;canvas.height=rh;gl.viewport(0,0,rw,rh);}
      gl.uniform2f(uniforms.resolution,rw,rh);gl.uniform1f(uniforms.time,t);gl.uniform1f(uniforms.scene,st.scene);gl.uniform1f(uniforms.variation,st.variation);gl.uniform1f(uniforms.seed,st.seed);
      gl.drawArrays(gl.TRIANGLES,0,6);c.drawImage(canvas,0,0,w,h);
      return true;
    }
  };
})();
