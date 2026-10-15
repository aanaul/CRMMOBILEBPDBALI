let customerStatusChip='Aktif',tourIndex=0,tourActive=false,tourUser='',tourSteps=[];
const statusOfCustomer=p=>p.customerStatus||'Aktif';
const listBeforeStatus=getList;
getList=function(name=view){const rows=listBeforeStatus(name);return name==='Nasabah'?rows.filter(p=>customerStatusChip==='Semua'||statusOfCustomer(p)===customerStatusChip):rows};
const scaleBeforeStatus=scaleList;
scaleList=function(){let html=scaleBeforeStatus();if(view==='Nasabah'){
 const all=db.profiles.filter(p=>p.relation==='Customer'&&mine(p));
 const chips='<div class="rangechips customerchips" aria-label="Status nasabah">'+['Aktif','Inactive','Semua'].map(s=>'<button class="'+(customerStatusChip===s?'active':'')+'" aria-pressed="'+(customerStatusChip===s)+'" onclick="customerStatusChip=\''+s+'\';listPage=1;renderContent()">'+(s==='Aktif'?'Nasabah Aktif':s)+' <b>'+all.filter(p=>s==='Semua'||statusOfCustomer(p)===s).length+'</b></button>').join('')+'</div>';
 html=html.replace('<div class="scaletools">',chips+'<div class="scaletools">');
 }return html};
const cardBeforeStatus=profileCard;
profileCard=function(p){return cardBeforeStatus(p).replace('<small>'+E(p.id)+'</small>','<span class="customerstatus '+(statusOfCustomer(p)==='Inactive'?'inactive':'')+'">'+statusOfCustomer(p)+'</span><small>'+E(p.id)+'</small>')};
const detailBeforeStatus=nasabahRecordDetail;
nasabahRecordDetail=function(p){let html=detailBeforeStatus(p);if(p.relation==='Customer'){
 const inactive=statusOfCustomer(p)==='Inactive';
 html=html.replace('<div class="recordtop">','<div class="recordtop"><span class="customerstatus '+(inactive?'inactive':'')+'">'+statusOfCustomer(p)+'</span>');
 if(mine(p))html=html.replace('</div></section>','<button onclick="changeCustomerStatus(\''+p.id+'\')">'+(inactive?'Aktifkan Nasabah':'Jadikan Inactive')+'</button></div></section>');
 }return html};
function changeCustomerStatus(id){let p=profile(id);if(!p||p.relation!=='Customer'||!mine(p))return toast('Nasabah tidak tersedia.');const next=statusOfCustomer(p)==='Aktif'?'Inactive':'Aktif';
 modal(next==='Inactive'?'Jadikan Nasabah Inactive':'Aktifkan Nasabah','<p>Ubah status <strong>'+E(p.name)+'</strong> menjadi '+next+'? Riwayat Task, Opportunity, dan pengajuan tetap tersimpan.</p>'+area('Catatan perubahan status','reason','',true),f=>{p.customerStatus=next;p.statusChangedAt=now();p.statusChangedBy=actor();p.statusReason=f.reason;record('Ubah status Nasabah',p.id,next+' · '+f.reason)});
}
function updateSidebarHint(){if(mobile)return;const nav=document.querySelector('body>aside>nav');if(!nav)return;let hint=document.querySelector('#sidebarScrollHint');if(!hint){hint=document.createElement('button');hint.id='sidebarScrollHint';hint.type='button';nav.insertAdjacentElement('afterend',hint);hint.onclick=()=>nav.scrollBy({top:Math.max(160,nav.clientHeight*.65),behavior:'smooth'});nav.addEventListener('scroll',sync,{passive:true});}function sync(){const overflow=nav.scrollHeight>nav.clientHeight+3,bottom=nav.scrollTop+nav.clientHeight>=nav.scrollHeight-3;hint.hidden=!overflow||bottom;hint.textContent='Menu lainnya di bawah ↓';nav.classList.toggle('more-below',overflow&&!bottom);}sync();}
if(typeof ResizeObserver!=='undefined'){const observer=new ResizeObserver(()=>updateSidebarHint());const aside=document.querySelector('body>aside');if(aside)observer.observe(aside)}
window.addEventListener('resize',updateSidebarHint);
function tourSurface(){return mobile?'mobile':'cms'}
async function maybeStartTour(){const user=authUser?.id;if(!user||tourUser===user)return;tourUser=user;try{const r=await api('onboarding');if(authUser?.id===user&&!r.seen[tourSurface()]&&!journey&&!document.querySelector('#loginRoot'))startGuidanceTour()}catch{tourUser=''}}
function startGuidanceTour(){if(!authUser||journey)return;if(document.querySelector('#modal')?.open)document.querySelector('#modal').close();tourSteps=[
 {title:'Selamat datang di BPD Bali CRM',text:'Kenali ruang kerja Anda. Panduan ini bisa dilewati kapan saja dan dibuka kembali melalui tombol Panduan.',route:mobile?'Home':'Monitoring',target:mobile?'.homemenus':'.metrics'},
 {title:'Mulai dari Leads',text:'Buat Lead, catat kebutuhan, lalu konversikan menjadi Nasabah. Lead yang sudah dikonversi tidak dapat dikembalikan ke tahap awal.',route:'Leads',target:'.intro'},
 {title:'Kelola Nasabah',text:'Nasabah berasal dari konversi Lead atau dibuat langsung. Gunakan chip Aktif / Inactive untuk screening, lalu buka detail untuk mengubah status.',route:'Nasabah',target:'.customerchips'},
 {title:'Tindak lanjuti dengan Task',text:'Buat Task dari Lead atau Nasabah, tentukan jadwal, lalu catat hasil pekerjaannya.',route:'Agenda',target:'.intro'},
 {title:'Pantau Opportunity',text:'Buat Opportunity dari Lead Qualified atau Nasabah. Pantau tahap, nominal, dan tindak lanjut pada pipeline.',route:'Peluang',target:'.intro'},
 {title:'Coba simulasi alur lengkap',text:'Gunakan Simulasi Alur untuk mencoba buat Lead → konversi Nasabah → buat Task → buat Opportunity. Data latihan terpisah dari data kerja.',route:mobile?'Home':'Monitoring',target:'#journeyLaunch'}
 ];tourIndex=0;tourActive=true;showGuidanceStep();}
