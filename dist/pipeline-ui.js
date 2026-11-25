/* One view selector and Kanban presentation across Leads, Opportunity and devices. */
const OPPORTUNITY_OUTCOME_CHIPS=[['Semua','Semua'],['Aktif','Aktif'],['Won','Berhasil (Won)'],['Lost','Lost'],['Cancelled','Cancelled']];
function opportunityOutcomeRows(){const old=listStatus,oldStage=stageFilter;try{listStatus='Semua';stageFilter='';return getList('Peluang')}finally{listStatus=old;stageFilter=oldStage}}
function chooseOpportunityOutcome(status){if(!OPPORTUNITY_OUTCOME_CHIPS.some(([v])=>v===status))return;listStatus=status;stageFilter='';listPage=1;renderContent();if(typeof persistWorkspaceLocation==='function')persistWorkspaceLocation()}
function opportunityStageChips(){return stageDefs().filter(s=>s.active!==false&&s.type==='process')}
function chooseOpportunityStage(id){const stage=opportunityStageChips().find(s=>s.id===id);if(!stage)return;listStatus='Aktif';stageFilter=stage.name;listPage=1;renderContent();if(typeof persistWorkspaceLocation==='function')persistWorkspaceLocation()}
function opportunityFilterChips(rows){
 const selected=listStatus||'Semua',escape=E;
 const button=(label,count,active,action)=>'<button type="button" class="'+(active?'active':'')+'" aria-pressed="'+active+'" onclick="'+escape(action)+'">'+escape(label)+'<b>'+count+'</b></button>';
 const outcome=status=>{const pair=OPPORTUNITY_OUTCOME_CHIPS.find(([v])=>v===status);return button(pair[1],rows.filter(o=>status==='Semua'||o.outcome===status).length,!stageFilter&&selected===status,'chooseOpportunityOutcome('+JSON.stringify(status)+')')};
 return '<div class="rangechips opportunity-outcome-chips" role="group" aria-label="Tahap dan status Opportunity">'+outcome('Semua')+outcome('Aktif')+opportunityStageChips().map(s=>button(s.name,rows.filter(o=>o.outcome==='Aktif'&&o.stage===s.name).length,stageFilter===s.name&&['Aktif','Semua'].includes(selected),'chooseOpportunityStage('+JSON.stringify(s.id)+')')).join('')+['Won','Lost','Cancelled'].map(outcome).join('')+'</div>';
}
function chooseCRMView(mode){if(view==='Leads'){leadPipelineMode(mode==='Pipeline'?'pipeline':'list');return}if(view!=='Peluang')return;listKind=mode;listPage=1;if(mode==='Pipeline'){listStatus='Semua';stageFilter=''}renderContent();if(typeof persistWorkspaceLocation==='function')persistWorkspaceLocation()}
function crmPipelineSelector(){const current=view==='Leads'?(leadViewMode==='pipeline'?'Pipeline':'Daftar'):listKind;return '<div class="crm-view-switch" role="group" aria-label="Tampilan '+(view==='Leads'?'Leads':'Opportunity')+'">'+['Pipeline','Daftar'].map(mode=>'<button type="button" class="'+(current===mode?'active':'')+'" aria-pressed="'+(current===mode)+'" onclick="chooseCRMView(\''+mode+'\')">'+mode+'</button>').join('')+'</div>'}
function scrollLeadPipeline(direction){const board=document.querySelector('.lead-pipeline-board');if(!board)return;board.scrollBy({left:direction*Math.min(600,Math.max(260,board.clientWidth*.8)),behavior:typeof matchMedia==='function'&&matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})}
function openOpportunityPipelineColumn(status,stage){listStatus=status;stageFilter=stage||'';listKind='Daftar';listPage=1;renderContent();if(typeof persistWorkspaceLocation==='function')persistWorkspaceLocation()}
denseBoard=function(items){
 const columns=stages.map(stage=>({label:stage,status:'Aktif',stage,rows:items.filter(o=>o.outcome==='Aktif'&&o.stage===stage)})).concat([['Won','Berhasil (Won)'],['Lost','Lost'],['Cancelled','Cancelled']].map(([status,label])=>({label,status,stage:'',rows:items.filter(o=>o.outcome===status)})));
 return '<section class="opportunity-pipeline"><div class="pipeline-scroll-tools"><p>Tahap aktif dan hasil penutupan ada dalam satu pipeline. Geser untuk melihat seluruh kolom.</p><div>'+btn('Geser kiri','scrollOpportunityPipeline(-1)')+btn('Geser kanan','scrollOpportunityPipeline(1)')+'</div></div><div class="board" tabindex="0" role="region" aria-label="Pipeline Opportunity termasuk Berhasil, Lost, dan Cancelled">'+columns.map(c=>'<section class="column" data-stage="'+E(c.stage)+'" data-outcome="'+E(c.status)+'"><div class="columnhead"><b>'+E(c.label)+'</b><span>'+c.rows.length+'</span></div><div class="stagetotal">'+rup(c.rows.reduce((sum,o)=>sum+(Number(o.value)||0),0))+'</div>'+c.rows.slice(0,5).map(oppCard).join('')+(!c.rows.length?'<p class="pipeline-column-empty">Tidak ada opportunity sesuai filter.</p>':'')+(c.rows.length>5?btn('Lihat semua '+c.rows.length,'openOpportunityPipelineColumn('+JSON.stringify(c.status)+','+JSON.stringify(c.stage)+')'):'')+'</section>').join('')+'</div></section><p class="hint">Nominal adalah nilai opportunity sesuai filter, bukan pengakuan pendapatan. Kolom hasil penutupan mengikuti status Won, Lost, atau Cancelled.</p>';
};
const pipelineUIListBefore=scaleList;
scaleList=function(){
 if(view==='Peluang'&&!listStatus)listStatus='Semua';
 const html=pipelineUIListBefore();if(!['Leads','Peluang'].includes(view))return html;
 const root=document.createElement('div');root.innerHTML=html;
 root.querySelectorAll('.lead-view-switch,.viewtoggle,.crm-view-switch').forEach(el=>el.remove());
 const intro=root.querySelector('.intro');intro?.insertAdjacentHTML('afterend',crmPipelineSelector());
 if(view==='Peluang'){
  const selected=listStatus||'Aktif',rows=opportunityOutcomeRows();
  const chips=opportunityFilterChips(rows)+'<p class="opportunity-outcome-note">'+(listKind==='Pipeline'?'Pilih tahap untuk screening. Semua menampilkan seluruh tahap aktif serta Berhasil (Won), Lost, dan Cancelled.':'Pilih tahap atau status untuk menyaring daftar. Klik kartu atau baris untuk membuka detail Opportunity.')+'</p>';
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
