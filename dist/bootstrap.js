globalThis.BPD_USER=null;globalThis.BPD_MASTERS=null;globalThis.BPD_SIM_ACTIVE=false;
function activityKind(name){let x=globalThis.BPD_MASTERS?.activities?.find(x=>x.name===name);return ({call:'Telepon',visit:'Kunjungan',meeting:'Meeting',document:'Cek dokumen'})[x?.behavior]||name}
document.documentElement.classList.add('auth-pending');

function isReferralSource(name){let s=globalThis.BPD_MASTERS?.sources?.find(s=>s.name===name);return s?.kind==='referral'||s?.id==='source-1'||name==='Referral Lead'}

const BPD_BRANCH_NAMES=['BPD Bali HQ Renon','BPD Bali Capem Nusa Dua'];
function workspaceBranches(){return typeof db!=='undefined'&&db.config?.leadWorkflow?.branches?.length?db.config.leadWorkflow.branches:BPD_BRANCH_NAMES}
function workspaceBranchLabel(){return workspaceBranches().join(' · ')}
function userBranchLabel(){return typeof authUser!=='undefined'&&authUser?.branch?authUser.branch:'Belum ditetapkan'}
