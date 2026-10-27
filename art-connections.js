/* Editorial connections to verified public content. No remote fetch, tracking or source-site edits. */
(() => {
 'use strict';
 const items=[
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
