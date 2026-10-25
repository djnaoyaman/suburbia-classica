/* Editorial connections to verified public content. No remote fetch, tracking or source-site edits. */
(() => {
 'use strict';
 const items=[
  {
    "artId": "pathetique-2",
    "site": "鎌・くらんぽ",
    "label": "新緑の北鎌倉を歩く",
    "text": "葉脈を透かす光から、円覚寺・東慶寺の新緑へ。音楽の余韻を、歩く時間につなげる。",
    "url": "https://djnaoyaman.github.io/kuranpo/knowledge/g5.html"
  },
  {
    "artId": "waltz-64-2",
    "site": "鎌・くらんぽ",
    "label": "稲村ヶ崎の海と伝説を読む",
    "text": "寄せてはほどける波から、稲村ヶ崎の海へ。地形と物語が重なる散歩道をたどる。",
    "url": "https://djnaoyaman.github.io/kuranpo/knowledge/g13.html"
  },
  {
    "artId": "brahms-op118-2",
    "site": "一見坊の【日本妖怪学体系】",
    "label": "山と妖怪、その境界を読む",
    "text": "「山と妖怪」の境界という見方から、里の道が霧の山林へ続く創作風景を描きました。見えている道と、その先に感じる気配。実在の場所や伝承の再現ではありません。",
    "url": "https://djnaoyaman.github.io/youkai/yama-yokai.html"
  },
  {
    "artId": "mozart-pc21-2",
    "site": "一見坊の【日本妖怪学体系】",
    "label": "妖怪は、なぜ場所に現れるのか",
    "text": "水辺の小さな気配から、場所と境界に結びつく妖怪へ。見えているものと、感じたものの間を読む。",
    "url": "https://djnaoyaman.github.io/youkai/essay.html"
  },
  {
    "artId": "tchaikovsky-october",
    "site": "Earth Number",
    "label": "地面の下でつながるキノコ",
    "text": "地上に見える小さな傘から、地下に広がる菌類の世界へ。見える姿と、広がりの数字を見比べる。",
    "url": "https://djnaoyaman.github.io/earthnumber/#fungus"
  },
  {
    "artId": "rach-pc2-2",
    "site": "Earth Number",
    "label": "地球の水をひとつに集めたら",
    "text": "魚が泳ぐ水の向こうには、どれほどの水があるのだろう。海・淡水・湖と川を、同じ縮尺で見渡す。",
    "url": "https://djnaoyaman.github.io/earthnumber/#water"
  },
  {
    "artId": "canon",
    "site": "gooooooooood expression",
    "label": "波紋で景色をゆがめる仕組み",
    "text": "重なり合う波紋を、今度は表現の仕組みから。画像を読む位置の小さなずれが、揺れる景色をつくる。",
    "url": "https://djnaoyaman.github.io/gooooooooood_expression/expressions/shader-ripple.html"
  },
  {
    "artId": "jesu-joy",
    "site": "花鳥風月、そして魚と虫。",
    "label": "「蝶」から、虫へんの世界へ",
    "text": "羽の動きを眺めたあとは、「蝶」という文字を眺める。図鑑で「虫」を選び、生き物の名前をたどってみる。",
    "url": "https://djnaoyaman.github.io/sakanamushi/"
  },
  {
    "artId": "liebesgruss",
    "site": "花鳥風月、そして魚と虫。",
    "label": "「蝸牛」という名前を読む",
    "text": "苔の上で触角を動かす姿から、「蝸牛」の二文字へ。図鑑で「虫」を選び、形と名前のつながりを楽しむ。",
    "url": "https://djnaoyaman.github.io/sakanamushi/"
  }
];
 const allowedPaths=['/kuranpo/','/youkai/','/earthnumber/','/gooooooooood_expression/','/sakanamushi/'];
 const safeURL=value=>{try{const u=new URL(value);return u.protocol==='https:'&&u.hostname==='djnaoyaman.github.io'&&!u.username&&!u.password&&allowedPaths.some(path=>u.pathname.startsWith(path));}catch{return false;}};
 const byId=new Map(items.filter(item=>safeURL(item.url)).map(item=>[item.artId,Object.freeze(item)]));
 const esc=value=>String(value||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function render(id,description){
  const item=byId.get(id);if(!item)return '';
  return '<section class="art-connection" aria-label="アートからつながる読みもの">'+
   '<h2>Realismのアートから、もうひとつの世界へ</h2>'+
   (description?'<p class="art-connection-scene">Realism：'+esc(description)+'</p>':'')+
   '<p>'+esc(item.text)+'</p>'+
   '<a class="art-connection-link" href="'+esc(item.url)+'" target="_blank" rel="noopener noreferrer">'+esc(item.label)+'<span>'+esc(item.site)+' ↗ <span class="art-connection-new">（別タブ）</span></span></a>'+
   '<p class="art-connection-note">アートから広がる編集上の連想です。作曲者の意図や実際の撮影地を示すものではありません。</p></section>';
 }
 window.ClassicaArtConnections=Object.freeze({render});
})();
