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
 {name:"COMMANDER VORAX",role:"THE COMMANDER - A REAL THREAT",c:"#ff6b3d",img:"Commander vorax character art final.jpeg",ab:"Overwhelming power - Command - Combat mastery",desc:"A commanding force and the most dangerous enemy the Sentinels have faced.",s:{Strength:96,Speed:92,Combat:98,"Ability Level":95}},
 {name:"VORAX",role:"THE HUNTER",c:"#e0e4ea",img:"Vorax character art final 1.jpeg",ab:"Pursuit - Strength - Combat",desc:"Searching for the Sentinels, and a serious danger to them.",s:{Strength:80,Speed:72,Combat:85,"Ability Level":78}}
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

 /* reader: fit whole page, pinch to zoom, drag to pan, swipe to turn page */
 const st=document.getElementById("pgimg");
 if(st){document.body.classList.add("reader");
  const v=+(new URLSearchParams(location.search).get("v")||1),N={1:25}[v]||1;let p=1,sc=1,tx=0,ty=0;
  const $=id=>document.getElementById(id),src=n=>`volume${v}/Page-${String(n).padStart(2,"0")}.jpeg`,area=st.parentElement;
  const size=()=>{document.body.style.setProperty("--bh",$("rbar").offsetHeight+"px");document.body.style.setProperty("--nh",$("rnav").offsetHeight+"px")};
  const draw=()=>{if(sc<=1.001){sc=1;tx=ty=0}
   const mx=Math.max(0,(st.offsetWidth*sc-area.clientWidth)/2),my=Math.max(0,(st.offsetHeight*sc-area.clientHeight)/2);
   tx=Math.min(mx,Math.max(-mx,tx));ty=Math.min(my,Math.max(-my,ty));
   st.style.transform=`translate(${tx}px,${ty}px) scale(${sc})`;$("zm").textContent=sc>1?"[ ] Unzoom":"[ ] Zoom"};
  const show=()=>{st.src=src(p);$("pg").textContent="Page "+p+" / "+N;$("pv").disabled=p<=1;$("nx").disabled=p>=N;if(p<N)new Image().src=src(p+1);size();draw()};
  const go=d=>{const n=Math.min(N,Math.max(1,p+d));if(n===p)return;p=n;sc=1;show()};
  $("pv").onclick=()=>go(-1);$("nx").onclick=()=>go(1);
  $("zm").onclick=()=>{sc=sc>1?1:2.2;tx=ty=0;draw()};
  st.onload=draw;window.addEventListener("resize",()=>{size();draw()});
  document.onkeydown=e=>{if(e.key==="ArrowLeft")go(-1);if(e.key==="ArrowRight")go(1);if(e.key==="Escape"){sc=1;draw()}};
  /* gestures (touch + mouse). One finger: pan when zoomed, swipe left/right to turn page when NOT zoomed. Two fingers: pinch. */
  const P=new Map();let base=null,multi=false,sx=0,sy=0;
  const pts=()=>[...P.values()],rc=()=>area.getBoundingClientRect();
  const rebase=()=>{const a=pts(),r=rc();
   if(a.length===1)base={x:a[0].x,y:a[0].y,tx,ty};
   else if(a.length>1){const[m,n]=a;base={d:Math.hypot(m.x-n.x,m.y-n.y)||1,mx:(m.x+n.x)/2-r.left-r.width/2,my:(m.y+n.y)/2-r.top-r.height/2,sc,tx,ty}}
   else base=null};
  area.addEventListener("pointerdown",e=>{try{area.setPointerCapture(e.pointerId)}catch(x){}
   P.set(e.pointerId,{x:e.clientX,y:e.clientY});if(P.size===1){multi=false;sx=e.clientX;sy=e.clientY}else multi=true;rebase()});
  area.addEventListener("pointermove",e=>{if(!P.has(e.pointerId))return;P.set(e.pointerId,{x:e.clientX,y:e.clientY});const a=pts();
   if(a.length>1&&base&&base.d){const[m,n]=a,r=rc(),d=Math.hypot(m.x-n.x,m.y-n.y),cx=(m.x+n.x)/2-r.left-r.width/2,cy=(m.y+n.y)/2-r.top-r.height/2,s=Math.min(6,Math.max(1,base.sc*d/base.d));
    tx=cx-((base.mx-base.tx)/base.sc)*s;ty=cy-((base.my-base.ty)/base.sc)*s;sc=s;draw()}
   else if(a.length===1&&base&&sc>1){tx=base.tx+(a[0].x-base.x);ty=base.ty+(a[0].y-base.y);draw()}});
  const up=e=>{if(!P.has(e.pointerId))return;const one=P.size===1;P.delete(e.pointerId);
   if(e.type==="pointerup"&&one&&!multi&&sc<=1){const dx=e.clientX-sx,dy=e.clientY-sy;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.5)go(dx<0?1:-1)}
   rebase()};
  area.addEventListener("pointerup",up);area.addEventListener("pointercancel",up);
  area.addEventListener("wheel",e=>{e.preventDefault();const r=rc(),cx=e.clientX-r.left-r.width/2,cy=e.clientY-r.top-r.height/2,s=Math.min(6,Math.max(1,sc*(e.deltaY<0?1.15:1/1.15)));
   tx=cx-((cx-tx)/sc)*s;ty=cy-((cy-ty)/sc)*s;sc=s;draw()},{passive:false});
  show()}
});
