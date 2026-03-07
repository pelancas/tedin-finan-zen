import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
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

import { LucideIcon } from "lucide-react";

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

// Vermont palette
const colors: Record<string, string> = {
  dark: "#1a4537",
  darkest: "#1c211f",
  mid: "#618c70",
  light: "#abccb5",
  cream: "#d9d4c4",
};

const ConsultoriaLanding = () => {
  return (
    <Layout>
      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden px-6 py-16 lg:px-10 lg:py-28"
        style={{ background: `linear-gradient(135deg, ${colors.darkest} 0%, ${colors.dark} 60%, ${colors.mid} 100%)` }}
      >
        {/* decorative blob */}
        <div
          className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full opacity-20 blur-3xl"
          style={{ background: colors.light }}
        />
        <div
          className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full opacity-10 blur-3xl"
          style={{ background: colors.cream }}
        />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
            {/* Left */}
            <div className="flex flex-col gap-8">
              <span
                className="inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
                style={{ background: `${colors.light}22`, color: colors.light, border: `1px solid ${colors.light}44` }}
              >
                <ShieldCheck size={14} />
                Consultoria Especializada
              </span>

              <div className="flex flex-col gap-5">
                <h1
                  className="text-5xl font-black leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl"
                  style={{ color: colors.cream, fontFamily: "'Work Sans', sans-serif" }}
                >
                  Consultoria{" "}
                  <span style={{ color: colors.light }}>Financeira</span>{" "}
                  Virtual
                </h1>
                <p
                  className="text-xl font-semibold sm:text-2xl"
                  style={{ color: colors.light }}
                >
                  Clareza, estratégia e decisões melhores para o seu dinheiro.
                </p>
                <p
                  className="max-w-xl text-lg leading-relaxed"
                  style={{ color: `${colors.cream}bb` }}
                >
                  Você envia seus dados financeiros. Nosso time analisa com profundidade. Você recebe um relatório claro, personalizado e acionável. Sem achismos. Sem conflito de interesse.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 mt-2">
                <Button
                  className="rounded-xl px-8 py-6 text-base font-bold shadow-2xl transition-all hover:-translate-y-1"
                  style={{ background: colors.mid, color: "#fff", boxShadow: `0 12px 40px ${colors.mid}55` }}
                >
                  Agendar Consultoria
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="rounded-xl px-8 py-6 text-base font-bold transition-all"
                  style={{ borderColor: `${colors.light}55`, color: colors.cream, background: "transparent" }}
                >
                  Ver Amostra de Relatório
                </Button>
              </div>
            </div>

            {/* Right – image card */}
            <div className="relative">
              <div
                className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl p-3 shadow-2xl"
                style={{ background: `${colors.light}22`, border: `1px solid ${colors.light}33` }}
              >
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnB5NNj_s-UosUVAObjE7yVuJLxFn_DBj4QMRWiR060r8WzpxWZ10o6sg7NhLrUlucxPGNX9sM-I8LsC05vmAs8vEYr-X7Y4tpZT-huqfifeDZvMGJo_kFVBFtpuvjmAefNSTvMNTiTlmhXmFk_Ep3UvRIO_bt89ZG34__QnoFVTEW-3zODkDSXLtx0LCxkfBPxx-nstpp2jAmeGXtHFls_8Ae3P5B_AnAnxJF7CYEiqlFRwuJ46JLdLxNjEqiStY4wxW_y4OEPckq"
                  alt="Consultoria financeira"
                  className="h-full w-full rounded-2xl object-cover"
                />
              </div>
              {/* stat badge */}
              <div
                className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-4 rounded-2xl p-5 shadow-2xl"
                style={{ background: colors.darkest, border: `1px solid ${colors.light}22` }}
              >
                <div
                  className="rounded-xl p-3"
                  style={{ background: `${colors.mid}33` }}
                >
                  <TrendingUp size={24} style={{ color: colors.light }} />
                </div>
                <div>
                  <p
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: `${colors.cream}88` }}
                  >
                    Patrimônio Analisado
                  </p>
                  <p className="text-2xl font-black" style={{ color: colors.cream }}>
                    R$ 50M+
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─────────────────────────────────────────── */}
      <section className="px-6 py-24 lg:px-10" style={{ background: colors.cream }}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 flex flex-col items-center text-center gap-5">
            <span
              className="font-bold tracking-[0.2em] uppercase text-sm"
              style={{ color: colors.mid }}
            >
              Passo a Passo
            </span>
            <h2
              className="text-4xl font-black tracking-tight sm:text-5xl"
              style={{ color: colors.darkest, fontFamily: "'Work Sans', sans-serif" }}
            >
              Como funciona a consultoria
            </h2>
            <p className="max-w-2xl text-lg" style={{ color: `${colors.darkest}99` }}>
              Um processo fluido e transparente desenhado para entregar resultados em tempo recorde.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ icon: Icon, step, title, description, highlighted }) => (
              <div
                key={step}
                className="group flex flex-col gap-5 rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{
                  background: highlighted ? colors.dark : "#fff",
                  border: `1px solid ${highlighted ? colors.mid : colors.cream}`,
                  boxShadow: highlighted ? `0 8px 32px ${colors.dark}33` : "none",
                }}
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-xl"
                  style={{
                    background: highlighted ? `${colors.light}33` : `${colors.dark}11`,
                  }}
                >
                  <Icon
                    size={26}
                    style={{ color: highlighted ? colors.light : colors.mid }}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <span
                    className="text-xs font-bold tracking-widest uppercase"
                    style={{ color: highlighted ? colors.light : colors.mid }}
                  >
                    {step}
                  </span>
                  <h3
                    className="text-lg font-bold leading-tight"
                    style={{ color: highlighted ? colors.cream : colors.darkest }}
                  >
                    {title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: highlighted ? `${colors.cream}aa` : `${colors.darkest}88` }}
                  >
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PLAN ─────────────────────────────────────────────────── */}
      <section className="px-6 py-24 lg:px-10" style={{ background: "#fff" }}>
        <div className="mx-auto max-w-5xl">
          <div
            className="overflow-hidden rounded-3xl shadow-2xl"
            style={{ border: `1px solid ${colors.light}44` }}
          >
            <div className="grid grid-cols-1 md:grid-cols-5">
              {/* Left panel */}
              <div
                className="relative overflow-hidden p-12 md:col-span-2 flex flex-col justify-center gap-6"
                style={{ background: `linear-gradient(160deg, ${colors.dark} 0%, ${colors.darkest} 100%)` }}
              >
                <div
                  className="pointer-events-none absolute -top-16 -left-16 h-48 w-48 rounded-full blur-3xl opacity-30"
                  style={{ background: colors.mid }}
                />
                <span
                  className="text-xs font-bold uppercase tracking-[0.2em]"
                  style={{ color: colors.light }}
                >
                  Plano Recomendado
                </span>
                <h2
                  className="text-4xl font-black"
                  style={{ color: colors.cream, fontFamily: "'Work Sans', sans-serif" }}
                >
                  Plano Análise
                </h2>
                <p className="text-base leading-relaxed" style={{ color: `${colors.cream}bb` }}>
                  A solução completa para quem busca clareza imediata e um plano de ação robusto.
                </p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-xl font-bold" style={{ color: `${colors.cream}77` }}>
                    R$
                  </span>
                  <span
                    className="text-6xl font-black"
                    style={{ color: colors.cream }}
                  >
                    997
                  </span>
                  <span className="text-base font-medium" style={{ color: `${colors.cream}77` }}>
                    /único
                  </span>
                </div>
              </div>

              {/* Right panel */}
              <div
                className="p-12 md:col-span-3 flex flex-col justify-between gap-10"
                style={{ background: `${colors.cream}55` }}
              >
                <h4
                  className="text-xl font-bold pb-4"
                  style={{
                    color: colors.darkest,
                    borderBottom: `1px solid ${colors.light}66`,
                    fontFamily: "'Work Sans', sans-serif",
                  }}
                >
                  O que está incluído
                </h4>

                <ul className="flex flex-col gap-7">
                  {included.map(({ title, description }) => (
                    <li key={title} className="flex items-start gap-4">
                      <CheckCircle2
                        size={22}
                        className="mt-0.5 shrink-0"
                        style={{ color: colors.mid }}
                      />
                      <div>
                        <p className="font-bold text-base" style={{ color: colors.darkest }}>
                          {title}
                        </p>
                        <p className="text-sm mt-1" style={{ color: `${colors.darkest}88` }}>
                          {description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full rounded-xl py-6 text-base font-bold shadow-xl transition-all hover:scale-[1.02]"
                  style={{
                    background: colors.dark,
                    color: colors.cream,
                    boxShadow: `0 12px 40px ${colors.dark}44`,
                  }}
                >
                  Contratar Plano Análise
                  <ArrowRight className="ml-2 h-4 w-4" />
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
