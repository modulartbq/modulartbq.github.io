/* ===== CONFIGURACIÓN MODULART ===== */
/* 1) Cambia este correo por el de tu usuario administrador (el mismo de Firebase) */
const ADMIN_EMAIL='modulart.bq@gmail.com';
const firebaseConfig = {
  apiKey: "AIzaSyDcgQh6MCFubkF1xaLj-UFTZ5vl-zk0UEM",
  authDomain: "modulart-c8fa4.firebaseapp.com",
  projectId: "modulart-c8fa4",
  storageBucket: "modulart-c8fa4.firebasestorage.app",
  messagingSenderId: "1019813085275",
  appId: "1:1019813085275:web:5963ea3c0450a08e6eff7e"
};
/* ================================== */
firebase.initializeApp(firebaseConfig);
const MOD={db:firebase.firestore(),auth:firebase.auth(),cfg:firebaseConfig,user:null,admin:false,name:''};
MOD.perfil=async u=>{
  if((u.email||'').toLowerCase()===ADMIN_EMAIL.toLowerCase())return{ok:true,admin:true,name:'Administrador'};
  try{const d=await MOD.db.collection('users').doc(u.uid).get();if(d.exists&&d.data().active)return{ok:true,admin:false,name:d.data().name}}catch(e){}
  return{ok:false}};
MOD.ready=(cb,needAdmin)=>MOD.auth.onAuthStateChanged(async u=>{
  if(!u){location.href='index.html';return}
  const p=await MOD.perfil(u);
  if(!p.ok||(needAdmin&&!p.admin)){if(!p.ok)await MOD.auth.signOut();location.href='index.html';return}
  MOD.user=u;MOD.admin=p.admin;MOD.name=p.name;document.body.classList.toggle('emp',!p.admin);
  const g=document.getElementById('gate');if(g)g.remove();cb()});
