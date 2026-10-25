/* Impressive: individually composed paintings, with bounded local material motion.
 * Media time is supplied by the player. No audio is sampled from YouTube.
 * One GPU surface/texture and at most two decoded paintings are retained.
 */
(() => {
  'use strict';
  const catalogue=window.ClassicaImpressiveCatalog;
  if(!catalogue)return;
  const works=new Map(catalogue.works.map(work=>[work.id,work]));
  const entries=new Map();let active=null,serial=0,renderer,contextLost=false;
  const notify=id=>window.dispatchEvent(new CustomEvent('classica-impressive-ready',{detail:{id}}));
  const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
  function evict(entry){
    entries.delete(entry.id);entry.token=-1;entry.image.onload=null;entry.image.onerror=null;
    if(entry.state==='loading')entry.image.src='';entry.image=null;
  }
  const keyFor=(id,portrait)=>id+(portrait&&works.get(id)?.portraitAsset?'@portrait':'');
  function material(id,portrait){
    if(id!==active)return null;
    const key=keyFor(id,portrait);
    let entry=entries.get(key);
    if(entry){entries.delete(key);entries.set(key,entry);return entry;}
    const work=works.get(id);if(!work)return null;
    const image=new Image(),token=++serial;
    entry={id:key,workId:id,image,token,state:'loading'};entries.set(key,entry);
    while(entries.size>2){const old=[...entries.values()].find(e=>e.workId!==active);if(!old)break;evict(old);}
    const valid=()=>entries.get(key)===entry&&entry.token===token;
    const finish=ok=>{if(!valid())return;entry.state=ok?'ready':'failed';image.onload=null;image.onerror=null;if(id===active)notify(id);};
    image.decoding='async';image.onerror=()=>finish(false);
    image.onload=()=>{if(!valid())return;if(typeof image.decode==='function')image.decode().then(()=>finish(true),()=>finish(false));else finish(true);};
    image.src=(portrait&&work.portraitAsset?work.portraitAsset:work.asset)+'?v='+catalogue.version;
    return entry;
  }
  const vertex=`attribute vec2 p;varying vec2 uv;void main(){uv=p*.5+.5;gl_Position=vec4(p.x,-p.y,0.,1.);}`;
  const fragment=`precision highp float;
    varying vec2 uv;uniform sampler2D painting;uniform vec4 crop;
    uniform vec2 pixels;uniform float time,kind,strength,seed,progress;
    uniform vec4 region;uniform vec4 protect;
    float mask(vec2 p,vec4 r){
      vec2 lo=smoothstep(r.xy,r.xy+vec2(.06),p);
      vec2 hi=1.-smoothstep(r.xy+r.zw-vec2(.06),r.xy+r.zw,p);
      return lo.x*lo.y*hi.x*hi.y;
    }
    void main(){
      vec2 p=(uv-.5)*crop.zw+crop.xy;
      float local=mask(p,region);
      if(protect.z>0.)local*=1.-mask(p,protect);
      vec2 d=vec2(0.);float light=0.;
      float t=time;
      if(kind<1.5){
        // Reflected brush marks move horizontally; the horizon and figures stay.
        d.x=(sin(p.y*220.+t*.65+seed)+.35*sin(p.y*410.-t*.37))*pixels.x*2.6;
        d.y=sin(p.x*100.+p.y*60.+t*.34)*pixels.y*.55;
        light=sin(p.x*41.+p.y*140.-t*.6)*.013;
      }else if(kind<2.5){
        // Short local wind gestures, under a few source pixels, never a full-frame wobble.
        d.x=sin(p.y*18.+t*.55+seed)*sin(p.x*9.+seed)*pixels.x*2.2;
        d.y=sin(p.x*17.+t*.42+seed)*pixels.y*.7;
        light=sin(p.x*15.+p.y*11.+t*.2)*.018;
      }else if(kind<3.5){
        d.x=sin(p.y*200.+t*.85)*pixels.x*1.3;
        d.y=sin(p.x*120.+p.y*70.-t*.5)*pixels.y*.5;
        light=sin(p.x*23.+p.y*150.-t*.7)*.012;
      }else if(kind<4.5){
        d.x=sin(p.y*8.+t*.09+seed)*pixels.x*1.6;
        d.y=sin(p.x*11.+t*.08)*pixels.y*.45;
        light=sin(p.x*5.+t*.12+seed)*.015;
      }else{
        // Only the existing painted light changes. No invented shapes cover the painting.
        light=sin(p.x*7.+p.y*5.+t*.18+seed)*.018;
      }
      p=clamp(p+d*local*strength,vec2(.001),vec2(.999));
      vec3 col=texture2D(painting,p).rgb;
      float phrase=.5-.5*cos(t*.11+seed);
      col*=1.+light*local*(.55+.45*phrase);
      gl_FragColor=vec4(col,1.);
    }`;
  function makeRenderer(){
    if(contextLost)return null;if(renderer!==undefined)return renderer;
    const canvas=document.createElement('canvas');
    const gl=canvas.getContext('webgl',{alpha:false,antialias:false,depth:false,powerPreference:'low-power'});
    if(!gl){renderer=null;return null;}
    let program,buffer,texture;const shaders=[];
    const dispose=()=>{if(texture)gl.deleteTexture(texture);if(program)gl.deleteProgram(program);if(buffer)gl.deleteBuffer(buffer);shaders.forEach(shader=>gl.deleteShader(shader));};
    try{
      program=gl.createProgram();
      for(const [type,code] of [[gl.VERTEX_SHADER,vertex],[gl.FRAGMENT_SHADER,fragment]]){
        const shader=gl.createShader(type);shaders.push(shader);gl.shaderSource(shader,code);gl.compileShader(shader);
        if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS))throw Error('Shader unavailable');gl.attachShader(program,shader);
      }
      gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error('Program unavailable');
      buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
      const names=['painting','crop','pixels','time','kind','strength','seed','progress','region','protect'];
      const uniforms=Object.fromEntries(names.map(name=>[name,gl.getUniformLocation(program,name)]));
      canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();contextLost=true;renderer=null;notify(active);});
      canvas.addEventListener('webglcontextrestored',()=>{dispose();contextLost=false;renderer=undefined;notify(active);},{once:true});
      renderer={canvas,gl,program,buffer,uniforms,position:gl.getAttribLocation(program,'p'),image:null,
        release(){if(texture)gl.deleteTexture(texture);texture=null;this.image=null;},
        upload(image){
          if(this.image===image)return;
          if(!texture)texture=gl.createTexture();if(!texture)throw Error('Texture unavailable');
          gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,texture);
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,false);
          gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,image);
          gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
          gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
          if(gl.getError()!==gl.NO_ERROR)throw Error('Texture upload unavailable');this.image=image;
        }};
      return renderer;
    }catch(error){dispose();renderer=null;return null;}
  }
  function cropFor(work,image,w,h){
    const source=image.naturalWidth/image.naturalHeight,target=w/h;
    const spanX=target<source?target/source:1,spanY=target>source?source/target:1;
    const focus=w<h?(work.focusPortrait||work.focus):work.focus;
    return [clamp(focus[0],spanX*.5,1-spanX*.5),clamp(focus[1],spanY*.5,1-spanY*.5),spanX,spanY];
  }
  const types={water:1,foliage:2,rain:3,sky:4,light:5};
  function settings(work){
    const kind=types[work.motion]||5;
    return {kind,region:work.region||(kind===1||kind===3?[0,.58,1,.42]:kind===2?[0,.15,1,.62]:kind===4?[0,0,1,.43]:[0,0,1,1]),protect:work.protect||[0,0,0,0]};
  }
  function draw(c,w,h,t,state,info){
    const work=works.get(state.id),entry=material(state.id,h>w);
    if(!entry||entry.state!=='ready')return false;
    const image=entry.image,crop=cropFor(work,image,w,h),r=makeRenderer();
    c.save();c.globalAlpha=1;c.globalCompositeOperation='source-over';c.filter='none';
    try{
      if(!r||r.failedImage===image)throw Error('Use Canvas fallback');
      const {gl,canvas,program,buffer,uniforms:u}=r;
      const ratio=Math.min(1.75,Math.sqrt(3145728/Math.max(1,w*h)),Math.abs(c.getTransform().a)||1);
      const width=Math.max(1,Math.round(w*ratio)),height=Math.max(1,Math.round(h*ratio));
      if(canvas.width!==width||canvas.height!==height){canvas.width=width;canvas.height=height;}
      r.upload(image);gl.viewport(0,0,width,height);gl.useProgram(program);gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.enableVertexAttribArray(r.position);gl.vertexAttribPointer(r.position,2,gl.FLOAT,false,0,0);
      const motion=settings(work),seed=Array.from(work.id).reduce((sum,ch)=>sum+ch.charCodeAt(0),0)*.013;
      gl.uniform1i(u.painting,0);gl.uniform4fv(u.crop,crop);gl.uniform2f(u.pixels,1/image.naturalWidth,1/image.naturalHeight);
      gl.uniform1f(u.time,Number.isFinite(t)?t:0);gl.uniform1f(u.kind,motion.kind);gl.uniform1f(u.strength,work.intensity||1);gl.uniform1f(u.seed,seed);gl.uniform1f(u.progress,info?.progress||0);gl.uniform4fv(u.region,motion.region);gl.uniform4fv(u.protect,motion.protect);
      gl.drawArrays(gl.TRIANGLE_STRIP,0,4);if(gl.isContextLost())throw Error('Context lost');c.drawImage(canvas,0,0,w,h);
    }catch(error){
      if(r)r.failedImage=image;
      const sx=(crop[0]-crop[2]/2)*image.naturalWidth,sy=(crop[1]-crop[3]/2)*image.naturalHeight;
      c.drawImage(image,sx,sy,crop[2]*image.naturalWidth,crop[3]*image.naturalHeight,0,0,w,h);
    }finally{c.restore();}
    return true;
  }
  window.ClassicaImpressive=Object.freeze({
    create(id){if(!works.has(id))return null;return {light:false,init:()=>({id}),draw};},
    has:id=>works.has(id),list:()=>catalogue.works.map(work=>({id:work.id,artist:work.artist,subject:work.subject})),
    activate(id){active=works.has(id)?id:null;if(active===null&&renderer)renderer.release();},
    status:id=>entries.get(keyFor(id,window.innerHeight>window.innerWidth))?.state||'inactive',
    cropFor,
    materialState:()=>({active,retained:[...entries.keys()],states:[...entries.values()].map(e=>({id:e.id,state:e.state})),texture:renderer?.image?1:0}),
    version:catalogue.version
  });
})();
