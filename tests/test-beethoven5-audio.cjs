'use strict';
const fs=require('fs'),path=require('path'),assert=require('assert');
const root=path.resolve(process.argv[2]||path.join(__dirname,'..'));
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const rec=JSON.parse(html.match(/const REC_INFO = (\{.*?\});/s)[1]);
assert.equal(Object.keys(rec).length,74);
const r=rec['beethoven-5'];assert.equal(r.yt,'WyWkPhV54xM');assert(r.who.includes('ベルリン・フィルハーモニー'));assert(r.who.includes('指揮者は未確認'));assert.equal(r.album,'エクセレント・クラシック カラヤン名曲集');assert(r.rec.includes('未確認')&&r.rec.includes('配信リリース日'));assert.equal(r.venue,'未確認');assert(r.ep.includes('2020年は録音年ではなく'));assert(!r.ep.includes('クライバー'));assert(!html.includes('P-ptxTwgykY'));
const line=html.split('\n').find(x=>x.includes('"id": "beethoven-5"'));const song=JSON.parse(line.replace(/,$/,''));assert.equal(song.year,'1804–1808');assert(song.recs.some(x=>x[0].includes('クライバー')&&x[1]==='1974'));assert(song.sources.some(x=>x.includes('Kleiber')));
for(const file of ['songs/beethoven-5.html','songs/beethoven-5.md','llms-full.txt']){const s=fs.readFileSync(path.join(root,file),'utf8');assert(s.includes('WyWkPhV54xM'));assert(s.includes(r.ep));assert(s.includes(r.conf));assert(s.includes(r.rec));assert(!s.includes('第5番は1974年3〜4月、第7番は1975年11月〜1976年1月と、両曲は間隔をあけたセッションで録音されました。'));}
assert(html.includes('visual-art.js?v=20261026-omio1'));assert(html.includes('visual-timing.js?v=20261026-timing1'));
console.log(JSON.stringify({pass:true,recordings:74,selectedVideo:r.yt,releaseNotRecording:true,historicalRecommendationsPreserved:true,synchronizedArtifacts:4}));
