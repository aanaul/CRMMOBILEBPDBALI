/* Common interaction contract for CMS and mobile; no changes to stored business records. */
function workflowOpportunityRows(rows){const query=String(listQuery||'').toLowerCase(),outcome=listStatus||'Aktif';return rows.filter(o=>mine(o)&&(!listOwner||o.owner===listOwner)&&(!query||[o.name,pname(o.profile),o.id,o.product].join(' ').toLowerCase().includes(query))&&(!listProduct||o.product===listProduct)&&(outcome==='Semua'||o.outcome===outcome)&&(!stageFilter||o.stage===stageFilter)&&(!listPeriod||String(o.created||'').startsWith(listPeriod))&&(typeof dateRecordMatches!=='function'||dateRecordMatches('Peluang',o))).sort((a,b)=>Number(overSla(b))-Number(overSla(a))||String(a.id).localeCompare(String(b.id)))}
const workflowListBefore=getList;
getList=function(name=view){return name==='Peluang'?workflowOpportunityRows(db.opps):workflowListBefore(name)};
function workflowStageFilter(value){stageFilter=value;const type=stageDefs().find(s=>s.name===value)?.type;if(type&&type!=='process')listStatus=({won:'Won',lost:'Lost',cancelled:'Cancelled'})[type]||'Semua';else if(value)listStatus='Aktif';listPage=1;renderContent();persistWorkspaceLocation()}
function workflowTaskParty(t){
 const p=profile(t.profile),o=t.opp?opp(t.opp):null,lid=t.lead||o?.lead||o?.sourceLead;
 if(lid){const l=db.leads.find(l=>l.id===lid&&l.profile===t.profile);return {label:'Buka Lead',route:'Lead detail',id:lid,accessible:!!l&&mine(l)}}
 if(p?.relation==='Customer')return {label:'Customer 360',route:'Nasabah detail',id:p.id,accessible:mine(p)&&!p.readOnly};
 const l=db.leads.find(l=>l.profile===t.profile&&mine(l));return l?{label:'Buka Lead',route:'Lead detail',id:l.id,accessible:true}:null;
}
function workflowRevealOutcome(){const board=document.querySelector('.opportunity-pipeline>.board'),column=board?.querySelector('[data-outcome="'+listStatus+'"]');if(board&&column)board.scrollTo({left:board.scrollLeft+column.getBoundingClientRect().left-board.getBoundingClientRect().left-2,behavior:'instant'})}
function workflowDecorate(){
 const app=document.querySelector('#app');if(!app)return;
 if(view==='Peluang'){const select=app.querySelector('select[aria-label="Tahap peluang"]');if(select){const first=select.querySelector('option[value=""]');if(first)first.textContent='Semua tahap';select.setAttribute('onchange','workflowStageFilter(this.value)')}if(listKind==='Pipeline'&&['Won','Lost','Cancelled'].includes(listStatus))requestAnimationFrame(workflowRevealOutcome)}
 if(view==='Aktivitas detail'){
  const t=task(focus);if(t&&mine(t)){const party=workflowTaskParty(t);app.querySelectorAll('button[onclick]').forEach(button=>{if(!/go\(['"]Nasabah detail['"]/.test(button.getAttribute('onclick')||''))return;if(!party){button.hidden=true;return}button.textContent=party.accessible?party.label:'Relasi di luar akses';button.disabled=!party.accessible;if(party.accessible)button.setAttribute('onclick','go('+JSON.stringify(party.route)+','+JSON.stringify(party.id)+')')});}
 }
 app.querySelectorAll('button').forEach(button=>{const text=button.textContent.trim();const labels={'Reschedule':'Ubah jadwal','Reassign':'Alihkan AO','Batalkan aktivitas':'Batalkan Task','Catat Hasil':'Catat hasil'};const label=labels[text]||(text.includes('Kembali ke hasil Agenda')?text.replace('hasil Agenda','hasil Task'):null);if(label&&text!==label)button.textContent=label});
 app.querySelectorAll('article.record').forEach(card=>{const context=card.querySelector('.contextline>span:last-child'),name=card.querySelector('p');if(context&&name&&context.textContent.trim()===name.textContent.trim())context.hidden=true});
 app.querySelectorAll('.pagination button').forEach(button=>{if(!button.getAttribute('aria-label'))button.setAttribute('aria-label',button.textContent.trim()==='‹'?'Halaman sebelumnya':'Halaman berikutnya')});
 app.querySelectorAll('.c360-list-guide').forEach(guide=>{if(guide.parentElement?.classList.contains('workflow-guide'))return;const details=document.createElement('details');details.className='workflow-guide';const summary=document.createElement('summary');summary.textContent='Panduan Customer 360 & Cross-sell';guide.before(details);details.append(summary,guide);const intro=app.querySelector(':scope>.intro');if(intro)intro.after(details)});
 app.querySelectorAll('#form input[name="phone"],#form input[name="telephone"]').forEach(input=>{input.type='tel';input.setAttribute('inputmode','tel');input.setAttribute('autocomplete','tel')});
}
const workflowContentBefore=renderContent;
renderContent=function(){const result=workflowContentBefore.apply(this,arguments);workflowDecorate();return result};
const workflowModalBefore=modal;
modal=function(){const result=workflowModalBefore.apply(this,arguments);workflowDecorate();return result};
const workflowGoBefore=go;
go=function(route,id=''){const oldView=view,oldFocus=focus,result=workflowGoBefore.apply(this,arguments);if(!workspaceLocationRestoring&&(view!==oldView||focus!==oldFocus)){const main=document.querySelector('main');if(main)main.scrollTo({top:0,left:0,behavior:'instant'});window.scrollTo({top:0,left:0,behavior:'instant'});if(typeof persistWorkspaceLocation==='function')persistWorkspaceLocation()}return result};
if(typeof authUser!=='undefined'&&authUser&&!choosingBranch)render();
