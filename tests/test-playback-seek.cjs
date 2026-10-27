'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {create,formatTime}=require('../playback-seek.js');
let checks=0;const ok=(value,message)=>{assert(value,message);checks++;};
class Element{
  constructor(){this.events={};this.value='0';this.max='1';this.disabled=true;this.attributes={};this.textContent='';}
  addEventListener(type,fn){(this.events[type]??=[]).push(fn);}
  removeEventListener(type,fn){this.events[type]=(this.events[type]||[]).filter(f=>f!==fn);}
  setAttribute(name,value){this.attributes[name]=value;}
  setPointerCapture(){}
  emit(type,values={}){for(const fn of this.events[type]||[])fn({type,...values});}
}
function setup(){
  const controls=[0,1].map(()=>({range:new Element(),elapsed:new Element(),duration:new Element()}));
  const state={id:'a',duration:123,time:20,playerState:1,started:true,ready:true};
  const calls=[],player={getVideoUrl:()=> 'https://www.youtube.com/watch?v='+state.id,getDuration:()=>state.duration,getCurrentTime:()=>state.time,getPlayerState:()=>state.playerState,seekTo:(time,ahead)=>{calls.push([time,ahead]);state.time=time;},playVideo:()=>{throw Error('AUTOPLAY');},loadVideoById:()=>{throw Error('LOAD');}};
  let tick,cleared=false,videoId='a',seeks=0,keyboard=0;
  const controller=create({controls,read:()=>({player,ready:state.ready,started:state.started,videoId}),setInterval:fn=>(tick=fn,1),clearInterval:()=>cleared=true,onSeek:()=>seeks++,onKeyboard:()=>keyboard++});
  return {controls,state,calls,player,controller,tick:()=>tick(),track:id=>videoId=id,counts:()=>({seeks,keyboard,cleared})};
}
function drag(env,value,finish='pointerup'){
 const r=env.controls[0].range;r.emit('pointerdown',{pointerId:7,button:0});r.value=String(value);r.emit('input');r.emit('change');r.emit(finish,{pointerId:7});
}
ok(formatTime(0)==='0:00'&&formatTime(65.9)==='1:05'&&formatTime(NaN)==='0:00','time formatting');
{
 const e=setup();ok(e.controls.every(c=>c.range.disabled),'disabled until current video acknowledges');e.controller.refresh(true);ok(e.controls.every(c=>!c.range.disabled),'known playing media enabled');ok(e.controls[0].duration.textContent==='2:03','duration');
 drag(e,55);ok(e.calls.length===1&&e.calls[0][0]===55&&e.calls[0][1]===true,'pointer commits once on release, not change');ok(e.controls[1].range.value==='55','normal and fullscreen synchronize');ok(e.counts().seeks===1,'seek callback resets art clock');
 e.state.playerState=2;e.controller.refresh(true);drag(e,80);ok(e.state.playerState===2&&e.calls.at(-1)[0]===80,'paused seek stays paused without play call');
 drag(e,123);ok(e.calls.at(-1)[0]===122.9,'end target avoids ended/auto-next');drag(e,-7);ok(e.calls.at(-1)[0]===0,'lower bound clamp');
}
{
 const e=setup();e.controller.refresh(true);const r=e.controls[0].range;r.emit('pointerdown',{pointerId:2,button:0});r.value='90';r.emit('input');e.state.time=22;e.tick();ok(r.value==='90'&&e.controls[1].elapsed.textContent==='1:30','poll does not fight drag');r.emit('pointercancel',{pointerId:2});ok(e.calls.length===0&&r.value==='22','pointercancel restores actual position');r.emit('pointerup',{pointerId:2});r.emit('change');ok(e.calls.length===0,'cancel cannot later commit');
}
{
 const e=setup();e.controller.refresh(true);const r=e.controls[0].range;r.emit('pointerdown',{pointerId:3,button:0});r.value='80';r.emit('input');e.controller.reset();e.track('b');e.state.id='b';e.state.time=0;e.controller.refresh(true);r.value='80';r.emit('input');r.emit('pointerup',{pointerId:3});ok(e.calls.length===0,'old drag cannot seek new track');ok(e.controls[0].range.value==='0','new track resets position');
}
{
 const e=setup();e.controller.refresh(true);const r=e.controls[0].range;r.emit('keydown',{key:'ArrowRight'});r.value='25';r.emit('input');r.emit('change');ok(e.calls.at(-1)[0]===25&&e.counts().keyboard===1,'native keyboard change commits');
 r.emit('keydown',{key:'End'});r.value='123';r.emit('input');r.emit('change');ok(e.calls.at(-1)[0]===122.9,'keyboard End clamps');
 r.emit('keydown',{key:'ArrowLeft'});r.value='100';r.emit('input');r.emit('keydown',{key:'Escape'});r.emit('change');ok(e.calls.length===2,'Escape cancels keyboard preview');
}
for(const playerState of [-1,0,3,5]){
 const e=setup();e.state.playerState=playerState;e.controller.refresh(true);drag(e,50);ok(e.controls[0].range.disabled&&e.calls.length===0,'nonplaying/nonpaused state '+playerState+' cannot start audio');
}
for(const duration of [0,-1,NaN,Infinity,null]){
 const e=setup();e.state.duration=duration;e.controller.refresh(true);drag(e,50);ok(e.controls[0].range.disabled&&e.calls.length===0,'unknown/invalid duration disabled');
}
{
 const e=setup();e.state.started=false;e.controller.refresh(true);drag(e,20);ok(!e.calls.length&&e.controls[0].range.disabled,'initial visit never starts playback');e.state.started=true;e.state.id='old';e.controller.refresh(true);drag(e,50);ok(!e.calls.length&&e.controls[0].range.disabled,'stale iframe video cannot be seeked');
 e.player.getDuration=()=>{throw Error('not ready');};e.tick();ok(e.controls[0].range.disabled,'API error degrades to disabled');e.controller.destroy();ok(e.counts().cleared&&Object.values(e.controls[0].range.events).every(a=>!a.length),'cleanup removes timer and listeners');
}
const root=path.join(__dirname,'..'),html=fs.readFileSync(process.env.CLASSICA_SEEK_HTML||path.join(root,'index.html'),'utf8');
if(html.includes('id="playbackSeek"')){
 for(const id of ['playbackSeek','ssSeek'])ok(new RegExp('id="'+id+'" type="range"[^>]*disabled').test(html),id+' native range starts disabled');
 ok(html.includes("querySelectorAll('button,input')")&&html.includes("querySelectorAll('button:not([disabled]),input:not([disabled])')"),'fullscreen inert/focus trap includes seek control');
 ok(html.includes('seekControls.refresh(true)')&&html.includes('seekControls.reset();'),'state and track changes connected');
 for(const match of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g))if(match[1].trim()&&!match[0].includes('application/ld+json'))new vm.Script(match[1]);
}else if(!process.env.CLASSICA_SEEK_UNIT_ONLY){throw Error('Seek integration missing: use CLASSICA_SEEK_HTML for pre-merge patch validation');}
const css=fs.readFileSync(path.join(root,'playback-seek.css'),'utf8');ok(css.includes('height:44px')&&css.includes('focus-visible')&&css.includes('ui-hidden .ss-seek'),'touch size, focus and auto-hide');
console.log(JSON.stringify({pass:true,checks,audio:'mocked IFrame API; no live playback claim'}));
