/* Generated photographic-style material with local natural-motion deformation.
 * Not recorded footage or generated video; load after the shared natural context.
 */
(() => {
 'use strict';
 const legacy=window.ClassicaRealism,id='queen-of-night';
 const description='炭化した木の熾火から、小さな灰片がゆっくり立ち上る';
 const vertex='attribute vec2 p;void main(){gl_Position=vec4(p,0.0,1.0);}';
 const fragment=`
precision highp float;
uniform vec2 resolution;uniform float time;uniform sampler2D material;
const float TAU=6.28318530718;
float rand(float n){return fract(sin(n*127.1+61.7)*43758.5453);}
void main(){vec2 uv=gl_FragCoord.xy/resolution;float a=resolution.x/resolution.y;vec2 q=vec2(.5,.5)+(uv-.5)*vec2(min(a,1.),min(1./a,1.))*.98;float t=mod(time,48.);vec3 col=texture2D(material,vec2(q.x,1.-q.y)).rgb;
// Individual ash flakes rise from the coal bed; wood and ground never warp.
for(int i=0;i<18;i++){float k=float(i),seed=rand(k+1.);float cycles=3.+floor(rand(k+19.)*3.);float f=fract(t/48.*cycles+seed);float opacity=smoothstep(0.,.12,f)*(1.-smoothstep(.78,1.,f));vec2 c=vec2(.40+.19*rand(k+31.)+.025*sin(f*5.+k)*f,.425+.235*f);float r=.0023+.0028*rand(k+43.);float spin=TAU*(f*(1.+floor(seed*3.))+seed);mat2 rot=mat2(cos(spin),-sin(spin),sin(spin),cos(spin));vec2 d=rot*(q-c)/r;d.y/=.35+.42*rand(k+53.);float rr=length(d);float shape=1.-smoothstep(.52,.95,rr*(1.+.15*sin(atan(d.y,d.x)*3.+k)));float hot=step(.64,rand(k+7.));vec3 ash=mix(vec3(.52,.47,.40),vec3(.82,.26,.035),hot);col=mix(col,ash,shape*opacity*.82);float glow=exp(-dot((q-c)/(r*2.5),(q-c)/(r*2.5)))*hot*opacity;col+=vec3(.07,.018,.002)*glow;}
gl_FragColor=vec4(col,1.);}
`;
 let imageRecord,renderer;
 const announce=()=>window.dispatchEvent(new CustomEvent('classica-nature-ready',{detail:{id}}));
 function image(){
  if(imageRecord)return imageRecord;
  const record=imageRecord={state:'loading',value:null};const img=new Image();img.decoding='async';
  const failed=()=>{record.state='failed';announce();};img.onerror=failed;
  img.onload=()=>{const done=()=>{record.state='ready';record.value=img;announce();};if(typeof img.decode==='function')img.decode().then(done,failed);else done();};
  img.src='assets/realism/embers-material.webp';return record;
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
