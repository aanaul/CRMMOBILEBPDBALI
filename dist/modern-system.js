/* Presentation-only glue: existing controls, values and business handlers stay intact. */
(function(){
 'use strict';
 document.documentElement.dataset.designSystem='bpd-light-v1';
 const parent={'Lead detail':'Leads','Nasabah detail':'Customer 360','Opportunity detail':'Opportunity','Aktivitas detail':'Task','Pengajuan detail':'Pengajuan'};
 const names={'Nasabah':'Customer 360','Peluang':'Opportunity','Agenda':'Task','Profil User':'Profil'};
 function decorate(){
  const app=document.querySelector('#app');if(!app)return;
  if(typeof authUser!=='undefined'&&authUser&&typeof view!=='undefined'&&!['Home','Profil User'].includes(view)&&!app.querySelector(':scope>.modern-breadcrumb')){
   const trail=document.createElement('div');trail.className='modern-breadcrumb';trail.setAttribute('aria-label','Lokasi halaman');
   const parts=['Workspace',...(parent[view]?[parent[view]]:[]),names[view]||view];
   parts.forEach((part,i)=>{if(i){const sep=document.createElement('span');sep.textContent='/';sep.setAttribute('aria-hidden','true');trail.append(sep)}const label=document.createElement(i===parts.length-1?'b':'span');label.textContent=part;if(i===0)label.className='modern-breadcrumb-context';trail.append(label)});
   app.prepend(trail);
  }
  document.querySelectorAll('#app button,#modal button,.crm-dialog-content button').forEach(button=>{const label=button.textContent.trim();if(/^(Keluar|Hapus(?:\s.+)?|Delete(?:\s.+)?)$/.test(label))button.dataset.modernTone='danger';});
 }
 const priorContent=renderContent;renderContent=function(){const result=priorContent.apply(this,arguments);decorate();return result};
 const priorRender=render;render=function(){const result=priorRender.apply(this,arguments);decorate();return result};
 const priorModal=modal;modal=function(){const result=priorModal.apply(this,arguments);decorate();return result};
 decorate();
})();
