/* Shared, gesture-only playback position controls. YouTube IFrame API seekTo()
 * preserves pause only in PAUSED state, so cued/ended/buffering states are inert.
 * No player loads, playback starts, storage, network requests or track navigation.
 */
(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.ClassicaSeek=api;
})(typeof window!=='undefined'?window:globalThis,function(){
  'use strict';
  const clamp=(value,min,max)=>Math.min(max,Math.max(min,value));
  function formatTime(seconds){
    const n=Math.floor(Math.max(0,Number.isFinite(seconds)?seconds:0));
    return Math.floor(n/60)+':'+String(n%60).padStart(2,'0');
  }
  function create(options){
    const controls=options.controls||[];
    let generation=0,acknowledged=false,active=null,destroyed=false;
    const blocked=new Set(),listeners=[];
    function sample(){
      try{
        const context=options.read(),p=context.player;
        if(!context.ready||!p||!context.videoId)return {enabled:false,time:0,duration:0};
        const matches=new URL(p.getVideoUrl()).searchParams.get('v')===context.videoId;
        const rawDuration=p.getDuration(),duration=matches&&Number.isFinite(rawDuration)&&rawDuration>0?rawDuration:0;
        const rawTime=p.getCurrentTime(),time=matches&&Number.isFinite(rawTime)?clamp(rawTime,0,duration):0;
        const state=p.getPlayerState();
        return {player:p,id:context.videoId,matches,state,duration,time,
          enabled:!!(acknowledged&&context.started&&matches&&duration>0&&(state===1||state===2))};
      }catch(_){return {enabled:false,time:0,duration:0};}
    }
    function render(s,preview){
      const time=Number.isFinite(preview)?preview:s.time;
      controls.forEach(control=>{
        const range=control.range;
        range.disabled=!s.enabled;
        range.max=String(s.duration||1);
        range.value=String(clamp(time,0,s.duration||0));
        range.setAttribute('aria-valuetext',s.duration?formatTime(time)+' / '+formatTime(s.duration):'再生後に操作できます');
        control.elapsed.textContent=formatTime(time);
        control.duration.textContent=s.duration?formatTime(s.duration):'--:--';
      });
    }
    function refresh(confirmState){
      if(destroyed)return;
      let s=sample();
      if(confirmState&&s.matches&&[1,2,5].includes(s.state)){acknowledged=true;s=sample();}
      if(active&&(!s.enabled||active.generation!==generation||active.id!==s.id))cancel();
      render(s,active?.value);
    }
    function begin(control,pointerId){
      const s=sample();
      if(!s.enabled||blocked.has(control))return false;
      active={control,pointerId,generation,id:s.id,value:s.time};
      return true;
    }
    function preview(control){
      if(blocked.has(control)){render(sample());return;}
      if(!active&&!begin(control,null))return;
      if(active.control!==control)return;
      const value=Number(control.range.value),s=sample();
      if(!Number.isFinite(value)||!s.enabled){cancel();return;}
      active.value=clamp(value,0,s.duration);
      active.changed=true;
      render(s,active.value);
    }
    function cancel(){
      if(active&&active.pointerId!==null)blocked.add(active.control);
      active=null;
      render(sample());
    }
    function commit(control){
      const draft=active,s=sample();
      active=null;
      if(!draft||draft.control!==control||!draft.changed||draft.generation!==generation||draft.id!==s.id||!s.enabled){render(s);return;}
      // Do not hit ENDED and accidentally advance the existing auto-next queue.
      const target=clamp(draft.value,0,Math.max(0,s.duration-.1));
      try{
        s.player.seekTo(target,true);
        if(options.onSeek)options.onSeek(target);
        render(s,target);
      }catch(_){render(sample());}
    }
    function listen(element,type,fn){element.addEventListener(type,fn);listeners.push(()=>element.removeEventListener(type,fn));}
    controls.forEach(control=>{
      const range=control.range;
      listen(range,'pointerdown',e=>{
        blocked.delete(control);
        if(e.button!==undefined&&e.button!==0)return;
        if(begin(control,e.pointerId)){
          try{range.setPointerCapture(e.pointerId);}catch(_){}
        }
      });
      listen(range,'input',()=>preview(control));
      listen(range,'change',()=>{
        // Native pointer changes may arrive before pointerup; release commits once.
        if(active?.pointerId!==null)return;
        if(!blocked.has(control))commit(control);
      });
      listen(range,'pointerup',e=>{
        if(active?.control===control&&active.pointerId===e.pointerId)commit(control);
        blocked.delete(control);
      });
      listen(range,'pointercancel',()=>{cancel();blocked.delete(control);});
      listen(range,'lostpointercapture',()=>{if(active?.control===control)cancel();blocked.delete(control);});
      listen(range,'keydown',e=>{
        if(e.key==='Escape'){cancel();return;}
        if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End','PageUp','PageDown'].includes(e.key)){
          blocked.delete(control);
          if(!active)begin(control,null);
          if(options.onKeyboard)options.onKeyboard();
        }
      });
      listen(range,'blur',()=>{if(active?.control===control)cancel();blocked.delete(control);});
    });
    const schedule=options.setInterval||setInterval,clear=options.clearInterval||clearInterval;
    const timer=schedule(()=>refresh(),250);
    refresh();
    return {
      refresh,
      reset(){generation++;acknowledged=false;cancel();refresh();},
      cancel,
      destroy(){destroyed=true;clear(timer);listeners.forEach(remove=>remove());active=null;blocked.clear();}
    };
  }
  return {create,formatTime};
});
