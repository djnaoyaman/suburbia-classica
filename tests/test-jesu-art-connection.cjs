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
assert.equal(api.render('pathetique-2','Dubrovnik lane'),'');
for(const mode of ['realism','visual','impressive'])assert.equal(api.renderFullscreen('pathetique-2',mode),'');
const pathetiqueHTML=fs.readFileSync(root+'/songs/pathetique-2.html','utf8');
assert(!pathetiqueHTML.includes('kuranpo/knowledge/g5.html'));
assert(!pathetiqueHTML.includes('aria-labelledby="realism-inspiration"'));
const hashes={
  "waltz-64-2": "b38e0e5346717efac896bb1053c7ac1fa1fb0b23ab673c336861b619c2c333ff",
  "brahms-op118-2": "f463cca5a35c3e12d56aa16eede95dfe0d6880669cd916fe55f7c9f5b926d68f",
  "mozart-pc21-2": "356fb3f3cb184ed1e17a22203f45c7e31496703acd9ad6fe53728ef1daba1bdf"
};
for(const [id,hash] of Object.entries(hashes)){const got=crypto.createHash('sha256').update(JSON.stringify([api.render(id,'same scene'),api.renderFullscreen(id,'realism'),api.renderFullscreen(id,'visual'),api.renderFullscreen(id,'impressive')])).digest('hex');assert.equal(got,hash,id+' connection unchanged');}
console.log('PASS: stale Jesu butterfly, October fungus and Pathetique leaf attributions removed; all three continuing article/fullscreen connections exactly preserved.');
