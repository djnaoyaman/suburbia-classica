"""Browser regressions. Run: python tests/test-site-browser.py [repository root]

Requires Playwright for Python and Chromium (CHROMIUM_PATH overrides its path).
External requests are blocked; YouTube events are simulated, not audio playback.
"""
import os
import sys
from pathlib import Path
from urllib.parse import unquote, urlparse

from playwright.sync_api import sync_playwright

ROOT = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else Path(__file__).resolve().parents[1]
BASE = 'http://audit.test/suburbia-classica/'
with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH', '/usr/bin/chromium'),
                                headless=True, args=['--no-sandbox'])
    page = browser.new_page()
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))

    def serve(route):
        url = urlparse(route.request.url)
        if url.hostname != 'audit.test':
            route.abort()
            return
        path = ROOT / unquote(url.path.removeprefix('/suburbia-classica/'))
        if path.is_file():
            route.fulfill(path=str(path))
        else:
            route.fulfill(status=404, body='Missing')

    page.route('**/*', serve)
    page.goto(BASE + 'index.html')
    page.wait_for_function("document.querySelectorAll('.card').length===74")
    home_description = page.locator('meta[name=description]').get_attribute('content')
    page.locator('#fq').fill('ショパン')
    page.wait_for_function("document.querySelectorAll('.card').length===8")
    page.locator('#fsort').select_option('year')
    page.locator('#freset').click()
    assert page.locator('#fq').input_value() == ''
    assert page.locator('#fsort').input_value() == 'major'
    assert page.locator('.card').count() == 74

    # URL-controlled values must remain literal text in titles, pills and inputs.
    for field in ['c', 'm', 'e', 'k', 'p', 'q']:
        page.evaluate("field => { location.hash='#/?'+field+'='+encodeURIComponent('<img src=x onerror=\"window.injected=1\">'); }", field)
        page.wait_for_function("location.hash.includes('onerror')")
        page.wait_for_timeout(40)
        assert page.locator('#view img').count() == 0
        assert page.evaluate('window.injected||0') == 0
    for kind in ['composer', 'mood', 'cat']:
        page.evaluate("kind => {location.hash='#/'+kind+'/'+encodeURIComponent('<img src=x onerror=\"window.injected=1\">');}", kind)
        page.wait_for_timeout(40)
        assert page.locator('#view img').count() == 0
        page.evaluate("kind => {location.hash='#/'+kind+'/%';}", kind)
        page.wait_for_timeout(40)
        assert page.locator('.card').count() == 74

    # Install a deterministic player so queue/event behavior is observable offline.
    page.evaluate("""() => {
      window.calls=[];
      window.YT={Player:function(id,opts){
        window.ytEvents=opts.events;
        this.loadVideoById=id=>calls.push(['load',id]);
        this.cueVideoById=id=>calls.push(['cue',id]);
        this.playVideo=()=>{};this.pauseVideo=()=>{};
      }};
      onYouTubeIframeAPIReady();ytEvents.onReady();
      location.hash='#/?q='+encodeURIComponent('ショパン')+'&s=year';
    }""")
    page.wait_for_function("document.querySelectorAll('.card').length===8")
    displayed = page.locator('.card').evaluate_all("cards=>cards.map(c=>c.hash.split('/').pop())")
    page.locator('#fplay').click()
    page.wait_for_function("location.hash.startsWith('#/song/')")
    assert page.evaluate('QUEUE') == displayed
    page.evaluate('ytEvents.onStateChange({data:0})')
    page.wait_for_function('id=>location.hash.endsWith(id)', arg=displayed[1])

    # Ending a singleton queue must replay even though the hash stays the same.
    page.evaluate("location.hash='#/?q='+encodeURIComponent('幻想即興曲')")
    page.wait_for_function("document.querySelectorAll('.card').length===1")
    page.locator('#fplay').click()
    page.wait_for_function("location.hash==='#/song/fantaisie-impromptu'")
    count = page.evaluate('calls.length')
    page.evaluate('ytEvents.onStateChange({data:0})')
    assert page.evaluate('calls.length') == count + 1
    assert page.evaluate('calls[calls.length-1][0]') == 'load'

    # Cancelling an error skip must not jump away from a manually selected song.
    page.evaluate('QUEUE=null;ytEvents.onError();ssStep(1)')
    selected = page.evaluate('location.hash')
    page.wait_for_timeout(1600)
    assert page.evaluate('location.hash') == selected
    page.evaluate('ytEvents.onError();ssStop()')
    page.wait_for_timeout(1600)
    assert page.evaluate('location.hash') == selected

    ids = page.evaluate('SONGS.map(s=>s.id)')
    for song in ids:
        page.evaluate("id=>{location.hash='#/song/'+id;}", song)
        page.wait_for_function('id=>document.querySelector("link[rel=canonical]").href.endsWith("/"+id+".html")', arg=song)
        assert page.locator('#view h1').count() == 1
    page.evaluate("location.hash='#/'")
    page.wait_for_function("document.querySelectorAll('.card').length===74")
    assert page.locator('meta[name=description]').get_attribute('content') == home_description

    # All native pages execute without JS exceptions, at mobile width as well.
    page.set_viewport_size({'width':390,'height':844})
    for path in sorted(ROOT.rglob('*.html')):
        if path.name == 'index.html' and path.parent == ROOT:
            continue
        page.goto(BASE + path.relative_to(ROOT).as_posix())
        assert page.locator('html[lang=ja]').count() == 1
    assert not errors, errors
    browser.close()
print('PASS: reset, URL safety, malformed routes, sorted/singleton queues, cancelled error skips, 74 song routes, metadata, native pages')
