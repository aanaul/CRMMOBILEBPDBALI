function relationLabel(p){return p?.relation==='Customer'?'Nasabah':'Lead'}
function detailFacts(items){return '<div class="facts">'+items.map(([label,value])=>labelled(label,value)).join('')+'</div>'}
function detailPanel(title,body){return '<section class="panel"><h2>'+title+'</h2>'+body+'</section>'}
let recordTab='Identitas',recordTabFocus='';
function detailTabChange(tab){recordTab=tab;renderContent()}
function recordTabs(tabs){return '<div class="tabs recordtabs">'+tabs.map(t=>btn(t,"detailTabChange('"+t+"')",recordTab===t)).join('')+'</div>'}
function relatedRecordActivities(pid,lid=''){let acts=db.activities.filter(a=>mine(a)&&a.profile===pid&&(!lid||a.lead===lid));return acts.map(a=>'<div class="timelineitem"><strong>'+E(a.type)+' · '+E(a.result)+'</strong><p>'+E(a.note)+'</p><small>'+fmt(a.occurred)+' · '+E(a.owner)+'</small>'+(a.nextTask?btn('Buka tindak lanjut',"go('Aktivitas detail','"+a.nextTask+"')"):'')+'</div>').join('')||empty('Belum ada riwayat aktivitas.')}
function leadIdentityEdit(id){
 let l=db.leads.find(l=>l.id===id),p=profile(l?.profile);if(!l||!mine(l)||!p)return toast('Data tidak tersedia.');
 modal('Edit data Lead',field('Nama orang / perusahaan','name',p.name,'text',true)+field('Nama kontak','contact',p.contact||'')+field('Nomor telepon','phone',p.phone||'','tel',true)+field('Alamat','address',p.address||'')+field('Alamat usaha / tempat bekerja','businessAddress',p.businessAddress||'')+field('Pekerjaan / bidang usaha','occupation',p.occupation||'')+select('Jenis lead','leadType',['Perorangan','Badan usaha','Belum ditentukan'],l.leadType||'Belum ditentukan')+field('Produk yang diminati','product',l.product||'')+area('Informasi awal / kebutuhan','need',l.need||'')+area('Informasi referral','referralInfo',l.referralInfo||''),f=>{
 Object.assign(p,{name:f.name,contact:f.contact,phone:f.phone,address:f.address,businessAddress:f.businessAddress,occupation:f.occupation});
 Object.assign(l,{leadType:f.leadType,product:f.product,need:f.need,referralInfo:f.referralInfo});record('Edit identitas Lead',id,p.name);
 });
}
function leadRecordDetail(l){
 let p=profile(l.profile),a=l.assessment||{},open=db.tasks.filter(t=>mine(t)&&t.lead===l.id&&isOpen(t)),os=db.opps.filter(o=>mine(o)&&o.lead===l.id);
 let head='<section class="panel recordhero"><div class="recordtop">'+badge('Lead')+badge(l.status)+'</div><h1>'+E(p.name)+'</h1><p>'+E(p.contact||'')+' · '+E(p.phone||'Belum ada nomor telepon')+'</p><small>'+E(l.id)+'</small><div class="actions">'+btn('Tambah Task',"newTask('"+p.id+"','','"+l.id+"')",true)+btn('Edit data',"leadIdentityEdit('"+l.id+"')")+btn('Reassign',"reassign('lead','"+l.id+"')")+(l.status==='Closed'?btn('Aktifkan kembali',"reopenRecord('lead','"+l.id+"')"):l.status!=='Converted'?btn('Tutup Lead',"closeLead('"+l.id+"')"):'')+'</div></section>';
 let body='';
 if(recordTab==='Identitas')body=detailPanel('Identitas awal',detailFacts([['Nama',p.name],['Nama kontak',p.contact],['Nomor telepon',p.phone],['Alamat',p.address],['Alamat usaha / tempat bekerja',p.businessAddress],['Pekerjaan / bidang usaha',p.occupation]]))+detailPanel('Pencatatan Lead',detailFacts([['Lead ID',l.id],['Jenis lead',l.leadType],['Sumber lead',l.source],['Produk yang diminati',l.product],['Petugas pencatat',l.createdBy||l.owner],['Penanggung jawab',l.owner],['Tanggal / waktu masuk',fmt(l.recorded||l.created)],['Informasi awal / kebutuhan',l.need]]));
 if(recordTab==='Kualifikasi')body=detailPanel('Kualifikasi awal',detailFacts([['Status lead',l.status],['Hasil kualifikasi',l.qualification],['Kategori potensi',l.grade],['Analisis kebutuhan',l.need],['Potensi bisnis',l.potential]])+btn('Perbarui kualifikasi',"qualify('"+l.id+"')",true)+(l.qualification==='Qualified'?btn('Konversi ke Opportunity',"newOpp('"+p.id+"','"+l.id+"')"):''));
 if(recordTab==='Survey & Assessment')body=detailPanel('Survey dan assessment awal',detailFacts([['Tanggal survey',a.date?fmt(a.date):''],['Hasil survey',a.survey],['Informasi usaha',a.business],['Gambaran keuangan awal',a.financial],['Kesimpulan assessment',a.conclusion],['Petugas assessment',a.actor],['Terakhir dicatat',a.recorded?fmt(a.recorded):'']])+btn('Catat assessment',"assessment('"+l.id+"')",true)+(l.qualification!=='Qualified'?'<p class="hint">Kualifikasi Lead terlebih dahulu sebelum mencatat assessment awal.</p>':''));
 if(recordTab==='Referral')body=detailPanel('Asal dan perkembangan referral',detailFacts([['Sumber lead',l.source],['Pemberi referral',l.referral],['Produk yang direferensikan',l.product],['Informasi referral',l.referralInfo],['Petugas yang menangani',l.owner],['Status referral',l.referralStatus||l.status],['Status konversi',l.status==='Converted'?'Dikonversi ke Opportunity':p.relation==='Customer'?'Menjadi Nasabah':'Belum dikonversi']])+os.map(oppCard).join(''));
 if(recordTab==='Opportunity')body=detailPanel('Opportunity terkait',os.map(oppCard).join('')||empty('Belum ada opportunity dari Lead ini.'));
 if(recordTab==='Task')body=detailPanel('Task terbuka',open.map(taskCard).join('')||empty('Belum ada task terbuka.'));
 if(recordTab==='Riwayat Aktivitas')body=detailPanel('Riwayat Aktivitas',relatedRecordActivities(p.id,l.id));
 if(recordTab==='Riwayat Perubahan')body=detailPanel('Riwayat Perubahan',history(l.id));
 return head+recordTabs(['Identitas','Kualifikasi','Survey & Assessment','Referral','Opportunity','Task','Riwayat Aktivitas','Riwayat Perubahan'])+body;
}
function nasabahRecordDetail(p){
 let portfolios=p.portfolio||[],accounts=p.accounts||[],collaterals=p.collaterals||[],os=db.opps.filter(o=>mine(o)&&o.profile===p.id),ts=db.tasks.filter(t=>mine(t)&&t.profile===p.id&&isOpen(t)),apps=db.applications.filter(a=>mine(a)&&a.profile===p.id);
 let head='<section class="panel recordhero"><div class="recordtop">'+badge(relationLabel(p))+'<small>'+E(p.id)+'</small></div><h1>'+E(p.name)+'</h1><p>'+E(p.contact||'')+' · '+E(p.phone||'')+'</p><div class="actions">'+btn('Tambah Task',"newTask('"+p.id+"')",true)+btn('Opportunity baru',"newOpp('"+p.id+"')")+btn('Ajukan koreksi data',"correction('profile','"+p.id+"')")+(p.relation!=='Customer'?btn('Konfirmasi Nasabah',"confirmCustomer('"+p.id+"')"):'')+'</div></section>';
 let body='';
 if(recordTab==='Identitas')body=detailPanel('Identitas Nasabah',detailFacts([['Nama',p.name],['CIF',p.cif],['NIK',p.nik],['Alamat',p.address],['Alamat usaha / tempat bekerja',p.businessAddress],['Pekerjaan',p.occupation],['Fasilitas yang dinikmati',portfolios.length?portfolios.map(x=>x.product).join(', '):p.facilities],['Nama kontak',p.contact],['Nomor telepon',p.phone],['AO / RM',p.owner],['Sumber data',p.dataSource||'Pencatatan CRM'],['Terakhir diperbarui',p.updated?fmt(p.updated):'']]));
 if(recordTab==='Portofolio')body=detailPanel('Posisi produk Bank',portfolios.length?portfolios.map(x=>detailPanel(E(x.product),detailFacts([['Plafond',x.limit==null?'':rup(x.limit)],['Baki debet',x.outstanding==null?'':rup(x.outstanding)],['Jenis kredit',x.creditType],['Kolektibilitas',x.collectibility],['Jatuh tempo',x.maturity?fmt(x.maturity):'']]))).join(''):empty('Data portofolio belum tersedia.'))+detailPanel('Kategori produk','<p>Tabungan · Giro · Deposito · Kredit konsumtif · Kredit produktif</p>');
 if(recordTab==='Rekening & Transaksi')body=detailPanel('Rekening dan transaksi',accounts.length?accounts.map(x=>detailPanel(E(x.product||'Rekening'),detailFacts([['Nomor rekening',x.number],['Status rekening',x.status],['Saldo',x.balance==null?'':rup(x.balance)],['Ringkasan transaksi',x.transactionSummary],['Terakhir diperbarui',x.updated?fmt(x.updated):'']]))).join(''):empty('Data rekening dan transaksi belum tersedia.'))+'<p class="hint">Status rekening: Aktif, Dormant, atau Tutup mengikuti sistem sumber.</p>';
 if(recordTab==='Kredit & Agunan')body=detailPanel('Agunan',collaterals.length?collaterals.map(x=>detailFacts([['Jenis agunan',x.type],['Nilai taksasi',x.appraisal==null?'':rup(x.appraisal)],['Lokasi',x.location],['Referensi foto / dokumen',x.documentReference]])).join(''):empty('Data agunan belum tersedia.'))+detailPanel('Histori pengajuan',apps.map(a=>detailFacts([['Nomor pengajuan',a.number],['Produk',a.product],['Status survey',a.survey],['Status analisa',a.analysis],['Status approval',a.approval],['Status pencairan',a.disbursement]])).join('')||empty('Belum ada pengajuan yang terhubung.'));
 if(recordTab==='Opportunity')body=detailPanel('Opportunity terkait',os.map(oppCard).join('')||empty('Belum ada opportunity.'))+detailPanel('Produk yang dimiliki',portfolios.length?'<p>'+E(portfolios.map(x=>x.product).join(', '))+'</p>':empty('Data kepemilikan produk belum tersedia.'))+detailPanel('Peluang pengembangan',p.relationshipInsight?'<p>'+E(p.relationshipInsight)+'</p>':empty('Belum ada informasi peluang payroll, kredit, atau dana.'));
 if(recordTab==='Task')body=detailPanel('Task terbuka',ts.map(taskCard).join('')||empty('Belum ada task terbuka.'));
 if(recordTab==='Riwayat Aktivitas')body=detailPanel('Riwayat interaksi',relatedRecordActivities(p.id))+detailPanel('Keluhan',p.complaints?.length?p.complaints.map(c=>detailFacts([['Tanggal',c.date],['Keluhan',c.note],['Status',c.status]])).join(''):empty('Belum ada data keluhan.'));
 return head+recordTabs(['Identitas','Portofolio','Rekening & Transaksi','Kredit & Agunan','Opportunity','Task','Riwayat Aktivitas'])+body;
}
const assessmentBeforeDetails=assessment;
assessment=function(id){let l=db.leads.find(x=>x.id===id);if(!l||!mine(l))return toast('Lead tidak tersedia.');if(l.qualification!=='Qualified')return toast('Lead harus Qualified sebelum assessment awal.');assessmentBeforeDetails(id)};
const detailsContentBefore=renderContent;
renderContent=function(){
 if(!['Lead detail','Nasabah detail'].includes(view)){detailsContentBefore();return}
 if(recordTabFocus!==view+focus){recordTab='Identitas';recordTabFocus=view+focus}
 let l=db.leads.find(l=>l.id===focus),p=profile(view==='Lead detail'?l?.profile:focus);
 if(!p||!mine(p)||(view==='Lead detail'&&(!l||!mine(l)))){document.querySelector('#app').innerHTML=empty('Data tidak tersedia dalam akses Anda.');return}
 document.querySelector('#app').innerHTML=(backListState?btn('Kembali ke daftar','backToResults()'):'')+(view==='Lead detail'?leadRecordDetail(l):nasabahRecordDetail(p));
 cleanLabels(document.querySelector('#app'));wireCards(document.querySelector('#app'));
};
render();
const correctionBeforeRecord=correction;
const customerCorrectionFields={name:'Nama',nik:'NIK',cif:'CIF',address:'Alamat',businessAddress:'Alamat usaha / tempat bekerja',occupation:'Pekerjaan',contact:'Nama kontak',phone:'Nomor telepon'};
correction=function(kind,id){
 if(kind!=='profile')return correctionBeforeRecord(kind,id);
 let p=profile(id);if(!p||!mine(p))return toast('Nasabah tidak tersedia.');
 modal('Ajukan koreksi data Nasabah','<label>Field yang dikoreksi<select name="field" onchange="showCorrectionBefore()">'+Object.entries(customerCorrectionFields).map(([k,label])=>'<option value="'+k+'">'+label+'</option>').join('')+'</select></label><p id="correctionBefore"></p>'+field('Nilai yang diusulkan','proposed','','text',true)+area('Alasan dan referensi koreksi','reason','',true),f=>{
 if(f.field==='nik'&&!/^\d{16}$/.test(f.proposed))throw Error('NIK harus terdiri dari 16 digit.');
 db.corrections.push({id:uid('CR'),kind:'profile',record:id,field:f.field,before:p[f.field]||'',proposed:f.proposed,reason:f.reason,owner:p.owner,status:'Menunggu',created:now()});record('Ajukan koreksi Nasabah',id,customerCorrectionFields[f.field]+': '+f.reason);
 });showCorrectionBefore();
};
function showCorrectionBefore(){let p=profile(focus),f=document.querySelector('#form');if(p&&f)document.querySelector('#correctionBefore').textContent='Data saat ini: '+(p[f.elements.field.value]||'Belum diisi')}
const correctionReviewBeforeRecord=reviewCorrection;
reviewCorrection=function(id,decision){
 let cr=db.corrections.find(c=>c.id===id);if(cr?.kind!=='profile')return correctionReviewBeforeRecord(id,decision);
 if(!supervisors())return toast('Persetujuan memerlukan supervisor.');
 let p=profile(cr.record);if(!p||!mine(p))return toast('Data tidak tersedia.');
 modal('Review koreksi Nasabah',detailFacts([['Nasabah',p.name],['Field',customerCorrectionFields[cr.field]],['Data lama',cr.before],['Usulan data',cr.proposed],['Alasan',cr.reason]])+select('Keputusan','decision',['Disetujui','Ditolak','Dikembalikan'],decision)+area('Catatan keputusan','note','',true),f=>{
 if(cr.status!=='Menunggu')throw Error('Permintaan sudah diproses.');
 if(f.decision==='Disetujui'){if((p[cr.field]||'')!==cr.before)throw Error('Data sudah berubah. Minta pengajuan koreksi baru.');p[cr.field]=cr.proposed;p.updated=now()}
 cr.status=f.decision;cr.reviewer=actor();cr.reviewed=now();cr.reviewNote=f.note;record('Review koreksi Nasabah',cr.record,f.decision+' / '+f.note);
 });
};
