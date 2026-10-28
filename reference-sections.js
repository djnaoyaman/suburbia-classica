/* Shared renderer for the player and generated, JavaScript-free song articles. */
(function(root){
'use strict';
const escape = value => String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function safeURL(value){try{const u=new URL(value);return u.protocol==='https:'?u.href:null;}catch{return null;}}
function link(url,label,button=false){const u=safeURL(url);return u?'<a'+(button?' class="btn"':'')+' href="'+escape(u)+'" target="_blank" rel="noopener noreferrer">'+escape(label)+'<span aria-hidden="true"> ↗</span></a>':escape(label);}
function sources(items,type){
 if(!items?.length)return '<p class="pend">'+(type==='cm'?'曲名まで確認できる広告主・制作元の一次資料は、現在掲載していません。使用例がないという意味ではありません。':'版・学年と収録曲が一致する公式掲載情報は、現在掲載していません。教材で扱われていないという意味ではありません。')+'</p>';
 return '<ul class="plain reference-list">'+items.map(x=>'<li>'+(x.kind?'<small>'+escape(x.kind)+'</small><br>':'')+link(x.url,x.title)+'<p class="note">'+escape(x.detail)+'</p></li>').join('')+'</ul>';
}
function render(ref,type){
 if(type==='cm')return sources(ref.cms,'cm');
 if(type==='textbooks')return sources(ref.textbooks,'textbooks');
 const score=ref.score,q=encodeURIComponent(ref.query);
 return '<div class="reference-score"><h3>楽譜を読む・入手する</h3><p>'+escape(score.work)+'</p><div class="links">'+link(score.url,score.label,true)+'</div><p class="note">'+escape(score.note)+'</p>'+(score.kind==='catalog'?'<p class="note">IMSLPは作品別の資料一覧です。無料・利用自由を一律に保証するものではありません。各版の著作権表示と利用地域の条件を確認してください。</p>':'')+'</div><div class="reference-listen"><h3>別の演奏を探す</h3><div class="links">'+link('https://music.apple.com/jp/search?term='+q,'Apple Musicで作品を検索',true)+link('https://open.spotify.com/search/'+q,'Spotifyで作品を検索',true)+'</div><p class="note">作品名・作品番号による検索です。このサイトの再生音源と同じ録音への直リンクではありません。楽章・編曲・演奏者を選び直せます。再生にはサービス側のログイン・契約が必要な場合があります。</p></div>';
}
function apply(songs,data){for(const s of songs){const r=data[s.id];if(!r)throw new Error('Missing references: '+s.id);s.cms=r.cms.map(x=>[x.title,x.detail,x.url]);s.textbooks=r.textbooks.map(x=>[x.title,x.detail,x.url]);s.cmNote='';s._ix=null;}}
const api={escape,safeURL,link,render,apply};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.ClassicaReferenceSections=api;
})(typeof globalThis!=='undefined'?globalThis:this);
