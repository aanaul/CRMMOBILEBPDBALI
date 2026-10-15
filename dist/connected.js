const API_ORIGIN='https://jarivis-crm-focus-cms.aaul72.chatgpt.site';
let authUser=null,memberList=[],serverBase=null,serverRevision=0,saving=false,serverQueue=Promise.resolve(),pollTimer=null,leadChip='Aktif',appSearch='',configTab='products',syncMessage='Terhubung';
const clone=x=>JSON.parse(JSON.stringify(x)),jsonSame=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const linkedCollections=['profiles','leads','opps','tasks','activities','applications','corrections'];
const masters=()=>db.config.masters;
const activeMaster=(kind)=>masters()?.[kind]?.filter(x=>x.active)||[];
const stageDefs=()=>masters()?.stages||[];
const currentToken=()=>sessionStorage.getItem('bpd-session')||'';
async function api(path,data,method){
 let r=await fetch(API_ORIGIN+'/api/'+path,{method:method||(data?'POST':'GET'),headers:{'Content-Type':'application/json',...(currentToken()?{Authorization:'Bearer '+currentToken()}: {})},...(data?{body:JSON.stringify(data)}:{})});
 let result;try{result=await r.json()}catch{throw Error('Server belum merespons. Coba lagi.')}
 if(!r.ok){let e=Object.assign(Error(result.error||'Permintaan gagal'),{status:r.status});if(r.status===401&&path!=='login')logoutLocal();throw e}return result;
}
function loginPage(message=''){
 if(document.querySelector('#modal')?.open)document.querySelector('#modal').close();
 let root=document.querySelector('#loginRoot');if(!root){root=document.createElement('div');root.id='loginRoot';document.body.append(root)}
 root.innerHTML='<div class="loginhero"><div class="loginbrand">BPD BALI</div><span class="loginbrandline"></span><h2>Membangun relasi.<br>Menumbuhkan peluang.</h2><p>Satu ruang kerja untuk mendampingi nasabah dan mengembangkan potensi Bali.</p></div><section class="loginpanel"><span class="bankword">BPD BALI</span><div class="loginaccent"></div><small>RELATIONSHIP MANAGEMENT</small><h1>Selamat datang</h1><p>Masuk untuk melanjutkan pekerjaan Anda.</p><form id="loginForm"><label>User ID<input name="id" autocomplete="username" placeholder="Masukkan User ID" required></label><label>Password<div class="passwordwrap"><input name="password" type="password" autocomplete="current-password" placeholder="Masukkan password" required><button type="button" onclick="const p=this.previousElementSibling;p.type=p.type===\'password\'?\'text\':\'password\';this.textContent=p.type===\'password\'?\'Lihat\':\'Sembunyikan\'">Lihat</button></div></label><div id="loginError" role="alert">'+E(message)+'</div><button class="primary loginbutton">Masuk</button></form><div class="loginfoot">CRM BPD Bali · Cabang Denpasar<br>Hubungi Superadmin jika akses Anda bermasalah.</div></section>';
 document.documentElement.classList.add('auth-pending');
 document.querySelector('#loginForm').onsubmit=async e=>{e.preventDefault();let f=e.target,b=f.querySelector('.loginbutton');b.disabled=true;b.textContent='Memeriksa akun…';document.querySelector('#loginError').textContent='';try{let values=Object.fromEntries(new FormData(f)),r=await api('login',values);sessionStorage.setItem('bpd-session',r.token);await bootConnected()}catch(err){document.querySelector('#loginError').textContent=err.message}finally{b.disabled=false;b.textContent='Masuk'}};
}
function logoutLocal(){if(typeof journey!=='undefined'&&journey)journeyExit();authUser=null;BPD_USER=null;serverBase=null;sessionStorage.removeItem('bpd-session');clearInterval(pollTimer);loginPage()}
async function logoutConnected(){try{await api('logout',{})}catch{}logoutLocal()}
function applyServer(result){
 authUser=result.user||authUser;BPD_USER=authUser;db=result.data;serverBase=clone(db);serverRevision=result.revision;
 BPD_MASTERS=db.config.masters;
 const process=stageDefs().filter(x=>x.type==='process').map(x=>x.name);stages.splice(0,stages.length,...process);
 if(memberList.length)owners.splice(0,owners.length,...memberList.filter(m=>m.role==='AO'&&m.active!==false).map(m=>m.name));
 syncMessage='Tersinkron';render();
}
async function bootConnected(){
 let s=await api('state');authUser=s.user;BPD_USER=authUser;
 memberList=(await api('members')).members;
 document.querySelector('#loginRoot')?.remove();document.documentElement.classList.remove('auth-pending');
 view=mobile?'Home':'Monitoring';focus='';resetLists();applyServer(s);
 clearInterval(pollTimer);pollTimer=setInterval(pollConnected,5000);
 if(typeof maybeStartTour==='function')maybeStartTour();
}
async function pollConnected(){
 if(!authUser||saving||journey||document.querySelector('#modal')?.open)return;
 try{let s=await api('state');if(s.revision!==serverRevision||!jsonSame(s.user,authUser)||!jsonSame(s.data.notifications,db.notifications)){memberList=(await api('members')).members;applyServer(s)}}catch(e){if(e.status!==401){syncMessage='Koneksi terputus';renderSyncStatus()}}
}
const simulationRecordForLocal=record;
record=function(action,object,detail=''){
 if(journey)return simulationRecordForLocal(action,object,detail);
 if(!authUser||!serverBase)throw Error('Silakan login terlebih dahulu.');
 // Snapshot each transition; serialize requests and diff against acknowledged server data.
 let desired=clone(db);saving=true;syncMessage='Menyimpan…';renderSyncStatus();
 serverQueue=serverQueue.then(async()=>{
 const changes=[];
 for(const collection of linkedCollections){
 const prior=serverBase[collection]||[];
 for(const next of desired[collection]||[]){
 let before=prior.find(x=>x.id===next.id)||null;
 if(collection==='opps'){
 if(!before&&!next.lead&&profile(next.profile)?.relation!=='Customer'){let l=desired.leads.find(l=>l.profile===next.profile&&l.qualification==='Qualified'&&!l.customerConverted);if(l)next.lead=l.id}
 let s=stageDefs().find(s=>s.id===next.stageId)||stageDefs().find(s=>s.name===next.stage)||stageDefs().find(s=>s.type==='process'&&s.active);
 if(!before&&!stageDefs().some(s=>s.name===next.stage)){next.stage=s.name}
 if(s){next.stageId=s.id;next.outcome=({process:'Aktif',won:'Won',lost:'Lost',cancelled:'Cancelled'})[s.type];next.slaDays=next.slaDays??Number(s.sla)}
 }
 if(!before){next.ownerId=next.ownerId||memberList.find(m=>m.name===next.owner)?.id;if(!next.owner){next.owner=authUser.name;next.ownerId=authUser.id}}
 if(!jsonSame(before,next))changes.push({collection,id:next.id,before,next});
 }
 }
 if(!changes.length)return;
 let result=await api('sync',{changes,action,object,detail});applyServer(result);toast('Perubahan tersimpan');
 }).catch(async e=>{toast(e.message);try{applyServer(await api('state'))}catch{}}).finally(()=>{saving=false;renderSyncStatus()});
 render();
};
const actorBeforeConnected=actor;
actor=function(){return journey?actorBeforeConnected():authUser?.name||''};
mine=function(x){return !!x&&(journey?actor()==='Supervisor'||actor()==='Administrator'||x.owner===actor():!!authUser&&(authUser.role!=='AO'||x.ownerId===authUser.id||x.owner===authUser.name))};
currentAccount=function(){if(journey){const name=actor();return {name,role:name==='Supervisor'?'Supervisor':name,initials:name.split(' ').map(n=>n[0]).slice(0,2).join('')}}return {name:authUser?.name||'',role:authUser?.role||'',initials:(authUser?.name||'').slice(0,2).toUpperCase()}};
openAccount=function(){modal('Profil pengguna',detailFacts([['Nama',authUser.name],['User ID',authUser.id],['Role',authUser.role],['Cabang','Denpasar']])+'<div class="actions">'+btn('Ubah password',"document.querySelector('#modal').close();changeOwnPassword()")+btn('Keluar',"document.querySelector('#modal').close();logoutConnected()")+'</div>',()=>{});document.querySelector('#form .actions:last-child .primary')?.remove()};
function changeOwnPassword(){modal('Ubah password',field('Password saat ini','current','','password',true)+field('Password baru (minimal 6 karakter)','password','','password',true),f=>{api('password',f).then(()=>{logoutLocal();toast('Password diubah. Silakan masuk kembali.')}).catch(e=>toast(e.message))})}
applicationInfo=function(){modal('Informasi aplikasi',detailFacts([['Aplikasi','BPD Bali CRM'],['Data','Backend bersama · CMS dan mobile'],['Akun',authUser.name+' / '+authUser.role],['Sinkronisasi',syncMessage],['Sumber status pengajuan','Input manual pengguna'],['Integrasi sistem Bank','Belum dikonfigurasi']]),()=>{})};
function renderSyncStatus(){let n=document.querySelector('#syncState');if(n)n.textContent=syncMessage}
const renderBeforeConnected=render;
render=function(){
 renderBeforeConnected();
 document.querySelector('.brand')&&(document.querySelector('.brand').innerHTML='BPD Bali<small>RELATIONSHIP WORKSPACE</small>');
 if(!authUser)return;
 let header=document.querySelector('main header');if(!document.querySelector('#syncState')){let s=document.createElement('small');s.id='syncState';header.append(s)}renderSyncStatus();
 if(!mobile&&authUser.role==='Superadmin'){
 let nav=document.querySelector('#nav');if(!nav.querySelector('[data-member]')){let b=document.createElement('button');b.dataset.member='1';b.textContent='Member';b.className=view==='Member'?'active':'';b.onclick=()=>go('Member');let settings=[...nav.children].find(b=>b.textContent==='Pengaturan');nav.insertBefore(b,settings||null)}
 }
 if(mobile&&view==='Home'&&authUser.role==='Superadmin'){let grid=document.querySelector('.homemenus');if(grid&&!grid.querySelector('[data-member]')){let b=document.createElement('button');b.dataset.member='1';b.innerHTML=mobileIcon('users')+'<strong>Member</strong><small>Kelola akun dan role</small>';b.onclick=()=>go('Member');grid.append(b)}}
 if(mobile&&view==='Profil User'){let actions=document.querySelector('.profileactions');if(actions&&!actions.querySelector('[data-logout]')){actions.insertAdjacentHTML('beforeend','<button data-logout onclick="changeOwnPassword()">Ubah password <span>›</span></button><button onclick="logoutConnected()">Keluar <span>›</span></button>')}}
 if(!journey){document.querySelector('#role').innerHTML='<option>'+E(authUser.name)+'</option>';document.querySelector('#user').innerHTML='<strong>'+E(authUser.name)+'</strong><small>'+E(authUser.role)+'</small>'}
 wireTableRows();cleanConnectedLabels();
};
function wireTableRows(){document.querySelectorAll('#app tbody tr').forEach(row=>{let target=[...row.querySelectorAll('button[onclick]')].find(b=>/go\('(Lead detail|Opportunity detail|Aktivitas detail|Nasabah detail)'/.test(b.getAttribute('onclick')));if(!target)return;row.tabIndex=0;row.classList.add('clickablerow');row.setAttribute('role','link');row.onclick=e=>{if(!e.target.closest('button,a,input,select,textarea,label'))target.click()};row.onkeydown=e=>{if(e.target===row&&['Enter',' '].includes(e.key)){e.preventDefault();target.click()}}})}
function cleanConnectedLabels(){
 for(const root of [document.querySelector('#app'),document.querySelector('#modal')]){if(!root)continue;let w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),n;while(n=w.nextNode()){if(['SCRIPT','STYLE'].includes(n.parentElement?.tagName))continue;n.nodeValue=n.nodeValue.replace(/Buat next action|Tambah Task|Buat follow-up|Buat next Action/g,'Buat Task').replace(/Next action|next action/g,'Task berikutnya').replace(/CustomerConverted/g,'Dikonversi ke Nasabah').replace(/In qualification/g,'Dalam Kualifikasi').replace(/^New$/,'Baru')}}
}
const baseSelect=select;
select=function(label,name,arr,val=''){
 if(BPD_MASTERS){let key=name==='reasonCode'?'reasons':name==='reason'&&label==='Alasan'?'reasons':name==='product'?'products':name==='source'&&label.toLowerCase().includes('sumber lead')?'sources':name==='type'&&(/aktivitas|follow-up/i.test(label))?'activities':null;
 if(key){arr=activeMaster(key).map(x=>x.name);if(name==='product')arr=['Belum diketahui',...arr];if(val&&!arr.includes(val))arr=[val,...arr]}
 }return baseSelect(label,name,arr,val);
};
const connectedModalBefore=modal;
modal=function(title,html,handler){connectedModalBefore(title,html,handler);cleanConnectedLabels()};
stageLimit=function(o){return Number(o.slaDays??db.config.stageSla[o.stage]??db.config.aging)};
function leadLifecycle(l){if(l.customerConverted||l.status==='CustomerConverted')return 'Dikonversi ke Nasabah';if(l.status==='Closed')return 'Ditutup';if(l.qualification==='Qualified')return 'Qualified';if(l.qualification==='Tidak Qualified')return 'Tidak Qualified';return l.status==='New'?'Baru':'Dalam Kualifikasi'}
const listBeforeConnected=getList;
getList=function(name=view){
 if(name==='Leads')return db.leads.filter(l=>mine(l)&&(!listOwner||l.owner===listOwner)&&(!listQuery||[pname(l.profile),l.need,l.id].join(' ').toLowerCase().includes(listQuery.toLowerCase()))&&(leadChip==='Semua'||leadChip==='Aktif'?!['Dikonversi ke Nasabah','Ditutup'].includes(leadLifecycle(l))||leadChip==='Semua':leadLifecycle(l)===leadChip)&&(!listSource||l.source===listSource)&&(!listGrade||l.grade===listGrade)&&(!listPeriod||l.created.startsWith(listPeriod)));
 return listBeforeConnected(name);
};
const scaleListBeforeConnected=scaleList;
scaleList=function(){
 let html=scaleListBeforeConnected();
 if(view==='Leads'){
 const chips=['Aktif','Semua','Baru','Dalam Kualifikasi','Qualified','Tidak Qualified','Dikonversi ke Nasabah','Ditutup'];
 const total=db.leads.filter(mine);html=html.replace('<div class="scaletools">','<div class="rangechips leadchips">'+chips.map(c=>'<button class="'+(leadChip===c?'active':'')+'" onclick="leadChip=\''+c+'\';listPage=1;renderContent()">'+c+' <b>'+total.filter(l=>c==='Semua'||c==='Aktif'?!['Dikonversi ke Nasabah','Ditutup'].includes(leadLifecycle(l))||c==='Semua':leadLifecycle(l)===c).length+'</b></button>').join('')+'</div><div class="scaletools">');
 }

 return html;
};
const leadDetailBeforeConnected=leadRecordDetail;
leadRecordDetail=function(l){
 let html=leadDetailBeforeConnected(l),locked=l.customerConverted||l.status==='CustomerConverted';
 if(locked){let box=document.createElement('div');box.innerHTML=html;box.querySelectorAll('.recordhero .actions button').forEach(b=>{if(b.textContent!=='Tambah Task')b.remove()});html=box.innerHTML;html='<div class="lockednotice">Dikonversi ke Nasabah · '+E(l.customerConversionBy||'')+' · Data Lead terkunci. '+btn('Buka Nasabah',"go('Nasabah detail','"+l.profile+"')")+'</div>'+html}
 else html=html.replace('</section>','<div class="actions">'+btn('Konversi ke Nasabah',"convertLeadCustomer('"+l.id+"')",true)+(l.qualification==='Qualified'?btn('Buat Opportunity',"newOpp('"+l.profile+"','"+l.id+"')"):'')+'</div></section>');
 return html;
};
for(const fn of []){}
function guardConvertedLead(id){let l=db.leads.find(l=>l.id===id);if(!l||l.customerConverted||l.status==='CustomerConverted')throw Error('Lead sudah menjadi Nasabah dan terkunci.');return l}
const editLeadBefore=leadIdentityEdit,qualifyBefore=qualify,assessBefore=assessment,closeLeadBefore=closeLead,reopenBefore=reopenRecord;
leadIdentityEdit=function(id){try{guardConvertedLead(id);editLeadBefore(id)}catch(e){toast(e.message)}};
qualify=function(id){try{guardConvertedLead(id);qualifyBefore(id)}catch(e){toast(e.message)}};
assessment=function(id){try{guardConvertedLead(id);assessBefore(id)}catch(e){toast(e.message)}};
closeLead=function(id){try{guardConvertedLead(id);closeLeadBefore(id)}catch(e){toast(e.message)}};
reopenRecord=function(kind,id){try{if(kind==='lead')guardConvertedLead(id);reopenBefore(kind,id)}catch(e){toast(e.message)}};
function convertLeadCustomer(id){
 let l;try{l=guardConvertedLead(id)}catch(e){return toast(e.message)}
 modal('Konversi Lead ke Nasabah','<p>Identitas, Task, Opportunity dan histori tetap terhubung. Lead tidak dapat dikembalikan ke Baru atau Dalam Kualifikasi.</p>'+field('CIF (jika sudah tersedia)','cif')+field('NIK (opsional, 16 digit)','nik')+field('Referensi konfirmasi Nasabah','reference','','text',true),f=>{
 if(saving)throw Error('Tunggu penyimpanan selesai.');api('convert',{...f,profile:l.profile,lead:l.id}).then(r=>{applyServer(r);go('Nasabah detail',l.profile);toast('Lead berhasil dikonversi menjadi Nasabah')}).catch(e=>toast(e.message));
 });
}
confirmCustomer=function(pid){let l=db.leads.find(l=>l.profile===pid);if(l)convertLeadCustomer(l.id);else toast('Nasabah dibuat langsung melalui menu Nasabah.')};
function directCustomer(){
 modal('Buat Nasabah',field('Nama orang / perusahaan','name','','text',true)+field('CIF','cif')+field('NIK (16 digit)','nik')+field('Nama kontak','contact')+field('Nomor telepon','phone','','tel',true)+field('Alamat','address')+field('Alamat usaha / tempat bekerja','businessAddress')+field('Pekerjaan / bidang usaha','occupation')+ownerSelect(),f=>{
 if(f.nik&&!/^\d{16}$/.test(f.nik))throw Error('NIK harus 16 digit.');if(db.profiles.some(p=>normalize(p.phone)===normalize(f.phone)))throw Error('Nomor kontak sudah tercatat. Periksa Lead/Nasabah existing.');
 let p={...f,id:uid('P'),relation:'Customer',customerSource:'Input Langsung',dataSource:'Pencatatan CRM',created:now()};db.profiles.push(p);record('Buat Nasabah langsung',p.id,f.name);go('Nasabah detail',p.id);
 });
}
const customerDetailBeforeConnected=nasabahRecordDetail;
nasabahRecordDetail=function(p){let html=customerDetailBeforeConnected(p);if(recordTab==='Identitas')html+=detailPanel('Asal Nasabah',detailFacts([['Sumber',p.customerSource||'Data existing'],['Tanggal konversi',p.convertedAt?fmt(p.convertedAt):''],['Referensi konfirmasi',p.reference]]));return html};
changeStage=function(id){
 let o=opp(id);if(!o||!mine(o))return toast('Opportunity tidak tersedia.');
 let defs=stageDefs().filter(s=>s.active||s.id===o.stageId);
 modal('Ubah tahap Opportunity','<label>Tahap<select name="stageId">'+defs.map(s=>'<option value="'+E(s.id)+'" '+(s.id===o.stageId||s.name===o.stage?'selected':'')+'>'+E(s.name)+'</option>').join('')+'</select></label>'+select('Kategori alasan','reasonCode',activeMaster('reasons').map(r=>r.name))+area('Alasan perubahan / bukti hasil','reason','',true)+field('Referensi (jika ada)','reference'),f=>{
 let s=stageDefs().find(s=>s.id===f.stageId),old=o.stage;if(!s)throw Error('Pilih tahap.');
 if(!s.active&&s.name!==o.stage)throw Error('Tahap tidak aktif.');
 if(s.type!=='process'){o.lastProcessStage=o.stage;db.tasks.filter(t=>t.opp===id&&isOpen(t)).forEach(t=>{t.status='Dibatalkan';t.cancelReason='Opportunity ditutup: '+f.reason});o.closed=now()}else delete o.closed;
 Object.assign(o,{stage:s.name,stageId:s.id,outcome:({process:'Aktif',won:'Won',lost:'Lost',cancelled:'Cancelled'})[s.type],reason:f.reason,reasonCode:f.reasonCode,reference:f.reference,slaDays:Number(s.sla),entered:now()});record('Ubah tahap Opportunity',id,old+' → '+s.name+' / '+f.reason);
 });
};
closeOpp=changeStage;
function applicationListConnected(){
 let filtered=visible(db.applications).filter(a=>[a.number,pname(a.profile),opp(a.opp)?.name].join(' ').toLowerCase().includes(appSearch.toLowerCase())),items=pageItems(filtered);
 return titleBlock('Pengajuan','Referensi dan perkembangan pengajuan terkait Opportunity.')+'<div class="searchbox"><input aria-label="Cari pengajuan" placeholder="Cari nomor, nama Lead/Nasabah atau Opportunity" value="'+E(appSearch)+'" oninput="applicationSearch(this.value)"></div><div class="listhead"><strong>'+filtered.length+' pengajuan</strong></div><div class="records">'+(items.map(applicationCard).join('')||empty('Tidak ada pengajuan sesuai pencarian.'))+'</div>'+pager(filtered.length);
}
let applicationSearchTimer;
function applicationSearch(v){appSearch=v;listPage=1;clearTimeout(applicationSearchTimer);applicationSearchTimer=setTimeout(()=>{renderContent();let i=document.querySelector('input[aria-label="Cari pengajuan"]');i?.focus();i?.setSelectionRange(v.length,v.length)},180)}
function memberScreen(){
 if(authUser.role!=='Superadmin')return empty('Hanya Superadmin dapat mengelola Member.');
 return titleBlock('Member','Kelola akun, role, dan akses pengguna.',btn('Buat Member','memberForm()',true))+'<div class="scrolltable"><table class="datatable membertable"><thead><tr><th>Nama / User ID</th><th>Role</th><th>Status</th><th>Aksi</th></tr></thead><tbody>'+memberList.map(m=>'<tr><td><strong>'+E(m.name)+'</strong><small>'+E(m.id)+'</small></td><td>'+E(m.role)+'</td><td>'+badge(m.active?'Aktif':'Nonaktif')+'</td><td>'+btn('Edit',"memberForm('"+m.id+"')")+'</td></tr>').join('')+'</tbody></table></div>';
}
function memberForm(id=''){
 let m=memberList.find(m=>m.id===id)||{};
 modal(id?'Edit Member':'Buat Member',(id?'<p>User ID: <b>'+E(m.id)+'</b></p>':field('User ID (huruf kecil, minimal 3 karakter)','id','','text',true))+field('Nama','name',m.name||'','text',true)+select('Role','role',['AO','SPV','Superadmin'],m.role||'AO')+select('Status akun','status',['Aktif','Nonaktif'],m.active===false?'Nonaktif':'Aktif')+field(id?'Reset password (kosongkan jika tidak diubah)':'Password awal','password','','password',!id)+'<p class="hint">Akun langsung aktif tanpa aktivasi email. Mengubah role, menonaktifkan, atau mereset password akan mengakhiri sesi akun tersebut.</p>',f=>{
 api('members',{...f,id:id||f.id,active:f.status==='Aktif'},id?'PATCH':'POST').then(async()=>{memberList=(await api('members')).members;applyServer(await api('state'));toast('Member tersimpan')}).catch(e=>toast(e.message));
 });
}
function configScreenConnected(){
 if(authUser.role!=='Superadmin')return titleBlock('Pengaturan','Parameter kerja yang berlaku di seluruh modul.')+detailPanel('Master data',detailFacts([['Produk aktif',activeMaster('products').length],['Tahap aktif',stageDefs().filter(s=>s.active).length],['Pengelola','Superadmin']]));
 const tabs={products:'Produk',stages:'Tahap Opportunity',sources:'Sumber Lead',activities:'Jenis Task',reasons:'Alasan Penutupan',escalation:'Reminder & Eskalasi'};
 let body='';
 if(configTab==='escalation'){let e=masters().escalation;body=detailPanel('Reminder dan eskalasi',detailFacts([['Reminder sebelum batas',e.reminderBefore+' hari'],['Eskalasi setelah batas',e.escalateAfter+' hari'],['Ulang eskalasi',e.repeatDays+' hari'],['Penerima',e.recipient],['Owner','Tetap pada AO; perpindahan hanya melalui Reassign']])+btn('Ubah aturan','escalationForm()',true));}
 else {let rows=masters()[configTab];body='<div class="actions">'+btn('Tambah item','masterForm()',true)+'</div><div class="scrolltable"><table class="datatable"><thead><tr><th>Nama</th><th>Detail</th><th>Status</th><th>Aksi</th></tr></thead><tbody>'+rows.map((r,i)=>'<tr '+(configTab==='stages'?'draggable="true" ondragstart="event.dataTransfer.setData(\'text/plain\',\''+i+'\')" ondragover="event.preventDefault()" ondrop="event.preventDefault();reorderStage(Number(event.dataTransfer.getData(\'text/plain\')),'+i+')"':'')+'><td>'+(configTab==='stages'?'⋮⋮ ':'')+E(r.name)+'</td><td>'+E(configTab==='stages'?r.type+' · '+r.sla+' hari':r.category||r.behavior||'')+'</td><td>'+badge(r.active?'Aktif':'Nonaktif')+'</td><td>'+btn('Edit',"masterForm('"+r.id+"')")+(configTab==='stages'?btn('↑','reorderStage('+i+','+(i-1)+')')+btn('↓','reorderStage('+i+','+(i+1)+')'):'')+'</td></tr>').join('')+'</tbody></table></div>'}
 return titleBlock('Pengaturan','Master yang sama digunakan di seluruh halaman, dashboard, filter, dan laporan.')+'<div class="tabs">'+Object.entries(tabs).map(([k,label])=>btn(label,"configTab='"+k+"';renderContent()",configTab===k)).join('')+'</div>'+body;
}
async function saveMasters(config,scope='new'){try{let r=await api('config',{before:serverBase.config,config,scope});applyServer(r);toast('Pengaturan tersimpan dan diterapkan')}catch(e){toast(e.message);applyServer(await api('state'))}}
function masterForm(id=''){
 let k=configTab,r=masters()[k].find(r=>r.id===id)||{};
 let content=field('Nama','name',r.name||'','text',true)+select('Status','status',['Aktif','Nonaktif'],r.active===false?'Nonaktif':'Aktif');
 if(k==='sources')content+=select('Jenis sumber','kind',['input','referral','campaign','digital','existing'],r.kind||'input');
 if(k==='products')content+=select('Kategori','category',['Kredit','Dana','Layanan lain'],r.category||'Kredit');
 if(k==='stages')content+=select('Jenis tahap','type',['process','won','lost','cancelled'],r.type||'process')+field('SLA (hari kalender)','sla',r.sla??5,'number',true)+select('Perubahan SLA berlaku untuk','scope',['Data baru saja','Data aktif juga'],'Data baru saja');
 if(k==='activities')content+=select('Perilaku Task','behavior',['call','visit','meeting','document'],r.behavior||'call')+'<p class="hint">visit: approval + GPS + foto. meeting: peserta dan agenda. call: telepon dan hasil. Perilaku item existing tidak dapat diganti.</p>';
 modal(id?'Edit master':'Tambah master',content,f=>{let cfg=clone(db.config),item={...r,id:r.id||uid(k),name:f.name.trim(),active:f.status==='Aktif'};if(k==='stages')Object.assign(item,{type:f.type,sla:Number(f.sla)});if(k==='sources')item.kind=f.kind;if(k==='products')item.category=f.category;if(k==='activities')item.behavior=f.behavior;let list=cfg.masters[k],i=list.findIndex(x=>x.id===id);if(i>=0)list[i]=item;else list.push(item);saveMasters(cfg,f.scope==='Data aktif juga'?'active':'new')});
}
function reorderStage(from,to){let cfg=clone(db.config),a=cfg.masters.stages;if(to<0||to>=a.length||from===to)return;let [x]=a.splice(from,1);a.splice(to,0,x);saveMasters(cfg)}
function escalationForm(){let e=masters().escalation;modal('Reminder dan eskalasi',field('Reminder sebelum batas (hari)','reminderBefore',e.reminderBefore,'number',true)+field('Eskalasi setelah batas (hari)','escalateAfter',e.escalateAfter,'number',true)+field('Ulang eskalasi (hari, 0 = sekali)','repeatDays',e.repeatDays,'number',true)+select('Penerima eskalasi','recipient',['SPV','Superadmin'],e.recipient),f=>{let cfg=clone(db.config);cfg.masters.escalation={...e,reminderBefore:Number(f.reminderBefore),escalateAfter:Number(f.escalateAfter),repeatDays:Number(f.repeatDays),recipient:f.recipient};saveMasters(cfg,'active')})}
const contentBeforeConnected=renderContent;
renderContent=function(){
 if(!authUser&&!journey)return;
 if(view==='Member')document.querySelector('#app').innerHTML=memberScreen();
 else if(view==='Pengaturan')document.querySelector('#app').innerHTML=configScreenConnected();
 else if(view==='Pengajuan')document.querySelector('#app').innerHTML=applicationListConnected();
 else contentBeforeConnected();
 wireTableRows();cleanConnectedLabels();
};
configForm=function(){go('Pengaturan')};
importData=function(){toast('Impor lokal tidak digunakan pada data bersama.')};
resetDemo=function(){toast('Data bersama tidak dapat direset melalui perangkat.')};
scenarioDialog=function(){journeyChoose()};
const goBeforeConnected=go;
go=function(v,id=''){if(saving&&!journey&&v==='Pengaturan')return toast('Tunggu penyimpanan selesai.');goBeforeConnected(v,id)};
const startJourneyConnected=journeyStart,exitJourneyConnected=journeyExit;
journeyStart=function(s){BPD_SIM_ACTIVE=true;let select=document.querySelector('#role');select.innerHTML=['Supervisor','Administrator',...owners].map(x=>'<option>'+E(x)+'</option>').join('');startJourneyConnected(s)};
journeyExit=function(){exitJourneyConnected();BPD_SIM_ACTIVE=false;if(authUser)render()};
applicationInfo.connected=true;
if(currentToken())bootConnected().catch(e=>loginPage(e.message));else loginPage();
// One stage selector for both process and closing stages.
const unifiedGetList=getList;
getList=function(name=view){
 if(name==='Peluang')return db.opps.filter(o=>mine(o)&&(!listOwner||o.owner===listOwner)&&(!listQuery||[o.name,pname(o.profile),o.id].join(' ').toLowerCase().includes(listQuery.toLowerCase()))&&(!listProduct||o.product===listProduct)&&(!stageFilter?o.outcome==='Aktif':o.stage===stageFilter)&&(!listPeriod||o.created.startsWith(listPeriod))).sort((a,b)=>Number(overSla(b))-Number(overSla(a)));
 return unifiedGetList(name);
};
const unifiedScaleList=scaleList;
scaleList=function(){
 let html=unifiedScaleList();if(view!=='Peluang')return html;
 let root=document.createElement('div');root.innerHTML=html;
 root.querySelector('select[aria-label="Peluang aktif"]')?.remove();
 let select=root.querySelector('select[aria-label="Tahap peluang"]');
 if(select){select.innerHTML='<option value="">Tahap aktif</option>'+stageDefs().map(s=>'<option '+(stageFilter===s.name?'selected':'')+'>'+E(s.name)+'</option>').join('');select.setAttribute('onchange',"stageFilter=this.value;if(stageFilter&&stageDefs().find(s=>s.name===stageFilter)?.type!=='process')listKind='Daftar';listPage=1;renderContent()")}
 return root.innerHTML;
};
const reassignConnectedBefore=reassign;
reassign=function(kind,id){
 if(!supervisors())return toast('Reassign memerlukan SPV.');
 let x=kind==='lead'?db.leads.find(l=>l.id===id):kind==='opp'?opp(id):task(id);if(!x)return;
 if(kind==='lead'&&x.customerConverted)return toast('Lead sudah dikonversi dan terkunci.');
 modal('Pindahkan penanggung jawab',select('AO baru','owner',owners,x.owner)+area('Alasan perubahan','reason','',true)+select('Task terbuka terkait','move',['Ikut AO baru','Tetap pada pelaksana sebelumnya']),f=>{
 const member=memberList.find(m=>m.name===f.owner);if(!member)throw Error('AO tidak tersedia.');
 const old=x.owner;x.owner=f.owner;x.ownerId=member.id;
 // Transfer identity access as well to keep record links visible to its new AO.
 let p=profile(x.profile);if(p){p.owner=f.owner;p.ownerId=member.id}
 if(f.move==='Ikut AO baru')for(const t of db.tasks.filter(t=>isOpen(t)&&(kind==='opp'?t.opp===id:kind==='lead'?t.lead===id:t.id===id))){t.owner=f.owner;t.ownerId=member.id}
 record('Reassign',id,old+' → '+f.owner+' / '+f.reason);
 });
};
// New-record defaults use active master stages even after a rename or deactivation.
const createOppConnectedBefore=newOpp;
newOpp=function(pid='',lid=''){
 if(lid){let l=db.leads.find(l=>l.id===lid);if(l?.customerConverted)return toast('Buat Opportunity dari Nasabah yang terhubung.')}
 createOppConnectedBefore(pid,lid);
};
scaleNotifications=function(){
 let all=db.notifications||[],active=all.filter(n=>!n.resolved),past=all.filter(n=>n.resolved);
 const row=n=>'<button class="notifrow" onclick="go(\''+(n.kind==='opportunity'?'Opportunity detail':n.kind==='approval'?'Persetujuan':'Aktivitas detail')+'\',\''+E(n.record)+'\')"><span><strong>'+E(n.title)+'</strong><small>'+E(n.note)+' · Owner: '+E(n.owner)+' · '+fmt(n.created)+'</small></span><span>›</span></button>';
 return titleBlock('Notifikasi','Reminder ke AO dan eskalasi ke atasan. Owner tetap sama sampai ada Reassign.')+detailPanel('Perlu perhatian',active.map(row).join('')||empty('Tidak ada notifikasi aktif.'))+detailPanel('Riwayat terselesaikan',past.map(row).join('')||empty('Belum ada riwayat.'));
};
const oppCardBeforeUnified=oppCard;
oppCard=function(o){let root=document.createElement('div');root.innerHTML=oppCardBeforeUnified(o);let top=root.querySelector('.recordtop');if(top)top.innerHTML=badge(o.stage);return root.innerHTML};
const contentFinalBefore=renderContent;
renderContent=function(){
 contentFinalBefore();
 if(!journey&&view==='Lead detail'){
 let l=db.leads.find(l=>l.id===focus);
 if(l?.customerConverted){document.querySelectorAll('#app button').forEach(b=>{if(/qualify|assessment|leadIdentityEdit|reopenRecord|closeLead|reassign\('lead/.test(b.getAttribute('onclick')||''))b.remove()})}
 }
 if(view==='Opportunity detail'){
 document.querySelectorAll('#app .recordtop .tag').forEach(tag=>{if(['Aktif','Won','Lost','Cancelled'].includes(tag.textContent))tag.remove()});
 document.querySelectorAll('#app .actions button').forEach(b=>{if(/^Tutup peluang$/.test(b.textContent))b.remove()});
 }
 wireTableRows();cleanConnectedLabels();
};
const protectedModal=modal;
modal=function(title,html,handler){if(saving&&!journey)return toast('Tunggu perubahan selesai disimpan.');return protectedModal(title,html,handler)};
ownerSelect=function(val){const allowed=supervisors()?owners:[actor()];return select('Penanggung jawab','owner',allowed,allowed.includes(val)?val:allowed[0])};
const saveMastersBeforeBusy=saveMasters;
saveMasters=async function(config,scope='new'){if(saving)return toast('Tunggu penyimpanan selesai.');saving=true;syncMessage='Menyimpan…';renderSyncStatus();try{await saveMastersBeforeBusy(config,scope)}finally{saving=false;renderSyncStatus()}};
const journeyBaseConnectedBefore=journeyBase;
journeyBase=function(existing=false){let d=journeyBaseConnectedBefore(existing);if(serverBase)d.config=clone(serverBase.config);return d};
const apiBeforeSimulationGuard=api;
api=async function(path,data,method){if(journey&&data&&path!=='logout')throw Error('Aksi server tidak tersedia selama simulasi. Keluar dari simulasi terlebih dahulu.');return apiBeforeSimulationGuard(path,data,method)};
const profileConnectedBefore=profile;
profile=function(id){return profileConnectedBefore(id)||db.relatedProfiles?.find(x=>x.id===id)};
const scaleListFinalBefore=scaleList;
scaleList=function(){let html=scaleListFinalBefore();if(view==='Leads'){let root=document.createElement('div');root.innerHTML=html;root.querySelector('select[aria-label="Lead aktif"]')?.remove();return root.innerHTML}return html};
const photoCache=new Map();
addPhoto=async function(id,input){
 let file=input.files?.[0];if(!file)return;
 if(!['image/jpeg','image/png','image/webp','image/gif'].includes(file.type))return toast('Pilih foto JPG, PNG, WebP atau GIF.');
 if(file.size>10000000)return toast('Foto maksimal 10 MB.');
 if(journey)return toast('Simulasi menggunakan foto latihan. Keluar untuk mengunggah foto kerja.');
 if(saving)return toast('Tunggu penyimpanan selesai.');
 const old=task(id)?.photo;
 try{
 toast('Mengunggah foto…');
 const bitmap=await createImageBitmap(file),factor=Math.min(1,1400/Math.max(bitmap.width,bitmap.height)),canvas=document.createElement('canvas');
 canvas.width=Math.max(1,Math.round(bitmap.width*factor));canvas.height=Math.max(1,Math.round(bitmap.height*factor));
 const context=canvas.getContext('2d');context.fillStyle='white';context.fillRect(0,0,canvas.width,canvas.height);context.drawImage(bitmap,0,0,canvas.width,canvas.height);bitmap.close();
 let data=canvas.toDataURL('image/jpeg',0.8).split(',')[1],r=await api('photos',{task:id,type:'image/jpeg',data});
 task(id).photo=r.photo;record('Lampiran foto',id,file.name);
 }catch(e){if(task(id))task(id).photo=old;toast(e.message||'Foto gagal diunggah. Coba kembali.')}
};
async function hydratePhotos(){
 for(const img of document.querySelectorAll('img.photo')){
 const source=img.getAttribute('src');if(!source?.startsWith('r2:'))continue;
 const key=source.slice(3);if(photoCache.has(key)){img.src=photoCache.get(key);continue}
 img.removeAttribute('src');img.alt='Memuat foto kunjungan…';
 try{let r=await fetch(API_ORIGIN+'/api/photo/'+encodeURIComponent(key),{headers:{Authorization:'Bearer '+currentToken()}});if(!r.ok)throw Error();let url=URL.createObjectURL(await r.blob());photoCache.set(key,url);img.src=url;img.alt='Foto kunjungan'}catch{img.alt='Foto belum dapat dimuat. Buka ulang detail untuk mencoba kembali.'}
 }
}
const photoContentBefore=renderContent;
renderContent=function(){photoContentBefore();hydratePhotos()};
