import{c as X,r as v,j as e,a as Z,S as J,C as Q,O as K}from"./index-st3SInv_.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ee=X("TriangleAlert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]),O=1621,I=8475.55,W=81e3/12,ae=86.05,te=.28,re=[{ate:1621,aliquota:.075},{ate:2902.84,aliquota:.09},{ate:4354.27,aliquota:.12},{ate:I,aliquota:.14}],S=[{ate:2428.8,aliquota:0,deducao:0},{ate:2826.65,aliquota:.075,deducao:182.16},{ate:3751.05,aliquota:.15,deducao:394.16},{ate:4664.68,aliquota:.225,deducao:675.49},{ate:1/0,aliquota:.275,deducao:908.73}],oe=607.2,se={simples_iii:[{ate:18e4,aliquota:.06,deducao:0},{ate:36e4,aliquota:.112,deducao:9360},{ate:72e4,aliquota:.135,deducao:17640},{ate:18e5,aliquota:.16,deducao:35640},{ate:36e5,aliquota:.21,deducao:125640},{ate:1/0,aliquota:.33,deducao:648e3}],simples_v:[{ate:18e4,aliquota:.155,deducao:0},{ate:36e4,aliquota:.18,deducao:4500},{ate:72e4,aliquota:.195,deducao:9900},{ate:18e5,aliquota:.205,deducao:17100},{ate:36e5,aliquota:.23,deducao:62100},{ate:1/0,aliquota:.305,deducao:54e4}]},B=a=>{const r=Math.min(Math.max(a,0),I);let o=0,i=0;for(const s of re){if(r<=i)break;o+=(Math.min(r,s.ate)-i)*s.aliquota,i=s.ate}return o},T=(a,r)=>{if(a<=5e3)return 0;const o=a-Math.max(r,oe),i=S.find(c=>o<=c.ate)??S[S.length-1],s=Math.max(0,o*i.aliquota-i.deducao),m=a>=7350?0:Math.max(0,978.62-.133145*a);return Math.max(0,s-m)},q=a=>{const r=B(a);return a-r-T(a,r)},L=(a,r)=>{const o=B(a),i=T(a,o),s=a-o-i,m=q(a),c=q(a*(4/3))-q(a),u=(m+c)/12,p=.08*(a*13+a/3)/12;return{salarioBruto:a,inss:o,irrf:i,salarioLiquido:s,decimoFeriasMensal:u,fgtsMensal:p,beneficiosMensal:r,pacoteMensal:s+u+p+r}},le=(a,r)=>{if(a<=0)return 0;const o=se[r],i=o.find(s=>a<=s.ate)??o[o.length-1];return Math.max(0,(a*i.aliquota-i.deducao)/a)},F=(a,r)=>{const o=r.semFeriasRemuneradas?11:12,i=a*o,s=i/12,m=a-s;let c=0,u=0,p=0,x=0,f=0;if(r.regime==="mei")c=ae,u=s>0?c/s:0;else{u=le(i,r.regime),c=s*u;const M=r.regime==="simples_iii"?Math.max(O,te*s):O;p=Math.min(M,s),x=.11*Math.min(p,I),f=T(p,x)}return{faturamentoMensal:a,feriasSemReceita:m,imposto:c,aliquotaEfetiva:u,contador:r.contadorMensal,proLabore:p,inssProLabore:x,irrfProLabore:f,rendaLiquidaMensal:s-c-r.contadorMensal-x-f}},V=(a,r)=>{let o=0,i=Math.max(r*4,1e4);for(let s=0;s<80;s++){const m=(o+i)/2;a(m)<r?o=m:i=m}return(o+i)/2},ie=(a,r)=>V(o=>F(o,r).rendaLiquidaMensal,a),ne=(a,r)=>V(o=>L(o,r).pacoteMensal,a),N=a=>parseFloat(a.replace(/\./g,"").replace(",","."))||0,d=a=>a.toLocaleString("pt-BR",{minimumFractionDigits:2,maximumFractionDigits:2}),R=a=>{const r=a.replace(/\D/g,"");return r?(parseInt(r,10)/100).toLocaleString("pt-BR",{minimumFractionDigits:2}):""},w={simples_iii:"Simples Nacional — Anexo III",simples_v:"Simples Nacional — Anexo V",mei:"MEI"},D=[{key:"alimentacao",label:"Vale refeição / alimentação",placeholder:"Ex: 800,00"},{key:"saude",label:"Plano de saúde",placeholder:"Ex: 600,00"},{key:"vida",label:"Seguro de vida",placeholder:"Ex: 60,00"},{key:"outros",label:"Outros benefícios",placeholder:"Ex: 300,00"}],n=({label:a,valor:r,tipo:o})=>e.jsxs("div",{className:`vt-row${o==="total"?" vt-row--total":""}`,children:[e.jsx("span",{children:a}),e.jsxs("span",{className:o==="menos"?"vt-neg":void 0,children:[o==="menos"?"− ":o==="mais"?"+ ":"","R$ ",d(Math.abs(r))]})]});function de(){const[a,r]=v.useState("clt_para_pj"),[o,i]=v.useState(""),[s,m]=v.useState("simples_iii"),[c,u]=v.useState("200,00"),[p,x]=v.useState(!0),[f,M]=v.useState({alimentacao:!1,saude:!1,vida:!1,outros:!1}),[_,Y]=v.useState({alimentacao:"",saude:"",vida:"",outros:""}),[t,U]=v.useState(null),[E,P]=v.useState(!1),A=v.useRef(null),z=N(o)>0,G=()=>{if(!z)return;const l=N(o),h=D.reduce((k,$)=>k+(f[$.key]?N(_[$.key]):0),0),g={regime:s,contadorMensal:N(c),semFeriasRemuneradas:p};let b,j;a==="clt_para_pj"?(b=L(l,h),j=F(ie(b.pacoteMensal,g),g)):(j=F(l,g),b=L(ne(j.rendaLiquidaMensal,h),h)),U({direcao:a,regime:s,clt:b,pj:j,beneficiosMensal:h}),P(!1),setTimeout(()=>P(!0),50),window.innerWidth<768&&setTimeout(()=>{var k;return(k=A.current)==null?void 0:k.scrollIntoView({behavior:"smooth",block:"start"})},150)},y=l=>({opacity:E?1:0,transform:E?"translateY(0)":"translateY(12px)",transition:`opacity 0.45s ease ${l}ms, transform 0.45s ease ${l}ms`}),H=t!==null&&t.regime==="mei"&&t.pj.faturamentoMensal>W,C=t&&t.clt.salarioBruto>0?(t.pj.faturamentoMensal/t.clt.salarioBruto-1)*100:0;return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
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

        .vt-two-col { display: grid; grid-template-columns: 1fr; gap: 1.25rem; align-items: start; margin-top: 1.25rem; }
        @media (min-width: 640px) {
          .vt-two-col { grid-template-columns: 1fr 1fr; gap: 1.5rem; }
          .vt-two-col .vt-label { min-height: 2.1em; }
        }
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

        .vt-toggle { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; }
        .vt-toggle button {
          padding: 0.85rem 0.75rem; border-radius: 0.6rem; border: 1.5px solid #d0dbd2; background: #f7f9f7;
          font-family: 'Work Sans', sans-serif; font-size: 0.9rem; font-weight: 700; color: #607060;
          cursor: pointer; transition: all 0.2s; line-height: 1.3;
        }
        .vt-toggle button:hover { border-color: var(--vt-dark); }
        .vt-toggle button.active { background: var(--vt-darker); border-color: var(--vt-darker); color: #fff; }

        .vt-benefits { margin-top: 1.5rem; padding-top: 1.25rem; border-top: 1px solid #e2e8e2; }
        .vt-benefit { display: grid; grid-template-columns: 1fr; gap: 0.6rem; padding: 0.7rem 0; }
        @media (min-width: 640px) { .vt-benefit { grid-template-columns: 1fr 1fr; align-items: center; gap: 1.5rem; } }
        .vt-check { display: flex; align-items: center; gap: 0.6rem; font-size: 0.92rem; font-weight: 600; color: var(--vt-darker); cursor: pointer; }
        .vt-check input { width: 1.1rem; height: 1.1rem; accent-color: var(--vt-dark); cursor: pointer; flex-shrink: 0; }

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
        .vt-callout svg { color: #d97706; flex-shrink: 0; margin-top: 2px; }

        .result-card { border-radius: 0.9rem; padding: 1.25rem 1.5rem; margin-top: 0.75rem; }
        .result-card--tone-gold { background: rgb(255, 206, 116); }
        .result-label { font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.07em; margin-bottom: 0.35rem; color: var(--vt-darker); }
        .result-value { font-size: 1.75rem; font-weight: 900; color: var(--vt-darker); }
        .result-sub { font-size: 0.82rem; font-weight: 500; color: #5c4a1f; margin-top: 0.25rem; line-height: 1.5; }

        .vt-compare { display: grid; grid-template-columns: 1fr; gap: 0.75rem; margin-top: 0.75rem; }
        @media (min-width: 640px) { .vt-compare { grid-template-columns: 1fr 1fr; } }
        .vt-col { background: #f8faf8; border: 1px solid #e2e8e2; border-radius: 0.9rem; padding: 1.25rem 1.5rem; }
        .vt-col--dark { background: linear-gradient(135deg, #1A2E35 0%, #22443a 100%); border-color: transparent; box-shadow: 0 4px 16px rgba(26,69,55,0.18); }
        .vt-col-title { font-size: 1.1rem; font-weight: 900; color: var(--vt-darker); margin-bottom: 0.5rem; }
        .vt-col-sub { font-size: 0.75rem; font-weight: 500; color: #607060; margin-bottom: 0.5rem; }
        .vt-col--dark .vt-col-title { color: #fff; }
        .vt-col--dark .vt-col-sub { color: #a3b8ac; }
        .vt-row { display: flex; justify-content: space-between; gap: 1rem; padding: 0.5rem 0; font-size: 0.88rem; font-weight: 500; color: #3f5647; border-top: 1px solid #e2e8e2; }
        .vt-row:first-of-type { border-top: none; }
        .vt-row span:last-child { font-weight: 700; white-space: nowrap; color: var(--vt-darker); }
        .vt-row .vt-neg { color: #b42318; }
        .vt-row--total { margin-top: 0.25rem; border-top: 2px solid #d0dbd2; font-size: 0.95rem; }
        .vt-row--total span:first-child { font-weight: 800; color: var(--vt-darker); }
        .vt-row--total span:last-child { font-weight: 900; font-size: 1rem; }
        .vt-col--dark .vt-row { color: #cfe3d6; border-color: rgba(255,255,255,0.14); }
        .vt-col--dark .vt-row span:last-child, .vt-col--dark .vt-row--total span:first-child { color: #fff; }
        .vt-col--dark .vt-row .vt-neg { color: #fda29b; }
        .vt-col--dark .vt-row--total { border-color: rgba(255,255,255,0.3); }

        .vt-conclusion { margin-top: 1.25rem; font-size: 0.95rem; color: #3f5647; line-height: 1.7; }
        .vt-conclusion strong { color: var(--vt-darker); }
      `}),e.jsxs("div",{className:"vt-root",children:[e.jsxs("section",{className:"vt-hero",children:[e.jsxs("div",{className:"vt-hero-inner",children:[e.jsxs("nav",{className:"vt-breadcrumb",children:[e.jsx("a",{href:"#/",children:"Home"}),e.jsx("span",{children:"/"}),e.jsx("a",{href:"#/planejamento/despesas",children:"Ferramentas"}),e.jsx("span",{children:"/"}),e.jsx("span",{style:{color:"#d9d4c4"},children:"CLT x PJ"})]}),e.jsxs("h1",{children:[e.jsx(Z,{size:36,style:{color:"#1daf66"}}),e.jsx("span",{children:"CLT"})," ou ",e.jsx("span",{children:"PJ"}),": quanto cobrar?"]}),e.jsx("p",{children:"Informe o valor de uma proposta e descubra quanto a outra modalidade precisa pagar para você ganhar o mesmo — já contando impostos, 13º, férias, FGTS e benefícios."}),e.jsx(J,{title:"Calculadora CLT x PJ | Orienta",style:{marginTop:"20px"}})]}),e.jsx("svg",{className:"vt-hero-blob",viewBox:"0 0 200 200",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M44.7,-76.4C58.3,-69.2,70.1,-57.4,77.6,-43.3C85.2,-29.2,88.5,-12.8,87.3,3.3C86.1,19.4,80.4,35.2,70.9,48.2C61.3,61.2,47.9,71.4,33.1,77.4C18.3,83.4,2.2,85.1,-13.7,81.9C-29.5,78.7,-45.1,70.5,-57.8,59.3C-70.5,48.1,-80.4,33.9,-84.6,18.5C-88.7,3,-87.1,-13.7,-80.3,-28.4C-73.6,-43.1,-61.7,-55.8,-48.2,-63C-34.7,-70.2,-19.5,-71.9,-2.4,-67.7C14.7,-63.5,29.3,-53.4,44.7,-76.4Z",fill:"#abccb5",transform:"translate(100 100)"})})]}),e.jsxs("main",{className:"vt-main",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"vt-section-heading",children:[e.jsx("h2",{children:"Compare uma proposta CLT com uma PJ"}),e.jsx("p",{children:"Escolha de qual lado você tem a proposta e informe o valor."})]}),e.jsxs("div",{className:"vt-card",children:[e.jsxs("div",{className:"vt-field",children:[e.jsx("label",{className:"vt-label",children:"Eu tenho uma proposta…"}),e.jsxs("div",{className:"vt-toggle",children:[e.jsx("button",{type:"button",className:a==="clt_para_pj"?"active":"",onClick:()=>r("clt_para_pj"),children:"CLT — quanto devo cobrar como PJ?"}),e.jsx("button",{type:"button",className:a==="pj_para_clt"?"active":"",onClick:()=>r("pj_para_clt"),children:"PJ — qual salário CLT equivale?"})]})]}),e.jsxs("div",{className:"vt-two-col",children:[e.jsxs("div",{className:"vt-field",children:[e.jsx("label",{className:"vt-label",children:a==="clt_para_pj"?"Salário bruto CLT (mensal)":"Valor mensal da nota fiscal PJ"}),e.jsxs("div",{className:"vt-input-wrap",children:[e.jsx("span",{className:"vt-prefix",children:"R$"}),e.jsx("input",{className:"vt-input has-prefix",placeholder:"Ex: 8.000,00",inputMode:"numeric",value:o,onChange:l=>i(R(l.target.value))})]})]}),e.jsxs("div",{className:"vt-field",children:[e.jsx("label",{className:"vt-label",children:"Regime da sua empresa PJ"}),e.jsxs("select",{className:"vt-select",value:s,onChange:l=>m(l.target.value),children:[e.jsx("option",{value:"simples_iii",children:w.simples_iii}),e.jsx("option",{value:"simples_v",children:w.simples_v}),e.jsx("option",{value:"mei",children:w.mei})]})]})]}),e.jsxs("div",{className:"vt-two-col",children:[e.jsxs("div",{className:"vt-field",children:[e.jsx("label",{className:"vt-label",children:"Custo mensal do contador"}),e.jsxs("div",{className:"vt-input-wrap",children:[e.jsx("span",{className:"vt-prefix",children:"R$"}),e.jsx("input",{className:"vt-input has-prefix",placeholder:"Ex: 200,00",inputMode:"numeric",value:c,onChange:l=>u(R(l.target.value))})]})]}),e.jsxs("div",{className:"vt-field",children:[e.jsx("label",{className:"vt-label",children:"Férias"}),e.jsxs("label",{className:"vt-check",children:[e.jsx("input",{type:"checkbox",checked:p,onChange:l=>x(l.target.checked)}),"Não recebo nos 30 dias de férias"]}),e.jsx("span",{className:"vt-hint",children:"Na PJ, mês parado é mês sem nota fiscal."})]})]}),e.jsxs("div",{className:"vt-benefits",children:[e.jsx("label",{className:"vt-label",children:"Benefícios que você quer manter (opcional)"}),e.jsx("p",{className:"vt-hint",style:{marginTop:"0.35rem"},children:"Na CLT a empresa paga. Na PJ, quem paga é você — então o valor entra na conta."}),D.map(l=>e.jsxs("div",{className:"vt-benefit",children:[e.jsxs("label",{className:"vt-check",children:[e.jsx("input",{type:"checkbox",checked:f[l.key],onChange:h=>M(g=>({...g,[l.key]:h.target.checked}))}),l.label]}),f[l.key]&&e.jsxs("div",{className:"vt-input-wrap",children:[e.jsx("span",{className:"vt-prefix",children:"R$"}),e.jsx("input",{className:"vt-input has-prefix",placeholder:l.placeholder,inputMode:"numeric","aria-label":`${l.label} (valor mensal)`,value:_[l.key],onChange:h=>Y(g=>({...g,[l.key]:R(h.target.value)}))})]})]},l.key))]}),e.jsxs("button",{type:"button",className:"vt-btn",disabled:!z,onClick:G,children:["Comparar",e.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("line",{x1:"5",y1:"12",x2:"19",y2:"12"}),e.jsx("polyline",{points:"12 5 19 12 12 19"})]})]}),t&&e.jsxs("div",{ref:A,style:{borderTop:"1px solid #e2e8e2",marginTop:"1.75rem",paddingTop:"1.25rem"},children:[e.jsx("div",{className:"result-card result-card--tone-gold",style:y(0),children:t.direcao==="clt_para_pj"?e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"result-label",children:"Para ganhar o mesmo, cobre como PJ"}),e.jsxs("p",{className:"result-value",children:["R$ ",d(t.pj.faturamentoMensal)," /mês"]}),e.jsxs("p",{className:"result-sub",children:[C>=0?`${C.toFixed(0)}% a mais`:`${Math.abs(C).toFixed(0)}% a menos`," que o salário CLT de R$ ",d(t.clt.salarioBruto),"."]})]}):e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"result-label",children:"Salário CLT equivalente"}),e.jsxs("p",{className:"result-value",children:["R$ ",d(t.clt.salarioBruto)," /mês"]}),e.jsxs("p",{className:"result-sub",children:["Para você ficar no mesmo patamar de uma PJ de R$ ",d(t.pj.faturamentoMensal),"."]})]})}),H&&e.jsxs("div",{className:"vt-callout",children:[e.jsx(ee,{size:18}),e.jsxs("span",{children:["O MEI fatura no máximo R$ ",d(W)," por mês (R$ 81 mil por ano). Esse valor passa do limite — escolha o Simples Nacional."]})]}),e.jsxs("div",{className:"vt-compare",style:y(80),children:[e.jsxs("div",{className:"vt-col",children:[e.jsx("p",{className:"vt-col-title",children:"CLT"}),e.jsx("p",{className:"vt-col-sub",children:"Valores mensais, médios no ano"}),e.jsx(n,{label:"Salário bruto",valor:t.clt.salarioBruto}),e.jsx(n,{label:"INSS",valor:t.clt.inss,tipo:"menos"}),e.jsx(n,{label:"IRRF",valor:t.clt.irrf,tipo:"menos"}),e.jsx(n,{label:"13º e 1/3 de férias (líquidos)",valor:t.clt.decimoFeriasMensal,tipo:"mais"}),e.jsx(n,{label:"FGTS depositado pela empresa",valor:t.clt.fgtsMensal,tipo:"mais"}),t.beneficiosMensal>0&&e.jsx(n,{label:"Benefícios pagos pela empresa",valor:t.beneficiosMensal,tipo:"mais"}),e.jsx(n,{label:"Pacote total",valor:t.clt.pacoteMensal,tipo:"total"})]}),e.jsxs("div",{className:"vt-col vt-col--dark",children:[e.jsxs("p",{className:"vt-col-title",children:["PJ — ",w[t.regime]]}),e.jsx("p",{className:"vt-col-sub",children:"Valores mensais, médios no ano"}),e.jsx(n,{label:"Nota fiscal mensal",valor:t.pj.faturamentoMensal}),t.pj.feriasSemReceita>.005&&e.jsx(n,{label:"Férias sem receber",valor:t.pj.feriasSemReceita,tipo:"menos"}),e.jsx(n,{label:`${t.regime==="mei"?"Guia DAS do MEI":"DAS"} (${(t.pj.aliquotaEfetiva*100).toFixed(1).replace(".",",")}%)`,valor:t.pj.imposto,tipo:"menos"}),t.pj.contador>0&&e.jsx(n,{label:"Contador",valor:t.pj.contador,tipo:"menos"}),t.regime!=="mei"&&e.jsxs(e.Fragment,{children:[e.jsx(n,{label:"INSS do pró-labore",valor:t.pj.inssProLabore,tipo:"menos"}),t.pj.irrfProLabore>0&&e.jsx(n,{label:"IRRF do pró-labore",valor:t.pj.irrfProLabore,tipo:"menos"})]}),e.jsx(n,{label:"Renda líquida",valor:t.pj.rendaLiquidaMensal,tipo:"total"}),t.beneficiosMensal>0&&e.jsxs(e.Fragment,{children:[e.jsx(n,{label:"Benefícios que você paga",valor:t.beneficiosMensal,tipo:"menos"}),e.jsx(n,{label:"Sobra no bolso",valor:t.pj.rendaLiquidaMensal-t.beneficiosMensal,tipo:"total"})]})]})]}),e.jsxs("p",{className:"vt-conclusion",style:y(160),children:[t.direcao==="clt_para_pj"?e.jsxs(e.Fragment,{children:["Um CLT de ",e.jsxs("strong",{children:["R$ ",d(t.clt.salarioBruto)]})," entrega um pacote de ",e.jsxs("strong",{children:["R$ ",d(t.clt.pacoteMensal)]})," por mês. Como PJ, você precisa faturar ",e.jsxs("strong",{children:["R$ ",d(t.pj.faturamentoMensal)]})," para chegar no mesmo valor."]}):e.jsxs(e.Fragment,{children:["Uma PJ de ",e.jsxs("strong",{children:["R$ ",d(t.pj.faturamentoMensal)]})," rende"," ",e.jsxs("strong",{children:["R$ ",d(t.pj.rendaLiquidaMensal)]})," por mês depois dos custos. Para o mesmo pacote na CLT, a proposta precisa ser de"," ",e.jsxs("strong",{children:["R$ ",d(t.clt.salarioBruto)]})," de salário bruto."]})," ","É uma ",e.jsx("strong",{children:"estimativa"}),": não considera dependentes, vale-transporte, PLR, multa do FGTS em caso de demissão nem a estabilidade que só a CLT oferece."]})]})]}),e.jsxs("div",{style:{marginTop:"24px",paddingTop:"20px",borderTop:"1px solid #e2e8e2"},children:[e.jsx("p",{style:{fontSize:"13px",fontWeight:700,color:"#1A2E35",marginBottom:"8px"},children:"Compartilhe esta calculadora"}),e.jsx(J,{title:"Calculadora CLT x PJ | Orienta",label:""})]})]}),e.jsx(Q,{promo:{image:"https://lh3.googleusercontent.com/aida-public/AB6AXuBiIAZZ1_Gx_i7qJnBZuqdTW1gDH3BRnNYO_BEfyALedW6hdQWTMrCxvimHAEd8ExDNnqlKeuvR-2F8QjxPY9Dqa6TRS04rbJ4IHfWuEKjtYGv7TfDybTd72owjQcX4oPr4yCEaVGqfCSdYjZuiJMMUjzND-N92XHg60Wl0AW6pVWYbkVseir6LsmR7lMTIUZUghLYar5-r4fWxk-6_SdT0ZodH-4-NK0c10UUt2AWOvWW4ONhyInd5nJ0-mswYeBWEQUOaxjfpSaAH",imageAlt:"Pessoa revisando documentos de seguro",badge:"Vai virar PJ?",title:"Não esqueça do seguro de vida",description:"Sem empresa pagando, a proteção da sua família passa a ser sua conta.",href:"#/seguros/cotacao"},resources:[{icon:"calc",title:"Cotação de seguros",desc:"Quanto custa um seguro de vida.",href:"#/seguros/cotacao"},{icon:"calc",title:"Calculadora de Aposentadoria",desc:"Na PJ, a previdência é com você.",href:"#/planejamento/calculadoras/aposentadoria"},{icon:"article",title:"Controle de Despesas",desc:"Organize a renda variável.",href:"#/planejamento/despesas"}]})]}),e.jsx(K,{exclude:"/planejamento/calculadoras/clt-pj"})]})]})}export{de as default};
