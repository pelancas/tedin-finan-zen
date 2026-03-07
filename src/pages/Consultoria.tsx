import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import {
  TrendingUp,
  PieChart,
  Video,
  CheckCircle2,
  ArrowRight,
  Lightbulb,
  Shield,
  HeadphonesIcon,
  BarChart2,
  Globe,
  Users,
  Laptop,
} from "lucide-react";

interface ServiceCard {
  icon: LucideIcon;
  badge: string;
  badgeColor: string;
  title: string;
  description: string;
  price: string;
  priceLabel: string;
  features: string[];
  ctaLabel: string;
  accentColor: string;
  hoverShadow: string;
}

interface WhyItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const services: ServiceCard[] = [
  {
    icon: PieChart,
    badge: "Destaque",
    badgeColor: "#1daf66",
    title: "Análise de Carteira",
    description: "Uma visão 360º dos seus ativos com foco em maximizar lucros e mitigar riscos.",
    price: "Sob Consulta",
    priceLabel: "/por análise",
    features: [
      "Análise técnica detalhada por setor",
      "Conselhos precisos de compra e venda",
      "Visão objetiva e imparcial do mercado",
      "Relatórios de performance trimestrais",
    ],
    ctaLabel: "Saber Mais",
    accentColor: "#1daf66",
    hoverShadow: "hover:shadow-[#1daf66]/5",
  },
  {
    icon: Video,
    badge: "Recomendado",
    badgeColor: "#f97316",
    title: "Consultoria Virtual",
    description:
      "Atendimento exclusivo e personalizado via videoconferência com nossos especialistas.",
    price: "R$ 299",
    priceLabel: "/por sessão",
    features: [
      "Análise profunda de perfil de risco",
      "Relatório claro e acionável pós-reunião",
      "Suporte dedicado via WhatsApp por 30 dias",
      "Plano de ação personalizado passo a passo",
    ],
    ctaLabel: "Contratar Agora",
    accentColor: "#f97316",
    hoverShadow: "hover:shadow-orange-500/5",
  },
];

const whyItems: WhyItem[] = [
  {
    icon: Lightbulb,
    title: "Análise Baseada em Dados",
    description:
      "Utilizamos algoritmos proprietários e análise fundamentalista para prever tendências de mercado com alta precisão.",
  },
  {
    icon: Shield,
    title: "Segurança em Primeiro Lugar",
    description:
      "Sua privacidade e segurança patrimonial são nossas prioridades. Operamos com transparência total em cada recomendação.",
  },
  {
    icon: HeadphonesIcon,
    title: "Suporte Humanizado",
    description:
      "Nada de bots. Nossos especialistas estão prontos para tirar suas dúvidas e ajustar sua estratégia conforme suas mudanças de vida.",
  },
];

const gridItems: { icon: LucideIcon; bg: string; iconColor: string; offset: string }[] = [
  { icon: Users, bg: "bg-slate-200", iconColor: "text-slate-400", offset: "" },
  { icon: BarChart2, bg: "bg-[#1daf66]/10 border border-[#1daf66]/20", iconColor: "text-[#1daf66]/50", offset: "mt-8" },
  { icon: Globe, bg: "bg-orange-50 border border-orange-100", iconColor: "text-orange-300", offset: "-mt-8" },
  { icon: Laptop, bg: "bg-slate-200", iconColor: "text-slate-400", offset: "" },
];

