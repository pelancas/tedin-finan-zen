import{r as t,j as e}from"./index-CbCtD1rF.js";import{C as S,a as W}from"./CalculadoraTextBlock-Z49h_58f.js";const w=a=>parseFloat(a.replace(/\./g,"").replace(",","."))||0,v=a=>a.toLocaleString("pt-BR",{minimumFractionDigits:2,maximumFractionDigits:2}),y=a=>{const o=a.replace(/\D/g,"");return o?(parseInt(o,10)/100).toLocaleString("pt-BR",{minimumFractionDigits:2}):""};function A({label:a,value:o,accent:l,delay:p=0,visible:i}){return e.jsxs("div",{className:"result-card",style:{borderLeft:`4px solid ${l}`,transitionDelay:`${p}ms`,opacity:i?1:0,transform:i?"translateY(0)":"translateY(12px)",transition:"opacity 0.45s ease, transform 0.45s ease"},children:[e.jsx("p",{className:"result-label",children:a}),e.jsxs("p",{className:"result-value",children:["R$ ",o]})]})}function L(){const[a,o]=t.useState("1.000.000,00"),[l,p]=t.useState(""),[i,N]=t.useState(""),[u,k]=t.useState("Anos"),[g,C]=t.useState(""),[s,R]=t.useState(null),[d,x]=t.useState(!1),h=t.useRef(null),M=()=>{const r=w(a),n=w(l),z=(parseFloat(g.replace(",","."))||0)/100,b=parseInt(i,10)||0,c=u==="Anos"?b*12:b;if(!r||!c)return;const f=Math.pow(1+z,1/12)-1;let m=0;if(f===0)m=Math.max(0,(r-n)/c);else{const j=Math.pow(1+f,c);m=Math.max(0,(r-n*j)/((j-1)/f))}const F=m*c+n,q=Math.max(0,r-F);R({monthlyPayment:m,totalSaved:r,interestEarned:q}),x(!1),setTimeout(()=>x(!0),50)};return t.useEffect(()=>{s&&h.current&&window.innerWidth<768&&setTimeout(()=>{var n;return(n=h.current)==null?void 0:n.scrollIntoView({behavior:"smooth",block:"start"})},100)},[s]),e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
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

        /* Milhão highlight — dourado */
        .vt-field-gold {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: linear-gradient(135deg, #fffbf0 0%, #fff3d6 100%);
          border: 2px solid #e8a020;
          border-radius: 0.75rem;
          padding: 0.85rem 1rem calc(0.85rem + 5px);
        }
        .vt-field-gold .vt-label { color: #9a6200; }
        .vt-field-gold .vt-prefix { color: #c07a10; }
        .vt-field-gold .vt-input {
          background: #fffef8;
          border-color: #f0c060;
          font-size: 1.1rem;
          font-weight: 800;
          color: #7a4e00;
        }
        .vt-field-gold .vt-input:focus {
          border-color: #e8a020;
          box-shadow: 0 0 0 3px rgba(232,160,32,0.18);
        }
        .vt-gold-badge {
          display: inline-flex; align-items: center; gap: 0.3rem;
          background: #e8a020; color: #fff;
          font-size: 0.65rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em;
          padding: 0.2rem 0.6rem; border-radius: 999px;
          margin-bottom: 0.4rem;
        }

        /* Two-column form layout */
        .vt-two-col { display: flex; flex-direction: column; gap: 1.25rem; }
        @media (min-width: 640px) {
          .vt-two-col { flex-direction: row; align-items: stretch; gap: 1.5rem; }
          .vt-col { flex: 1; }
        }
        .vt-col { display: flex; flex-direction: column; gap: 1rem; }

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

        /* Compact inputs for right column */
        .vt-input-sm { padding-top: 0.61rem !important; padding-bottom: 0.61rem !important; font-size: 0.88rem !important; }
        .vt-input-sm.has-prefix { padding-left: 2.8rem !important; }
        .vt-input-sm.has-suffix { padding-right: 2.5rem !important; }
        .vt-select-sm { padding-top: 0.61rem !important; padding-bottom: 0.61rem !important; font-size: 0.85rem !important; }

        /* CTA button */
        .vt-btn {
          width: 100%; margin-top: 1.5rem;
          background: var(--vt-dark); color: #fff;
          font-family: 'Work Sans', sans-serif; font-weight: 800; font-size: 1rem;
          letter-spacing: 0.01em; padding: calc(1rem + 0px) 2rem; border-radius: 0.6rem; border: none;
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
        .result-card--highlight {
          background: linear-gradient(135deg, #1A2E35 0%, #22443a 100%);
          border: none;
          box-shadow: 0 4px 16px rgba(26,69,55,0.18);
        }
        .result-card--highlight .result-label { color: #7ab898; }
        .result-card--highlight .result-value { color: #fff; font-size: 1.7rem; }
        .result-label { font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.07em; color: #7a9a82; margin-bottom: 0.35rem; }
        .result-value { font-size: 1.4rem; font-weight: 900; color: var(--vt-darker); }

        /* Frase de conclusao */
        .vt-conclusion {
          margin-top: 1rem;
          padding: 1rem 1.25rem;
          background: #f0faf5;
          border-left: 4px solid var(--vt-dark);
          border-radius: 0 0.6rem 0.6rem 0;
          font-size: 0.95rem; font-weight: 500; color: var(--vt-darker);
          opacity: 0; transform: translateY(8px);
          transition: opacity 0.45s ease 0.2s, transform 0.45s ease 0.2s;
        }
        .vt-conclusion.visible { opacity: 1; transform: translateY(0); }
        .vt-conclusion strong { color: #0e6b3a; }

      `}),e.jsxs("div",{className:"vt-root",children:[e.jsxs("section",{className:"vt-hero",children:[e.jsxs("div",{className:"vt-hero-inner",children:[e.jsxs("nav",{className:"vt-breadcrumb",children:[e.jsx("a",{href:"#",children:"Home"}),e.jsx("span",{children:"/"}),e.jsx("a",{href:"#",children:"Ferramentas"}),e.jsx("span",{children:"/"}),e.jsx("span",{style:{color:"#d9d4c4"},children:"Calculadora"})]}),e.jsxs("h1",{children:["Calculadora do"," ",e.jsx("span",{children:"Primeiro Milhão"})]}),e.jsx("p",{children:"Sem aposta, sem ganhar na loteria, de verdade, quanto tempo até você chegar no seu primeiro milhão? 💰💰💰"})]}),e.jsx("svg",{className:"vt-hero-blob",viewBox:"0 0 200 200",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M44.7,-76.4C58.3,-69.2,70.1,-57.4,77.6,-43.3C85.2,-29.2,88.5,-12.8,87.3,3.3C86.1,19.4,80.4,35.2,70.9,48.2C61.3,61.2,47.9,71.4,33.1,77.4C18.3,83.4,2.2,85.1,-13.7,81.9C-29.5,78.7,-45.1,70.5,-57.8,59.3C-70.5,48.1,-80.4,33.9,-84.6,18.5C-88.7,3,-87.1,-13.7,-80.3,-28.4C-73.6,-43.1,-61.7,-55.8,-48.2,-63C-34.7,-70.2,-19.5,-71.9,-2.4,-67.7C14.7,-63.5,29.3,-53.4,44.7,-76.4Z",fill:"#abccb5",transform:"translate(100 100)"})})]}),e.jsxs("main",{className:"vt-main",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"vt-section-heading",children:[e.jsxs("h2",{children:[e.jsxs("svg",{width:"28",height:"28",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8.5 3.3 1.5 4.2C6 18 6 19 6 19h12s0-1-.5-2.8c1-.9 1.5-2.4 1.5-4.2 0-1-.25-1.75-.5-2.5L20 8s1-5-1-3z"}),e.jsx("path",{d:"M2 9v1c0 1.1.9 2 2 2h1"}),e.jsx("path",{d:"M16 11h0"})]}),"Quanto preciso poupar por mês?"]}),e.jsx("p",{children:"Diga-nos quanto você quer guardar e quando quer atingir sua meta."})]}),e.jsx("div",{className:"vt-card",children:e.jsxs("div",{className:"vt-two-col",children:[e.jsxs("div",{className:"vt-col",children:[e.jsxs("div",{className:"vt-field vt-field-gold",children:[e.jsx("span",{className:"vt-gold-badge",children:"⭐ Objetivo"}),e.jsx("label",{className:"vt-label",children:"Meta de 1 Milhão (R$)"}),e.jsxs("div",{className:"vt-input-wrap",children:[e.jsx("span",{className:"vt-prefix",children:"R$"}),e.jsx("input",{className:"vt-input has-prefix",placeholder:"1.000.000,00",value:a,onChange:r=>o(y(r.target.value))})]})]}),e.jsxs("div",{className:"vt-field",children:[e.jsx("label",{className:"vt-label",children:"Saldo Inicial (R$)"}),e.jsxs("div",{className:"vt-input-wrap",children:[e.jsx("span",{className:"vt-prefix",children:"R$"}),e.jsx("input",{className:"vt-input has-prefix",placeholder:"Ex: 5.000,00",value:l,onChange:r=>p(y(r.target.value))})]})]})]}),e.jsxs("div",{className:"vt-col",children:[e.jsxs("div",{className:"vt-field",children:[e.jsx("label",{className:"vt-label",children:"Prazo para Crescer"}),e.jsxs("div",{className:"vt-period-row",children:[e.jsx("input",{className:"vt-input vt-input-sm",style:{flex:1},placeholder:"Valor",type:"number",min:1,value:i,onChange:r=>N(r.target.value)}),e.jsxs("select",{className:"vt-select vt-select-sm",value:u,onChange:r=>k(r.target.value),children:[e.jsx("option",{children:"Anos"}),e.jsx("option",{children:"Meses"})]})]})]}),e.jsxs("div",{className:"vt-field",children:[e.jsx("label",{className:"vt-label",children:"Taxa de Juros (% ao ano)"}),e.jsxs("div",{className:"vt-input-wrap",children:[e.jsx("input",{className:"vt-input vt-input-sm has-suffix",placeholder:"Ex: 10,5",value:g,onChange:r=>C(r.target.value)}),e.jsx("span",{className:"vt-suffix",children:"%"})]})]}),e.jsxs("button",{className:"vt-btn",onClick:M,children:["Calcular Meta",e.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("line",{x1:"5",y1:"12",x2:"19",y2:"12"}),e.jsx("polyline",{points:"12 5 19 12 12 19"})]})]})]})]})}),e.jsxs("div",{className:"vt-results-grid",ref:h,children:[e.jsxs("div",{className:"result-card result-card--highlight",style:{transitionDelay:"0ms",opacity:d?1:0,transform:d?"translateY(0)":"translateY(12px)",transition:"opacity 0.45s ease, transform 0.45s ease"},children:[e.jsx("p",{className:"result-label",children:"Parcela Mensal"}),e.jsxs("p",{className:"result-value",children:["R$ ",s?v(s.monthlyPayment):"0,00"]})]}),e.jsx(A,{label:"Juros Ganhos",value:s?v(s.interestEarned):"0,00",accent:"#abccb5",delay:80,visible:d})]}),s&&e.jsxs("div",{className:"vt-conclusion"+(d?" visible":""),children:["Para chegar no seu primeiro milhão em"," ",e.jsxs("strong",{children:[i," ",u.toLowerCase()]}),", você precisa investir"," ",e.jsxs("strong",{children:["R$ ",v(s.monthlyPayment)," por mês"]}),"."]})]}),e.jsx(S,{promo:{image:"https://lh3.googleusercontent.com/aida-public/AB6AXuBiIAZZ1_Gx_i7qJnBZuqdTW1gDH3BRnNYO_BEfyALedW6hdQWTMrCxvimHAEd8ExDNnqlKeuvR-2F8QjxPY9Dqa6TRS04rbJ4IHfWuEKjtYGv7TfDybTd72owjQcX4oPr4yCEaVGqfCSdYjZuiJMMUjzND-N92XHg60Wl0AW6pVWYbkVseir6LsmR7lMTIUZUghLYar5-r4fWxk-6_SdT0ZodH-4-NK0c10UUt2AWOvWW4ONhyInd5nJ0-mswYeBWEQUOaxjfpSaAH",imageAlt:"Moedas empilhadas com planta crescendo",badge:"Destaque",title:"Cuidado com seu seguro",description:"Descubra como evitar erros comuns.",href:"#/seguros/conteudos?post=a-venda-casada-de-seguros"},resources:[{icon:"article",title:"Formas de Economizar",desc:"Pequenas mudanças, grandes resultados.",href:"#/planejamento/despesas"},{icon:"stats",title:"Comparador de Renda Fixa",desc:"Calcule qual melhor produto.",href:"#/investimentos/renda-fixa/comparador"},{icon:"bank",title:"Renda Fixa",desc:"O que se trata?",href:"#/investimentos/renda-fixa"},{icon:"calc",title:"Calculadora de Metas",desc:"O poder do tempo ao seu favor.",href:"#/planejamento/calculadoras/metas"}]})]}),e.jsxs(W,{children:[e.jsx("h2",{className:"text-3xl font-bold text-foreground mb-6",children:"O que é o primeiro milhão?"}),e.jsx("p",{children:"Existem alguns marcos financeiros bem relevantes, o primeiro deles são 100 mil reais. Dizem que é mais difícil chegar nos 100 mil reais do que o primeiro milhão, mas o marco mais glamuroso é especificamente um dos marcos mais buscados pelos brasileiros, que é o milhão. Ou seja, quanto tempo falta até você se tornar um milionário?"}),e.jsx("p",{children:"Para essa meta como várias outras o relevante é portar mensalmente e recorrentemente até chegar na meta desejada. O relevante mesmo é aportar com uma constânci, por tempo suficiente para que os juros compostos façam o seu trabalho."}),e.jsx("p",{children:"Lembrando que você não precisa se tornar milionário para ser independente financeiramente. A gente tem outras calculadoras, como a calculadora de aposentadoria e a calculadora para outras metas. Se você quiser dar uma olhada, é só acessar no site."}),e.jsx("h3",{className:"text-2xl font-bold text-foreground mt-10 mb-4",children:"Acesse nossas outras calculadoras"}),e.jsx("div",{className:"bg-primary/10 border border-primary/30 rounded-lg p-6 mt-8",children:e.jsxs("p",{className:"text-foreground font-semibold mb-0",children:[e.jsx("strong",{children:"Em resumo:"})," o primeiro milhão é resultado de tempo, consistência e juros compostos. Use a calculadora acima para descobrir quanto você precisa poupar por mês."]})})]})]})]})}export{L as default};
