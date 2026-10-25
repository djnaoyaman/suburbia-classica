"""Render every Original scene in Chromium, without external requests.

python tests/test-original-art.py [root]
Requires Python Playwright and Chromium (or CHROMIUM_PATH).
Checks actual pixels, repeatability, aspect ratios and media-clock integration.
"""
import os
import sys
from pathlib import Path
from urllib.parse import unquote, urlparse

from playwright.sync_api import sync_playwright

ROOT = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else Path(__file__).resolve().parents[1]
with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH', '/usr/bin/chromium'),
                                headless=True, args=['--no-sandbox'])
    page = browser.new_page(viewport={'width':960,'height':540}, device_scale_factor=2)
    errors = []
    page.on('pageerror', lambda e: errors.append(str(e)))

    def serve(route):
        u = urlparse(route.request.url)
        if u.hostname != 'audit.test':
            route.abort()
            return
        path = ROOT / unquote(u.path.removeprefix('/suburbia-classica/'))
        route.fulfill(path=str(path)) if path.is_file() else route.fulfill(status=404, body='Missing')

    page.route('**/*',serve)
    page.goto('http://audit.test/suburbia-classica/index.html')
    result = page.evaluate("""() => {
      const entries=ClassicaOriginal.list(),ids=SONGS.map(s=>s.id);
      if(entries.length!==74||new Set(entries.map(e=>e.id)).size!==74)throw Error('catalog coverage');
      if(ids.some(id=>!ClassicaOriginal.has(id)))throw Error('missing song');
      if(ClassicaOriginal.create('missing')!==null)throw Error('unknown id');
      const families=new Set(entries.map(e=>e.scene));if(families.size<22)throw Error('scene variety');
      const canvas=document.createElement('canvas'),c=canvas.getContext('2d',{willReadFrequently:true});
      const signature=()=>{
        const data=c.getImageData(0,0,canvas.width,canvas.height).data;
        let sum=0,sum2=0,count=0,hash=2166136261,opaque=true;
        for(let i=0;i<data.length;i+=388){
          const l=(data[i]+data[i+1]+data[i+2])/3;sum+=l;sum2+=l*l;count++;
          hash=Math.imul(hash^data[i],16777619);hash=Math.imul(hash^data[i+1],16777619);hash=Math.imul(hash^data[i+2],16777619);
          if(data[i+3]!==255)opaque=false;
        }
        return {hash:hash>>>0,variance:sum2/count-(sum/count)**2,opaque};
      };
      let rendered=0,minVariance=Infinity;const signatures=new Set();
      for(const [w,h] of [[640,360],[390,844]])for(const entry of entries){
        canvas.width=w;canvas.height=h;const art=ClassicaOriginal.create(entry.id),state=art.init(w,h);
        art.draw(c,w,h,8,state,{progress:.1});const a=signature();
        art.draw(c,w,h,25,state,{progress:.1});const b=signature();
        art.draw(c,w,h,8,state,{progress:.1});const repeated=signature();
        if(!a.opaque||!b.opaque)throw Error('transparent frame '+entry.id);
        if(a.variance<20)throw Error('flat scene '+entry.id);
        if(a.hash===b.hash)throw Error('no motion '+entry.id);
        if(a.hash!==repeated.hash)throw Error('frame depends on frame history '+entry.id);
        minVariance=Math.min(minVariance,a.variance);signatures.add(a.hash);rendered++;
      }
      if(signatures.size!==rendered)throw Error('duplicate scene');
      return {songs:entries.length,families:families.size,aspectRatioFrames:rendered,minVariance};
    }""")
    # Integration: use the new renderer, follow seeks, interpolate and freeze.
    page.evaluate("""() => {
      ssShow(false);if(!SS.original)throw Error('new renderer not active');
      if(cv.width!==1920||cv.height!==1080)throw Error('retina sizing');
      let media=14;player={getCurrentTime:()=>media,getDuration:()=>120};ytReady=true;playing=true;
      SS.mediaAt=null;
      if(ssOriginalTime(1000,0)!==14)throw Error('media sampling');
      if(Math.abs(ssOriginalTime(1100,0)-14.1)>.0001)throw Error('interpolation');
      media=82;if(ssOriginalTime(1300,0)!==82)throw Error('seek tracking');
      playing=false;SS.mediaAt=null;
      if(ssOriginalTime(1400,0)!==82||ssOriginalTime(1450,0)!==82)throw Error('pause drift');
      const saved=window.ClassicaOriginal;window.ClassicaOriginal=undefined;ssSet(0);
      if(SS.original)throw Error('legacy fallback');
      window.ClassicaOriginal=saved;ssSet(0);ssHide();
    }""")
    # Reduced motion renders one still frame and never schedules an animation loop.
    reduced = browser.new_page(viewport={'width':390,'height':844}, reduced_motion='reduce')
    reduced.route('**/*',serve)
    reduced.on('pageerror', lambda e: errors.append(str(e)))
    reduced.goto('http://audit.test/suburbia-classica/index.html')
    reduced.evaluate("""() => {
      ssShow(false);cancelAnimationFrame(SS.raf);SS.raf=0;ssLoop(performance.now());
      if(SS.raf!==0)throw Error('reduced motion loop');ssHide();
    }""")
    assert not errors, errors
    browser.close()
print('PASS:', result, 'media time / seek / pause / retina / fallback / reduced motion')
