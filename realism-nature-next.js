/* Selected Realism studies: procedural water, atmosphere and light.
 * No photographs or video footage. Original and all other studies are untouched.
 * Load AFTER realism.js and the unchanged first-four realism-nature.js. Time is the player's logical clock.
 */
(() => {
  'use strict';
  const legacy=window.ClassicaRealism;
  const scenes={
    'fantaisie-impromptu':[3,'細かな河床を透かし、異なる速さで交錯する浅瀬の流れ'],
    'nocturne-9-2':[4,'雨上がりの水膜に揺れる暖かな灯 — 夜想曲から想像した情景'],
    'clair-de-lune':[5,'重なる薄雲を透かして移ろう月の光'],
    'gymnopedie-1':[6,'風化した石肌を移ろう斜光と葉陰 — 穏やかな旋律から想像した情景']
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
float fbm(vec2 p){float s=0.0,a=0.5;for(int i=0;i<5;i++){s+=a*noise(p);p=mat2(1.6,-1.2,1.2,1.6)*p+2.7;a*=0.5;}return s;}
float phase(){return TAU*mod(time,48.0)/48.0;}
float bedHeight(vec2 p){return fbm(p*32.0)*0.76+noise(p*225.0)*0.24;}
vec3 gravel(vec2 p){
  float h=bedHeight(p),fine=noise(p*420.0);
  vec2 slope=vec2(bedHeight(p+vec2(0.002,0))-h,bedHeight(p+vec2(0,0.002))-h);
  vec3 normal=normalize(vec3(-slope.x*2.0,1.0,-slope.y*2.0));
  float light=0.35+0.65*max(dot(normal,normalize(vec3(-0.4,1.0,-0.3))),0.0);
  float mineral=fbm(p*12.0);
  vec3 pigment=mix(vec3(0.14,0.16,0.13),vec3(0.36,0.32,0.23),mineral*0.55+h*0.45);
  float crevice=pow(max(0.0,1.0-h),7.0)*0.5;
  return pigment*light*(0.86+fine*0.14)*(1.0-crevice);
}
vec3 shallowStream(vec2 uv,float aspect){
  vec2 q=(uv-0.5)*vec2(aspect,1.0);float ph=phase();
  vec3 ro=vec3(0,1.1,-1.1),rd=normalize(vec3(q.x,q.y-0.90,1.1));
  vec3 hit=ro+rd*(-ro.y/rd.y);vec2 p=hit.xz;
  float channel=exp(-p.x*p.x*1.6);
  vec2 slope=vec2(0);
  // Unequal stream bands cross at different speeds, rather than moving a picture.
  for(int k=0;k<6;k++){
    float f=float(k);vec2 dir=normalize(vec2(0.25*cos(f*2.2),1.0));
    float slow=sin(dot(p,dir)*(12.0+f*4.0)-ph*(3.0+f));
    float fast=sin(dot(p,dir)*(18.0+f*5.0)-ph*(8.0+f*2.0));
    slope+=dir*mix(slow,fast,channel)*(0.011/(1.0+f*0.2));
    slope.x+=cos(p.x*(8.0+f*4.0)+p.y*7.0-ph*(2.0+f))*0.004;
  }
  vec3 normal=normalize(vec3(-slope.x,1.0,-slope.y));
  vec2 refracted=p+slope*(0.30+0.08*noise(p*2.0));
  vec3 bed=gravel(refracted);
  float depthTint=0.12+0.06*fbm(p*1.5);
  bed=mix(bed,vec3(0.06,0.16,0.14),depthTint);
  float caustic=pow(max(0.0,0.5+0.5*sin(p.x*28.0+sin(p.y*22.0-ph*6.0)+ph*4.0)),12.0);
  bed+=vec3(0.10,0.13,0.075)*caustic*0.30;
  vec3 refl=reflect(rd,normal);
  float fresnel=0.025+0.975*pow(1.0-max(dot(-rd,normal),0.0),5.0);
  vec3 sky=mix(vec3(0.20,0.33,0.29),vec3(0.61,0.68,0.62),fbm(refl.xz*2.0));
  vec3 col=mix(bed,sky,0.10+fresnel*0.55);
  float sparkle=pow(max(dot(normal,normalize(normalize(vec3(-0.12,1.0,0.4))-rd)),0.0),350.0);
  col+=vec3(0.80,0.88,0.72)*sparkle*0.30;
  float filament=pow(max(0.0,sin(p.y*21.0-ph*10.0+sin(p.x*11.0+ph*2.0))),30.0);
  float foamMask=pow(max(0.0,0.5+0.5*sin(p.x*17.0+p.y*2.0)),10.0)*channel;
  col+=vec3(0.14,0.18,0.16)*filament*foamMask;
  return col;
}

vec3 lamps(vec3 r,float rough){
  vec2 delta=r.xy-vec2(-0.035,0.72);
  vec3 warm=vec3(1.0,0.52,0.17);
  float light=exp(-delta.x*delta.x/(0.0008+rough*0.014)-delta.y*delta.y/(0.004+rough*0.02));
  float bloom=exp(-length(delta)*7.0)*0.045;
  vec2 cool=r.xy-vec2(0.48,0.54);
  return vec3(0.015,0.025,0.043)+warm*(light*1.65+bloom)+vec3(0.28,0.43,0.54)*exp(-dot(cool,cool)/(0.001+rough*0.007))*0.45;
}
vec3 wetPavement(vec2 uv,float aspect){
  vec2 q=(uv-0.5)*vec2(aspect,1.0);float ph=phase();
  vec3 ro=vec3(0,1,-1.5),rd=normalize(vec3(q.x,q.y-1.25,1.1));
  vec3 hit=ro+rd*(-ro.y/rd.y);vec2 p=hit.xz;
  float fine=noise(p*370.0), aggregate=fbm(p*55.0);
  float bed=fbm(p*1.3),wet=smoothstep(0.32,0.57,bed);
  vec3 dry=mix(vec3(0.022,0.029,0.030),vec3(0.095,0.105,0.104),aggregate)*(0.72+fine*0.28);
  // A shallow irregular water film has its own moving normal field.
  vec2 slope=vec2(0);
  for(int k=0;k<5;k++){
    float f=float(k);vec2 dir=vec2(cos(f*2.1),sin(f*2.1));
    slope+=dir*cos(dot(p,dir)*(11.0+f*8.0)+ph*(3.0+f))*0.009;
  }
  // Small impacts are confined to water, with slow expanding, damped rings.
  for(int k=0;k<5;k++){
    float f=float(k);vec2 center=vec2((hash(vec2(f,1))-0.5)*1.3,hash(vec2(f,6))*0.9-0.85);
    float age=mod(time+hash(vec2(f,9))*6.0,6.0);
    vec2 d=p-center;float r=length(d),edge=r-age*0.10;
    float env=exp(-edge*edge*2500.0)*sin(clamp(age/6.0,0.0,1.0)*3.14159265)*exp(-age*0.8);
    slope+=d/max(r,0.01)*sin(edge*190.0)*env*0.035;
  }
  // Integrate subpixel roughness into the reflection lobe instead of sampling
  // high-frequency random normals, which create square specular aliasing.
  vec2 grain=vec2(fbm(p*13.0)-0.5,fbm(p*13.0+11.0)-0.5)*0.022;
  vec3 normal=normalize(vec3(-mix(grain.x,slope.x,wet),1.0,-mix(grain.y,slope.y,wet)));
  vec3 reflected=reflect(rd,normal);
  float fresnel=0.04+0.96*pow(1.0-max(dot(-rd,normal),0.0),5.0);
  vec3 light=lamps(reflected,(1.0-wet)*0.30);
  vec3 col=dry*(0.75-wet*0.4)+light*(0.20+wet*0.65+fresnel*0.15);
  float spill=exp(-p.x*p.x*2.0-p.y*p.y*0.3);
  col+=dry*vec3(0.50,0.32,0.15)*spill;
  // Granules remain visible under the film; no generic rectangular pavement tiles.
  col+=vec3(0.05,0.055,0.05)*pow(fine,14.0)*(1.0-wet)*0.20;
  return col;
}
vec3 moonVeil(vec2 uv,float aspect){
  vec2 p=(uv-0.5)*vec2(aspect,1.0);float ph=phase();
  vec2 moon=vec2(0.03,0.13);float d=length(p-moon);
  float disc=1.0-smoothstep(0.040,0.042,d);
  float lunar=0.90+0.10*fbm((p-moon)*210.0);
  vec3 col=mix(vec3(0.012,0.024,0.050),vec3(0.052,0.079,0.112),1.0-uv.y);
  col+=vec3(0.17,0.22,0.28)*exp(-d*5.0);
  col=mix(col,vec3(0.94,0.97,1.0)*lunar,disc);
  // Three translucent cloud layers, each at a distinct scale and orbital drift.
  // Optical transmission dims the moon; silver scattering lights the cloud edges.
  for(int layer=0;layer<3;layer++){
    float f=float(layer);
    vec2 drift=vec2(cos(ph+f*1.4),sin(ph+f*1.4))*vec2(0.32,0.10)*(1.0+f*0.25);
    vec2 cloudP=p*vec2(1.1,2.8)*(1.5+f*0.65)+drift+vec2(f*13.1,f*3.7);
    float density=smoothstep(0.36,0.72,fbm(cloudP));
    float optical=density*(0.62+f*0.28);
    float trans=exp(-optical);
    float silver=exp(-d*(3.0+f))*0.14+0.025;
    vec3 scattering=vec3(0.65,0.75,0.88)*silver;
    col=col*trans+scattering*(1.0-trans);
  }
  return col;
}
float stoneHeight(vec2 p){return fbm(p*42.0)*0.72+noise(p*190.0)*0.28;}
vec3 limestoneLight(vec2 uv,float aspect){
  vec2 p=vec2((uv.x-0.5)*aspect,uv.y-0.5);float ph=phase();
  float h=stoneHeight(p);
  vec2 slope=vec2(stoneHeight(p+vec2(0.003,0))-h,stoneHeight(p+vec2(0,0.003))-h);
  vec3 normal=normalize(vec3(-slope*1.4,1));
  float mineral=fbm(p*3.8),fine=noise(p*540.0);
  float strata=0.5+0.5*sin(p.y*18.0+fbm(p*6.0)*5.0);
  vec3 stone=mix(vec3(0.40,0.39,0.35),vec3(0.68,0.66,0.59),mineral*0.55+h*0.45);
  stone*=0.90+strata*0.06+fine*0.04;
  // Pores and weathered mineral seams, without a repeated brick or tile grid.
  float pores=pow(max(0.0,1.0-fine),20.0);
  float seam=pow(1.0-abs(2.0*noise(p*11.0+fbm(p*4.0))-1.0),45.0);
  stone*=1.0-pores*0.19-seam*0.045;
  vec2 drift=vec2(sin(ph),cos(ph))*vec2(0.22,0.12);
  float canopy=smoothstep(0.37,0.67,fbm(p*3.4+drift));
  float sunPatch=exp(-pow(p.x+0.35*p.y-0.08*sin(ph),2.0)*1.5);
  vec3 sun=normalize(vec3(-0.65+sin(ph)*0.06,0.32,0.53));
  float incidence=max(dot(normal,sun),0.0);
  vec3 illumination=vec3(0.28,0.32,0.37)+vec3(1.0,0.85,0.64)*sunPatch*(0.12+canopy*0.88)*incidence*1.45;
  return stone*illumination;
}
void main(){
  vec2 uv=gl_FragCoord.xy/resolution;float aspect=resolution.x/resolution.y;
  vec3 col=scene==3.0?shallowStream(uv,aspect):(scene==4.0?wetPavement(uv,aspect):(scene==5.0?moonVeil(uv,aspect):limestoneLight(uv,aspect)));
  col*=1.0-0.09*dot(uv-0.5,uv-0.5);
  gl_FragColor=vec4(pow(max(col,vec3(0)),vec3(0.82)),1);
}
`;
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
