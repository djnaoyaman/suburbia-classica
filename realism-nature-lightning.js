/* toccata-fugue-dm: rapid, localized lightning bursts in the existing fixed cloud environment.
 * Not video footage. Load after the existing natural studies and shared context host.
 */
(() => {
 'use strict';
 const legacy=window.ClassicaRealism,id='toccata-fugue-dm';
 const description='夜の雲に、鋭い稲妻と細い枝光が時間差で繰り返し走り、余光が消える情景';
 const vertex='attribute vec2 p;void main(){gl_Position=vec4(p,0.0,1.0);}';
 const fragment=`
precision highp float;
uniform vec2 resolution;uniform float time;uniform sampler2D material;
// Every strike is a pure function of scene time: no RNG, timers, or retained trails.
// A minimum .44 s between onset groups bounds the entire scene to <= 3 groups/s.
// Only the narrow material channels brighten. The photo never receives a flash.
float hash(float n){return fract(sin(n*127.1+311.7)*43758.5453);}
vec3 channel(vec2 p,vec2 center,vec2 size,float mirror,float age,float gain){
 if(age<0.||age>.62)return vec3(0.);
 vec2 b=(p-center)/size+.5;
 b.x=mix(b.x,1.-b.x,mirror);
 float inside=step(0.,b.x)*step(b.x,1.)*step(0.,b.y)*step(b.y,1.);
 vec4 bolt=texture2D(material,vec2(clamp(b.x*.5,.0005,.4995),clamp(1.-b.y,.0005,.9995)));
 float side=abs(b.x-.48);
 float distanceDown=clamp(1.-b.y+.32*side,0.,1.);
 // A fast descending leader, then a crisp return stroke; side branches arrive last.
 float front=smoothstep(0.,.045,age)*1.20;
 float grow=1.-smoothstep(front-.04,front+.04,distanceDown);
 float stroke=smoothstep(0.,.012,age)*(1.-smoothstep(.065,.17,age));
 float afterglow=.065*smoothstep(.015,.05,age)*(1.-smoothstep(.12,.62,age));
 float energy=pow(bolt.a,2.)*inside*grow*(stroke+afterglow)*gain;
 return mix(bolt.rgb,vec3(.86,.93,1.),.24)*energy;
}
vec3 strike(vec2 p,float age,float seed){
 if(age<0.||age>.655)return vec3(0.);
 float x=.35+.30*hash(seed),y=.51+.025*hash(seed+1.);
 float mirror=step(.5,hash(seed+2.));
 vec3 light=channel(p,vec2(x,y),vec2(.30,.52+.07*hash(seed+3.)),mirror,age,1.28);
 // A smaller, displaced fork accompanies the same flash, not another screen pulse.
 float side=mix(-1.,1.,step(.50,x));
 vec2 second=vec2(x-side*.16,.57);
 light+=channel(p,second,vec2(.17,.32),1.-mirror,age-.028,.72);
 return light;
}
void main(){
 vec2 uv=gl_FragCoord.xy/resolution;float a=resolution.x/resolution.y;
 vec2 p=(uv-.5)*vec2(a,1.)/max(a,1.)+.5;
 float t=mod(time,48.),phase=6.28318530718*t/48.;
 // Compact, spatially varying wind field inside cloud layers; no global photo pan.
 float edge=smoothstep(.04,.20,p.x)*(1.-smoothstep(.80,.96,p.x))*smoothstep(.36,.48,p.y)*(1.-smoothstep(.86,.97,p.y));
 vec2 wind=vec2(.012*sin(phase+7.*p.y)+.004*sin(2.*phase+11.*p.x),.005*sin(phase-9.*p.x));
 vec2 cloud=p+edge*wind;
 vec3 col=texture2D(material,vec2(.5+.5*cloud.x,1.-cloud.y)).rgb;
 // Two staggered triplets per 4.8 s, with dark breathing space between storms.
 // The 48 s scene boundary is quiet, preserving the existing seamless cloud loop.
 float burst=mod(t,4.8),seed=floor(t/4.8)*7.;
 col+=strike(p,burst-.18,seed+1.);
 col+=strike(p,burst-.62,seed+2.);
 col+=strike(p,burst-1.06,seed+3.);
 col+=strike(p,burst-2.40,seed+4.);
 col+=strike(p,burst-2.84,seed+5.);
 col+=strike(p,burst-3.28,seed+6.);
 gl_FragColor=vec4(col,1.);
}
`;
 let renderer;
 const announce=()=>window.dispatchEvent(new CustomEvent('classica-nature-ready',{detail:{id}}));
 function releaseMaterial(){if(renderer)renderer.releaseTexture();}
 function image(){return typeof window.ClassicaNatureGL?.material==='function'?window.ClassicaNatureGL.material(id,'assets/realism/lightning-atlas.webp',announce,releaseMaterial):{state:'unavailable',value:null};}
 function create(){
  const surface=window.ClassicaNatureGL?.acquire();if(!surface)return null;
  const {canvas,gl}=surface;let program,buffer,texture,uploadFailed=false;const shaders=[];
  const dispose=()=>{shaders.forEach(s=>gl.deleteShader(s));if(program)gl.deleteProgram(program);if(buffer)gl.deleteBuffer(buffer);if(texture)gl.deleteTexture(texture);};
  try{
   program=gl.createProgram();
   for(const [type,source] of [[gl.VERTEX_SHADER,vertex],[gl.FRAGMENT_SHADER,fragment]]){
    const s=gl.createShader(type);shaders.push(s);gl.shaderSource(s,source);gl.compileShader(s);
    if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error('Seed shader unavailable');gl.attachShader(program,s);
   }
   gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error('Seed program unavailable');
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
   if(!ready())return fallback();const record=image();if(record.state!=='ready')return fallback();if(!(w>0&&h>0))return false;
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
