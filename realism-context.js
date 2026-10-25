/* Shared surface and bounded active/recent scene-material lifecycle. */
(() => {
  'use strict';
  let surface,current=null,serial=0,running=0;
  const entries=new Map(),queue=[],inactive=Object.freeze({state:'inactive',value:null});
  function pump(){
    while(running<2&&queue.length){
      const preferred=queue.findIndex(job=>job.id===current);
      const job=queue.splice(preferred<0?0:preferred,1)[0];
      if(job.cancelled)continue;
      job.running=true;running++;
      let finished=false;
      job.finish=()=>{if(finished)return;finished=true;job.running=false;running--;pump();};
      job.start(job.finish);
    }
  }
  function cancel(job){
    if(!job||job.cancelled)return;job.cancelled=true;
    if(job.running){if(job.abort)job.abort();}
    else {const i=queue.indexOf(job);if(i>=0)queue.splice(i,1);}
  }
  function evict(entry){
    entries.delete(entry.id);entry.epoch++;
    for(const record of entry.materials.values()){
      record.value=null;record.state='released';cancel(record.job);
    }
    entry.materials.clear();
    for(const release of entry.releases)release();
    entry.releases.clear();
  }
  function touch(id,release){
    if(id!==current)return null;
    let entry=entries.get(id);
    if(!entry){entry={id,epoch:++serial,materials:new Map(),releases:new Set()};entries.set(id,entry);}
    else {entries.delete(id);entries.set(id,entry);}
    if(release)entry.releases.add(release);
    while(entries.size>2){const old=[...entries.values()].find(e=>e.id!==current);if(!old)break;evict(old);}
    return entry;
  }
  window.ClassicaNatureGL={
    acquire(){
      if(surface===undefined){
        const canvas=document.createElement('canvas');
        try{
          const gl=canvas.getContext('webgl',{alpha:false,antialias:false,depth:false,powerPreference:'low-power'});
          if(gl)canvas.addEventListener('webglcontextlost',event=>event.preventDefault());
          surface=gl?{canvas,gl}:null;
        }catch(error){surface=null;}
      }
      return surface;
    },
    activate(id){
      current=typeof id==='string'?id:null;
      const entry=entries.get(current);if(entry){entries.delete(current);entries.set(current,entry);}
      pump();
    },
    material(id,url,announce,release){
      const entry=touch(id,release);if(!entry)return inactive;
      if(entry.materials.has(url))return entry.materials.get(url);
      const epoch=entry.epoch,record={state:'queued',value:null,job:null};
      entry.materials.set(url,record);
      const valid=()=>entries.get(id)===entry&&entry.epoch===epoch&&entry.materials.get(url)===record;
      const job=record.job={id,cancelled:false,running:false,abort:null,start(finish){
        if(!valid()){finish();return;}
        record.state='loading';let img=new Image(),decoding=false;
        img.decoding='async';
        const detach=()=>{if(img){img.onload=null;img.onerror=null;}};
        const complete=ok=>{
          if(valid()&&!job.cancelled){record.state=ok?'ready':'failed';record.value=ok?img:null;}
          detach();img=null;finish();
          if(valid()&&!job.cancelled&&id===current)announce();
        };
        job.abort=()=>{
          detach();
          // decode promises are not abortable: retain their slot until they settle.
          if(!decoding){if(img)img.src='';img=null;finish();}
        };
        img.onerror=()=>{if(!valid()||job.cancelled){detach();img=null;finish();return;}complete(false);};
        img.onload=()=>{
          if(!valid()||job.cancelled){detach();img=null;finish();return;}
          decoding=true;
          try{
            if(typeof img.decode==='function')Promise.resolve(img.decode()).then(()=>complete(true),()=>complete(false));
            else complete(true);
          }catch(error){complete(false);}
        };
        img.src=url;
      }};
      queue.push(job);pump();return record;
    },
    // Non-visitor-facing diagnostics: references/slots, not physical RAM estimates.
    materialState(){return {active:current,retained:[...entries.keys()],materials:[...entries.values()].map(e=>({id:e.id,count:e.materials.size,states:[...e.materials.values()].map(r=>r.state)})),running,queued:queue.length};}
  };
})();
