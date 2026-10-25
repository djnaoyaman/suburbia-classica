"""Chromium checks for the 74 individually painted Impressive works.

python tests/test-impressive-art.py [--available]
Requires Python Playwright, Pillow and Chromium (CHROMIUM_PATH override).
The optional flag only checks paintings already saved during production.
Software WebGL checks correctness, not actual mobile GPU performance.
"""
import argparse
import hashlib
import json
import os
from pathlib import Path
from urllib.parse import unquote,urlparse

from PIL import Image
from playwright.sync_api import sync_playwright

parser=argparse.ArgumentParser();parser.add_argument('--available',action='store_true');args=parser.parse_args()
ROOT=Path(__file__).resolve().parents[1]
s=(ROOT/'impressive-catalog.js').read_text();catalog=json.loads(s[s.index('=')+1:].strip().rstrip(';'))
assert len(catalog['works'])==74
assert len({w['artist'] for w in catalog['works']})==11
available=[w for w in catalog['works'] if (ROOT/w['asset']).is_file()]
assert args.available or len(available)==74, 'Missing paintings: '+str(74-len(available))
hashes=set()
for work in available:
    image=Image.open(ROOT/work['asset'])
    assert image.width>=1536 and image.height>=1024,work['id']
    digest=hashlib.sha256((ROOT/work['asset']).read_bytes()).hexdigest()
    assert digest not in hashes,work['id'];hashes.add(digest)
    assert (ROOT/work['source']).is_file() and work['rationale']
    if work.get('portraitAsset'):
        portrait=Image.open(ROOT/work['portraitAsset'])
        assert portrait.height>portrait.width>=1024,work['id']

with sync_playwright() as p:
    browser=p.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH','/usr/bin/chromium'),headless=True,
        args=['--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
    page=browser.new_page(viewport={'width':960,'height':540},device_scale_factor=1)
    errors=[];requests=[]
    page.on('pageerror',lambda error:errors.append(str(error)))

    def serve(route):
        u=urlparse(route.request.url)
        if u.hostname!='audit.test':route.abort();return
        path=ROOT/unquote(u.path.removeprefix('/suburbia-classica/'))
        if '/assets/impressive/' in u.path:requests.append(u.path)
        route.fulfill(path=str(path)) if path.is_file() else route.fulfill(status=404,body='Missing')

    page.route('**/*',serve)
    page.goto('http://audit.test/suburbia-classica/index.html')
    assert page.evaluate("artMode==='impressive' && !window.ClassicaOriginal")
    page.evaluate('ClassicaImpressive.list().forEach(w=>ClassicaImpressive.create(w.id).init(960,540))')
    assert not requests,'Inactive catalogue inspection loaded images'
    page.evaluate('ssShow(false)')
    frames=0
    for width,height in [(960,540),(390,844)]:
        page.set_viewport_size({'width':width,'height':height})
        for work in available:
            page.evaluate("id=>{cur=SONGS.findIndex(s=>s.id===id);ssSet(cur);ssLoop(performance.now());}",work['id'])
            page.wait_for_function("id=>ClassicaImpressive.status(id)==='ready'",arg=work['id'],timeout=20000)
            metrics=page.evaluate("""() => {
              const hash=()=>{const d=cx.getImageData(0,0,cv.width,cv.height).data;let h=2166136261,sum=0,sum2=0,n=0;
                for(let i=0;i<d.length;i+=388){h=Math.imul(h^d[i],16777619);h=Math.imul(h^d[i+1],16777619);const l=(d[i]+d[i+1]+d[i+2])/3;sum+=l;sum2+=l*l;n++;}
                return {hash:h>>>0,variance:sum2/n-(sum/n)**2};};
              SS.art.draw(cx,SS.W,SS.H,8,SS.st,{progress:.2});const first=hash();
              SS.art.draw(cx,SS.W,SS.H,25,SS.st,{progress:.2});const second=hash();
              SS.art.draw(cx,SS.W,SS.H,8,SS.st,{progress:.2});const repeat=hash();
              return {first,second,repeat,cache:ClassicaImpressive.materialState()};
            }""")
            assert metrics['first']['variance']>60,work['id']
            assert metrics['first']['hash']==metrics['repeat']['hash'],('non-deterministic',work['id'])
            if metrics['cache']['texture']:
                assert metrics['first']['hash']!=metrics['second']['hash'],('no local motion',work['id'])
            assert len(metrics['cache']['retained'])<=2 and metrics['cache']['texture']<=1
            frames+=1
    page.evaluate("""() => {
      let media=14;player={getCurrentTime:()=>media,getDuration:()=>120};ytReady=true;playing=true;SS.mediaAt=null;
      if(ssImpressiveTime(1000,0)!==14)throw Error('media sample');
      if(Math.abs(ssImpressiveTime(1100,0)-14.1)>.0001)throw Error('media interpolation');
      media=82;if(ssImpressiveTime(1300,0)!==82)throw Error('seek');
      playing=false;SS.mediaAt=null;
      if(ssImpressiveTime(1400,0)!==82||ssImpressiveTime(1450,0)!==82)throw Error('pause');
      ssHide();if(ClassicaImpressive.materialState().active!==null||ClassicaImpressive.materialState().texture!==0)throw Error('release');
    }""")
    # Reduced motion displays the same painting without a recurring animation loop.
    reduced=browser.new_page(viewport={'width':390,'height':844},reduced_motion='reduce')
    reduced.route('**/*',serve);reduced.on('pageerror',lambda e:errors.append(str(e)))
    reduced.goto('http://audit.test/suburbia-classica/index.html')
    reduced.evaluate('ssShow(false)')
    reduced.wait_for_function("ClassicaImpressive.status('fur-elise')==='ready'")
    reduced.evaluate("cancelAnimationFrame(SS.raf);SS.raf=0;ssLoop(performance.now());if(SS.raf!==0)throw Error('reduced motion loop');ssHide()")
    # Loss of WebGL still leaves a complete full-resolution painting.
    fallback=browser.new_page(viewport={'width':390,'height':844})
    fallback.add_init_script("const context=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){return type==='webgl'?null:context.call(this,type,...args)}")
    fallback.route('**/*',serve);fallback.on('pageerror',lambda e:errors.append(str(e)))
    fallback.goto('http://audit.test/suburbia-classica/index.html');fallback.evaluate('ssShow(false)')
    fallback.wait_for_function("ClassicaImpressive.status('fur-elise')==='ready'")
    assert fallback.evaluate("SS.art.draw(cx,SS.W,SS.H,8,SS.st) && ClassicaImpressive.materialState().texture===0")
    assert not errors,errors
    browser.close()
print('PASS:',len(available),'paintings /',frames,'landscape+portrait frames / 11 painter catalogue / local motion / deterministic seek+pause / 2-image cache / reduced motion / Canvas fallback')
