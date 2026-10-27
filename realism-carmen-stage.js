/* Carmen Prelude: weighted scarlet stage drapery, corrected hanging shape.
 * Top suspension and left edge pinned; minute local fold drift only.
 * The existing separate stone/backstage/floor material remains unchanged.
 */
(() => {
 'use strict';
 const legacy=window.ClassicaRealism,id='carmen-prelude';
 const description='金色の舞台光のなか、緋色の重い幕が吊り元から縦のひだを作って垂れ、裾近くの布だけが微かに揺れる。奥の石造アーチは深い陰影を保つ';
 const vertex='attribute vec2 p;void main(){gl_Position=vec4(p,0.0,1.0);}';
 const fragment=`
precision highp float;
uniform vec2 resolution;uniform float time;uniform sampler2D material;uniform sampler2D backdrop;
const float TAU=6.28318530718;
vec4 curtainPhoto(vec2 p){return texture2D(material,vec2(p.x,1.-p.y));}
vec3 stagePhoto(vec2 p){return texture2D(backdrop,vec2(p.x,1.-p.y)).rgb;}
void main(){
 vec2 uv=gl_FragCoord.xy/resolution;float a=resolution.x/resolution.y;
 float portrait=1.-smoothstep(.75,1.15,a);
 vec2 span=vec2(min(a,1.),min(1./a,1.))*.98;
 // Static framing keeps the weighted hem and a little stage floor in wide crops.
 float centerX=clamp(mix(.5,.56,portrait),span.x*.5+.001,1.-span.x*.5-.001);
 vec2 center=vec2(centerX,min(.5,.145+span.y*.5));
 vec2 q=center+(uv-.5)*span;
 float t=TAU*mod(mod(time,60.)+60.,60.)/60.;
 // Heavy hanging fabric: pin upper support/left edge and limit deformation to
 // tiny differently phased folds. No sweeping the entire cutout through space.
 float side=smoothstep(.015,.13,q.x)*(1.-smoothstep(.54,.59,q.x));
 float support=1.-smoothstep(.86,.98,q.y);
 float flex=side*support*pow(max(0.,1.-q.y),1.7);
 float pressure=sin(t*5.-q.y*3.2)+.2*sin(t*3.-q.y*5.+q.x*4.);
 vec2 p=q+flex*vec2(.0022*pressure,.00016*sin(t*5.-q.y*3.2-1.2));
 vec4 cloth=curtainPhoto(p);
 // Ignore single-alpha-step generation dust outside the antialiased cloth edge.
 cloth.a=cloth.a<.006?0.:cloth.a;
 vec3 background=stagePhoto(q);
 // Subtle illumination follows fabric only; background and rigging stay rigid.
 vec3 lit=cloth.rgb*(1.+.01*side*support*sin(t*3.-p.y*4.));
 gl_FragColor=vec4(mix(background,lit,cloth.a),1.);
}
`;
 let renderer;
 const announce=()=>window.dispatchEvent(new CustomEvent('classica-nature-ready',{detail:{id}}));
 function releaseMaterial(){if(renderer)renderer.releaseTexture();}
 function images(){return ['curtain','background'].map(name=>typeof window.ClassicaNatureGL?.material==='function'?window.ClassicaNatureGL.material(id,'assets/realism/carmen-stage-'+(name==='curtain'?'curtain-weighted':name)+'.webp',announce,releaseMaterial):{state:'unavailable',value:null});}
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
