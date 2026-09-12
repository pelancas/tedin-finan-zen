import{r as i,j as e}from"./index-CvJMMz9e.js";import{C as _,a as G}from"./CalculadoraTextBlock-NAl7yDjC.js";const Q=.2,J=.3,d=r=>parseFloat(r.replace(/\./g,"").replace(",","."))||0,n=r=>r.toLocaleString("pt-BR",{minimumFractionDigits:2,maximumFractionDigits:2}),u=r=>{const o=r.replace(/\D/g,"");return o?(parseInt(o,10)/100).toLocaleString("pt-BR",{minimumFractionDigits:2}):""};function X(r,o,t){return r<=0||o<=0?0:t===0?r/o:r*t/(1-Math.pow(1+t,-o))}function T(r,o,t){return r<=0||o<=0?0:t===0?r*o:r*(1-Math.pow(1+t,-o))/t}function b({label:r,value:o,sub:t,accent:f,delay:h=0,visible:x}){return e.jsxs("div",{className:"result-card",style:{borderLeft:`4px solid ${f}`,transitionDelay:`${h}ms`,opacity:x?1:0,transform:x?"translateY(0)":"translateY(12px)",transition:"opacity 0.45s ease, transform 0.45s ease"},children:[e.jsx("p",{className:"result-label",children:r}),e.jsx("p",{className:"result-value",children:o}),t&&e.jsx("p",{className:"result-sub",children:t})]})}const B={confortavel:{titulo:"Confortável",cor:"#0e6b3a",corFundo:"rgba(29,175,102,0.08)",descricao:"A parcela cabe folgada na sua renda, sem apertar o orçamento."},possivel:{titulo:"Possível",cor:"#9a6200",corFundo:"rgba(232,160,32,0.1)",descricao:"Dentro do limite que os bancos costumam aprovar, mas exige planejamento."},arriscado:{titulo:"Arriscado",cor:"#b42318",corFundo:"rgba(220,38,38,0.08)",descricao:"Comprometeria mais renda do que o recomendado — reavalie antes de seguir."}};function ae(){const[r,o]=i.useState(""),[t,f]=i.useState(null),[h,x]=i.useState(""),[y,D]=i.useState(""),[k,L]=i.useState(""),[R,W]=i.useState(""),[j,Y]=i.useState("30"),[N,M]=i.useState("11,0"),[s,I]=i.useState(null),[c,E]=i.useState(!1),z=i.useRef(null),O=()=>{const a=d(r),m=d(h),p=d(y),l=d(k),g=d(R),A=parseInt(j,10)||0,V=(parseFloat(N.replace(",","."))||0)/100;if(!l||!A)return;const w=A*12,C=Math.pow(1+V,1/12)-1,F=Math.max(0,l-g),S=X(F,w,C),H=Math.max(0,a*Q),U=Math.max(0,a*J),$=T(H,w,C)+m,q=T(U,w,C)+m,Z=l<=$?"confortavel":l<=q?"possivel":"arriscado";I({precoImovel:l,entrada:g,percentualEntrada:l>0?g/l*100:0,financiamento:F,parcelaEstimada:S,sobraMensal:a-p-S,classificacao:Z,limiteConfortavel:$,limitePossivel:q,entradaExcedeDisponivel:m>0&&g>m}),E(!1),setTimeout(()=>E(!0),50),window.innerWidth<768&&setTimeout(()=>{var P;return(P=z.current)==null?void 0:P.scrollIntoView({behavior:"smooth",block:"start"})},150)},v=s?B[s.classificacao]:null;return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
        .vt-root {
          font-family: 'Work Sans', sans-serif;
          --vt-dark:    #1daf66;
          --vt-darker:  #1A2E35;
          --vt-mid:     #FFA726;
          --vt-light:   #FFFDF5;
          --vt-cream:   #FFFDF5;
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

        /* Section heading */
        .vt-section-heading { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem; }
        .vt-section-heading h2 { font-size: 1.8rem; font-weight: 800; color: var(--vt-darker); display: flex; align-items: center; gap: 0.6rem; }
        .vt-section-heading h2 svg { color: var(--vt-dark); flex-shrink: 0; }
        .vt-section-heading p { color: #607060; font-size: 1rem; font-weight: 400; }

        /* Card */
        .vt-card { background: #fff; border-radius: 1rem; border: 1px solid #e2e8e2; padding: 2rem; box-shadow: 0 1px 3px rgba(26,69,55,0.06); }

        /* Two-column form layout */
        .vt-two-col { display: flex; flex-direction: column; gap: 1.25rem; }
        @media (min-width: 640px) {
          .vt-two-col { flex-direction: row; align-items: stretch; gap: 1.5rem; }
          .vt-col { flex: 1; }
        }
        .vt-col { display: flex; flex-direction: column; gap: 1rem; }
        .vt-col-heading { font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: #8aab96; margin: 0.5rem 0 -0.35rem; }
        .vt-col-heading:first-child { margin-top: 0; }

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

        .vt-inline-row { display: flex; gap: 0.75rem; }
        .vt-inline-row .vt-field { flex: 1; }

        /* Toggle Fixa / Varia */
        .vt-toggle {
          display: grid; grid-template-columns: 1fr 1fr; gap: 0.35rem;
          background: #f7f9f7; border: 1.5px solid #d0dbd2; border-radius: 0.6rem; padding: 0.3rem;
        }
        .vt-toggle-btn {
          padding: 0.55rem 0.5rem; border: none; border-radius: 0.4rem; background: transparent;
          font-family: 'Work Sans', sans-serif; font-size: 0.8rem; font-weight: 700; color: #607060;
          cursor: pointer; transition: background 0.2s, color 0.2s, box-shadow 0.2s;
        }
        .vt-toggle-btn.active { background: var(--vt-dark); color: #fff; box-shadow: 0 2px 8px rgba(29,175,102,0.3); }

        /* CTA button */
        .vt-btn {
          width: 100%; margin-top: 1.5rem;
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
        .vt-results-grid + .vt-results-grid { margin-top: 0.75rem; }

        .result-card { background: #fff; border-radius: 0.75rem; padding: 1.25rem 1.5rem; box-shadow: 0 1px 3px rgba(26,69,55,0.06); }
        .result-card--highlight { background: linear-gradient(135deg, #1A2E35 0%, #22443a 100%); border: none; box-shadow: 0 4px 16px rgba(26,69,55,0.18); }
        .result-card--highlight .result-label { color: #7ab898; }
        .result-card--highlight .result-value { color: #fff; font-size: 1.5rem; }
        .result-card--highlight .result-sub { color: #a3b8ac; }
        .result-label { font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.07em; color: #7a9a82; margin-bottom: 0.35rem; }
        .result-value { font-size: 1.35rem; font-weight: 900; color: var(--vt-darker); }
        .result-sub { font-size: 0.75rem; font-weight: 500; color: #8aab96; margin-top: 0.25rem; }
        .result-sub.negativo { color: #dc2626; font-weight: 700; }

        /* Badge de classificação */
        .vt-status-badge {
          display: inline-flex; align-items: center; gap: 0.4rem;
          font-size: 0.8rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em;
          padding: 0.4rem 0.9rem; border-radius: 999px; margin-top: 0.75rem;
        }

        /* Tiers — Confortável / Possível / Arriscado */
        .vt-tier-grid { display: grid; gap: 0.75rem; margin-top: 0.75rem; }
        @media (min-width: 640px) { .vt-tier-grid { grid-template-columns: repeat(3, 1fr); } }
        .vt-tier-card {
          border-radius: 0.75rem; padding: 1.25rem; border: 2px solid transparent;
          background: #f7f9f7; transition: all 0.3s ease;
          opacity: 0; transform: translateY(12px);
        }
        .vt-tier-card.visible { opacity: 1; transform: translateY(0); }
        .vt-tier-card.active { border-color: currentColor; box-shadow: 0 4px 14px rgba(0,0,0,0.08); }
        .vt-tier-title { font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 0.5rem; }
        .vt-tier-value { font-size: 1.25rem; font-weight: 900; color: var(--vt-darker); margin-bottom: 0.4rem; }
        .vt-tier-desc { font-size: 0.78rem; color: #607060; line-height: 1.4; }

        /* Alerta */
        .vt-alert {
          margin-top: 0.75rem; padding: 0.85rem 1.1rem;
          background: #fff5f5; border-left: 4px solid #dc2626; border-radius: 0 0.6rem 0.6rem 0;
          font-size: 0.85rem; font-weight: 500; color: #7f1d1d;
        }

        /* Frase de conclusao */
        .vt-conclusion {
          margin-top: 1.25rem; padding: 1rem 1.25rem;
          background: #f0faf5; border-left: 4px solid var(--vt-dark); border-radius: 0 0.6rem 0.6rem 0;
          font-size: 0.95rem; font-weight: 500; color: var(--vt-darker);
          opacity: 0; transform: translateY(8px);
          transition: opacity 0.45s ease 0.2s, transform 0.45s ease 0.2s;
        }
        .vt-conclusion.visible { opacity: 1; transform: translateY(0); }
        .vt-conclusion strong { color: #0e6b3a; }
      `}),e.jsxs("div",{className:"vt-root",children:[e.jsxs("section",{className:"vt-hero",children:[e.jsxs("div",{className:"vt-hero-inner",children:[e.jsxs("nav",{className:"vt-breadcrumb",children:[e.jsx("a",{href:"#/",children:"Home"}),e.jsx("span",{children:"/"}),e.jsx("a",{href:"#/",children:"Imóveis"}),e.jsx("span",{children:"/"}),e.jsx("span",{style:{color:"#d9d4c4"},children:"Calculadora"})]}),e.jsxs("h1",{children:["Posso comprar ",e.jsx("span",{children:"este imóvel?"})]}),e.jsx("p",{children:"Cruzamos sua renda, patrimônio e compromissos mensais com o preço do imóvel e as condições do financiamento, para você saber se essa compra é confortável, possível ou arriscada — antes de assinar qualquer proposta."})]}),e.jsx("svg",{className:"vt-hero-blob",viewBox:"0 0 200 200",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M44.7,-76.4C58.3,-69.2,70.1,-57.4,77.6,-43.3C85.2,-29.2,88.5,-12.8,87.3,3.3C86.1,19.4,80.4,35.2,70.9,48.2C61.3,61.2,47.9,71.4,33.1,77.4C18.3,83.4,2.2,85.1,-13.7,81.9C-29.5,78.7,-45.1,70.5,-57.8,59.3C-70.5,48.1,-80.4,33.9,-84.6,18.5C-88.7,3,-87.1,-13.7,-80.3,-28.4C-73.6,-43.1,-61.7,-55.8,-48.2,-63C-34.7,-70.2,-19.5,-71.9,-2.4,-67.7C14.7,-63.5,29.3,-53.4,44.7,-76.4Z",fill:"#abccb5",transform:"translate(100 100)"})})]}),e.jsxs("main",{className:"vt-main",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"vt-section-heading",children:[e.jsxs("h2",{children:[e.jsxs("svg",{width:"28",height:"28",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"}),e.jsx("polyline",{points:"9 22 9 12 15 12 15 22"})]}),"Avalie a compra do seu imóvel"]}),e.jsx("p",{children:"Preencha sua situação financeira e os dados do imóvel que você está avaliando."})]}),e.jsx("div",{className:"vt-card",children:e.jsxs("div",{className:"vt-two-col",children:[e.jsxs("div",{className:"vt-col",children:[e.jsx("p",{className:"vt-col-heading",children:"Sua renda mensal"}),e.jsxs("div",{className:"vt-field",children:[e.jsx("label",{className:"vt-label",children:"Renda média últimos 6 meses"}),e.jsxs("div",{className:"vt-input-wrap",children:[e.jsx("span",{className:"vt-prefix",children:"R$"}),e.jsx("input",{className:"vt-input has-prefix",placeholder:"Ex: 8.000,00",value:r,onChange:a=>o(u(a.target.value))})]})]}),d(r)>0&&e.jsxs("div",{className:"vt-field",children:[e.jsxs("label",{className:"vt-label",children:["Sua renda em algum desses meses foi menor que R$"," ",n(d(r)/3),"?"]}),e.jsxs("div",{className:"vt-toggle",children:[e.jsx("button",{type:"button",className:"vt-toggle-btn"+(t===!0?" active":""),onClick:()=>f(!0),children:"Sim"}),e.jsx("button",{type:"button",className:"vt-toggle-btn"+(t===!1?" active":""),onClick:()=>f(!1),children:"Não"})]})]}),e.jsxs("div",{className:"vt-field",children:[e.jsx("label",{className:"vt-label",children:"Patrimônio disponível para imóvel"}),e.jsxs("div",{className:"vt-input-wrap",children:[e.jsx("span",{className:"vt-prefix",children:"R$"}),e.jsx("input",{className:"vt-input has-prefix",placeholder:"Ex: 250.000,00",value:h,onChange:a=>x(u(a.target.value))})]})]}),e.jsxs("div",{className:"vt-field",children:[e.jsx("label",{className:"vt-label",children:"Gastos mensais"}),e.jsxs("div",{className:"vt-input-wrap",children:[e.jsx("span",{className:"vt-prefix",children:"R$"}),e.jsx("input",{className:"vt-input has-prefix",placeholder:"Ex: 3.500,00",value:y,onChange:a=>D(u(a.target.value))})]})]})]}),e.jsxs("div",{className:"vt-col",children:[e.jsx("p",{className:"vt-col-heading",children:"O imóvel"}),e.jsxs("div",{className:"vt-field",children:[e.jsx("label",{className:"vt-label",children:"Preço do imóvel"}),e.jsxs("div",{className:"vt-input-wrap",children:[e.jsx("span",{className:"vt-prefix",children:"R$"}),e.jsx("input",{className:"vt-input has-prefix",placeholder:"Ex: 900.000,00",value:k,onChange:a=>L(u(a.target.value))})]})]}),e.jsxs("div",{className:"vt-field",children:[e.jsx("label",{className:"vt-label",children:"Entrada que pretende dar"}),e.jsxs("div",{className:"vt-input-wrap",children:[e.jsx("span",{className:"vt-prefix",children:"R$"}),e.jsx("input",{className:"vt-input has-prefix",placeholder:"Ex: 250.000,00",value:R,onChange:a=>W(u(a.target.value))})]})]}),e.jsx("p",{className:"vt-col-heading",children:"Condições do financiamento"}),e.jsxs("div",{className:"vt-inline-row",children:[e.jsxs("div",{className:"vt-field",children:[e.jsx("label",{className:"vt-label",children:"Prazo"}),e.jsxs("div",{className:"vt-input-wrap",children:[e.jsx("input",{className:"vt-input has-suffix",type:"number",min:1,max:35,placeholder:"30",value:j,onChange:a=>Y(a.target.value)}),e.jsx("span",{className:"vt-suffix",children:"anos"})]})]}),e.jsxs("div",{className:"vt-field",children:[e.jsx("label",{className:"vt-label",children:"Taxa de juros"}),e.jsxs("div",{className:"vt-input-wrap",children:[e.jsx("input",{className:"vt-input has-suffix",placeholder:"11,0",value:N,onChange:a=>M(a.target.value)}),e.jsx("span",{className:"vt-suffix",children:"% a.a."})]})]})]}),e.jsxs("button",{className:"vt-btn",onClick:O,children:["Avaliar imóvel",e.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("line",{x1:"5",y1:"12",x2:"19",y2:"12"}),e.jsx("polyline",{points:"12 5 19 12 12 19"})]})]})]})]})}),e.jsx("div",{ref:z,children:s&&v&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"vt-results-grid",children:[e.jsx(b,{label:"Preço do imóvel",value:`R$ ${n(s.precoImovel)}`,accent:"#abccb5",visible:c}),e.jsx(b,{label:"Entrada",value:`R$ ${n(s.entrada)}`,sub:`${s.percentualEntrada.toFixed(0)}% do preço`,accent:"#e8a020",delay:60,visible:c}),e.jsx(b,{label:"Financiamento",value:`R$ ${n(s.financiamento)}`,accent:"#abccb5",delay:120,visible:c})]}),e.jsxs("div",{className:"vt-results-grid",style:{gridTemplateColumns:"1fr 1fr"},children:[e.jsxs("div",{className:"result-card result-card--highlight",style:{transitionDelay:"180ms",opacity:c?1:0,transform:c?"translateY(0)":"translateY(12px)",transition:"opacity 0.45s ease, transform 0.45s ease"},children:[e.jsx("p",{className:"result-label",children:"Parcela estimada"}),e.jsxs("p",{className:"result-value",children:["R$ ",n(s.parcelaEstimada),"/mês"]}),e.jsxs("p",{className:"result-sub",children:[j," anos, ",N,"% ao ano"]}),e.jsx("span",{className:"vt-status-badge",style:{background:v.corFundo,color:v.cor},children:v.titulo})]}),e.jsx(b,{label:"Sobra mensal estimada",value:`R$ ${n(Math.abs(s.sobraMensal))}${s.sobraMensal<0?" (falta)":""}`,sub:"renda − gastos − parcela",accent:s.sobraMensal<0?"#dc2626":"#1daf66",delay:240,visible:c})]}),s.entradaExcedeDisponivel&&e.jsx("div",{className:"vt-alert",children:"A entrada informada é maior do que o patrimônio disponível — reveja os valores antes de seguir em frente."}),t===!0&&e.jsxs("div",{className:"vt-alert",children:["Sua renda variou bastante nos últimos 6 meses — priorize a faixa"," ",e.jsx("strong",{children:"Confortável"}),", para não apertar o orçamento num mês mais fraco."]}),e.jsxs("div",{className:"vt-section-heading",style:{marginTop:"2rem",marginBottom:"0"},children:[e.jsx("h2",{style:{fontSize:"1.3rem"},children:"Sua faixa de preço"}),e.jsx("p",{children:"Com base na sua renda e no patrimônio disponível para o imóvel."})]}),e.jsx("div",{className:"vt-tier-grid",children:["confortavel","possivel","arriscado"].map((a,m)=>{const p=B[a],l=a==="confortavel"?`até R$ ${n(s.limiteConfortavel)}`:a==="possivel"?`até R$ ${n(s.limitePossivel)}`:`acima de R$ ${n(s.limitePossivel)}`;return e.jsxs("div",{className:"vt-tier-card"+(c?" visible":"")+(s.classificacao===a?" active":""),style:{color:p.cor,background:p.corFundo,transitionDelay:`${300+m*80}ms`},children:[e.jsx("p",{className:"vt-tier-title",children:p.titulo}),e.jsx("p",{className:"vt-tier-value",children:l}),e.jsx("p",{className:"vt-tier-desc",children:p.descricao})]},a)})}),e.jsxs("div",{className:"vt-conclusion"+(c?" visible":""),children:["Este imóvel de ",e.jsxs("strong",{children:["R$ ",n(s.precoImovel)]})," está na faixa ",e.jsx("strong",{children:v.titulo.toLowerCase()})," para o seu momento financeiro — com uma parcela estimada de"," ",e.jsxs("strong",{children:["R$ ",n(s.parcelaEstimada)," por mês"]}),"."]})]})})]}),e.jsx(_,{promo:{image:"https://lh3.googleusercontent.com/aida-public/AB6AXuBiIAZZ1_Gx_i7qJnBZuqdTW1gDH3BRnNYO_BEfyALedW6hdQWTMrCxvimHAEd8ExDNnqlKeuvR-2F8QjxPY9Dqa6TRS04rbJ4IHfWuEKjtYGv7TfDybTd72owjQcX4oPr4yCEaVGqfCSdYjZuiJMMUjzND-N92XHg60Wl0AW6pVWYbkVseir6LsmR7lMTIUZUghLYar5-r4fWxk-6_SdT0ZodH-4-NK0c10UUt2AWOvWW4ONhyInd5nJ0-mswYeBWEQUOaxjfpSaAH",imageAlt:"Casa com selo de avaliação de risco",badge:"Antes de comprar",title:"Relatório de Avaliação de Riscos",description:"Confira certidões e processos do vendedor antes de fechar negócio.",href:"#/relatorio-avaliacao-riscos"},resources:[{icon:"calc",title:"Calculadora do Milhão",desc:"Quanto tempo até seu primeiro milhão.",href:"#/planejamento/calculadoras/milhao"},{icon:"calc",title:"Calculadora de Metas",desc:"O poder do tempo ao seu favor.",href:"#/planejamento/calculadoras/metas"},{icon:"stats",title:"Comparador de Renda Fixa",desc:"Calcule qual melhor produto.",href:"#/investimentos/renda-fixa/comparador"},{icon:"article",title:"Formas de Economizar",desc:"Pequenas mudanças, grandes resultados.",href:"#/planejamento/despesas"}]})]}),e.jsxs(G,{children:[e.jsx("h2",{className:"text-3xl font-bold text-foreground mb-6",children:"Como saber se você pode comprar um imóvel?"}),e.jsx("p",{children:'A pergunta não é só "o banco aprova o financiamento?" — é se a parcela cabe na sua vida sem sufocar seu orçamento todo mês. Os bancos costumam aprovar financiamentos em que a parcela compromete até 30% da renda mensal do comprador. É uma referência útil, mas não é garantia de conforto: comprometer o teto que o banco permite, ano após ano, deixa pouca margem para imprevistos.'}),e.jsxs("p",{children:["Por isso esta calculadora trabalha com três faixas sobre a mesma renda informada. A faixa ",e.jsx("strong",{children:"confortável"})," considera um comprometimento mais conservador (20%) — o cenário em que a parcela cabe mesmo nos meses mais fracos. A faixa"," ",e.jsx("strong",{children:"possível"})," usa o limite clássico de 30% — o que um banco típico aprovaria. Acima disso, entra a faixa ",e.jsx("strong",{children:"arriscada"}),": tecnicamente pode ser aprovado, mas comprometeria renda demais."]}),e.jsxs("p",{children:["Por isso pedimos a ",e.jsx("strong",{children:"média dos últimos 6 meses"}),", em vez de um valor fixo — evita superestimar sua capacidade de pagamento com base num mês bom isolado. E se em algum desses meses sua renda caiu abaixo de um terço da média, é sinal de que ela é instável: nesse caso, vale priorizar a faixa confortável, que já assume uma margem maior de segurança."]}),e.jsx("p",{children:'O patrimônio disponível para o imóvel também importa: quanto mais você entra à vista, menor o financiamento e menor a parcela — o que empurra o preço do imóvel que você "pode comprar" para cima.'}),e.jsx("div",{className:"bg-primary/10 border border-primary/30 rounded-lg p-6 mt-8",children:e.jsxs("p",{className:"text-foreground font-semibold mb-0",children:[e.jsx("strong",{children:"Em resumo:"})," some seu patrimônio disponível ao financiamento máximo que sua renda sustenta, e você tem o teto real do que pode comprar. Use a calculadora acima com o preço do imóvel que você está avaliando para ver onde ele se encaixa."]})})]})]})]})}export{ae as default};
