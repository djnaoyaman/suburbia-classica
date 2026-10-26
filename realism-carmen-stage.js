/* Carmen Prelude: generated photographic-style stage material.
 * Local wind pressure animates silk folds/hem; architecture remains rigid.
 * Not recorded footage or generated video; load after the shared natural context.
 */
(() => {
 'use strict';
 const legacy=window.ClassicaRealism,id='carmen-prelude';
 const description='金色の舞台光に緋色の絹幕がたわみ、奥の石造アーチが深い陰影を保つ';
 const vertex='attribute vec2 p;void main(){gl_Position=vec4(p,0.0,1.0);}';
 const fragment=`
precision highp float;
uniform vec2 resolution;uniform float time;uniform sampler2D material;uniform sampler2D backdrop;
const float TAU=6.28318530718;
vec4 silkPhoto(vec2 p){return texture2D(material,vec2(p.x,1.-p.y));}
vec3 stagePhoto(vec2 p){return texture2D(backdrop,vec2(p.x,1.-p.y)).rgb;}
void main(){
vec2 uv=gl_FragCoord.xy/resolution;float a=resolution.x/resolution.y;
// Responsive photographic framing: keep the free scarlet hem and the warm
// arch edge together in the narrow crop; no camera pan or zoom is animated.
float portrait=1.-smoothstep(.75,1.15,a);
vec2 center=vec2(mix(.5,.56,portrait),mix(.46,.5,portrait));
vec2 q=center+(uv-.5)*vec2(min(a,1.),min(1./a,1.))*.98;
float t=mod(mod(time,48.)+48.,48.)/48.*TAU;
// One 48-second, seek-deterministic wind/light cycle, not a claim of
// bar-accurate synchronization to the recording. The upper suspension and
// left hanging edge remain pinned; slower pressure bends the lower folds.
// Only the alpha-isolated silk is deformed. The separate background is
// sampled at q, so even backstage rigging and newly exposed gaps stay rigid.
float side=smoothstep(.025,.17,q.x)*(1.-smoothstep(.61,.69,q.x));
float height=smoothstep(.14,.24,q.y)*(1.-smoothstep(.84,.99,q.y));
float flex=side*height*pow(1.-q.y,1.25);
float pressure=sin(t*7.-q.y*5.5)+.32*sin(t*11.-q.y*9.+q.x*4.);
vec2 flow=flex*vec2(.049*pressure,.014*sin(t*7.-q.y*5.5-1.2));
vec2 p=clamp(q+flow,vec2(.001),vec2(.999));
vec4 cloth=silkPhoto(p);
vec3 background=stagePhoto(q);
vec3 col=cloth.rgb;
// Low-amplitude moving highlights follow the photographed silk only.
// No strobe, full-screen flash, fake camera motion or warped architecture.
float silk=smoothstep(.06,.18,col.r-max(col.g,col.b));
float lightBand=exp(-pow((p.x-(.36+.055*sin(t*2.)))*7.,2.));
float shadow=.5-.5*cos(t);
float foldLight=(.95+.105*lightBand+.035*sin(t*7.-p.y*5.5)-.07*shadow);
col*=mix(1.,foldLight,silk*side);
gl_FragColor=vec4(mix(background,col,cloth.a),1.);
}
`;
 let renderer;
 const announce=()=>window.dispatchEvent(new CustomEvent('classica-nature-ready',{detail:{id}}));
 function releaseMaterial(){if(renderer)renderer.releaseTexture();}
 function images(){return ['curtain','background'].map(name=>typeof window.ClassicaNatureGL?.material==='function'?window.ClassicaNatureGL.material(id,'assets/realism/carmen-stage-'+name+'.webp',announce,releaseMaterial):{state:'unavailable',value:null});}
 function create(){
  const surface=window.ClassicaNatureGL?.acquire();if(!surface)return null;
  const {canvas,gl}=surface;let program,buffer,uploadFailed=false;const shaders=[],textures=[];
  const dispose=()=>{shaders.forEach(s=>gl.deleteShader(s));if(program)gl.deleteProgram(program);if(buffer)gl.deleteBuffer(buffer);textures.splice(0).forEach(t=>{if(t)gl.deleteTexture(t);});};
  try{
   program=gl.createProgram();
   for(const [type,source] of [[gl.VERTEX_SHADER,vertex],[gl.FRAGMENT_SHADER,fragment]]){
    const s=gl.createShader(type);shaders.push(s);gl.shaderSource(s,source);gl.compileShader(s);
    if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error('Material shader unavailable');gl.attachShader(program,s);
   }
   gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error('Material program unavailable');
   shaders.splice(0).forEach(s=>gl.deleteShader(s));buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
   gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
   const u=Object.fromEntries(['resolution','time','material','backdrop'].map(k=>[k,gl.getUniformLocation(program,k)]));
   canvas.addEventListener('webglcontextrestored',()=>{dispose();renderer=undefined;announce();},{once:true});
   return {canvas,gl,program,buffer,u,position:gl.getAttribLocation(program,'p'),releaseTexture(){textures.splice(0).forEach(t=>{if(t)gl.deleteTexture(t);});uploadFailed=false;},upload(img,slot){
    if(uploadFailed)return null;if(textures[slot])return textures[slot];let texture;
    try{
     if(typeof gl.getError==='function'){for(let n=0;n<8;n++){if(gl.getError()===gl.NO_ERROR)break;}}
     texture=gl.createTexture();if(!texture)throw Error('Texture unavailable');
     gl.activeTexture(gl.TEXTURE0+slot);gl.bindTexture(gl.TEXTURE_2D,texture);
     gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,false);gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,false);gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL,gl.NONE);
     gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,img);
     gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
     gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
     if(typeof gl.getError==='function'&&gl.getError()!==gl.NO_ERROR)throw Error('Texture upload unavailable');
     textures[slot]=texture;return texture;
    }catch(error){if(texture)gl.deleteTexture(texture);uploadFailed=true;return null;}
   }};
  }catch(error){dispose();return null;}
 }
 function ready(){if(window.ClassicaNatureGL?.acquire()?.gl.isContextLost())return false;if(renderer===undefined)renderer=create();return renderer&&!renderer.gl.isContextLost();}
 window.ClassicaRealism={
  has:key=>key===id||legacy.has(key),describe:key=>key===id?description:legacy.describe(key),
  list:()=>legacy.list().map(item=>item.id===id?{...item,description}:item),
  available(key){if(key!==id)return legacy.available(key);if(ready()){images();return true;}return legacy.available(key);},
  init:key=>key===id?{id,nature:true,fallback:legacy.init(key)}:legacy.init(key),
  draw(c,w,h,t,st){
   if(st.id!==id)return legacy.draw(c,w,h,t,st);
   const fallback=()=>legacy.draw(c,w,h,t,st.fallback||legacy.init(id));
   if(!(w>0&&h>0))return false;if(!ready())return fallback();const records=images();if(records.some(record=>record.state!=='ready'))return fallback();
   const {canvas,gl,program,buffer,u,position}=renderer;let textures;
   try{textures=records.map((record,i)=>renderer.upload(record.value,i));}catch(error){return fallback();}if(textures.some(texture=>!texture))return fallback();
   const scale=Math.min(1,960/w,600/h),rw=Math.max(1,Math.round(w*scale)),rh=Math.max(1,Math.round(h*scale));
   if(canvas.width!==rw||canvas.height!==rh){canvas.width=rw;canvas.height=rh;}
   gl.viewport(0,0,rw,rh);gl.useProgram(program);gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.enableVertexAttribArray(position);gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
   textures.forEach((texture,i)=>{gl.activeTexture(gl.TEXTURE0+i);gl.bindTexture(gl.TEXTURE_2D,texture);});gl.uniform1i(u.material,0);gl.uniform1i(u.backdrop,1);gl.uniform2f(u.resolution,rw,rh);gl.uniform1f(u.time,Number.isFinite(t)?t:0);
   gl.drawArrays(gl.TRIANGLES,0,6);c.drawImage(canvas,0,0,w,h);return true;
  }
 };
})();
