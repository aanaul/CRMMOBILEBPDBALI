/* Compact working lists: rearrange existing controls without changing their filters or data. */
const compactFilterOpen={};
function compactListKey(){return (typeof authUser!=='undefined'?authUser?.id||'demo':'demo')+':'+(typeof activeBranch!=='undefined'?activeBranch:'')+':'+view}
function compactPeriodChanged(value){if(value==='custom'){const select=document.querySelector('.compact-period select');if(select)select.value=dateFilterState(view).preset;window.BPDDesignRuntime?.refresh();return dateFilterCustom(view)}dateFilterSet(view,value)}
function compactFilterCount(root){return [...root.querySelectorAll('select,input')].filter(el=>el.tagName==='SELECT'?el.selectedIndex>0:!['button','hidden','checkbox','radio'].includes(el.type)&&!!el.value).length}
function compactListDecorate(){
 const app=document.querySelector('#app');if(!app)return;
 if(!['Leads','Nasabah','Peluang','Agenda'].includes(view)){app.classList.remove('compact-list');return;}
 const intro=app.querySelector(':scope>.intro'),tools=app.querySelector('.scaletools');if(!intro||!tools||tools.dataset.compactReady)return;
 app.classList.add('compact-list');tools.dataset.compactReady='true';const key=compactListKey();
 const headingActions=intro.querySelector('.actions')||intro.appendChild(document.createElement('div'));headingActions.classList.add('actions','compact-heading-actions');
 const switcher=app.querySelector(':scope>.crm-view-switch');if(switcher)headingActions.prepend(switcher);
 let guide=app.querySelector(':scope>.workflow-guide,:scope>.bank-stage-overview');
 if(!guide){guide=document.createElement('details');guide.innerHTML='<summary>Panduan</summary>';}
 guide.classList.add('compact-guide');guide.classList.remove('panel');const summary=guide.querySelector(':scope>summary');if(summary){summary.setAttribute('aria-label',summary.textContent.trim());summary.title=summary.textContent.trim();summary.textContent='Panduan';}
 const help=document.createElement('div');help.className='compact-guide-content';[...guide.children].filter(el=>el!==summary).forEach(el=>help.append(el));guide.append(help);
 app.querySelectorAll(':scope>.opportunity-outcome-note,:scope>.lead-pipeline-guide').forEach(el=>help.append(el));
 const scrollTools=app.querySelector('.pipeline-scroll-tools'),listhead=app.querySelector(':scope>.listhead');
 if(scrollTools&&listhead){const text=scrollTools.querySelector('p');if(text)help.append(text);const buttons=scrollTools.querySelector('div');if(buttons){buttons.classList.add('compact-scroll-actions');listhead.append(buttons)}scrollTools.remove();}
 if(help.children.length)headingActions.append(guide);
 const chips=[...app.querySelectorAll(':scope>.rangechips')];if(chips.length){const statuses=document.createElement('section');statuses.className='compact-statusbar';statuses.setAttribute('aria-label','Filter status dan tahap');intro.after(statuses);chips.forEach(el=>statuses.append(el));}
 const search=tools.querySelector('.searchbox'),line=tools.querySelector('.filterline'),date=app.querySelector('.date-filter-bar');
 const toolbar=document.createElement('div');toolbar.className='compact-toolbar';if(search)toolbar.append(search);
 if(typeof dateFilterState==='function'){
  const state=dateFilterState(view),bounds=dateFilterBounds(state),period=document.createElement('label');period.className='compact-period';period.innerHTML='<span class="compact-sr-only">Periode</span><select aria-label="Periode daftar" onchange="compactPeriodChanged(this.value)">'+[['all','Semua tanggal'],['week','Minggu ini'],['month','Bulan ini'],['custom',bounds&&state.preset==='custom'?bounds.start+' – '+bounds.end:'Kustom…']].map(([value,label])=>'<option value="'+value+'" '+(state.preset===value?'selected':'')+'>'+E(label)+'</option>').join('')+'</select>';period.title=date?.querySelector('.date-filter-heading small')?.textContent||'Tanggal mengikuti konteks daftar · WITA';toolbar.append(period);
 }
 const advanced=document.createElement('details');advanced.className='compact-advanced';advanced.open=!!compactFilterOpen[key];advanced.ontoggle=()=>{compactFilterOpen[key]=advanced.open};advanced.innerHTML='<summary>Filter lainnya</summary><div class="compact-advanced-body"></div>';const advancedBody=advanced.lastElementChild;
 const reset=line?[...line.querySelectorAll('button')].find(b=>/Reset filter/i.test(b.textContent)):null;if(reset){reset.textContent='Reset';reset.setAttribute('aria-label','Reset filter');reset.classList.add('compact-reset');}
 if(line){advancedBody.append(line);const count=compactFilterCount(line);advanced.querySelector('summary').textContent='Filter lainnya'+(count?' ('+count+')':'');}
 toolbar.append(advanced);if(reset)toolbar.append(reset);
 // Keep advanced controls in a positioned panel while the search remains in the document flow.
 tools.replaceChildren(toolbar);date?.remove();app.querySelectorAll('.mobile-filter-options').forEach(el=>{if(!el.children.length)el.remove()});
 if(!line||!line.querySelector('select,input'))advanced.hidden=true;
}
const compactContentBefore=renderContent;
renderContent=function(){const result=compactContentBefore.apply(this,arguments);compactListDecorate();return result};
// Close panels on an outside click, while allowing portaled select options to stay interactive.
document.addEventListener('pointerdown',event=>{if(!(event.target instanceof Element)||event.target.closest('[data-ui-portal]'))return;for(const panel of document.querySelectorAll('#app.compact-list details.compact-advanced[open],#app.compact-list details.compact-guide[open]'))if(!panel.contains(event.target)){panel.open=false;if(panel.classList.contains('compact-advanced'))compactFilterOpen[compactListKey()]=false}},true);
