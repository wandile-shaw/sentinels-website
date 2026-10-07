/* SENTINELS - shared script. Header, footer, space background and character data live HERE only. */

/* ===== CHARACTER DATA - edit names, colours, stats (0-100), text here ===== */
const CHARACTERS=[
 {name:"WANDILE",role:"THE BLUE SENTINEL",c:"#42a5ff",img:"Wandile character art.jpeg",ab:"Strength - Speed - Flight",
  desc:"Begins with immense strength, later gains speed and flight, with retractable wings and shield.",s:{Strength:90,Speed:70,Combat:80,"Ability Level":85}},
 {name:"XAVIER",role:"THE POWERHOUSE",c:"#ff4d55",img:"Xavier character art final.jpeg",ab:"Strength",
  desc:"The red Sentinel and the team's powerhouse.",s:{Strength:98,Speed:40,Combat:85,"Ability Level":80}},
 {name:"KYLA",role:"THE SPEEDSTER",c:"#ff72c7",img:"Kyla character art final 1.jpeg",ab:"Speed",
  desc:"The pink and white Sentinel with extraordinary speed.",s:{Strength:45,Speed:98,Combat:75,"Ability Level":82}},
 {name:"CEE",role:"THE AERIAL SENTINEL",c:"#42e38b",img:"Cee character art.jpeg",ab:"Flight - Energy Blasts",
  desc:"Flies with retractable wings and fires energy blasts from her hands.",s:{Strength:55,Speed:75,Combat:80,"Ability Level":84}}
];
const EXTRAS=[
 {name:"VAELOR",role:"EXTRA",c:"#b48cff",img:"Vaelor character art final.jpeg",ab:"Unknown",desc:"Details coming soon.",s:{Strength:60,Speed:60,Combat:60,"Ability Level":60}},
 {name:"ZYRON",role:"EXTRA",c:"#ffb35c",img:"Zyron character art final.jpeg",ab:"Unknown",desc:"Details coming soon.",s:{Strength:60,Speed:60,Combat:60,"Ability Level":60}},
 {name:"COMMANDER VORAX",role:"EXTRA",c:"#ff6b3d",img:"Commander vorax character art final.jpeg",ab:"Unknown",desc:"Details coming soon.",s:{Strength:60,Speed:60,Combat:60,"Ability Level":60}},
 {name:"VORAX",role:"EXTRA",c:"#e0e4ea",img:"Vorax character art final 1.jpeg",ab:"Unknown",desc:"Details coming soon.",s:{Strength:60,Speed:60,Combat:60,"Ability Level":60}}
];
/* ========================================================================= */

const NAV=[["home","Home","index.html"],["volumes","Volumes","volumes.html"],["characters","Characters","index.html#characters"],["about","About","about.html"]];

document.addEventListener("DOMContentLoaded",()=>{
 const r=(a,b)=>a+Math.random()*(b-a), el=(c,st,p)=>{const d=document.createElement("div");d.className=c;d.style.cssText=st||"";p.appendChild(d);return d};

 /* space background */
 const sp=document.createElement("div");sp.className="space";document.body.prepend(sp);
 for(let i=0;i<90;i++)el("star",`top:${r(0,100)}%;left:${r(0,100)}%;animation-delay:-${r(0,4)}s;opacity:${r(.4,1)}`,sp);
 [["#2a6bd6",150,"8%","78%",""],["#c4572a",90,"62%","6%","ring"],["#7b4bd1",60,"80%","60%",""]].forEach(([c,s,t,l,x])=>
  el("planet "+x,`width:${s}px;height:${s}px;top:${t};left:${l};background:radial-gradient(circle at 30% 28%,${c},#050608 80%)`,sp));
 for(let i=0;i<9;i++)el("rock"+(i%3==0?" hot":""),`--s:${r(10,26)}px;top:${r(5,95)}%;left:${r(0,95)}%;animation-duration:${r(20,50)}s`,sp);
 [["15%","10%"],["50%","88%"],["85%","25%"]].forEach(([t,l],i)=>el("sat",`top:${t};left:${l};animation-delay:-${i*5}s`,sp));
 [["20%",13],["45%",19],["70%",16],["88%",24]].forEach(([t,d],i)=>el("ship",`top:${t};animation-duration:${d}s;animation-delay:-${i*5}s`,sp));

 /* header */
 const page=document.body.dataset.page||"home";
 const h=document.createElement("header");h.className="top";
 h.innerHTML=`<a class="brand" href="index.html">SENTINELS</a><nav>${NAV.map(n=>`<a href="${n[2]}" class="${n[0]==page?"active":""}">${n[1].toUpperCase()}</a>`).join("")}</nav>`;
 document.body.prepend(h);

 /* footer */
 const f=document.createElement("footer");f.className="foot";
 f.innerHTML="Website created by Wandile Shaw. © "+new Date().getFullYear()+" Sentinels.";
 document.body.appendChild(f);

 /* flip cards */
 const build=(list,box)=>{const g=document.getElementById(box);if(!g)return;
  g.innerHTML=list.map(x=>`<div class="flip" tabindex="0" role="button" aria-label="${x.name} details" style="--c:${x.c}"><div class="in">
   <div class="f"><img src="${x.img}" alt="${x.name}"><span>${x.name}</span></div>
   <div class="b"><h3>${x.name}</h3><div class="role">${x.role}</div><div class="ab">${x.ab}</div><div class="desc">${x.desc}</div>
   ${Object.entries(x.s).map(([k,v])=>`<div><div class="stat"><span>${k.toUpperCase()}</span><span>${v}</span></div><div class="bar"><i style="--v:${v}%"></i></div></div>`).join("")}</div></div></div>`).join("");
  g.querySelectorAll(".flip").forEach(c=>{const t=()=>c.classList.toggle("on");c.onclick=t;c.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();t()}}})};
 build(CHARACTERS,"chars");build(EXTRAS,"extras");

 /* reader */
 const st=document.getElementById("pgimg");
 if(st){const v=+(new URLSearchParams(location.search).get("v")||1),N={1:25}[v]||1;let p=1,z=0;const Z=[100,150,200];
  const show=()=>{st.src=`volume${v}/Page-${String(p).padStart(2,"0")}.jpeg`;document.getElementById("pg").textContent=`Volume ${v} - Page ${p} / ${N}`;
   st.style.maxWidth=z?"none":"900px";st.style.width=Z[z]+"%";document.getElementById("zm").textContent="Zoom "+Z[z]+"%";
   if(p<N)new Image().src=`volume${v}/Page-${String(p+1).padStart(2,"0")}.jpeg`};
  const go=d=>{p=Math.min(N,Math.max(1,p+d));show();window.scrollTo(0,0)};
  document.getElementById("pv").onclick=()=>go(-1);document.getElementById("nx").onclick=()=>go(1);
  document.getElementById("zm").onclick=()=>{z=(z+1)%3;show()};
  document.onkeydown=e=>{if(e.key==="ArrowLeft")go(-1);if(e.key==="ArrowRight")go(1)};show()}
});
