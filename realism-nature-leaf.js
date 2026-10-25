/* pathetique-2: generated photographic material with local elastic deformation.
 * Not video footage. Load after the existing natural studies and shared context host.
 */
(() => {
 'use strict';
 const legacy=window.ClassicaRealism,id='pathetique-2';
 const description='葉柄を支点に若葉が曲がり、葉脈へ光が透ける情景';
 const vertex='attribute vec2 p;void main(){gl_Position=vec4(p,0.0,1.0);}';
 const fragment=`
precision highp float;
uniform vec2 resolution;
uniform float time;
uniform sampler2D material;
const float TAU=6.28318530718;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 a=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(a),hash(a+vec2(1,0)),f.x),mix(hash(a+vec2(0,1)),hash(a+1.),f.x),f.y);}
void main(){
 vec2 uv=gl_FragCoord.xy/resolution;float aspect=resolution.x/resolution.y;vec2 p=(uv-.5)*vec2(aspect,1.);
 float ph=TAU*mod(time,48.)/48.;float n=noise(p*2.)*.7+noise(p*4.)*.3;
 vec3 col=mix(vec3(.022,.052,.041),vec3(.09,.14,.077),n);
 col+=vec3(.06,.071,.025)*exp(-dot(p-vec2(-.22,.26),p-vec2(-.22,.26))*3.);
 float size=min(.88,aspect*1.18);vec2 tx=p/size+.5;
 float h=clamp(tx.y-.035,0.,1.),lateral=tx.x-.51;
 // Leaf petiole fixed: bending increases quadratically along midrib with delayed lobe torsion.
 float bend=.026*h*h*sin(ph-.7*h)+.008*h*h*sin(ph*2.-h*2.);
 tx.x-=bend;
 float curl=.065*sin(ph*2.-h*3.)*h;
 tx.x=.51+(tx.x-.51)/(1.+curl);
 tx.y+=.017*lateral*lateral*sin(ph*3.-h*3.5)*h+.005*abs(lateral)*sin(ph*2.-h*5.);
 vec4 s=texture2D(material,vec2(tx.x,1.-tx.y));
 float inside=step(0.,tx.x)*step(tx.x,1.)*step(0.,tx.y)*step(tx.y,1.);
 float diffuse=.83+.08*cos(ph-.7*h)+.035*cos(ph*2.-h*3.)*lateral;
 float transmission=.07*pow(max(0.,sin(ph-h*2.)*.5+.5),2.)*smoothstep(.01,.25,abs(lateral));
 vec3 lit=s.rgb*vec3(.90,.96,.79)*diffuse+vec3(.11,.13,.025)*transmission;
 col=mix(col,lit,s.a*inside);
 col*=1.-.12*dot(uv-.5,uv-.5);
 gl_FragColor=vec4(col,1.);
}
`;
 let imageRecord,renderer;
 const announce=()=>window.dispatchEvent(new CustomEvent('classica-nature-ready',{detail:{id}}));
 function image(){
  if(imageRecord)return imageRecord;
  const record=imageRecord={state:'loading',value:null};const img=new Image();img.decoding='async';
  const failed=()=>{record.state='failed';announce();};img.onerror=failed;
  img.onload=()=>{const done=()=>{record.state='ready';record.value=img;announce();};if(typeof img.decode==='function')img.decode().then(done,failed);else done();};
  img.src='assets/realism/pathetique-leaf-material.webp';return record;
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
