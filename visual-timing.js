/* Visual-only scheduling and editorial media clock. No audio samples or scene changes. */
(function(root){
  'use strict';
  function create(options={}){
    const base=options.heavy?1:0, intervals=[1000/30,50,1000/15,100];
    let level=base, deadline=null, drawnAt=null, cost=null, slow=0, fast=0;
    let value=null, at=null, polled=null, sample=null, freshAt=null, rate=1, correction=0;
    function reset(){
      deadline=null;drawnAt=null;level=base;cost=null;slow=0;fast=0;
      value=null;at=null;polled=null;sample=null;freshAt=null;rate=1;correction=0;
    }
    function due(now,dirty=false){
      if(!Number.isFinite(now))return false;
      const interval=intervals[level];
      if(dirty||deadline===null){deadline=now+interval;drawnAt=now;return true;}
      if(now+.01<deadline)return false;
      // Keep fractional remainder, but never queue catch-up frames after a stall.
      deadline+=Math.max(1,Math.floor((now-deadline+.01)/interval)+1)*interval;
      drawnAt=now;return true;
    }
    function record(ms){
      if(!Number.isFinite(ms)||ms<0)return;
      cost=cost===null?ms:cost*.85+ms*.15;
      if(cost>intervals[level]*.8){slow++;fast=0;}else{slow=0;}
      if(slow>=3&&level<intervals.length-1){level++;deadline=drawnAt===null?null:drawnAt+intervals[level];slow=0;fast=0;}
      // Recovery is deliberately slower than load shedding; a transient GC is not permanent.
      if(level>base&&cost<intervals[level-1]*.65)fast++;else fast=0;
      if(fast>=60){level--;deadline=drawnAt===null?null:drawnAt+intervals[level];fast=0;slow=0;}
    }
    function time(now,fallback,active,read){
      if(!Number.isFinite(now))return value===null?fallback:value;
      const dt=at===null?0:Math.max(0,(now-at)/1000);at=now;
      if(value!==null&&active){
        const advance=dt*rate;
        // Do not run indefinitely beyond a stalled API clock.
        const allowed=freshAt===null?advance:Math.max(0,Math.min(advance,(freshAt+1500-now+dt*1000)/1000*rate));
        const adjust=Math.max(-allowed*.15,Math.min(allowed*.15,correction));
        value+=Math.max(0,allowed+adjust);correction-=adjust;
      }
      if(polled===null||now-polled>=250){
        polled=now;
        try{
          const reading=read?.();
          if(reading&&Number.isFinite(reading.time)&&reading.time>=0){
            const nextRate=Number.isFinite(reading.rate)&&reading.rate>0?reading.rate:1;
            const changed=sample===null||reading.time!==sample;
            const error=value===null?0:reading.time-value;
            const delta=sample===null?0:reading.time-sample;
            const expected=freshAt===null?0:Math.max(0,(now-freshAt)/1000)*rate;
            const seek=changed&&sample!==null&&(delta < -1.25||delta > expected+1.25);
            // Compare API samples, not accumulated interpolation error: a tiny stale update is not a seek.
            if(value===null||!active||nextRate!==rate||seek){value=reading.time;correction=0;}
            else if(changed)correction=error;
            if(changed||!active)freshAt=now;
            sample=reading.time;rate=nextRate;
          }
        }catch(_){} // Missing/failed API must not break the artwork.
      }
      return value===null?fallback:Math.max(0,value);
    }
    return {due,record,time,reset,interval:()=>intervals[level]};
  }
  const api={create,version:'20261026-timing1'};
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.ClassicaVisualTiming=api;
})(typeof window==='object'?window:globalThis);
