function opportunityOrigin(o){const leadId=o.lead||o.sourceLead;if(leadId){const l=db.leads.find(l=>l.id===leadId),accessible=!!l&&l.profile===o.profile&&mine(l);return {label:'Leads',route:'Lead detail',id:leadId,accessible,name:accessible?pname(l.profile):'Detail asal di luar akses Anda'}}const p=profile(o.profile);if(p?.relation==='Customer'){const accessible=mine(p)&&!p.readOnly;return {label:'Customer',route:'Nasabah detail',id:p.id,accessible,name:accessible?p.name:'Detail asal di luar akses Anda'}}return {label:'Belum tercatat',route:'',id:'',accessible:false,name:'Relasi asal belum tersedia'}}
function opportunityOriginHtml(o,compact=false){const origin=opportunityOrigin(o),label=(compact?'Dari ':'')+origin.label;return '<div class="opportunity-origin '+(compact?'compact':'')+'">'+(origin.accessible?'<button type="button" class="opportunity-origin-link" aria-label="Buka '+E(origin.label)+' asal Opportunity" onclick="'+leadCall('go',origin.route,origin.id)+'">'+E(label)+'</button>':'<span class="opportunity-origin-label">'+E(label)+'</span>')+(!compact?'<small>'+E(origin.name)+'</small>':'')+'</div>'}
/* Customer discovery and sales handoff; shared CMS/mobile behavior. */
let customerOpportunityChip='Semua';
function customerActiveOpportunities(id){return db.opps.filter(o=>o.profile===id&&o.outcome==='Aktif'&&mine(o))}
function customerOpportunityMatches(p,filter=customerOpportunityChip){const n=customerActiveOpportunities(p.id).length;return filter==='Semua'||(filter==='Punya Opportunity Aktif'?n>0:n===0)}
const flowPreviousList=getList;
getList=function(name=view){const rows=flowPreviousList(name);return name==='Nasabah'?rows.filter(p=>customerOpportunityMatches(p)):rows};
function setCustomerFilter(value){
 if(!['Semua','Aktif','Inactive','Punya Opportunity Aktif','Tanpa Opportunity Aktif'].includes(value))return;
 customerStatusChip=['Aktif','Inactive'].includes(value)?value:'Semua';
 customerOpportunityChip=['Punya Opportunity Aktif','Tanpa Opportunity Aktif'].includes(value)?value:'Semua';
 listPage=1;renderContent();if(typeof persistWorkspaceLocation==='function')persistWorkspaceLocation();
}
function setCustomerOpportunityChip(value){setCustomerFilter(value)}
const flowPreviousScale=scaleList;
scaleList=function(){let html=flowPreviousScale();if(view!=='Nasabah')return html;
 const all=db.profiles.filter(p=>p.relation==='Customer'&&mine(p)&&(typeof dateRecordMatches!=='function'||dateRecordMatches('Nasabah',p))),selected=customerOpportunityChip!=='Semua'?customerOpportunityChip:customerStatusChip;
 const chips='<div class="rangechips customerchips" aria-label="Filter Customer">'+['Semua','Aktif','Inactive','Punya Opportunity Aktif','Tanpa Opportunity Aktif'].map(value=>{
 const rows=all.filter(p=>['Aktif','Inactive'].includes(value)?statusOfCustomer(p)===value:customerOpportunityMatches(p,value));
 return '<button class="'+(selected===value?'active':'')+'" aria-pressed="'+(selected===value)+'" onclick="'+leadCall('setCustomerFilter',value)+'">'+E(value==='Aktif'?'Customer Aktif':value)+' <b>'+rows.length+'</b></button>';
 }).join('')+'</div>';
 const group=/<div class="rangechips customerchips"[^>]*>[\s\S]*?<\/div>/;
 return group.test(html)?html.replace(group,chips):html.replace('<div class="scaletools">',chips+'<div class="scaletools">');
};
function openCustomerActiveOpportunities(id){const p=profile(id);if(!p||!mine(p))return;modal('Opportunity aktif · '+p.name,customerActiveOpportunities(id).map(o=>'<article class="record"><h3>'+E(o.name)+'</h3><p>'+E(o.product)+' · '+E(o.stage)+'</p>'+btn('Buka Opportunity',"document.querySelector('#modal').close();"+leadCall('go','Opportunity detail',o.id))+'</article>').join('')||empty('Tidak ada Opportunity aktif.'),()=>{});document.querySelector('#form > .actions > button.primary')?.remove();for(const button of document.querySelectorAll('#form button'))button.type='button';const close=document.querySelector('#form > .actions > button');if(close)close.textContent='Tutup';document.querySelector('#form').onsubmit=e=>e.preventDefault()}
const flowPreviousCard=profileCard;
profileCard=function(p){const html=flowPreviousCard(p),count=customerActiveOpportunities(p.id).length;return count?html.replace('</article>','<div class="actions">'+btn(count+' Opportunity Aktif',leadCall('openCustomerActiveOpportunities',p.id))+'</div></article>'):html};
function leadCanReturnQualified(l){return !l.customerConverted&&profile(l.profile)?.relation!=='Customer'&&l.status==='Converted'&&leadOpportunityCount(l)>0&&leadOpportunities(l).length===leadOpportunityCount(l)&&!leadOpportunities(l).some(o=>o.outcome==='Aktif')}
function returnLeadQualified(id){const l=db.leads.find(x=>x.id===id);if(!l||!leadCanReturnQualified(l))return toast('Tutup Opportunity aktif terlebih dahulu. Customer tidak dapat kembali menjadi Lead.');modal('Kembalikan ke antrean Qualified','<p>Gunakan untuk koreksi handoff atau kebutuhan yang perlu ditawarkan kembali. Riwayat Opportunity tetap tersimpan. Lost tidak mengembalikan Lead secara otomatis.</p>'+area('Alasan pengembalian','reason','',true),f=>{l.status='Working';l.queueReturnAt=now();l.queueReturnReason=f.reason;record('Kembali ke antrean Qualified',l.id,f.reason)})}
const flowPreviousLeadDetail=leadRecordDetail;
leadRecordDetail=function(l){return flowPreviousLeadDetail(l)+(leadCanReturnQualified(l)?detailPanel('Koreksi handoff',btn('Kembalikan ke antrean Qualified',leadCall('returnLeadQualified',l.id))):'')};
const flowPreviousContent=renderContent;
renderContent=function(){flowPreviousContent();if(view==='Opportunity detail'){const o=opp(focus);if(o&&mine(o))document.querySelector('#app')?.insertAdjacentHTML('beforeend',detailPanel('Asal Opportunity',opportunityOriginHtml(o)+detailFacts([['Asal',opportunityOrigin(o).label],['Sumber',o.acquisitionSource||db.leads.find(l=>l.id===(o.lead||o.sourceLead))?.source||'Belum dicatat'],['Referral / campaign',o.acquisitionReference||db.leads.find(l=>l.id===(o.lead||o.sourceLead))?.referral||'—']])))} };
const flowPreviousReset=resetLists;
resetLists=function(){customerOpportunityChip='Semua';return flowPreviousReset()};
if(typeof workspaceLocationFields!=='undefined')workspaceLocationFields.push(['customerOpportunityChip',()=>customerOpportunityChip,v=>{customerOpportunityChip=['Semua','Punya Opportunity Aktif','Tanpa Opportunity Aktif'].includes(v)?v:'Semua';if(customerOpportunityChip!=='Semua')customerStatusChip='Semua'}]);
