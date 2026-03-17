import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import {
  CloudUpload,
  BarChart2,
  ClipboardCheck,
  HeadphonesIcon,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

interface Step {
  icon: LucideIcon;
  step: string;
  title: string;
  description: string;
  highlighted: boolean;
}

interface IncludedItem {
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    icon: CloudUpload,
    step: "Etapa 01",
    title: "Envio das informações",
    description:
      "Você compartilha seus dados financeiros de forma segura: investimentos, renda, despesas e objetivos.",
    highlighted: true,
  },
  {
    icon: BarChart2,
    step: "Etapa 02",
    title: "Análise especializada",
    description:
      "Nosso time avalia sua situação atual, identifica riscos, oportunidades e incoerências estratégicas.",
    highlighted: true,
  },
  {
    icon: ClipboardCheck,
    step: "Etapa 03",
    title: "Relatório personalizado",
    description:
      "Você recebe um relatório detalhado com diagnóstico financeiro e recomendações claras.",
    highlighted: false,
  },
  {
    icon: HeadphonesIcon,
    step: "Etapa 04",
    title: "Suporte por 30 dias",
    description:
      "Durante 30 dias, você pode tirar dúvidas e ajustar decisões com base no relatório entregue.",
    highlighted: false,
  },
];

const included: IncludedItem[] = [
  {
    title: "Mapeamento de necessidades financeiras",
    description: "Levantamento detalhado do seu perfil e objetivos.",
  },
  {
    title: "Relatório personalizado",
    description: "Nada de modelos genéricos. Uma análise feita por humanos para você.",
  },
  {
    title: "Suporte por 30 dias",
    description: "Canal direto com nossos consultores para tirar qualquer dúvida.",
  },
];

