'use strict';
const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),data=require('../reference-data.js'),base='https://classica.test/';
(async()=>{const browser=await chromium.launch({headless:true});let checks=0;
for(const width of [390,1280]){
 const page=await browser.newPage({viewport:{width,height:844}}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/*',route=>{const u=new URL(route.request().url());if(u.origin!==base.slice(0,-1))return route.abort();const p=path.join(root,decodeURIComponent(u.pathname));if(!p.startsWith(root)||!fs.existsSync(p)||!fs.statSync(p).isFile())return route.fulfill({status:404,body:'Missing'});return route.fulfill({path:p});});
 await page.goto(base+'index.html');await page.waitForFunction(()=>typeof SONGS!=='undefined'&&SONGS.length===74);
 for(const id of Object.keys(data)){
  await page.evaluate(id=>renderSong(SONGS.findIndex(s=>s.id===id)),id);
  const sections=await page.locator('.song h2').evaluateAll(headings=>headings.map(h=>{const nodes=[];for(let e=h.nextElementSibling;e&&e.tagName!=='H2';e=e.nextElementSibling)nodes.push(e);return {title:h.textContent,links:nodes.flatMap(n=>[...(n.matches('a')?[n]:[]),...n.querySelectorAll('a')].map(a=>a.href)),text:h.textContent+nodes.map(n=>n.textContent).join('')};}));
  for(const heading of ['CM','教科書・鑑賞教材','楽譜・他のサービスで聴く']){const section=sections.find(s=>s.title===heading);assert(section,id+' '+heading);assert(section.text.length>heading.length+10);assert(section.links.every(x=>x.startsWith('https://')));checks++;}
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),id+' mobile overflow');
 }
 await page.evaluate(()=>{FS.uses=new Set(['cm']);});
 // Data-backed facets must not count legacy unsupported entries.
 assert.equal(await page.evaluate(()=>SONGS.filter(s=>fmatch(s)).length),4);
 for(const id of Object.keys(data)){
  await page.goto(base+'songs/'+id+'.html');
  assert.equal(await page.locator('section[data-reference]').count(),3);
  assert.equal(await page.locator('section[data-reference="resources"] a').count(),3);
  if(width===390&&['fur-elise','prelude-7','barber-adagio','carmen-prelude'].includes(id)){fs.mkdirSync(path.join(root,'test-artifacts'),{recursive:true});await page.locator('section[data-reference="resources"]').screenshot({path:path.join(root,'test-artifacts',id+'-resources-mobile.png')});await page.locator('section[data-reference="cm"]').screenshot({path:path.join(root,'test-artifacts',id+'-cm-mobile.png')});await page.locator('section[data-reference="textbooks"]').screenshot({path:path.join(root,'test-artifacts',id+'-materials-mobile.png')});}
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),id+' static overflow');checks++;
 }
 assert.deepEqual(errors,[]);await page.close();
}
await browser.close();console.log(JSON.stringify({pass:true,viewports:[390,1280],songs:74,sectionAndArticleChecks:checks,externalPlayback:'not tested; links are explicit work searches'}));})().catch(e=>{console.error(e);process.exit(1)});
