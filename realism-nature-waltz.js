/* Brahms waltz: wet autumn leaf over reflection material and moving surface normals.
 * Not video footage. Load after the existing natural studies and shared context host.
 */
(() => {
 'use strict';
 const legacy=window.ClassicaRealism,id='brahms-waltz-15';
 const description='秋色の葉が小さな水の渦へゆるやかに回る情景';
 const vertex='attribute vec2 p;void main(){gl_Position=vec4(p,0.0,1.0);}';
 const fragment=`
precision highp float;
uniform vec2 resolution;uniform float time;uniform sampler2D material;
const float TAU=6.28318530718;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 a=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(a),hash(a+vec2(1,0)),f.x),mix(hash(a+vec2(0,1)),hash(a+1.),f.x),f.y);}
float fbm(vec2 p){float s=0.,a=.5;for(int i=0;i<5;i++){s+=a*noise(p);p=mat2(1.6,-1.2,1.2,1.6)*p+1.7;a*=.5;}return s;}
float height(vec2 p,float ph){float r=length(p);return .006*sin(dot(p,vec2(10.,6.))+ph*2.)+.003*sin(dot(p,vec2(-17.,12.))-ph*3.)+.002*sin(r*42.-ph*4.)*exp(-r*r*9.);}
void main(){vec2 uv=gl_FragCoord.xy/resolution;float aspect=resolution.x/resolution.y;vec2 p=(uv-.5)*vec2(aspect,1.);float ph=TAU*mod(time,48.)/48.;
 float e=.003,h=height(p,ph);vec2 normal=vec2(height(p+vec2(e,0),ph)-h,height(p+vec2(0,e),ph)-h)/e;
 vec2 env=(uv-.5)*vec2(aspect,1.)/max(aspect,1.)+.5;
 env+=normal*.032;env=clamp(env,vec2(.002),vec2(.998));
 vec3 col=texture2D(material,vec2(.5+.5*env.x,1.-env.y)).rgb*.90;
 float size=min(.46,aspect*.62);vec2 center=size*vec2(.10*cos(ph),.08*sin(ph));vec2 local=p-center;float angle=ph+.10*sin(ph*3.);mat2 turn=mat2(cos(angle),-sin(angle),sin(angle),cos(angle));vec2 tx=turn*local/size+.5;
 // Small local tip flex rides water height while whole leaf drifts and rotates.
 float edge=length(tx-.5);tx.y+=.004*sin(ph*3.+tx.x*4.)*edge;
 vec4 s=texture2D(material,vec2(clamp(tx.x*.5,.0005,.4995),clamp(1.-tx.y,.0005,.9995)));float inside=step(0.,tx.x)*step(tx.x,1.)*step(0.,tx.y)*step(tx.y,1.);
 vec2 shadowtx=turn*(local+vec2(.004,.005))/size+.5;vec4 shadow=texture2D(material,vec2(clamp(shadowtx.x*.5,.0005,.4995),clamp(1.-shadowtx.y,.0005,.9995)));float shadowin=step(0.,shadowtx.x)*step(shadowtx.x,1.)*step(0.,shadowtx.y)*step(shadowtx.y,1.);col*=1.-shadow.a*shadowin*.32;
 // Thin contact meniscus follows the actual material alpha contour, not a perfect circle.
 vec2 texel=vec2(.0025,0.);float ax=texture2D(material,vec2(clamp((tx.x+.005)*.5,.0005,.4995),clamp(1.-tx.y,.0005,.9995))).a;
 float ay=texture2D(material,vec2(clamp(tx.x*.5,.0005,.4995),clamp(1.-tx.y+.005,.0005,.9995))).a;
 float rim=max(0.,max(ax,ay)-s.a)*inside;col=mix(col,col*1.18+vec3(.025,.03,.03),rim*.55);
 vec3 leaf=s.rgb*vec3(.90,.92,.87)*(.89+.045*sin(ph*2.+tx.y*3.));col=mix(col,leaf,s.a*inside);col*=1.-.13*dot(uv-.5,uv-.5);gl_FragColor=vec4(col,1.);}
`;
 let renderer;
 const announce=()=>window.dispatchEvent(new CustomEvent('classica-nature-ready',{detail:{id}}));
 function releaseMaterial(){if(renderer)renderer.releaseTexture();}
 function image(){return typeof window.ClassicaNatureGL?.material==='function'?window.ClassicaNatureGL.material(id,'assets/realism/waltz-water-atlas.webp',announce,releaseMaterial):{state:'unavailable',value:null};}
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
