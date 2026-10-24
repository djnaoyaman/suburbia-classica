/* Photo artwork with procedural ambient motion, not generated video footage.
 * Original artwork and the existing Realism catalog remain independent.
 */
(() => {
  'use strict';
  const fallback=window.ClassicaRealism;
  const catalog={
    'fur-elise':{src:'assets/realism/fur-elise.webp',effect:'light',description:'窓辺の手紙と一輪の花 — 写真アートと光のループ演出'},
    'moonlight':{src:'assets/realism/moonlight.webp',effect:'water',description:'月明かりの湖 — 写真アートと水面のループ演出'},
    'tristesse':{src:'assets/realism/tristesse.webp',effect:'mist',description:'夕暮れの湖 — 写真アートと霞のループ演出'},
    'fantaisie-impromptu':{src:'assets/realism/fantaisie-impromptu.webp',effect:'flow',waterStart:.64,description:'岩間の渓流 — 写真アートと流れる光のループ演出'}
  };
  const images=new Map();
  function getImage(id){
    if(!images.has(id)){
      const image=new Image();image.decoding='async';
      const record={image,failed:false};
      const notify=()=>window.dispatchEvent(new Event('classica-art-ready'));
      image.onload=notify;image.onerror=()=>{record.failed=true;notify();};
      if(images.size>=2)images.delete(images.keys().next().value);
      image.src=catalog[id].src;images.set(id,record);
    }
    return images.get(id);
  }
  function photoDraw(c,w,h,t,st){
    const {image,failed}=getImage(st.id),spec=catalog[st.id];
    if(failed)return false;
    c.save();c.globalAlpha=1;c.globalCompositeOperation='source-over';
    c.fillStyle='#111717';c.fillRect(0,0,w,h);
    if(!image.complete||!image.naturalWidth){
      c.fillStyle='#f3ece0';c.font='14px sans-serif';c.textAlign='center';
      c.fillText('写真アートを読み込み中…',w/2,h/2);c.restore();return true;
    }
    // The foreground always contains the complete artwork, in every orientation.
    const fit=Math.min(w/image.naturalWidth,h/image.naturalHeight);
    const iw=image.naturalWidth*fit,ih=image.naturalHeight*fit,x=(w-iw)/2,y=(h-ih)/2;
    if(!st.base||st.base.width!==w||st.base.height!==h){
      const base=document.createElement('canvas');base.width=w;base.height=h;
      const bg=base.getContext('2d');bg.fillStyle='#111717';bg.fillRect(0,0,w,h);
      bg.globalAlpha=.3;bg.filter='blur(24px)';
      const fill=Math.max(w/image.naturalWidth,h/image.naturalHeight);
      bg.drawImage(image,(w-image.naturalWidth*fill)/2,(h-image.naturalHeight*fill)/2,image.naturalWidth*fill,image.naturalHeight*fill);
      bg.filter='none';bg.globalAlpha=1;bg.drawImage(image,x,y,iw,ih);st.base=base;
    }
    c.drawImage(st.base,0,0);
    c.beginPath();c.rect(x,y,iw,ih);c.clip();
    const phase=(t%18)/18*Math.PI*2;
    if(spec.effect==='light'||spec.effect==='mist'){
      const warm=spec.effect==='light',cx=x+iw*(.45+.06*Math.sin(phase)),cy=y+ih*.38;
      const light=c.createRadialGradient(cx,cy,0,cx,cy,iw*.7);
      light.addColorStop(0,warm?'rgba(255,231,184,.10)':'rgba(245,218,191,.07)');light.addColorStop(1,'rgba(255,255,255,0)');
      c.fillStyle=light;c.fillRect(x,y,iw,ih);
    }else{
      // Subtle glints over water; source objects are never warped or cropped.
      const waterStart=spec.waterStart||.53;
      c.beginPath();c.rect(x,y+ih*waterStart,iw,ih*(1-waterStart));c.clip();
      for(let k=0;k<12;k++){
        const yy=y+ih*(waterStart+.02+k*(.96-waterStart)/12),xx=x+iw*(.5+.08*Math.sin(phase+k*.7));
        c.strokeStyle=`rgba(235,244,255,${.025+.02*(1+Math.sin(phase+k))})`;
        c.lineWidth=Math.max(1,ih*.0014);c.beginPath();
        c.ellipse(xx,yy,iw*(.018+k*.006),ih*.0025,0,0,Math.PI*2);c.stroke();
      }
    }
    c.restore();return true;
  }
  window.ClassicaRealism={
    has:id=>!!catalog[id]||!!fallback?.has(id),
    describe:id=>catalog[id]?.description||fallback?.describe(id)||'',
    list:()=>fallback.list().map(item=>catalog[item.id]?{...item,description:catalog[item.id].description,kind:'photo-motion'}:item),
    available:id=>catalog[id]?!getImage(id).failed:!!fallback?.available(id),
    init:id=>catalog[id]?{id,photo:true}:fallback.init(id),
    draw:(c,w,h,t,st)=>st.photo?photoDraw(c,w,h,t,st):fallback.draw(c,w,h,t,st)
  };
})();
