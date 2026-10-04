import{r as s,j as e,a as I,S as j,I as V,C as E,e as w}from"./index-sH7U2jnZ.js";const d=t=>parseFloat(t.replace(/\./g,"").replace(",","."))||0,o=t=>t.toLocaleString("pt-BR",{minimumFractionDigits:2,maximumFractionDigits:2}),N=t=>{const n=t.replace(/\D/g,"");return n?(parseInt(n,10)/100).toLocaleString("pt-BR",{minimumFractionDigits:2}):""},W={feminino:"feminino",masculino:"masculino",nao_informar:"não informado"};function B(){const[t,n]=s.useState(""),[c,C]=s.useState(""),[p,k]=s.useState(""),[i,y]=s.useState(""),[a,z]=s.useState(null),[v,u]=s.useState(!1),h=s.useRef(null),l=parseInt(p,10)||0,g=l>0&&i!==""&&(d(t)>0||d(c)>0),S=()=>{if(!g)return;const r=d(t),x=d(c);z({idade:l,genero:i,capitalVida:r,capitalInvalidez:x,mensalVida:w(r,l,i)??0,mensalInvalidez:w(x,l,i)??0}),u(!1),setTimeout(()=>u(!0),50),window.innerWidth<768&&setTimeout(()=>{var b;return(b=h.current)==null?void 0:b.scrollIntoView({behavior:"smooth",block:"start"})},150)},m=a?a.mensalVida+a.mensalInvalidez:0,R=a!==null&&(a.idade<35||a.idade>50),f=r=>({opacity:v?1:0,transform:v?"translateY(0)":"translateY(12px)",transition:`opacity 0.45s ease ${r}ms, transform 0.45s ease ${r}ms`});return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
        .vt-root {
          font-family: 'Work Sans', sans-serif;
          --vt-dark:    #1daf66;
          --vt-darker:  #1A2E35;
          --vt-mid:     #FFA726;
          --vt-light:   #FFFDF5;
        }

        .vt-hero { background: var(--vt-darker); padding: 3rem 1.5rem 3.5rem; position: relative; overflow: hidden; }
        @media (min-width: 768px) { .vt-hero { padding: 4rem 5rem 4.5rem; } }
        .vt-hero-inner { max-width: 72rem; margin: 0 auto; position: relative; z-index: 1; }
        .vt-breadcrumb { display: flex; gap: 0.5rem; align-items: center; margin-bottom: 1.25rem; }
        .vt-breadcrumb a, .vt-breadcrumb span { font-size: 0.8rem; font-weight: 500; color: #8aab96; text-decoration: none; }
        .vt-breadcrumb a:hover { color: var(--vt-light); }
        .vt-hero h1 { font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 900; line-height: 1.1; letter-spacing: -0.02em; color: #fff; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }
        .vt-hero h1 span { color: var(--vt-light); }
        .vt-hero p { color: #a3b8ac; font-size: 1.1rem; font-weight: 300; max-width: 36rem; }
        .vt-hero-blob { position: absolute; right: -4rem; top: -4rem; width: 28rem; height: 28rem; opacity: 0.06; pointer-events: none; }

        .vt-main { max-width: 80rem; margin: 0 auto; padding: 3rem 1.5rem; display: grid; gap: 3rem; }
        @media (min-width: 768px) { .vt-main { padding: 3rem 5rem; } }
        @media (min-width: 1024px) { .vt-main { grid-template-columns: 1fr 340px; } }

        .vt-section-heading { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem; }
        .vt-section-heading h2 { font-size: 1.8rem; font-weight: 800; color: var(--vt-darker); }
        .vt-section-heading p { color: #607060; font-size: 1rem; }

        .vt-card { background: #fff; border-radius: 1rem; border: 1px solid #e2e8e2; padding: 2rem; box-shadow: 0 1px 3px rgba(26,69,55,0.06); }
        @media (max-width: 480px) { .vt-card { padding: 1.25rem; } }

        .vt-two-col { display: grid; grid-template-columns: 1fr; gap: 1.25rem; align-items: start; }
        @media (min-width: 640px) {
          .vt-two-col { grid-template-columns: 1fr 1fr; gap: 1.5rem; }
          .vt-two-col .vt-label { min-height: 2.1em; }
        }
        .vt-two-col + .vt-two-col { margin-top: 1.25rem; }
        .vt-field { display: flex; flex-direction: column; gap: 0.45rem; }
        .vt-label { font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--vt-dark); line-height: 1.3; }
        .vt-hint { font-size: 0.78rem; color: #607060; }
        .vt-input-wrap { position: relative; }
        .vt-prefix { position: absolute; top: 50%; transform: translateY(-50%); left: 1rem; font-weight: 600; font-size: 0.85rem; color: #8aab96; pointer-events: none; }
        .vt-input, .vt-select {
          width: 100%; padding: 0.9rem 1rem; border-radius: 0.6rem;
          border: 1.5px solid #d0dbd2; background: #f7f9f7;
          font-family: 'Work Sans', sans-serif; font-size: 0.95rem; font-weight: 500; color: var(--vt-darker);
          outline: none; transition: border-color 0.2s, box-shadow 0.2s;
        }
        .vt-select { font-weight: 600; cursor: pointer; }
        .vt-input:focus, .vt-select:focus { border-color: var(--vt-dark); box-shadow: 0 0 0 3px rgba(26,69,55,0.12); }
        .vt-input.has-prefix { padding-left: 2.8rem; }

        .vt-btn {
          width: 100%; margin-top: 1.5rem;
          background: var(--vt-dark); color: #fff;
          font-family: 'Work Sans', sans-serif; font-weight: 800; font-size: 1rem;
          letter-spacing: 0.01em; padding: 1rem 2rem; border-radius: 0.6rem; border: none;
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem;
          transition: background 0.2s, transform 0.15s;
        }
        .vt-btn:hover { background: #16382c; transform: translateY(-1px); }
        .vt-btn svg { transition: transform 0.2s; }
        .vt-btn:hover svg { transform: translateX(4px); }
        .vt-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .vt-btn:disabled:hover { background: var(--vt-dark); transform: none; }
        .vt-btn:disabled:hover svg { transform: none; }

        .vt-callout {
          background: #fffdf5; border: 1px solid #fde68a; border-radius: 0.75rem;
          padding: 0.9rem 1.1rem; display: flex; gap: 0.6rem; align-items: flex-start;
          font-size: 0.85rem; color: #92400e; line-height: 1.6; margin-top: 1rem;
        }
        .vt-callout svg { color: #d97706; flex-shrink: 0; margin-top: 1px; }

        .result-card { border-radius: 0.9rem; padding: 1.25rem 1.5rem; margin-top: 0.75rem; }
        .result-card--highlight { background: linear-gradient(135deg, #1A2E35 0%, #22443a 100%); box-shadow: 0 4px 16px rgba(26,69,55,0.18); }
        .result-card--tone-gold { background: rgb(255, 206, 116); }
        .result-label { font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.07em; margin-bottom: 0.35rem; }
        .result-card--tone-gold .result-label { color: var(--vt-darker); }
        .result-value { font-size: 1.5rem; font-weight: 900; color: var(--vt-darker); }
        .result-sub { font-size: 0.78rem; font-weight: 500; color: #5c4a1f; margin-top: 0.25rem; }
        .result-card--highlight .result-value { color: #fff; white-space: nowrap; }

        .vt-capital-row { display: flex; align-items: baseline; justify-content: space-between; gap: 1rem; padding-top: 0.7rem; }
        .vt-capital-row + .vt-capital-row { margin-top: 0.7rem; border-top: 1px solid rgba(255,255,255,0.14); }
        .vt-capital-row-label { font-size: 0.9rem; font-weight: 700; color: #cfe3d6; }
        .vt-capital-row-sub { display: block; font-size: 0.75rem; font-weight: 500; color: #a3b8ac; margin-top: 0.15rem; }
        @media (max-width: 480px) {
          .vt-capital-row { flex-direction: column; align-items: flex-start; gap: 0.3rem; }
          .vt-capital-row .result-value { font-size: 1.3rem; }
        }
        .vt-conclusion { margin-top: 1.25rem; font-size: 0.95rem; color: #3f5647; line-height: 1.7; }
        .vt-conclusion strong { color: var(--vt-darker); }
      `}),e.jsxs("div",{className:"vt-root",children:[e.jsxs("section",{className:"vt-hero",children:[e.jsxs("div",{className:"vt-hero-inner",children:[e.jsxs("nav",{className:"vt-breadcrumb",children:[e.jsx("a",{href:"#/",children:"Home"}),e.jsx("span",{children:"/"}),e.jsx("a",{href:"#/seguros",children:"Seguros"}),e.jsx("span",{children:"/"}),e.jsx("span",{style:{color:"#d9d4c4"},children:"Cotação"})]}),e.jsxs("h1",{children:[e.jsx(I,{size:36,style:{color:"#1daf66"}}),"Quanto custa um ",e.jsx("span",{children:"seguro de vida"}),"?"]}),e.jsx("p",{children:"Informe o valor da cobertura que você quer, sua idade e seu sexo, e veja a estimativa de mensalidade com base em cotações médias de mercado."}),e.jsx(j,{title:"Cotação de Seguro de Vida | Orienta",style:{marginTop:"20px"}})]}),e.jsx("svg",{className:"vt-hero-blob",viewBox:"0 0 200 200",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M44.7,-76.4C58.3,-69.2,70.1,-57.4,77.6,-43.3C85.2,-29.2,88.5,-12.8,87.3,3.3C86.1,19.4,80.4,35.2,70.9,48.2C61.3,61.2,47.9,71.4,33.1,77.4C18.3,83.4,2.2,85.1,-13.7,81.9C-29.5,78.7,-45.1,70.5,-57.8,59.3C-70.5,48.1,-80.4,33.9,-84.6,18.5C-88.7,3,-87.1,-13.7,-80.3,-28.4C-73.6,-43.1,-61.7,-55.8,-48.2,-63C-34.7,-70.2,-19.5,-71.9,-2.4,-67.7C14.7,-63.5,29.3,-53.4,44.7,-76.4Z",fill:"#abccb5",transform:"translate(100 100)"})})]}),e.jsxs("main",{className:"vt-main",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"vt-section-heading",children:[e.jsx("h2",{children:"Cotação de seguro de vida e invalidez"}),e.jsx("p",{children:"Preencha ao menos um dos valores de cobertura."})]}),e.jsxs("div",{className:"vt-card",children:[e.jsxs("div",{className:"vt-two-col",children:[e.jsxs("div",{className:"vt-field",children:[e.jsx("label",{className:"vt-label",children:"Valor do seguro de vida"}),e.jsxs("div",{className:"vt-input-wrap",children:[e.jsx("span",{className:"vt-prefix",children:"R$"}),e.jsx("input",{className:"vt-input has-prefix",placeholder:"Ex: 500.000,00",inputMode:"numeric",value:t,onChange:r=>n(N(r.target.value))})]})]}),e.jsxs("div",{className:"vt-field",children:[e.jsx("label",{className:"vt-label",children:"Valor do seguro de invalidez por acidente"}),e.jsxs("div",{className:"vt-input-wrap",children:[e.jsx("span",{className:"vt-prefix",children:"R$"}),e.jsx("input",{className:"vt-input has-prefix",placeholder:"Ex: 500.000,00",inputMode:"numeric",value:c,onChange:r=>C(N(r.target.value))})]})]})]}),e.jsxs("div",{className:"vt-two-col",children:[e.jsxs("div",{className:"vt-field",children:[e.jsx("label",{className:"vt-label",children:"Sua idade *"}),e.jsx("input",{className:"vt-input",placeholder:"Ex: 35",inputMode:"numeric",value:p,onChange:r=>k(r.target.value.replace(/\D/g,"").slice(0,3))})]}),e.jsxs("div",{className:"vt-field",children:[e.jsx("label",{className:"vt-label",children:"Seu sexo *"}),e.jsxs("select",{className:"vt-select",value:i,onChange:r=>y(r.target.value),children:[e.jsx("option",{value:"",disabled:!0,children:"Selecione"}),e.jsx("option",{value:"feminino",children:"Feminino"}),e.jsx("option",{value:"masculino",children:"Masculino"}),e.jsx("option",{value:"nao_informar",children:"Não quero informar"})]})]})]}),e.jsxs("button",{type:"button",className:"vt-btn",disabled:!g,onClick:S,children:["Ver cotação",e.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("line",{x1:"5",y1:"12",x2:"19",y2:"12"}),e.jsx("polyline",{points:"12 5 19 12 12 19"})]})]}),a&&e.jsxs("div",{ref:h,style:{borderTop:"1px solid #e2e8e2",marginTop:"1.75rem",paddingTop:"1.25rem"},children:[m>0&&e.jsxs("div",{className:"result-card result-card--tone-gold",style:f(0),children:[e.jsx("p",{className:"result-label",children:"Cotação de mercado (mensalidade)"}),e.jsxs("p",{className:"result-value",children:["R$ ",o(m)," /mês"]}),e.jsxs("p",{className:"result-sub",children:["Cerca de R$ ",o(m*12)," por ano. Para ",a.idade," anos",a.genero!=="nao_informar"&&`, sexo ${W[a.genero]}`,"."]})]}),e.jsxs("div",{className:"result-card result-card--highlight",style:f(80),children:[a.capitalVida>0&&e.jsxs("div",{className:"vt-capital-row",children:[e.jsxs("span",{className:"vt-capital-row-label",children:["Seguro de vida",e.jsxs("span",{className:"vt-capital-row-sub",children:["Cobertura de R$ ",o(a.capitalVida)]})]}),e.jsxs("span",{className:"result-value",children:["R$ ",o(a.mensalVida)," /mês"]})]}),a.capitalInvalidez>0&&e.jsxs("div",{className:"vt-capital-row",children:[e.jsxs("span",{className:"vt-capital-row-label",children:["Seguro de invalidez por acidente",e.jsxs("span",{className:"vt-capital-row-sub",children:["Cobertura de R$ ",o(a.capitalInvalidez)]})]}),e.jsxs("span",{className:"result-value",children:["R$ ",o(a.mensalInvalidez)," /mês"]})]})]}),R&&e.jsxs("div",{className:"vt-callout",children:[e.jsx(V,{size:16}),e.jsxs("p",{children:["Nossa tabela de referência cobre de 35 a 50 anos. Para ",a.idade," anos, usamos o valor da faixa mais próxima — a cotação real pode ser bem diferente."]})]}),e.jsxs("p",{className:"vt-conclusion",children:["É apenas uma ",e.jsx("strong",{children:"estimativa"})," baseada em cotações médias de mercado. O valor real varia por seguradora, estado de saúde e hábitos, e só é confirmado numa cotação oficial."]})]})]}),e.jsxs("div",{style:{marginTop:"24px",paddingTop:"20px",borderTop:"1px solid #e2e8e2"},children:[e.jsx("p",{style:{fontSize:"13px",fontWeight:700,color:"#1A2E35",marginBottom:"8px"},children:"Compartilhe esta calculadora"}),e.jsx(j,{title:"Cotação de Seguro de Vida | Orienta",label:""})]})]}),e.jsx(E,{promo:{image:"https://lh3.googleusercontent.com/aida-public/AB6AXuBiIAZZ1_Gx_i7qJnBZuqdTW1gDH3BRnNYO_BEfyALedW6hdQWTMrCxvimHAEd8ExDNnqlKeuvR-2F8QjxPY9Dqa6TRS04rbJ4IHfWuEKjtYGv7TfDybTd72owjQcX4oPr4yCEaVGqfCSdYjZuiJMMUjzND-N92XHg60Wl0AW6pVWYbkVseir6LsmR7lMTIUZUghLYar5-r4fWxk-6_SdT0ZodH-4-NK0c10UUt2AWOvWW4ONhyInd5nJ0-mswYeBWEQUOaxjfpSaAH",imageAlt:"Pessoa revisando documentos de seguro",badge:"Descubra o valor ideal",title:"Quanto de seguro você precisa?",description:"Calcule a cobertura ideal para proteger sua família.",href:"#/seguros"},resources:[{icon:"calc",title:"Calculadora de seguros",desc:"Quanto de seguro de vida você precisa.",href:"#/seguros"},{icon:"article",title:"O que é um seguro?",desc:"Entenda o conceito antes de contratar.",href:"#/seguros/conteudos"},{icon:"calc",title:"Calculadora do Milhão",desc:"Quanto tempo até seu primeiro milhão.",href:"#/planejamento/calculadoras/milhao"}]})]})]})]})}export{B as default};
