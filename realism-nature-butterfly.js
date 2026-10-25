/* jesu-joy: localized animal movement with fixed environment.
 * Not video footage. Load after the existing natural studies and shared context host.
 */
(() => {
 'use strict';
 const legacy=window.ClassicaRealism,id='jesu-joy';
 const description='小花に横向きにとまる淡色の蝶の翅脈と鱗粉を、僅かな翅角度と触角の動きで眺める情景';
 const vertex='attribute vec2 p;void main(){gl_Position=vec4(p,0.0,1.0);}';
 const fragment=`
precision highp float;
uniform vec2 resolution;uniform float time;uniform sampler2D material;
const float TAU=6.28318530718;
vec3 stage(vec2 p,float n){p=clamp(p,vec2(.00048828125),vec2(.99951171875));return texture2D(material,vec2((p.x+n)*.5,p.y)).rgb;}
void edge(vec2 p,vec2 a,vec2 b,inout float d,inout float sign){vec2 v=b-a;float h=clamp(dot(p-a,v)/dot(v,v),0.,1.);d=min(d,length(p-a-v*h));if((a.y>p.y)!=(b.y>p.y)){float x=a.x+(p.y-a.y)*(b.x-a.x)/(b.y-a.y);if(p.x<x)sign=-sign;}}
float wingDistance(vec2 p){float d=10.,s=1.;
edge(p,vec2(.395,.333),vec2(.425,.338),d,s);edge(p,vec2(.425,.338),vec2(.46,.36),d,s);edge(p,vec2(.46,.36),vec2(.493,.394),d,s);edge(p,vec2(.493,.394),vec2(.52,.435),d,s);edge(p,vec2(.52,.435),vec2(.532,.468),d,s);edge(p,vec2(.532,.468),vec2(.519,.486),d,s);edge(p,vec2(.519,.486),vec2(.504,.513),d,s);edge(p,vec2(.504,.513),vec2(.465,.53),d,s);edge(p,vec2(.465,.53),vec2(.427,.545),d,s);edge(p,vec2(.427,.545),vec2(.402,.542),d,s);edge(p,vec2(.402,.542),vec2(.38,.528),d,s);edge(p,vec2(.38,.528),vec2(.365,.503),d,s);edge(p,vec2(.365,.503),vec2(.361,.466),d,s);edge(p,vec2(.361,.466),vec2(.371,.431),d,s);edge(p,vec2(.371,.431),vec2(.378,.417),d,s);edge(p,vec2(.378,.417),vec2(.374,.391),d,s);edge(p,vec2(.374,.391),vec2(.375,.36),d,s);edge(p,vec2(.375,.36),vec2(.385,.34),d,s);edge(p,vec2(.385,.34),vec2(.395,.333),d,s);return d*s;}
float wingAlpha(vec2 p){if(p.x<.35||p.x>.54||p.y<.325||p.y>.555)return 0.;float d=wingDistance(p);float difference=length(stage(p,0.)-stage(p,1.));float key=smoothstep(.045,.15,difference);float support=1.-smoothstep(.001,.005,d);return support*mix(key,1.,1.-smoothstep(-.006,-.002,d));}
vec2 inverseRotate(vec2 p,vec2 root,float angle){float c=cos(angle),s=sin(angle);return root+mat2(c,-s,s,c)*(p-root);}
float lineMask(vec2 p,vec2 a,vec2 b){vec2 v=b-a;float h=clamp(dot(p-a,v)/dot(v,v),0.,1.);return 1.-smoothstep(.0025,.0045,length(p-a-v*h));}
float antennaAlpha(vec2 p,vec2 root,vec2 tip){float support=lineMask(p,root,tip);if(support<=0.)return 0.;float difference=length(stage(p,0.)-stage(p,1.));return support*smoothstep(.025,.095,difference)*smoothstep(.008,.016,length(p-root));}
void main(){vec2 uv=gl_FragCoord.xy/resolution;float a=resolution.x/resolution.y;vec2 p=(vec2(uv.x,1.-uv.y)-.5)*vec2(a,1.)/max(a,1.)+.5;
 float ph=TAU*mod(time,48.)/48.;vec2 root=vec2(.525,.484);
 float angle=.022*sin(ph*4.);vec2 q=inverseRotate(p,root,angle);
 vec3 original=stage(p,0.),clean=stage(p,1.);
 float oldA=wingAlpha(p),newA=wingAlpha(q);
 vec3 col=mix(original,clean,oldA);col=mix(col,stage(q,0.),newA);
 // Thorax, head, proboscis, legs and flower contacts are always the original pixels.
 float anchor=smoothstep(.513,.526,p.x)*smoothstep(.462,.481,p.y);
 float legs=max(max(lineMask(p,vec2(.518,.505),vec2(.503,.547)),lineMask(p,vec2(.503,.547),vec2(.495,.559))),max(lineMask(p,vec2(.532,.505),vec2(.535,.533)),lineMask(p,vec2(.546,.507),vec2(.557,.532))));
 anchor=max(anchor,legs);
 col=mix(col,original,anchor);
 vec2 ar=vec2(.549,.467),t1=vec2(.627,.412),t2=vec2(.623,.443);
 vec2 u1=inverseRotate(p,ar,.014*sin(ph*6.)),u2=inverseRotate(p,ar,.011*sin(ph*4.+.7));
 float a1=antennaAlpha(p,ar,t1),a2=antennaAlpha(p,ar,t2);
 col=mix(col,clean,max(a1,a2));
 float n1=antennaAlpha(u1,ar,t1),n2=antennaAlpha(u2,ar,t2);
 col=mix(col,stage(u1,0.),n1);col=mix(col,stage(u2,0.),n2);
 gl_FragColor=vec4(col,1.);
}
`;
 let renderer;
 const announce=()=>window.dispatchEvent(new CustomEvent('classica-nature-ready',{detail:{id}}));
 function releaseMaterial(){if(renderer)renderer.releaseTexture();}
 function image(){return typeof window.ClassicaNatureGL?.material==='function'?window.ClassicaNatureGL.material(id,'assets/realism/jesu-flower-side-atlas-v1.webp',announce,releaseMaterial):{state:'unavailable',value:null};}
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
