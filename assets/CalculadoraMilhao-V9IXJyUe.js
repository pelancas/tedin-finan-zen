import{r as a,j as e}from"./index-BEwt1A1P.js";const w=t=>parseFloat(t.replace(/\./g,"").replace(",","."))||0,u=t=>t.toLocaleString("pt-BR",{minimumFractionDigits:2,maximumFractionDigits:2}),N=t=>{const o=t.replace(/\D/g,"");return o?(parseInt(o,10)/100).toLocaleString("pt-BR",{minimumFractionDigits:2}):""};function f({label:t,value:o,accent:n,delay:m=0,visible:l}){return e.jsxs("div",{className:"result-card",style:{borderLeft:`4px solid ${n}`,transitionDelay:`${m}ms`,opacity:l?1:0,transform:l?"translateY(0)":"translateY(12px)",transition:"opacity 0.45s ease, transform 0.45s ease"},children:[e.jsx("p",{className:"result-label",children:t}),e.jsxs("p",{className:"result-value",children:["R$ ",o]})]})}function A(){const[t,o]=a.useState(""),[n,m]=a.useState(""),[l,C]=a.useState(""),[g,F]=a.useState("Anos"),[j,M]=a.useState(""),[i,z]=a.useState(null),[x,b]=a.useState(!1),v=a.useRef(null),R=()=>{const r=w(t),s=w(n),p=(parseFloat(j.replace(",","."))||0)/100,y=parseInt(l,10)||0,d=g==="Anos"?y*12:y;if(!r||!d)return;const h=Math.pow(1+p,1/12)-1;let c=0;if(h===0)c=Math.max(0,(r-s)/d);else{const k=Math.pow(1+h,d);c=Math.max(0,(r-s*k)/((k-1)/h))}const S=c*d+s,W=Math.max(0,r-S);z({monthlyPayment:c,totalSaved:r,interestEarned:W}),b(!1),setTimeout(()=>b(!0),50)};return a.useEffect(()=>{i&&v.current&&window.innerWidth<768&&setTimeout(()=>{var s;return(s=v.current)==null?void 0:s.scrollIntoView({behavior:"smooth",block:"start"})},100)},[i]),e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600;700;800;900&display=swap');

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
          background: var(--vt-darker);
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

        /* Layout */
        .vt-main { max-width: 80rem; margin: 0 auto; padding: 3rem 1.5rem; display: grid; gap: 3rem; }
        @media (min-width: 768px) { .vt-main { padding: 3rem 5rem; } }
        @media (min-width: 1024px) { .vt-main { grid-template-columns: 1fr 340px; } }

        /* Section heading */
        .vt-section-heading { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem; }
        .vt-section-heading h2 { font-size: 1.8rem; font-weight: 800; color: var(--vt-darker); display: flex; align-items: center; gap: 0.6rem; }
        .vt-section-heading h2 svg { color: var(--vt-dark); flex-shrink: 0; }
        .vt-section-heading p { color: #607060; font-size: 1rem; font-weight: 400; }

        /* Card */
        .vt-card { background: #fff; border-radius: 1rem; border: 1px solid #e2e8e2; padding: 2rem; box-shadow: 0 1px 3px rgba(26,69,55,0.06); }

        /* Form grid */
        .vt-form-grid { display: grid; gap: 1.25rem; }
        @media (min-width: 640px) { .vt-form-grid { grid-template-columns: 1fr 1fr; } }

        .vt-field { display: flex; flex-direction: column; gap: 0.45rem; }
        .vt-label { font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--vt-dark); }
        .vt-input-wrap { position: relative; }
        .vt-prefix, .vt-suffix {
          position: absolute; top: 50%; transform: translateY(-50%);
          font-weight: 600; font-size: 0.85rem; color: #8aab96; pointer-events: none;
        }
        .vt-prefix { left: 1rem; }
        .vt-suffix { right: 1rem; }
        .vt-input {
          width: 100%; padding: 0.9rem 1rem; border-radius: 0.6rem;
          border: 1.5px solid #d0dbd2; background: #f7f9f7;
          font-family: 'Work Sans', sans-serif; font-size: 0.95rem; font-weight: 500; color: var(--vt-darker);
          outline: none; transition: border-color 0.2s, box-shadow 0.2s;
        }
        .vt-input:focus { border-color: var(--vt-dark); box-shadow: 0 0 0 3px rgba(26,69,55,0.12); }
        .vt-input.has-prefix { padding-left: 2.8rem; }
        .vt-input.has-suffix { padding-right: 2.5rem; }

        .vt-period-row { display: flex; gap: 0.5rem; }
        .vt-select {
          width: 35%; padding: 0.9rem 0.75rem; border-radius: 0.6rem;
          border: 1.5px solid #d0dbd2; background: #f7f9f7;
          font-family: 'Work Sans', sans-serif; font-size: 0.9rem; font-weight: 600; color: var(--vt-darker);
          outline: none; cursor: pointer; transition: border-color 0.2s;
        }
        .vt-select:focus { border-color: var(--vt-dark); }

        /* CTA button */
        .vt-btn {
          width: 100%; margin-top: 0.5rem;
          background: var(--vt-dark); color: #fff;
          font-family: 'Work Sans', sans-serif; font-weight: 800; font-size: 1rem;
          letter-spacing: 0.01em; padding: 1rem 2rem; border-radius: 0.6rem; border: none;
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem;
          transition: background 0.2s, transform 0.15s;
        }
        .vt-btn:hover { background: #16382c; transform: translateY(-1px); }
        .vt-btn:active { transform: translateY(0); }
        .vt-btn svg { transition: transform 0.2s; }
        .vt-btn:hover svg { transform: translateX(4px); }

        /* Result cards */
        .vt-results-grid { display: grid; gap: 0.75rem; margin-top: 1.5rem; }
        @media (min-width: 640px) { .vt-results-grid { grid-template-columns: repeat(3, 1fr); } }

        .result-card {
          background: #fff; border-radius: 0.75rem; padding: 1.25rem 1.5rem;
          box-shadow: 0 1px 3px rgba(26,69,55,0.06);
        }
        .result-label { font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.07em; color: #7a9a82; margin-bottom: 0.35rem; }
        .result-value { font-size: 1.4rem; font-weight: 900; color: var(--vt-darker); }

        /* ── Sidebar ── */
        .vt-aside { display: flex; flex-direction: column; gap: 1.5rem; }

        /* Promo card */
        .vt-promo { border-radius: 1rem; overflow: hidden; position: relative; }
        .vt-promo img { width: 100%; height: 16rem; object-fit: cover; display: block; transition: transform 0.5s; }
        .vt-promo:hover img { transform: scale(1.04); }
        .vt-promo-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, var(--vt-darker) 40%, transparent);
          display: flex; flex-direction: column; justify-content: flex-end; padding: 1.5rem;
        }
        .vt-badge {
          display: inline-block; margin-bottom: 0.5rem;
          background: var(--vt-mid); color: #fff;
          font-size: 0.65rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em;
          padding: 0.25rem 0.6rem; border-radius: 0.25rem;
        }
        .vt-promo h3 { color: #fff; font-size: 1.1rem; font-weight: 800; margin-bottom: 0.4rem; }
        .vt-promo p { color: #a3b8ac; font-size: 0.85rem; margin-bottom: 0.75rem; }
        .vt-promo-link { color: var(--vt-light); font-size: 0.85rem; font-weight: 700; display: flex; align-items: center; gap: 0.3rem; text-decoration: none; }
        .vt-promo-link:hover { text-decoration: underline; }

        /* Resources */
        .vt-resources h3 { font-size: 1.05rem; font-weight: 800; color: var(--vt-darker); margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.5rem; }
        .vt-resources h3 svg { color: var(--vt-dark); }
        .vt-resources ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0; }
        .vt-resource-link { display: flex; align-items: flex-start; gap: 0.75rem; padding: 0.85rem 0; text-decoration: none; color: #4a6450; transition: color 0.2s; }
        .vt-resource-link:hover { color: var(--vt-dark); }
        .vt-resource-link:hover .vt-resource-icon { color: var(--vt-dark); }
        .vt-resource-icon { color: #9ab8a0; flex-shrink: 0; margin-top: 1px; transition: color 0.2s; }
        .vt-resource-title { font-size: 0.875rem; font-weight: 600; margin-bottom: 0.15rem; }
        .vt-resource-desc { font-size: 0.75rem; color: #8aab96; }
        .vt-divider { border: none; border-top: 1px solid #e8ede9; margin: 0; }
      `}),e.jsxs("div",{className:"vt-root",children:[e.jsxs("section",{className:"vt-hero",children:[e.jsxs("div",{className:"vt-hero-inner",children:[e.jsxs("nav",{className:"vt-breadcrumb",children:[e.jsx("a",{href:"#",children:"Home"}),e.jsx("span",{children:"/"}),e.jsx("a",{href:"#",children:"Ferramentas"}),e.jsx("span",{children:"/"}),e.jsx("span",{style:{color:"#d9d4c4"},children:"Calculadora"})]}),e.jsxs("h1",{children:["Calculadora de"," ",e.jsx("span",{children:"Metas Financeiras"})]}),e.jsx("p",{children:"Planeje seu futuro com precisão. Defina seus objetivos e descubra o caminho exato para a sua liberdade financeira através de cálculos baseados em rendimentos reais."})]}),e.jsx("svg",{className:"vt-hero-blob",viewBox:"0 0 200 200",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M44.7,-76.4C58.3,-69.2,70.1,-57.4,77.6,-43.3C85.2,-29.2,88.5,-12.8,87.3,3.3C86.1,19.4,80.4,35.2,70.9,48.2C61.3,61.2,47.9,71.4,33.1,77.4C18.3,83.4,2.2,85.1,-13.7,81.9C-29.5,78.7,-45.1,70.5,-57.8,59.3C-70.5,48.1,-80.4,33.9,-84.6,18.5C-88.7,3,-87.1,-13.7,-80.3,-28.4C-73.6,-43.1,-61.7,-55.8,-48.2,-63C-34.7,-70.2,-19.5,-71.9,-2.4,-67.7C14.7,-63.5,29.3,-53.4,44.7,-76.4Z",fill:"#abccb5",transform:"translate(100 100)"})})]}),e.jsxs("main",{className:"vt-main",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"vt-section-heading",children:[e.jsxs("h2",{children:[e.jsxs("svg",{width:"28",height:"28",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8.5 3.3 1.5 4.2C6 18 6 19 6 19h12s0-1-.5-2.8c1-.9 1.5-2.4 1.5-4.2 0-1-.25-1.75-.5-2.5L20 8s1-5-1-3z"}),e.jsx("path",{d:"M2 9v1c0 1.1.9 2 2 2h1"}),e.jsx("path",{d:"M16 11h0"})]}),"Quanto preciso poupar por mês?"]}),e.jsx("p",{children:"Diga-nos quanto você quer guardar e quando quer atingir sua meta."})]}),e.jsxs("div",{className:"vt-card",children:[e.jsxs("div",{className:"vt-form-grid",children:[e.jsxs("div",{className:"vt-field",children:[e.jsx("label",{className:"vt-label",children:"Meta de 1 Milhão (R$)"}),e.jsxs("div",{className:"vt-input-wrap",children:[e.jsx("span",{className:"vt-prefix",children:"R$"}),e.jsx("input",{className:"vt-input has-prefix",placeholder:"1.000.000,00",value:1e6,onChange:r=>o(N(r.target.value))})]})]}),e.jsxs("div",{className:"vt-field",children:[e.jsx("label",{className:"vt-label",children:"Saldo Inicial (R$)"}),e.jsxs("div",{className:"vt-input-wrap",children:[e.jsx("span",{className:"vt-prefix",children:"R$"}),e.jsx("input",{className:"vt-input has-prefix",placeholder:"Ex: 5.000,00",value:n,onChange:r=>m(N(r.target.value))})]})]}),e.jsxs("div",{className:"vt-field",children:[e.jsx("label",{className:"vt-label",children:"Prazo para Crescer"}),e.jsxs("div",{className:"vt-period-row",children:[e.jsx("input",{className:"vt-input",style:{flex:1},placeholder:"Valor",type:"number",min:1,value:l,onChange:r=>C(r.target.value)}),e.jsxs("select",{className:"vt-select",value:g,onChange:r=>F(r.target.value),children:[e.jsx("option",{children:"Anos"}),e.jsx("option",{children:"Meses"})]})]})]}),e.jsxs("div",{className:"vt-field",children:[e.jsx("label",{className:"vt-label",children:"Taxa de Juros (% ao ano)"}),e.jsxs("div",{className:"vt-input-wrap",children:[e.jsx("input",{className:"vt-input has-suffix",placeholder:"Ex: 10,5",value:j,onChange:r=>M(r.target.value)}),e.jsx("span",{className:"vt-suffix",children:"%"})]})]})]}),e.jsxs("button",{className:"vt-btn",onClick:R,children:["Calcular Meta",e.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("line",{x1:"5",y1:"12",x2:"19",y2:"12"}),e.jsx("polyline",{points:"12 5 19 12 12 19"})]})]})]}),e.jsxs("div",{className:"vt-results-grid",ref:v,children:[e.jsx(f,{label:"Total a Poupar",value:i?u(i.totalSaved):"0,00",accent:"#1a4537",delay:0,visible:x}),e.jsx(f,{label:"Parcela Mensal",value:i?u(i.monthlyPayment):"0,00",accent:"#618c70",delay:80,visible:x}),e.jsx(f,{label:"Juros Ganhos",value:i?u(i.interestEarned):"0,00",accent:"#abccb5",delay:160,visible:x})]})]}),e.jsxs("aside",{className:"vt-aside",children:[e.jsxs("div",{className:"vt-promo",children:[e.jsx("img",{src:"https://lh3.googleusercontent.com/aida-public/AB6AXuBiIAZZ1_Gx_i7qJnBZuqdTW1gDH3BRnNYO_BEfyALedW6hdQWTMrCxvimHAEd8ExDNnqlKeuvR-2F8QjxPY9Dqa6TRS04rbJ4IHfWuEKjtYGv7TfDybTd72owjQcX4oPr4yCEaVGqfCSdYjZuiJMMUjzND-N92XHg60Wl0AW6pVWYbkVseir6LsmR7lMTIUZUghLYar5-r4fWxk-6_SdT0ZodH-4-NK0c10UUt2AWOvWW4ONhyInd5nJ0-mswYeBWEQUOaxjfpSaAH",alt:"Moedas empilhadas com planta crescendo"}),e.jsxs("div",{className:"vt-promo-overlay",children:[e.jsx("span",{className:"vt-badge",children:"Destaque"}),e.jsx("h3",{children:"Guia de Investimentos 2024"}),e.jsx("p",{children:"Descubra as melhores taxas para seu perfil."}),e.jsxs("a",{href:"#",className:"vt-promo-link",children:["Saiba mais",e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}),e.jsx("polyline",{points:"15 3 21 3 21 9"}),e.jsx("line",{x1:"10",y1:"14",x2:"21",y2:"3"})]})]})]})]}),e.jsxs("div",{className:"vt-card vt-resources",children:[e.jsxs("h3",{children:[e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M4 19.5A2.5 2.5 0 0 1 6.5 17H20"}),e.jsx("path",{d:"M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"})]}),"Recursos Úteis"]}),e.jsx("ul",{children:[{icon:"article",title:"28 Formas de Economizar",desc:"Pequenas mudanças, grandes resultados."},{icon:"stats",title:"Controle de Gastos Mensais",desc:"Planilha gratuita para download."},{icon:"bank",title:"Renda Fixa vs Variável",desc:"Qual o melhor para sua meta?"},{icon:"calc",title:"Calculadora de Juros Compostos",desc:"O poder do tempo ao seu favor."}].map((r,s,p)=>e.jsxs("li",{children:[e.jsxs("a",{href:"#",className:"vt-resource-link",children:[e.jsxs("svg",{className:"vt-resource-icon",width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[r.icon==="article"&&e.jsxs(e.Fragment,{children:[e.jsx("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),e.jsx("polyline",{points:"14 2 14 8 20 8"}),e.jsx("line",{x1:"16",y1:"13",x2:"8",y2:"13"}),e.jsx("line",{x1:"16",y1:"17",x2:"8",y2:"17"}),e.jsx("polyline",{points:"10 9 9 9 8 9"})]}),r.icon==="stats"&&e.jsxs(e.Fragment,{children:[e.jsx("line",{x1:"18",y1:"20",x2:"18",y2:"10"}),e.jsx("line",{x1:"12",y1:"20",x2:"12",y2:"4"}),e.jsx("line",{x1:"6",y1:"20",x2:"6",y2:"14"})]}),r.icon==="bank"&&e.jsxs(e.Fragment,{children:[e.jsx("line",{x1:"3",y1:"22",x2:"21",y2:"22"}),e.jsx("line",{x1:"6",y1:"18",x2:"6",y2:"11"}),e.jsx("line",{x1:"10",y1:"18",x2:"10",y2:"11"}),e.jsx("line",{x1:"14",y1:"18",x2:"14",y2:"11"}),e.jsx("line",{x1:"18",y1:"18",x2:"18",y2:"11"}),e.jsx("polygon",{points:"12 2 20 7 4 7"})]}),r.icon==="calc"&&e.jsxs(e.Fragment,{children:[e.jsx("rect",{x:"4",y:"2",width:"16",height:"20",rx:"2"}),e.jsx("line",{x1:"8",y1:"6",x2:"16",y2:"6"}),e.jsx("line",{x1:"8",y1:"10",x2:"10",y2:"10"}),e.jsx("line",{x1:"14",y1:"10",x2:"16",y2:"10"}),e.jsx("line",{x1:"8",y1:"14",x2:"10",y2:"14"}),e.jsx("line",{x1:"14",y1:"14",x2:"16",y2:"14"}),e.jsx("line",{x1:"8",y1:"18",x2:"10",y2:"18"}),e.jsx("line",{x1:"14",y1:"18",x2:"16",y2:"18"})]})]}),e.jsxs("div",{children:[e.jsx("p",{className:"vt-resource-title",children:r.title}),e.jsx("p",{className:"vt-resource-desc",children:r.desc})]})]}),s<p.length-1&&e.jsx("hr",{className:"vt-divider"})]},s))})]})]})]})]})]})}export{A as default};
