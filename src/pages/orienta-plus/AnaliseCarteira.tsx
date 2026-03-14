import { Layout } from "@/components/layout/Layout";

const AnaliseCarteira = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-8">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-3 py-1 rounded-full w-fit text-sm font-semibold">
                <span className="material-symbols-outlined text-sm">verified_user</span>
                Análise Técnica Imparcial
              </div>

              <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight text-slate-custom">
                Análise Profissional da Sua{" "}
                <span className="text-primary">Carteira</span> de Investimentos
              </h1>

              <p className="text-lg md:text-xl text-slate-500 max-w-xl">
                Saiba exatamente o que manter, o que vender e onde investir mais
                — com base nos seus próprios dados e objetivos financeiros.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all shadow-lg shadow-primary/20">
                  Analisar Minha Carteira
                </button>
                <button className="bg-white border border-slate-200 hover:bg-slate-50 px-8 py-4 rounded-xl text-lg font-bold transition-all flex items-center justify-center gap-2 text-slate-custom">
                  <span className="material-symbols-outlined">play_circle</span>
                  Ver Como Funciona
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full" />
              <div className="relative bg-white border border-slate-200 p-4 rounded-2xl shadow-xl">
                <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    dashboard_v2.exec
                  </span>
                </div>
                <img
                  alt="Interface de dashboard financeiro com gráficos"
                  className="rounded-lg w-full h-auto object-cover grayscale brightness-95 hover:grayscale-0 transition-all duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBR_tm__BQJ-cV7WUteaj0jXVDK9QefsUdVOtpMkDQJDgqJCEp6YF9F6Hi9O_Kyo07MWa0tJ1lNlzy-RFVcuCMklY5xQv8tVREuIhe3nbaAgUpOPD7JJkm4ubh3lBvj0ePb11e9mnjHbHDdZw1RGOT7U91evnI8fQqr7Mud4DWqeYpxcxgaoQrKV7cKapb0fs9oPkNdTR1jRwZfs2ER5wd9UkVJh5fRGC-tRT4xoG22own76oaGfZlG9YXZwb7vhT51ge0NLV6hqzhP"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dúvidas / Pain Points */}
      <section className="py-24 bg-slate-50/50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-custom">
              Você investe, acompanha o mercado, mas ainda tem dúvidas como:
            </h2>
            <div className="h-1.5 w-24 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "target",
                title: "Estratégia e Objetivos",
                text: '"Será que essa carteira realmente faz sentido para meus objetivos de curto, médio e longo prazo?"',
              },
              {
                icon: "warning",
                title: "Concentração de Risco",
                text: '"Estou concentrado demais em poucos setores ou ativos? Onde estão os pontos cegos do meu patrimônio?"',
              },
              {
                icon: "query_stats",
                title: "Tomada de Decisão",
                text: '"Devo manter, resgatar ou aumentar posição em algum ativo específico neste cenário de mercado?"',
              },
            ].map((card) => (
              <div
                key={card.icon}
                className="bg-white border border-slate-200 p-8 rounded-2xl hover:border-primary transition-colors group shadow-sm"
              >
                <div className="bg-primary/10 text-primary w-14 h-14 flex items-center justify-center rounded-xl mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                  <span className="material-symbols-outlined text-3xl">
                    {card.icon}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-slate-custom">
                  {card.title}
                </h3>
                <p className="text-slate-500">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Análise Técnica */}
      <section className="py-24 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 lg:p-16 relative shadow-sm">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="text-3xl md:text-4xl font-black mb-8 leading-tight text-slate-custom">
                  Agora você pode ter uma análise técnica, personalizada e
                  objetiva
                </h2>
                <p className="text-lg text-slate-500 mb-8 leading-relaxed">
                  Utilizamos algoritmos avançados e curadoria de especialistas
                  para auditar sua carteira. Identificamos redundâncias, custos
                  ocultos e oportunidades de otimização tributária.
                </p>

                <ul className="space-y-4 mb-10 text-slate-custom">
                  {[
                    "Relatório detalhado de alocação de ativos",
                    "Scoring de risco e volatilidade real",
                    "Sugestões de rebalanceamento automático",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary">
                        check_circle
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <button className="w-full sm:w-auto bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-primary/30 transition-all">
                  Obter Minha Análise Agora
                </button>
              </div>

              <div className="order-1 lg:order-2 flex justify-center">
                <div className="relative w-full max-w-md">
                  <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full" />
                  <div className="relative bg-white rounded-2xl p-6 shadow-2xl border border-slate-100">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary">
                          pie_chart
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 font-medium">
                          Diversificação Atual
                        </p>
                        <p className="text-xl font-bold text-slate-custom">
                          Saudável (84%)
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[84%]" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-slate-50 rounded-lg">
                          <p className="text-xs text-slate-500">Renda Fixa</p>
                          <p className="font-bold text-slate-custom">45%</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg">
                          <p className="text-xs text-slate-500">Ações</p>
                          <p className="font-bold text-slate-custom">35%</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -bottom-6 -right-6 bg-primary p-4 rounded-xl text-white shadow-xl hidden md:block">
                    <p className="text-xs font-bold uppercase tracking-wider mb-1">
                      Dica do Especialista
                    </p>
                    <p className="text-sm">Reduzir 5% em FIIs de tijolo.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 text-center bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight text-slate-custom">
            Pronto para profissionalizar seus investimentos?
          </h2>
          <p className="text-lg text-slate-500 mb-10">
            Junte-se a mais de 5.000 investidores que já otimizaram seus
            portfólios com a nossa metodologia exclusiva.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary text-white px-10 py-5 rounded-xl font-black text-xl hover:scale-105 transition-transform shadow-2xl shadow-primary/20">
              Analisar Minha Carteira
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AnaliseCarteira;