function clearTourHighlight(){document.querySelectorAll('.tourhighlight').forEach(el=>el.classList.remove('tourhighlight'))}
function showGuidanceStep(){if(!tourActive)return;clearTourHighlight();const step=tourSteps[tourIndex];go(step.route);const target=document.querySelector(step.target);if(target){target.classList.add('tourhighlight');target.scrollIntoView?.({block:'center',behavior:'smooth'})}
 let root=document.querySelector('#guidanceTour');if(!root){root=document.createElement('div');root.id='guidanceTour';document.body.append(root)}
 root.innerHTML='<section class="tourcard" role="dialog" aria-modal="false" aria-labelledby="tourTitle" tabindex="-1"><div class="tourtop"><span>PANDUAN · '+(tourIndex+1)+' / '+tourSteps.length+'</span><button type="button" onclick="finishGuidanceTour(\'skipped\')">Lewati ✕</button></div><h2 id="tourTitle">'+step.title+'</h2><p>'+step.text+'</p><div class="tourprogress">'+tourSteps.map((_,i)=>'<i class="'+(i<=tourIndex?'active':'')+'"></i>').join('')+'</div><div class="touractions"><button type="button" '+(!tourIndex?'disabled':'')+' onclick="moveGuidanceTour(-1)">Kembali</button><button type="button" class="primary" onclick="'+(tourIndex===tourSteps.length-1?'finishGuidanceTour(\'completed\')':'moveGuidanceTour(1)')+'">'+(tourIndex===tourSteps.length-1?'Selesai':'Lanjut →')+'</button></div></section>';
 root.querySelector('.tourcard').focus();}
function moveGuidanceTour(delta){tourIndex=Math.max(0,Math.min(tourSteps.length-1,tourIndex+delta));showGuidanceStep()}
async function finishGuidanceTour(status){tourActive=false;clearTourHighlight();document.querySelector('#guidanceTour')?.remove();go(mobile?'Home':'Monitoring');try{await api('onboarding',{surface:tourSurface(),status})}catch{tourUser='';toast('Status panduan belum tersimpan. Coba buka kembali Panduan.')}}
document.addEventListener('keydown',e=>{if(tourActive&&e.key==='Escape')finishGuidanceTour('skipped')});
const renderBeforeExperience=render;
render=function(){renderBeforeExperience();updateSidebarHint();if(!authUser){tourActive=false;tourUser='';document.querySelector('#guidanceTour')?.remove();return}const header=document.querySelector('main header');if(header&&!header.querySelector('#tourLaunch')){let b=document.createElement('button');b.id='tourLaunch';b.textContent='Panduan';b.onclick=startGuidanceTour;header.append(b)}if(tourActive){const s=tourSteps[tourIndex];document.querySelector(s.target)?.classList.add('tourhighlight')}};
const logoutBeforeExperience=logoutLocal;
logoutLocal=function(){tourActive=false;tourUser='';clearTourHighlight();document.querySelector('#guidanceTour')?.remove();logoutBeforeExperience()};
if(authUser){render();maybeStartTour()}

const journeyBeforeGuidance=journeyStart;
journeyStart=function(s){if(tourActive){tourActive=false;clearTourHighlight();document.querySelector('#guidanceTour')?.remove();api('onboarding',{surface:tourSurface(),status:'skipped'}).catch(()=>{})}journeyBeforeGuidance(s)};
