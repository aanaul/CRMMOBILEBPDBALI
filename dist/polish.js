const menuOrder=['Monitoring','Leads','Nasabah','Peluang','Agenda','Pengajuan','Persetujuan','Laporan','Notifikasi','Pengaturan'];
const displayMenu=n=>n==='Peluang'?'Opportunity':n==='Agenda'?'Task':n==='Aktivitas detail'?'Detail Task':n;
navigationParent=function(v){return ({'Lead detail':'Leads','Opportunity detail':'Peluang','Aktivitas detail':'Agenda','Nasabah detail':'Nasabah'})[v]||v};
function cleanLabels(root){
 if(!root)return;
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let nodes=[],n;
 while(n=walker.nextNode())nodes.push(n);
 for(let n of nodes){if(['SCRIPT','STYLE'].includes(n.parentElement?.tagName))continue;
 n.nodeValue=n.nodeValue.replace(/Customer\s*\/\s*prospect/gi,'Lead / Nasabah').replace(/prospect/gi,'Lead').replace(/customer/gi,'Nasabah').replace(/^Agenda$/,'Task').replace(/^Aktivitas$/,'Riwayat Aktivitas').replace(/^Peluang$/,'Opportunity').replace(/Aktivitas baru|Buat aktivitas|Buat follow-up/g,'Tambah Task').replace(/^Catat hasil$/i,'Catat Hasil');
 }
}
function wireCards(root){
 root?.querySelectorAll('article.record').forEach(card=>{
 let target=Array.from(card.querySelectorAll('button[onclick]')).find(b=>/go\('(Lead detail|Opportunity detail|Aktivitas detail|Nasabah detail)'/.test(b.getAttribute('onclick')));
 if(!target)return;
 card.tabIndex=0;card.setAttribute('role','link');card.setAttribute('aria-label','Buka detail '+(card.querySelector('h3')?.textContent||''));
 card.onclick=e=>{if(!e.target.closest('button,a,input,select,textarea,label,summary'))target.click()};
 card.onkeydown=e=>{if(e.target===card&&(e.key==='Enter'||e.key===' ')){e.preventDefault();target.click()}};
 });
}
const contentBeforePolish=renderContent;
renderContent=function(){
 contentBeforePolish();
 if(view==='Lead detail'){
 let l=db.leads.find(l=>l.id===focus);
 if(l&&mine(l)){
 let first=document.querySelector('#app .panel');
 if(first&&!first.querySelector('.leadTaskAction')){
 let button=document.createElement('button');button.className='primary leadTaskAction';button.textContent='Tambah Task';button.onclick=()=>newTask(l.profile,'',l.id);first.querySelector('.actions')?.prepend(button);
 }
 let panel=document.createElement('section');panel.className='panel';
 let related=db.tasks.filter(t=>mine(t)&&t.lead===l.id&&isOpen(t));
 panel.innerHTML='<h2>Task</h2>'+ (related.map(taskCard).join('')||empty('Belum ada task terbuka untuk lead ini.'));
 document.querySelector('#app').append(panel);
 }
 }
 cleanLabels(document.querySelector('#app'));wireCards(document.querySelector('#app'));
};
const renderBeforePolish=render;
render=function(){
 renderBeforePolish();
 let nav=document.querySelector('#nav');nav.innerHTML='';
 menuOrder.forEach(n=>{let b=document.createElement('button');b.textContent=displayMenu(n);b.onclick=()=>go(n);if(navigationParent(view)===n){b.className='active';b.setAttribute('aria-current','page')}nav.append(b)});
 document.querySelector('#title').textContent=displayMenu(view);
 if(mobile)nav.classList.add('orderedMobileNav');
 cleanLabels(document.querySelector('#app'));wireCards(document.querySelector('#app'));
};
const modalBeforePolish=modal;
modal=function(title,html,handler){modalBeforePolish(title,html,handler);cleanLabels(document.querySelector('#modal'))};
const newTaskBeforePolish=newTask;
newTask=function(pid='',oid='',lid=''){newTaskBeforePolish(pid,oid,lid);let form=document.querySelector('#form');if(!form)return;let previous=form.onsubmit;form.onsubmit=e=>{
 let pid=form.elements.profile?.value;let count=db.tasks.length;previous(e);
 if(db.tasks.length>count){let t=db.tasks[db.tasks.length-1];if(!t.opp&&!t.lead&&profile(pid)?.relation!=='Customer'){let l=db.leads.find(l=>l.profile===pid&&!['Closed','Converted'].includes(l.status));if(l){t.lead=l.id;record('Hubungkan Task ke Lead',t.id,l.id)}}}
};};
contextLabel=function(t){let o=opp(t.opp),p=profile(t.profile);return '<div class="contextline"><span class="contextpill">Terkait '+(o?'Opportunity':t.lead||p?.relation!=='Customer'?'Lead':'Nasabah')+'</span><span>'+E(o?.name||pname(t.profile))+'</span></div>'};
denseBoard=function(items){
 let active=items.filter(o=>o.outcome==='Aktif');
 return '<div class="board">'+stages.map(s=>{
 let a=active.filter(o=>o.stage===s),sum=a.reduce((n,o)=>n+(Number(o.value)||0),0);
 return '<section class="column"><div class="columnhead"><b>'+E(s)+'</b><span>'+a.length+'</span></div><div class="stagetotal">'+rup(sum)+'</div>'+a.slice(0,5).map(oppCard).join('')+(a.length>5?btn('Lihat semua '+a.length,"stageFilter='"+s+"';listStatus='Aktif';listKind='Daftar';listPage=1;renderContent()"):'')+'</section>';
 }).join('')+'</div><p class="hint">Total nominal seluruh opportunity aktif sesuai filter. Nilai indikatif, bukan pendapatan.</p>';
};
const scaleListBeforePolish=scaleList;
scaleList=function(){if(view==='Peluang'&&listKind==='Pipeline'&&listStatus&&listStatus!=='Aktif'){listKind='Daftar'}return scaleListBeforePolish()};
render();
