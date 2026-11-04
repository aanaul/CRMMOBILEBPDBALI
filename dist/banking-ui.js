/* Presentation only. Existing event handlers, routes, and business data stay intact. */
(()=>{'use strict';if(document.body.dataset.mode!=='cms')return;
const paths={
 Monitoring:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
 Leads:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m20 0v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/><circle cx="9" cy="7" r="4"/>',
 'Customer 360':'<path d="M20 7h-9m9 5h-9m9 5h-9"/><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="7" cy="8" r="1"/><path d="M5.5 13h3M5.5 17h3"/>',
 Opportunity:'<path d="M3 3v18h18M7 14l4-4 4 3 6-8m-5 0h5v5"/>',
 Task:'<rect x="4" y="5" width="16" height="16" rx="2"/><path d="M8 3v4m8-4v4M4 11h16m-12 5 2 2 5-5"/>',
 Pengajuan:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8m-8 4h5"/>',
 Persetujuan:'<path d="m12 3 8 4v5c0 5-8 9-8 9s-8-4-8-9V7zM8 12l3 3 5-6"/>',
 Laporan:'<path d="M4 3h16v18H4zM8 17v-4m4 4V7m4 10v-7"/>',
 Notifikasi:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9m-11 12a2 2 0 0 0 4 0"/>',
 Pengaturan:'<path d="m9 3-1 3-3 1-2 4 2 2v3l4 2 1 3h4l1-3 3-1 2-4-2-2V8l-4-2-1-3z"/><circle cx="11" cy="12" r="3"/>',
 Member:'<circle cx="9" cy="8" r="4"/><path d="M2 21v-2a7 7 0 0 1 14 0v2m3-14v6m-3-3h6"/>',
 Absen:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 'Lokasi Tim':'<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
 search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 alert:'<path d="m12 3 10 18H2zM12 9v4m0 4h.01"/>',
 arrow:'<path d="M5 12h14m-5-5 5 5-5 5"/>'};
const icon=name=>'<svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">'+(paths[name]||paths.Monitoring)+'</svg>';
function decorateContent(){
 document.querySelectorAll('#app .metric').forEach((n,i)=>{if(n.querySelector('.ui-metric-icon'))return;const mark=document.createElement('span');mark.className='ui-metric-icon';mark.setAttribute('aria-hidden','true');mark.innerHTML=icon(['Opportunity','clock','alert','Persetujuan'][i%4]);n.append(mark)});
 document.querySelectorAll('#app .searchbox>span').forEach(n=>{if(!n.querySelector('svg'))n.innerHTML=icon('search')});
 document.querySelectorAll('#app .tag').forEach(n=>{const t=n.textContent.trim();if(/Over SLA|Overdue|Ditolak|Tidak Qualified/.test(t))n.classList.add('danger');else if(/Inactive|Ditutup|Cancelled|Tidak berlaku|Belum dinilai/.test(t))n.classList.add('ui-neutral');else if(/Qualified|Dalam proses|Dikerjakan/.test(t)&&!t.includes('Tidak'))n.classList.add('ui-info')});
}
function decorateShell(){
 document.querySelectorAll('#nav>button').forEach(n=>{if(n.querySelector('.ui-icon'))return;const label=n.textContent.trim();const span=document.createElement('span');span.className='ui-nav-label';while(n.firstChild)span.append(n.firstChild);n.append(span);n.insertAdjacentHTML('afterbegin',icon(label));});
 document.querySelector('#toast')?.setAttribute('role','status');
 const app=document.querySelector('#app');if(app)app.setAttribute('aria-label',document.querySelector('#title')?.textContent||'Workspace');
 decorateContent();
}
const priorContent=renderContent;renderContent=function(){const result=priorContent.apply(this,arguments);decorateContent();return result};
const priorRender=render;render=function(){const result=priorRender.apply(this,arguments);decorateShell();return result};
decorateShell();
})();