const Home: React.FC = () => {
  return (
    <Layout>
      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#F8F8F5] py-20 lg:py-32">
        <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-[#1daf66] opacity-10 blur-[120px]" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-orange-400 opacity-10 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left */}
            <div className="flex flex-col gap-6 text-center lg:text-left">
              <span className="inline-flex items-center self-center gap-2 rounded-full border border-[#1daf66]/20 bg-[#1daf66]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#1daf66] lg:self-start">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1daf66] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1daf66]" />
                </span>
                Expertise Financeira de Elite
              </span>

              <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
                Planejamento profissional{" "}
                <span className="bg-gradient-to-r from-[#1daf66] to-emerald-600 bg-clip-text text-transparent">
                  ao seu alcance.
                </span>
              </h1>

              <p className="mx-auto max-w-xl text-lg text-slate-600 lg:mx-0">
                Transforme sua vida financeira com estratégias personalizadas e análise de dados
                precisa. Escolha o melhor caminho para seus investimentos hoje.
              </p>

              <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                <Button className="flex items-center justify-center gap-2 rounded-xl bg-[#1daf66] px-8 py-6 text-lg font-bold text-white shadow-xl shadow-[#1daf66]/30 transition-all hover:bg-[#1daf66]/90">
                  Iniciar Consultoria
                  <TrendingUp size={18} />
                </Button>
                <Button
                  variant="outline"
                  className="rounded-xl bg-slate-200 px-8 py-6 text-lg font-bold text-slate-900 transition-colors hover:bg-slate-300 border-0"
                >
                  Ver Planos
                </Button>
              </div>
            </div>

            {/* Right */}
            <div className="relative">
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1daf66]/10 to-orange-50">
                  <BarChart2 size={96} className="text-[#1daf66]/30" />
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 hidden max-w-xs items-center gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-xl sm:flex">
                <div className="rounded-lg bg-orange-50 p-2 text-orange-400">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">ROI Médio Anual</p>
                  <p className="text-lg font-bold text-slate-900">+18.5%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─────────────────────────────────────────────── */}
      <section className="bg-white/50 py-24" id="servicos">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 space-y-4 text-center">
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              Nossas Soluções Especializadas
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              Seja você um investidor iniciante ou experiente, temos a ferramenta certa para elevar
              seu patrimônio ao próximo nível.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className={`group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl ${s.hoverShadow}`}
                  style={{ ["--hover-border" as string]: s.accentColor }}
                >
                  <div className="mb-6 flex items-start justify-between">
                    <div
                      className="rounded-xl p-3"
                      style={{ background: `${s.accentColor}18` }}
                    >
                      <Icon size={28} style={{ color: s.accentColor }} />
                    </div>
                    <span
                      className="rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white"
                      style={{ background: s.badgeColor }}
                    >
                      {s.badge}
                    </span>
                  </div>

                  <h3 className="mb-2 text-2xl font-bold text-slate-900">{s.title}</h3>
                  <p className="mb-6 text-slate-600">{s.description}</p>

                  <div className="mb-8 flex items-baseline gap-1">
                    {s.price === "Sob Consulta" ? (
                      <span className="text-4xl font-black text-slate-900">{s.price}</span>
                    ) : (
                      <>
                        <span className="text-sm font-bold uppercase" style={{ color: s.accentColor }}>
                          R$
                        </span>
                        <span className="text-4xl font-black text-slate-900">
                          {s.price.replace("R$ ", "")}
                        </span>
                      </>
                    )}
                    <span className="ml-1 text-sm text-slate-500">{s.priceLabel}</span>
                  </div>

                  <ul className="mb-10 flex flex-grow flex-col gap-4">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-sm text-slate-700">
                        <CheckCircle2 size={18} className="shrink-0" style={{ color: s.accentColor }} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="flex w-full items-center justify-center gap-2 rounded-xl py-5 font-bold text-white transition-all group-hover:opacity-90"
                    style={{ background: s.accentColor === "#1daf66" ? "#1e293b" : "#1e293b" }}
                  >
                    {s.ctaLabel}
                    <ArrowRight size={16} />
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── WHY US ───────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Left */}
            <div>
              <h2 className="mb-8 text-3xl font-black text-slate-900">
                Por que escolher a FinançasPro?
              </h2>
              <div className="flex flex-col gap-8">
                {whyItems.map(({ icon: Icon, title, description }) => (
                  <div key={title} className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1daf66]/20 text-[#1daf66]">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h4 className="mb-2 text-lg font-bold text-slate-900">{title}</h4>
                      <p className="text-slate-600">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right – grid tiles */}
            <div className="grid grid-cols-2 gap-4">
              {gridItems.map(({ icon: Icon, bg, iconColor, offset }, i) => (
                <div
                  key={i}
                  className={`aspect-square overflow-hidden rounded-2xl shadow-lg ${bg} ${offset}`}
                >
                  <div className="flex h-full w-full items-center justify-center">
                    <Icon size={56} className={iconColor} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ───────────────────────────────────────────── */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-[#1daf66] p-8 text-center text-white shadow-2xl shadow-[#1daf66]/20 md:p-16">
            <div className="pointer-events-none absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white,_transparent_70%)]" />
            <h2 className="relative z-10 mb-6 text-3xl font-black md:text-5xl">
              Pronto para transformar seu futuro financeiro?
            </h2>
            <p className="relative z-10 mx-auto mb-10 max-w-2xl text-lg text-white/90">
              Junte-se a mais de 15.000 investidores que já otimizaram seus lucros com a FinançasPro.
            </p>
            <div className="relative z-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Button className="rounded-xl bg-white px-10 py-6 text-lg font-bold text-[#1daf66] shadow-xl transition-all hover:bg-slate-100">
                Agendar Minha Análise
              </Button>
              <Button
                variant="outline"
                className="rounded-xl border border-white/30 bg-black/10 px-10 py-6 text-lg font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10"
              >
                Falar com Consultor
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
