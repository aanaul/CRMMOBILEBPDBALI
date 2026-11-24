/* Guided actions use existing CRM records and workflows, never predictive scoring. */
function aoNextTask(rows){return rows.filter(t=>mine(t)&&isOpen(t)).sort((a,b)=>Number(overdue(b))-Number(overdue(a))||String(a.scheduled||'').localeCompare(String(b.scheduled||''))||String(a.id).localeCompare(String(b.id)))[0]}
function aoGuidance(route=view,id=focus){
 if(typeof journey!=='undefined'&&journey)return null;
 const readOnly=pocReadOnly(),action=(label,kind,...args)=>({label,kind,args});
 if(route==='Lead detail'){
  const l=db.leads.find(l=>l.id===id);if(!l||!mine(l))return null;const p=profile(l.profile),stage=leadLifecycle(l),opps=db.opps.filter(o=>mine(o)&&(o.lead===l.id||o.sourceLead===l.id));
  if(stage==='Dikonversi ke Customer'||l.existingCustomer||p?.relation==='Customer')return {title:'Lanjutkan hubungan dari Customer 360',text:'Customer sudah tercatat. Peluang produk berikutnya dibuat dari profil Customer, tanpa mengulang akuisisi Lead.',action:p&&mine(p)&&!p.readOnly?action('Buka Customer 360','go','Nasabah detail',p.id):null};
  if(stage==='Dikonversi ke Opportunity')return {title:'Lanjutkan penjualan di Opportunity',text:opps.length+' opportunity terhubung. Tahap penjualan dikelola di sana; data asal Lead tetap tersimpan.',action:action('Lihat Opportunity','leadTab','Opportunity')};
  if(['Tidak Qualified','Ditutup'].includes(stage))return {title:'Lead tidak berada di antrean akuisisi aktif',text:'Tinjau alasan dan riwayat sebelum menentukan tindak lanjut. Penutupan Lead berbeda dengan hasil Won/Lost Opportunity.',action:action('Lihat riwayat','leadTab','Riwayat Perubahan')};
  if(stage==='Qualified')return {title:'Kebutuhan sudah qualified',text:'Buat Opportunity untuk kebutuhan dan produk yang terkonfirmasi. Satu Lead dapat memiliki beberapa Opportunity.',action:readOnly?null:action('Buat Opportunity','newOpp',l.profile,l.id)};
  return {title:stage==='Baru'?'Mulai kualifikasi Lead':'Lengkapi hasil kualifikasi',text:'Konfirmasi kebutuhan, produk, dan potensi bisnis. Gunakan Task untuk mencatat tindak lanjut, bukan sebagai tahap penjualan.',action:readOnly?null:stage==='Baru'?action('Mulai kualifikasi','beginQualification',l.id):action('Isi kualifikasi','qualify',l.id)};
 }
 if(route==='Opportunity detail'){
  const o=opp(id);if(!o||!mine(o))return null;
  if(o.outcome!=='Aktif')return {title:({Won:'Opportunity berhasil ditutup',Lost:'Opportunity berakhir Lost',Cancelled:'Opportunity dibatalkan'})[o.outcome]||'Opportunity sudah ditutup',text:'Hasil, alasan, dan riwayat tetap tercatat. Nilai indikatif Opportunity dan nominal realisasi merupakan ukuran yang berbeda.',action:null};
  const next=aoNextTask(db.tasks.filter(t=>t.opp===o.id));
  return next?{title:overdue(next)?'Tindak lanjut melewati deadline':'Tindak lanjut berikutnya sudah terjadwal',text:next.purpose+' · '+fmt(next.scheduled)+' · '+next.owner,action:action('Buka Task berikutnya','go','Aktivitas detail',next.id)}:{title:'Opportunity belum memiliki Task terbuka',text:'Tetapkan tindak lanjut yang jelas: apa yang dilakukan, siapa penanggung jawabnya, dan kapan dijalankan.',action:readOnly?null:action('Buat Task','newTask',o.profile,o.id,o.lead||o.sourceLead||'')};
 }
 if(route==='Nasabah detail'){
  const p=profile(id);if(!p||!mine(p)||p.relation!=='Customer')return null;
  const next=aoNextTask(db.tasks.filter(t=>t.profile===p.id));
  return next?{title:'Lanjutkan tindak lanjut Customer',text:next.purpose+' · '+fmt(next.scheduled)+' · '+next.owner,action:action('Buka Task berikutnya','go','Aktivitas detail',next.id)}:{title:'Tinjau kebutuhan produk berikutnya',text:'Periksa produk yang tercatat dan kebutuhan Customer sebelum membuat Opportunity cross-sell. Saran produk tetap perlu dikonfirmasi AO.',action:action('Tinjau Cross-sell','customerTab','Cross-sell')};
 }
 if(route==='Aktivitas detail'){
  const t=task(id);if(!t||!mine(t))return null;
  if(!isOpen(t))return {title:t.status==='Selesai'?'Task sudah selesai':'Task sudah dibatalkan',text:'Riwayat dan hasil yang sudah dicatat tetap tersedia di detail ini.',action:null};
  if(activityKind(t.type)==='Kunjungan'){
   if(t.approval!=='Disetujui')return {title:'Rencana kunjungan memerlukan persetujuan',text:'Check-in tersedia setelah rencana disetujui supervisor. Jangan memulai kunjungan dari rencana yang masih menunggu atau dikembalikan.',action:supervisors()?action('Buka persetujuan','go','Persetujuan'):null};
   return {title:t.checkin?'Selesaikan kunjungan dan catat hasil':'Mulai kunjungan di lokasi',text:t.checkin?'Catat hasil kunjungan dan tindakan berikutnya sebelum check-out.':'Check-in menggunakan lokasi perangkat. Pastikan izin lokasi aktif dan Anda berada di lokasi kunjungan.',action:readOnly?null:t.checkin?action('Check-out & laporan','activityForm',t.id):action('Check-in GPS','checkin',t.id)};
  }
  return {title:'Catat hasil dan tindak lanjut',text:'Setelah aktivitas dilakukan, simpan hasil yang jelas dan tentukan tindakan berikutnya bila masih diperlukan.',action:readOnly?null:action('Catat hasil','activityForm',t.id)};
 }
 return null;
}
function aoNextAction(){const g=aoGuidance();if(!g?.action)return;const a=g.action,read=['go','leadTab','customerTab'].includes(a.kind);if(!read&&pocReadOnly())return toast('Akses baca: tindakan operasional tidak tersedia.');const actions={go,leadTab:detailTabChange,customerTab:c360ChangeTab,newOpp,newTask,beginQualification:leadBeginQualification,qualify,activityForm,checkin};return actions[a.kind]?.(...a.args)}
function aoSectionChoose(label){const tabs=document.querySelector('#app .recordtabs,#app .c360-tabs');const button=Array.from(tabs?.querySelectorAll('button')||[]).find(b=>b.textContent.trim()===label);button?.click()}
function aoHomeQuickAction(kind){if(kind==='lead')return createLead();if(kind==='task')return newTask();if(kind==='customer')return go('Nasabah')}
function aoDecorate(){
 const app=document.querySelector('#app');if(!app)return;
 const guidance=aoGuidance();
 if(guidance&&!app.querySelector('.ao-next')){
  const hero=app.querySelector('h1')?.closest('.recordhero,.c360-hero,.panel');
  if(hero){const box=document.createElement('section');box.className='ao-next';box.setAttribute('aria-label','Langkah berikutnya');box.innerHTML='<div><small>LANGKAH BERIKUTNYA</small><h2>'+E(guidance.title)+'</h2><p>'+E(guidance.text)+'</p></div>'+(guidance.action?'<button class="primary" onclick="aoNextAction()">'+E(guidance.action.label)+'</button>':'');hero.after(box);const fn=({newTask:'newTask',newOpp:'newOpp',customerTab:'c360ChangeTab',activityForm:'activityForm',checkin:'checkin'})[guidance.action?.kind];if(fn)hero.querySelectorAll('button[onclick]').forEach(button=>{const call=button.getAttribute('onclick')||'',arg=guidance.action.args[0];if(call.includes(fn+'(')&&(call.includes("'"+arg+"'")||call.includes(JSON.stringify(arg)))){button.hidden=true;button.classList.add('ao-action-in-guidance')}})}
 }
 if(mobile&&view==='Lead detail'&&!app.querySelector('.ao-context')){const panels=Array.from(app.querySelectorAll(':scope>.lead-workflow-summary'));if(recordTab==='Identitas')app.querySelectorAll(':scope>.panel').forEach(panel=>{if(panel.querySelector('h2')?.textContent.trim()==='Sumber Lead')panels.push(panel)});if(panels.length){const context=document.createElement('details');context.className='ao-context';const summary=document.createElement('summary');const lead=db.leads.find(l=>l.id===focus),late=lead&&typeof leadSla==='function'&&leadSla(lead).late;summary.textContent=late?'Konteks Lead · SLA terlewati':'Konteks Lead, sumber & SLA';if(late)context.classList.add('ao-context-late');panels[0].before(context);context.append(summary);panels.forEach(panel=>context.append(panel))}}
 const tabs=app.querySelector('.recordtabs,.c360-tabs');
 if(tabs){tabs.setAttribute('aria-label','Bagian detail');tabs.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.classList.contains('primary')||b.classList.contains('active')||b.getAttribute('aria-pressed')==='true')))}
 if(mobile&&tabs&&!app.querySelector('.ao-section-picker')){const buttons=Array.from(tabs.querySelectorAll('button')),selected=buttons.find(b=>b.getAttribute('aria-pressed')==='true')||buttons[0],label=document.createElement('label');label.className='ao-section-picker';label.innerHTML='<span>Bagian detail</span><select aria-label="Pilih bagian detail" onchange="aoSectionChoose(this.value)">'+buttons.map(b=>'<option '+(b===selected?'selected':'')+' value="'+E(b.textContent.trim())+'">'+E(b.textContent.trim())+'</option>').join('')+'</select>';tabs.before(label);tabs.classList.add('ao-has-picker')}
 if(mobile&&guidance){const hero=app.querySelector('h1')?.closest('.recordhero,.c360-hero,.panel');if(hero&&!hero.querySelector('.ao-more-actions')){
  const secondary=Array.from(hero.querySelectorAll('button[onclick]')).filter(b=>!b.hidden&&b.style.display!=='none'&&/\b(?:leadIdentityEdit|reassign|reschedule|closeLead|cancelTask|reopenRecord|returnLeadQualified)\(/.test(b.getAttribute('onclick')||''));
  if(secondary.length){const details=document.createElement('details');details.className='ao-more-actions';const summary=document.createElement('summary');summary.textContent='Tindakan lainnya';const list=document.createElement('div');list.className='ao-more-list';secondary.forEach(b=>{if(/closeLead\(|cancelTask\(/.test(b.getAttribute('onclick')||''))b.classList.add('ao-danger-action');list.append(b)});details.append(summary,list);hero.append(details);hero.querySelectorAll('.actions').forEach(group=>{if(!group.children.length)group.remove()})}
 }}
 if(mobile&&view==='Home'&&!(typeof journey!=='undefined'&&journey)&&!app.querySelector('.ao-home-quick')&&!pocReadOnly()){const welcome=app.querySelector('.homewelcome');welcome?.insertAdjacentHTML('afterend','<section class="ao-home-quick" aria-label="Tindakan cepat"><button onclick="aoHomeQuickAction(\'lead\')">Buat Lead</button><button onclick="aoHomeQuickAction(\'task\')">Buat Task</button><button onclick="aoHomeQuickAction(\'customer\')">Cari Customer</button></section>')}
 app.querySelectorAll('button').forEach(b=>{const names={'Tambah Task':'Buat Task','Opportunity baru':'Buat Opportunity','Catat Hasil':'Catat hasil'};const label=names[b.textContent.trim()];if(label)b.textContent=label});
}
/* Native validation stays authoritative; add an accessible summary and inline guidance. */
const aoFormInitial=new WeakMap();let aoErrorQueued=false;
function aoFormSnapshot(form){return JSON.stringify(Array.from(form.elements).filter(e=>e.name&&!e.disabled&&!['hidden','submit','button'].includes(e.type)).map(e=>[e.name,e.type==='checkbox'||e.type==='radio'?e.checked:e.type==='file'?Array.from(e.files||[]).map(f=>f.name):e.value]))}
function aoFieldLabel(el){return el.getAttribute('aria-label')||el.closest('label')?.childNodes[0]?.textContent?.trim()||el.name||'Field'}
function aoFieldMessage(el){return el.validity.valueMissing?'Field ini wajib diisi.':el.validity.patternMismatch?(el.name==='nik'?'NIK harus terdiri dari 16 digit.':'Format isian belum sesuai.'):el.validity.typeMismatch?'Gunakan format yang sesuai.':el.validity.rangeUnderflow||el.validity.rangeOverflow?'Nilai berada di luar batas yang diizinkan.':el.validationMessage||'Periksa kembali isian ini.'}
function aoFocusField(id){const el=document.getElementById(id);if(!el)return;for(let p=el.parentElement;p;p=p.parentElement)if(p.tagName==='DETAILS')p.open=true;el.focus({preventScroll:true});el.scrollIntoView({block:'center',behavior:'instant'})}
function aoShowErrors(form){
 const invalid=Array.from(form.elements).filter(el=>el.willValidate&&!el.validity.valid),prior=form.querySelector('.ao-error-summary');
 form.querySelectorAll('.ao-field-error').forEach(e=>e.remove());
 for(const el of Array.from(form.elements)){if(el.dataset?.aoErrorId){el.removeAttribute('aria-invalid');const ids=(el.getAttribute('aria-describedby')||'').split(' ').filter(id=>id&&id!==el.dataset.aoErrorId);if(ids.length)el.setAttribute('aria-describedby',ids.join(' '));else el.removeAttribute('aria-describedby');delete el.dataset.aoErrorId}}
 if(!invalid.length){prior?.remove();return}
 const summary=prior||document.createElement('section');summary.className='ao-error-summary';summary.setAttribute('role','alert');summary.innerHTML='';const heading=document.createElement('strong');heading.textContent='Periksa '+invalid.length+' isian sebelum menyimpan';summary.append(heading);const list=document.createElement('ul');summary.append(list);
 invalid.forEach((el,index)=>{if(!el.id)el.id='ao-input-'+index;const errorId=el.id+'-ao-error',message=aoFieldMessage(el),inline=document.createElement('small');inline.id=errorId;inline.className='ao-field-error';inline.textContent=message;el.after(inline);el.setAttribute('aria-invalid','true');el.dataset.aoErrorId=errorId;el.setAttribute('aria-describedby',((el.getAttribute('aria-describedby')||'')+' '+errorId).trim());const li=document.createElement('li'),button=document.createElement('button');button.type='button';button.textContent=aoFieldLabel(el)+' — '+message;button.onclick=()=>aoFocusField(el.id);li.append(button);list.append(li)});
 if(!prior)form.prepend(summary);
}
function aoInstallForm(){const form=document.querySelector('#form');if(!form)return;queueMicrotask(()=>{if(document.querySelector('#form')===form)aoFormInitial.set(form,aoFormSnapshot(form))})}
document.addEventListener('invalid',event=>{const form=event.target.closest?.('#form');if(!form)return;event.preventDefault();if(aoErrorQueued)return;aoErrorQueued=true;queueMicrotask(()=>{aoErrorQueued=false;aoShowErrors(form);const first=Array.from(form.elements).find(el=>el.willValidate&&!el.validity.valid);if(first)aoFocusField(first.id)})},true);
document.addEventListener('input',event=>{const form=event.target.closest?.('#form');if(form?.querySelector('.ao-error-summary'))aoShowErrors(form)});
function aoConfirmDiscard(form){const baseline=aoFormInitial.get(form);return !baseline||baseline===aoFormSnapshot(form)||confirm('Isian belum disimpan. Tutup form dan buang perubahan ini?')}
document.addEventListener('click',event=>{const button=event.target.closest?.('#modal .modalhead button,#form>.actions:last-child>button');if(!button||button.classList.contains('primary')||!['Batal','Tutup','✕','×'].includes(button.textContent.trim())&&button.getAttribute('aria-label')!=='Tutup')return;const form=document.querySelector('#form');if(form&&!aoConfirmDiscard(form)){event.preventDefault();event.stopImmediatePropagation()}},true);
document.querySelector('#modal')?.addEventListener('cancel',event=>{const form=document.querySelector('#form');if(form&&!aoConfirmDiscard(form))event.preventDefault()});
const aoModalBefore=modal;modal=function(){const result=aoModalBefore.apply(this,arguments);aoInstallForm();return result};
const aoContentBefore=renderContent;renderContent=function(){const result=aoContentBefore.apply(this,arguments);aoDecorate();return result};
const aoRenderBefore=render;render=function(){const result=aoRenderBefore.apply(this,arguments);aoDecorate();return result};
if(typeof authUser!=='undefined'&&authUser&&!choosingBranch)render();
