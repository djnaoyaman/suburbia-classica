/* Generated photographic-style material with local natural-motion deformation.
 * Not recorded footage or generated video; load after the shared natural context.
 */
(() => {
 'use strict';
 const legacy=window.ClassicaRealism,id='brindisi';
 const description='透明なグラスの水から、小さな気泡が異なる速さで立ち上る';
 const vertex='attribute vec2 p;void main(){gl_Position=vec4(p,0.0,1.0);}';
 const fragment=`
precision highp float;
uniform vec2 resolution;uniform float time;uniform sampler2D material;
const float TAU=6.28318530718;
vec3 photo(vec2 q){return texture2D(material,vec2(q.x,1.-q.y)).rgb;}
float rand(float n){return fract(sin(n*127.1+35.7)*43758.5453);}
void main(){vec2 uv=gl_FragCoord.xy/resolution;float a=resolution.x/resolution.y;vec2 q=vec2(.5,.5)+(uv-.5)*vec2(min(a,1.),min(1./a,1.))*.98;float t=mod(time,48.);vec3 col=photo(q);
for(int i=0;i<32;i++){float k=float(i),seed=rand(k+1.);float cycles=4.+floor(rand(k+13.)*4.);float f=fract(t/48.*cycles+seed);float x=.385+.23*rand(k+39.);float y=.395+.155*f;float r=(.0024+.0020*rand(k+51.))*(.7+.3*f);vec2 c=vec2(x+.0015*sin(f*TAU*2.+k),y);vec2 d=(q-c)/r;float rr=dot(d,d);if(rr<1.){float z=sqrt(max(0.,1.-rr));float opacity=smoothstep(0.,.08,f)*(1.-smoothstep(.92,1.,f));float rim=pow(1.-z,2.);vec3 refr=photo(q+d*r*.6);float glint=exp(-dot(d-vec2(-.28,.35),d-vec2(-.28,.35))*35.);vec3 optical=refr*(1.-.65*rim)+vec3(.10,.09,.07)*rim+vec3(.62,.60,.55)*glint;col=mix(col,optical,opacity*(1.-smoothstep(.85,1.,rr)));}}
gl_FragColor=vec4(col,1.);}
`;
 let imageRecord,renderer;
 const announce=()=>window.dispatchEvent(new CustomEvent('classica-nature-ready',{detail:{id}}));
 function image(){
  if(imageRecord)return imageRecord;
  const record=imageRecord={state:'loading',value:null};const img=new Image();img.decoding='async';
  const failed=()=>{record.state='failed';announce();};img.onerror=failed;
  img.onload=()=>{const done=()=>{record.state='ready';record.value=img;announce();};if(typeof img.decode==='function')img.decode().then(done,failed);else done();};
  img.src='assets/realism/sparkling-material.webp';return record;
 }
 function create(){
  const surface=window.ClassicaNatureGL?.acquire();if(!surface)return null;
  const {canvas,gl}=surface;let program,buffer,texture,uploadFailed=false;const shaders=[];
  const dispose=()=>{shaders.forEach(s=>gl.deleteShader(s));if(program)gl.deleteProgram(program);if(buffer)gl.deleteBuffer(buffer);if(texture)gl.deleteTexture(texture);};
  try{
   program=gl.createProgram();
   for(const [type,source] of [[gl.VERTEX_SHADER,vertex],[gl.FRAGMENT_SHADER,fragment]]){
    const s=gl.createShader(type);shaders.push(s);gl.shaderSource(s,source);gl.compileShader(s);
    if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error('Material shader unavailable');gl.attachShader(program,s);
   }
   gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error('Material program unavailable');
   shaders.splice(0).forEach(s=>gl.deleteShader(s));buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
   gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
   const u=Object.fromEntries(['resolution','time','material'].map(k=>[k,gl.getUniformLocation(program,k)]));
   canvas.addEventListener('webglcontextrestored',()=>{dispose();renderer=undefined;announce();},{once:true});
   return {canvas,gl,program,buffer,u,position:gl.getAttribLocation(program,'p'),upload(img){
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
