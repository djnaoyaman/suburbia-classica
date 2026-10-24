/* Shared WebGL surface for natural-motion studies. Legacy Realism stays independent. */
(() => {
  'use strict';
  let surface;
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
    }
  };
})();
