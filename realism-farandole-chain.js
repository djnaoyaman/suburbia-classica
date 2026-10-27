/* Farandole: an editorial Sagrada Familia interior interpretation.
 * Not a Bizet/Guiraud location, performance or inspiration claim.
 * Fixed photographic geometry; local floor illumination and sparse drifting air.
 */
(() => {
 'use strict';
 const legacy=window.ClassicaRealism,id='farandole';
 const description='サグラダ・ファミリアの枝分かれする石柱と色ガラスの光。幾層にも続く空間を、ファランドールの重なり合う活気へ重ねる、想像上の鑑賞風景';
 const vertex='attribute vec2 p;void main(){gl_Position=vec4(p,0.0,1.0);}';
 const fragment=`
precision highp float;
uniform vec2 resolution;uniform float time;uniform sampler2D material;
const float TAU=6.28318530718,ASPECT=1.5;
float hash(float x){return fract(sin(x*127.1+311.7)*43758.5453);}
float oval(vec2 p,vec2 c,vec2 r){return 1.-smoothstep(.40,1.,length((p-c)/r));}
float floorLight(vec2 p){
 return oval(p,vec2(.50,.935),vec2(.27,.10))*smoothstep(.865,.890,p.y)*(1.-smoothstep(.985,.999,p.y));
}
float litAir(vec2 p){return oval(p,vec2(.573,.728),vec2(.012,.10));}
void main(){
 vec2 uv=gl_FragCoord.xy/resolution;float a=resolution.x/resolution.y;
 vec2 span=vec2(min(a/ASPECT,1.),min(ASPECT/a,1.))*.99;
 float cx=mix(.63,.5,smoothstep(.75,1.5,a));
 cx=clamp(cx,span.x*.5+.001,1.-span.x*.5-.001);
 vec2 p=vec2(cx,.5)+(vec2(uv.x,1.-uv.y)-.5)*span;
 // Sample the photo once at fixed coordinates: columns, glass and floor never warp.
 vec3 original=texture2D(material,p).rgb;
 float cycle=mod(mod(time,120.)+120.,120.)/120.,phase=TAU*cycle;
 float pool=floorLight(p),air=litAir(p);
 // Slow, restrained attenuation within an existing colored floor-light pool only.
 // No image-wide brightness or hue modulation; sunlight geometry stays fixed.
 float cloud=.5+.5*sin(phase-p.x*3.+.3*sin(phase*2.-p.y*4.));
 vec3 col=original*(1.-.018*pool*cloud);
 // Reuse the existing local-air technique: a few soft tiny motes between pillars.
 // Each fades fully before recycling, avoiding respawn flashes and glitter.
 float dust=0.;
 for(int i=0;i<8;i++){
  float n=float(i),life=fract(cycle+hash(n+2.));
  float y=.680+.095*hash(n+32.)-.060*(life-.5);
  float x=.573+(hash(n+61.)-.5)*.014+.0012*sin(TAU*life+hash(n+94.)*TAU);
  float radius=mix(.00055,.00085,hash(n+127.));
  float d=length((p-vec2(x,y))*vec2(ASPECT,1.));
  float fade=smoothstep(0.,.16,life)*(1.-smoothstep(.84,1.,life));
  dust+=(1.-smoothstep(radius*.2,radius*2.,d))*fade;
 }
 col+=air*dust*vec3(.10,.08,.045);
 gl_FragColor=vec4(clamp(col,0.,1.),1.);
}
`;
 let renderer;
 const announce=()=>window.dispatchEvent(new CustomEvent('classica-nature-ready',{detail:{id}}));
 function releaseMaterial(){if(renderer)renderer.releaseTexture();}
 function image(){return typeof window.ClassicaNatureGL?.material==='function'?window.ClassicaNatureGL.material(id,'assets/realism/farandole-sagrada-interior.webp',announce,releaseMaterial):{state:'unavailable',value:null};}
 function create(){
  const surface=window.ClassicaNatureGL?.acquire();if(!surface)return null;
  const {canvas,gl}=surface;let program,buffer,texture,uploadFailed=false;const shaders=[];
  const dispose=()=>{shaders.forEach(s=>gl.deleteShader(s));if(program)gl.deleteProgram(program);if(buffer)gl.deleteBuffer(buffer);if(texture)gl.deleteTexture(texture);};
  try{
   program=gl.createProgram();
   for(const [type,source] of [[gl.VERTEX_SHADER,vertex],[gl.FRAGMENT_SHADER,fragment]]){
    const s=gl.createShader(type);shaders.push(s);gl.shaderSource(s,source);gl.compileShader(s);
    if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error('Nave shader unavailable');gl.attachShader(program,s);
   }
   gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error('Nave program unavailable');
   shaders.splice(0).forEach(s=>gl.deleteShader(s));buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
   gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
   const u=Object.fromEntries(['resolution','time','material'].map(k=>[k,gl.getUniformLocation(program,k)]));
   canvas.addEventListener('webglcontextrestored',()=>{dispose();renderer=undefined;announce();},{once:true});
   return {canvas,gl,program,buffer,u,position:gl.getAttribLocation(program,'p'),releaseTexture(){if(texture)gl.deleteTexture(texture);texture=undefined;uploadFailed=false;},upload(img){
    if(uploadFailed)return null;if(texture)return texture;try{if(typeof gl.getError==='function'){for(let n=0;n<8;n++){if(gl.getError()===gl.NO_ERROR)break;}}texture=gl.createTexture();if(!texture){uploadFailed=true;return null;}gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,false);gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,false);gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL,gl.NONE);
    try{gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,img);if(typeof gl.getError==='function'&&gl.getError()!==gl.NO_ERROR)throw Error('Texture upload unavailable');}catch(error){gl.deleteTexture(texture);texture=undefined;uploadFailed=true;return null;}
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);if(typeof gl.getError==='function'&&gl.getError()!==gl.NO_ERROR)throw Error('Texture upload unavailable');return texture;}catch(error){if(texture)gl.deleteTexture(texture);texture=undefined;uploadFailed=true;return null;}
   }};
  }catch(error){dispose();return null;}
 }
 function ready(){if(window.ClassicaNatureGL?.acquire()?.gl.isContextLost())return false;if(renderer===undefined)renderer=create();return renderer&&!renderer.gl.isContextLost();}
 window.ClassicaRealism={
  has:key=>key===id||legacy.has(key),describe:key=>key===id?description:legacy.describe(key),
  list:()=>legacy.list().map(item=>item.id===id?{...item,description}:item),
  available(key){if(key!==id)return legacy.available(key);if(ready()){image();return true;}return legacy.available(key);},
  init:key=>key===id?{id,nature:true,fallback:legacy.init(key)}:legacy.init(key),
  draw(c,w,h,t,st){
   if(st.id!==id)return legacy.draw(c,w,h,t,st);
   const fallback=()=>legacy.draw(c,w,h,t,st.fallback||legacy.init(id));
   if(!(w>0&&h>0))return false;if(!ready())return fallback();const record=image();if(record.state!=='ready')return fallback();
   const {canvas,gl,program,buffer,u,position}=renderer;let texture;
   try{texture=renderer.upload(record.value);}catch(error){return fallback();}if(!texture)return fallback();
   const scale=Math.min(1,960/w,600/h),rw=Math.max(1,Math.round(w*scale)),rh=Math.max(1,Math.round(h*scale));
   if(canvas.width!==rw||canvas.height!==rh){canvas.width=rw;canvas.height=rh;}
   gl.viewport(0,0,rw,rh);gl.useProgram(program);gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.enableVertexAttribArray(position);gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
   gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,texture);gl.uniform1i(u.material,0);gl.uniform2f(u.resolution,rw,rh);gl.uniform1f(u.time,Number.isFinite(t)?t:0);
   gl.drawArrays(gl.TRIANGLES,0,6);c.drawImage(canvas,0,0,w,h);return true;
  }
 };
})();
