/* Canon: linked Plitvice-inspired tufa cascades.
 * Generated editorial analogy for repeated foundation and imitative continuity.
 * Not a Pachelbel travel claim, recorded footage or score-synchronous visualization.
 */
(() => {
 'use strict';
 const legacy=window.ClassicaRealism,id='canon';
 const description='プリトヴィツェを思わせる三段の湖と滝。動かない岩の段を水が連続して伝い、追いかけ合う旋律と反復する基盤を映す';
 const vertex='attribute vec2 p;void main(){gl_Position=vec4(p,0.0,1.0);}';
 const fragment=`
precision highp float;
uniform vec2 resolution;uniform float time;uniform sampler2D material;
const float TAU=6.28318530718,ASPECT=1672./941.;
float rect(vec2 p,vec4 b,float e){return smoothstep(b.x,b.x+e,p.x)*(1.-smoothstep(b.z-e,b.z,p.x))*smoothstep(b.y,b.y+e,p.y)*(1.-smoothstep(b.w-e,b.w,p.y));}
float foamKey(vec3 c){float lo=min(c.r,min(c.g,c.b)),hi=max(c.r,max(c.g,c.b));return smoothstep(.25,.55,lo)*(1.-smoothstep(.10,.22,hi-lo))*smoothstep(-.025,.035,c.b-c.r);}
float poolKey(vec3 c){return smoothstep(.018,.065,min(c.g-c.r,c.b-c.r));}
float randomCell(vec2 p){p.y=mod(p.y,64.);return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float flowNoise(vec2 p){
 vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
 return mix(mix(randomCell(i),randomCell(i+vec2(1.,0.)),f.x),mix(randomCell(i+vec2(0.,1.)),randomCell(i+vec2(1.,1.)),f.x),f.y);
}
float falling(vec2 p,float phase,float spatial,float cycles,float seed){
 // Smooth non-striped detail advects only toward increasing source y. The
 // noise tiles at 64 cells, and integer cycles make the 120s boundary seamless.
 float z=p.y*spatial-(phase/TAU)*64.*cycles+seed,x=p.x*800.;
 return 2.*(.60*flowNoise(vec2(x,z))+.30*flowNoise(vec2(x*1.7+17.,z*2.+11.))+.10*flowNoise(vec2(x*2.3+39.,z*4.+29.)))-1.;
}
void main(){
 vec2 uv=gl_FragCoord.xy/resolution;float a=resolution.x/resolution.y;
 vec2 p=vec2(.5)+(vec2(uv.x,1.-uv.y)-.5)*vec2(min(a/ASPECT,1.),min(ASPECT/a,1.))*.99;
 vec3 original=texture2D(material,p).rgb;
 float phase=TAU*mod(mod(time,120.)+120.,120.)/120.;
 float f1=rect(p,vec4(.44,.205,.595,.296),.008);
 float f2=rect(p,vec4(.24,.374,.79,.491),.009);
 float f3=rect(p,vec4(.20,.603,.95,.795),.012);
 // Keep the slanted splash/impact boundary anchored rather than animating a flat foam shelf.
 float foot=.65+.20*p.x;f3*=1.-smoothstep(foot-.012,foot,p.y);
 float foam=foamKey(original);
 float detail=0.;
 if(f1>0.&&foam>0.)detail+=f1*falling(p,phase,600.,18.,0.);
 if(f2>0.&&foam>0.)detail+=f2*falling(p,phase,500.,20.,.8);
 if(f3>0.&&foam>0.)detail+=f3*falling(p,phase,400.,24.,1.6);
 // Rock/vegetation colour is excluded; whitewater geometry stays anchored.
 vec3 col=original*(1.+foam*detail*.13);
 float pools=max(max(rect(p,vec4(.285,.310,.655,.344),.006),rect(p,vec4(.275,.511,.795,.563),.007)),rect(p,vec4(.18,.815,.82,.895),.018))*poolKey(original);
 vec2 shift=vec2(.0007*sin(p.y*170.+p.x*12.-phase*24.),.00035*sin(p.y*220.-p.x*8.-phase*30.));
 vec2 q=p+pools*shift;
 col+=pools*(texture2D(material,q).rgb-original);
 gl_FragColor=vec4(clamp(col,0.,1.),1.);
}
`;
 let renderer;
 const announce=()=>window.dispatchEvent(new CustomEvent('classica-nature-ready',{detail:{id}}));
 function releaseMaterial(){if(renderer)renderer.releaseTexture();}
 function image(){return typeof window.ClassicaNatureGL?.material==='function'?window.ClassicaNatureGL.material(id,'assets/realism/canon-plitvice-cascades.webp',announce,releaseMaterial):{state:'unavailable',value:null};}
 function create(){
  const surface=window.ClassicaNatureGL?.acquire();if(!surface)return null;
  const {canvas,gl}=surface;let program,buffer,texture,uploadFailed=false;const shaders=[];
  const dispose=()=>{shaders.forEach(s=>gl.deleteShader(s));if(program)gl.deleteProgram(program);if(buffer)gl.deleteBuffer(buffer);if(texture)gl.deleteTexture(texture);};
  try{
   program=gl.createProgram();
   for(const [type,source] of [[gl.VERTEX_SHADER,vertex],[gl.FRAGMENT_SHADER,fragment]]){
    const s=gl.createShader(type);shaders.push(s);gl.shaderSource(s,source);gl.compileShader(s);
    if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error('Cascade shader unavailable');gl.attachShader(program,s);
   }
   gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error('Cascade program unavailable');
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
   if(!(w>0&&h>0))return false;if(!ready())return fallback();const record=image();if(record.state!=='ready')return fallback();
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
