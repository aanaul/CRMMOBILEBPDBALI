let journey=null,journeyTimer=null,journeySaved=null;
function journeyBase(existing=false){
 let d=seed();for(let k of ['profiles','leads','opps','tasks','activities','audit','applications','corrections'])d[k]=[];
 d.rfiDemo=true;d.config.stageSla=Object.fromEntries(stages.map(s=>[s,5]));
 if(existing)d.profiles.push({id:'SIM-P',name:'Budi Santoso · Latihan',contact:'Budi',phone:'080000000000',address:'Denpasar',businessAddress:'Denpasar',occupation:'Pemilik toko',owner:owners[0],relation:'Customer',cif:'LATIHAN-CIF',dataSource:'Data latihan'});
 return d;
}
function journeyPlan(scenario){
 const existing=scenario==='existing',unqualified=scenario==='unqualified';
 const step=(title,note,route,tab,role,apply=()=>{})=>({title,note,route,tab,role,apply});
 const ao=owners[0],supervisor='Supervisor';
 const P=()=>db.profiles.find(x=>x.id==='SIM-P'),L=()=>db.leads.find(x=>x.id==='SIM-L'),T=()=>db.tasks.find(x=>x.id==='SIM-T'),O=()=>db.opps.find(x=>x.id==='SIM-O'),AP=()=>db.applications.find(x=>x.id==='SIM-AP');
 const timestamp=()=>journey?.started||now(),date=()=>timestamp().slice(0,10);
 let steps=[];
 if(!existing){
 steps.push(step('Lead masuk melalui referral','AO mencatat identitas, sumber, jenis lead, kebutuhan awal, dan pemberi referral. Identitas cukup dibuat sekali.','Lead detail','Identitas',ao,()=>{
 db.profiles.push({id:'SIM-P',name:'Budi Santoso · Latihan',contact:'Budi',phone:'080000000000',address:'Denpasar',businessAddress:'Toko Budi, Denpasar',occupation:'Pemilik toko',owner:ao,relation:'Prospect'});
 db.leads.push({id:'SIM-L',profile:'SIM-P',source:'Referral Lead',referral:'Ayu — referral internal',referralInfo:'Dikenalkan oleh petugas cabang',leadType:'Perorangan',need:'Kebutuhan modal kerja toko Rp300 juta',product:'Kredit Produktif',owner:ao,createdBy:ao,created:date(),recorded:timestamp(),status:'New',qualification:'Belum dinilai',grade:'Cool'});
 }));
 steps.push(step('Task penjajakan untuk Lead','Telepon dijadwalkan dari detail Lead. Task ini belum memiliki opportunity.','Aktivitas detail','',ao,()=>db.tasks.push({id:'SIM-CALL',profile:'SIM-P',lead:'SIM-L',opp:'',type:'Telepon',purpose:'Konfirmasi kebutuhan modal kerja',owner:ao,scheduled:date()+'T09:00',due:date()+'T17:00',status:'Terjadwal'})));
 steps.push(step('Catat hasil dan tindak lanjut','Hasil telepon masuk Riwayat Aktivitas. Task selesai tidak otomatis mengonversi Lead.','Lead detail','Riwayat Aktivitas',ao,()=>{
 db.tasks[0].status='Selesai';db.activities.push({id:'SIM-A1',profile:'SIM-P',lead:'SIM-L',task:'SIM-CALL',type:'Telepon',owner:ao,result:'Tertarik',note:'Kebutuhan dikonfirmasi; lanjut kualifikasi dan survey awal.',occurred:timestamp(),recorded:timestamp()});
 }));
 steps.push(step(unqualified?'Lead tidak Qualified':'Kualifikasi Lead',unqualified?'Kebutuhan belum memenuhi kriteria awal. Tidak membuat opportunity.':'AO menilai kebutuhan dan potensi bisnis. Qualified adalah prasyarat assessment awal.','Lead detail','Kualifikasi',ao,()=>Object.assign(L(),{status:'In qualification',qualification:unqualified?'Tidak Qualified':'Qualified',grade:unqualified?'Cool':'Hot 1',potential:unqualified?'Kebutuhan belum sesuai target produk':'Usaha berjalan dan kebutuhan pembiayaan jelas'})));
 if(unqualified){steps.push(step('Tutup Lead dengan alasan','Task terbuka dibatalkan. Histori dan sumber referral tetap tersimpan untuk evaluasi.','Lead detail','Riwayat Perubahan',ao,()=>Object.assign(L(),{status:'Closed',reason:'Tidak memenuhi kriteria awal produk'})));return steps}
 }else{
 steps.push(step('Mulai dari Nasabah existing','AO membuka identitas Nasabah yang sudah tercatat. Peluang baru tidak membutuhkan duplikasi Lead.','Nasabah detail','Identitas',ao));
 }
 steps.push(step('Ajukan rencana kunjungan','Task Kunjungan membutuhkan approval supervisor sebelum dilaksanakan.','Aktivitas detail','',ao,()=>db.tasks.push({id:'SIM-T',profile:'SIM-P',lead:existing?'':'SIM-L',type:'Kunjungan',purpose:'Survey awal kebutuhan usaha',owner:ao,scheduled:date()+'T10:00',due:date()+'T17:00',status:'Terjadwal',approval:'Menunggu',approvalHistory:[{time:timestamp(),actor:ao,status:'Diajukan',note:'Rencana survey awal'}]})));
 steps.push(step('Supervisor mengembalikan rencana','Rencana dikembalikan untuk melengkapi tujuan dan menyesuaikan jadwal. Kunjungan belum dapat dimulai.','Persetujuan','',supervisor,()=>{T().approval='Dikembalikan';T().approvalHistory.push({time:timestamp(),actor:supervisor,status:'Dikembalikan',note:'Lengkapi tujuan survey'})}));
 steps.push(step('Revisi dan ajukan kembali','AO memperjelas tujuan. Permintaan kembali masuk antrean approval.','Aktivitas detail','',ao,()=>{T().purpose='Survey usaha dan konfirmasi kebutuhan modal';T().approval='Menunggu';T().approvalHistory.push({time:timestamp(),actor:ao,status:'Diajukan',note:'Tujuan dilengkapi'})}));
 steps.push(step('Rencana disetujui','Supervisor menyetujui kunjungan. AO baru dapat mulai pelaksanaan.','Aktivitas detail','',supervisor,()=>{T().approval='Disetujui';T().approvalHistory.push({time:timestamp(),actor:supervisor,status:'Disetujui',note:'Rencana lengkap'})}));
 steps.push(step('Perubahan jadwal perlu approval ulang','AO mengusulkan jadwal baru. Approval perubahan masih menunggu keputusan.','Aktivitas detail','',ao,()=>{T().pendingChange={scheduled:date()+'T13:00',due:date()+'T17:00',reason:'Nasabah tersedia siang hari'};T().approval='Perubahan diajukan'}));
 steps.push(step('Supervisor menyetujui perubahan','Jadwal baru berlaku setelah disetujui; histori jadwal tetap tercatat.','Aktivitas detail','',supervisor,()=>{T().scheduled=T().pendingChange.scheduled;T().due=T().pendingChange.due;delete T().pendingChange;T().approval='Disetujui';T().approvalHistory.push({time:timestamp(),actor:supervisor,status:'Disetujui',note:'Perubahan jadwal disetujui'})}));
 steps.push(step('Pelaksanaan kunjungan','Contoh check-in dan foto latihan. Pada pekerjaan sebenarnya, check-in memakai GPS serta foto dari perangkat.','Aktivitas detail','',ao,()=>Object.assign(T(),{checkin:timestamp(),status:'Dikerjakan',location:'Lokasi latihan · bukan GPS perangkat',locationSource:'Latihan',photo:'data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="220"><rect width="400" height="220" fill="#e7f2ed"/><text x="35" y="110" font-size="20" fill="#225b48">Foto kunjungan latihan</text></svg>')})));
 steps.push(step('Catat hasil kunjungan','Hasil tersimpan di Riwayat Aktivitas. Berikutnya AO melengkapi penilaian atau membuat peluang sesuai konteks.','Nasabah detail','Riwayat Aktivitas',ao,()=>{Object.assign(T(),{status:'Selesai',checkout:timestamp(),completed:timestamp()});db.activities.push({id:'SIM-A2',profile:'SIM-P',lead:existing?'':'SIM-L',task:'SIM-T',type:'Kunjungan',result:'Terlaksana / bertemu',note:'Usaha berjalan; kebutuhan modal Rp300 juta. Dokumen usaha perlu dilengkapi.',owner:ao,occurred:timestamp(),recorded:timestamp(),location:T().location,photo:T().photo})}));
 if(!existing)steps.push(step('Survey dan assessment awal','AO menyimpan hasil survey, informasi usaha, gambaran keuangan, dan kesimpulan. Ini bukan approval kredit.','Lead detail','Survey & Assessment',ao,()=>{L().assessment={date:date(),survey:'Toko aktif beroperasi',business:'Perdagangan kebutuhan harian, berjalan 5 tahun',financial:'Gambaran awal dari wawancara; belum diverifikasi Bank',conclusion:'Lanjut pembahasan kebutuhan dan dokumen',actor:ao,recorded:timestamp()}}));
 steps.push(step('Ajukan koreksi data','AO mengusulkan koreksi alamat. Data lama tetap berlaku selama menunggu supervisor.','Persetujuan','',ao,()=>db.corrections.push({id:'SIM-CR',kind:'profile',record:'SIM-P',field:'address',before:P().address,proposed:'Jl. Usaha No. 10, Denpasar',reason:'Alamat diverifikasi saat kunjungan latihan',owner:ao,status:'Menunggu',created:timestamp()})));
 steps.push(step('Supervisor memvalidasi koreksi','Data baru berlaku setelah persetujuan. Nilai lama, usulan, alasan, dan pemberi keputusan tetap tercatat.','Nasabah detail','Identitas',supervisor,()=>{let cr=db.corrections[0];cr.status='Disetujui';cr.reviewer=supervisor;cr.reviewed=timestamp();P().address=cr.proposed}));
 steps.push(step(existing?'Buat opportunity dari Nasabah':'Konversi Lead ke Opportunity','Peluang spesifik memiliki nilai, probability, target closing, tahap, dan owner. Status Nasabah tidak otomatis berubah.','Opportunity detail','',ao,()=>{db.opps.push({id:'SIM-O',profile:'SIM-P',lead:existing?'':'SIM-L',name:'Modal kerja toko Budi · Latihan',product:'Kredit Produktif',need:'Modal kerja Rp300 juta',value:300000000,basis:'Plafon indikatif',probability:35,target:'Target akuisisi cabang',owner:ao,stage:stages[0],created:date(),entered:timestamp(),closing:date(),outcome:'Aktif'});if(L())L().status='Converted'}));
 steps.push(step('Follow-up terkait Opportunity','Task pengumpulan dokumen terkait opportunity, bukan lagi penjajakan umum Lead.','Aktivitas detail','',ao,()=>db.tasks.push({id:'SIM-FOLLOW',profile:'SIM-P',opp:'SIM-O',type:'Cek dokumen',purpose:'Lengkapi dokumen modal kerja',owner:ao,scheduled:date()+'T14:00',due:date()+'T17:00',status:'Terjadwal'})));
 steps.push(step('Monitoring SLA dan total pipeline','Umur tahap dibandingkan SLA. Total stage menghitung opportunity aktif yang relevan. Tahap mengikuti parameter aplikasi.','Peluang','',supervisor,()=>{O().entered=new Date(Date.parse(timestamp())-8*86400000).toISOString()}));
 steps.push(step('Perbarui tahap dan probability','AO memperbarui progres pemasaran. Tahap pemasaran terpisah dari status pengajuan resmi.','Opportunity detail','',ao,()=>Object.assign(O(),{stage:stages[1]||stages[0],entered:timestamp(),probability:60})));
 steps.push(step('Tautkan nomor pengajuan latihan','Nomor LATIHAN-APP-001 hanya referensi simulasi. Tidak diterbitkan sistem Bank.','Pengajuan','',ao,()=>db.applications.push({id:'SIM-AP',profile:'SIM-P',opp:'SIM-O',number:'LATIHAN-APP-001',product:'Kredit Produktif',source:'Data latihan / input manual',survey:'Selesai',analysis:'Dalam proses',approval:'Belum diputuskan',disbursement:'Belum dicairkan',updated:timestamp(),history:[{time:timestamp(),actor:ao,note:'Pengajuan latihan ditautkan'}]})));
 const result=scenario==='lost'?'Lost':scenario==='cancelled'?'Cancelled':'Won';
 steps.push(step('Tracking status pengajuan',result==='Won'?'Status analisa, approval, dan pencairan diperbarui sebagai contoh manual. Riwayat sumber tercatat.':'Status dan alasan hasil pengajuan dicatat tanpa otomatis menutup opportunity.','Pengajuan','',ao,()=>{Object.assign(AP(),{analysis:'Selesai',approval:result==='Won'?'Disetujui':result==='Lost'?'Ditolak':'Belum diputuskan',disbursement:result==='Won'?'Dicairkan':'Belum dicairkan'});AP().history.push({time:timestamp(),actor:ao,note:'Pembaruan manual latihan: '+result})}));
 steps.push(step('Tutup Opportunity: '+result,'AO mencatat hasil dan alasan secara terpisah. Task terbuka dibatalkan; histori tetap tersedia.','Opportunity detail','',ao,()=>{Object.assign(O(),{outcome:result,closed:timestamp(),reason:result==='Won'?'Realisasi dikonfirmasi dalam skenario latihan':result==='Lost'?'Tidak berhasil memenuhi kebutuhan':'Kebutuhan ditarik oleh pemohon',reference:'LATIHAN-APP-001'});db.tasks.filter(t=>t.opp==='SIM-O'&&isOpen(t)).forEach(t=>{t.status='Dibatalkan';t.cancelReason='Opportunity ditutup'})}));
 if(result==='Won'&&!existing)steps.push(step('Konfirmasi menjadi Nasabah','Konfirmasi hubungan resmi dilakukan terpisah oleh supervisor dengan referensi. Identitas dan histori tetap sama.','Nasabah detail','Identitas',supervisor,()=>Object.assign(P(),{relation:'Customer',cif:'LATIHAN-CIF',reference:'Konfirmasi onboarding latihan'})));
 if(result==='Won')steps.push(step('Relationship dan follow-up berikutnya','Task pemeliharaan hubungan terkait Nasabah. Kebutuhan baru dapat menjadi opportunity tambahan.','Nasabah detail','Task',ao,()=>db.tasks.push({id:'SIM-REL',profile:'SIM-P',opp:'',type:'Telepon',purpose:'Follow-up hubungan pascarealisasi',owner:ao,scheduled:offset(7)+'T10:00',due:offset(7)+'T17:00',status:'Terjadwal'})));
 steps.push(step('Evaluasi hasil dan histori','Monitoring dan laporan menggunakan status akhir. Opportunity ditutup keluar dari pipeline aktif; sumber referral tetap terhubung.','Laporan','',supervisor));
 return steps;
}
function journeyChoose(){
 modal('Simulasi proses end-to-end','<p>Ikuti perubahan data di layar aplikasi, dari awal sampai hasil akhir. Sesi latihan terpisah dari data kerja.</p>'+select('Skenario','scenario',['Akuisisi berhasil','Opportunity Lost','Opportunity Cancelled','Lead tidak Qualified','Peluang dari Nasabah existing'])+'<p class="hint">GPS, foto, nomor pengajuan, dan status Bank pada sesi ini adalah contoh latihan.</p>',f=>{setTimeout(()=>journeyStart(({'Akuisisi berhasil':'won','Opportunity Lost':'lost','Opportunity Cancelled':'cancelled','Lead tidak Qualified':'unqualified','Peluang dari Nasabah existing':'existing'})[f.scenario]),0)});
 let save=document.querySelector('#form .actions button.primary');if(save)save.textContent='▶ Mulai simulasi';
}
function journeyStart(scenario){
 if(journey)journeyExit();
 journeySaved={db,view,focus,role:actor(),backListState};
 journey={scenario,index:0,playing:false,started:now(),delay:6500};journey.steps=journeyPlan(scenario);journeyShow(0);journeyPlay();
}
function journeyShow(index){
 if(!journey)return;clearTimeout(journeyTimer);
 journey.index=Math.max(0,Math.min(index,journey.steps.length-1));db=journeyBase(journey.scenario==='existing');
 for(let i=0;i<=journey.index;i++){let s=journey.steps[i];s.apply();db.audit.unshift({id:'SIM-H'+i,action:s.title,object:s.route==='Lead detail'?'SIM-L':s.route==='Aktivitas detail'?(i<3?'SIM-CALL':i>14?'SIM-FOLLOW':'SIM-T'):s.route==='Pengajuan'?'SIM-AP':'SIM-O',actor:s.role,detail:s.note,time:journey.started})}
 let s=journey.steps[journey.index];document.querySelector('#role').value=s.role;
 resetLists();view=s.route;focus=s.route==='Lead detail'?'SIM-L':s.route==='Nasabah detail'?'SIM-P':s.route==='Opportunity detail'?'SIM-O':s.route==='Aktivitas detail'?(db.tasks.some(t=>t.id==='SIM-FOLLOW')?'SIM-FOLLOW':db.tasks.some(t=>t.id==='SIM-T')?'SIM-T':'SIM-CALL'):'';
 if(view==='Peluang')listKind='Pipeline';
 if(typeof recordTab!=='undefined'){recordTabFocus=view+focus;recordTab=s.tab||'Identitas'}
 render();document.querySelector('main')?.scrollTo(0,0);
 if(journey.index===journey.steps.length-1)journey.playing=false;
 journeyBar();journeySchedule();
}
function journeySchedule(){clearTimeout(journeyTimer);if(journey?.playing&&journey.index<journey.steps.length-1)journeyTimer=setTimeout(()=>journeyShow(journey.index+1),journey.delay)}
function journeyPlay(){if(!journey)return;if(journey.index===journey.steps.length-1){journey.playing=true;journeyShow(0);return}journey.playing=!journey.playing;journeyBar();journeySchedule()}
function journeyNext(delta){if(!journey)return;journey.playing=false;journeyShow(journey.index+delta)}
function journeyExit(){
 clearTimeout(journeyTimer);if(!journeySaved)return;
 let saved=journeySaved;journey=null;journeySaved=null;db=saved.db;view=saved.view;focus=saved.focus;backListState=saved.backListState;document.querySelector('#role').value=saved.role;resetLists();document.querySelector('#journeyPlayer')?.remove();render();
}
function journeyBar(){
 let el=document.querySelector('#journeyPlayer');if(!journey){el?.remove();return}
 if(!el){el=document.createElement('section');el.id='journeyPlayer';document.querySelector('main header').after(el)}
 let s=journey.steps[journey.index];
 el.innerHTML='<div class="journeytop"><strong>SIMULASI ALUR</strong><span>'+ (journey.index+1)+' / '+journey.steps.length+' · '+E(s.role)+'</span><button onclick="journeyExit()" aria-label="Keluar simulasi">✕</button></div><progress value="'+(journey.index+1)+'" max="'+journey.steps.length+'"></progress><h2>'+E(s.title)+'</h2><p>'+E(s.note)+'</p><div class="journeycontrols"><button onclick="journeyNext(-1)" '+(journey.index===0?'disabled':'')+'>‹</button><button class="primary" onclick="journeyPlay()">'+(journey.playing?'Ⅱ Jeda':journey.index===journey.steps.length-1?'↻ Ulang':'▶ Putar')+'</button><button onclick="journeyNext(1)" '+(journey.index===journey.steps.length-1?'disabled':'')+'>Berikutnya ›</button><select aria-label="Kecepatan simulasi" onchange="journey.delay=Number(this.value);journeySchedule()">'+[4000,6500,10000].map(ms=>'<option value="'+ms+'" '+(journey.delay===ms?'selected':'')+'>'+ms/1000+' dtk</option>').join('')+'</select></div><details><summary>Lompat ke langkah</summary><div class="journeysteps">'+journey.steps.map((s,i)=>'<button onclick="journeyNext('+ (i-journey.index)+')" '+(i===journey.index?'aria-current="step"':'')+'>'+ (i+1)+'. '+E(s.title)+'</button>').join('')+'</div></details>';
}
const journeyRecordBefore=record;
record=function(action,object,detail=''){if(!journey)return journeyRecordBefore(action,object,detail);db.audit.unshift({id:uid('SIM-H'),action,object,detail,actor:actor(),time:now()});render()};
const journeyRenderBefore=render;
render=function(){journeyRenderBefore();if(!journey){let header=document.querySelector('main header');if(!document.querySelector('#journeyLaunch')){let b=document.createElement('button');b.id='journeyLaunch';b.textContent=mobile?'▶ Simulasi':'▶ Putar Simulasi Alur';b.onclick=journeyChoose;header.insertBefore(b,header.querySelector('.user'))}}else document.querySelector('#journeyLaunch')?.remove();journeyBar()};
const journeyContentBefore=renderContent;
renderContent=function(){journeyContentBefore();journeyBar()};
render();
const journeyGoBefore=go;
go=function(v,id=''){if(journey&&v==='Pengaturan')return toast('Keluar dari simulasi untuk membuka pengaturan data kerja.');if(journey){journey.playing=false;clearTimeout(journeyTimer)}journeyGoBefore(v,id)};
