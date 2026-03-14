import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Wallet, PieChart, Bell, CreditCard, ArrowRight, FileSpreadsheet,
  Copy, BookOpen, CheckCircle2, Target, Layers, Banknote,
  Landmark, PiggyBank, Smartphone, Building2, CircleDollarSign
} from "lucide-react";
import planilhaImg from "@/assets/planilha-planejamento.png";
import planilhaAcompanhamentoImg from "@/assets/planilha-acompanhamento.png";

const features = [
  {
    icon: Wallet,
    title: "Registro fácil",
    description: "Adicione gastos em segundos. Foto de recibo? A gente lê pra você.",
  },
  {
    icon: PieChart,
    title: "Relatórios visuais",
    description: "Gráficos simples que mostram para onde seu dinheiro está indo.",
  },
  {
    icon: Bell,
    title: "Alertas inteligentes",
    description: "Avisamos quando você está perto do limite que você mesmo definiu.",
  },
  {
    icon: CreditCard,
    title: "Múltiplas contas",
    description: "Cartão, débito, dinheiro vivo. Tudo num lugar só.",
  },
];

const modeloBeneficios = [
  "Clareza total sobre o destino do dinheiro",
  "Redução de gastos impulsivos",
  "Separação real entre consumo e poupança",
  "Flexibilidade (digital ou físico)",
  "Facilidade de adaptação à renda e aos objetivos",
];

const etapaDiaDia = [
  "Você recebe sua renda",
  "Executa o planejamento mensal",
  "Distribui o dinheiro nos envelopes escolhidos",
  "Gasta apenas o que está disponível em cada envelope",
  "Ajusta os valores no mês seguinte, se necessário",
];

const etapa1Inclui = [
  "Despesas fixas (aluguel, contas, escola)",
  "Despesas variáveis (mercado, lazer, transporte)",
  "Reservas e investimentos",
  "Metas de curto, médio e longo prazo",
];

