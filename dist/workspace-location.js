/* Per-tab, per-account navigation recovery. No forms, tokens or simulation data. */
let workspaceLocationRestoring=false,workspaceLocationScroll=null,workspaceLocationTimer;
const workspaceLocationKey=()=>authUser?'bpd-location-v1:'+ (mobile?'mobile:':'cms:')+authUser.id+':'+(typeof activeBranch!=='undefined'?activeBranch:''):'';
const workspaceLocationRoutes=['Katalog Produk','Monitoring','Leads','Nasabah','Peluang','Agenda','Pengajuan','Pengajuan detail','Persetujuan','Laporan','Notifikasi','Pengaturan','Member','Absen','Lokasi Tim','Home','Profil User','Lainnya','Riwayat','Lead detail','Nasabah detail','Opportunity detail','Aktivitas detail'];
const workspaceLocationFields=[
 ['leadViewMode',()=>leadViewMode,v=>leadViewMode=v],['leadPipelineStage',()=>leadPipelineStage,v=>leadPipelineStage=v],
 ['q',()=>q,v=>q=v],['month',()=>month,v=>month=v],['statusFilter',()=>statusFilter,v=>statusFilter=v],['ownerFilter',()=>ownerFilter,v=>ownerFilter=v],
 ['listPage',()=>listPage,v=>listPage=v],['listSize',()=>listSize,v=>listSize=v],['listQuery',()=>listQuery,v=>listQuery=v],['listOwner',()=>listOwner,v=>listOwner=v],['listStatus',()=>listStatus,v=>listStatus=v],['listSource',()=>listSource,v=>listSource=v],['listProduct',()=>listProduct,v=>listProduct=v],['listRelation',()=>listRelation,v=>listRelation=v],['listGrade',()=>listGrade,v=>listGrade=v],['listPeriod',()=>listPeriod,v=>listPeriod=v],['listKind',()=>listKind,v=>listKind=v],['stageFilter',()=>stageFilter,v=>stageFilter=v],['leadChip',()=>leadChip,v=>leadChip=v],['customerStatusChip',()=>customerStatusChip,v=>customerStatusChip=v],['agendaRange',()=>agendaRange,v=>agendaRange=v],['agendaType',()=>agendaType,v=>agendaType=v],['calendarDate',()=>calendarDate,v=>calendarDate=v],['calendarMonth',()=>calendarMonth,v=>calendarMonth=v],['calendarExpanded',()=>calendarExpanded,v=>calendarExpanded=v],['recordTab',()=>recordTab,v=>recordTab=v],['recordTabFocus',()=>recordTabFocus,v=>recordTabFocus=v],['activeTab',()=>activeTab,v=>activeTab=v],['c360Tab',()=>c360Tab,v=>c360Tab=v],['c360Focus',()=>c360Focus,v=>c360Focus=v],['c360Search',()=>c360Search,v=>c360Search=v],['c360Channel',()=>c360Channel,v=>c360Channel=v],['c360AccountStatus',()=>c360AccountStatus,v=>c360AccountStatus=v],['c360From',()=>c360From,v=>c360From=v],['c360To',()=>c360To,v=>c360To=v],['c360CrossSellKind',()=>c360CrossSellKind,v=>c360CrossSellKind=v],['configTab',()=>configTab,v=>configTab=v],['appSearch',()=>appSearch,v=>appSearch=v],['applicationHistoryPage',()=>applicationHistoryPage,v=>applicationHistoryPage=v],['dashboardOwner',()=>dashboardOwner,v=>dashboardOwner=v],['dashboardRange',()=>dashboardRange,v=>dashboardRange=v],['dashboardPriority',()=>dashboardPriority,v=>dashboardPriority=v],['fieldMember',()=>fieldMember,v=>fieldMember=v],['fieldDay',()=>fieldDay,v=>fieldDay=v]
];
function persistWorkspaceLocation(){
 if(!authUser||journey||workspaceLocationRestoring||!workspaceLocationRoutes.includes(view))return;
 try{const state={version:1,view,focus,fields:Object.fromEntries(workspaceLocationFields.map(([k,get])=>[k,get()])),applicationFilters:{...applicationFilters},backListState,scroll:{window:window.scrollY||0,main:document.querySelector('main')?.scrollTop||0}};sessionStorage.setItem(workspaceLocationKey(),JSON.stringify(state))}catch{/* Storage may be disabled by browser policy. */}
}
function workspaceRouteAvailable(route,id,data){
 if(!workspaceLocationRoutes.includes(route))return false;if(route==='Member'&&authUser.role!=='Superadmin')return false;
 const collection={'Lead detail':'leads','Nasabah detail':'profiles','Opportunity detail':'opps','Aktivitas detail':'tasks','Pengajuan detail':'applications'}[route];
 if(collection){const x=data[collection]?.find(x=>x.id===id);if(!x||!mine(x))return false;if(route==='Nasabah detail'&&x.relation!=='Customer')return false;if(route==='Pengajuan detail'){const parent=data.opps?.find(o=>o.id===x.opp);if(!parent||!mine(parent))return false;}}
 return true;
}
function restoreWorkspaceLocation(data){
 let saved;try{saved=JSON.parse(sessionStorage.getItem(workspaceLocationKey())||'null')}catch{return false}
 if(saved?.version!==1||!saved.fields||!workspaceLocationRoutes.includes(saved.view))return false;
 if(!workspaceRouteAvailable(saved.view,saved.focus,data)){
 const fallback={'Lead detail':'Leads','Nasabah detail':'Nasabah','Opportunity detail':'Peluang','Aktivitas detail':'Agenda','Pengajuan detail':'Pengajuan'}[saved.view];if(fallback)view=fallback;return false;
 }
 workspaceLocationRestoring=true;view=saved.view;focus=typeof saved.focus==='string'?saved.focus:'';
 for(const [key,get,set]of workspaceLocationFields){const value=saved.fields[key],prior=get();if(typeof value!==typeof prior)continue;if(typeof value==='string'&&value.length<=2000)set(value);else if(typeof value==='number'&&Number.isInteger(value)&&value>0&&value<=10000)set(value);else if(typeof value==='boolean')set(value);}
 if(!['Daftar','Pipeline'].includes(listKind))listKind='Daftar';if(!C360_TABS.includes(c360Tab))c360Tab='Overview';
 if(saved.applicationFilters&&typeof saved.applicationFilters==='object')for(const key of ['category','owner','product','month'])if(typeof saved.applicationFilters[key]==='string'&&saved.applicationFilters[key].length<500)applicationFilters[key]=saved.applicationFilters[key];
 if(!Object.hasOwn(APPLICATION_CATEGORIES,applicationFilters.category))applicationFilters.category='all';
 if(saved.backListState&&['Leads','Nasabah','Peluang','Agenda','Persetujuan','Notifikasi'].includes(saved.backListState.view))backListState=saved.backListState;
 workspaceLocationScroll=saved.scroll;return true;
}
function finishRestoreWorkspaceLocation(){
 if(!workspaceLocationRestoring)return;
 if(['Absen','Lokasi Tim'].includes(view)&&typeof loadField==='function')loadField(true);
 requestAnimationFrame(()=>requestAnimationFrame(()=>{const pos=workspaceLocationScroll;if(pos){window.scrollTo(0,Math.max(0,Number(pos.window)||0));document.querySelector('main')?.scrollTo(0,Math.max(0,Number(pos.main)||0));}workspaceLocationRestoring=false;workspaceLocationScroll=null;persistWorkspaceLocation()}));
}
const locationContentBefore=renderContent;
renderContent=function(){const result=locationContentBefore.apply(this,arguments);persistWorkspaceLocation();return result};
const locationLogoutBefore=logoutLocal;
logoutLocal=function(){try{const key=workspaceLocationKey();if(key)sessionStorage.removeItem(key)}catch{}return locationLogoutBefore.apply(this,arguments)};
for(const event of ['click','change','input','scroll'])document.addEventListener(event,()=>{clearTimeout(workspaceLocationTimer);workspaceLocationTimer=setTimeout(persistWorkspaceLocation,150)},true);
window.addEventListener('pagehide',persistWorkspaceLocation);window.addEventListener('beforeunload',persistWorkspaceLocation);
