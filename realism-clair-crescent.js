/* Clair de Lune: original generated photographic-style crescent seascape.
 * Stable moon, stars and horizon; localized slow cloud drift and water ripples.
 * Not recorded footage or generated video. Uses the shared material lifecycle.
 */
(() => {
 'use strict';
 const legacy=window.ClassicaRealism,id='clair-de-lune';
 const description='三日月と銀青色の雲、静かな海面 — 雲はゆっくり流れ、水面だけが細かく揺れる';
 const vertex='attribute vec2 p;void main(){gl_Position=vec4(p,0.0,1.0);}';
 const fragment=`
precision highp float;
uniform vec2 resolution;uniform float time;uniform sampler2D material;
const float TAU=6.28318530718;
const float PHOTO_ASPECT=1672./941.;
vec3 photo(vec2 p){return texture2D(material,p).rgb;}
void main(){
 vec2 uv=vec2(gl_FragCoord.x/resolution.x,1.-gl_FragCoord.y/resolution.y);
 float aspect=resolution.x/resolution.y;
 // Cover, not stretch: use a fixed composition, never an animated camera.
 // Portrait centers on the crescent/reflection rather than losing them at right.
 float portrait=1.-smoothstep(.80,1.30,aspect);
 vec2 center=vec2(mix(.5,.565,portrait),.5);
 vec2 span=vec2(min(1.,aspect/PHOTO_ASPECT),min(1.,PHOTO_ASPECT/aspect))*.985;
 vec2 q=center+(uv-.5)*span;
 // Integer harmonics give a continuous 240-second loop, independent of frame
 // count. The player's unchanged logical clock supplies pause/seek/reduced12.
 float ph=mod(mod(time,240.)+240.,240.)/240.*TAU;
 // A conservative interior mask follows the photographed low cloud bank.
 // Clear sky, stars, moon, halo and the straight sea horizon stay pixel-still.
 float cloudTop=.19+.34*exp(-pow((q.x-.59)/.35,2.));
 float cloudBand=smoothstep(cloudTop,cloudTop+.07,q.y)*(1.-smoothstep(.602,.647,q.y));
 float moonLock=smoothstep(.075,.12,length((q-vec2(.589,.326))*vec2(PHOTO_ASPECT,1.)));
 float edge=smoothstep(.012,.065,q.x)*(1.-smoothstep(.935,.988,q.x));
 float cloud=cloudBand*moonLock*edge;
 float drift=.010*sin(ph)+.002*sin(ph*2.+q.x*3.);
 vec2 cloudFlow=vec2(drift,.0008*sin(ph+q.x*4.))*cloud;
 // Drifting cloud features move at <= ~0.62 source pixels/s horizontally.
 // This is deliberately a quiet atmospheric motion, not a time-lapse.
 vec3 col=photo(q+cloudFlow);
 // Water-only gravity-wave normals: amplitude grows with foreground depth;
 // source horizon is anchored. Ripples and reflected glints move locally,
 // with no whole-image swelling, moon deformation or global luminance pulse.
 float water=smoothstep(.657,.700,q.y);
 float depth=clamp((q.y-.657)/.343,0.,1.);
 float waveA=sin(q.y*170.+q.x*8.-ph*20.);
 float waveB=sin(q.y*255.-q.x*17.+ph*29.);
 float waveC=sin(q.y*90.+q.x*27.-ph*13.);
 vec2 ripple=water*vec2((.00035+.00075*depth)*(waveA+.35*waveB),
                          (.00012+.00045*depth)*(waveB+.25*waveC));
 vec3 sea=photo(q+ripple);
 // Modest normal-driven glint variation only on photographed water highlights.
 float glintMask=smoothstep(.13,.52,max(sea.r,max(sea.g,sea.b)));
 sea*=1.+water*glintMask*(.032*waveA+.018*waveB);
 col=mix(col,sea,water);
 gl_FragColor=vec4(col,1.);
}

`;
 let renderer;
 const announce=()=>window.dispatchEvent(new CustomEvent('classica-nature-ready',{detail:{id}}));
 function releaseMaterial(){if(renderer)renderer.releaseTexture();}
 function images(){return ['scene'].map(name=>typeof window.ClassicaNatureGL?.material==='function'?window.ClassicaNatureGL.material(id,'assets/realism/clair-crescent.webp',announce,releaseMaterial):{state:'unavailable',value:null});}
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
   const u=Object.fromEntries(['resolution','time','material'].map(k=>[k,gl.getUniformLocation(program,k)]));
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
   textures.forEach((texture,i)=>{gl.activeTexture(gl.TEXTURE0+i);gl.bindTexture(gl.TEXTURE_2D,texture);});gl.uniform1i(u.material,0);gl.uniform2f(u.resolution,rw,rh);gl.uniform1f(u.time,Number.isFinite(t)?t:0);
   gl.drawArrays(gl.TRIANGLES,0,6);c.drawImage(canvas,0,0,w,h);return true;
  }
 };
})();
