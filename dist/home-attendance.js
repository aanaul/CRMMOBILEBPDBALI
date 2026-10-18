/* Home attendance uses the signed-in user's records, independent of journey filters. */
let homeAttendanceState={user:'',day:'',data:null,error:'',loading:false,updated:0},homeAttendanceSequence=0;
function homeWorkDay(){return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Makassar',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date())}
function homeAttendanceRecord(data,user,day){
 const open=data?.myOpen;
 if(open?.member===user)return open;
 return (data?.history||[]).find(row=>row.member===user&&row.day===day)||null;
}
function homeClockTime(value){return value?new Date(value).toLocaleTimeString('id-ID',{timeZone:'Asia/Makassar',hour:'2-digit',minute:'2-digit',hour12:false}):'—'}
function homeAttendanceHero(){
 const user=authUser?.id,day=homeWorkDay(),s=homeAttendanceState,ready=s.user===user&&s.day===day&&!s.error&&!!s.data;
 const record=ready?homeAttendanceRecord(s.data,user,day):null;
 const working=!!record&&!record.clock_out,done=!!record?.clock_out;
 const label=s.error?'Belum tersinkron':!ready?'Memuat absensi…':working?'Sedang bekerja':done?'Selesai bekerja':'Belum Clock In';
 const date=new Date().toLocaleDateString('id-ID',{timeZone:'Asia/Makassar',weekday:'long',day:'numeric',month:'long'});
 const disabled=!ready||s.loading||fieldBusy||done;
 return '<section id="homeAttendance" class="home-attendance" aria-label="Absensi hari ini"><div class="ha-top"><span>ABSENSI HARI INI</span><span class="ha-status '+(working?'is-working':'')+'">'+E(label)+'</span></div><h2>'+E(date)+'</h2><div class="ha-times"><div><span>↘ Clock In</span><strong>'+E(homeClockTime(record?.clock_in))+'</strong><small>WITA</small></div><div><span>↗ Clock Out</span><strong>'+E(homeClockTime(record?.clock_out))+'</strong><small>WITA</small></div></div><div class="ha-duration"><span>Durasi kerja</span><strong>'+E(record?fieldDuration(record.clock_in,record.clock_out):'Belum dimulai')+'</strong></div>'+(record&&record.day!==day?'<p class="ha-note">Sesi dimulai '+E(record.day)+'. Selesaikan sesi ini sebelum absen berikutnya.</p>':'')+'<button type="button" class="ha-clock" '+(disabled?'disabled':'')+' onclick="homeAttendanceClock()">'+(fieldBusy?'Mendapatkan GPS…':done?'✓ Absensi selesai':working?'Clock Out':'Clock In')+'</button><div class="ha-bottom"><button type="button" onclick="go(\'Absen\')">Riwayat absensi ↗</button><button type="button" '+(s.loading?'disabled':'')+' onclick="loadHomeAttendance(true)">Perbarui</button></div>'+(s.error?'<p class="ha-error" role="status">'+E(s.error)+'</p>':'<p class="ha-note">Clock In dan Clock Out menggunakan lokasi perangkat.</p>')+'</section>';
}
function paintHomeAttendance(){const el=document.querySelector('#homeAttendance');if(el&&view==='Home'&&authUser&&!journey)el.outerHTML=homeAttendanceHero()}
async function loadHomeAttendance(force=false){
 if(!authUser||journey||view!=='Home')return;
 const user=authUser.id,day=homeWorkDay(),s=homeAttendanceState;
 if(s.user===user&&s.day===day&&(s.loading||!force&&Date.now()-s.updated<15000))return;
 const sequence=++homeAttendanceSequence;
 homeAttendanceState={user,day,data:s.user===user&&s.day===day?s.data:null,error:'',loading:true,updated:s.updated};paintHomeAttendance();
 try{const data=await api('field?day='+encodeURIComponent(day)+'&member='+encodeURIComponent(user));if(sequence!==homeAttendanceSequence||authUser?.id!==user)return;homeAttendanceState={user,day,data,error:'',loading:false,updated:Date.now()}}
 catch(e){if(sequence!==homeAttendanceSequence||authUser?.id!==user)return;homeAttendanceState={user,day,data:null,error:e.message||'Absensi belum dapat dimuat.',loading:false,updated:Date.now()}}
 paintHomeAttendance();
}
async function homeAttendanceClock(){
 if(fieldBusy||homeAttendanceState.loading||homeAttendanceState.error||!homeAttendanceState.data)return;
 const record=homeAttendanceRecord(homeAttendanceState.data,authUser.id,homeWorkDay());if(record?.clock_out)return;
 await fieldClock(record?'out':'in');await loadHomeAttendance(true);
}
const homeScreenBeforeAttendance=homeScreen;
homeScreen=function(){const html=homeScreenBeforeAttendance();return authUser&&!journey?html.replace('</section>','</section>'+homeAttendanceHero()):html};
const renderBeforeHomeAttendance=renderContent;
renderContent=function(){renderBeforeHomeAttendance();if(view==='Home'&&authUser&&!journey)loadHomeAttendance()};
const logoutBeforeHomeAttendance=logoutLocal;
logoutLocal=function(){++homeAttendanceSequence;homeAttendanceState={user:'',day:'',data:null,error:'',loading:false,updated:0};logoutBeforeHomeAttendance()};
setInterval(()=>{if(!document.hidden&&view==='Home'&&authUser&&!journey)loadHomeAttendance()},15000);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)loadHomeAttendance(true)});
if(authUser&&view==='Home')renderContent();
