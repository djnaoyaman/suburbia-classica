/* vocalise: localized animal movement with fixed environment.
 * Not video footage. Load after the existing natural studies and shared context host.
 */
(() => {
 'use strict';
 const legacy=window.ClassicaRealism,id='vocalise';
 const description='透明な面の小さな結露滴がつながり、細く下へ流れる情景';
 const vertex='attribute vec2 p;void main(){gl_Position=vec4(p,0.0,1.0);}';
 const fragment=`
precision highp float;
uniform vec2 resolution;uniform float time;uniform sampler2D material;
const float TAU=6.28318530718;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float drop(vec2 p,vec2 c,float r,float stretch){vec2 d=(p-c)/vec2(r,r*stretch);float rr=dot(d,d);float z=max(0.,1.-rr);return r*.75*z*z;}
float surface(vec2 p,float ph){float h=0.;vec2 cell=floor(p*16.);for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){vec2 id=cell+vec2(float(x),float(y));vec2 c=(id+vec2(.2+.6*hash(id),.15+.7*hash(id+4.)) )/16.;float r=.0035+.012*hash(id+11.);float alive=1.;for(int j=0;j<5;j++){float fj=float(j);float cx=(fj-2.)*.25+.035*sin(fj*7.)+.012*sin(c.y*15.+fj);float progress=fract(ph/TAU*3.+fj*.213);float passed=clamp((.80-c.y)/1.60,0.,1.);float age=fract(progress-passed);float capture=1.-smoothstep(.020,.040,abs(c.x-cx));alive*=mix(1.,smoothstep(.0,.50,age),capture);}h=max(h,drop(p,c,r*alive,1.05+.35*hash(id+51.)));}
for(int i=0;i<5;i++){float fi=float(i);float progress=fract(ph/TAU*3.+fi*.213);float cx=(fi-2.)*.25+.035*sin(fi*7.);float cy=.80-progress*1.60;vec2 c=vec2(cx+.012*sin(cy*15.+fi),cy);float r=.015+.008*hash(vec2(fi,7.));float d=drop(p,c,r,1.55);float k=.003;float blend=clamp(.5+.5*(d-h)/k,0.,1.);h=mix(h,d,blend)+k*blend*(1.-blend);float trail=(1.-smoothstep(.004,.010,abs(p.x-c.x)))*smoothstep(0.,.05,p.y-c.y)*(1.-smoothstep(.06,.22,p.y-c.y));h=max(h,.0025*trail);}
return h;}
void main(){vec2 uv=gl_FragCoord.xy/resolution;float a=resolution.x/resolution.y;vec2 p=(uv-.5)*vec2(a,1.);float ph=TAU*mod(time,48.)/48.;float h=surface(p,ph);float e=.001;vec2 slope=vec2(surface(p+vec2(e,0.),ph)-surface(p-vec2(e,0.),ph),surface(p+vec2(0.,e),ph)-surface(p-vec2(0.,e),ph))/(2.*e);vec3 n=normalize(vec3(-slope,1.));vec2 base=p/max(a,1.)+.5;vec3 dry=texture2D(material,vec2(base.x,1.-base.y)).rgb;vec2 refractUV=clamp(base+slope*.06,vec2(.001),vec2(.999));vec3 wet=texture2D(material,vec2(refractUV.x,1.-refractUV.y)).rgb;float fres=pow(1.-n.z,3.);float light=pow(max(dot(n,normalize(vec3(-.5,.7,1.))),0.),70.);wet=wet*(.92+.08*n.z)+vec3(.40,.46,.5)*fres*.10+vec3(.75,.80,.84)*light*.25;float mask=smoothstep(.0002,.002,h);vec3 col=mix(dry,wet,mask);gl_FragColor=vec4(col,1.);}
`;
 let imageRecord,renderer;
 const announce=()=>window.dispatchEvent(new CustomEvent('classica-nature-ready',{detail:{id}}));
 function image(){
  if(imageRecord)return imageRecord;
  const record=imageRecord={state:'loading',value:null};const img=new Image();img.decoding='async';
  const failed=()=>{record.state='failed';announce();};img.onerror=failed;
  img.onload=()=>{const done=()=>{record.state='ready';record.value=img;announce();};if(typeof img.decode==='function')img.decode().then(done,failed);else done();};
  img.src='assets/realism/condensation-environment.webp';return record;
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