const ConsultoriaLanding = () => {
  return (
    <Layout>
      {/* ─── HERO — fundo #1A2E35 ──────────────────────────────────── */}
      <section
        className="relative overflow-hidden px-6 py-16 lg:px-10 lg:py-28"
        style={{ background: "#1A2E35" }}
      >
        <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-[#1daf66]/10 to-transparent" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[#1daf66]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            {/* Left */}
            <div className="flex flex-col gap-8">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-orange-300">
                <ShieldCheck size={14} />
                Consultoria Especializada
              </span>

              <div className="flex flex-col gap-6">
                <h1 className="text-5xl font-black leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl">
                  Consultoria{" "}
                  <span className="text-[#1daf66]">Financeira</span>{" "}
                  Virtual
                </h1>
                <p className="text-xl font-semibold text-white/70 sm:text-2xl">
                  Clareza, estratégia e decisões melhores para o seu dinheiro.
                </p>
                <p className="max-w-xl text-lg leading-relaxed text-white/50">
                  Você envia seus dados financeiros. Nosso time analisa com profundidade. Você
                  recebe um relatório claro, personalizado e acionável. Sem achismos. Sem conflito
                  de interesse.
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-4">
                <Button className="rounded-xl bg-[#1daf66] px-8 py-6 text-base font-bold text-white shadow-2xl shadow-[#1daf66]/30 transition-all hover:-translate-y-1 hover:bg-[#1daf66]/90">
                  Agendar Consultoria
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="rounded-xl border-2 border-white/20 px-8 py-6 text-base font-bold text-white/80 transition-all hover:border-white/40 hover:bg-white/5"
                >
                  Ver Amostra de Relatório
                </Button>
              </div>
            </div>

            {/* Right */}
            <div className="relative">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnB5NNj_s-UosUVAObjE7yVuJLxFn_DBj4QMRWiR060r8WzpxWZ10o6sg7NhLrUlucxPGNX9sM-I8LsC05vmAs8vEYr-X7Y4tpZT-huqfifeDZvMGJo_kFVBFtpuvjmAefNSTvMNTiTlmhXmFk_Ep3UvRIO_bt89ZG34__QnoFVTEW-3zODkDSXLtx0LCxkfBPxx-nstpp2jAmeGXtHFls_8Ae3P5B_AnAnxJF7CYEiqlFRwuJ46JLdLxNjEqiStY4wxW_y4OEPckq"
                  alt="Consultoria financeira"
                  className="h-full w-full rounded-2xl object-cover shadow-lg"
                />
              </div>
              {/* stat badge */}
              <div
                className="absolute -bottom-8 -left-8 hidden rounded-2xl p-6 shadow-2xl sm:block"
                style={{ background: "#0f1e23", border: "1px solid rgba(29,175,102,0.2)" }}
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-[#1daf66]/15 p-3 text-[#1daf66]">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-white/40">
                      Patrimônio Analisado
                    </p>
                    <p className="text-2xl font-black text-white">R$ 50M+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS — fundo #1A2E35 ─────────────────────────── */}
      <section className="px-6 py-24 lg:px-10" style={{ background: "#1A2E35" }}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 flex flex-col items-center gap-6 text-center">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-orange-400">
              Passo a Passo
            </span>
            <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
              Como funciona a consultoria
            </h2>
            <p className="max-w-2xl text-lg text-white/50">
              Um processo fluido e transparente desenhado para entregar resultados em tempo recorde.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ icon: Icon, step, title, description, highlighted }) => (
              <div
                key={step}
                className="group flex flex-col gap-5 rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                style={{
                  background: highlighted ? "#1daf66" : "rgba(255,255,255,0.04)",
                  border: highlighted ? "1px solid #1daf66" : "1px solid rgba(255,255,255,0.08)",
                  boxShadow: highlighted ? "0 8px 32px rgba(29,175,102,0.25)" : "none",
                }}
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-xl"
                  style={{
                    background: highlighted ? "rgba(255,255,255,0.15)" : "rgba(29,175,102,0.12)",
                  }}
                >
                  <Icon size={26} style={{ color: highlighted ? "#ffffff" : "#1daf66" }} />
                </div>
                <div className="flex flex-col gap-2">
                  <span
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: highlighted ? "rgba(255,255,255,0.8)" : "#FFA726" }}
                  >
                    {step}
                  </span>
                  <h3
                    className="text-lg font-bold leading-tight"
                    style={{ color: highlighted ? "#ffffff" : "rgba(255,255,255,0.9)" }}
                  >
                    {title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: highlighted ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.45)" }}
                  >
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PLAN — fundo branco ──────────────────────────────────── */}
      <section className="bg-white px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-3xl border border-orange-100 shadow-[0_30px_100px_rgba(255,167,38,0.1)]">
            <div className="grid grid-cols-1 md:grid-cols-5">
              {/* Left panel — #1A2E35 */}
              <div
                className="relative overflow-hidden p-12 md:col-span-2 flex flex-col justify-center gap-6 text-white"
                style={{ background: "#1A2E35" }}
              >
                <div className="pointer-events-none absolute -left-12 -top-12 h-40 w-40 rounded-full bg-[#1daf66]/20 blur-3xl" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#1daf66]">
                  Plano Recomendado
                </span>
                <h2 className="text-5xl font-black">Plano Análise</h2>
                <p className="text-base leading-relaxed text-white/60">
                  A solução completa para quem busca clareza imediata e um plano de ação robusto.
                </p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-white/40">R$</span>
                  <span className="text-6xl font-black text-white">997</span>
                  <span className="text-lg font-medium text-white/40">/único</span>
                </div>
              </div>

              {/* Right panel */}
              <div className="flex flex-col justify-between gap-10 bg-[#FFFDF5] p-12 md:col-span-3">
                <h4 className="border-b border-orange-100 pb-4 text-2xl font-bold text-slate-800">
                  O que está incluído
                </h4>

                <ul className="flex flex-col gap-8">
                  {included.map(({ title, description }) => (
                    <li key={title} className="flex items-start gap-5">
                      <CheckCircle2 size={22} className="mt-0.5 shrink-0 text-[#1daf66]" />
                      <div>
                        <p className="text-lg font-bold text-slate-800">{title}</p>
                        <p className="mt-1 text-sm text-slate-500">{description}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <Button className="w-full rounded-xl bg-[#FFA726] py-6 text-lg font-bold text-white shadow-xl shadow-orange-200 transition-all hover:scale-[1.02] hover:bg-orange-400">
                  Contratar Plano Análise
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ConsultoriaLanding;
