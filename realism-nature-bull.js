/* toreador: localized animal movement with fixed environment.
 * Not video footage. Load after the existing natural studies and shared context host.
 */
(() => {
 'use strict';
 const legacy=window.ClassicaRealism,id='toreador';
 const description='砂の闘牛場で雄牛と闘牛士が対峙し、赤いマントの裾が誘うように揺れる';
 const vertex='attribute vec2 p;void main(){gl_Position=vec4(p,0.0,1.0);}';
 const fragment=`
precision highp float;
uniform vec2 resolution;uniform float time;uniform sampler2D material;uniform sampler2D backdrop;
const float TAU=6.28318530718;
vec4 fabricPhoto(vec2 p){return texture2D(material,vec2(p.x,1.-p.y));}
vec3 clean(vec2 p){return texture2D(backdrop,vec2(p.x,1.-p.y)).rgb;}
void main(){
 vec2 uv=gl_FragCoord.xy/resolution;float a=resolution.x/resolution.y;
 vec2 q=.5+(uv-.5)*vec2(min(a,1.),min(1./a,1.));
 float t=TAU*mod(time,48.)/48.;
 // Only the interior of the bull's flank breathes; its silhouette, head,
 // horns, hooves and the human figure stay rigid.
 vec2 br=(q-vec2(.265,.57))/vec2(.105,.09);
 float breath=1.-smoothstep(.05,1.,dot(br,br));
 vec2 baseQ=q+vec2(.0015*sin(t*6.),.0005*cos(t*6.))*breath;
 vec3 background=clean(baseQ);
 // Inverse cloth flow is anchored at the hand and grows toward the free hem.
 // A genuine alpha-isolated cape is independently composited over the clean plate.
 // Fixed affine registration aligns the generated cutout with the gripping hand.
 float free=smoothstep(.0,.22,.505-q.y);
 vec2 p=q+vec2(.017*sin(t*3.)+.004*sin(t*5.+q.y*18.),.006*sin(t*4.+q.x*15.))*free;
 vec2 capeUV=(p-vec2(.58,.493))/.59+vec2(.64,.51);
 vec4 cloth=fabricPhoto(capeUV);
 float support=smoothstep(.20,.23,p.y)*(1.-smoothstep(.505,.52,p.y))*smoothstep(.33,.36,p.x)*(1.-smoothstep(.70,.73,p.x));
 float mask=smoothstep(.02,.10,cloth.a)*support;vec3 fabric=cloth.rgb;
 float reflect=1.+.035*sin(t*3.+p.x*22.+p.y*9.)*free;
 gl_FragColor=vec4(mix(background,fabric*reflect,mask),1.);
}
`;
 let renderer;
 const announce=()=>window.dispatchEvent(new CustomEvent('classica-nature-ready',{detail:{id}}));
 function releaseMaterial(){if(renderer)renderer.releaseTexture();}
 function images(){return ['material','clean'].map(name=>typeof window.ClassicaNatureGL?.material==='function'?window.ClassicaNatureGL.material(id,'assets/realism/bull-arena-'+name+'.webp',announce,releaseMaterial):{state:'unavailable',value:null});}
 function create(){
  const surface=window.ClassicaNatureGL?.acquire();if(!surface)return null;
  const {canvas,gl}=surface;let program,buffer,uploadFailed=false;const shaders=[],textures=[];
  const dispose=()=>{shaders.forEach(s=>gl.deleteShader(s));if(program)gl.deleteProgram(program);if(buffer)gl.deleteBuffer(buffer);textures.splice(0).forEach(t=>{if(t)gl.deleteTexture(t);});};
  try{
   program=gl.createProgram();
   for(const [type,source] of [[gl.VERTEX_SHADER,vertex],[gl.FRAGMENT_SHADER,fragment]]){
    const s=gl.createShader(type);shaders.push(s);gl.shaderSource(s,source);gl.compileShader(s);
    if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error('Seed shader unavailable');gl.attachShader(program,s);
   }
   gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error('Seed program unavailable');
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

