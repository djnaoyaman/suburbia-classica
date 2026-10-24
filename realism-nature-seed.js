/* Traeumerei: photographic botanical material with local, lagged air-drag deformation.
 * Not video footage. Load after the existing natural studies and shared context host.
 */
(() => {
 'use strict';
 const legacy=window.ClassicaRealism,id='traumerei';
 const description='逆光の冠毛と種子軸が、空気の流れに遅れて揺れる情景';
 const vertex='attribute vec2 p;void main(){gl_Position=vec4(p,0.0,1.0);}';
 const fragment=`
precision highp float;
uniform vec2 resolution;
uniform float time;
uniform sampler2D material;
const float TAU=6.28318530718;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 a=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(a),hash(a+vec2(1,0)),f.x),mix(hash(a+vec2(0,1)),hash(a+1.),f.x),f.y);}
float fbm(vec2 p){float a=.5,s=0.;for(int i=0;i<4;i++){s+=a*noise(p);p=mat2(1.6,-1.2,1.2,1.6)*p+2.7;a*=.5;}return s;}
void main(){
 vec2 uv=gl_FragCoord.xy/resolution;float aspect=resolution.x/resolution.y;
 float ph=TAU*mod(time,48.)/48.;vec2 q=(uv-.5)*vec2(aspect,1.);
 float haze=fbm(q*2.0+vec2(cos(ph),sin(ph))*.025);
 vec3 col=mix(vec3(.027,.041,.039),vec3(.095,.106,.079),haze);
 col+=vec3(.063,.052,.031)*exp(-dot(q-vec2(-.3,.2),q-vec2(-.3,.2))*2.4);
 for(int i=0;i<24;i++){
  float fi=float(i),depth=hash(vec2(fi,2.));
  vec2 center=vec2((hash(vec2(fi,8.))-.5)*2.6,(hash(vec2(fi,9.))-.5)*1.4)+vec2(.045*sin(ph+fi),.025*cos(ph*2.+fi));
  vec2 d=q-center;float radius=.0015+depth*depth*.006;
  col+=vec3(.24,.23,.16)*exp(-dot(d,d)/(radius*radius))*.24;
 }
 // Whole-seed drag and lag; crown and seed-axis do not move as a rigid image.
 float size=min(.56,aspect*.84);vec2 center=vec2(.018*sin(ph),.012*cos(ph*2.));
 vec2 p=q-center;float angle=.065*sin(ph-.28)+.018*sin(ph*2.-.7);
 p=mat2(cos(angle),-sin(angle),sin(angle),cos(angle))*p;
 vec2 tex=p/size+.5;
 vec2 root=vec2(.55,.53),radial=tex-root;float distance=length(radial);
 float crown=smoothstep(.46,.66,tex.y);float tip=smoothstep(.025,.44,distance);
 float localLag=sin(ph*3.-distance*3.4+radial.x*2.);
 tex.x+=.012*crown*tip*localLag;
 tex.y+=.006*crown*tip*sin(ph*2.-distance*4.1+radial.x*4.);
 float seedLag=(1.-smoothstep(.36,.56,tex.y));tex.x+=.006*seedLag*sin(ph-1.1)*(root.y-tex.y);
 vec4 s=texture2D(material,vec2(tex.x,1.-tex.y));
 float inside=step(0.,tex.x)*step(tex.x,1.)*step(0.,tex.y)*step(tex.y,1.);
 // Treat the broad translucent membrane as transmission; retain bright photographic fiber detail.
 float luminance=dot(s.rgb,vec3(.2126,.7152,.0722));
 float fiber=smoothstep(.54,.88,luminance);
 float opticalAlpha=s.a*mix(1.,.18+.82*fiber,crown);
 float lambert=.89+.06*sin(ph-.35)+.045*sin(ph*2.-distance*2.);
 vec3 lit=s.rgb*vec3(1.,.98,.91)*lambert;
 col=mix(col,lit,opticalAlpha*inside);
 col*=1.-.10*dot(uv-.5,uv-.5);
 gl_FragColor=vec4(pow(max(col,vec3(0.)),vec3(.94)),1.);
}
`;
 let imageRecord,renderer;
 const announce=()=>window.dispatchEvent(new CustomEvent('classica-nature-ready',{detail:{id}}));
 function image(){
  if(imageRecord)return imageRecord;
  const record=imageRecord={state:'loading',value:null};const img=new Image();img.decoding='async';
  const failed=()=>{record.state='failed';announce();};img.onerror=failed;
  img.onload=()=>{const done=()=>{record.state='ready';record.value=img;announce();};if(typeof img.decode==='function')img.decode().then(done,failed);else done();};
  img.src='assets/realism/traumerei-seed-material.webp';return record;
 }
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
