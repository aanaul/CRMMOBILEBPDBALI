/* Authentication is followed by explicit workspace selection. */
let activeBranch='',choosingBranch=false,branchSelectionBusy=false;
async function branchSelectionPage(info){
 choosingBranch=true;activeBranch='';clearInterval(pollTimer);
 if(typeof stopFieldWatch==='function')stopFieldWatch();if(typeof stopJourneyReplay==='function')stopJourneyReplay();
 if(typeof fieldPoll!=='undefined')clearInterval(fieldPoll);
 if(typeof tourActive!=='undefined'){tourActive=false;document.querySelector('#guidanceTour')?.remove();if(typeof clearTourHighlight==='function')clearTourHighlight();}
 document.querySelector('#modal')?.close();document.querySelector('#loginRoot')?.remove();
 authUser=info.user||authUser;BPD_USER=authUser;serverBase=null;
 document.documentElement.classList.add('auth-pending');
 let root=document.querySelector('#branchRoot');if(!root){root=document.createElement('section');root.id='branchRoot';root.setAttribute('aria-labelledby','branchHeading');document.body.append(root)}
 const branches=BPD_BRANCH_NAMES.filter(b=>(info.branches||[]).includes(b));
 root.innerHTML='<div class="branch-shell"><div class="branch-brand">BPD BALI<span>RELATIONSHIP WORKSPACE</span></div><div class="branch-account"><span class="branch-avatar">'+E((authUser?.name||'').slice(0,2).toUpperCase())+'</span><div><strong>'+E(authUser?.name||'')+'</strong><small>'+E(authUser?.role||'')+' · '+E(authUser?.id||'')+'</small></div><button onclick="logoutConnected()">Keluar</button></div><h1 id="branchHeading">Pilih Cabang</h1><p>Pilih workspace cabang untuk melanjutkan pekerjaan.</p><div class="branch-choices">'+branches.map((branch,i)=>'<button class="branch-choice" onclick="enterBranch('+E(JSON.stringify(branch))+')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 21V5l8-3 8 3v16H4ZM8 8h2m4 0h2M8 12h2m4 0h2M10 21v-5h4v5"/></svg><span><small>'+E(branch===BPD_BRANCH_NAMES[0]?'KANTOR PUSAT':branch===BPD_BRANCH_NAMES[1]?'KANTOR CABANG UTAMA':'KANTOR CABANG PEMBANTU')+'</small><strong>'+E(branch)+'</strong><span>'+E(branch===BPD_BRANCH_NAMES[0]?'Renon':branch===BPD_BRANCH_NAMES[1]?'Denpasar':'Teuku Umar')+'</span></span></button>').join('')+'</div><div id="branchError" role="alert"></div><p class="branch-help">Anda dapat mengganti cabang melalui Profil.</p></div>';
 root.querySelector('h1').tabIndex=-1;root.querySelector('h1').focus();
}
async function openBranchSelection(clear=true){
 if(saving)return toast('Tunggu perubahan selesai disimpan sebelum ganti cabang.');
 if(typeof journey!=='undefined'&&journey)journeyExit();
 if(typeof persistWorkspaceLocation==='function')persistWorkspaceLocation();
 try{const info=clear?await api('branch/clear',{}):await api('branches');await branchSelectionPage(info)}catch(e){toast(e.message)}
}
async function enterBranch(branch){
 if(branchSelectionBusy)return;branchSelectionBusy=true;
 const root=document.querySelector('#branchRoot');root?.querySelectorAll('.branch-choice').forEach(b=>b.disabled=true);
 const error=root?.querySelector('#branchError');if(error)error.textContent='';
 try{const selected=await api('branch',{branch});activeBranch=selected.branch;authUser=selected.user;BPD_USER=authUser;
 if(typeof fieldData!=='undefined'){fieldData=null;fieldMember='';fieldError='';fieldDay=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Makassar',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());}
 if(typeof homeAttendanceState!=='undefined')homeAttendanceState={user:'',day:'',data:null,error:'',loading:false,updated:0};
 await openConnectedWorkspace();
 }catch(e){if(error)error.textContent=e.message;activeBranch='';choosingBranch=true;}finally{branchSelectionBusy=false;root?.querySelectorAll('.branch-choice').forEach(b=>b.disabled=false)}
}
