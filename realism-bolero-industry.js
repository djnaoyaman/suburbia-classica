/* Bolero: steady industrial repetition and layers of machinery.
 * Original imagined drive room, not a named factory or reconstruction.
 * Equal closed pulley faces turn at fixed speed; their outline and surroundings stay fixed.
 */
(() => {
 'use strict';
 const legacy=window.ClassicaRealism,id='bolero';
 const description='変わらない反復と積み重なる音色を、一定速のプーリーと奥へ連なる機械に託す。円盤は同じ速さで回り、ベルトの輪郭と工場は動かない';
 const vertex='attribute vec2 p;void main(){gl_Position=vec4(p,0.0,1.0);}';
 const fragment=`
precision highp float;
uniform vec2 resolution;uniform float time;uniform sampler2D material;
const float TAU=6.28318530718,ASPECT=1672./941.,RIM=.153;
vec2 rotateRigid(vec2 d,float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c)*d;}
// A rigid circular face viewed under a fixed, slight projection: no radius-dependent twist.
vec2 plane(vec2 p,vec2 c,vec2 radii){return (p-c)*vec2(ASPECT,1.)/radii;}
float disk(vec2 p,vec2 c,vec2 radii){float r=length(plane(p,c,radii));return smoothstep(.36,.40,r)*(1.-smoothstep(.988,1.,r));}
vec2 faceSample(vec2 p,vec2 c,vec2 radii){
 vec2 d=plane(p,c,radii);float r=length(d);d*=clamp(r,.42,.97)/max(r,.00001);return c+d*radii/vec2(ASPECT,1.);
}
vec3 illumination(vec2 p,vec2 center,vec2 radii){
 vec2 d=vec2(.025/ASPECT,.025);
 vec3 s=texture2D(material,faceSample(p,center,radii)).rgb*.20;
 s+=texture2D(material,faceSample(p+vec2(d.x,0.),center,radii)).rgb*.10;
 s+=texture2D(material,faceSample(p-vec2(d.x,0.),center,radii)).rgb*.10;
 s+=texture2D(material,faceSample(p+vec2(0.,d.y),center,radii)).rgb*.10;
 s+=texture2D(material,faceSample(p-vec2(0.,d.y),center,radii)).rgb*.10;
 s+=texture2D(material,faceSample(p+d*.7071,center,radii)).rgb*.10;
 s+=texture2D(material,faceSample(p-d*.7071,center,radii)).rgb*.10;
 s+=texture2D(material,faceSample(p+vec2(d.x,-d.y)*.7071,center,radii)).rgb*.10;
 s+=texture2D(material,faceSample(p+vec2(-d.x,d.y)*.7071,center,radii)).rgb*.10;
 return max(s,vec3(.025));
}
vec3 wheel(vec2 p,vec2 center,vec2 radii,float phase,vec3 baseCol){
 float mask=disk(p,center,radii);if(mask<=0.)return baseCol;
 vec2 d=plane(p,center,radii);
 vec2 q=center+rotateRigid(d,phase)*radii/vec2(ASPECT,1.);
 // Rotate material detail under a fixed illumination field, not the photographed highlight.
 vec3 lit=texture2D(material,q).rgb*illumination(p,center,radii)/illumination(q,center,radii);
 return mix(baseCol,lit,mask);
}
float belt(vec2 p,float x){
 return (1.-smoothstep(.0012,.0024,abs(p.x-x)))*smoothstep(.425,.440,p.y)*(1.-smoothstep(.475,.490,p.y));
}
float grain(vec2 p,float phase){
 // Fine leather surface variation travels, never changing the belt silhouette.
 // s has the same tangential speed RIM*phase as the equal-radius pulleys.
 float s=p.y/RIM+phase;
 return .010*sin(4.*s+3.*sin(p.x*660.))+.005*sin(11.*s+p.x*1140.)+.003*sin(37.*s+p.x*2200.);
}
void main(){
 vec2 uv=gl_FragCoord.xy/resolution;float a=resolution.x/resolution.y;
 vec2 cropCenter=vec2(.5,mix(.5,.485,smoothstep(2.,2.2,a)));
 vec2 p=cropCenter+(vec2(uv.x,1.-uv.y)-.5)*vec2(min(a/ASPECT,1.),min(ASPECT/a,1.))*.99;
 float phase=TAU*mod(mod(time,120.)+120.,120.)/20.;
 vec3 col=texture2D(material,p).rgb;
 col=wheel(p,vec2(835./1672.,262./941.),vec2(135.,131.)/941.,phase,col);
 col=wheel(p,vec2(834./1672.,612./941.),vec2(136.,134.)/941.,phase,col);
 // Same direction and speed for both disks. Uncrossed left/right strands run oppositely.
 col*=1.+belt(p,.4148)*grain(p,phase)+belt(p,.5823)*grain(p,-phase);
 gl_FragColor=vec4(col,1.);
}
`;
 let renderer;
 const announce=()=>window.dispatchEvent(new CustomEvent('classica-nature-ready',{detail:{id}}));
 function releaseMaterial(){if(renderer)renderer.releaseTexture();}
 function image(){return typeof window.ClassicaNatureGL?.material==='function'?window.ClassicaNatureGL.material(id,'assets/realism/bolero-industry.webp',announce,releaseMaterial):{state:'unavailable',value:null};}
 function create(){
  const surface=window.ClassicaNatureGL?.acquire();if(!surface)return null;
  const {canvas,gl}=surface;let program,buffer,texture,uploadFailed=false;const shaders=[];
  const dispose=()=>{shaders.forEach(s=>gl.deleteShader(s));if(program)gl.deleteProgram(program);if(buffer)gl.deleteBuffer(buffer);if(texture)gl.deleteTexture(texture);};
  try{
   program=gl.createProgram();
   for(const [type,source] of [[gl.VERTEX_SHADER,vertex],[gl.FRAGMENT_SHADER,fragment]]){
    const s=gl.createShader(type);shaders.push(s);gl.shaderSource(s,source);gl.compileShader(s);
    if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error('Industry shader unavailable');gl.attachShader(program,s);
   }
   gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error('Industry program unavailable');
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
