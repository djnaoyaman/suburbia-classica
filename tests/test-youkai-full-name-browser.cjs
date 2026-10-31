'use strict';
const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),base='https://classica.test/',name='一見坊の【日本妖怪学体系】';
(async()=>{const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{})});const results=[];
try{for(const [width,height,touch] of [[320,568,true],[390,844,true],[844,390,true],[1280,800,false]]){
const context=await browser.newContext({viewport:{width,height},hasTouch:touch,isMobile:touch,reducedMotion:'reduce'});const page=await context.newPage();
await page.route('**/*',r=>{const u=new URL(r.request().url()),p=path.join(root,decodeURIComponent(u.pathname));if(u.origin!==base.slice(0,-1))return r.abort();return fs.existsSync(p)&&fs.statSync(p).isFile()?r.fulfill({path:p}):r.fulfill({status:404,body:'Missing'});});
await page.goto(base+'index.html');await page.waitForFunction(()=>window.ClassicaArtConnections&&typeof ssShow==='function');
for(const id of ['brahms-op118-2','mozart-pc21-2']){await page.evaluate(id=>{ssHide();artMode='realism';ssShow(false);ssSet(SONGS.findIndex(s=>s.id===id));},id);
const label=page.locator('#ssCredit .ss-credit-site');await label.waitFor({state:'visible'});assert.equal(await label.innerText(),name);
const metrics=await label.evaluate(e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return {left:r.left,right:r.right,width:r.width,height:r.height,scroll:e.scrollWidth,client:e.clientWidth,overflow:s.overflow,whiteSpace:s.whiteSpace,textOverflow:s.textOverflow}});
assert(metrics.left>=0&&metrics.right<=width+1,JSON.stringify(metrics));assert(metrics.scroll<=metrics.client+1,JSON.stringify(metrics));assert.notEqual(metrics.whiteSpace,'nowrap');assert.notEqual(metrics.textOverflow,'ellipsis');
const link=page.locator('#ssCredit a');assert((await link.getAttribute('aria-label')).includes(name));assert((await link.getAttribute('title')).includes(name));assert.equal(await link.getAttribute('target'),'_blank');
await link.focus();assert(await link.evaluate(e=>e===document.activeElement));
fs.mkdirSync(path.join(root,'test-artifacts'),{recursive:true});await page.screenshot({path:path.join(root,'test-artifacts',`youkai-full-${width}-${id}.png`)});
await page.evaluate(()=>ssHide());assert.equal(await page.locator('#ss').getAttribute('aria-hidden'),'true');results.push({width,height,touch,id,metrics});}
await context.close();}console.log(JSON.stringify({pass:true,results}));}finally{await browser.close();}})().catch(e=>{console.error(e);process.exit(1)});
