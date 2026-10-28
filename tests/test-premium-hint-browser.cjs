'use strict';
const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),base='https://classica.test/';
(async()=>{const browser=await chromium.launch({headless:true});let checks=0;
for(const width of [320,390,768,1280])for(const blocked of [false,true]){
 const page=await browser.newPage({viewport:{width,height:844},reducedMotion:'reduce'});
 if(blocked)await page.addInitScript(()=>Object.defineProperty(window,'sessionStorage',{get(){throw Error('blocked')}}));
 await page.route('**/*',r=>{const u=new URL(r.request().url());if(u.origin!==base.slice(0,-1))return r.abort();const p=path.join(root,u.pathname);return fs.existsSync(p)&&fs.statSync(p).isFile()?r.fulfill({path:p}):r.fulfill({status:404,body:'missing'});});
 await page.goto(base+'index.html');
 await page.evaluate(()=>{ytReady=true;player={loadVideoById(){},cueVideoById(){}};});
 await page.locator('#overlay').click();
 assert.equal(await page.locator('.premium-playback-hint').count(),1);checks++;
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));checks++;
 const hint=await page.locator('.premium-playback-hint').boundingBox(),video=await page.locator('.vwrap').boundingBox(),controls=await page.locator('.ctrl').boundingBox();
 assert(hint.y>=video.y+video.height-1&&hint.y>=controls.y+controls.height-1);checks++;
 await page.locator('.premium-playback-hint a').focus();await page.waitForTimeout(8100);
 assert.equal(await page.locator('.premium-playback-hint').count(),1);checks++;
 await page.locator('.premium-playback-hint button').click();
 await page.evaluate(()=>{premiumPlaybackHint.show();location.hash='#/song/moonlight';});
 assert.equal(await page.locator('.premium-playback-hint').count(),0);checks++;
 if(!blocked){await page.reload();await page.evaluate(()=>premiumPlaybackHint.show());assert.equal(await page.locator('.premium-playback-hint').count(),0);checks++;}
 await page.close();
}
await browser.close();console.log(JSON.stringify({pass:true,checks,playback:'mocked; no live audio claim'}));})().catch(e=>{console.error(e);process.exit(1)});
