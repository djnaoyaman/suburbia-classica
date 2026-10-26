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
const hashes={
  "pathetique-2": "52b76631cf9a6b4d9171d826c8bc86b8ba5e0d3dc83cf73fa79f28d2b0090c1c",
  "waltz-64-2": "b38e0e5346717efac896bb1053c7ac1fa1fb0b23ab673c336861b619c2c333ff",
  "brahms-op118-2": "ec96725e78b2a0ffcaada277687259eab78d96ef3861e06a096a3ce2574ea381",
  "mozart-pc21-2": "18803305250a3dd8d4d30ed0d09e94f141ddd1d4c308eff459c1360b21c9df61",
  "tchaikovsky-october": "20b1746623d926391a48ac28c7a603183b0642f40c4610bba49c5fae58671bc8",
  "rach-pc2-2": "3257425cb2ab4d4c608f5b613f6101e6b0c6c9e0561bfc094ac82ae86c5dc9f8"
};
for(const [id,hash] of Object.entries(hashes)){const got=crypto.createHash('sha256').update(JSON.stringify([api.render(id,'same scene'),api.renderFullscreen(id,'realism'),api.renderFullscreen(id,'visual'),api.renderFullscreen(id,'impressive')])).digest('hex');assert.equal(got,hash,id+' connection unchanged');}
console.log('PASS: stale Jesu butterfly attribution removed; all six continuing article/fullscreen connections exactly preserved.');
