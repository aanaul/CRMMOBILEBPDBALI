/* One view selector and Kanban presentation across Leads, Opportunity and devices. */
const OPPORTUNITY_OUTCOME_CHIPS=[['Aktif','Aktif'],['Won','Berhasil (Won)'],['Lost','Lost'],['Cancelled','Cancelled'],['Semua','Semua']];
function opportunityOutcomeRows(){const old=listStatus;try{listStatus='Semua';return getList('Peluang')}finally{listStatus=old}}
function chooseOpportunityOutcome(status){if(!OPPORTUNITY_OUTCOME_CHIPS.some(([v])=>v===status))return;listStatus=status;stageFilter='';listPage=1;if(status!=='Aktif')listKind='Daftar';renderContent();if(typeof persistWorkspaceLocation==='function')persistWorkspaceLocation()}
function chooseCRMView(mode){if(view==='Leads'){leadPipelineMode(mode==='Pipeline'?'pipeline':'list');return}if(view!=='Peluang')return;listKind=mode;listPage=1;if(mode==='Pipeline'){listStatus='Aktif';stageFilter=''}renderContent();if(typeof persistWorkspaceLocation==='function')persistWorkspaceLocation()}
function crmPipelineSelector(){const current=view==='Leads'?(leadViewMode==='pipeline'?'Pipeline':'Daftar'):listKind;return '<div class="crm-view-switch" role="group" aria-label="Tampilan '+(view==='Leads'?'Leads':'Opportunity')+'">'+['Pipeline','Daftar'].map(mode=>'<button type="button" class="'+(current===mode?'active':'')+'" aria-pressed="'+(current===mode)+'" onclick="chooseCRMView(\''+mode+'\')">'+mode+'</button>').join('')+'</div>'}
function scrollLeadPipeline(direction){const board=document.querySelector('.lead-pipeline-board');if(!board)return;board.scrollBy({left:direction*Math.min(600,Math.max(260,board.clientWidth*.8)),behavior:typeof matchMedia==='function'&&matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})}
const pipelineUIListBefore=scaleList;
scaleList=function(){
 const html=pipelineUIListBefore();if(!['Leads','Peluang'].includes(view))return html;
 const root=document.createElement('div');root.innerHTML=html;
 root.querySelectorAll('.lead-view-switch,.viewtoggle,.crm-view-switch').forEach(el=>el.remove());
 const intro=root.querySelector('.intro');intro?.insertAdjacentHTML('afterend',crmPipelineSelector());
 if(view==='Peluang'){
  const selected=listStatus||'Aktif',rows=opportunityOutcomeRows();
  const chips='<div class="rangechips opportunity-outcome-chips" role="group" aria-label="Status opportunity">'+OPPORTUNITY_OUTCOME_CHIPS.map(([status,label])=>'<button type="button" class="'+(selected===status?'active':'')+'" aria-pressed="'+(selected===status)+'" onclick="chooseOpportunityOutcome(\''+status+'\')">'+label+'<b>'+rows.filter(o=>status==='Semua'||o.outcome===status).length+'</b></button>').join('')+'</div><p class="opportunity-outcome-note">'+(listKind==='Pipeline'?'Pipeline menampilkan opportunity aktif. Pilih Berhasil (Won), Lost, atau Cancelled untuk melihat hasil penutupan.':'Daftar '+E(OPPORTUNITY_OUTCOME_CHIPS.find(([v])=>v===selected)?.[1]||selected)+' sesuai pencarian dan filter. Klik kartu atau baris untuk membuka detail Opportunity.')+'</p>';
  root.querySelector('.crm-view-switch')?.insertAdjacentHTML('afterend',chips);
  root.querySelector('select[aria-label="Peluang aktif"]')?.remove();
 }
 const board=root.querySelector('.lead-pipeline-board');
 if(board){
  board.setAttribute('tabindex','0');board.setAttribute('role','region');board.setAttribute('aria-label','Pipeline Leads, geser horizontal untuk melihat seluruh tahap');
  board.insertAdjacentHTML('beforebegin','<div class="pipeline-scroll-tools"><p>Geser untuk melihat seluruh tahap. Scroll di area pipeline untuk melihat kartu lainnya.</p><div>'+btn('Geser kiri','scrollLeadPipeline(-1)')+btn('Geser kanan','scrollLeadPipeline(1)')+'</div></div>');
  root.querySelector('.lead-pipeline-mobile-stage')?.remove();
  const guide=root.querySelector('.lead-pipeline-guide');if(guide)guide.innerHTML='<p>Pipeline menunjukkan tahap Lead. Tahap penjualan dan nominal dikelola di Opportunity.</p>';
 }
 return root.innerHTML;
};
if(typeof authUser!=='undefined'&&authUser&&!choosingBranch)render();
