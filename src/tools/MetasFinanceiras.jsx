const MetasFinanceiras = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-background-dark py-12 md:py-20 px-6 md:px-20 text-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <nav className="flex gap-2 mb-6 text-slate-400 text-sm font-medium">
            <a className="hover:text-primary" href="#">Home</a>
            <span>/</span>
            <a className="hover:text-primary" href="#">Ferramentas</a>
            <span>/</span>
            <span className="text-white">Calculadora</span>
          </nav>
          <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight mb-4">
            Calculadora de <span className="text-primary">Metas Financeiras</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl font-light">
            Planeje seu futuro com precisão. Defina seus objetivos e descubra o
            caminho exato para a sua liberdade financeira através de cálculos
            baseados em rendimentos reais.
          </p>
        </div>
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-10 pointer-events-none">
          <svg className="h-full w-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M44.7,-76.4C58.3,-69.2,70.1,-57.4,77.6,-43.3C85.2,-29.2,88.5,-12.8,87.3,3.3C86.1,19.4,80.4,35.2,70.9,48.2C61.3,61.2,47.9,71.4,33.1,77.4C18.3,83.4,2.2,85.1,-13.7,81.9C-29.5,78.7,-45.1,70.5,-57.8,59.3C-70.5,48.1,-80.4,33.9,-84.6,18.5C-88.7,3,-87.1,-13.7,-80.3,-28.4C-73.6,-43.1,-61.7,-55.8,-48.2,-63C-34.7,-70.2,-19.5,-71.9,-2.4,-67.7C14.7,-63.5,29.3,-53.4,44.7,-76.4Z"
              fill="#1daf66"
              transform="translate(100 100)"
            />
          </svg>
        </div>
      </section>
      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 md:px-20 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h2 className="text-slate-900 dark:text-white text-3xl font-bold leading-tight flex items-center gap-3">
              Quanto preciso poupar por mês?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Diga-nos quanto você quer guardar e quando quer atingir sua meta.
            </p>
          </div>
          <div className="bg-white dark:bg-card-dark p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold">Meta de Economia (R$)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">R$</span>
                  <input className="w-full pl-12 pr-4 py-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="Ex: 50.000,00" type="text" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold">Saldo Inicial (R$)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">R$</span>
                  <input className="w-full pl-12 pr-4 py-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="Ex: 5.000,00" type="text" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold">Prazo para Crescer</label>
                <div className="flex gap-2">
                  <input className="flex-1 px-4 py-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="Valor" type="number" />
                  <select className="w-1/3 px-4 py-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all">
                    <option>Anos</option>
                    <option>Meses</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold">Taxa de Juros Estimada (% ao ano)</label>
                <div className="relative">
                  <input className="w-full px-4 py-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="Ex: 10,5" type="text" />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">%</span>
                </div>
              </div>
            </div>
            <button className="bg-primary hover:bg-opacity-90 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all flex items-center justify-center gap-2 group">
              Calcular Meta
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 bg-white dark:bg-card-dark rounded-xl border-l-4 border-primary shadow-sm">
              <p className="text-sm text-slate-500 uppercase font-bold mb-1">Total a Poupar</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">R$ 0,00</p>
            </div>
            <div className="p-6 bg-white dark:bg-card-dark rounded-xl border-l-4 border-secondary shadow-sm">
              <p className="text-sm text-slate-500 uppercase font-bold mb-1">Parcela Mensal</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">R$ 0,00</p>
            </div>
            <div className="p-6 bg-white dark:bg-card-dark rounded-xl border-l-4 border-slate-400 shadow-sm">
              <p className="text-sm text-slate-500 uppercase font-bold mb-1">Juros Ganhos</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">R$ 0,00</p>
            </div>
          </div>
        </div>
        <aside className="lg:col-span-4 flex flex-col gap-8">
          <div className="relative rounded-xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent z-10" />
            <img className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" alt="Investimentos" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiIAZZ1_Gx_i7qJnBZuqdTW1gDH3BRnNYO_BEfyALedW6hdQWTMrCxvimHAEd8ExDNnqlKeuvR-2F8QjxPY9Dqa6TRS04rbJ4IHfWuEKjtYGv7TfDybTd72owjQcX4oPr4yCEaVGqfCSdYjZuiJMMUjzND-N92XHg60Wl0AW6pVWYbkVseir6LsmR7lMTIUZUghLYar5-r4fWxk-6_SdT0ZodH-4-NK0c10UUt2AWOvWW4ONhyInd5nJ0-mswYeBWEQUOaxjfpSaAH" />
            <div className="absolute bottom-0 left-0 p-6 z-20">
              <span className="bg-secondary text-white text-[10px] font-bold px-2 py-1 rounded uppercase mb-2 inline-block">Destaque</span>
              <h3 className="text-white text-xl font-bold mb-2">Guia de Investimentos 2024</h3>
              <p className="text-slate-300 text-sm mb-4">Descubra as melhores taxas para seu perfil.</p>
            </div>
          </div>
          <div className="bg-white dark:bg-card-dark p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-slate-900 dark:text-white text-xl font-bold mb-6">Recursos Úteis</h3>
            <ul className="flex flex-col gap-4">
              <li><a className="group flex items-start gap-3 text-slate-700 dark:text-slate-300 hover:text-primary transition-colors" href="#"><div><p className="font-medium text-sm">28 Formas de Economizar</p><p className="text-xs text-slate-500">Pequenas mudanças, grandes resultados.</p></div></a></li>
              <hr className="border-slate-100 dark:border-slate-700" />
              <li><a className="group flex items-start gap-3 text-slate-700 dark:text-slate-300 hover:text-primary transition-colors" href="#"><div><p className="font-medium text-sm">Controle de Gastos Mensais</p><p className="text-xs text-slate-500">Planilha gratuita para download.</p></div></a></li>
              <hr className="border-slate-100 dark:border-slate-700" />
              <li><a className="group flex items-start gap-3 text-slate-700 dark:text-slate-300 hover:text-primary transition-colors" href="#"><div><p className="font-medium text-sm">Renda Fixa vs Variável</p><p className="text-xs text-slate-500">Qual o melhor para sua meta?</p></div></a></li>
              <hr className="border-slate-100 dark:border-slate-700" />
              <li><a className="group flex items-start gap-3 text-slate-700 dark:text-slate-300 hover:text-primary transition-colors" href="#"><div><p className="font-medium text-sm">Calculadora de Juros Compostos</p><p className="text-xs text-slate-500">O poder do tempo ao seu favor.</p></div></a></li>
            </ul>
          </div>
        </aside>
      </main>

      {/* Blog Section */}
      <article className="max-w-4xl mx-auto px-6 md:px-20 pb-16 prose prose-lg dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground">
        <h2 className="text-3xl font-bold text-foreground mb-6">Por que poupar dinheiro?</h2>

        <p>
          Poupar dinheiro é um dos hábitos financeiros mais importantes para construir segurança e alcançar objetivos ao longo da vida. Ao reservar parte da renda regularmente, você cria uma proteção contra imprevistos — como despesas médicas, perda de renda ou reparos inesperados — e também forma recursos para projetos futuros, como comprar um imóvel, fazer uma viagem ou se aposentar com tranquilidade.
        </p>

        <p>
          Além da segurança, poupar permite aproveitar um dos conceitos mais poderosos das finanças: <strong>os juros compostos</strong>. Eles fazem com que o dinheiro guardado não cresça apenas pelas novas economias que você adiciona, mas também pelos rendimentos gerados ao longo do tempo. Em outras palavras, o dinheiro começa a trabalhar para você.
        </p>

        <p>
          Quanto mais cedo você começa a poupar e investir, maior tende a ser o crescimento do patrimônio, justamente porque os juros terão mais tempo para se acumular.
        </p>

        <h3 className="text-2xl font-bold text-foreground mt-10 mb-4">Como funciona o cálculo de crescimento da poupança</h3>

        <p>
          Quando você guarda dinheiro em uma aplicação que rende juros, o valor acumulado cresce ao longo do tempo. Esse crescimento depende principalmente de três fatores:
        </p>

        <ul>
          <li>Valor inicial guardado</li>
          <li>Valor das contribuições periódicas</li>
          <li>Taxa de juros</li>
          <li>Tempo que o dinheiro permanece aplicado</li>
        </ul>

        <p>
          O tipo mais comum de rendimento financeiro utiliza <strong>juros compostos</strong>, que significam que os juros de cada período são incorporados ao saldo e passam a gerar novos juros no futuro.
        </p>

        <h3 className="text-2xl font-bold text-foreground mt-10 mb-4">Exemplo simples</h3>

        <p>Imagine que você:</p>

        <ul>
          <li>Guarde R$ 1.000 inicialmente</li>
          <li>Deposite R$ 200 por mês</li>
          <li>Tenha um rendimento médio de 0,6% ao mês</li>
        </ul>

        <p>
          No primeiro mês, os juros incidem sobre o saldo inicial. Nos meses seguintes, os juros incidem sobre todo o valor acumulado, incluindo os rendimentos anteriores.
        </p>

        <p>
          Com o passar do tempo, o crescimento deixa de ser linear e passa a ser <strong>exponencial</strong>, pois os juros passam a incidir sobre um valor cada vez maior.
        </p>

        <h3 className="text-2xl font-bold text-foreground mt-10 mb-4">Fórmula básica dos juros compostos</h3>

        <p>
          Quando existe apenas um valor inicial investido, o cálculo pode ser representado pela fórmula:
        </p>

        <div className="bg-muted/50 border border-border rounded-lg p-6 my-6 text-center">
          <p className="text-lg font-semibold text-foreground mb-0">
            Valor futuro = Valor inicial × (1 + taxa de juros)<sup>t</sup>
          </p>
        </div>

        <p>Onde:</p>
        <ul>
          <li><strong>Valor inicial:</strong> quantia aplicada no começo</li>
          <li><strong>Taxa de juros:</strong> rendimento por período (mês ou ano)</li>
          <li><strong>t:</strong> número de períodos</li>
        </ul>

        <p>
          Quando existem depósitos mensais, o cálculo inclui também as contribuições periódicas, que passam a gerar juros ao longo do tempo.
        </p>

        <h3 className="text-2xl font-bold text-foreground mt-10 mb-4">O impacto do tempo</h3>

        <p>
          Um fator fundamental no crescimento da poupança é o <strong>tempo</strong>. Mesmo pequenas quantias podem se transformar em valores significativos quando investidas regularmente por muitos anos.
        </p>

        <p>Por exemplo:</p>
        <ul>
          <li>Quem começa a poupar cedo pode contribuir menos e ainda assim acumular mais.</li>
          <li>Quem começa mais tarde precisa guardar valores maiores para alcançar o mesmo resultado.</li>
        </ul>

        <p>
          Isso acontece porque os juros compostos precisam de tempo para exercer seu efeito completo.
        </p>

        <h3 className="text-2xl font-bold text-foreground mt-10 mb-4">Criando o hábito de poupar</h3>

        <p>Para transformar a poupança em um hábito, algumas estratégias simples podem ajudar:</p>

        <ul>
          <li>Definir um percentual da renda para guardar todos os meses</li>
          <li>Automatizar transferências para uma conta ou investimento</li>
          <li>Estabelecer objetivos claros, como uma reserva de emergência ou um projeto específico</li>
          <li>Evitar utilizar os recursos poupados para despesas não planejadas</li>
        </ul>

        <p>Poupar regularmente, mesmo que em valores modestos, pode gerar um impacto significativo no longo prazo.</p>

        <div className="bg-primary/10 border border-primary/30 rounded-lg p-6 mt-8">
          <p className="text-foreground font-semibold mb-0">
            ✅ Em resumo: poupar é uma forma de construir estabilidade financeira e aproveitar o poder dos juros compostos. Quanto mais consistente for o hábito e maior o tempo de investimento, maior tende a ser o crescimento do patrimônio.
          </p>
        </div>
      </article>
    </>
  );
};

export default MetasFinanceiras;