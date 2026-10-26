'use strict';
const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('assert'),crypto=require('crypto');
const root=path.resolve(process.argv[2]||path.join(__dirname,'..'));
const html=fs.readFileSync(root+'/index.html','utf8');
assert(/<script src="art-connections\.js\?v=[^"]+"><\/script>/.test(html));
const sandbox={window:{},URL};vm.createContext(sandbox);vm.runInContext(fs.readFileSync(root+'/art-connections.js','utf8'),sandbox);
const api=sandbox.window.ClassicaArtConnections;
assert.equal(api.render('jesu-joy','church morning'),'');
for(const mode of ['realism','visual','impressive'])assert.equal(api.renderFullscreen('jesu-joy',mode),'');
assert.equal(api.render('absent','none'),'');
assert.equal(api.render('tchaikovsky-october','orchard'),'');
for(const mode of ['realism','visual','impressive'])assert.equal(api.renderFullscreen('tchaikovsky-october',mode),'');
const octoberHTML=fs.readFileSync(root+'/songs/tchaikovsky-october.html','utf8');
assert(!octoberHTML.includes('earthnumber/#fungus'));
assert(!octoberHTML.includes('aria-labelledby="realism-inspiration"'));
const hashes={
  "pathetique-2": "52b76631cf9a6b4d9171d826c8bc86b8ba5e0d3dc83cf73fa79f28d2b0090c1c",
  "waltz-64-2": "b38e0e5346717efac896bb1053c7ac1fa1fb0b23ab673c336861b619c2c333ff",
  "brahms-op118-2": "ec96725e78b2a0ffcaada277687259eab78d96ef3861e06a096a3ce2574ea381",
  "mozart-pc21-2": "18803305250a3dd8d4d30ed0d09e94f141ddd1d4c308eff459c1360b21c9df61"
};
for(const [id,hash] of Object.entries(hashes)){const got=crypto.createHash('sha256').update(JSON.stringify([api.render(id,'same scene'),api.renderFullscreen(id,'realism'),api.renderFullscreen(id,'visual'),api.renderFullscreen(id,'impressive')])).digest('hex');assert.equal(got,hash,id+' connection unchanged');}
console.log('PASS: stale Jesu butterfly and October fungus attributions removed; all four continuing article/fullscreen connections exactly preserved.');
