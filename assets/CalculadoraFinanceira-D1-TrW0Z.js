import{r as g,j as e}from"./index-DLXXpc68.js";const R="/favicon.png",E=.05,y=Math.pow(1+E,1/12)-1;function S(s){return"R$ "+Math.round(s).toLocaleString("pt-BR")}function M(s){return"R$ "+s.toLocaleString("pt-BR",{minimumFractionDigits:2,maximumFractionDigits:2})}function I(s,v,n){let i=s;for(let c=1;c<=n;c++)i=i*(1+y)+v;return i}function P(s,v,n){const i=Math.pow(1+y,v);return i===1?(n-s*i)/v:(n-s*i)*y/(i-1)}function B(s,v,n,i,c,w){const p=Math.max(1,v-s),a=p*12;let f,o;if(w==="aporte")o=i,f=I(n,o,a);else{const l=c/y;f=l,o=Math.max(0,P(n,a,l))}const d=Math.max(0,n+o*a),u=Math.max(0,f-d),A=f*y,N=200;let b=0,x=n;for(let l=1;l<=a;l++)x=x*(1+y)+o+N,x>=f&&b===0&&(b=a-l);return{anos:p,meses:a,saldo:f,aporteEfetivo:o,totalInvestido:d,jurosGanhos:u,rendaPassiva:A,anosAntec:(b/12).toFixed(1),mid1Age:Math.round(s+p/3),mid2Age:Math.round(s+2*p/3),extra:N}}function W(s,v,n,i,c){const w=s.parentElement.getBoundingClientRect(),p=window.devicePixelRatio||1;s.width=w.width*p,s.height=200*p,s.style.width=w.width+"px",s.style.height="200px";const a=s.getContext("2d");a.scale(p,p);const f=w.width,o=200;a.clearRect(0,0,f,o);const d=80,u=[];for(let t=0;t<=d;t++){const m=Math.round(t*i/d);let k=v;for(let z=1;z<=m;z++)k=k*(1+y)+n;u.push(k)}const A=Math.max(...u,1),N=8,b=16,x=t=>N+t/d*(f-N*2),l=t=>o-b-t/A*(o-b*2),C=c==="aporte"?"#1daf66":"#FFA726",F=c==="aporte"?"rgba(29,175,102,0.18)":"rgba(255,167,38,0.15)",r=c==="aporte"?"rgba(29,175,102,0.01)":"rgba(255,167,38,0.01)",h=c==="aporte"?"#a8e6c8":"#FFD08A",j=a.createLinearGradient(0,0,0,o);j.addColorStop(0,F),j.addColorStop(1,r),a.beginPath(),a.moveTo(x(0),l(u[0]));for(let t=1;t<=d;t++)a.lineTo(x(t),l(u[t]));a.lineTo(x(d),o-b),a.lineTo(x(0),o-b),a.closePath(),a.fillStyle=j,a.fill(),a.beginPath(),a.moveTo(x(0),l(u[0]));for(let t=1;t<=d;t++)a.lineTo(x(t),l(u[t]));a.strokeStyle=C,a.lineWidth=2.5,a.lineJoin="round",a.stroke(),[0,Math.round(d/3),Math.round(2*d/3),d].forEach((t,m,k)=>{a.beginPath(),a.arc(x(t),l(u[t]),5,0,Math.PI*2),a.fillStyle=m===k.length-1?h:"#fff",a.strokeStyle=m===k.length-1?h:C,a.lineWidth=2.5,a.fill(),a.stroke()})}const T=()=>e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("polyline",{points:"23 6 13.5 15.5 8.5 10.5 1 18"}),e.jsx("polyline",{points:"17 6 23 6 23 12"})]}),L=()=>e.jsxs("svg",{width:"11",height:"11",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:[e.jsx("path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14"}),e.jsx("polyline",{points:"22 4 12 14.01 9 11.01"})]}),$=()=>e.jsx("svg",{width:"22",height:"22",viewBox:"0 0 24 24",fill:"none",stroke:"#1daf66",strokeWidth:"2.2",children:e.jsx("path",{d:"M22 12h-4l-3 9L9 3l-3 9H2"})}),H=()=>e.jsxs("svg",{width:"22",height:"22",viewBox:"0 0 24 24",fill:"none",stroke:"#FFA726",strokeWidth:"2.2",children:[e.jsx("line",{x1:"12",y1:"1",x2:"12",y2:"23"}),e.jsx("path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"})]}),D=()=>e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"#1daf66",strokeWidth:"2.5",children:e.jsx("path",{d:"M13 2L3 14h9l-1 8 10-12h-9l1-8z"})}),O=()=>e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"#FFA726",strokeWidth:"2.5",children:e.jsx("path",{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"})}),G=()=>e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.2",children:[e.jsx("line",{x1:"12",y1:"1",x2:"12",y2:"23"}),e.jsx("path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"})]}),J=()=>e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.2",children:e.jsx("path",{d:"M22 12h-4l-3 9L9 3l-3 9H2"})}),V=`
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; }
  input[type=number] { -moz-appearance: textfield; }
  :root {
    --deep:#1daf66; --dark:#1A2E35; --accent:#FFA726; --bg:#FFFDF5;
    --card:#fff; --text:#1A2E35; --muted:#475569; --border:#e2e8e4;
    --shadow:0 2px 20px rgba(26,46,53,0.07);
  }

  .vt-root {
          font-family: 'Work Sans', sans-serif;
          --vt-dark:    #1daf66;
          --vt-darker:  #1A2E35;
          --vt-mid:     #FFA726;
          --vt-light:   #FFFDF5;
          --vt-cream:   #FFFDF5;
        }

        /* Hero */
        .vt-hero {
          background: #1A2E35;
          padding: 3rem 1.5rem 3.5rem;
          position: relative;
          overflow: hidden;
        }
        @media (min-width: 768px) {
          .vt-hero { padding: 4rem 5rem 4.5rem; }
        }
        .vt-hero-inner { max-width: 72rem; margin: 0 auto; position: relative; z-index: 1; }
        .vt-breadcrumb { display: flex; gap: 0.5rem; align-items: center; margin-bottom: 1.25rem; }
        .vt-breadcrumb a, .vt-breadcrumb span { font-size: 0.8rem; font-weight: 500; color: #8aab96; text-decoration: none; }
        .vt-breadcrumb a:hover { color: var(--vt-light); }
        .vt-hero h1 { font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 900; line-height: 1.1; letter-spacing: -0.02em; color: #fff; margin-bottom: 1rem; }
        .vt-hero h1 span { color: var(--vt-light); }
        .vt-hero p { color: #a3b8ac; font-size: 1.1rem; font-weight: 300; max-width: 36rem; }
        .vt-hero-blob { position: absolute; right: -4rem; top: -4rem; width: 28rem; height: 28rem; opacity: 0.06; pointer-events: none; }

  .cr { font-family:'Work Sans',sans-serif; background:var(--bg); color:var(--text); min-height:100vh; padding:40px 20px; }
  .cc { max-width:1020px; margin:0 auto; }
  .ch1 { font-size:28px; font-weight:800; color:var(--dark); margin-bottom:4px; }
  .csub { font-size:13px; color:var(--muted); margin-bottom:32px; line-height:1.5; }
  .cla { display:grid; grid-template-columns:300px 1fr; gap:24px; align-items:start; }
  .cco { display:flex; flex-direction:column; gap:12px; }
  .ccard { background:var(--card); border:1px solid var(--border); border-radius:16px; padding:20px; box-shadow:var(--shadow); }
  .clbl { font-size:10px; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; color:var(--muted); margin-bottom:10px; }
  .cage { display:flex; align-items:center; gap:8px; }
  .cage input { width:70px; font-family:inherit; font-size:22px; font-weight:700; border:none; background:transparent; color:var(--text); outline:none; }
  .cagel { font-size:11px; color:var(--muted); align-self:flex-end; padding-bottom:4px; }
  .cages { flex:1; height:1px; background:var(--border); margin:0 4px; }
  .cvrow { display:flex; align-items:baseline; gap:4px; }
  .cpfx { font-size:14px; font-weight:600; color:var(--muted); }
  .cvin { font-family:inherit; font-size:20px; font-weight:700; border:none; background:transparent; color:var(--text); outline:none; width:100%; }
  .crrow { display:flex; justify-content:space-between; align-items:center; }
  .crla { font-size:13px; color:var(--muted); display:flex; align-items:center; gap:6px; }
  .crva { font-size:18px; font-weight:700; color:var(--deep); }
  .ctog { background:var(--card); border:1px solid var(--border); border-radius:16px; padding:6px; box-shadow:var(--shadow); display:grid; grid-template-columns:1fr 1fr; gap:4px; }
  .ctbtn { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:4px; padding:12px 8px; border-radius:12px; border:none; cursor:pointer; font-family:inherit; font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; background:transparent; color:var(--muted); transition:background 0.2s,color 0.2s,box-shadow 0.2s; }
  .ctbtn.ta { background:var(--deep); color:#fff; box-shadow:0 2px 12px rgba(29,175,102,0.3); }
  .ctbtn.tr { background:var(--accent); color:#fff; box-shadow:0 2px 12px rgba(255,167,38,0.35); }
  .cpan { margin-top:4px; }
  .cpan.pr .ccard { border-color:var(--accent); }
  .clogo { display:flex; justify-content:center; padding-top:8px; }
  .clogo img { width:96px; height:auto; opacity:0.9; transition:opacity 0.2s,transform 0.2s; }
  .clogo img:hover { opacity:1; transform:scale(1.04); }
  .cres { background:var(--card); border:1px solid var(--border); border-radius:20px; padding:28px; box-shadow:var(--shadow); min-width:0; overflow:hidden; }
  .crh { margin-bottom:20px; }
  .chb { display:grid; grid-template-columns:1fr auto; gap:12px; align-items:stretch; }
  .cdb { display:flex; align-items:center; justify-content:space-between; gap:16px; border-radius:14px; padding:16px 20px; margin-bottom:4px; }
  .cdb.da { background:linear-gradient(135deg,#e8faf2,#d4f5e4); border:1.5px solid #a8e6c8; }
  .cdb.dr { background:linear-gradient(135deg,#fff5e6,#ffeacc); border:1.5px solid #ffd08a; }
  .cdbl { display:flex; flex-direction:column; gap:3px; }
  .cdbe { font-size:10px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; }
  .da .cdbe { color:#189954; } .dr .cdbe { color:#e07b00; }
  .cdbs { font-size:12px; font-weight:500; color:var(--muted); }
  .cdbv { font-size:30px; font-weight:800; line-height:1.1; letter-spacing:-0.5px; }
  .da .cdbv { color:#1daf66; } .dr .cdbv { color:#FFA726; }
  .cdbi { width:48px; height:48px; border-radius:12px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
  .da .cdbi { background:rgba(29,175,102,0.18); } .dr .cdbi { background:rgba(255,167,38,0.18); }
  .ctcard { background:#f5f7f6; border:1.5px solid var(--border); border-radius:14px; padding:16px 20px; display:flex; flex-direction:column; justify-content:center; gap:3px; min-width:180px; }
  .ctce { font-size:10px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:var(--muted); }
  .ctcv { font-size:26px; font-weight:800; color:var(--dark); line-height:1.1; letter-spacing:-0.5px; }
  .cbadge { display:inline-flex; align-items:center; gap:4px; font-size:11px; color:var(--deep); font-weight:600; margin-top:4px; }
  .ccha { position:relative; height:200px; margin:20px 0 8px; overflow:hidden; }
  canvas.cch { width:100%; height:100%; display:block; }
  .cchl { display:flex; justify-content:space-between; font-size:10px; color:var(--muted); font-weight:500; padding:0 2px; margin-bottom:24px; }
  .cchl span:last-child { color:var(--deep); font-weight:700; }
  .cst { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; padding-top:20px; border-top:1px solid var(--border); }
  .cstl { font-size:10px; text-transform:uppercase; letter-spacing:0.08em; color:var(--muted); margin-bottom:6px; }
  .cstv { font-size:18px; font-weight:700; word-break:break-word; }
  .cstv.g { color:var(--deep); } .cstv.o { color:var(--accent); }
  .cstu { height:2px; border-radius:2px; margin-top:6px; width:40px; }
  .ctips { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-top:24px; }
  .ctip { background:#edf7f1; border-radius:14px; padding:16px; }
  .ctip.ot { background:#fff8ed; }
  .ctip h4 { font-size:13px; font-weight:700; margin-bottom:6px; display:flex; align-items:center; gap:6px; }
  .ctip p { font-size:12px; color:var(--muted); line-height:1.5; }
  @media(max-width:700px){
    .cla{grid-template-columns:1fr;}
    .chb{grid-template-columns:1fr;}
    .ctcard{min-width:unset;}
    .ctips{grid-template-columns:1fr;}
    .cres{padding:16px;}
  }
`;function _(){const[s,v]=g.useState("aporte"),[n,i]=g.useState(25),[c,w]=g.useState(55),[p,a]=g.useState(5e4),[f,o]=g.useState("50000"),[d,u]=g.useState(2500),[A,N]=g.useState("2500"),[b,x]=g.useState(1e4),[l,C]=g.useState("10000"),F=g.useRef(null),r=B(n,c,p,d,b,s),h=s==="aporte",j=g.useCallback(()=>{F.current&&W(F.current,p,r.aporteEfetivo,r.meses,s)},[p,r.aporteEfetivo,r.meses,s]);return g.useEffect(()=>(j(),window.addEventListener("resize",j),()=>window.removeEventListener("resize",j)),[j]),e.jsxs(e.Fragment,{children:[e.jsx("style",{children:V}),e.jsxs("div",{className:"cr",style:{backgroundColor:"#1A2E35"},children:[e.jsxs("section",{className:"vt-hero",children:[e.jsxs("div",{className:"vt-hero-inner",children:[e.jsxs("nav",{className:"vt-breadcrumb",children:[e.jsx("a",{href:"#",children:"Home"}),e.jsx("span",{children:"/"}),e.jsx("a",{href:"#",children:"Ferramentas"}),e.jsx("span",{children:"/"}),e.jsx("span",{style:{color:"#d9d4c4"},children:"Calculadora"})]}),e.jsxs("h1",{children:["Calculadora de"," ",e.jsx("span",{children:"Aposentadoria"})]}),e.jsx("p",{children:"Uma calculadora de renda mensal de aposentadoria estima quanto você poderá receber por mês no futuro com base nas contribuições, no tempo de investimento e na taxa de rendimento. Com esses dados, ela projeta o valor acumulado e transforma esse montante em uma renda mensal estimada para a aposentadoria."})]}),e.jsx("svg",{className:"vt-hero-blob",viewBox:"0 0 200 200",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M44.7,-76.4C58.3,-69.2,70.1,-57.4,77.6,-43.3C85.2,-29.2,88.5,-12.8,87.3,3.3C86.1,19.4,80.4,35.2,70.9,48.2C61.3,61.2,47.9,71.4,33.1,77.4C18.3,83.4,2.2,85.1,-13.7,81.9C-29.5,78.7,-45.1,70.5,-57.8,59.3C-70.5,48.1,-80.4,33.9,-84.6,18.5C-88.7,3,-87.1,-13.7,-80.3,-28.4C-73.6,-43.1,-61.7,-55.8,-48.2,-63C-34.7,-70.2,-19.5,-71.9,-2.4,-67.7C14.7,-63.5,29.3,-53.4,44.7,-76.4Z",fill:"#abccb5",transform:"translate(100 100)"})})]}),e.jsx("div",{className:"cc",children:e.jsxs("div",{className:"cla",children:[e.jsxs("div",{className:"cco",children:[e.jsxs("div",{className:"ccard",children:[e.jsx("div",{className:"clbl",children:"Idade Atual e Meta"}),e.jsxs("div",{className:"cage",children:[e.jsx("input",{type:"number",value:n,min:18,max:80,onChange:t=>i(parseInt(t.target.value))}),e.jsx("span",{className:"cagel",children:"anos"}),e.jsx("div",{className:"cages"}),e.jsx("input",{type:"number",value:c,min:20,max:90,onChange:t=>w(parseInt(t.target.value))}),e.jsx("span",{className:"cagel",children:"anos"})]})]}),e.jsxs("div",{className:"ccard",children:[e.jsx("div",{className:"clbl",children:"Patrimônio Atual"}),e.jsxs("div",{className:"cvrow",children:[e.jsx("span",{className:"cpfx",children:"R$"}),e.jsx("input",{className:"cvin",type:"number",value:f,min:0,step:1e3,onChange:t=>{o(t.target.value);const m=parseFloat(t.target.value);a(isNaN(m)?0:m)}})]})]}),e.jsxs("div",{className:"ctog",children:[e.jsxs("button",{className:"ctbtn"+(h?" ta":""),onClick:()=>v("aporte"),children:[e.jsx(G,{}),"Aporte Mensal"]}),e.jsxs("button",{className:"ctbtn"+(h?"":" tr"),onClick:()=>v("renda"),children:[e.jsx(J,{}),"Renda Esperada"]})]}),h?e.jsx("div",{className:"cpan pa",children:e.jsxs("div",{className:"ccard",children:[e.jsx("div",{className:"clbl",children:"Aporte Mensal"}),e.jsxs("div",{className:"cvrow",children:[e.jsx("span",{className:"cpfx",children:"R$"}),e.jsx("input",{className:"cvin",type:"number",value:A,min:0,step:100,onChange:t=>{N(t.target.value);const m=parseFloat(t.target.value);u(isNaN(m)?0:m)}})]})]})}):e.jsx("div",{className:"cpan pr",children:e.jsxs("div",{className:"ccard",children:[e.jsx("div",{className:"clbl",children:"Renda Passiva Esperada / mês"}),e.jsxs("div",{className:"cvrow",children:[e.jsx("span",{className:"cpfx",style:{color:"#FFA726"},children:"R$"}),e.jsx("input",{className:"cvin",type:"number",value:l,min:0,step:500,style:{color:"#FFA726"},onChange:t=>{C(t.target.value);const m=parseFloat(t.target.value);x(isNaN(m)?0:m)}})]})]})}),e.jsxs("div",{className:"ccard",children:[e.jsx("div",{className:"clbl",children:"Rentabilidade Real"}),e.jsxs("div",{className:"crrow",children:[e.jsxs("span",{className:"crla",children:[e.jsx(T,{}),"Taxa de Juros Real"]}),e.jsx("span",{className:"crva",children:"5,0% ao ano"})]})]}),e.jsx("div",{className:"clogo",children:e.jsx("img",{src:R,alt:"Orienta"})})]}),e.jsxs("div",{className:"cres",children:[e.jsx("div",{className:"crh",children:e.jsxs("div",{className:"chb",children:[e.jsxs("div",{className:"cdb "+(h?"da":"dr"),children:[e.jsxs("div",{className:"cdbl",children:[e.jsx("div",{className:"cdbe",children:h?"Renda passiva gerada":"Aporte necessário"}),e.jsx("div",{className:"cdbv",children:h?M(r.rendaPassiva)+"/mês":M(r.aporteEfetivo)+"/mês"}),e.jsx("div",{className:"cdbs",children:h?"com base no seu planejamento":"para atingir sua meta"})]}),e.jsx("div",{className:"cdbi",children:h?e.jsx($,{}):e.jsx(H,{})})]}),e.jsxs("div",{className:"ctcard",children:[e.jsx("div",{className:"ctce",children:"Total acumulado"}),e.jsx("div",{className:"ctcv",children:S(r.saldo)}),e.jsxs("div",{className:"cbadge",children:[e.jsx(L,{}),"Independência aos ",c," anos"]})]})]})}),e.jsx("div",{className:"ccha",children:e.jsx("canvas",{ref:F,className:"cch"})}),e.jsxs("div",{className:"cchl",children:[e.jsxs("span",{children:["HOJE (",n,")"]}),e.jsxs("span",{children:[r.mid1Age," ANOS"]}),e.jsxs("span",{children:[r.mid2Age," ANOS"]}),e.jsxs("span",{children:["META (",c," ANOS)"]})]}),e.jsxs("div",{className:"cst",children:[e.jsxs("div",{children:[e.jsx("div",{className:"cstl",children:"Total Investido"}),e.jsx("div",{className:"cstv",children:S(r.totalInvestido)}),e.jsx("div",{className:"cstu",style:{background:"#e2e8e4"}})]}),e.jsxs("div",{children:[e.jsx("div",{className:"cstl",children:"Juros Acumulados"}),e.jsx("div",{className:"cstv g",children:S(r.jurosGanhos)}),e.jsx("div",{className:"cstu",style:{background:"#1daf66"}})]}),e.jsxs("div",{children:[e.jsx("div",{className:"cstl",children:"Renda Passiva"}),e.jsxs("div",{className:"cstv o",children:[M(r.rendaPassiva)," /mês"]}),e.jsx("div",{className:"cstu",style:{background:"#FFA726"}})]})]}),e.jsxs("div",{className:"ctips",children:[e.jsxs("div",{className:"ctip",children:[e.jsxs("h4",{children:[e.jsx(D,{}),h?"Otimização de Aportes":"Patrimônio Alvo"]}),e.jsx("p",{children:h?`Adicionar R$ ${r.extra.toLocaleString("pt-BR")} extras/mês anteciparia sua independência em ${r.anosAntec} anos.`:`Para gerar ${M(b)}/mês você precisa acumular ${S(r.saldo)} em ${r.anos} anos.`})]}),e.jsxs("div",{className:"ctip ot",children:[e.jsxs("h4",{children:[e.jsx(O,{}),"Poder de Compra"]}),e.jsx("p",{children:"Este cálculo utiliza juros reais (acima da inflação), garantindo que os valores reflitam o poder de compra de hoje."})]})]})]})]})})]})]})}export{_ as default};
