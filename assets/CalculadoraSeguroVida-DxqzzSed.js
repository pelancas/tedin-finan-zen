import{c as ve,j as e,a as _,S as H,r as d,I as Z,b as ue,u as X}from"./index-B8-jkiuF.js";import{C as he}from"./CalculadoraSidebar-BUCFlyYH.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ge=ve("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]),fe="https://docs.google.com/forms/d/e/1FAIpQLScEfEkIfRzdPqTUU96UREr8ZQQBU8obg-UtzhXlIGBlu37RXA/formResponse",u=a=>parseFloat(a.replace(/\./g,"").replace(",","."))||0,m=a=>a.toLocaleString("pt-BR",{minimumFractionDigits:2,maximumFractionDigits:2}),xe=a=>{const n=a.replace(/\D/g,"");return n?(parseInt(n,10)/100).toLocaleString("pt-BR",{minimumFractionDigits:2}):""},be=["Dependentes","Renda","Dívidas","Bens"],je=[5,10,15,20,25,30,"vitalicio"],ke=.05,G=()=>({despesa:"",anos:20}),J=(a,n)=>{const r=u(a);return r<=0?0:n==="vitalicio"?r*12/ke:r*12*n};function we({current:a}){return e.jsx("div",{className:"vt-steps",children:be.map((n,r)=>{const i=r+1,l=i<a?"done":i===a?"active":"todo";return e.jsxs("div",{className:"vt-step",children:[e.jsxs("div",{className:"vt-step-row",children:[e.jsx("span",{className:`vt-step-circle vt-step-circle--${l}`,children:l==="done"?e.jsx(ge,{size:14}):i}),i<4&&e.jsx("span",{className:`vt-step-line${i<a?" done":""}`})]}),e.jsx("span",{className:`vt-step-label${l==="active"?" active":""}`,children:n})]},n)})})}function K({label:a,value:n,onChange:r,max:i=10}){return e.jsxs("div",{className:"vt-field",children:[e.jsx("label",{className:"vt-label",children:a}),e.jsxs("div",{className:"vt-stepper",children:[e.jsx("button",{type:"button",className:"vt-stepper-btn",onClick:()=>r(Math.max(0,n-1)),"aria-label":`Diminuir ${a}`,children:"−"}),e.jsx("span",{className:"vt-stepper-value",children:n}),e.jsx("button",{type:"button",className:"vt-stepper-btn",onClick:()=>r(Math.min(i,n+1)),"aria-label":`Aumentar ${a}`,children:"+"})]})]})}function ee({value:a,onChange:n,showLabel:r=!0}){return e.jsxs("div",{className:"vt-field",children:[r&&e.jsx("label",{className:"vt-label",children:"Por quantos anos sua família precisaria dessa renda?"}),e.jsx("select",{className:"vt-select",value:String(a),onChange:i=>n(i.target.value==="vitalicio"?"vitalicio":Number(i.target.value)),children:je.map(i=>e.jsx("option",{value:i,children:i==="vitalicio"?"Vitalício":`${i} anos`},i))})]})}function ye({value:a,onChange:n}){return e.jsx("div",{className:"vt-stars",children:[1,2,3,4,5].map(r=>e.jsx("button",{type:"button",className:"vt-star-btn",style:{color:r<=a?"var(--vt-mid)":"#d0dbd2"},onClick:()=>n(r),"aria-label":`${r} estrela${r>1?"s":""}`,"aria-pressed":r<=a,children:e.jsx(ue,{size:30,fill:r<=a?"currentColor":"none",strokeWidth:1.5})},r))})}function v({label:a,value:n,onChange:r,placeholder:i,hint:l}){return e.jsxs("div",{className:"vt-field",children:[a&&e.jsx("label",{className:"vt-label",children:a}),e.jsxs("div",{className:"vt-input-wrap",children:[e.jsx("span",{className:"vt-prefix",children:"R$"}),e.jsx("input",{className:"vt-input has-prefix",placeholder:i,value:n,inputMode:"numeric",onChange:g=>r(xe(g.target.value))})]}),l&&e.jsx("p",{className:"vt-hint",children:l})]})}function ae({label:a,value:n,sub:r,delay:i=0,visible:l}){return e.jsxs("div",{className:"result-card result-card--highlight",style:{transitionDelay:`${i}ms`,opacity:l?1:0,transform:l?"translateY(0)":"translateY(12px)",transition:"opacity 0.45s ease, transform 0.45s ease"},children:[e.jsx("p",{className:"result-label",children:a}),e.jsxs("p",{className:"result-value",children:["R$ ",m(n)]}),r&&e.jsx("p",{className:"result-sub",children:r})]})}function Ne(){const[a,n]=d.useState(1),[r,i]=d.useState(""),[l,g]=d.useState([]),[w,C]=d.useState([]),[S,se]=d.useState(""),[z,te]=d.useState(""),[R,re]=d.useState(""),[t,A]=d.useState(null),[E,q]=d.useState(!1),D=d.useRef(null),[f,T]=d.useState(0),[L,F]=d.useState(""),[I,$]=d.useState(""),[y,V]=d.useState(!1),[W,B]=d.useState(!1),oe=async()=>{if(!(f===0||y)){V(!0);try{const s=new FormData;s.append("entry.1761141719",String(f)),s.append("entry.1264580802",L),s.append("entry.1130231766",I),await fetch(fe,{method:"POST",mode:"no-cors",body:s}),B(!0),X("Obrigado pelo feedback!")}catch{X("Não foi possível enviar sua avaliação. Tente novamente.")}finally{V(!1)}}},ne=()=>{A(null),B(!1),T(0),F(""),$("")},x=l.length,b=w.length,ie=s=>g(o=>s>o.length?[...o,G()]:o.slice(0,s)),de=s=>C(o=>s>o.length?[...o,G()]:o.slice(0,s)),j=(s,o,c)=>{(s==="adultos"?g:C)(N=>N.map((k,p)=>p===o?{...k,...c}:k))},h=[...l,...w],le=h.some(s=>s.anos==="vitalicio")?"vitalicio":h.length>0?Math.max(...h.map(s=>s.anos)):20,O=h.reduce((s,o)=>s+u(o.despesa),0),M=u(r)+O,Y=M>0,ce=()=>n(s=>Math.min(4,s+1)),me=()=>n(s=>Math.max(1,s-1)),pe=()=>{if(!Y)return;const s=u(S)+u(z),o=u(R),c=h.reduce((p,P)=>p+J(P.despesa,P.anos),0),U=c+J(r,le),N=Math.max(0,c+s-o),k=Math.max(0,U+s-o);A({adultos:x,criancas:b,despesasDependentes:O,despesasTotais:M,dividas:s,bens:o,capitalVida:N,capitalInvalidez:k}),q(!1),setTimeout(()=>q(!0),50),window.innerWidth<768&&setTimeout(()=>{var p;return(p=D.current)==null?void 0:p.scrollIntoView({behavior:"smooth",block:"start"})},150)},Q=x===0&&b===0;return e.jsxs("div",{className:"vt-card",children:[!t&&e.jsxs(e.Fragment,{children:[e.jsx(we,{current:a}),e.jsxs("div",{className:"vt-step-panel",children:[a===1&&e.jsxs(e.Fragment,{children:[e.jsx("h3",{className:"vt-step-title",children:"Quem depende financeiramente de você?"}),e.jsx("p",{className:"vt-step-intro",children:"Isso é fundamental para nos ajudar a determinar uma estimativa mais precisa. Selecione quantos adultos e quantas crianças dependem de você."}),e.jsxs("div",{className:"vt-two-col",children:[e.jsx(K,{label:"Adultos",value:x,onChange:ie}),e.jsx(K,{label:"Crianças",value:b,onChange:de})]})]}),a===2&&e.jsxs(e.Fragment,{children:[e.jsx("h3",{className:"vt-step-title",children:"Renda a ser substituída"}),e.jsx("p",{className:"vt-step-intro",children:"Considere aluguel, alimentação, combustível e outras despesas regulares."}),e.jsxs("div",{className:"vt-renda-linha",children:[e.jsx("p",{className:"vt-renda-linha-title",children:"Suas despesas mensais"}),e.jsx(v,{value:r,onChange:i,placeholder:"Ex: 4.000,00"})]}),x+b>0&&e.jsxs("div",{className:"vt-renda-linha",children:[e.jsxs("div",{className:"vt-renda-header",children:[e.jsx("span",{}),e.jsx("span",{className:"vt-label",children:"Despesas com outras pessoas"}),e.jsx("span",{className:"vt-label",children:"Por quantos anos sua família precisaria dessa renda?"})]}),l.map((s,o)=>e.jsxs("div",{className:"vt-renda-row",children:[e.jsxs("p",{className:"vt-renda-row-label",children:["Adulto ",o+1]}),e.jsx(v,{value:s.despesa,onChange:c=>j("adultos",o,{despesa:c}),placeholder:"Ex: 1.500,00"}),e.jsx(ee,{value:s.anos,onChange:c=>j("adultos",o,{anos:c}),showLabel:!1})]},`adulto-${o}`)),w.map((s,o)=>e.jsxs("div",{className:"vt-renda-row",children:[e.jsxs("p",{className:"vt-renda-row-label",children:["Criança ",o+1]}),e.jsx(v,{value:s.despesa,onChange:c=>j("criancas",o,{despesa:c}),placeholder:"Ex: 1.500,00"}),e.jsx(ee,{value:s.anos,onChange:c=>j("criancas",o,{anos:c}),showLabel:!1})]},`crianca-${o}`))]})]}),a===3&&e.jsxs(e.Fragment,{children:[e.jsx("h3",{className:"vt-step-title",children:"Dívidas ou gastos adicionais"}),e.jsxs("div",{className:"vt-two-col",children:[e.jsx(v,{label:"Dívidas pendentes a cobrir",value:S,onChange:se,placeholder:"Ex: 60.000,00",hint:"Exemplos: saldo do financiamento imobiliário, empréstimos com garantia da casa própria, dívidas de cartão de crédito, financiamento de veículos, empréstimos estudantis com fiador e qualquer outra dívida que sua família precisaria quitar."}),e.jsx(v,{label:"Gastos adicionais",value:z,onChange:te,placeholder:"Ex: 50.000,00",hint:"Exemplos: faculdade das crianças, mudança de país ou de cidade, ou outros gastos futuros que sua família precisaria cobrir."})]})]}),a===4&&e.jsxs(e.Fragment,{children:[e.jsx("h3",{className:"vt-step-title",children:"Seus bens"}),e.jsxs("div",{className:"vt-callout",children:[e.jsx(Z,{size:16}),e.jsx("p",{children:"Observação: você precisará de uma cobertura de seguro de vida menor se tiver investimentos ou bens de grande valor que sua família possa vender após sua morte para cobrir despesas de subsistência."})]}),e.jsx(v,{label:"Valor de bens e investimentos disponíveis",value:R,onChange:re,placeholder:"Ex: 30.000,00"})]})]},a),e.jsxs("div",{className:"vt-wizard-actions",children:[a>1?e.jsxs("button",{type:"button",className:"vt-btn vt-btn-secondary",onClick:me,children:[e.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",style:{transform:"rotate(180deg)"},children:[e.jsx("line",{x1:"5",y1:"12",x2:"19",y2:"12"}),e.jsx("polyline",{points:"12 5 19 12 12 19"})]}),"Voltar"]}):e.jsx("span",{}),a<4?e.jsxs("button",{type:"button",className:"vt-btn vt-btn-flex",disabled:a===2&&!Y,onClick:ce,children:["Avançar",e.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("line",{x1:"5",y1:"12",x2:"19",y2:"12"}),e.jsx("polyline",{points:"12 5 19 12 12 19"})]})]}):e.jsxs("button",{type:"button",className:"vt-btn vt-btn-flex",onClick:pe,children:["Calcular",e.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("line",{x1:"5",y1:"12",x2:"19",y2:"12"}),e.jsx("polyline",{points:"12 5 19 12 12 19"})]})]})]})]}),t&&e.jsxs("div",{ref:D,children:[e.jsxs("div",{className:"vt-avaliacao",children:[e.jsx("h3",{className:"vt-step-title",children:"Avalie a ferramenta"}),e.jsx("p",{className:"vt-step-intro",children:"De 1 a 5 estrelas, o quanto essa calculadora te ajudou?"}),e.jsx(ye,{value:f,onChange:T}),e.jsx("input",{type:"email",className:"vt-input",style:{marginBottom:"1rem"},placeholder:"Seu e-mail (opcional)",value:I,onChange:s=>$(s.target.value)}),e.jsx("textarea",{className:"vt-textarea",placeholder:"Deixe um comentário (opcional)",value:L,onChange:s=>F(s.target.value)}),e.jsx("button",{type:"button",className:"vt-btn vt-btn-flex",disabled:f===0||y||W,onClick:oe,children:W?"Obrigado pelo feedback!":y?"Enviando...":"Enviar avaliação"})]}),e.jsxs("div",{style:{borderTop:"1px solid #e2e8e2",marginTop:"1.75rem",paddingTop:"1.75rem"},children:[e.jsxs("div",{className:"vt-results-grid vt-results-grid--pair",children:[e.jsx(ae,{label:"Seguro de vida recomendado",value:t.capitalVida,sub:t.capitalVida>0?`Para proteger ${t.adultos} adulto(s) e ${t.criancas} criança(s)`:void 0,visible:E}),e.jsx(ae,{label:"Seguro de invalidez por acidente recomendado",value:t.capitalInvalidez,sub:t.capitalInvalidez>0?"Cobre sua própria renda e a de quem depende de você":void 0,delay:80,visible:E})]}),Q&&e.jsxs("div",{className:"vt-callout",style:{marginTop:"1rem"},children:[e.jsx(Z,{size:16}),e.jsx("p",{children:"Você não indicou nenhum adulto ou criança que dependa da sua renda. O seguro de vida acima considera só dívidas e gastos adicionais — se ninguém depende de você, pode não ser necessário contratá-lo. O seguro de invalidez continua relevante, já que cobre sua própria renda em caso de acidente."})]}),t.capitalVida===0&&!Q&&e.jsx("div",{className:"vt-info",style:{marginTop:"1rem"},children:"Com base nos valores informados, seus bens e investimentos já cobrem as necessidades de quem depende de você. Reavalie se realmente precisa de um seguro de vida agora."}),t.capitalVida>0&&e.jsxs("p",{className:"vt-conclusion",children:["Com base nas suas respostas, você precisaria de um"," ",e.jsxs("strong",{children:["seguro de vida de R$ ",m(t.capitalVida)]})," para substituir R$ ",m(t.despesasDependentes)," em despesas mensais de quem depende de você",t.dividas>=1&&t.bens>=1&&e.jsxs(e.Fragment,{children:[", levando em consideração que você tem dívidas de R$"," ",m(t.dividas)," e patrimônio de R$ ",m(t.bens)]}),t.dividas>=1&&t.bens<1&&e.jsxs(e.Fragment,{children:[", levando em consideração que você tem dívidas de R$ ",m(t.dividas)]}),t.dividas<1&&t.bens>=1&&e.jsxs(e.Fragment,{children:[", levando em consideração que você tem patrimônio de R$ ",m(t.bens)]}),"."]}),t.capitalInvalidez>0&&e.jsxs("p",{className:"vt-conclusion",children:["Para o seguro de invalidez por acidente, o valor do seguro necessário é de R$"," ",m(t.capitalInvalidez)," para substituir as suas próprias despesas e dos seus dependentes — cada uma pelo prazo escolhido",t.dividas>=1&&t.bens>=1&&e.jsxs(e.Fragment,{children:[" ","— cobrindo R$ ",m(t.dividas)," em dívidas e gastos adicionais e considerando R$ ",m(t.bens)," em bens e investimentos que sua família já possui"]}),t.dividas>=1&&t.bens<1&&e.jsxs(e.Fragment,{children:[" — cobrindo R$ ",m(t.dividas)," em dívidas e gastos adicionais"]}),t.dividas<1&&t.bens>=1&&e.jsxs(e.Fragment,{children:[" ","— considerando R$ ",m(t.bens)," em bens e investimentos que sua família já possui"]}),"."]})]}),e.jsx("div",{style:{marginTop:"1.5rem"},children:e.jsxs("button",{type:"button",className:"vt-btn vt-btn-secondary",onClick:ne,children:[e.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",style:{transform:"rotate(180deg)"},children:[e.jsx("line",{x1:"5",y1:"12",x2:"19",y2:"12"}),e.jsx("polyline",{points:"12 5 19 12 12 19"})]}),"Editar respostas"]})})]})]})}function ze(){return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
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
        .vt-hero h1 { font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 900; line-height: 1.1; letter-spacing: -0.02em; color: #fff; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }
        .vt-hero h1 span { color: var(--vt-light); }
        .vt-hero p { color: #a3b8ac; font-size: 1.1rem; font-weight: 300; max-width: 36rem; }
        .vt-hero-blob { position: absolute; right: -4rem; top: -4rem; width: 28rem; height: 28rem; opacity: 0.06; pointer-events: none; }

        /* Layout */
        .vt-main { max-width: 80rem; margin: 0 auto; padding: 3rem 1.5rem; display: grid; gap: 3rem; }
        @media (min-width: 768px) { .vt-main { padding: 3rem 5rem; } }
        @media (min-width: 1024px) { .vt-main { grid-template-columns: 1fr 340px; } }

        .vt-section-heading { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem; }
        .vt-section-heading h2 { font-size: 1.8rem; font-weight: 800; color: var(--vt-darker); display: flex; align-items: center; gap: 0.6rem; }
        .vt-section-heading h2 svg { color: var(--vt-dark); flex-shrink: 0; }
        .vt-section-heading p { color: #607060; font-size: 1rem; font-weight: 400; }

        /* Card */
        .vt-card { background: #fff; border-radius: 1rem; border: 1px solid #e2e8e2; padding: 2rem; box-shadow: 0 1px 3px rgba(26,69,55,0.06); }

        /* Step indicator */
        .vt-steps { display: flex; align-items: flex-start; margin-bottom: 2rem; }
        .vt-step { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; flex: 1; }
        .vt-step-row { display: flex; align-items: center; width: 100%; }
        .vt-step-circle {
          width: 2rem; height: 2rem; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.85rem; font-weight: 700; background: #f0f4f1; color: #9ab8a0;
          border: 2px solid #e2e8e2; transition: background 0.2s, border-color 0.2s, color 0.2s;
        }
        .vt-step-circle--active { background: var(--vt-dark); border-color: var(--vt-dark); color: #fff; }
        .vt-step-circle--done { background: #e6f7ee; border-color: var(--vt-dark); color: var(--vt-dark); }
        .vt-step-line { flex: 1; height: 2px; background: #e2e8e2; margin: 0 0.35rem; transition: background 0.2s; }
        .vt-step-line.done { background: var(--vt-dark); }
        .vt-step-label { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.03em; color: #9ab8a0; text-align: center; }
        .vt-step-label.active { color: var(--vt-darker); }
        @media (max-width: 480px) { .vt-step-label { display: none; } }

        .vt-step-panel { animation: vtStepIn 0.25s ease; }
        @keyframes vtStepIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .vt-step-title { font-size: 1.25rem; font-weight: 800; color: var(--vt-darker); margin-bottom: 0.4rem; }
        .vt-step-intro { color: #607060; font-size: 0.9rem; margin-bottom: 1.25rem; line-height: 1.6; }

        /* Two-column form layout */
        .vt-two-col { display: grid; grid-template-columns: 1fr; gap: 1.25rem; align-items: start; }
        @media (min-width: 640px) {
          .vt-two-col { grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        }
        .vt-field { display: flex; flex-direction: column; gap: 0.45rem; }
        .vt-label { font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--vt-dark); line-height: 1.3; }
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

        /* Quantity stepper */
        .vt-stepper {
          display: flex; align-items: center; gap: 1rem;
          background: #f7f9f7; border: 1.5px solid #d0dbd2; border-radius: 0.6rem;
          padding: 0.5rem 1rem; width: fit-content;
        }
        .vt-stepper-btn {
          width: 2rem; height: 2rem; border-radius: 50%; border: none;
          background: var(--vt-dark); color: #fff; font-size: 1.1rem; font-weight: 700;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: background 0.15s, transform 0.1s;
        }
        .vt-stepper-btn:hover { background: #16382c; }
        .vt-stepper-btn:active { transform: scale(0.92); }
        .vt-stepper-value { font-size: 1.15rem; font-weight: 800; color: var(--vt-darker); min-width: 1.5rem; text-align: center; }

        /* Linha de renda — "Suas despesas" e a tabela de dependentes */
        .vt-renda-linha {
          background: #fff; border: 1px solid #e2e8e2; border-radius: 0.75rem;
          padding: 1.1rem 1.25rem; margin-bottom: 1rem;
        }
        .vt-renda-linha-title {
          font-size: 0.75rem; font-weight: 800; text-transform: uppercase;
          letter-spacing: 0.04em; color: var(--vt-dark); margin-bottom: 0.85rem;
        }

        /* Tabela de dependentes — rótulos das colunas aparecem uma única vez;
           as colunas encolhem/crescem conforme o espaço disponível. */
        .vt-renda-header, .vt-renda-row {
          display: grid; grid-template-columns: minmax(64px, 100px) minmax(0, 1fr) minmax(0, 1fr);
          gap: 0.6rem 0.85rem; align-items: start;
        }
        .vt-renda-header {
          padding-bottom: 0.85rem; margin-bottom: 0.85rem; border-bottom: 1px solid #e2e8e2;
        }
        .vt-renda-row + .vt-renda-row {
          margin-top: 0.85rem; padding-top: 0.85rem; border-top: 1px solid #eef2ee;
        }
        .vt-renda-row-label { font-size: 0.85rem; font-weight: 800; color: var(--vt-darker); padding-top: 0.95rem; }
        /* Colunas ficam muito estreitas para o valor/select num celular — empilha
           e esconde o cabeçalho compartilhado, que não caberia legível ali. */
        @media (max-width: 640px) {
          .vt-renda-header { display: none; }
          .vt-renda-row { grid-template-columns: 1fr; gap: 0.5rem; }
          .vt-renda-row-label { padding-top: 0; }
        }

        /* Select (prazo de reposição) */
        .vt-select {
          width: 100%; padding: 0.9rem 1rem; border-radius: 0.6rem;
          border: 1.5px solid #d0dbd2; background: #f7f9f7;
          font-family: 'Work Sans', sans-serif; font-size: 0.95rem; font-weight: 600; color: var(--vt-darker);
          outline: none; cursor: pointer; transition: border-color 0.2s, box-shadow 0.2s;
        }
        .vt-select:focus { border-color: var(--vt-dark); box-shadow: 0 0 0 3px rgba(26,69,55,0.12); }

        /* Callout */
        .vt-callout {
          background: #fffdf5; border: 1px solid #fde68a; border-radius: 0.75rem;
          padding: 0.9rem 1.1rem; display: flex; gap: 0.6rem; align-items: flex-start;
          font-size: 0.85rem; color: #92400e; line-height: 1.6; margin-bottom: 1.25rem;
        }
        .vt-callout svg { color: #d97706; flex-shrink: 0; margin-top: 1px; }

        /* Wizard navigation */
        .vt-wizard-actions { display: flex; gap: 0.75rem; margin-top: 2rem; }
        .vt-wizard-actions .vt-btn { margin-top: 0; width: auto; }

        /* Avaliação da ferramenta */
        .vt-stars { display: flex; gap: 0.4rem; margin-bottom: 1.25rem; }
        .vt-star-btn {
          background: none; border: none; padding: 0; cursor: pointer; line-height: 0;
          transition: transform 0.1s;
        }
        .vt-star-btn:hover { transform: scale(1.12); }
        .vt-textarea {
          width: 100%; padding: 0.9rem 1rem; border-radius: 0.6rem; resize: vertical;
          border: 1.5px solid #d0dbd2; background: #f7f9f7; min-height: 5rem;
          font-family: 'Work Sans', sans-serif; font-size: 0.9rem; color: var(--vt-darker);
          outline: none; transition: border-color 0.2s, box-shadow 0.2s; margin-bottom: 1.25rem;
        }
        .vt-textarea:focus { border-color: var(--vt-dark); box-shadow: 0 0 0 3px rgba(26,69,55,0.12); }

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
        .vt-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .vt-btn:disabled:hover { background: var(--vt-dark); transform: none; }
        .vt-btn:disabled:hover svg { transform: none; }
        .vt-btn-flex { flex: 1; }
        .vt-btn-secondary { background: #fff; color: var(--vt-darker); border: 1.5px solid #d0dbd2; flex: 0 0 auto; }
        .vt-btn-secondary:hover { background: #f7f9f7; border-color: var(--vt-dark); color: var(--vt-dark); transform: none; }
        .vt-btn-secondary svg { color: var(--vt-darker); }
        .vt-btn-secondary:hover svg { transform: none; }

        /* Result cards */
        .vt-results-grid { display: grid; gap: 0.75rem; margin-top: 0.75rem; }
        @media (min-width: 640px) { .vt-results-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 640px) { .vt-results-grid--pair { grid-template-columns: 1fr 1fr; } }

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

        .vt-info {
          padding: 0.9rem 1.25rem;
          background: rgba(29,175,102,0.08); border-radius: 0.9rem;
          font-size: 0.85rem; font-weight: 500; color: #0e6b3a;
        }
        .vt-conclusion { margin-top: 1.25rem; font-size: 0.95rem; color: #3f5647; line-height: 1.7; }
        .vt-conclusion strong { color: var(--vt-darker); }
      `}),e.jsxs("div",{className:"vt-root",children:[e.jsxs("section",{className:"vt-hero",children:[e.jsxs("div",{className:"vt-hero-inner",children:[e.jsxs("nav",{className:"vt-breadcrumb",children:[e.jsx("a",{href:"#/",children:"Home"}),e.jsx("span",{children:"/"}),e.jsx("a",{href:"#/seguros",children:"Seguros"}),e.jsx("span",{children:"/"}),e.jsx("span",{style:{color:"#d9d4c4"},children:"Calculadora"})]}),e.jsxs("h1",{children:[e.jsx(_,{size:36,style:{color:"#1daf66"}}),"Quanto de ",e.jsx("span",{children:"seguro de vida"})," você precisa?"]}),e.jsx("p",{children:"Responda 4 perguntas rápidas sobre quem depende de você, sua renda, suas dívidas e seus bens, e descubra o capital segurado ideal para proteger sua família."}),e.jsx(H,{title:"Calculadora de Seguro de Vida | Orienta",style:{marginTop:"20px"}})]}),e.jsx("svg",{className:"vt-hero-blob",viewBox:"0 0 200 200",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M44.7,-76.4C58.3,-69.2,70.1,-57.4,77.6,-43.3C85.2,-29.2,88.5,-12.8,87.3,3.3C86.1,19.4,80.4,35.2,70.9,48.2C61.3,61.2,47.9,71.4,33.1,77.4C18.3,83.4,2.2,85.1,-13.7,81.9C-29.5,78.7,-45.1,70.5,-57.8,59.3C-70.5,48.1,-80.4,33.9,-84.6,18.5C-88.7,3,-87.1,-13.7,-80.3,-28.4C-73.6,-43.1,-61.7,-55.8,-48.2,-63C-34.7,-70.2,-19.5,-71.9,-2.4,-67.7C14.7,-63.5,29.3,-53.4,44.7,-76.4Z",fill:"#abccb5",transform:"translate(100 100)"})})]}),e.jsxs("main",{className:"vt-main",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"vt-section-heading",children:[e.jsxs("h2",{children:[e.jsx(_,{size:26}),"Assistente de necessidade de seguro de vida"]}),e.jsx("p",{children:"Um passo de cada vez — leva menos de dois minutos."})]}),e.jsx(Ne,{}),e.jsxs("div",{style:{marginTop:"24px",paddingTop:"20px",borderTop:"1px solid #e2e8e2"},children:[e.jsx("p",{style:{fontSize:"13px",fontWeight:700,color:"#1A2E35",marginBottom:"8px"},children:"Compartilhe esta calculadora"}),e.jsx(H,{title:"Calculadora de Seguro de Vida | Orienta",label:""})]})]}),e.jsx(he,{promo:{image:"https://lh3.googleusercontent.com/aida-public/AB6AXuBiIAZZ1_Gx_i7qJnBZuqdTW1gDH3BRnNYO_BEfyALedW6hdQWTMrCxvimHAEd8ExDNnqlKeuvR-2F8QjxPY9Dqa6TRS04rbJ4IHfWuEKjtYGv7TfDybTd72owjQcX4oPr4yCEaVGqfCSdYjZuiJMMUjzND-N92XHg60Wl0AW6pVWYbkVseir6LsmR7lMTIUZUghLYar5-r4fWxk-6_SdT0ZodH-4-NK0c10UUt2AWOvWW4ONhyInd5nJ0-mswYeBWEQUOaxjfpSaAH",imageAlt:"Pessoa revisando documentos de seguro",badge:"Aprenda mais",title:"O que é um seguro?",description:"Entenda o conceito antes de contratar qualquer apólice.",href:"#/seguros/conteudos"},resources:[{icon:"article",title:"O que é um seguro?",desc:"Entenda o conceito antes de contratar.",href:"#/seguros/conteudos"},{icon:"calc",title:"Calculadora do Milhão",desc:"Quanto tempo até seu primeiro milhão.",href:"#/planejamento/calculadoras/milhao"},{icon:"calc",title:"Calculadora de Aposentadoria",desc:"Quanto guardar todo mês.",href:"#/planejamento/calculadoras/aposentadoria"},{icon:"bank",title:"Comparador de Renda Fixa",desc:"Calcule qual melhor produto.",href:"#/investimentos/renda-fixa/comparador"}]})]})]})]})}export{Ne as AssistenteSeguroVida,ze as default};
