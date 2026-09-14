import{r as n,j as e,S as U,O as Z,T as Q,a as X,C as J,b as G}from"./index-BLcz9e82.js";import{C as K,a as ee}from"./CalculadoraTextBlock-CoN6yLp2.js";const N=.07,ae=.2,w="14,0",C="30",p=30,O={pouca:.25,media:.2,muita:.15},M={pouca:{label:"Pouco",limiarPct:.1,prefixo:"até"},media:{label:"Médio",limiarPct:.25,prefixo:"até"},muita:{label:"Muito",limiarPct:.25,prefixo:"mais de"}},v=a=>parseFloat(a.replace(/\./g,"").replace(",","."))||0,d=a=>a.toLocaleString("pt-BR",{minimumFractionDigits:2,maximumFractionDigits:2}),I=a=>{const o=a.replace(/\D/g,"");return o?(parseInt(o,10)/100).toLocaleString("pt-BR",{minimumFractionDigits:2}):""};function re(a,o){const r=M[a],l=o*r.limiarPct;return`Variação de ${r.prefixo} R$ ${d(l)} entre meses`}function te(a,o,r){return a<=0||o<=0?0:r===0?a/o:a*r/(1-Math.pow(1+r,-o))}function oe(a,o,r){return a<=0||o<=0?0:r===0?a*o:a*(1-Math.pow(1+r,-o))/r}function D({text:a}){return e.jsxs(Q,{children:[e.jsx(X,{asChild:!0,children:e.jsx("button",{type:"button",className:"vt-tooltip-btn","aria-label":"Mais informações",children:e.jsx(J,{size:14})})}),e.jsx(G,{className:"max-w-[240px] text-xs leading-snug",children:a})]})}function y({label:a,value:o,sub:r,subAsPill:l=!1,delay:h=0,visible:g}){return e.jsxs("div",{className:"result-card result-card--tone-green",style:{transitionDelay:`${h}ms`,opacity:g?1:0,transform:g?"translateY(0)":"translateY(12px)",transition:"opacity 0.45s ease, transform 0.45s ease"},children:[e.jsx("p",{className:"result-label",children:a}),e.jsx("p",{className:"result-value",children:o}),r&&(l?e.jsx("span",{className:"result-pill",children:r}):e.jsx("p",{className:"result-sub",children:r}))]})}function le(){const[a,o]=n.useState(""),[r,l]=n.useState(null),[h,g]=n.useState(""),[f,W]=n.useState(C),[x,B]=n.useState(w),[i,_]=n.useState(null),[c,R]=n.useState(!1),k=n.useRef(null),b=v(a)>0,L=()=>{const t=v(a),s=v(h),m=Math.min(p,parseInt(f,10)||0),$=(parseFloat(x.replace(",","."))||0)/100;if(!t||!s||!r||!m)return;const A=m*12,T=Math.pow(1+$,1/12)-1,E=s/(ae+N),Y=O[r],V=t*Y,P=(oe(V,A,T)+s)/(1+N),H=E<=P?"entrada":"renda",u=Math.min(E,P),z=N*u,j=Math.max(0,s-z),F=Math.max(0,u-j),S=te(F,A,T);_({precoRecomendado:u,entradaEfetiva:j,custosCartorarios:z,financiamento:F,parcelaEstimada:S,percentualRendaComprometida:t>0?S/t*100:0,percentualEntradaFinal:u>0?j/u*100:0,limitante:H}),R(!1),setTimeout(()=>R(!0),50),window.innerWidth<768&&setTimeout(()=>{var q;return(q=k.current)==null?void 0:q.scrollIntoView({behavior:"smooth",block:"start"})},150)};return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
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

        /* Two-column form layout — grid, para as linhas ficarem alinhadas entre as colunas */
        .vt-two-col { display: grid; grid-template-columns: 1fr; gap: 1.25rem; align-items: start; }
        @media (min-width: 640px) {
          .vt-two-col { grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        }
        .vt-field { display: flex; flex-direction: column; gap: 0.45rem; }
        .vt-label { font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--vt-dark); line-height: 1.3; }
        /* Reserva a mesma altura (até 2 linhas) para rótulos pareados lado a lado,
           ancorando o texto embaixo — assim os dois inputs abaixo ficam alinhados
           mesmo quando um rótulo é mais longo e quebra linha e o outro não. */
        .vt-label-align { display: flex; align-items: flex-end; min-height: 2.3rem; }
        .vt-label-row { display: flex; align-items: center; gap: 0.3rem; }
        .vt-tooltip-btn {
          display: inline-flex; align-items: center; justify-content: center;
          background: none; border: none; padding: 0; margin: 0; line-height: 0;
          color: #8aab96; cursor: help; flex-shrink: 0;
        }
        .vt-tooltip-btn:hover { color: var(--vt-dark); }
        .vt-hint { font-size: 0.78rem; font-weight: 400; color: #607060; margin-top: -0.1rem; }
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
        /* Iguala a altura do Prazo/Taxa de juros à do seletor Pouco/Médio/Muito ao lado. */
        .vt-input--compact { padding-top: 0.74rem; padding-bottom: 0.74rem; }

        .vt-inline-row { display: flex; gap: 0.75rem; }
        .vt-inline-row .vt-field { flex: 1; }

        /* Toggle Pouca / Média / Muita */
        .vt-toggle {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.35rem;
          background: #f7f9f7; border: 1.5px solid #d0dbd2; border-radius: 0.6rem; padding: 0.3rem;
        }
        .vt-toggle-btn {
          padding: 0.55rem 0.5rem; border: none; border-radius: 0.4rem; background: transparent;
          font-family: 'Work Sans', sans-serif; font-size: 0.8rem; font-weight: 700; color: #607060;
          cursor: pointer; transition: background 0.2s, color 0.2s, box-shadow 0.2s;
        }
        .vt-toggle-btn.active { background: var(--vt-dark); color: #fff; box-shadow: 0 2px 8px rgba(29,175,102,0.3); }
        .vt-toggle-btn:disabled { opacity: 0.45; cursor: not-allowed; }

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

        .result-card { background: #fff; border-radius: 0.9rem; padding: 1.25rem 1.5rem; box-shadow: none; }
        .result-card--highlight { background: linear-gradient(135deg, #1A2E35 0%, #22443a 100%); border: none; box-shadow: 0 4px 16px rgba(26,69,55,0.18); border-radius: 0.9rem; }
        .result-card--highlight .result-label { color: #7ab898; }
        .result-card--highlight .result-value { color: #fff; font-size: 1.5rem; }
        .result-card--highlight .result-sub { color: #a3b8ac; }

        .result-card--tone-green { background: rgba(29,175,102,0.08); }
        .result-card--tone-green .result-label { color: #0e6b3a; }

        .result-label { font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.07em; color: #7a9a82; margin-bottom: 0.35rem; }
        .result-value { font-size: 1.35rem; font-weight: 900; color: var(--vt-darker); }
        .result-sub { font-size: 0.75rem; font-weight: 500; color: #8aab96; margin-top: 0.25rem; }
        .result-pill {
          display: inline-flex; align-items: center; margin-top: 0.6rem;
          background: rgba(29,175,102,0.18); color: #0e6b3a;
          font-size: 0.75rem; font-weight: 700; padding: 0.3rem 0.75rem; border-radius: 999px;
        }

        .vt-info {
          margin-top: 0.75rem; padding: 0.9rem 1.25rem;
          background: rgba(29,175,102,0.08); border-radius: 0.9rem;
          font-size: 0.85rem; font-weight: 500; color: #0e6b3a;
        }
      `}),e.jsxs("div",{className:"vt-root",children:[e.jsxs("section",{className:"vt-hero",children:[e.jsxs("div",{className:"vt-hero-inner",children:[e.jsxs("nav",{className:"vt-breadcrumb",children:[e.jsx("a",{href:"#/",children:"Home"}),e.jsx("span",{children:"/"}),e.jsx("a",{href:"#/",children:"Imóveis"}),e.jsx("span",{children:"/"}),e.jsx("span",{style:{color:"#d9d4c4"},children:"Calculadora"})]}),e.jsxs("h1",{children:["Qual imóvel ",e.jsx("span",{children:"você pode comprar?"})]}),e.jsx("p",{children:"Descubra qual valor máximo de imóvel você pode comprar, financiando!"}),e.jsx(U,{title:"Posso Comprar Este Imóvel? | Orienta",style:{marginTop:"20px"}})]}),e.jsx("svg",{className:"vt-hero-blob",viewBox:"0 0 200 200",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M44.7,-76.4C58.3,-69.2,70.1,-57.4,77.6,-43.3C85.2,-29.2,88.5,-12.8,87.3,3.3C86.1,19.4,80.4,35.2,70.9,48.2C61.3,61.2,47.9,71.4,33.1,77.4C18.3,83.4,2.2,85.1,-13.7,81.9C-29.5,78.7,-45.1,70.5,-57.8,59.3C-70.5,48.1,-80.4,33.9,-84.6,18.5C-88.7,3,-87.1,-13.7,-80.3,-28.4C-73.6,-43.1,-61.7,-55.8,-48.2,-63C-34.7,-70.2,-19.5,-71.9,-2.4,-67.7C14.7,-63.5,29.3,-53.4,44.7,-76.4Z",fill:"#abccb5",transform:"translate(100 100)"})})]}),e.jsxs("main",{className:"vt-main",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"vt-section-heading",children:[e.jsxs("h2",{children:[e.jsxs("svg",{width:"28",height:"28",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"}),e.jsx("polyline",{points:"9 22 9 12 15 12 15 22"})]}),"Descubra o imóvel recomendado para você"]}),e.jsx("p",{children:"Preencha sua renda e o quanto você tem disponível para dar entrada."})]}),e.jsxs("div",{className:"vt-card",children:[e.jsxs("div",{className:"vt-two-col",children:[e.jsxs("div",{className:"vt-field",children:[e.jsx("label",{className:"vt-label vt-label-align",children:"Renda média últimos 6 meses"}),e.jsxs("div",{className:"vt-input-wrap",children:[e.jsx("span",{className:"vt-prefix",children:"R$"}),e.jsx("input",{className:"vt-input has-prefix",placeholder:"Ex: 8.000,00",value:a,onChange:t=>{const s=I(t.target.value);o(s),v(s)||l(null)}})]})]}),e.jsxs("div",{className:"vt-field",children:[e.jsx("label",{className:"vt-label vt-label-align",children:"Valor disponível para entrada, custos cartorários e impostos"}),e.jsxs("div",{className:"vt-input-wrap",children:[e.jsx("span",{className:"vt-prefix",children:"R$"}),e.jsx("input",{className:"vt-input has-prefix",placeholder:"Ex: 150.000,00",value:h,onChange:t=>g(I(t.target.value))})]})]}),e.jsxs("div",{className:"vt-field",children:[e.jsx("label",{className:"vt-label",children:"Quanto sua renda varia mês a mês?"}),e.jsx("div",{className:"vt-toggle",children:["pouca","media","muita"].map(t=>e.jsx("button",{type:"button",disabled:!b,className:"vt-toggle-btn"+(r===t?" active":""),onClick:()=>l(t),children:M[t].label},t))}),!b&&e.jsx("p",{className:"vt-hint",children:"Informe sua renda para escolher a variação."}),b&&r&&e.jsxs("p",{className:"vt-hint",children:[re(r,v(a))," — usaremos"," ",(O[r]*100).toFixed(0),"% da sua renda na parcela."]})]}),e.jsx("div",{className:"vt-field",children:e.jsxs("div",{className:"vt-inline-row",children:[e.jsxs("div",{className:"vt-field",children:[e.jsxs("div",{className:"vt-label-row",children:[e.jsx("label",{className:"vt-label",children:"Prazo"}),e.jsx(D,{text:"É o prazo total do financiamento, em anos. O prazo máximo considerado aqui é de 30 anos."})]}),e.jsxs("div",{className:"vt-input-wrap",children:[e.jsx("input",{className:"vt-input has-suffix vt-input--compact",type:"number",min:1,max:p,placeholder:C,value:f,onChange:t=>{const s=t.target.value,m=parseInt(s,10);W(!isNaN(m)&&m>p?String(p):s)}}),e.jsx("span",{className:"vt-suffix",children:"anos"})]})]}),e.jsxs("div",{className:"vt-field",children:[e.jsxs("div",{className:"vt-label-row",children:[e.jsx("label",{className:"vt-label",children:"Juros"}),e.jsx(D,{text:"Consideramos 14% ao ano como padrão. Para saber a taxa real do seu financiamento, consulte o CET (Custo Efetivo Total) do banco e a TR (Taxa Referencial) vigente."})]}),e.jsxs("div",{className:"vt-input-wrap",children:[e.jsx("input",{className:"vt-input has-suffix vt-input--compact",placeholder:w,value:x,onChange:t=>B(t.target.value)}),e.jsx("span",{className:"vt-suffix",children:"% a.a."})]})]})]})})]}),e.jsxs("button",{className:"vt-btn",onClick:L,children:["Calcular imóvel recomendado",e.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("line",{x1:"5",y1:"12",x2:"19",y2:"12"}),e.jsx("polyline",{points:"12 5 19 12 12 19"})]})]})]}),e.jsx("div",{ref:k,children:i&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"vt-results-grid",style:{gridTemplateColumns:"1fr"},children:e.jsxs("div",{className:"result-card result-card--highlight",style:{transitionDelay:"0ms",opacity:c?1:0,transform:c?"translateY(0)":"translateY(12px)",transition:"opacity 0.45s ease, transform 0.45s ease"},children:[e.jsx("p",{className:"result-label",children:"Imóvel recomendado"}),e.jsxs("p",{className:"result-value",children:["até R$ ",d(i.precoRecomendado)]}),e.jsxs("p",{className:"result-sub",children:["Financiamento de ",f," anos a ",x,"% ao ano"]})]})}),e.jsxs("div",{className:"vt-results-grid",children:[e.jsx(y,{label:"Entrada utilizada",value:`R$ ${d(i.entradaEfetiva)}`,sub:`${i.percentualEntradaFinal.toFixed(0)}% do imóvel`,subAsPill:!0,delay:60,visible:c}),e.jsx(y,{label:"Custos (cartórios e ITBI)",value:`R$ ${d(i.custosCartorarios)}`,delay:120,visible:c}),e.jsx(y,{label:"Financiamento",value:`R$ ${d(i.financiamento)}`,sub:`Parcela de R$ ${d(i.parcelaEstimada)}/mês`,delay:180,visible:c})]}),e.jsx("div",{className:"vt-info",children:i.limitante==="entrada"?"O valor foi limitado pela sua entrada disponível: sua renda sustentaria uma parcela maior, mas a entrada precisa representar pelo menos 20% do imóvel.":"O valor foi limitado pela sua capacidade de pagamento mensal, considerando a variação da sua renda."})]})})]}),e.jsx(K,{promo:{image:"https://lh3.googleusercontent.com/aida-public/AB6AXuBiIAZZ1_Gx_i7qJnBZuqdTW1gDH3BRnNYO_BEfyALedW6hdQWTMrCxvimHAEd8ExDNnqlKeuvR-2F8QjxPY9Dqa6TRS04rbJ4IHfWuEKjtYGv7TfDybTd72owjQcX4oPr4yCEaVGqfCSdYjZuiJMMUjzND-N92XHg60Wl0AW6pVWYbkVseir6LsmR7lMTIUZUghLYar5-r4fWxk-6_SdT0ZodH-4-NK0c10UUt2AWOvWW4ONhyInd5nJ0-mswYeBWEQUOaxjfpSaAH",imageAlt:"Casa com selo de avaliação de risco",badge:"Antes de comprar",title:"Relatório de Avaliação de Riscos",description:"Confira certidões e processos do vendedor antes de fechar negócio.",href:"#/relatorio-avaliacao-riscos"},resources:[{icon:"calc",title:"Calculadora do Milhão",desc:"Quanto tempo até seu primeiro milhão.",href:"#/planejamento/calculadoras/milhao"},{icon:"calc",title:"Calculadora de Metas",desc:"O poder do tempo ao seu favor.",href:"#/planejamento/calculadoras/metas"},{icon:"stats",title:"Comparador de Renda Fixa",desc:"Calcule qual melhor produto.",href:"#/investimentos/renda-fixa/comparador"},{icon:"article",title:"Formas de Economizar",desc:"Pequenas mudanças, grandes resultados.",href:"#/planejamento/despesas"}]})]}),e.jsxs(ee,{children:[e.jsx("h2",{className:"text-3xl font-bold text-foreground mb-6",children:"Como calculamos o imóvel que você pode comprar?"}),e.jsx("p",{children:"Em vez de avaliar um preço de imóvel que você já tem em mente, esta calculadora parte da sua renda e do valor que você tem disponível para entrada e custos cartoriais, e devolve o valor máximo de imóvel recomendado para o seu momento financeiro."}),e.jsxs("p",{children:["Do valor informado para entrada + custos, descontamos os"," ",e.jsx("strong",{children:"custos cartorários"})," — ITBI, escritura e registro, estimados em"," ",e.jsx("strong",{children:"7% do valor do imóvel"})," — e o restante vira a entrada efetiva. Essa entrada precisa representar ",e.jsx("strong",{children:"pelo menos 20% do valor do imóvel"})," — o que já define um teto de preço só com base no que você tem guardado."]}),e.jsxs("p",{children:["Do lado da renda, pedimos a ",e.jsx("strong",{children:"média dos últimos 6 meses"})," e o quanto ela varia mês a mês, porque isso muda quanto dela pode ir com segurança para a parcela: renda ",e.jsx("strong",{children:"pouco variável"})," (até 10%) permite comprometer até 25%; renda com"," ",e.jsx("strong",{children:"variação média"})," (até 25%) usa 20%; e renda ",e.jsx("strong",{children:"muito variável"})," ","(acima de 25%) usa apenas 15%, para deixar margem nos meses mais fracos. Por padrão simulamos o financiamento com prazo de ",C," anos e taxa de"," ",w,"% ao ano, mas você pode ajustar os dois valores na calculadora — o prazo máximo permitido é de ",p," anos. A parcela é calculada pela"," ",e.jsx("strong",{children:"Tabela Price"}),", com valor fixo do início ao fim do financiamento."]}),e.jsxs("p",{children:["O valor final recomendado é sempre o ",e.jsx("strong",{children:"menor"})," entre o teto que sua entrada sustenta e o teto que sua renda sustenta — o que estiver mais apertado é quem define até onde você pode ir com segurança."]}),e.jsx("div",{className:"bg-primary/10 border border-primary/30 rounded-lg p-6 mt-8",children:e.jsxs("p",{className:"text-foreground font-semibold mb-0",children:[e.jsx("strong",{children:"Em resumo:"})," informe sua renda, o quanto ela varia e o valor disponível para entrada e custos, e a calculadora acima mostra o preço máximo de imóvel recomendado, a parcela estimada e o que limita esse valor."]})})]}),e.jsx(Z,{exclude:"/imoveis/calculadoras/posso-comprar"})]})]})}export{le as default};
