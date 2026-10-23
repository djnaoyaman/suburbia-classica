/* Natural light studies for SUBURBIA CLASSICA. No media downloads required. */
window.ClassicaRealism = (() => {
  'use strict';
  const scenes = {'moonlight': 0, 'clair-de-lune': 1, 'raindrop': 2};
  const fragment = `
    precision highp float;
    uniform vec2 resolution;
    uniform float time;
    uniform float scene;
    float hash(vec2 p) { return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
    float noise(vec2 p) {
      vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
      return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+1.0),f.x),f.y);
    }
    float fbm(vec2 p) {
      float v=0.0, a=0.5;
      for(int i=0;i<5;i++){v+=a*noise(p);p=mat2(1.6,-1.2,1.2,1.6)*p+3.7;a*=0.5;}
      return v;
    }
    vec3 sky(vec3 d) {
      float elevation=max(d.y,0.0);
      if(scene>1.5) {
        float cloud=fbm(d.xz/(abs(d.y)+0.3)*1.4+vec2(time*0.012,0));
        float light=pow(max(dot(d,normalize(vec3(-0.6,0.6,1.0))),0.0),8.0);
        return mix(vec3(0.065,0.095,0.11),vec3(0.24,0.30,0.31),light)*(0.7+0.45*cloud);
      }
      vec3 col=mix(vec3(0.095,0.14,0.19),vec3(0.014,0.025,0.055),smoothstep(0.0,0.5,elevation));
      vec3 md=normalize(vec3(scene<0.5?0.28:0.43,0.30,1.6));
      float dist=length(d-md);
      col+=vec3(0.24,0.30,0.37)*exp(-dist*15.0)*0.42;
      col+=vec3(0.16,0.20,0.27)*exp(-dist*4.0)*0.18;
      float disk=1.0-smoothstep(0.029,0.0305,dist);
      vec2 mp=(d.xy-md.xy)/0.030;
      float relief=fbm(mp*7.0)*0.16+fbm(mp*19.0)*0.09;
      float maria=smoothstep(0.43,0.69,fbm(mp*3.6+4.0))*0.27;
      vec3 moon=vec3(0.84,0.86,0.80)*(1.0-relief-maria);
      moon*=0.85+0.15*sqrt(max(0.0,1.0-dot(mp,mp)));
      col=mix(col,moon,disk);
      vec2 sp=d.xz/(elevation+0.22)*190.0;
      float star=step(0.998,hash(floor(sp)))*pow(max(0.0,1.0-length(fract(sp)-0.5)*2.0),12.0);
      col+=star*0.22*smoothstep(0.09,0.4,elevation);
      vec2 cp=d.xz/(elevation+0.36)*2.0+vec2(time*0.008,time*0.001);
      float clouds=smoothstep(scene<0.5?0.62:0.38,0.84,fbm(cp));
      float rim=exp(-dist*9.0)*0.16;
      col=mix(col,vec3(0.07,0.10,0.145)+rim,clouds*(scene<0.5?0.40:0.94));
      return col;
    }
    void main() {
      vec2 uv=gl_FragCoord.xy/resolution;
      float aspect=resolution.x/resolution.y;
      vec3 rd=normalize(scene>1.5?vec3((uv.x-0.5)*aspect,(uv.y-0.5)*0.65-0.65,1.2):vec3((uv.x-0.5)*aspect,uv.y-0.52,1.6));
      vec3 col;
      if(rd.y>=0.0) {
        col=sky(rd);
        if(scene<1.5) {
          float ridge=0.523+0.009*fbm(vec2(uv.x*19.0,2.0))+0.008*sin(uv.x*13.0);
          col=mix(col,vec3(0.025,0.043,0.055),1.0-smoothstep(ridge-0.001,ridge+0.002,uv.y));
        }
      } else {
        float depth=-1.0/rd.y;
        vec2 p=rd.xz*depth;
        vec2 slope=vec2(0.0);
        float rippleLight=0.0;
        for(int i=0;i<6;i++) {
          float f=float(i);
          vec2 dir=vec2(cos(f*2.39),sin(f*2.39));
          float freq=0.9+f*0.93;
          slope+=dir*cos(dot(p,dir)*freq+time*(0.35+f*0.12))*0.007;
        }
        slope+=vec2(noise(p*8.0+time*0.12)-0.5,noise(p*7.0-time*0.14)-0.5)*0.017;
        if(scene>1.5) {
          for(int i=0;i<22;i++) {
            float fi=float(i);
            vec2 hit=vec2(0.04+hash(vec2(fi,2.0))*0.92,0.08+hash(vec2(fi,8.0))*0.84);
            vec3 hr=normalize(vec3((hit.x-0.5)*aspect,(hit.y-0.5)*0.65-0.65,1.2));
            vec2 hp=hr.xz*(-1.0/hr.y);
            float age=mod(time+hash(vec2(fi,5.0))*3.7,3.7)-0.6;
            vec2 diff=p-hp;
            float r=length(diff), radius=max(0.0,age)*0.18;
            float envelope=exp(-abs(r-radius)*22.0)*exp(-max(age,0.0)*1.1)*step(0.0,age);
            slope+=diff/max(r,0.01)*sin((r-radius)*90.0)*envelope*0.075;
            rippleLight+=sin((r-radius)*90.0)*envelope*0.045;
          }
        }
        vec3 n=normalize(vec3(-slope.x,1.0,-slope.y));
        vec3 reflection=reflect(rd,n);
        float fresnel=0.025+0.975*pow(1.0-max(dot(-rd,n),0.0),5.0);
        col=mix(vec3(0.016,0.035,0.039),sky(reflection),0.30+fresnel*0.70);
        col+=vec3(0.025,0.04,0.045)*(0.5+0.5*sin(p.y*4.0+time*0.3))*0.12;
        if(scene>1.5) {
          float foliage=smoothstep(0.38,0.72,fbm(reflection.xz*4.0+vec2(3.0,0.0)));
          col*=0.85+0.35*foliage;
          col+=vec3(0.65,0.78,0.80)*rippleLight;
          col+=vec3(0.06,0.075,0.08)*pow(max(dot(n,normalize(vec3(-0.4,1.0,0.6))),0.0),18.0);
        }
        float mist=exp(-1.0/max(depth*0.018,0.001));
        col=mix(col,scene>1.5?vec3(0.13,0.17,0.18):vec3(0.09,0.13,0.17),mist*0.65);
      }
      if(scene>1.5) {
        for(int i=0;i<22;i++) {
          float fi=float(i);
          vec2 hit=vec2(0.04+hash(vec2(fi,2.0))*0.92,0.08+hash(vec2(fi,8.0))*0.84);
          float age=mod(time+hash(vec2(fi,5.0))*3.7,3.7)-0.6;
          vec2 pos=hit+vec2(-0.015,0.75)*max(-age,0.0);
          vec2 delta=(uv-pos)*vec2(aspect,1.0);
          float drop=exp(-abs(delta.x+delta.y*0.02)*1700.0)*exp(-abs(delta.y)*120.0)*step(age,0.0)*step(-0.6,age);
          float splash=exp(-length((uv-hit)*vec2(aspect,2.7))*480.0)*exp(-max(age,0.0)*24.0)*step(0.0,age);
          col+=vec3(0.4,0.49,0.51)*(drop*0.3+splash*0.6);
        }
      }
      col*=1.0-0.22*dot(uv-0.5,uv-0.5);
      col+= (hash(gl_FragCoord.xy)-0.5)/255.0;
      gl_FragColor=vec4(pow(max(col,0.0),vec3(0.82)),1.0);
    }`;
  let renderer;
  function create() {
    const canvas=document.createElement('canvas');
    const gl=canvas.getContext('webgl',{alpha:false,antialias:false,depth:false,powerPreference:'low-power'});
    if(!gl) return null;
    function compile(type,source) {
      const s=gl.createShader(type); gl.shaderSource(s,source); gl.compileShader(s);
      if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)){gl.deleteShader(s);throw new Error('Shader unavailable');}
      return s;
    }
    try {
      const program=gl.createProgram();
      gl.attachShader(program,compile(gl.VERTEX_SHADER,'attribute vec2 p; void main(){gl_Position=vec4(p,0,1);}'));
      gl.attachShader(program,compile(gl.FRAGMENT_SHADER,fragment));gl.linkProgram(program);
      if(!gl.getProgramParameter(program,gl.LINK_STATUS)) return null;
      gl.useProgram(program);
      const buffer=gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
      gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
      const p=gl.getAttribLocation(program,'p'); gl.enableVertexAttribArray(p);gl.vertexAttribPointer(p,2,gl.FLOAT,false,0,0);
      const uniforms=Object.fromEntries(['resolution','time','scene'].map(n=>[n,gl.getUniformLocation(program,n)]));
      return {canvas,gl,uniforms};
    } catch { return null; }
  }
  return {
    has: id => Object.prototype.hasOwnProperty.call(scenes,id),
    available() { if(renderer===undefined) renderer=create(); return !!renderer&&!renderer.gl.isContextLost(); },
    init(id) { return {scene:scenes[id]}; },
    draw(c,w,h,t,st) {
      if(!this.available()) return false;
      const {canvas,gl,uniforms}=renderer;
      // Bound fragment work on phones and high-DPI displays.
      const scale=Math.min(1,960/w,600/h), rw=Math.max(1,Math.round(w*scale)), rh=Math.max(1,Math.round(h*scale));
      if(canvas.width!==rw||canvas.height!==rh){canvas.width=rw;canvas.height=rh;gl.viewport(0,0,rw,rh);}
      gl.uniform2f(uniforms.resolution,rw,rh);gl.uniform1f(uniforms.time,t);gl.uniform1f(uniforms.scene,st.scene);
      gl.drawArrays(gl.TRIANGLES,0,6);c.drawImage(canvas,0,0,w,h);
      return true;
    }
  };
})();
