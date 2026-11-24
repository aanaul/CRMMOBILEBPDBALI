/* Presentation only: keep the original controls and their event handlers. */
(function(){
 'use strict';
 if(document.body.dataset.mode!=='mobile')return;
 const filterState=new Map();
 let queued=false;
 function tidy(){
  queued=false;
  const header=document.querySelector('main>header');
  if(header){
   const extras=Array.from(header.querySelectorAll('#journeyLaunch,#tourLaunch,#escHeader'));
   if(extras.length){
    let options=header.querySelector('.mobile-header-options');
    if(!options){options=document.createElement('details');options.className='mobile-header-options';const summary=document.createElement('summary');summary.textContent='Opsi';options.append(summary);const menu=document.createElement('div');menu.className='mobile-header-menu';options.append(menu);header.append(options);options.addEventListener('click',e=>{if(e.target.closest('button'))options.open=false})}
    const menu=options.querySelector('.mobile-header-menu');
    extras.forEach(el=>{if(el.parentElement!==menu)menu.append(el)});
    if(extras.some(el=>el.classList.contains('tourhighlight')))options.open=true;
   }
  }
  document.querySelectorAll('#app .scaletools>.filterline').forEach(line=>{
   const key=String(typeof view==='undefined'?'list':view);
   const details=document.createElement('details');details.className='mobile-filter-options';
   const summary=document.createElement('summary');summary.textContent='Filter lanjutan';
   details.open=filterState.get(key)||false;
   line.before(details);details.append(summary,line);
   details.addEventListener('toggle',()=>filterState.set(key,details.open));
  });
  document.querySelectorAll('#nav button').forEach(button=>{
   const label=button.querySelector('span');if(label&&label.textContent==='Customer 360')button.setAttribute('aria-label','Customer 360');
  });
 }
 const observer=new MutationObserver(()=>{if(!queued){queued=true;queueMicrotask(tidy)}});
 observer.observe(document.body,{childList:true,subtree:true});
 document.addEventListener('click',e=>{const open=document.querySelector('.mobile-header-options[open]');if(open&&!open.contains(e.target))open.open=false});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){const open=document.querySelector('.mobile-header-options[open]');if(open)open.open=false}});
 tidy();
})();
