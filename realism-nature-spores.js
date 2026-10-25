/* Generated photographic-style material with local natural-motion deformation.
 * Not recorded footage or generated video; load after the shared natural context.
 */
(() => {
 'use strict';
 const legacy=window.ClassicaRealism,id='tchaikovsky-october';
 const description='朽木の樹皮の隙間に見える細い菌糸状の繊維と、濡れた木肌を通って離れる小さな雨滴';
 const vertex='attribute vec2 p;void main(){gl_Position=vec4(p,0.0,1.0);}';
 const fragment=`
precision highp float;
uniform vec2 resolution;uniform float time;uniform sampler2D material;
const float TAU=6.28318530718;
vec3 photo(vec2 p){return texture2D(material,clamp(vec2(p.x,1.-p.y),vec2(.00048828125),vec2(.99951171875))).rgb;}
void main(){
 vec2 uv=gl_FragCoord.xy/resolution;float a=resolution.x/resolution.y;
 vec2 p=(uv-.5)*vec2(a,1.)/max(a,1.)+.5;
 vec3 col=photo(p);
 float clock=mod(time,48.);float cycle=fract(clock/6.);
 // The wood and pale fibers stay fixed. Only water in a small existing groove moves.
 float pathX=.520+.016*sin((p.y-.359)*12.);
 float groove=(1.-smoothstep(.0015,.0045,abs(p.x-pathX)))*smoothstep(.359,.374,p.y)*(1.-smoothstep(.405,.425,p.y));
 float flow=.5+.5*sin(p.y*220.+TAU*clock/3.);
 vec2 waterUV=p+vec2(.0011*sin(TAU*clock/3.+p.y*120.),.0006*cos(TAU*clock/3.+p.y*80.))*groove;
 col=mix(col,photo(waterUV)*(.98+.035*flow),groove*.65);
 // Grow at an attached bark tip, pinch off, then descend into the shaded recess.
 float grow=smoothstep(0.,.68,cycle);
 float fall=clamp((cycle-.68)/.32,0.,1.);
 float life=smoothstep(0.,.10,cycle)*(1.-smoothstep(.98,1.,cycle));
 vec2 center=vec2(.520+.0015*fall,.359-.013*grow-.045*fall*fall);
 vec2 radii=vec2(.003+.007*grow,.004+.009*grow);
 radii.y*=1.+.20*sin(fall*3.14159265);
 vec2 d=(p-center)/radii;float r=length(d);
 float aa=max(1.2/resolution.y,1.2/resolution.x)/radii.x;
 float drop=(1.-smoothstep(1.-aa,1.+aa,r))*life;
 // The lower foreground wood edge occludes the descending water, never the other way around.
 drop*=smoothstep(.300,.312,p.y);
 // Narrow transparent neck retracts before the detached drop travels downward.
 float neck=(1.-smoothstep(.0008,.0022,abs(p.x-.520)))*smoothstep(min(center.y,.3589),.359,p.y)*(1.-smoothstep(.359,.364,p.y));
 neck*=life*(1.-smoothstep(.66,.72,cycle));
 float cap=sqrt(max(0.,1.-min(1.,r*r)));
 vec3 refr=photo(p+d*.009*cap);
 float rim=pow(clamp(r,0.,1.),7.);
 refr*=1.-.23*rim;
 refr+=vec3(.18,.20,.21)*rim*smoothstep(-.35,.65,d.y);
 float glint=exp(-dot((d-vec2(-.32,.42))*vec2(3.,4.),(d-vec2(-.32,.42))*vec2(3.,4.)));
 refr+=vec3(.43,.47,.49)*glint;
 refr+=vec3(.07,.08,.085)*cap*smoothstep(-.35,.45,d.y);
 col=mix(col,refr,drop*.88);
 col=mix(col,photo(p+vec2(.001,0.))*.94,neck*.35);
 gl_FragColor=vec4(col,1.);
}
`;
 let renderer;
 const announce=()=>window.dispatchEvent(new CustomEvent('classica-nature-ready',{detail:{id}}));
 function releaseMaterial(){if(renderer)renderer.releaseTexture();}
 function image(){return typeof window.ClassicaNatureGL?.material==='function'?window.ClassicaNatureGL.material(id,'assets/realism/october-hidden-mycelium-v1.webp',announce,releaseMaterial):{state:'unavailable',value:null};}
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
