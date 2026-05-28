import{r,j as e}from"./index-4ahiujka.js";import{C as W,a as E}from"./CalculadoraTextBlock-rPWCDOZW.js";const N=s=>parseFloat(s.replace(/\./g,"").replace(",","."))||0,v=s=>s.toLocaleString("pt-BR",{minimumFractionDigits:2,maximumFractionDigits:2}),y=s=>{const o=s.replace(/\D/g,"");return o?(parseInt(o,10)/100).toLocaleString("pt-BR",{minimumFractionDigits:2}):""};function f({label:s,value:o,accent:n,delay:m=0,visible:l}){return e.jsxs("div",{className:"result-card",style:{borderLeft:`4px solid ${n}`,transitionDelay:`${m}ms`,opacity:l?1:0,transform:l?"translateY(0)":"translateY(12px)",transition:"opacity 0.45s ease, transform 0.45s ease"},children:[e.jsx("p",{className:"result-label",children:s}),e.jsxs("p",{className:"result-value",children:["R$ ",o]})]})}function B(){const[s,o]=r.useState(""),[n,m]=r.useState(""),[l,k]=r.useState(""),[x,C]=r.useState("Anos"),[g,q]=r.useState(""),[t,F]=r.useState(null),[p,b]=r.useState(!1),u=r.useRef(null),M=()=>{const a=N(s),i=N(n),R=(parseFloat(g.replace(",","."))||0)/100,j=parseInt(l,10)||0,d=x==="Anos"?j*12:j;if(!a||!d)return;const h=Math.pow(1+R,1/12)-1;let c=0;if(h===0)c=Math.max(0,(a-i)/d);else{const w=Math.pow(1+h,d);c=Math.max(0,(a-i*w)/((w-1)/h))}const S=c*d+i,z=Math.max(0,a-S);F({monthlyPayment:c,totalSaved:a,interestEarned:z}),b(!1),setTimeout(()=>b(!0),50)};return r.useEffect(()=>{t&&u.current&&window.innerWidth<768&&setTimeout(()=>{var i;return(i=u.current)==null?void 0:i.scrollIntoView({behavior:"smooth",block:"start"})},100)},[t]),e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
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

      `}),e.jsxs("div",{className:"vt-root",children:[e.jsxs("section",{className:"vt-hero",children:[e.jsxs("div",{className:"vt-hero-inner",children:[e.jsxs("nav",{className:"vt-breadcrumb",children:[e.jsx("a",{href:"#",children:"Home"}),e.jsx("span",{children:"/"}),e.jsx("a",{href:"#",children:"Ferramentas"}),e.jsx("span",{children:"/"}),e.jsx("span",{style:{color:"#d9d4c4"},children:"Calculadora"})]}),e.jsxs("h1",{children:["Calculadora de"," ",e.jsx("span",{children:"Metas Financeiras"})]}),e.jsx("p",{children:"Planeje seu futuro com precisão. Defina seus objetivos e descubra o caminho exato para a sua liberdade financeira através de cálculos baseados em rendimentos reais."})]}),e.jsx("svg",{className:"vt-hero-blob",viewBox:"0 0 200 200",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M44.7,-76.4C58.3,-69.2,70.1,-57.4,77.6,-43.3C85.2,-29.2,88.5,-12.8,87.3,3.3C86.1,19.4,80.4,35.2,70.9,48.2C61.3,61.2,47.9,71.4,33.1,77.4C18.3,83.4,2.2,85.1,-13.7,81.9C-29.5,78.7,-45.1,70.5,-57.8,59.3C-70.5,48.1,-80.4,33.9,-84.6,18.5C-88.7,3,-87.1,-13.7,-80.3,-28.4C-73.6,-43.1,-61.7,-55.8,-48.2,-63C-34.7,-70.2,-19.5,-71.9,-2.4,-67.7C14.7,-63.5,29.3,-53.4,44.7,-76.4Z",fill:"#abccb5",transform:"translate(100 100)"})})]}),e.jsxs("main",{className:"vt-main",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"vt-section-heading",children:[e.jsxs("h2",{children:[e.jsxs("svg",{width:"28",height:"28",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8.5 3.3 1.5 4.2C6 18 6 19 6 19h12s0-1-.5-2.8c1-.9 1.5-2.4 1.5-4.2 0-1-.25-1.75-.5-2.5L20 8s1-5-1-3z"}),e.jsx("path",{d:"M2 9v1c0 1.1.9 2 2 2h1"}),e.jsx("path",{d:"M16 11h0"})]}),"Quanto preciso poupar por mês?"]}),e.jsx("p",{children:"Diga-nos quanto você quer guardar e quando quer atingir sua meta."})]}),e.jsxs("div",{className:"vt-card",children:[e.jsxs("div",{className:"vt-form-grid",children:[e.jsxs("div",{className:"vt-field",children:[e.jsx("label",{className:"vt-label",children:"Meta de 1 Milhão (R$)"}),e.jsxs("div",{className:"vt-input-wrap",children:[e.jsx("span",{className:"vt-prefix",children:"R$"}),e.jsx("input",{className:"vt-input has-prefix",placeholder:"1.000.000,00",value:1e6,onChange:a=>o(y(a.target.value))})]})]}),e.jsxs("div",{className:"vt-field",children:[e.jsx("label",{className:"vt-label",children:"Saldo Inicial (R$)"}),e.jsxs("div",{className:"vt-input-wrap",children:[e.jsx("span",{className:"vt-prefix",children:"R$"}),e.jsx("input",{className:"vt-input has-prefix",placeholder:"Ex: 5.000,00",value:n,onChange:a=>m(y(a.target.value))})]})]}),e.jsxs("div",{className:"vt-field",children:[e.jsx("label",{className:"vt-label",children:"Prazo para Crescer"}),e.jsxs("div",{className:"vt-period-row",children:[e.jsx("input",{className:"vt-input",style:{flex:1},placeholder:"Valor",type:"number",min:1,value:l,onChange:a=>k(a.target.value)}),e.jsxs("select",{className:"vt-select",value:x,onChange:a=>C(a.target.value),children:[e.jsx("option",{children:"Anos"}),e.jsx("option",{children:"Meses"})]})]})]}),e.jsxs("div",{className:"vt-field",children:[e.jsx("label",{className:"vt-label",children:"Taxa de Juros (% ao ano)"}),e.jsxs("div",{className:"vt-input-wrap",children:[e.jsx("input",{className:"vt-input has-suffix",placeholder:"Ex: 10,5",value:g,onChange:a=>q(a.target.value)}),e.jsx("span",{className:"vt-suffix",children:"%"})]})]})]}),e.jsxs("button",{className:"vt-btn",onClick:M,children:["Calcular Meta",e.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("line",{x1:"5",y1:"12",x2:"19",y2:"12"}),e.jsx("polyline",{points:"12 5 19 12 12 19"})]})]})]}),e.jsxs("div",{className:"vt-results-grid",ref:u,children:[e.jsx(f,{label:"Total a Poupar",value:t?v(t.totalSaved):"0,00",accent:"#1a4537",delay:0,visible:p}),e.jsx(f,{label:"Parcela Mensal",value:t?v(t.monthlyPayment):"0,00",accent:"#618c70",delay:80,visible:p}),e.jsx(f,{label:"Juros Ganhos",value:t?v(t.interestEarned):"0,00",accent:"#abccb5",delay:160,visible:p})]})]}),e.jsx(W,{promo:{image:"https://lh3.googleusercontent.com/aida-public/AB6AXuBiIAZZ1_Gx_i7qJnBZuqdTW1gDH3BRnNYO_BEfyALedW6hdQWTMrCxvimHAEd8ExDNnqlKeuvR-2F8QjxPY9Dqa6TRS04rbJ4IHfWuEKjtYGv7TfDybTd72owjQcX4oPr4yCEaVGqfCSdYjZuiJMMUjzND-N92XHg60Wl0AW6pVWYbkVseir6LsmR7lMTIUZUghLYar5-r4fWxk-6_SdT0ZodH-4-NK0c10UUt2AWOvWW4ONhyInd5nJ0-mswYeBWEQUOaxjfpSaAH",imageAlt:"Moedas empilhadas com planta crescendo",badge:"Destaque",title:"Guia de Investimentos 2024",description:"Descubra as melhores taxas para seu perfil.",href:"#/investimentos/fundos"},resources:[{icon:"article",title:"28 Formas de Economizar",desc:"Pequenas mudanças, grandes resultados.",href:"#/planejamento/despesas"},{icon:"stats",title:"Comparador de Renda Fixa",desc:"Calcule qual melhor produto.",href:"#/investimentos/renda-fixa/comparador"},{icon:"bank",title:"Renda Fixa vs Variável",desc:"Qual o melhor para sua meta?",href:"#/investimentos/renda-fixa"},{icon:"calc",title:"Calculadora de Metas",desc:"O poder do tempo ao seu favor.",href:"#/planejamento/calculadoras/metas"}]})]}),e.jsxs(E,{children:[e.jsx("h2",{className:"text-3xl font-bold text-foreground mb-6",children:"O que é o primeiro milhão?"}),e.jsx("p",{children:"Chegar ao primeiro milhão é um marco financeiro que representa muito mais do que um número. É a prova de que a disciplina, a consistência e o tempo trabalham a seu favor. Para a maioria das pessoas, esse objetivo parece distante, mas com planejamento e os juros compostos do seu lado, ele é totalmente alcançável."}),e.jsxs("p",{children:["A chave está em começar cedo e manter aportes regulares. Mesmo quantias modestas, investidas mensalmente por muitos anos, podem se transformar em um patrimônio significativo graças ao efeito dos ",e.jsx("strong",{children:"juros compostos"}),"."]}),e.jsx("h3",{className:"text-2xl font-bold text-foreground mt-10 mb-4",children:"Como os juros compostos aceleram o caminho"}),e.jsx("p",{children:"Nos juros compostos, os rendimentos de cada período são incorporados ao saldo e passam a gerar novos rendimentos. Isso cria um efeito exponencial: quanto mais tempo o dinheiro fica investido, mais rápido ele cresce."}),e.jsxs("ul",{children:[e.jsx("li",{children:"No início, o crescimento parece lento."}),e.jsx("li",{children:"Com o tempo, os juros sobre juros ganham força."}),e.jsx("li",{children:"Nas fases finais, o patrimônio cresce mais pelos rendimentos do que pelos seus aportes."})]}),e.jsx("h3",{className:"text-2xl font-bold text-foreground mt-10 mb-4",children:"O papel do tempo e da consistência"}),e.jsxs("p",{children:["Dois investidores que aplicam o mesmo valor total podem chegar a resultados completamente diferentes dependendo de ",e.jsx("strong",{children:"quando começaram"}),". Quem começa aos 25 anos acumula muito mais do que quem começa aos 35, mesmo contribuindo o mesmo montante total."]}),e.jsx("p",{children:"Por isso, o melhor momento para começar é agora. O segundo melhor momento também é agora."}),e.jsx("h3",{className:"text-2xl font-bold text-foreground mt-10 mb-4",children:"Estratégias para chegar ao primeiro milhão"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Defina um valor de aporte mensal e automatize a transferência."}),e.jsx("li",{children:"Escolha investimentos com boas taxas e adequados ao seu perfil."}),e.jsx("li",{children:"Reinvista os rendimentos em vez de sacá-los."}),e.jsx("li",{children:"Aumente os aportes sempre que sua renda crescer."}),e.jsx("li",{children:"Evite resgatar o investimento antes do prazo planejado."})]}),e.jsx("div",{className:"bg-primary/10 border border-primary/30 rounded-lg p-6 mt-8",children:e.jsx("p",{className:"text-foreground font-semibold mb-0",children:"✅ Em resumo: o primeiro milhão é resultado de tempo, consistência e juros compostos. Use a calculadora acima para descobrir quanto você precisa poupar por mês para alcançar esse objetivo."})})]})]})]})}export{B as default};
