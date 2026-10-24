/* First four Realism studies: procedural water, atmosphere and light.
 * No photographs or video footage. Original and the remaining 70 studies are untouched.
 * Load after realism.js INSTEAD OF realism-photo.js. Time is the player's logical clock.
 */
(() => {
  'use strict';
  const legacy=window.ClassicaRealism;
  const scenes={
    'fur-elise':[0,'木漏れ日と浅い水面 — 献辞から想像した穏やかな自然の情景'],
    'moonlight':[1,'薄雲が流れ、月の反射が揺れる湖'],
    'tristesse':[2,'夕暮れの光がほどける湖 — 望郷を手がかりにした情景'],
    'fantaisie-impromptu':[3,'岩をめぐる水流と交錯する光 — 旋律から想像した渓流']
  };
  const vertex='attribute vec2 p;void main(){gl_Position=vec4(p,0.0,1.0);}';
  const fragment=`
precision highp float;
uniform vec2 resolution;
uniform float time;
uniform float scene;
const float TAU=6.28318530718;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 a=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(hash(a),hash(a+vec2(1,0)),f.x),mix(hash(a+vec2(0,1)),hash(a+1.0),f.x),f.y);}
float fbm(vec2 p){float s=0.0,a=0.5;for(int i=0;i<4;i++){s+=a*noise(p);p=mat2(1.6,-1.2,1.2,1.6)*p+2.7;a*=0.5;}return s;}
float phase(){return TAU*mod(time,48.0)/48.0;}
vec3 lightDir(){return normalize(vec3(0.04,scene==1.0?0.27:0.16,1.0));}
vec3 sky(vec3 r){
  float y=max(r.y,0.0), ph=phase();
  vec3 lo=vec3(0.76,0.84,0.78),hi=vec3(0.24,0.49,0.61);
  if(scene==1.0){lo=vec3(0.11,0.16,0.23);hi=vec3(0.008,0.019,0.049);}
  if(scene==2.0){lo=vec3(0.93,0.49,0.26);hi=vec3(0.20,0.24,0.38);}
  vec3 col=mix(lo,hi,pow(clamp(y,0.0,1.0),0.48));
  vec2 wind=vec2(cos(ph),sin(ph))*0.24;
  float clouds=fbm(r.xz/(0.25+abs(r.y))*1.6+wind);
  float veil=smoothstep(0.43,0.70,clouds);
  vec3 cloud=scene==1.0?vec3(0.17,0.20,0.27):(scene==2.0?vec3(0.64,0.39,0.34):vec3(0.94,0.91,0.79));
  col=mix(col,cloud,veil*0.75);
  float d=length(r-lightDir());
  vec3 lamp=scene==1.0?vec3(0.8,0.86,1.0):vec3(1.0,0.72,0.34);
  col+=lamp*exp(-d*7.0)*(scene==1.0?0.11:0.34);
  col=mix(col,lamp*(scene==1.0?1.15:1.65),(1.0-smoothstep(0.024,0.028,d))*(1.0-veil*0.8));
  // Tree canopy reflection is generated from spatial density, not an image overlay.
  if(scene==3.0){
    float leaf=fbm(r.xz*5.0+vec2(sin(ph)*0.04,cos(ph)*0.07));
    float canopy=smoothstep(0.43,0.61,leaf)*smoothstep(0.15,0.7,abs(r.x));
    col=mix(col,vec3(0.035,0.085,0.035),canopy*0.94);
  }
  return col;
}
vec2 waterSlope(vec2 p){
  vec2 slope=vec2(0);float ph=phase();
  for(int i=0;i<7;i++){
    float f=float(i),freq=1.1+f*f*0.42;
    vec2 dir=normalize(vec2(cos(f*2.37),sin(f*2.37)));
    float wave=dot(p,dir)*freq+ph*(2.0+f);
    slope+=dir*cos(wave)*(0.013/(1.0+f*0.14));
  }
  if(scene==3.0){
    // Longitudinal current and downstream curls around the central stone.
    float dist=length((p-vec2(0,0.6))*vec2(1.4,0.7));
    float curl=exp(-dist*1.4);
    slope+=vec2(sin(p.y*12.0-ph*12.0+p.x*6.0),cos(p.y*7.0-ph*8.0))*0.035;
    slope+=vec2(sin(atan(p.y-0.6,p.x)*5.0+dist*17.0-ph*10.0),cos(dist*18.0-ph*10.0))*curl*0.09;
  }
  return slope;
}
float rockHit(vec3 ro,vec3 rd,vec3 pos,vec3 size){
  vec3 q=(ro-pos)/size,d=rd/size;
  float a=dot(d,d),b=dot(q,d),c=dot(q,q)-1.0,h=b*b-a*c;
  if(h<0.0)return -1.0;return (-b-sqrt(h))/a;
}
void main(){
  vec2 uv=gl_FragCoord.xy/resolution;
  float aspect=resolution.x/resolution.y;
  // Vertical FOV is stable; the light and central stone stay within portrait framing.
  vec2 q=(uv-0.5)*vec2(aspect,1.0);
  vec3 ro=vec3(0.0,1.0,-2.0), rd=normalize(vec3(q.x,q.y-0.035,1.05));
  if(scene==3.0){ro=vec3(0,1.5,-1.7);rd=normalize(vec3(q.x,q.y-0.92,1.2));}
  if(scene==0.0){rd=normalize(vec3(q.x,q.y-0.42,1.1));}
  vec3 col;
  if(rd.y>=-0.005){
    col=sky(rd);
    float ridge=0.008+0.022*fbm(vec2(rd.x*13.0,4.0));
    col=mix(col,scene==1.0?vec3(0.018,0.034,0.046):vec3(0.12,0.17,0.13),1.0-smoothstep(ridge-0.003,ridge+0.003,rd.y));
  }else{
    float distance=-ro.y/rd.y;
    vec3 hit=ro+rd*distance;vec2 p=hit.xz;
    vec2 slope=waterSlope(p);
    vec3 normal=normalize(vec3(-slope.x,1.0,-slope.y));
    vec3 reflectDir=reflect(rd,normal);
    float fresnel=0.025+0.975*pow(1.0-max(dot(-rd,normal),0.0),5.0);
    vec3 bed=vec3(0.055,0.14,0.14);
    if(scene==1.0)bed=vec3(0.004,0.017,0.03);
    if(scene==2.0)bed=vec3(0.075,0.055,0.055);
    if(scene==0.0||scene==3.0){
      float stones=fbm((p+slope*0.7)*13.0);
      bed=mix(vec3(0.075,0.10,0.055),vec3(0.31,0.29,0.15),stones);
      float caustic=pow(0.5+0.5*sin(p.x*14.0+p.y*9.0+sin(p.y*8.0-phase()*4.0)+phase()*5.0),12.0);
      bed+=vec3(0.18,0.22,0.10)*caustic*0.35;
      float leaves=smoothstep(0.38,0.66,fbm(p*0.85+vec2(sin(phase()),cos(phase()))*0.12));
      bed*=0.58+0.42*leaves;
    }
    col=mix(bed,sky(reflectDir),0.24+fresnel*0.76);
    vec3 halfLight=normalize(lightDir()-rd);
    float spec=pow(max(dot(normal,halfLight),0.0),scene==1.0?280.0:150.0);
    col+=(scene==1.0?vec3(0.52,0.65,0.84):vec3(1.0,0.63,0.26))*spec*0.65;
    float haze=1.0-exp(-distance*0.007);
    col=mix(col,sky(vec3(rd.x,0.01,rd.z)),haze*0.48);
    if(scene==3.0){
      float contact=length((p-vec2(0,0.6))/vec2(0.27,0.38));
      col*=1.0-0.30*exp(-pow(contact-0.92,2.0)*45.0);
      float foam=pow(max(0.0,sin(p.y*19.0-phase()*14.0+sin(p.x*12.0))),18.0);
      foam*=exp(-abs(p.x)*2.0)*smoothstep(0.7,1.2,p.y)*exp(-max(p.y-0.6,0.0)*0.48);
      col+=vec3(0.20,0.27,0.25)*foam;
      for(int i=0;i<3;i++){
        float fi=float(i);
        vec3 pos=i==0?vec3(0,-0.10,0.6):(i==1?vec3(-1.1,-0.16,2.0):vec3(1.3,-0.18,3.3));
        vec3 size=i==0?vec3(0.27,0.24,0.38):vec3(0.39,0.30,0.49);
        float rock=rockHit(ro,rd,pos,size);
        if(rock>0.0&&rock<distance){
          vec3 surface=ro+rd*rock,n=normalize((surface-pos)/(size*size));
          float grain=fbm(surface.xz*42.0);
          vec3 stone=mix(vec3(0.09,0.105,0.08),vec3(0.36,0.35,0.27),grain);
          stone*=0.42+0.58*max(dot(n,normalize(vec3(-0.4,0.9,-0.3))),0.0);
          stone*=0.8+0.2*smoothstep(0.0,0.13,surface.y);
          col=stone;distance=rock;
        }
      }
    }
  }
  col*=1.0-0.13*dot(uv-0.5,uv-0.5);
  gl_FragColor=vec4(pow(max(col,vec3(0)),vec3(0.82)),1);
}`;
  let renderer;
  function create(){
    const canvas=document.createElement('canvas');
    const gl=canvas.getContext('webgl',{alpha:false,antialias:false,depth:false,powerPreference:'low-power'});
    if(!gl)return null;
    let program,buffer;const shaders=[];
    const dispose=()=>{shaders.forEach(s=>gl.deleteShader(s));if(program)gl.deleteProgram(program);if(buffer)gl.deleteBuffer(buffer);};
    try{
      program=gl.createProgram();
      for(const [type,source] of [[gl.VERTEX_SHADER,vertex],[gl.FRAGMENT_SHADER,fragment]]){
        const s=gl.createShader(type);shaders.push(s);gl.shaderSource(s,source);gl.compileShader(s);
        if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error('Nature shader unavailable');
        gl.attachShader(program,s);
      }
      gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error('Nature program unavailable');
      shaders.splice(0).forEach(s=>gl.deleteShader(s));
      buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
      const u=Object.fromEntries(['resolution','time','scene'].map(k=>[k,gl.getUniformLocation(program,k)]));
      canvas.addEventListener('webglcontextlost',event=>event.preventDefault());
      canvas.addEventListener('webglcontextrestored',()=>{dispose();renderer=undefined;});
      return {canvas,gl,program,buffer,u,position:gl.getAttribLocation(program,'p'),dispose};
    }catch(error){dispose();return null;}
  }
  function ready(){if(renderer===undefined)renderer=create();return renderer&&!renderer.gl.isContextLost();}
  const api={
    has:id=>Object.prototype.hasOwnProperty.call(scenes,id)||legacy.has(id),
    describe:id=>scenes[id]?scenes[id][1]:legacy.describe(id),
    list:()=>legacy.list().map(item=>scenes[item.id]?{...item,description:scenes[item.id][1]}:item),
    available(id){return scenes[id]?(!!ready()||legacy.available(id)):legacy.available(id);},
    init(id){return scenes[id]?{id,nature:true,fallback:legacy.init(id)}:legacy.init(id);},
    draw(c,w,h,t,st){
      if(!scenes[st.id])return legacy.draw(c,w,h,t,st);
      if(!ready())return legacy.draw(c,w,h,t,st.fallback||legacy.init(st.id));
      if(!(w>0&&h>0))return false;
      const {canvas,gl,program,buffer,u,position}=renderer;
      const scale=Math.min(1,960/w,600/h),rw=Math.max(1,Math.round(w*scale)),rh=Math.max(1,Math.round(h*scale));
      if(canvas.width!==rw||canvas.height!==rh){canvas.width=rw;canvas.height=rh;}
      gl.viewport(0,0,rw,rh);gl.useProgram(program);gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
      gl.enableVertexAttribArray(position);gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
      gl.uniform2f(u.resolution,rw,rh);gl.uniform1f(u.time,Number.isFinite(t)?t:0);gl.uniform1f(u.scene,scenes[st.id][0]);
      gl.drawArrays(gl.TRIANGLES,0,6);c.drawImage(canvas,0,0,w,h);return true;
    }
  };
  window.ClassicaRealism=api;
})();
