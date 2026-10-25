/* rojo-no-tsuki: localized animal movement with fixed environment.
 * Not video footage. Load after the existing natural studies and shared context host.
 */
(() => {
 'use strict';
 const legacy=window.ClassicaRealism,id='rojo-no-tsuki';
 const description='古木の洞で、梟がゆっくり瞼を閉じて開く夜の情景';
 const vertex='attribute vec2 p;void main(){gl_Position=vec4(p,0.0,1.0);}';
 const fragment=`
precision highp float;
uniform vec2 resolution;uniform float time;uniform sampler2D material;
vec3 lid(vec2 p,vec2 c,vec2 r,float age,float seamCenter,vec3 base){
 vec2 d=(p-c)/r;float support=1.-smoothstep(.84,1.,length(d));
 float closure=smoothstep(.38,.48,age)*(1.-smoothstep(.51,.63,age));
 if(support<=0. || closure<=.00001)return base;
 float arc=sqrt(max(0.,1.-d.x*d.x));float seam=seamCenter+.08*d.x*d.x;
 float upper=mix(.80*arc,seam,closure),lower=mix(-.80*arc,seam,closure);
 // The photographed lid margin itself travels with the two curved boundaries.
 float topY=seam+(d.y-upper)*(1.-seam)/max(.08,1.-upper);
 float bottomY=-1.+(d.y+1.)*(seam+1.)/max(.08,lower+1.);
 vec2 topUV=c+vec2(d.x,topY)*r,bottomUV=c+vec2(d.x,bottomY)*r;
 vec3 top=texture2D(material,vec2(.5+.5*topUV.x,1.-topUV.y)).rgb;
 vec3 bottom=texture2D(material,vec2(.5+.5*bottomUV.x,1.-bottomUV.y)).rgb;
 float topMask=smoothstep(upper-.035,upper+.035,d.y)*support;
 float bottomMask=(1.-smoothstep(lower-.035,lower+.035,d.y))*support;
 float fade=smoothstep(0.,.08,closure);
 vec3 col=mix(base,top,topMask*fade);return mix(col,bottom,bottomMask*fade);
}
void main(){vec2 uv=gl_FragCoord.xy/resolution;float a=resolution.x/resolution.y;
 vec2 p=(uv-.5)*vec2(a,1.)/max(a,1.)+.5;p.x+=.025*(1.-smoothstep(.7,1.,a));p.y+=.035*smoothstep(1.3,2.2,a);
 float age=fract(mod(time,48.)/8.);
 vec3 col=texture2D(material,vec2(.5*p.x,1.-p.y)).rgb;
 col=lid(p,vec2(.474,.601),vec2(.042,.032),age,-.29,col);
 col=lid(p,vec2(.585,.602),vec2(.042,.032),fract(age+.012),-.34,col);
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
  img.src='assets/realism/owl-atlas.webp';return record;
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
