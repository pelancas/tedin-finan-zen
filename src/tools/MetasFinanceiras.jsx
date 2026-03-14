<>
  {/* Hero Section */}
  <section className="bg-background-dark py-12 md:py-20 px-6 md:px-20 text-white relative overflow-hidden">
    <div className="max-w-6xl mx-auto relative z-10">
      <nav className="flex gap-2 mb-6 text-slate-400 text-sm font-medium">
        <a className="hover:text-primary" href="#">
          Home
        </a>
        <span>/</span>
        <a className="hover:text-primary" href="#">
          Ferramentas
        </a>
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
    {/* Decorative background element */}
    <div className="absolute right-0 top-0 w-1/3 h-full opacity-10 pointer-events-none">
      <svg
        className="h-full w-full"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
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
    {/* Left Column: Calculator */}
    <div className="lg:col-span-8 flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h2 className="text-slate-900 dark:text-white text-3xl font-bold leading-tight flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-3xl">
            savings
          </span>
          Quanto preciso poupar por mês?
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-lg">
          Diga-nos quanto você quer guardar e quando quer atingir sua meta.
        </p>
      </div>
      <div className="bg-white dark:bg-card-dark p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input 1 */}
          <div className="flex flex-col gap-2">
            <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold">
              Meta de Economia (R$)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                R$
              </span>
              <input
                className="w-full pl-12 pr-4 py-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                placeholder="Ex: 50.000,00"
                type="text"
              />
            </div>
          </div>
          {/* Input 2 */}
          <div className="flex flex-col gap-2">
            <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold">
              Saldo Inicial (R$)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                R$
              </span>
              <input
                className="w-full pl-12 pr-4 py-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                placeholder="Ex: 5.000,00"
                type="text"
              />
            </div>
          </div>
          {/* Input 3 */}
          <div className="flex flex-col gap-2">
            <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold">
              Prazo para Crescer
            </label>
            <div className="flex gap-2">
              <input
                className="flex-1 px-4 py-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                placeholder="Valor"
                type="number"
              />
              <select className="w-1/3 px-4 py-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all">
                <option>Anos</option>
                <option>Meses</option>
              </select>
            </div>
          </div>
          {/* Input 4 */}
          <div className="flex flex-col gap-2">
            <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold">
              Taxa de Juros Estimada (% ao ano)
            </label>
            <div className="relative">
              <input
                className="w-full px-4 py-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                placeholder="Ex: 10,5"
                type="text"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                %
              </span>
            </div>
          </div>
        </div>
        <button className="bg-primary hover:bg-opacity-90 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all flex items-center justify-center gap-2 group">
          Calcular Meta
          <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </button>
      </div>
      {/* Visual Results Preview Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 bg-white dark:bg-card-dark rounded-xl border-l-4 border-primary shadow-sm">
          <p className="text-sm text-slate-500 uppercase font-bold mb-1">
            Total a Poupar
          </p>
          <p className="text-2xl font-black text-slate-900 dark:text-white">
            R$ 0,00
          </p>
        </div>
        <div className="p-6 bg-white dark:bg-card-dark rounded-xl border-l-4 border-secondary shadow-sm">
          <p className="text-sm text-slate-500 uppercase font-bold mb-1">
            Parcela Mensal
          </p>
          <p className="text-2xl font-black text-slate-900 dark:text-white">
            R$ 0,00
          </p>
        </div>
        <div className="p-6 bg-white dark:bg-card-dark rounded-xl border-l-4 border-slate-400 shadow-sm">
          <p className="text-sm text-slate-500 uppercase font-bold mb-1">
            Juros Ganhos
          </p>
          <p className="text-2xl font-black text-slate-900 dark:text-white">
            R$ 0,00
          </p>
        </div>
      </div>
    </div>
    {/* Sidebar */}
    <aside className="lg:col-span-4 flex flex-col gap-8">
      {/* Promo Card */}
      <div className="relative rounded-xl overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent z-10" />
        <img
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
          data-alt="Stacked gold coins with a small green plant growing on top"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiIAZZ1_Gx_i7qJnBZuqdTW1gDH3BRnNYO_BEfyALedW6hdQWTMrCxvimHAEd8ExDNnqlKeuvR-2F8QjxPY9Dqa6TRS04rbJ4IHfWuEKjtYGv7TfDybTd72owjQcX4oPr4yCEaVGqfCSdYjZuiJMMUjzND-N92XHg60Wl0AW6pVWYbkVseir6LsmR7lMTIUZUghLYar5-r4fWxk-6_SdT0ZodH-4-NK0c10UUt2AWOvWW4ONhyInd5nJ0-mswYeBWEQUOaxjfpSaAH"
        />
        <div className="absolute bottom-0 left-0 p-6 z-20">
          <span className="bg-secondary text-white text-[10px] font-bold px-2 py-1 rounded uppercase mb-2 inline-block">
            Destaque
          </span>
          <h3 className="text-white text-xl font-bold mb-2">
            Guia de Investimentos 2024
          </h3>
          <p className="text-slate-300 text-sm mb-4">
            Descubra as melhores taxas para seu perfil.
          </p>
          <a
            className="text-primary font-bold text-sm flex items-center gap-1 hover:underline"
            href="#"
          >
            Saiba mais{" "}
            <span className="material-symbols-outlined text-sm">
              open_in_new
            </span>
          </a>
        </div>
      </div>
      {/* Resources Links */}
      <div className="bg-white dark:bg-card-dark p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
        <h3 className="text-slate-900 dark:text-white text-xl font-bold mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">
            menu_book
          </span>
          Recursos Úteis
        </h3>
        <ul className="flex flex-col gap-4">
          <li>
            <a
              className="group flex items-start gap-3 text-slate-700 dark:text-slate-300 hover:text-primary transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">
                article
              </span>
              <div>
                <p className="font-medium text-sm">28 Formas de Economizar</p>
                <p className="text-xs text-slate-500">
                  Pequenas mudanças, grandes resultados.
                </p>
              </div>
            </a>
          </li>
          <hr className="border-slate-100 dark:border-slate-700" />
          <li>
            <a
              className="group flex items-start gap-3 text-slate-700 dark:text-slate-300 hover:text-primary transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">
                query_stats
              </span>
              <div>
                <p className="font-medium text-sm">
                  Controle de Gastos Mensais
                </p>
                <p className="text-xs text-slate-500">
                  Planilha gratuita para download.
                </p>
              </div>
            </a>
          </li>
          <hr className="border-slate-100 dark:border-slate-700" />
          <li>
            <a
              className="group flex items-start gap-3 text-slate-700 dark:text-slate-300 hover:text-primary transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">
                account_balance
              </span>
              <div>
                <p className="font-medium text-sm">Renda Fixa vs Variável</p>
                <p className="text-xs text-slate-500">
                  Qual o melhor para sua meta?
                </p>
              </div>
            </a>
          </li>
          <hr className="border-slate-100 dark:border-slate-700" />
          <li>
            <a
              className="group flex items-start gap-3 text-slate-700 dark:text-slate-300 hover:text-primary transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">
                calculate
              </span>
              <div>
                <p className="font-medium text-sm">
                  Calculadora de Juros Compostos
                </p>
                <p className="text-xs text-slate-500">
                  O poder do tempo ao seu favor.
                </p>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  </main>
</>
