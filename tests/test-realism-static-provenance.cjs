'use strict';
const fs=require('fs'),path=require('path'),assert=require('assert'),crypto=require('crypto'),vm=require('vm');
const root=path.resolve(process.argv[2]||path.join(__dirname,'..'));
const section=/<section aria-labelledby="realism-inspiration">[\s\S]*?<\/section>/g;
const removed=[
  {
    "id": "jesu-joy",
    "path": "songs/jesu-joy.html",
    "oldUrl": "https://djnaoyaman.github.io/sakanamushi/",
    "join": "<p style=\"display:flex;justify-content:space-between;gap:10px;margin-top:40px\"><a href=\"air-g-string.html\">← G線上のアリア</a><a href=\"rach-pc2-2.html\">ピアノ協奏曲第2番 第2楽章 →</a></p></main>"
  },
  {
    "id": "canon",
    "path": "songs/canon.html",
    "oldUrl": "https://djnaoyaman.github.io/gooooooooood_expression/expressions/shader-ripple.html",
    "join": "<p style=\"display:flex;justify-content:space-between;gap:10px;margin-top:40px\"><a href=\"brahms-op118-2.html\">← 6つの小品 Op.118 第2番 間奏曲 イ長調</a><a href=\"air-g-string.html\">G線上のアリア →</a></p></main>"
  },
  {
    "id": "liebesgruss",
    "path": "songs/liebesgruss.html",
    "oldUrl": "https://djnaoyaman.github.io/sakanamushi/",
    "join": "<p style=\"display:flex;justify-content:space-between;gap:10px;margin-top:40px\"><a href=\"schubert-ave-maria.html\">← アヴェ・マリア（エレンの歌 第3番）</a><a href=\"vocalise.html\">ヴォカリーズ →</a></p></main>"
  },
  {
    "id": "rach-pc2-2",
    "path": "songs/rach-pc2-2.html",
    "oldUrl": "https://djnaoyaman.github.io/earthnumber/#water",
    "join": "<p style=\"display:flex;justify-content:space-between;gap:10px;margin-top:40px\"><a href=\"jesu-joy.html\">← 主よ人の望みの喜びよ</a><a href=\"schubert-ave-maria.html\">アヴェ・マリア（エレンの歌 第3番） →</a></p></main>"
  }
];
for(const r of removed){
 const html=fs.readFileSync(path.join(root,r.path),'utf8');
 assert(!section.test(html),r.id+' obsolete static Realism section must be absent');section.lastIndex=0;
 assert(!html.includes(r.oldUrl),r.id+' obsolete external motif link must be absent');
 assert(html.includes(r.join),r.id+' adjacent song navigation and main boundary must remain');
}
const continuing={
  "pathetique-2": "5d2e4bba7efc5893030133e937e69dee6686e14c9bf126c8880b84834c746e63",
  "waltz-64-2": "e703698ce50f177f3c65b0818f3e63531867ea275704ba4e680e3a95c5527f4a",
  "brahms-op118-2": "f698c4342acd903a0561c0749d11d52b9659df3a420e6997d655a01b735f8af4",
  "mozart-pc21-2": "6b57756db92be396744fd0b6fd9bf8f488d02a4d5a79bff6fee1e9f7f304c727"
};
for(const [id,expected] of Object.entries(continuing)){
 const html=fs.readFileSync(path.join(root,'songs',id+'.html'),'utf8');
 const found=[...html.matchAll(section)];assert.equal(found.length,1,id+' retained section count');
 const actual=crypto.createHash('sha256').update(found[0][0]).digest('hex');assert.equal(actual,expected,id+' retained static provenance must be exact');
}
const october=fs.readFileSync(path.join(root,'songs/tchaikovsky-october.html'),'utf8');
assert(!october.includes('aria-labelledby="realism-inspiration"'));assert(!october.includes('earthnumber/#fungus'));
const sandbox={window:{},URL};vm.runInNewContext(fs.readFileSync(path.join(root,'art-connections.js'),'utf8'),sandbox);
for(const id of [...removed.map(x=>x.id),'tchaikovsky-october']){
 assert.equal(sandbox.window.ClassicaArtConnections.render(id,'current scene'),'');
 for(const mode of ['realism','visual','impressive'])assert.equal(sandbox.window.ClassicaArtConnections.renderFullscreen(id,mode),'');
}
console.log('PASS: four obsolete static motif credits removed, adjacent navigation retained, four continuing static credits exact, five removed runtime credits absent.');
