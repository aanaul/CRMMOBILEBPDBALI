const workflowPlanBefore=journeyPlan;
function focusedFlow(scenario){
 const ao=owners[0]||'Dimas',ts=()=>journey?.started||now(),day=()=>ts().slice(0,10),P=()=>profile('SIM-P'),L=()=>db.leads.find(l=>l.id==='SIM-L');
 const product=activeMaster('products')[0]?.name||'KUR',type=activeMaster('activities').find(a=>a.behavior==='call')?.name||'Telepon',source=activeMaster('sources')[0]?.name||'Input Lead',process=stageDefs().find(s=>s.active&&s.type==='process')||{id:'stage-0',name:'Kebutuhan',sla:5};
 const step=(title,note,route,tab,apply=()=>{},preview='')=>({title,note,route,tab,role:ao,apply,preview});
 const seed=(customer=false)=>{db.profiles.push({id:'SIM-P',name:'Budi Santoso · Latihan',contact:'Budi',phone:'080000000000',address:'Alamat usaha contoh, Denpasar',occupation:'Pemilik toko',owner:ao,relation:customer?'Customer':'Prospect',customerSource:customer?'Input Langsung':undefined,cif:customer?'LATIHAN-CIF-001':''});if(!customer)db.leads.push({id:'SIM-L',profile:'SIM-P',source,leadType:'Perorangan',need:'Modal kerja toko Rp300 juta',product,owner:ao,status:'In qualification',qualification:'Qualified',grade:'Hot 1',created:day(),recorded:ts()})};
 const preview=(title,content)=>'<section class="panel simulationform"><div class="recordtop"><span class="tag">FORM · SIMULASI</span></div><h2>'+title+'</h2><form>'+content+'<button class="primary" type="button" disabled>Simpan</button></form></section>';
 const leadForm=preview('Buat Lead',field('Nama orang / perusahaan','name','Budi Santoso · Latihan')+field('Nomor telepon','phone','080000000000')+field('Sumber lead','source',source)+field('Produk yang diminati','product',product)+area('Kebutuhan awal','need','Modal kerja toko Rp300 juta'));
 if(scenario==='flow-lead')return [
 step('Buka Leads','AO memilih Buat Lead. Identitas belum perlu dibuat sebagai Nasabah.','Leads',''),
 step('Isi identitas dan kebutuhan','Nama, kontak, sumber lead dan kebutuhan awal dicatat dalam form yang sama.','Leads','',()=>{},leadForm),
 step('Simpan Lead baru','Sistem membuat Lead ID dan menyimpan penanggung jawab. Belum ada Opportunity atau Nasabah.','Lead detail','Identitas',()=>{seed(false);Object.assign(L(),{status:'New',qualification:'Belum dinilai',grade:'Cool'})}),
 step('Lead siap ditindaklanjuti','Dari halaman detail, AO bisa membuat Task untuk menggali kebutuhan sebelum kualifikasi.','Lead detail','Task')
 ];
 if(scenario==='flow-convert')return [
 step('Buka Lead yang akan dikonversi','Konversi ke Nasabah berbeda dari membuat Opportunity. Identitas yang sama dipertahankan.','Lead detail','Identitas',()=>seed(false)),
 step('Isi referensi konfirmasi','CIF dan NIK dilengkapi jika tersedia. Referensi konfirmasi hubungan Nasabah wajib diisi.','Lead detail','Identitas',()=>{},preview('Konversi Lead ke Nasabah',field('CIF','cif','LATIHAN-CIF-001')+field('Referensi konfirmasi Nasabah','reference','LATIHAN-ONBOARD-001'))),
 step('Konversi disimpan','Profil menjadi Nasabah dan Lead ditandai Dikonversi ke Nasabah. Tidak dapat kembali ke Baru atau Dalam Kualifikasi.','Nasabah detail','Identitas',()=>{Object.assign(P(),{relation:'Customer',cif:'LATIHAN-CIF-001',customerSource:'Konversi Lead',reference:'LATIHAN-ONBOARD-001',convertedAt:ts()});Object.assign(L(),{status:'CustomerConverted',customerConverted:true,customerConvertedAt:ts(),customerConversionBy:ao})}),
 step('Lead asal terkunci','Riwayat Lead tetap tersedia, tetapi kualifikasi dan identitas Lead tidak bisa diedit lagi.','Lead detail','Identitas'),
 step('Lanjutkan pekerjaan dari Nasabah','Nasabah dapat memiliki Task dan Opportunity baru tanpa membuat identitas ulang.','Nasabah detail','Task')
 ];
 const customer=scenario.endsWith('customer'),opportunity=scenario.startsWith('flow-opportunity');
 const taskForm=preview('Buat Task',field('Lead / Nasabah','profile','Budi Santoso · Latihan')+field('Opportunity terkait','opp','Tanpa opportunity terkait')+field('Jenis aktivitas','type',type)+area('Tujuan','purpose',customer?'Kunjungan relationship / konfirmasi kebutuhan baru':'Telepon untuk menggali kebutuhan awal')+field('Jadwal (WITA)','scheduled',day()+'T10:00','datetime-local')+field('Deadline (WITA)','due',day()+'T17:00','datetime-local'));
 if(!opportunity)return [
 step(customer?'Buka detail Nasabah':'Buka detail Lead','Pilih Buat Task. Identitas otomatis terisi dari halaman asal. Opportunity bersifat opsional. ',customer?'Nasabah detail':'Lead detail','Identitas',()=>seed(customer)),
 step('Isi aktivitas dan jadwal','Task mencatat apa yang akan dilakukan, untuk siapa, siapa pelaksana, serta batas waktunya.','Agenda','',()=>{},taskForm),
 step('Task tersimpan di daftar kerja','Task yang sama tampil di menu Task dan detail '+(customer?'Nasabah':'Lead')+'. Tidak ada duplikasi record.','Aktivitas detail','',()=>db.tasks.push({id:'SIM-T',profile:'SIM-P',lead:customer?'':'SIM-L',opp:'',owner:ao,type,purpose:customer?'Konfirmasi kebutuhan baru Nasabah':'Telepon penjajakan Lead',scheduled:day()+'T10:00',due:day()+'T17:00',status:'Terjadwal'})),
 step('Catat hasil pekerjaan','Pelaksanaan masuk Riwayat Aktivitas. Task selesai tidak otomatis mengubah Lead atau memenangkan Opportunity.','Aktivitas detail','',()=>{task('SIM-T').status='Selesai';task('SIM-T').completed=ts();db.activities.push({id:'SIM-A',task:'SIM-T',profile:'SIM-P',lead:customer?'':'SIM-L',owner:ao,type,result:'Tertarik',note:'Kebutuhan dikonfirmasi pada sesi latihan. Tindak lanjut dapat dibuat sebagai Task baru.',occurred:ts(),recorded:ts()})}),
 step('Lihat hasil pada identitas terkait','Riwayat dapat dibaca kembali dari '+(customer?'Nasabah':'Lead')+' tanpa mencari Task di tempat lain.',customer?'Nasabah detail':'Lead detail','Riwayat Aktivitas')
 ];
 return [
 step(customer?'Mulai dari Nasabah existing':'Mulai dari Lead Qualified',customer?'Nasabah dapat memiliki beberapa peluang produk sekaligus.':'Hasil kualifikasi harus Qualified sebelum membuat Opportunity.',''+(customer?'Nasabah detail':'Lead detail'),customer?'Identitas':'Kualifikasi',()=>seed(customer)),
 step('Isi kebutuhan bisnis spesifik','Pilih produk, nilai, probability, owner, dan target closing. Identitas asal otomatis terhubung.','Peluang','',()=>{},preview('Buat Opportunity',field('Lead / Nasabah','profile','Budi Santoso · Latihan')+field('Nama peluang','name','Modal kerja toko Budi')+field('Produk','product',product)+field('Nilai indikatif','value','300000000','number')+field('Probability (%)','probability','35','number')+field('Target closing','closing',offset(14),'date'))),
 step('Opportunity dibuat','Opportunity masuk ke tahap awal yang aktif sesuai Pengaturan. Lead belum otomatis menjadi Nasabah.','Opportunity detail','',()=>{db.opps.push({id:'SIM-O',profile:'SIM-P',lead:customer?'':'SIM-L',owner:ao,name:'Modal kerja toko Budi · Latihan',product,need:'Modal kerja Rp300 juta',type:customer?'Expansion':'New business',value:300000000,basis:'Plafon indikatif',probability:35,target:'Target akuisisi cabang',stage:process.name,stageId:process.id,slaDays:process.sla,entered:ts(),created:day(),closing:offset(14),outcome:'Aktif'});if(L()&&!L().customerConverted)L().status='Converted'}),
 step('Pantau pipeline dan nominal','Total nominal tahap menghitung seluruh Opportunity aktif sesuai filter.','Peluang',''),
 step('Buat Task dari Opportunity','Task tindak lanjut terkait ke kebutuhan produk yang spesifik, bukan aktivitas umum.','Aktivitas detail','',()=>db.tasks.push({id:'SIM-FOLLOW',profile:'SIM-P',opp:'SIM-O',lead:'',owner:ao,type,purpose:'Lengkapi dokumen untuk modal kerja toko',scheduled:day()+'T11:00',due:day()+'T17:00',status:'Terjadwal'}))
 ];
}
journeyPlan=function(scenario){
 if(scenario==='flow-complete'){
 const create=focusedFlow('flow-lead'),convert=focusedFlow('flow-convert'),tasks=focusedFlow('flow-task-customer'),opps=focusedFlow('flow-opportunity-customer');
 // Each stage uses the same identity; seed only once at Lead creation.
 return [...create,...convert.slice(1),...tasks.slice(1),...opps.slice(1)];
 }
 if(scenario.startsWith('flow-'))return focusedFlow(scenario);
 const plan=workflowPlanBefore(scenario);
 for(const step of plan)if(step.title==='Konfirmasi menjadi Nasabah'){
  const apply=step.apply;step.apply=()=>{apply();const l=db.leads.find(l=>l.id==='SIM-L');if(l)Object.assign(l,{status:'CustomerConverted',customerConverted:true,customerConvertedAt:journey?.started||now(),customerConversionBy:step.role});const p=profile('SIM-P');if(p)p.customerSource='Konversi Lead'};
 }
 return plan;
};
journeyChoose=function(){
 const choices=[['Cross-sell: Customer 360 → Opportunity → Task','flow-crosssell'],['Alur lengkap: Lead → Nasabah → Task → Opportunity','flow-complete'],['Buat Lead','flow-lead'],['Konversi Lead ke Nasabah','flow-convert'],['Buat Task dari Lead','flow-task-lead'],['Buat Task dari Nasabah','flow-task-customer'],['Buat Opportunity dari Lead','flow-opportunity-lead'],['Buat Opportunity dari Nasabah','flow-opportunity-customer'],['Akuisisi end-to-end berhasil','won'],['Opportunity Lost','lost'],['Opportunity Cancelled','cancelled'],['Lead tidak Qualified','unqualified'],['Peluang dari Nasabah existing — lengkap','existing']];
 modal('Pilih simulasi alur','<p>Putar contoh langkah pada layar aplikasi. Data latihan terpisah dari data kerja bersama.</p>'+'<label>Alur yang ingin dicoba<select name="scenario">'+choices.map(([label,code])=>'<option value="'+E(code)+'">'+E(label)+'</option>').join('')+'</select></label>'+'<p class="hint">Tersedia jeda, berikutnya, ulang, dan lompat langkah. Tidak ada data latihan yang dikirim ke backend.</p>',f=>{const code=choices.find(c=>c[1]===f.scenario)?.[1];if(!code)throw Error('Pilih skenario simulasi yang tersedia.');setTimeout(()=>journeyStart(code),0)});
 const save=document.querySelector('#form .actions button.primary');if(save)save.textContent='▶ Mulai simulasi';
};
const focusedJourneyShowBefore=journeyShow;
journeyShow=function(index){
 if(document.querySelector('#modal')?.open)document.querySelector('#modal').close();
 focusedJourneyShowBefore(index);
 const html=journey?.steps[journey.index]?.preview;
 if(html){document.querySelector('#app').insertAdjacentHTML('afterbegin',html);document.querySelectorAll('.simulationform input,.simulationform textarea').forEach(i=>i.readOnly=true)}
};
