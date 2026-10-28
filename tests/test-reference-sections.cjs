'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const data=require('../reference-data.js'),r=require('../reference-sections.js');
const index=fs.readFileSync('index.html','utf8');const src=index.slice(index.indexOf('const SONGS ='),index.indexOf('const REC_INFO ='));
const ctx={ClassicaReferenceSections:r,ClassicaReferences:data};vm.createContext(ctx);vm.runInContext(src+';globalThis.songs=SONGS',ctx);
assert.equal(ctx.songs.length,74);assert.equal(Object.keys(data).length,74);
let links=0;
for(const s of ctx.songs){
 const d=data[s.id];assert(d);assert(d.score.work);assert(!d.score.url.includes('Special:Search'));assert(r.safeURL(d.score.url));
 assert.equal(s.cms.length,d.cms.length);assert.equal(s.textbooks.length,d.textbooks.length);
 const page=fs.readFileSync('songs/'+s.id+'.html','utf8');
 for(const type of ['resources','cm','textbooks']){
  const output=r.render(d,type);assert(page.includes(output),s.id+' static matches renderer '+type);
  assert(!/href="(?:undefined|null|#)"/.test(output));
  for(const m of output.matchAll(/href="([^"]+)"/g)){assert(m[1].startsWith('https://'));assert(!/[<>]/.test(m[1]));links++;}
 }
 assert.equal((r.render(d,'resources').match(/作品を検索/g)||[]).length,2);
 assert(r.render(d,'resources').includes('同じ録音への直リンクではありません'));
}
const unsafe={score:{url:'javascript:alert(1)',work:'<img onerror=x>',label:'"evil',note:'test',kind:'publisher'},query:'"<>&',cms:[],textbooks:[]};
const output=r.render(unsafe,'resources');assert(!output.includes('<img'));assert(!output.includes('href="javascript:'));assert(output.includes('&lt;img'));
assert(!r.safeURL('http://example.com'));assert.equal(r.safeURL('https://example.com/a"b'),'https://example.com/a%22b');
assert.equal(data['barber-adagio'].score.kind,'publisher');assert.equal(data['caccini-ave-maria'].score.kind,'publisher');
assert.equal(data['prelude-7'].cms.length,1);assert.equal(data['nocturne-9-2'].cms.length,0);
console.log(JSON.stringify({songs:74,sections:222,validLinks:links,cmWorks:ctx.songs.filter(s=>s.cms.length).length,materialWorks:ctx.songs.filter(s=>s.textbooks.length).length}));
