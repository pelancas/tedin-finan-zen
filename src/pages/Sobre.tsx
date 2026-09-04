import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import {
  Stethoscope,
  Scale,
  Briefcase,
  TrendingUp,
  Users,
  Target,
  Wallet,
  ShieldCheck,
  Calculator,
  FileText,
  Compass,
  ArrowRight,
} from "lucide-react";

const perfil = [
  {
    icon: Wallet,
    title: "Renda que varia todo mês",
    description:
      "Nada de contracheque fixo, 13º ou FGTS. Você fatura diferente a cada mês — e a maioria das ferramentas de finanças não foi pensada pra isso.",
  },
  {
    icon: TrendingUp,
    title: "Ontem, fita cassete",
    description:
      "Hoje, a carreira estabilizou, o dinheiro começou a sobrar de verdade e chegou a hora de sair do improviso e construir patrimônio com estratégia.",
  },
  {
    icon: Users,
    title: "Família em construção",
    description:
      "Casamento, filhos, casa própria — decisões que já pesam de forma diferente. Proteger quem depende de você entrou na conta.",
  },
];

const profissoes = [
  { icon: Stethoscope, label: "Médicos" },
  { icon: Scale, label: "Advogados" },
  { icon: Briefcase, label: "Empresários" },
  { icon: Compass, label: "Autônomos em geral" },
];

const valores = [
  {
    icon: Target,
    title: "Feito pra renda variável",
    description:
      "Calculadoras e planejamentos que partem da sua realidade — sem assumir um salário fixo caindo todo dia 5.",
  },
  {
    icon: ShieldCheck,
    title: "Direto ao ponto",
    description:
      "Sem jargão de mercado financeiro nem letra miúda. Informação clara pra quem já tem pouco tempo sobrando.",
  },
  {
    icon: Users,
    title: "Patrimônio com propósito",
    description:
      "Investir não é só acumular número. É construir segurança pra sua família e pro futuro que você está escolhendo agora.",
  },
];

const ferramentas = [
  {
    icon: Calculator,
    title: "Calculadoras financeiras",
    description: "Aposentadoria, metas e o caminho até o primeiro milhão, calculados na sua realidade.",
    to: "/planejamento/calculadoras/aposentadoria",
  },
  {
    icon: FileText,
    title: "Relatório de Avaliação de Riscos",
    description: "Due diligence completa antes de comprar um imóvel, sem depender só da palavra do vendedor.",
    to: "/relatorio-avaliacao-riscos",
  },
  {
    icon: Compass,
    title: "Orienta+",
    description: "Consultoria e planejamento financeiro para quem quer ir além das planilhas.",
    to: "/orientaplus",
  },
];

const Sobre = () => {
  useDocumentMeta(
    "Sobre a Orienta | Ferramentas financeiras para autônomos",
    "A Orienta existe para médicos, advogados, empresários e demais autônomos que estão começando a investir e construir patrimônio de verdade, com renda variável e família em vista.",
  );

  return (
    <Layout>
      {/* ─── HERO — fundo #1A2E35 ────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 md:py-28" style={{ background: "#1A2E35" }}>
        <div className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-[#1daf66] opacity-10 blur-[130px]" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-orange-400 opacity-10 blur-[130px]" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black leading-tight text-white md:text-5xl">
            Feita para quem constrói{" "}
            <span className="text-[#1daf66]">o próprio salário</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">
            A Orienta existe para profissionais autônomos e sem renda fixa mensal — médicos,
            advogados, empresários — que chegaram no momento de efetivamente começar a investir e
            construir patrimônio.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
            {profissoes.map((p) => (
              <span
                key={p.label}
                className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/70"
              >
                <p.icon size={14} className="text-[#1daf66]" />
                {p.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRA QUEM É — fundo branco ──────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">Pra quem é a Orienta</h2>
            <p className="mt-3 text-muted-foreground">
              Se você se reconhece em pelo menos um desses pontos, foi pensando em você que a
              Orienta foi criada.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {perfil.map((item) => (
              <Card key={item.title} className="border-border">
                <CardContent className="pt-8 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                    <item.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── O PROBLEMA — fundo cinza claro ────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: "#f8faf8" }}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">Por que existimos</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Quase todo conteúdo e ferramenta de finanças pessoais parte do mesmo lugar: um
              salário fixo caindo na conta todo mês, 13º, FGTS, INSS descontado automaticamente.
              É um bom ponto de partida — só que não é a sua realidade.
            </p>
            <p>
              Quem vive de honorário, consulta, contrato ou resultado do próprio negócio precisa
              planejar de outro jeito: reservar imposto, lidar com meses de faturamento
              inconsistente e montar sozinho a aposentadoria e a proteção que uma empresa daria 
              a um funcionário CLT.
            </p>
            <p>
              E o momento em que isso passa a importar de verdade normalmente chega depois dos 28
              anos — quando a carreira já rende o suficiente para sobrar dinheiro, e uma família já
              formada ou nos planos muda o peso de cada decisão financeira. A Orienta foi criada
              para essa fase: ferramentas que assumem renda variável desde o primeiro cálculo, não
              como exceção.
            </p>
          </div>

          <div className="mt-8 rounded-lg border border-primary/30 bg-primary/10 p-6">
            <p className="text-sm font-medium text-foreground">
              Nosso ponto de partida não é "quanto você ganha por mês" — é{" "}
              <strong>quanto você precisa guardar, proteger e investir</strong> pra sustentar a
              vida e a família que você está construindo, mesmo com a receita variando.
            </p>
          </div>
        </div>
      </section>


      {/* ─── FERRAMENTAS — fundo cinza claro ───────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: "#f8faf8" }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">Como ajudamos</h2>
            <p className="mt-3 text-muted-foreground">
              Ferramentas práticas pra cada etapa de construir patrimônio por conta própria.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {ferramentas.map((item) => (
              <Link key={item.title} to={item.to} className="group">
                <Card className="h-full border-border transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
                  <CardContent className="flex h-full flex-col pt-8">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                      <item.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-foreground">{item.title}</h3>
                    <p className="mb-4 flex-1 text-sm text-muted-foreground">{item.description}</p>
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-primary">
                      Acessar
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA FINAL — fundo #1A2E35 ─────────────────────────────── */}
      <section className="relative overflow-hidden py-16 md:py-20" style={{ background: "#1A2E35" }}>
        <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#1daf66] opacity-10 blur-[130px]" />

        <div className="relative z-10 mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            Pronto pra dar rumo à sua vida financeira?
          </h2>
          <p className="mt-3 text-white/60">
            Comece pelas ferramentas gratuitas e veja onde você está — e onde pode chegar.
          </p>
          <Button
            asChild
            className="mt-8 rounded-xl bg-[#1daf66] px-8 py-6 text-base font-bold text-white shadow-lg shadow-[#1daf66]/30 transition-all hover:-translate-y-0.5 hover:bg-[#1daf66]/90"
          >
            <Link to="/">
              Explorar ferramentas
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Sobre;
