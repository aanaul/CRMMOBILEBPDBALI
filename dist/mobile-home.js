const mobileTabs=[['Home','Home','home'],['Leads','Leads','users'],['Agenda','Task','task'],['Nasabah','Nasabah','bank'],['Profil User','Profil','user']];
const iconPaths={
home:'<path d="m3 10 9-7 9 7v10H3Z"/><path d="M9 20v-7h6v7"/>',
users:'<circle cx="9" cy="7" r="3"/><path d="M3 20v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6m2 4a5 5 0 0 1 3 5"/>',
task:'<rect x="4" y="4" width="16" height="17" rx="2"/><path d="M9 3h6v4H9ZM8 13l2 2 5-5M8 18h8"/>',
bank:'<path d="m3 8 9-5 9 5ZM4 21h16M6 10v8m6-8v8m6-8v8"/>',
user:'<circle cx="12" cy="7" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/>',
chart:'<path d="M4 3v17h17M8 16v-5m5 5V7m5 9V4"/>',
opportunity:'<path d="M3 5h5v14H3Zm7 0h5v9h-5Zm7 0h4v6h-4Z"/>',
file:'<path d="M5 3h9l5 5v13H5Zm9 0v6h5M8 13h8m-8 4h6"/>',
check:'<circle cx="12" cy="12" r="9"/><path d="m7 12 3 3 7-7"/>',
bell:'<path d="M5 17h14l-2-4V8a5 5 0 0 0-10 0v5ZM10 21h4"/>',
settings:'<circle cx="12" cy="12" r="4"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2"/>'
};
function mobileIcon(name){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+iconPaths[name]+'</svg>'}
function mobileTabParent(v){
 if(['Leads','Lead detail'].includes(v))return 'Leads';
 if(['Agenda','Aktivitas detail'].includes(v))return 'Agenda';
 if(['Nasabah','Nasabah detail'].includes(v))return 'Nasabah';
 if(v==='Profil User')return v;
 return 'Home';
}
function homeScreen(){
 let a=currentAccount(),openTasks=visible(db.tasks).filter(isOpen),pending=pendingApprovals().length,active=visible(db.opps).filter(o=>o.outcome==='Aktif').length;
 let menus=[['Monitoring','Monitoring','chart','Progres dan prioritas tim'],['Leads','Leads','users','Kelola calon nasabah'],['Nasabah','Nasabah','bank','Hubungan nasabah'],['Peluang','Opportunity','opportunity','Pipeline dan peluang'],['Agenda','Task','task','Pekerjaan dan jadwal'],['Pengajuan','Pengajuan','file','Status pengajuan'],['Persetujuan','Persetujuan','check','Review permintaan'],['Laporan','Laporan','chart','Hasil dan evaluasi'],['Notifikasi','Notifikasi','bell','Pengingat dan eskalasi'],['Pengaturan','Pengaturan','settings','Parameter dan preferensi']];
 return '<section class="homewelcome"><small>CABANG DENPASAR</small><h1>Halo, '+E(a.name.split(' ')[0])+'</h1><p>Siap melanjutkan pekerjaan hari ini?</p></section><div class="homestats"><button onclick="go(\'Agenda\')"><strong>'+openTasks.length+'</strong><span>Task terbuka</span></button><button onclick="go(\'Peluang\')"><strong>'+active+'</strong><span>Opportunity aktif</span></button></div>'+(pending?'<button class="homeapproval" onclick="go(\'Persetujuan\')">'+mobileIcon('check')+'<span><b>'+pending+' permintaan persetujuan</b><small>Lihat rencana dan perubahan kunjungan</small></span><span>›</span></button>':'')+'<h2 class="homemenutitle">Menu</h2><div class="homemenus">'+menus.map(([route,label,icon,desc])=>'<button onclick="go(\''+route+'\')">'+mobileIcon(icon)+'<strong>'+label+'</strong><small>'+desc+'</small></button>').join('')+'</div>';
}
function userProfileScreen(){
 let a=currentAccount();
 return '<section class="panel userprofilehero"><span class="profileinitials">'+E(a.initials)+'</span><h1>'+E(a.name)+'</h1><p>'+E(a.role)+'</p><span class="tag">Cabang Denpasar</span></section><section class="panel"><h2>Informasi pengguna</h2><div class="profileinfo"><span>Nama</span><strong>'+E(a.name)+'</strong></div><div class="profileinfo"><span>Peran</span><strong>'+E(a.role)+'</strong></div><div class="profileinfo"><span>Unit kerja</span><strong>Cabang Denpasar</strong></div><div class="profileinfo"><span>Zona waktu</span><strong>WITA · UTC+08</strong></div></section><section class="panel profileactions"><button onclick="openAccount()">Kelola akun <span>›</span></button><button onclick="go(\'Pengaturan\')">Pengaturan <span>›</span></button><button onclick="applicationInfo()">Informasi aplikasi <span>›</span></button></section>';
}
const mobileHomeContentBefore=renderContent;
renderContent=function(){
 if(view==='Home'){document.querySelector('#app').innerHTML=homeScreen();return}
 if(view==='Profil User'){document.querySelector('#app').innerHTML=userProfileScreen();return}
 mobileHomeContentBefore();
};
const mobileHomeRenderBefore=render;
render=function(){
 mobileHomeRenderBefore();
 let nav=document.querySelector('#nav');nav.classList.remove('orderedMobileNav');nav.classList.add('mobileBottomTabs');
 nav.innerHTML=mobileTabs.map(([route,label,icon])=>'<button class="'+(mobileTabParent(view)===route?'active':'')+'" '+(mobileTabParent(view)===route?'aria-current="page"':'')+' onclick="go(\''+route+'\')">'+mobileIcon(icon)+'<span>'+label+'</span></button>').join('');
 if(['Home','Profil User'].includes(view))document.querySelector('#title').textContent=view==='Home'?'Home':'Profil';
 nav.querySelector('[aria-current]')?.scrollIntoView({block:'nearest',inline:'nearest'});
};
view='Home';focus='';render();
