/* Traeumerei: an editorial dream of Cappadocia, not Schumann biography.
 * Fixed photographic terrain with three separately translated balloon sprites.
 * One premultiplied-alpha atlas; caller-time motion and existing lifecycle.
 */
(() => {
 'use strict';
 const legacy=window.ClassicaRealism,id='traumerei';
 const description='朝のカッパドキア。奇岩と谷は静止し、遠近のある三つの気球がゆっくり風に漂う';
 const vertex='attribute vec2 p;void main(){gl_Position=vec4(p,0.0,1.0);}';
 const fragment=`
precision highp float;
uniform vec2 resolution;uniform float time;uniform sampler2D material;
const float TAU=6.28318530718,ASPECT=1672./941.;
// Atlas: unchanged 1672x941 landscape at (0,0); three alpha sprites at y=944.
// Sprite RGB is premultiplied offline, preventing dark/white edge halos.
vec3 balloon(vec3 col,vec2 p,vec2 center,vec2 size,float column,float phase,float lag,float drift){
 vec2 offset=vec2(drift*(sin(phase+lag)-sin(lag)),-.012*(sin(phase+lag*.7)-sin(lag*.7)));
 vec2 q=(p-center-offset)/size+.5;
 if(q.x<0.||q.x>1.||q.y<0.||q.y>1.)return col;
 // Clamp to half-pixel cell interiors so no adjacent balloon/atlas bleed occurs.
 float x0=column<.5?0.:(column<1.5?591.:1183.);
 float cw=column<1.5?(column<.5?591.:592.):591.;
 vec2 texel=vec2(x0+.5+q.x*(cw-1.),944.5+q.y*886.);
 vec4 sprite=texture2D(material,texel/vec2(1774.,1831.));
 return col*(1.-sprite.a)+min(sprite.rgb,vec3(sprite.a));
}
void main(){
 vec2 uv=gl_FragCoord.xy/resolution;float a=resolution.x/resolution.y;
 float cx=.5;
 vec2 span=vec2(min(a/ASPECT,1.),min(ASPECT/a,1.))*.99;
 cx=clamp(cx,.5*span.x+.005,1.-.5*span.x-.005);
 vec2 p=vec2(cx,.5)+(vec2(uv.x,1.-uv.y)-.5)*span;
 float phase=TAU*mod(mod(time,960.)+960.,960.)/960.;
 // No animated UV is ever applied to the fixed landscape.
 vec3 col=texture2D(material,p*vec2(1672.,941.)/vec2(1774.,1831.)).rgb;
 // Far to near; safe sky-only altitude envelopes never intersect terrain.
 col=balloon(col,p,vec2(.735,.255),vec2(.033,.073),2.,phase,.30,.026);
 col=balloon(col,p,vec2(.510,.230),vec2(.057,.126),1.,phase,.20,.032);
 col=balloon(col,p,vec2(.280,.245),vec2(.080,.176),0.,phase,.10,.040);
 gl_FragColor=vec4(clamp(col,0.,1.),1.);
}
`;
 let renderer;
 const announce=()=>window.dispatchEvent(new CustomEvent('classica-nature-ready',{detail:{id}}));
 function releaseMaterial(){if(renderer)renderer.releaseTexture();}
 function image(){return typeof window.ClassicaNatureGL?.material==='function'?window.ClassicaNatureGL.material(id,'assets/realism/traumerei-cappadocia-atlas.webp',announce,releaseMaterial):{state:'unavailable',value:null};}
 function create(){
  const surface=window.ClassicaNatureGL?.acquire();if(!surface)return null;
  const {canvas,gl}=surface;let program,buffer,texture,uploadFailed=false;const shaders=[];
  const dispose=()=>{shaders.forEach(s=>gl.deleteShader(s));if(program)gl.deleteProgram(program);if(buffer)gl.deleteBuffer(buffer);if(texture)gl.deleteTexture(texture);};
  try{
   program=gl.createProgram();
   for(const [type,source] of [[gl.VERTEX_SHADER,vertex],[gl.FRAGMENT_SHADER,fragment]]){
    const s=gl.createShader(type);shaders.push(s);gl.shaderSource(s,source);gl.compileShader(s);
    if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error('Cappadocia shader unavailable');gl.attachShader(program,s);
   }
   gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error('Cappadocia program unavailable');
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