const Despesas = () => {
  return (
    <Layout>
      {/* Seção 1 — Hero */}

      <main>
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1 flex flex-col gap-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            Método Exclusivo
          </div>
          <h1 className="text-slate-900 text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight">
            Planejamento inteligente com
            <span className="text-primary">
              controle real
            </span>
            do dinheiro
          </h1>
          <p className="text-slate-600 text-xl leading-relaxed max-w-2xl">
            Conheça o método híbrido que une
            <span className="text-primary font-bold">
              Zero Base Budget
            </span>
            e a
            <span className="text-secondary font-bold">
              Técnica dos Envelopes
            </span>
            para transformar sua vida financeira de forma definitiva.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-primary hover:bg-primary/90 text-white font-bold px-10 py-5 rounded-2xl shadow-xl shadow-primary/20 flex items-center gap-3 text-lg group transition-all">
              Começar Planejamento
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
            <button className="bg-white border-2 border-slate-200 hover:border-primary/30 text-slate-700 font-bold px-10 py-5 rounded-2xl flex items-center gap-3 text-lg transition-all">
              Ver Planilha Grátis
            </button>
          </div>
        </div>
        <div className="flex-1 w-full aspect-square md:aspect-[4/5] lg:aspect-square rounded-[2rem] bg-gradient-to-br from-primary/10 via-primary/5 to-transparent flex items-center justify-center border-2 border-primary/10 relative overflow-hidden">
          <span className="material-symbols-outlined text-primary text-[10rem] opacity-30 select-none">
            insights
          </span>
          <div className="absolute bottom-10 left-10 right-10 bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white shadow-xl">
            <div className="flex gap-4">
              <div className="bg-primary text-white p-3 rounded-lg">
                <span className="material-symbols-outlined">
                  trending_up
                </span>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase">
                  Crescimento Patrimonial
                </p>
                <p className="text-xl font-black text-slate-900">
                  +42% no primeiro ano
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Principles Banner */}
      <section className="bg-primary/5 border-y border-primary/10">
        <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-4">
            <span className="text-primary font-bold text-sm uppercase tracking-[0.2em]">
              Princípio Fundamental
            </span>
            <h2 className="text-4xl font-black text-slate-900 leading-tight">
              Todo dinheiro precisa de um destino definido.
            </h2>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-primary/20 shadow-sm relative">
            <span className="material-symbols-outlined absolute -top-4 -left-4 bg-primary text-white p-2 rounded-full scale-125">
              format_quote
            </span>
            <p className="italic text-slate-700 text-lg leading-relaxed">
              "Nenhum valor fica sem função. Se sobrou no planejamento, esse 'sobra' já deve ter um envelope de destino, seja reserva ou investimento."
            </p>
          </div>
        </div>
      </section>
      {/* Benefits Grid */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-black text-slate-900 mb-4">
            Por que usar o Modelo ORIENTA?
          </h3>
          <p className="text-slate-500 max-w-xl mx-auto">
            A estrutura perfeita para quem busca liberdade financeira com responsabilidade e método.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="group flex flex-col gap-6 rounded-[2rem] border border-primary/10 bg-white p-8 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 transition-all">
            <div className="bg-primary/10 w-14 h-14 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-3xl">
                visibility
              </span>
            </div>
            <div>
              <h4 className="font-black text-xl mb-2 text-slate-800">
                Clareza Total
              </h4>
              <p className="text-slate-500 leading-relaxed">
                Tenha visão 360º das suas finanças e saiba exatamente o destino de cada centavo.
              </p>
            </div>
          </div>
          <div className="group flex flex-col gap-6 rounded-[2rem] border border-secondary/10 bg-white p-8 hover:border-secondary/40 hover:shadow-2xl hover:shadow-secondary/5 transition-all">
            <div className="bg-secondary/10 w-14 h-14 rounded-2xl flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-3xl">
                shield_with_heart
              </span>
            </div>
            <div>
              <h4 className="font-black text-xl mb-2 text-slate-800">
                Menos Impulso
              </h4>
              <p className="text-slate-500 leading-relaxed">
                Limites claros baseados em valores reais que reduzem drasticamente gastos por impulso.
              </p>
            </div>
          </div>
          <div className="group flex flex-col gap-6 rounded-[2rem] border border-primary/10 bg-white p-8 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 transition-all">
            <div className="bg-primary/10 w-14 h-14 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-3xl">
                savings
              </span>
            </div>
            <div>
              <h4 className="font-black text-xl mb-2 text-slate-800">
                Poupe Primeiro
              </h4>
              <p className="text-slate-500 leading-relaxed">
                Priorize seus sonhos separando o consumo dos seus investimentos logo no início do mês.
              </p>
            </div>
          </div>
          <div className="group flex flex-col gap-6 rounded-[2rem] border border-secondary/10 bg-white p-8 hover:border-secondary/40 hover:shadow-2xl hover:shadow-secondary/5 transition-all">
            <div className="bg-secondary/10 w-14 h-14 rounded-2xl flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-3xl">
                alt_route
              </span>
            </div>
            <div>
              <h4 className="font-black text-xl mb-2 text-slate-800">
                Flexibilidade
              </h4>
              <p className="text-slate-500 leading-relaxed">
                Um sistema robusto mas adaptável que evolui conforme sua realidade financeira muda.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* How it Works (Flow) */}
      <section className="bg-slate-900 py-24 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 items-start">
            <div className="flex-1 sticky top-32">
              <h3 className="text-4xl font-black mb-6">
                Como funciona o fluxo ORIENTA
              </h3>
              <p className="text-slate-400 text-lg mb-8">
                Um ciclo contínuo de 5 etapas para manter sua saúde financeira em dia.
              </p>
              <div className="hidden md:block">
                <img alt="Financial planning" className="rounded-3xl w-full aspect-video object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9xYNQCHro-SyOcfP_vHRWyY3uyZpolx2iehpOF5-RFeMmQm1Y8JqQ4u-HbWkfeBxap1RJZrvcpN7DZT-kpjff01rJ6c2_x2dN1IfaWIUujFkrdl0No4Jz_Vyo7b4CDP71IC5XhX-0y5ye6Tqr1n5yG34kIo5rD61S0o0oIAJh2oizgWTF_tfnvAJt26wCQicFvw3-GoalNh5RRz6k4g6S8kIYhvdxQWCrqodNdP1l-gRruDV5EJ5uM0oLwUsZp0YRlDrGNf-bXS8" />
              </div>
            </div>
            <div className="flex-1">
              <div className="space-y-12">
                <div className="flex gap-6">
                  <span className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center font-bold text-xl">
                    1
                  </span>
                  <div>
                    <h4 className="text-xl font-bold text-primary mb-2">
                      Entrada
                    </h4>
                    <p className="text-slate-400 leading-relaxed">
                      Identifique sua receita líquida total do mês, somando todas as fontes de renda após impostos.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6 border-l-2 border-primary/20 pl-6 ml-6">
                  <span className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center font-bold text-xl">
                    2
                  </span>
                  <div>
                    <h4 className="text-xl font-bold text-primary mb-2">
                      Planejamento
                    </h4>
                    <p className="text-slate-400 leading-relaxed">
                      Aplique o Orçamento Base Zero: atribua cada real a uma categoria. A conta deve fechar em zero: Receita - Gastos = 0.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6 border-l-2 border-primary/20 pl-6 ml-6">
                  <span className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center font-bold text-xl">
                    3
                  </span>
                  <div>
                    <h4 className="text-xl font-bold text-primary mb-2">
                      Distribuição
                    </h4>
                    <p className="text-slate-400 leading-relaxed">
                      Transfira os valores planejados para seus envelopes digitais (contas, caixinhas) ou envelopes físicos.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6 border-l-2 border-primary/20 pl-6 ml-6">
                  <span className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center font-bold text-xl">
                    4
                  </span>
                  <div>
                    <h4 className="text-xl font-bold text-primary mb-2">
                      Execução
                    </h4>
                    <p className="text-slate-400 leading-relaxed">
                      Gaste exclusivamente o que está dentro de cada envelope. Se o envelope de "Lazer" acabou, as saídas param por ali.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6 border-l-2 border-secondary/20 pl-6 ml-6">
                  <span className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary flex items-center justify-center font-bold text-xl">
                    5
                  </span>
                  <div>
                    <h4 className="text-xl font-bold text-secondary mb-2">
                      Ajuste
                    </h4>
                    <p className="text-slate-400 leading-relaxed">
                      Ao final do mês, avalie o que funcionou e o que não funcionou. Refine os valores para o próximo ciclo mensal.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Deep Dive Sections (Planning & Separation) */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Step 1: Planning */}
          <div className="bg-white rounded-[2.5rem] p-10 border border-primary/10 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <span className="bg-primary/10 p-4 rounded-2xl text-primary">
                  <span className="material-symbols-outlined text-4xl">
                    calculate
                  </span>
                </span>
                <h3 className="text-3xl font-black text-slate-900">
                  Passo 1: Planejar
                </h3>
              </div>
              <p className="text-slate-600 text-lg mb-8">
                No Orçamento Base Zero, cada real ganho deve ser atribuído a uma categoria específica. Isso garante controle absoluto sobre o fluxo de caixa.
              </p>
              <div className="font-mono text-primary bg-primary/5 p-6 rounded-2xl border border-primary/20 mb-8 text-center text-xl font-bold">
                Receita - Despesas - Investimentos = 0
              </div>
            </div>
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-primary">
                  Ferramenta Gratuita
                </span>
                <span className="material-symbols-outlined text-primary">
                  verified
                </span>
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-3">
                Planilha Modelo ORIENTA
              </h4>
              <p className="text-slate-500 mb-6">
                Template profissional pronto no Google Sheets para você apenas preencher e começar hoje.
              </p>
              <button className="w-full bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white transition-all font-bold py-4 rounded-2xl flex items-center justify-center gap-3">
                <span className="material-symbols-outlined">
                  content_copy
                </span>
                Copiar Planilha Grátis
              </button>
            </div>
          </div>
          {/* Step 2: Separation */}
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <span className="bg-secondary/10 p-4 rounded-2xl text-secondary">
                <span className="material-symbols-outlined text-4xl">
                  layers
                </span>
              </span>
              <h3 className="text-3xl font-black text-slate-900">
                Passo 2: Separar
              </h3>
            </div>
            <p className="text-slate-600 text-lg">
              O segredo da consistência é a separação física ou digital. Escolha a modalidade que melhor se adapta ao seu estilo de vida:
            </p>
            <div className="grid gap-4">
              <div className="group flex gap-5 p-6 rounded-2xl border border-slate-200 bg-white hover:border-primary/40 transition-all">
                <div className="text-primary">
                  <span className="material-symbols-outlined text-3xl">
                    account_balance
                  </span>
                </div>
                <div>
                  <h5 className="font-black text-slate-800 text-lg">
                    Múltiplos Bancos
                  </h5>
                  <p className="text-slate-500">
                    Contas separadas para gastos fixos e lazer para evitar confusão mental.
                  </p>
                </div>
              </div>
              <div className="group flex gap-5 p-6 rounded-2xl border border-slate-200 bg-white hover:border-primary/40 transition-all">
                <div className="text-primary">
                  <span className="material-symbols-outlined text-3xl">
                    folder_shared
                  </span>
                </div>
                <div>
                  <h5 className="font-black text-slate-800 text-lg">
                    Sub-contas / Caixinhas
                  </h5>
                  <p className="text-slate-500">
                    Organização digital dentro do mesmo aplicativo bancário.
                  </p>
                </div>
              </div>
              <div className="group flex gap-5 p-6 rounded-2xl border border-slate-200 bg-white hover:border-primary/40 transition-all">
                <div className="text-primary">
                  <span className="material-symbols-outlined text-3xl">
                    mail
                  </span>
                </div>
                <div>
                  <h5 className="font-black text-slate-800 text-lg">
                    Envelopes Físicos
                  </h5>
                  <p className="text-slate-500">
                    O método tátil clássico com dinheiro em espécie para categorias variáveis.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-8 rounded-[2rem] bg-gradient-to-br from-primary to-emerald-700 text-white shadow-xl">
              <h4 className="font-black text-xl mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined">
                  checklist
                </span>
                Exemplo de Estrutura de Envelopes
              </h4>
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-emerald-300">
                    check_circle
                  </span>
                  Dia-a-dia
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-emerald-300">
                    check_circle
                  </span>
                  Boletos Fixos
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-emerald-300">
                    check_circle
                  </span>
                  Emergência
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-emerald-300">
                    check_circle
                  </span>
                  Investimentos
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    </Layout>
  );
};

export default Despesas;
