let fieldData=null,fieldLoading=false,fieldError='',fieldMember='',fieldDay=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Makassar',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date()),fieldSeq=0,fieldWatch=null,fieldTimer=null,fieldPosting=false,fieldLastPoint=null,fieldLastSent=0,fieldGPSMessage='',fieldBusy=false,fieldPoll=null,fieldTimelineLimit=100;
let mapState={zoom:13,lat:-8.65,lng:115.2167,fitted:false,selectedPoint:'',replay:-1},replayTimer=null;
const fieldTime=s=>s?new Date(s).toLocaleString('id-ID',{timeZone:'Asia/Makassar',dateStyle:'medium',timeStyle:'short'}):'—';
function fieldDuration(a,b){if(!a)return '—';let min=Math.max(0,Math.floor(((b?Date.parse(b):Date.now())-Date.parse(a))/60000));return Math.floor(min/60)+'j '+min%60+'m'}
function fieldDistance(a,b){const R=6371000,rad=x=>x*Math.PI/180,dlat=rad(b.lat-a.lat),dlng=rad(b.lng-a.lng),q=Math.sin(dlat/2)**2+Math.cos(rad(a.lat))*Math.cos(rad(b.lat))*Math.sin(dlng/2)**2;return 2*R*Math.atan2(Math.sqrt(q),Math.sqrt(1-q))}
function fieldFresh(p){if(!p)return {label:'Belum ada lokasi',kind:'none'};let min=(Date.now()-Date.parse(p.captured))/60000;return {label:min<=2?'Diperbarui <2 menit':min<=15?'Terakhir '+Math.max(2,Math.floor(min))+' menit lalu':'Lokasi lama',kind:min<=2?'fresh':min<=15?'recent':'stale'}}
async function loadField(force=false){
 if(!authUser||journey)return;if(fieldLoading&&!force)return;
 fieldLoading=true;let seq=++fieldSeq;
 try{let r=await api('field?day='+encodeURIComponent(fieldDay)+'&member='+encodeURIComponent(fieldMember||authUser.id));if(seq!==fieldSeq)return;fieldData=r;fieldMember=r.selected;fieldError='';if(!r.myOpen&&fieldWatch!==null){stopFieldWatch();fieldGPSMessage='Sesi kerja sudah berakhir; berbagi lokasi dihentikan.'}}
 catch(e){if(seq===fieldSeq)fieldError=e.message}finally{if(seq===fieldSeq){fieldLoading=false;if(['Absen','Lokasi Tim'].includes(view))renderContent()}}
}
function fieldSelectMember(id){stopJourneyReplay();fieldMember=id;fieldTimelineLimit=100;mapState.fitted=false;mapState.selectedPoint='';loadField(true)}
function fieldSelectDay(day){if(!day)return;stopJourneyReplay();fieldDay=day;fieldTimelineLimit=100;mapState.fitted=false;loadField(true)}
function gpsOnce(){return new Promise((resolve,reject)=>{if(!navigator.geolocation)return reject(Error('Perangkat ini tidak menyediakan layanan lokasi.'));navigator.geolocation.getCurrentPosition(p=>resolve(gpsPayload(p)),e=>reject(Error(e.code===1?'Izin lokasi ditolak. Izinkan GPS di pengaturan browser lalu coba kembali.':e.code===2?'Lokasi belum tersedia. Aktifkan GPS dan coba di area terbuka.':'GPS belum diperoleh. Coba kembali.')),{enableHighAccuracy:true,timeout:20000,maximumAge:0})})}
function gpsPayload(p){return {lat:p.coords.latitude,lng:p.coords.longitude,accuracy:Math.max(1,p.coords.accuracy),captured:new Date(p.timestamp||Date.now()).toISOString()}}
async function fieldClock(action){
 if(fieldBusy)return;if(journey)return toast('Keluar dari simulasi terlebih dahulu.');
 fieldBusy=true;fieldGPSMessage='Mendapatkan GPS…';renderContent();
 try{
 const p=await gpsOnce(),r=await api('field/'+(action==='in'?'clock-in':'clock-out'),p);
 fieldLastPoint=p;fieldLastSent=Date.now();
 if(action==='in'){sessionStorage.setItem('bpd-sharing','1');startFieldWatch();toast('Absen Masuk tersimpan');}else{stopFieldWatch();toast('Absen Pulang tersimpan');}
 await loadField(true);
 }catch(e){fieldGPSMessage=e.message;toast(e.message)}finally{fieldBusy=false;renderContent()}
}
function stopFieldWatch(){if(fieldWatch!==null)navigator.geolocation?.clearWatch(fieldWatch);fieldWatch=null;clearInterval(fieldTimer);fieldTimer=null;sessionStorage.removeItem('bpd-sharing');fieldGPSMessage='Berbagi lokasi dijeda';}
function startFieldWatch(){
 if(fieldWatch!==null||!navigator.geolocation)return;
 fieldGPSMessage='Berbagi lokasi aktif saat halaman terbuka';
 fieldWatch=navigator.geolocation.watchPosition(p=>sendFieldPoint(gpsPayload(p)),e=>{fieldGPSMessage=e.code===1?'Izin lokasi dicabut. Periksa pengaturan browser.':'GPS belum tersedia. Menunggu titik berikutnya.';if(e.code===1)stopFieldWatch();if(['Absen','Lokasi Tim'].includes(view))renderContent()},{enableHighAccuracy:true,maximumAge:10000,timeout:20000});
 fieldTimer=setInterval(()=>{if(!document.hidden&&authUser&&fieldWatch!==null)gpsOnce().then(p=>sendFieldPoint(p)).catch(()=>{})},60000);
}
async function sendFieldPoint(p,force=false){
 if(fieldPosting||journey||!authUser||fieldWatch===null&&!force)return false;
 const elapsed=Date.now()-fieldLastSent,dist=fieldLastPoint?fieldDistance(fieldLastPoint,p):Infinity;
 if(!force&&(elapsed<15000||elapsed<60000&&dist<50))return;
 fieldPosting=true;
 try{await api('field/location',{...p,pointId:crypto.randomUUID()});fieldLastPoint=p;fieldLastSent=Date.now();fieldGPSMessage='Lokasi terkirim '+new Date().toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'});if(['Absen','Lokasi Tim'].includes(view))await loadField(true);return true}
 catch(e){fieldGPSMessage=e.message;if([401,409].includes(e.status))stopFieldWatch();return false}finally{fieldPosting=false}
}
async function resumeSharing(){
 if(fieldBusy)return;fieldBusy=true;
 try{let p=await gpsOnce();if(!await sendFieldPoint(p,true))throw Error(fieldGPSMessage||'Lokasi belum terkirim.');sessionStorage.setItem('bpd-sharing','1');startFieldWatch()}catch(e){fieldGPSMessage=e.message;toast(e.message)}finally{fieldBusy=false;renderContent()}
}
function attendanceScreen(){
 let open=fieldData?.myOpen,history=fieldData?.history||[],member=fieldData?.members?.find(m=>m.id===fieldMember);
 let card=detailPanel('Absensi Saya', '<div class="attendancehero"><span class="atticon">◷</span><div><h2>'+E(authUser.name)+'</h2><p>'+E(open?'Sedang bekerja':'Belum ada sesi kerja aktif')+'</p></div></div>'+detailFacts([['Masuk',open?fieldTime(open.clock_in):'Belum tercatat'],['Durasi',open?fieldDuration(open.clock_in):'—'],['Berbagi lokasi',fieldWatch!==null?'Aktif saat halaman terbuka':'Tidak aktif']])+'<div class="actions">'+(open?btn(fieldBusy?'Mendapatkan GPS…':'Absen Pulang',"fieldClock('out')",true)+(fieldWatch!==null?btn('Jeda Berbagi Lokasi','stopFieldWatch();renderContent()'):btn('Lanjutkan Berbagi Lokasi','resumeSharing()')):btn(fieldBusy?'Mendapatkan GPS…':'Absen Masuk',"fieldClock('in')",true))+'</div><p class="fieldhint">'+E(fieldGPSMessage||'Absen Masuk menggunakan GPS dan memulai berbagi lokasi. Lokasi hanya dikirim saat halaman tetap terbuka dan izin GPS tersedia.')+'</p>');
 return titleBlock('Absen','Masuk, pulang, dan riwayat jam kerja dengan lokasi GPS.')+(fieldLoading&&!fieldData?'<div class="panel">Memuat absensi…</div>':card)+(fieldError?'<p class="error">'+E(fieldError)+'</p>':'')+detailPanel('Riwayat Absensi'+(member?' · '+E(member.name):''),'<div class="fieldfilters">'+fieldMemberSelect()+'</div>'+history.map(a=>'<button class="attendancehistory" onclick="openAttendanceJourney(\''+E(a.member)+'\',\''+E(a.day)+'\')"><strong>'+E(a.day)+'</strong><span>Masuk '+fieldTime(a.clock_in)+'<br>Pulang '+(a.clock_out?fieldTime(a.clock_out):'Belum tercatat')+'</span><small>'+fieldDuration(a.clock_in,a.clock_out)+' · Lihat journey ›</small></button>').join('')+(history.length?'':empty('Belum ada riwayat absensi.')));
}
function fieldMemberSelect(){return '<select aria-label="Pilih member" onchange="fieldSelectMember(this.value)">'+(fieldData?.members||[{id:authUser.id,name:authUser.name}]).map(m=>'<option value="'+E(m.id)+'" '+(m.id===(fieldMember||authUser.id)?'selected':'')+'>'+E(m.name)+' · '+E(m.role||authUser.role)+'</option>').join('')+'</select>'}
function openAttendanceJourney(member,day){fieldMember=member;fieldDay=day;mapState.fitted=false;go('Lokasi Tim')}
function locationScreen(){
 let members=fieldData?.members||[],selected=members.find(m=>m.id===fieldMember),points=fieldData?.points||[],distance=points.slice(1).reduce((n,p,i)=>n+fieldDistance(points[i],p),0);
 return titleBlock(authUser.role==='AO'?'Lokasi & Journey Saya':'Lokasi Tim','Pilih member untuk melihat lokasi terbaru dan riwayat titik GPS.',btn('Perbarui','loadField(true)'))+'<div class="fieldfilters"><label>Tanggal journey<input aria-label="Tanggal journey" type="date" value="'+E(fieldDay)+'" onchange="fieldSelectDay(this.value)"></label><label>Member'+fieldMemberSelect()+'</label></div>'+(fieldError?'<p class="error">'+E(fieldError)+'</p>':'')+'<div class="locationlayout"><section class="panel memberlocations"><h2>Member · '+members.length+'</h2>'+members.map(m=>{const f=fieldFresh(m.latest);return '<button class="memberlocation '+(m.id===fieldMember?'selected':'')+'" onclick="fieldSelectMember(\''+E(m.id)+'\')"><span class="memberavatar">'+E(m.name.slice(0,2).toUpperCase())+'</span><span><strong>'+E(m.name)+'</strong><small>'+E(m.role)+' · '+(m.open?'Sudah Absen Masuk':'Tidak ada sesi aktif')+'</small><small class="'+f.kind+'">'+f.label+'</small>'+(m.latest?'<small>'+fieldTime(m.latest.captured)+' · ±'+Math.round(m.latest.accuracy)+' m</small>':'')+'</span><b>›</b></button>'}).join('')+(members.length?'':empty(fieldLoading?'Memuat member…':'Belum ada data member.'))+'</section><section class="fieldmapsection"><div id="fieldMap" class="fieldmap" aria-label="Peta lokasi dan journey"><div id="fieldMapLayers"></div><div class="mapcontrols"><button onclick="changeMapZoom(1)" aria-label="Perbesar peta">+</button><button onclick="changeMapZoom(-1)" aria-label="Perkecil peta">−</button><button onclick="mapState.fitted=false;drawFieldMap()" aria-label="Tampilkan seluruh journey">⌖</button></div><a class="mapcredit" href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">© OpenStreetMap contributors</a></div><div class="journeysummary"><strong>'+E(selected?.name||'Pilih member')+'</strong><span>'+points.length+' titik · '+(distance/1000).toFixed(2)+' km antar titik GPS</span></div><div class="actions">'+btn(replayTimer?'Ⅱ Jeda Journey':'▶ Putar Journey','toggleJourneyReplay()')+'<small id="replayTime"></small></div><p class="fieldhint">Garis biru: journey tanggal pilihan. Pin: lokasi terakhir diterima. Garis menghubungkan sampel GPS, bukan rute jalan. Lokasi lama tidak menunjukkan posisi saat ini. Akurasi dan kelengkapan dipengaruhi perangkat serta izin browser.</p></section></div>'+detailPanel('Timeline Journey · '+E(fieldDay),points.length?points.slice(Math.max(0,points.length-fieldTimelineLimit)).map((p,i)=>'<button class="gpsrow" onclick="focusGPSPoint(\''+E(p.id)+'\')"><span>'+fieldTime(p.captured)+'</span><strong>'+E(({ 'clock-in':'Absen Masuk','clock-out':'Absen Pulang',journey:'Titik perjalanan'})[p.kind]||p.kind)+'</strong><small>'+p.lat.toFixed(6)+', '+p.lng.toFixed(6)+' · ±'+Math.round(p.accuracy)+' m</small></button>').join('')+(points.length>fieldTimelineLimit?btn('Tampilkan titik sebelumnya','fieldTimelineLimit+=100;renderContent()'):''):empty('Belum ada titik GPS pada tanggal ini. Member perlu Absen Masuk dan mengizinkan lokasi.'));
}
function projectMap(lat,lng,z){let size=256*2**z,phi=Math.max(-85.05112878,Math.min(85.05112878,lat))*Math.PI/180;return {x:(lng+180)/360*size,y:(1-Math.log(Math.tan(phi)+1/Math.cos(phi))/Math.PI)/2*size}}
function unprojectMap(x,y,z){let size=256*2**z;return {lat:Math.atan(Math.sinh(Math.PI*(1-2*y/size)))*180/Math.PI,lng:x/size*360-180}}
function fitFieldMap(w,h){
 const points=fieldData?.points||[],latest=fieldData?.members?.filter(m=>m.latest).map(m=>m.latest)||[],selected=fieldData?.members?.find(m=>m.id===fieldMember)?.latest;
 const a=points.length?points:selected?[selected]:latest;if(!a.length){mapState.fitted=true;return}
 for(let z=17;z>=3;z--){const p=a.map(p=>projectMap(p.lat,p.lng,z)),xs=p.map(p=>p.x),ys=p.map(p=>p.y),minx=Math.min(...xs),maxx=Math.max(...xs),miny=Math.min(...ys),maxy=Math.max(...ys);if(maxx-minx<w-90&&maxy-miny<h-100||z===3){Object.assign(mapState,{...unprojectMap((minx+maxx)/2,(miny+maxy)/2,z),zoom:a.length===1?15:z,fitted:true});return}}
}
let fieldMapDrag=null;
function drawFieldMap(){
 const map=document.querySelector('#fieldMap'),layers=document.querySelector('#fieldMapLayers');if(!map||!layers)return;
 const w=map.clientWidth||(mobile?330:700),h=map.clientHeight||(mobile?330:420);
 if(!mapState.fitted)fitFieldMap(w,h);
 const z=mapState.zoom,center=projectMap(mapState.lat,mapState.lng,z),left=center.x-w/2,top=center.y-h/2,n=2**z;
 let tiles='';
 for(let x=Math.floor(left/256);x<=Math.floor((left+w)/256);x++)for(let y=Math.floor(top/256);y<=Math.floor((top+h)/256);y++){if(y<0||y>=n)continue;tiles+='<img class="maptile" alt="" draggable="false" src="https://tile.openstreetmap.org/'+z+'/'+((x%n+n)%n)+'/'+y+'.png" style="left:'+(x*256-left)+'px;top:'+(y*256-top)+'px">'}
 const pos=p=>{let q=projectMap(p.lat,p.lng,z);return {x:q.x-left,y:q.y-top}},points=fieldData?.points||[],poly=points.map(p=>{let q=pos(p);return q.x+','+q.y}).join(' ');
 let svg='<svg class="routelayer" viewBox="0 0 '+w+' '+h+'" aria-hidden="true"><polyline points="'+poly+'" fill="none" stroke="#306eae" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>'+points.filter((p,i)=>i===0||i===points.length-1||i%Math.max(1,Math.ceil(points.length/60))===0).map(p=>{let q=pos(p);return '<circle cx="'+q.x+'" cy="'+q.y+'" r="4" fill="white" stroke="#306eae" stroke-width="2"/>'}).join('')+'</svg>';
 let markers=(fieldData?.members||[]).filter(m=>m.latest).map(m=>{let q=pos(m.latest),fresh=fieldFresh(m.latest);return '<button class="gpsmarker '+fresh.kind+' '+(m.id===fieldMember?'chosen':'')+'" style="left:'+q.x+'px;top:'+q.y+'px" onclick="fieldSelectMember(\''+E(m.id)+'\')" title="'+E(m.name)+' · '+fieldTime(m.latest.captured)+'"><span>'+E(m.name.slice(0,2).toUpperCase())+'</span><small>'+E(m.name)+'</small></button>'}).join('');
 const cursor=mapState.replay>=0?points[mapState.replay]:points.find(p=>p.id===mapState.selectedPoint);
 if(cursor){let q=pos(cursor);markers+='<div class="journeycursor" style="left:'+q.x+'px;top:'+q.y+'px">●<small>'+fieldTime(cursor.captured)+'</small></div>'}
 layers.innerHTML=tiles+svg+markers+(points.length||markers?'':'<div class="mapemptystate">Belum ada lokasi yang dibagikan</div>');

 map.onpointerdown=e=>{if(e.target.closest('button,a'))return;fieldMapDrag={x:e.clientX,y:e.clientY,center:projectMap(mapState.lat,mapState.lng,z)};map.setPointerCapture?.(e.pointerId)};
 map.onpointermove=e=>{if(!fieldMapDrag)return;Object.assign(mapState,unprojectMap(fieldMapDrag.center.x-(e.clientX-fieldMapDrag.x),fieldMapDrag.center.y-(e.clientY-fieldMapDrag.y),z));mapState.fitted=true;drawFieldMap()};
 map.onpointerup=()=>{fieldMapDrag=null};map.onpointercancel=()=>{fieldMapDrag=null};
 const label=document.querySelector('#replayTime');if(label)label.textContent=cursor?fieldTime(cursor.captured):'';
}
function changeMapZoom(delta){mapState.zoom=Math.max(3,Math.min(18,mapState.zoom+delta));mapState.fitted=true;drawFieldMap()}
function focusGPSPoint(id){const p=fieldData?.points.find(p=>p.id===id);if(!p)return;Object.assign(mapState,{lat:p.lat,lng:p.lng,zoom:16,fitted:true,selectedPoint:id,replay:-1});stopJourneyReplay();drawFieldMap();document.querySelector('#fieldMap')?.scrollIntoView({behavior:'smooth',block:'center'})}
function stopJourneyReplay(){clearInterval(replayTimer);replayTimer=null;mapState.replay=-1}
function toggleJourneyReplay(){
 if(replayTimer){stopJourneyReplay();renderContent();return}
 const points=fieldData?.points||[];if(!points.length)return toast('Belum ada journey pada tanggal ini.');
 mapState.replay=0;mapState.selectedPoint='';replayTimer=setInterval(()=>{mapState.replay++;if(mapState.replay>=points.length){stopJourneyReplay();renderContent();return}drawFieldMap()},700);renderContent();
}
const fieldRenderBefore=render;
render=function(){
 fieldRenderBefore();if(!authUser)return;
 if(!mobile){const nav=document.querySelector('#nav'),ref=[...nav.children].find(b=>b.textContent==='Laporan');for(const [page,label] of [['Absen','Absen'],['Lokasi Tim','Lokasi Tim']]){let b=document.createElement('button');b.textContent=label;b.className=view===page?'active':'';if(view===page)b.setAttribute('aria-current','page');b.onclick=()=>go(page);nav.insertBefore(b,ref||null)}}
 if(mobile&&view==='Home'){const grid=document.querySelector('.homemenus');if(grid)for(const [page,icon,sub] of [['Absen','task','Masuk dan pulang dengan GPS'],['Lokasi Tim','home',authUser.role==='AO'?'Lokasi dan journey saya':'Lokasi terbaru dan journey member']]){let b=document.createElement('button');b.innerHTML=mobileIcon(icon)+'<strong>'+page+'</strong><small>'+sub+'</small>';b.onclick=()=>go(page);grid.append(b)}}
 if(['Absen','Lokasi Tim'].includes(view))document.querySelector('#title').textContent=view;
};
const fieldContentBefore=renderContent;
renderContent=function(){
 if(!authUser&&!journey)return fieldContentBefore();
 if(view==='Absen')document.querySelector('#app').innerHTML=attendanceScreen();
 else if(view==='Lokasi Tim'){document.querySelector('#app').innerHTML=locationScreen();drawFieldMap();}
 else fieldContentBefore();
};
const fieldGoBefore=go;
go=function(page,id=''){
 if(journey&&['Absen','Lokasi Tim'].includes(page))return toast('Keluar dari simulasi untuk membuka lokasi kerja.');
 fieldGoBefore(page,id);if(['Absen','Lokasi Tim'].includes(page)){if(!fieldMember)fieldMember=authUser.id;loadField(true)}
 else stopJourneyReplay();
};
const fieldLogoutBefore=logoutLocal;
logoutLocal=function(){stopFieldWatch();stopJourneyReplay();fieldData=null;fieldMember='';clearInterval(fieldPoll);fieldLogoutBefore()};
const fieldBootBefore=bootConnected;
bootConnected=async function(){await fieldBootBefore();clearInterval(fieldPoll);fieldPoll=setInterval(()=>{if(authUser&&!journey&&(['Absen','Lokasi Tim'].includes(view)||fieldWatch!==null))loadField()},15000)};
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&authUser){if(['Absen','Lokasi Tim'].includes(view))loadField(true);if(fieldWatch!==null)gpsOnce().then(p=>fieldWatch!==null&&sendFieldPoint(p,true)).catch(()=>{})}});
if(authUser)render();
clearInterval(fieldPoll);fieldPoll=setInterval(()=>{if(authUser&&!journey&&(['Absen','Lokasi Tim'].includes(view)||fieldWatch!==null))loadField()},15000);

const memberJourneyContentBefore=renderContent;
renderContent=function(){
 memberJourneyContentBefore();
 if(view==='Member'&&authUser?.role==='Superadmin')document.querySelectorAll('#app tbody tr').forEach((row,i)=>{
  const m=memberList[i];if(!m)return;row.dataset.fieldMember=m.id;row.tabIndex=0;row.classList.add('clickablerow');
  const button=document.createElement('button');button.textContent='Lihat Journey';button.onclick=e=>{e.stopPropagation();openAttendanceJourney(m.id,fieldDay)};const cell=row.lastElementChild;if(cell){const actions=document.createElement('div');actions.className='memberrowactions';while(cell.firstChild)actions.append(cell.firstChild);actions.append(button);cell.append(actions)}
  row.onclick=e=>{if(!e.target.closest('button,a,input,select,textarea'))openAttendanceJourney(m.id,fieldDay)};
  row.onkeydown=e=>{if(e.target===row&&['Enter',' '].includes(e.key)){e.preventDefault();openAttendanceJourney(m.id,fieldDay)}};
 });
};
