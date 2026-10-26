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
    "text": "稲村ヶ崎伝説を地形からたどる記事に着想し、波の引き際に海と陸の間が現れる創作の海辺を描きました。実在の稲村ヶ崎や歴史上の出来事の再現ではありません。",
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
    "text": "地上の姿からは見えない菌類の広がりを紹介する展示から着想し、雨水がしずくとなる朽木の隙間へ目を向ける創作の林床を描きました。特定の菌類個体や地下の広がり、成長速度を再現したものではありません。",
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
    "text": "波が通ると、水底の石の模様が一瞬ちがって見える。屈折に似たゆがみを元の模様と比べる表現図鑑から着想し、静かな浅瀬を描きました。水の物理シミュレーションや実在の場所の再現ではありません。",
    "url": "https://djnaoyaman.github.io/gooooooooood_expression/expressions/shader-ripple.html"
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
 const shortSites={'鎌・くらんぽ':'鎌・くらんぽ','一見坊の【日本妖怪学体系】':'妖怪学体系','Earth Number':'Earth Number','gooooooooood expression':'expression','花鳥風月、そして魚と虫。':'花鳥風月'};
 function renderFullscreen(id,mode){
  const item=mode==='realism'?byId.get(id):null;if(!item)return '';
  const name=shortSites[item.site]||item.site;
  return '<a class="ss-credit-link" href="'+esc(item.url)+'" target="_blank" rel="noopener noreferrer" aria-label="'+esc('Realismの着想：'+item.site+'。連携先の詳細を別タブで開く')+'" title="'+esc(item.site+' — 別タブで開く')+'"><span class="ss-credit-prefix">Realismの着想：</span><span class="ss-credit-site">'+esc(name)+'</span><span class="ss-credit-detail"> · 詳細↗（別タブ）</span></a>';
 }
 window.ClassicaArtConnections=Object.freeze({render,renderFullscreen});
})();
