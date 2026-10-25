"""Native EGL first-sample UV diagnostic runner. Instrumented GLSL, not visual/browser QA."""
import ctypes as C,pathlib,json,time,sys,argparse
from PIL import Image,ImageChops,ImageStat
ap=argparse.ArgumentParser();ap.add_argument('fragment');ap.add_argument('--texture');ap.add_argument('--scene',type=float,default=9);ap.add_argument('--out',required=True);ap.add_argument('--frames',type=int,default=0);args=ap.parse_args()
OUT=pathlib.Path(args.out);OUT.mkdir(parents=True,exist_ok=True)
E=C.CDLL('libEGL.so.1');E.eglGetProcAddress.restype=C.c_void_p
P=C.c_void_p;I=C.c_int;U=C.c_uint;F=C.c_float
get=C.CFUNCTYPE(P,U,P,C.POINTER(I))(E.eglGetProcAddress(b'eglGetPlatformDisplayEXT'));d=get(0x31DD,None,None)
E.eglInitialize.argtypes=[P,C.POINTER(I),C.POINTER(I)];a,b=I(),I();assert E.eglInitialize(d,C.byref(a),C.byref(b))
E.eglBindAPI.argtypes=[U];assert E.eglBindAPI(0x30A0)
E.eglChooseConfig.argtypes=[P,C.POINTER(I),C.POINTER(P),I,C.POINTER(I)]
attrs=(I*13)(0x3024,8,0x3023,8,0x3022,8,0x3033,1,0x3040,4,0x3021,8,0x3038);config=P();n=I();assert E.eglChooseConfig(d,attrs,C.byref(config),1,C.byref(n)) and n.value
E.eglCreateContext.argtypes=[P,P,P,C.POINTER(I)];E.eglCreateContext.restype=P;context=E.eglCreateContext(d,config,None,(I*3)(0x3098,2,0x3038));assert context
E.eglCreatePbufferSurface.argtypes=[P,P,C.POINTER(I)];E.eglCreatePbufferSurface.restype=P;surface=E.eglCreatePbufferSurface(d,config,(I*5)(0x3057,960,0x3056,1000,0x3038));assert surface
E.eglMakeCurrent.argtypes=[P,P,P,P];assert E.eglMakeCurrent(d,surface,surface,context)
def fn(name,ret,*args):
 ptr=E.eglGetProcAddress(name.encode());assert ptr,name;return C.CFUNCTYPE(ret,*args)(ptr)
getString=fn('glGetString',C.c_char_p,U);print('GL',getString(0x1F02).decode(),getString(0x1F01).decode())
shader=fn('glCreateShader',U,U);source=fn('glShaderSource',None,U,I,C.POINTER(C.c_char_p),C.POINTER(I));compile=fn('glCompileShader',None,U);getShader=fn('glGetShaderiv',None,U,U,C.POINTER(I));log=fn('glGetShaderInfoLog',None,U,I,C.POINTER(I),C.c_char_p)
frag=pathlib.Path(args.fragment).read_text();vert='attribute vec2 p;void main(){gl_Position=vec4(p,0.0,1.0);}'
program=fn('glCreateProgram',U)();attach=fn('glAttachShader',None,U,U)
for typ,text in [(0x8B31,vert),(0x8B30,frag)]:
 s=shader(typ);p=C.c_char_p(text.encode());source(s,1,C.byref(p),None);compile(s);ok=I();getShader(s,0x8B81,C.byref(ok));buf=C.create_string_buffer(8192);log(s,8192,None,buf);assert ok.value,buf.value;attach(program,s)
fn('glLinkProgram',None,U)(program);ok=I();fn('glGetProgramiv',None,U,U,C.POINTER(I))(program,0x8B82,C.byref(ok));assert ok.value
fn('glUseProgram',None,U)(program);buffer=U();fn('glGenBuffers',None,I,C.POINTER(U))(1,C.byref(buffer));fn('glBindBuffer',None,U,U)(0x8892,buffer)
vertices=(F*12)(-1,-1,1,-1,-1,1,-1,1,1,-1,1,1);fn('glBufferData',None,U,C.c_ssize_t,P,U)(0x8892,C.sizeof(vertices),vertices,0x88E4)
pos=fn('glGetAttribLocation',I,U,C.c_char_p)(program,b'p');fn('glEnableVertexAttribArray',None,U)(pos);fn('glVertexAttribPointer',None,U,I,U,U,I,P)(pos,2,0x1406,0,0,None)
uniform=fn('glGetUniformLocation',I,U,C.c_char_p);ur,ut,us=[uniform(program,k) for k in [b'resolution',b'time',b'scene']]
texture=U();fn('glGenTextures',None,I,C.POINTER(U))(1,C.byref(texture));fn('glActiveTexture',None,U)(0x84C0);fn('glBindTexture',None,U,U)(0x0DE1,texture)
for param,value in [(0x2801,0x2601),(0x2800,0x2601),(0x2802,0x812F),(0x2803,0x812F)]:fn('glTexParameteri',None,U,U,I)(0x0DE1,param,value)
im=Image.open(args.texture).convert('RGBA') if args.texture else Image.new('RGBA',(1,1),(255,255,255,255));w,h=im.size;data=(C.c_ubyte*(w*h*4)).from_buffer_copy(im.tobytes());fn('glTexImage2D',None,U,I,I,I,I,I,U,U,P)(0x0DE1,0,0x1908,w,h,0,0x1908,0x1401,data);fn('glUniform1i',None,I,I)(uniform(program,b'material'),0)
f1=fn('glUniform1f',None,I,F);f2=fn('glUniform2f',None,I,F,F);viewport=fn('glViewport',None,I,I,I,I);draw=fn('glDrawArrays',None,U,I,I);read=fn('glReadPixels',None,I,I,I,I,U,U,P);error=fn('glGetError',U)

import numpy as np
results=[]
for w,h in [(960,540),(390,844),(960,405),(277,600),(960,960)]:
 viewport(0,0,w,h);f2(ur,w,h);f1(us,args.scene)
 for t in [0,4]:
  f1(ut,t);draw(4,0,6);data=(C.c_ubyte*(w*h*4))();read(0,0,w,h,0x1908,0x1401,data);assert error()==0
  im=Image.frombytes('RGBA',(w,h),bytes(data)).transpose(Image.Transpose.FLIP_TOP_BOTTOM).convert('RGB');a=np.array(im);bad=a[:,:,:2].max(2)>0;ys,xs=np.where(bad)
  r={'width':w,'height':h,'time':t,'outsidePixels':int(bad.sum()),'xOutside':int((a[:,:,0]>0).sum()),'yOutside':int((a[:,:,1]>0).sum()),'noFirstSamplePixels':int((a[:,:,2]>0).sum()),'bbox':None if not len(xs) else [int(xs.min()),int(ys.min()),int(xs.max())+1,int(ys.max())+1]}
  results.append(r)
  if r['outsidePixels'] or r['noFirstSamplePixels']:im.save(OUT/f'{w}x{h}-t{t}-uv.png')
(OUT/'uv-results.json').write_text(json.dumps(results,indent=2));print(json.dumps(results))
