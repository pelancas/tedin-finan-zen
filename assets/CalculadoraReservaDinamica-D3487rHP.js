import{r as i,j as e,S as M,C as O,O as T}from"./index-JXVuZpqg.js";import{C as $}from"./CalculadoraTextBlock-CAfpwcQ5.js";const c=a=>parseFloat(a.replace(/\./g,"").replace(",","."))||0,o=a=>a.toLocaleString("pt-BR",{minimumFractionDigits:2,maximumFractionDigits:2}),z=a=>{const n=a.replace(/\D/g,"");return n?(parseInt(n,10)/100).toLocaleString("pt-BR",{minimumFractionDigits:2}):""},h=a=>parseFloat(a.replace(",","."))||0,m=[{title:"Seu salário",question:"Qual foi o seu 4º pior mês de rendimento dos últimos meses?",hint:"Ordene seus meses do pior para o melhor e pegue o 4º da lista. Esse valor é o salário fixo que você vai se pagar todo mês."},{title:"Seu teto",question:"Quantos meses de salário você quer manter de teto na reserva?",hint:"É o limite da reserva. Tudo o que passar desse valor, depois de você se pagar, vai para a aposentadoria."},{title:"Sua reserva",question:"Quanto você já tem de reserva?",hint:"Some o que você tem guardado hoje para emergências e para cobrir os meses ruins."}];function Y(){const[a,n]=i.useState(0),[l,A]=i.useState(""),[d,y]=i.useState("6"),[k,E]=i.useState(""),[s,W]=i.useState(null),[p,w]=i.useState(!1),[N,x]=i.useState(""),b=i.useRef(null),f=r=>r===0&&c(l)<=0?"Informe o valor do seu 4º pior mês para continuar.":r===1&&h(d)<=0?"Informe quantos meses de salário você quer de teto.":"",C=()=>{const r=f(a);x(r),r||n(a+1)},F=()=>{x(""),n(Math.max(0,a-1))},R=()=>{const r=f(0)||f(1);if(r){x(r),n(f(0)?0:1);return}x("");const t=c(l),q=h(d),v=c(k),g=t*q;W({salario:t,meses:q,teto:g,reserva:v,falta:Math.max(0,g-v),excedente:Math.max(0,v-g),mesesCobertos:v/t,pct:Math.min(100,v/g*100)}),w(!1),setTimeout(()=>w(!0),50)},D=r=>{r.key==="Enter"&&(r.preventDefault(),a<m.length-1?C():R())};i.useEffect(()=>{s&&b.current&&window.innerWidth<768&&setTimeout(()=>{var t;return(t=b.current)==null?void 0:t.scrollIntoView({behavior:"smooth",block:"start"})},100)},[s]);const j=r=>r.toLocaleString("pt-BR",{maximumFractionDigits:1}),u=s?s.reserva>=s.teto:!1,S=a===m.length-1;return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
        .vt-root {
          font-family: 'Work Sans', sans-serif;
          --vt-dark:    #1daf66;
          --vt-darker:  #1A2E35;
          --vt-mid:     #FFA726;
          --vt-light:   #FFFDF5;
        }

        /* Hero */
        .vt-hero { background: var(--vt-darker); padding: 3rem 1.5rem 3.5rem; position: relative; overflow: hidden; }
        @media (min-width: 768px) { .vt-hero { padding: 4rem 5rem 4.5rem; } }
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

        .vt-section-heading { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem; }
        .vt-section-heading h2 { font-size: 1.8rem; font-weight: 800; color: var(--vt-darker); }
        .vt-section-heading p { color: #607060; font-size: 1rem; font-weight: 400; }

        .vt-card { background: #fff; border-radius: 1rem; border: 1px solid #e2e8e2; padding: 2rem; box-shadow: 0 1px 3px rgba(26,69,55,0.06); }

        /* Stepper */
        .vt-steps { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.75rem; }
        .vt-step-dot {
          display: flex; align-items: center; gap: 0.5rem; flex: 0 0 auto;
          background: none; border: none; padding: 0; cursor: default;
          font-family: 'Work Sans', sans-serif; font-size: 0.8rem; font-weight: 700; color: #a3b8ac;
        }
        .vt-step-dot.clickable { cursor: pointer; }
        .vt-step-num {
          width: 1.9rem; height: 1.9rem; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: #eef3ee; color: #8aab96; font-weight: 800; font-size: 0.85rem;
          transition: background 0.2s, color 0.2s;
        }
        .vt-step-dot.active { color: var(--vt-darker); }
        .vt-step-dot.active .vt-step-num { background: var(--vt-dark); color: #fff; }
        .vt-step-dot.done { color: #0e6b3a; }
        .vt-step-dot.done .vt-step-num { background: #d9f2e4; color: #0e6b3a; }
        .vt-step-line { flex: 1; height: 2px; background: #e2e8e2; min-width: 0.75rem; }
        .vt-step-line.done { background: var(--vt-dark); }
        @media (max-width: 639px) { .vt-step-dot span.vt-step-name { display: none; } .vt-step-dot.active span.vt-step-name { display: inline; } }

        .vt-question { font-size: 1.25rem; font-weight: 800; color: var(--vt-darker); line-height: 1.3; margin-bottom: 0.5rem; }
        .vt-hint { font-size: 0.92rem; color: #607060; margin-bottom: 1.25rem; }

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
          font-family: 'Work Sans', sans-serif; font-size: 1.1rem; font-weight: 700; color: var(--vt-darker);
          outline: none; transition: border-color 0.2s, box-shadow 0.2s;
        }
        .vt-input:focus { border-color: var(--vt-dark); box-shadow: 0 0 0 3px rgba(29,175,102,0.15); }
        .vt-input.has-prefix { padding-left: 2.8rem; }
        .vt-input.has-suffix { padding-right: 4.5rem; }

        .vt-chips { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.75rem; }
        .vt-chip {
          border: 1.5px solid #d0dbd2; background: #fff; color: var(--vt-darker);
          border-radius: 999px; padding: 0.4rem 0.9rem; cursor: pointer;
          font-family: 'Work Sans', sans-serif; font-size: 0.85rem; font-weight: 600;
          transition: border-color 0.2s, background 0.2s;
        }
        .vt-chip:hover { border-color: var(--vt-dark); }
        .vt-chip.on { background: var(--vt-dark); border-color: var(--vt-dark); color: #fff; }

        .vt-teto-preview { margin-top: 0.9rem; font-size: 0.9rem; color: #607060; }
        .vt-teto-preview strong { color: var(--vt-darker); }
        .vt-error { margin-top: 0.75rem; font-size: 0.85rem; font-weight: 600; color: #b45309; }

        .vt-actions { display: flex; gap: 0.75rem; margin-top: 1.5rem; }
        .vt-btn {
          flex: 1; background: var(--vt-dark); color: #fff;
          font-family: 'Work Sans', sans-serif; font-weight: 800; font-size: 1rem;
          letter-spacing: 0.01em; padding: 1rem 2rem; border-radius: 0.6rem; border: none;
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem;
          transition: background 0.2s, transform 0.15s;
        }
        .vt-btn:hover { background: #16382c; transform: translateY(-1px); }
        .vt-btn:active { transform: translateY(0); }
        .vt-btn svg { transition: transform 0.2s; }
        .vt-btn:hover svg { transform: translateX(4px); }
        .vt-btn-ghost {
          flex: 0 0 auto; background: #fff; color: var(--vt-darker); border: 1.5px solid #d0dbd2;
          font-family: 'Work Sans', sans-serif; font-weight: 700; font-size: 0.95rem;
          padding: 1rem 1.5rem; border-radius: 0.6rem; cursor: pointer; transition: border-color 0.2s;
        }
        .vt-btn-ghost:hover { border-color: var(--vt-dark); }

        /* Results */
        .vt-results-grid { display: grid; gap: 0.75rem; margin-top: 1.5rem; }
        @media (min-width: 640px) { .vt-results-grid { grid-template-columns: repeat(3, 1fr); } }
        .result-card { background: #fff; border-radius: 0.75rem; padding: 1.25rem 1.5rem; box-shadow: 0 1px 3px rgba(26,69,55,0.06); }
        .result-card--highlight { background: linear-gradient(135deg, #1A2E35 0%, #22443a 100%); box-shadow: 0 4px 16px rgba(26,69,55,0.18); }
        .result-card--highlight .result-label { color: #7ab898; }
        .result-card--highlight .result-value { color: #fff; }
        .result-label { font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.07em; color: #7a9a82; margin-bottom: 0.35rem; }
        .result-value { font-size: 1.4rem; font-weight: 900; color: var(--vt-darker); }
        .result-sub { font-size: 0.8rem; color: #607060; margin-top: 0.25rem; }
        .result-card--highlight .result-sub { color: #a3b8ac; }

        .vt-progress { margin-top: 0.75rem; padding: 1.25rem 1.5rem; background: #fff; border-radius: 0.75rem; box-shadow: 0 1px 3px rgba(26,69,55,0.06); }
        .vt-progress-head { display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 700; color: #607060; margin-bottom: 0.6rem; }
        .vt-progress-track { height: 0.9rem; background: #eef3ee; border-radius: 999px; overflow: hidden; }
        .vt-progress-bar { height: 100%; border-radius: 999px; background: var(--vt-dark); transition: width 0.8s cubic-bezier(.3,.7,.2,1); }
        .vt-progress-bar.full { background: var(--vt-mid); }

        .vt-conclusion {
          margin-top: 1rem; padding: 1rem 1.25rem; background: #f0faf5;
          border-left: 4px solid var(--vt-dark); border-radius: 0 0.6rem 0.6rem 0;
          font-size: 0.95rem; font-weight: 500; color: var(--vt-darker);
          opacity: 0; transform: translateY(8px);
          transition: opacity 0.45s ease 0.2s, transform 0.45s ease 0.2s;
        }
        .vt-conclusion.visible { opacity: 1; transform: translateY(0); }
        .vt-conclusion strong { color: #0e6b3a; }

        .vt-how { margin-top: 1rem; padding: 1.25rem 1.5rem; background: #fff; border: 1px solid #e2e8e2; border-radius: 0.75rem; }
        .vt-how h3 { font-size: 0.8rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: var(--vt-dark); margin-bottom: 0.6rem; }
        .vt-how ul { padding-left: 1.1rem; display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.92rem; color: #607060; list-style: disc; }
      `}),e.jsxs("div",{className:"vt-root",children:[e.jsxs("section",{className:"vt-hero",children:[e.jsxs("div",{className:"vt-hero-inner",children:[e.jsxs("nav",{className:"vt-breadcrumb",children:[e.jsx("a",{href:"#/",children:"Home"}),e.jsx("span",{children:"/"}),e.jsx("a",{href:"#/planejamento/calculadoras/metas",children:"Ferramentas"}),e.jsx("span",{children:"/"}),e.jsx("span",{style:{color:"#d9d4c4"},children:"Reserva Dinâmica"})]}),e.jsxs("h1",{children:["Calculadora de ",e.jsx("span",{children:"Reserva Dinâmica"})]}),e.jsx("p",{children:"Para quem tem renda instável: toda renda entra na reserva e, todo mês, a reserva paga o seu salário fixo. O que passar do teto vai para a aposentadoria."}),e.jsx(M,{title:"Calculadora de Reserva Dinâmica | Orienta",style:{marginTop:"20px"}})]}),e.jsx("svg",{className:"vt-hero-blob",viewBox:"0 0 200 200",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M44.7,-76.4C58.3,-69.2,70.1,-57.4,77.6,-43.3C85.2,-29.2,88.5,-12.8,87.3,3.3C86.1,19.4,80.4,35.2,70.9,48.2C61.3,61.2,47.9,71.4,33.1,77.4C18.3,83.4,2.2,85.1,-13.7,81.9C-29.5,78.7,-45.1,70.5,-57.8,59.3C-70.5,48.1,-80.4,33.9,-84.6,18.5C-88.7,3,-87.1,-13.7,-80.3,-28.4C-73.6,-43.1,-61.7,-55.8,-48.2,-63C-34.7,-70.2,-19.5,-71.9,-2.4,-67.7C14.7,-63.5,29.3,-53.4,44.7,-76.4Z",fill:"#abccb5",transform:"translate(100 100)"})})]}),e.jsxs("main",{className:"vt-main",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"vt-section-heading",children:[e.jsx("h2",{children:"Monte a sua reserva em 3 passos"}),e.jsx("p",{children:"Responda uma pergunta de cada vez e descubra o teto e quanto falta para chegar lá."})]}),e.jsxs("div",{className:"vt-card",onKeyDown:D,children:[e.jsx("div",{className:"vt-steps",role:"list",children:m.map((r,t)=>e.jsxs("div",{style:{display:"contents"},children:[e.jsxs("button",{type:"button",role:"listitem",className:"vt-step-dot"+(t===a?" active":t<a?" done clickable":""),"aria-current":t===a?"step":void 0,onClick:()=>t<a&&n(t),children:[e.jsx("span",{className:"vt-step-num",children:t<a?"✓":t+1}),e.jsx("span",{className:"vt-step-name",children:r.title})]}),t<m.length-1&&e.jsx("div",{className:"vt-step-line"+(t<a?" done":"")})]},r.title))}),e.jsx("p",{className:"vt-question",children:m[a].question}),e.jsx("p",{className:"vt-hint",children:m[a].hint}),a===0&&e.jsxs("div",{className:"vt-field",children:[e.jsx("label",{className:"vt-label",htmlFor:"rd-salario",children:"4º pior mês (R$)"}),e.jsxs("div",{className:"vt-input-wrap",children:[e.jsx("span",{className:"vt-prefix",children:"R$"}),e.jsx("input",{id:"rd-salario",className:"vt-input has-prefix",inputMode:"numeric",placeholder:"Ex: 4.000,00",value:l,onChange:r=>A(z(r.target.value)),autoFocus:!0})]})]}),a===1&&e.jsxs("div",{className:"vt-field",children:[e.jsx("label",{className:"vt-label",htmlFor:"rd-meses",children:"Meses de salário"}),e.jsxs("div",{className:"vt-input-wrap",children:[e.jsx("input",{id:"rd-meses",className:"vt-input has-suffix",inputMode:"decimal",placeholder:"Ex: 6",value:d,onChange:r=>y(r.target.value.replace(/[^\d,.]/g,"")),autoFocus:!0}),e.jsx("span",{className:"vt-suffix",children:"meses"})]}),e.jsx("div",{className:"vt-chips",children:["3","6","9","12"].map(r=>e.jsxs("button",{type:"button",className:"vt-chip"+(d===r?" on":""),onClick:()=>y(r),children:[r," meses"]},r))}),c(l)>0&&h(d)>0&&e.jsxs("p",{className:"vt-teto-preview",children:["Teto = ",j(h(d))," × R$ ",o(c(l))," ="," ",e.jsxs("strong",{children:["R$ ",o(c(l)*h(d))]})]})]}),a===2&&e.jsxs("div",{className:"vt-field",children:[e.jsx("label",{className:"vt-label",htmlFor:"rd-reserva",children:"Reserva hoje (R$)"}),e.jsxs("div",{className:"vt-input-wrap",children:[e.jsx("span",{className:"vt-prefix",children:"R$"}),e.jsx("input",{id:"rd-reserva",className:"vt-input has-prefix",inputMode:"numeric",placeholder:"Ex: 12.000,00 (pode ser zero)",value:k,onChange:r=>E(z(r.target.value)),autoFocus:!0})]})]}),N&&e.jsx("p",{className:"vt-error",role:"alert",children:N}),e.jsxs("div",{className:"vt-actions",children:[a>0&&e.jsx("button",{type:"button",className:"vt-btn-ghost",onClick:F,children:"Voltar"}),e.jsxs("button",{type:"button",className:"vt-btn",onClick:S?R:C,children:[S?"Calcular Reserva":"Próximo passo",e.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("line",{x1:"5",y1:"12",x2:"19",y2:"12"}),e.jsx("polyline",{points:"12 5 19 12 12 19"})]})]})]})]}),e.jsx("div",{ref:b,children:s&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"vt-results-grid",children:[{label:"Salário que você se paga",value:`R$ ${o(s.salario)}`,sub:"4º pior mês",hl:!1},{label:"Teto da reserva",value:`R$ ${o(s.teto)}`,sub:`${j(s.meses)} meses de salário`,hl:!0},{label:u?"Acima do teto":"Falta para o teto",value:`R$ ${o(u?s.excedente:s.falta)}`,sub:u?"pode ir para a aposentadoria":`reserva atual: R$ ${o(s.reserva)}`,hl:!1}].map((r,t)=>e.jsxs("div",{className:"result-card"+(r.hl?" result-card--highlight":""),style:{borderLeft:r.hl?void 0:"4px solid #abccb5",opacity:p?1:0,transform:p?"translateY(0)":"translateY(12px)",transition:"opacity 0.45s ease, transform 0.45s ease",transitionDelay:`${t*80}ms`},children:[e.jsx("p",{className:"result-label",children:r.label}),e.jsx("p",{className:"result-value",children:r.value}),e.jsx("p",{className:"result-sub",children:r.sub})]},r.label))}),e.jsxs("div",{className:"vt-progress",style:{opacity:p?1:0,transition:"opacity 0.45s ease 0.25s"},children:[e.jsxs("div",{className:"vt-progress-head",children:[e.jsxs("span",{children:["Sua reserva hoje cobre ",j(s.mesesCobertos)," ",s.mesesCobertos===1?"mês":"meses"," de salário"]}),e.jsxs("span",{children:[Math.round(s.pct),"% do teto"]})]}),e.jsx("div",{className:"vt-progress-track",role:"progressbar","aria-valuenow":Math.round(s.pct),"aria-valuemin":0,"aria-valuemax":100,children:e.jsx("div",{className:"vt-progress-bar"+(u?" full":""),style:{width:p?`${s.pct}%`:"0%"}})})]}),e.jsx("div",{className:"vt-conclusion"+(p?" visible":""),children:u?e.jsxs(e.Fragment,{children:["Sua reserva já está no teto de ",e.jsxs("strong",{children:["R$ ",o(s.teto)]}),". Depois de pagar seu salário de ",e.jsxs("strong",{children:["R$ ",o(s.salario)]}),", tudo o que passar do teto pode ir para a aposentadoria."]}):e.jsxs(e.Fragment,{children:["Pague-se ",e.jsxs("strong",{children:["R$ ",o(s.salario)]})," por mês. Continue colocando toda a renda na reserva até chegar em ",e.jsxs("strong",{children:["R$ ",o(s.teto)]}),": faltam"," ",e.jsxs("strong",{children:["R$ ",o(s.falta)]}),"."]})}),e.jsxs("div",{className:"vt-how",children:[e.jsx("h3",{children:"Como funciona"}),e.jsxs("ul",{children:[e.jsx("li",{children:"A renda de cada mês entra na reserva. O salário é pago no fim do mês."}),e.jsx("li",{children:"O teto só vale depois do pagamento. O que passar dele vai para a aposentadoria."}),e.jsx("li",{children:"Se a reserva não tiver o salário inteiro, ela paga o que tem e você repõe nos meses melhores."})]})]})]})})]}),e.jsx(O,{promo:{image:"https://lh3.googleusercontent.com/aida-public/AB6AXuBiIAZZ1_Gx_i7qJnBZuqdTW1gDH3BRnNYO_BEfyALedW6hdQWTMrCxvimHAEd8ExDNnqlKeuvR-2F8QjxPY9Dqa6TRS04rbJ4IHfWuEKjtYGv7TfDybTd72owjQcX4oPr4yCEaVGqfCSdYjZuiJMMUjzND-N92XHg60Wl0AW6pVWYbkVseir6LsmR7lMTIUZUghLYar5-r4fWxk-6_SdT0ZodH-4-NK0c10UUt2AWOvWW4ONhyInd5nJ0-mswYeBWEQUOaxjfpSaAH",imageAlt:"Moedas empilhadas com planta crescendo",badge:"Destaque",title:"Quanto de seguro de vida você precisa?",description:"Descubra o capital ideal para proteger quem depende de você.",href:"#/seguros"},resources:[{icon:"calc",title:"Calculadora de Aposentadoria",desc:"Para onde vai o que passa do teto.",href:"#/planejamento/calculadoras/aposentadoria"},{icon:"calc",title:"Calculadora de Metas",desc:"O poder do tempo ao seu favor.",href:"#/planejamento/calculadoras/metas"},{icon:"stats",title:"Comparador de Renda Fixa",desc:"Onde deixar a sua reserva.",href:"#/investimentos/renda-fixa/comparador"},{icon:"article",title:"Controle de Despesas",desc:"Pequenas mudanças, grandes resultados.",href:"#/planejamento/despesas"}]})]}),e.jsxs($,{children:[e.jsx("h2",{className:"text-3xl font-bold text-foreground mb-6",children:"Pense em baldes d'água"}),e.jsxs("figure",{className:"my-6 rounded-lg border border-border bg-white p-4",children:[e.jsxs("svg",{viewBox:"150 20 800 480",role:"img","aria-labelledby":"reserva-baldes-title",style:{width:"100%",height:"auto",display:"block",fontFamily:"'Work Sans', sans-serif"},children:[e.jsx("title",{id:"reserva-baldes-title",children:"A renda cai como uma torneira na Conta 2, que paga um salário constante para a Conta 1. O que passa do teto vai para a aposentadoria."}),e.jsxs("g",{stroke:"#1A2E35",strokeWidth:"6",strokeLinejoin:"round",strokeLinecap:"round",children:[e.jsxs("g",{stroke:"none",fill:"#e2e8e8",children:[e.jsx("polygon",{points:"728,160 718,458 706,458 716,160"}),e.jsx("polygon",{points:"348,340 341,458 332,458 338,340"})]}),e.jsx("line",{x1:"430",y1:"58",x2:"430",y2:"70"}),e.jsx("circle",{cx:"430",cy:"45",r:"13",fill:"#2ecc71"}),e.jsx("rect",{x:"298",y:"70",width:"310",height:"38",rx:"6",fill:"#f39c12"}),e.jsx("rect",{x:"285",y:"63",width:"14",height:"52",rx:"4",fill:"#1A2E35"}),e.jsx("rect",{x:"580",y:"70",width:"36",height:"64",rx:"8",fill:"#f39c12"}),e.jsx("rect",{x:"572",y:"134",width:"52",height:"12",rx:"4",fill:"#1A2E35"}),e.jsx("polygon",{points:"478,158 722,158 712,450 488,450",fill:"#fff"}),e.jsx("polygon",{points:"486,262 714,262 709,447 491,447",fill:"#2ecc71",stroke:"none"}),e.jsx("polygon",{points:"478,158 722,158 712,450 488,450",fill:"none"}),e.jsx("line",{x1:"474",y1:"154",x2:"845",y2:"154",strokeWidth:"12"}),e.jsx("line",{x1:"470",y1:"241",x2:"727",y2:"241",stroke:"#f39c12",strokeWidth:"5",strokeDasharray:"14 9"}),e.jsx("rect",{x:"395",y:"229",width:"68",height:"26",rx:"13",fill:"#f39c12",stroke:"none"}),e.jsx("polygon",{points:"228,338 342,338 335,450 235,450",fill:"#2ecc71"}),e.jsx("line",{x1:"222",y1:"333",x2:"346",y2:"333",strokeWidth:"12"}),e.jsx("rect",{x:"335",y:"416",width:"158",height:"28",fill:"#fff3df",strokeWidth:"5"}),e.jsx("line",{x1:"413",y1:"414",x2:"413",y2:"398"}),e.jsx("line",{x1:"396",y1:"397",x2:"432",y2:"397"}),e.jsx("circle",{cx:"413",cy:"430",r:"16",fill:"#f39c12"}),e.jsx("polygon",{points:"775,274 925,274 912,450 787,450",fill:"#fff"}),e.jsx("line",{x1:"767",y1:"269",x2:"932",y2:"269",strokeWidth:"12"})]}),e.jsx("circle",{cx:"875",cy:"84",r:"11",fill:"#f39c12"}),e.jsxs("g",{stroke:"#2ecc71",strokeWidth:"5",strokeLinecap:"round",children:[e.jsx("line",{x1:"875",y1:"46",x2:"875",y2:"60"}),e.jsx("line",{x1:"875",y1:"108",x2:"875",y2:"122"}),e.jsx("line",{x1:"836",y1:"84",x2:"850",y2:"84"}),e.jsx("line",{x1:"900",y1:"84",x2:"914",y2:"84"}),e.jsx("line",{x1:"848",y1:"57",x2:"858",y2:"67"}),e.jsx("line",{x1:"892",y1:"101",x2:"902",y2:"111"}),e.jsx("line",{x1:"902",y1:"57",x2:"892",y2:"67"}),e.jsx("line",{x1:"858",y1:"101",x2:"848",y2:"111"})]}),e.jsxs("g",{fill:"#1A2E35",fontWeight:"800",fontSize:"22",textAnchor:"middle",children:[e.jsx("text",{x:"285",y:"487",children:"CONTA 1"}),e.jsx("text",{x:"600",y:"487",children:"CONTA 2"}),e.jsx("text",{x:"850",y:"487",children:"APOSENTADORIA"})]}),e.jsx("text",{x:"270",y:"96",fill:"#1A2E35",fontWeight:"800",fontSize:"22",textAnchor:"end",children:"RENDA"}),e.jsx("text",{x:"429",y:"247",fill:"#1A2E35",fontWeight:"800",fontSize:"15",textAnchor:"middle",children:"TETO"})]}),e.jsx("figcaption",{className:"text-sm text-muted-foreground mt-2 text-center",children:"A renda cai na Conta 2, que paga um valor fixo para a Conta 1. O que passa do teto transborda para a aposentadoria."})]}),e.jsx("p",{children:"Quem tem renda instável, como autônomos, freelancers, comissionados e empresários, convive com meses muito bons e meses muito ruins. A reserva dinâmica transforma essa montanha-russa em um salário previsível, usando duas contas:"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Conta 1 — onde ficam seus gastos."})," É a conta que você usa no dia a dia: aluguel, mercado, cartão e lazer saem dela. Todo mês ela recebe o mesmo valor, como se fosse um salário."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Conta 2 — onde fica sua renda."})," Tudo o que você ganha entra aqui, seja muito ou pouco. Ela funciona como a reserva e, todo mês, transfere o salário fixo para a Conta 1."]})]}),e.jsx("p",{children:"Assim, nos meses fortes a Conta 2 enche, e nos meses fracos ela continua pagando o seu salário sem sufoco."}),e.jsx("h3",{className:"text-2xl font-bold text-foreground mt-10 mb-4",children:"Por que o 4º pior mês?"}),e.jsx("p",{children:"Pegar o melhor mês seria otimista demais, e o pior mês pode ser um ponto fora da curva. O 4º pior mês dos últimos meses é um valor que você já provou conseguir alcançar com certa frequência, por isso é um bom salário para se pagar sem esvaziar a reserva."}),e.jsx("h3",{className:"text-2xl font-bold text-foreground mt-10 mb-4",children:"E o teto?"}),e.jsx("p",{children:"O teto é quantos meses de salário você quer manter guardados. Ele protege você nos meses fracos, mas a reserva não precisa crescer para sempre: depois de pagar o salário, tudo o que passar do teto pode ser investido na aposentadoria."}),e.jsx("div",{className:"bg-primary/10 border border-primary/30 rounded-lg p-6 mt-8",children:e.jsxs("p",{className:"text-foreground font-semibold mb-0",children:[e.jsx("strong",{children:"Em resumo:"})," defina um salário, defina um teto e deixe a reserva absorver a instabilidade da sua renda. Simulação ilustrativa, não é recomendação financeira."]})})]}),e.jsx(T,{})]})]})}export{Y as default};
