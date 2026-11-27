/* Browser Back/Forward and OS edge gestures use the same scoped workspace history. */
let navHistoryApplying=false,navHistoryScope='',navHistoryIndex=0,navHistoryEntries=[];
function navHistoryExtra(){return {
 location:{member:locDetail,query:locQuery,bucket:locBucket},
 travel:{member:pjMember,day:pjDay,query:pjQuery,kind:pjKind,tab:pjTab}
};}
function navHistoryIdentity(s){return JSON.stringify([s.view,s.focus,s.view==='Lokasi Tim'?s.extra?.location?.member:'',s.view==='Perjalanan'?s.extra?.travel?.member:'']);}
function navHistorySync(){
 if(navHistoryApplying||!authUser||journey||workspaceLocationRestoring||choosingBranch)return;
 const scope=workspaceLocationKey();let snapshot;try{snapshot=JSON.parse(sessionStorage.getItem(scope)||'null')}catch{return}
 if(!snapshot||snapshot.view!==view||snapshot.focus!==focus)return;
 snapshot.extra=navHistoryExtra();const identity=navHistoryIdentity(snapshot),current=BPD_NATIVE_HISTORY.state?.bpdNavigation;
 const entry={scope,index:navHistoryIndex,identity,snapshot};
 try{
 if(navHistoryScope!==scope||current?.scope!==scope){navHistoryScope=scope;navHistoryIndex=0;navHistoryEntries=[];entry.index=0;BPD_NATIVE_HISTORY.replaceState({bpdNavigation:entry},'');}
 else if(current.identity!==identity){navHistoryIndex=current.index+1;entry.index=navHistoryIndex;navHistoryEntries.length=navHistoryIndex;BPD_NATIVE_HISTORY.pushState({bpdNavigation:entry},'');}
 else {entry.index=current.index;navHistoryIndex=current.index;BPD_NATIVE_HISTORY.replaceState({bpdNavigation:entry},'');}
 navHistoryEntries[entry.index]=entry;
 }catch{/* Browser history may be unavailable in restricted embeds. */}
}
const navHistoryPersist=persistWorkspaceLocation;
persistWorkspaceLocation=function(){const r=navHistoryPersist.apply(this,arguments);navHistorySync();return r;};
for(const route of ['Perjalanan','Target & Kinerja','Kesiapan POC'])if(!workspaceLocationRoutes.includes(route))workspaceLocationRoutes.push(route);
try{BPD_NATIVE_HISTORY.scrollRestoration='manual'}catch{}
window.addEventListener('popstate',event=>{
 const entry=event.state?.bpdNavigation;if(!authUser||journey||choosingBranch)return;
 if(!entry||entry.scope!==workspaceLocationKey()){navHistorySync();return;}
 navHistoryApplying=true;navHistoryIndex=entry.index;
 document.querySelector('#modal')?.close();pjPause();stopJourneyReplay();
 const saved=entry.snapshot;
 try{
 sessionStorage.setItem(workspaceLocationKey(),JSON.stringify(saved));
 if(!restoreWorkspaceLocation(db)){view=({'Lead detail':'Leads','Nasabah detail':'Nasabah','Opportunity detail':'Peluang','Aktivitas detail':'Agenda','Pengajuan detail':'Pengajuan'})[saved.view]||(mobile?'Home':'Monitoring');focus='';}
 const extra=saved.extra;
 locDetail=saved.view==='Lokasi Tim'?extra?.location?.member||'':'';locQuery=extra?.location?.query||'';locBucket=extra?.location?.bucket||'';mapState.fitted=false;
 pjMember=saved.view==='Perjalanan'?extra?.travel?.member||'':'';pjDay=extra?.travel?.day||pjToday();pjQuery=extra?.travel?.query||'';pjKind=extra?.travel?.kind||'';pjTab=extra?.travel?.tab||'activities';pjCursor=-1;pjPopup='';pjMap.fitted=false;
 render();finishRestoreWorkspaceLocation();
 if(view==='Perjalanan')pjLoad(true);
 if(view==='Lokasi Tim')loadField(true);
 }finally{requestAnimationFrame(()=>requestAnimationFrame(()=>requestAnimationFrame(()=>{navHistoryApplying=false;persistWorkspaceLocation();})));}
});
function navHistoryParent(route){const current=BPD_NATIVE_HISTORY.state?.bpdNavigation,prior=navHistoryEntries[(current?.index||0)-1];if(prior?.scope===workspaceLocationKey()&&prior.snapshot.view===route){BPD_NATIVE_HISTORY.back();return true;}return false;}
const navHistoryBackResults=backToResults;
backToResults=function(){if(backListState&&navHistoryParent(backListState.view))return;return navHistoryBackResults.apply(this,arguments);};
for(const event of ['pageshow'])window.addEventListener(event,()=>persistWorkspaceLocation());
