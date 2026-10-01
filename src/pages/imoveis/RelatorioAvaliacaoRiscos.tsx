import { useState, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { Turnstile } from "@/components/Turnstile";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LucideIcon } from "lucide-react";
import casaRiscoImg from "@/assets/casa-risco.webp";
import { EMPRESA, WHATSAPP_URL } from "@/lib/empresa";
import {
  ShieldCheck,
  Search,
  Gavel,
  Building2,
  CheckCircle2,
  ArrowRight,
  Clock,
  Lock,
  FileCheck2,
  BadgeCheck,
  FileSearch,
  Loader2,
  AlertTriangle,
} from "lucide-react";

export function toTitleCase(value: string) {
  return value
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function waLink(message: string) {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}

export const CTA_MESSAGE =
  "Olá, vim pelo site e gostaria de solicitar o Relatório de Avaliação de Riscos";

export interface DadosRelatorio {
  nomeVendedor: string;
  cpfVendedor: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  indiceCadastral: string;
  temIndiceCadastral: boolean | null;
}

export function formatEndereco(dados: DadosRelatorio) {
  return [
    [dados.rua, dados.numero].filter(Boolean).join(", "),
    dados.bairro,
    [dados.cidade, dados.estado].filter(Boolean).join(" - "),
    dados.cep,
  ]
    .filter(Boolean)
    .join(", ");
}

export function formatIndiceCadastral(dados: DadosRelatorio) {
  return dados.temIndiceCadastral === true
    ? dados.indiceCadastral || "não informado"
    : dados.temIndiceCadastral === false
      ? "não possui — será informado depois"
      : "não informado";
}

export function verificacaoWaLink(
  nomeComprador: string,
  nomeSolicitante: string,
  emailSolicitante: string,
  dados?: DadosRelatorio,
) {
  let mensagem = `Olá, meu nome é ${nomeSolicitante} (${emailSolicitante}) e gostaria de solicitar o Relatório de Avaliação de Riscos para verificar "${nomeComprador}" antes de fechar negócio.`;

  if (dados) {
    const endereco = formatEndereco(dados);
    const indiceCadastralTexto = formatIndiceCadastral(dados);

    mensagem += `\n\nDados para o relatório:\n- Nome completo do vendedor: ${dados.nomeVendedor || "não informado"}\n- CPF do vendedor: ${dados.cpfVendedor || "não informado"}\n- Endereço do imóvel: ${endereco || "não informado"}\n- Índice cadastral do imóvel: ${indiceCadastralTexto}`;
  }

  return waLink(mensagem);
}

// Situações reais, descritas com nossas palavras — sem reproduzir manchetes,
// logotipos ou layout de veículos de imprensa.
export const noticias = [
  {
    title: "Comprador herda dívidas do antigo dono",
    description:
      "Débitos ligados ao imóvel, como IPTU e condomínio, acompanham o bem e podem ser cobrados de quem compra — mesmo que tenham sido feitos antes da venda.",
  },
  {
    title: "Imóvel pago à vista vai a leilão",
    description:
      "Quando o vendedor ou a construtora tem dívidas e o imóvel está dado em garantia ou penhorado, o comprador pode perder o bem mesmo após quitar o pagamento.",
  },
];

export function NoticiasRiscos() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {noticias.map((n) => (
        <div
          key={n.title}
          className="flex items-start gap-4 rounded-2xl border border-orange-100 bg-orange-50/50 p-6 shadow-sm"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
            <AlertTriangle size={22} />
          </div>
          <div>
            <h3 className="mb-1.5 text-base font-bold text-slate-900">{n.title}</h3>
            <p className="text-sm text-slate-600">{n.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Aviso exibido logo acima de todo formulário que coleta dados para o
 * relatório: quem opera o serviço, que não é órgão público, por que os
 * dados são pedidos e como são protegidos.
 */
export function AvisoTransparencia({ className, dark = false }: { className?: string; dark?: boolean }) {
  return (
    <div
      className={`rounded-xl border p-4 text-left text-xs leading-relaxed ${
        dark
          ? "border-orange-300/40 bg-orange-400/10 text-white/75"
          : "border-orange-200 bg-orange-50 text-slate-700"
      } ${className ?? ""}`}
    >
      <p className={`mb-1.5 flex items-center gap-1.5 text-sm font-bold ${dark ? "text-white" : "text-slate-900"}`}>
        <ShieldCheck size={16} className="shrink-0 text-[#1daf66]" />
        Serviço privado e independente
      </p>
      <p>
        O Relatório é um serviço da {EMPRESA.marca}, operado por {EMPRESA.responsavel} (CPF{" "}
        {EMPRESA.cpf}). <strong>Não somos órgão público</strong> e não temos vínculo com
        Receita Federal, tribunais, cartórios ou prefeituras — apenas consultamos informações
        que eles disponibilizam publicamente.
      </p>
      <p className="mt-1.5">
        Os dados do proprietário servem só para essa pesquisa; os seus, para enviarmos o
        relatório. Não compartilhamos com terceiros nem avisamos o proprietário. Nunca pedimos
        senhas, cartão ou dados bancários.{" "}
        <Link
          to="/politica-de-privacidade"
          className={`font-semibold underline underline-offset-2 ${dark ? "text-white" : "text-[#1daf66]"}`}
        >
          Política de Privacidade
        </Link>{" "}
        ·{" "}
        <Link
          to="/termos-de-uso"
          className={`font-semibold underline underline-offset-2 ${dark ? "text-white" : "text-[#1daf66]"}`}
        >
          Termos de Uso
        </Link>
      </p>
    </div>
  );
}

export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const incluso: FeatureItem[] = [
  {
    icon: FileCheck2,
    title: "Certidões negativas de débito",
    description: "Receita Federal, Estadual, Municipal, Trabalhista e Justiça Federal.",
  },
  {
    icon: Gavel,
    title: "Processos judiciais relevantes",
    description: "Levantamento de ações vinculadas ao CPF ou CNPJ do proprietário.",
  },
  {
    icon: Building2,
    title: "Empresas relacionadas",
    description: "Sociedades, CNPJs e vínculos societários ligados ao vendedor.",
  },
];

export const passos = [
  {
    icon: Search,
    title: "Você envia os dados",
    description: "Nome e CPF do proprietário e o endereço do imóvel.",
  },
  {
    icon: FileSearch,
    title: "Consultamos fontes públicas",
    description: "Verificamos certidões e processos disponíveis publicamente em órgãos oficiais.",
  },
  {
    icon: ShieldCheck,
    title: "Você recebe o relatório",
    description: "Classificação clara de risco, um PDF em até 24h úteis.",
  },
];

export const faq = [
  {
    question: "A Orienta é um órgão do governo?",
    answer:
      "Não. A Orienta é um serviço independente de educação e orientação financeira, sem vínculo com Receita Federal, tribunais, cartórios ou prefeituras. Nós apenas reunimos informações que esses órgãos disponibilizam publicamente.",
  },
  {
    question: "Quais dados vocês pedem?",
    answer:
      "Seu nome e e-mail (para identificar a solicitação e enviar o relatório), o nome e CPF do proprietário e o endereço do imóvel. Nunca pedimos senhas, dados de cartão, dados bancários ou acesso à sua conta gov.br.",
  },
  {
    question: "É legal solicitar esse tipo de consulta?",
    answer:
      "Sim. O relatório é montado apenas a partir de informações públicas — certidões, tribunais e cartórios — o mesmo tipo de checagem que um advogado faria antes de fechar um negócio.",
  },
  {
    question: "Quanto tempo leva para ficar pronto?",
    answer:
      "Em até 24h úteis após o envio dos dados do proprietário e, quando disponível, da matrícula do imóvel.",
  },
  {
    question: "A consulta é sigilosa?",
    answer:
      "O relatório é entregue somente para você, em PDF, e o proprietário não é avisado da consulta. Os dados são usados apenas para gerar o relatório — veja os detalhes na nossa Política de Privacidade.",
  },
  {
    question: "Funciona para qualquer imóvel ou estado?",
    answer:
      "Sim, consultamos fontes federais e, sempre que disponíveis, estaduais e municipais do local do imóvel ou do domicílio do proprietário.",
  },
  {
    question: "E se o relatório encontrar um problema grave?",
    answer:
      "Você recebe o parecer com a explicação do risco encontrado e pode usá-lo para renegociar, pedir garantias adicionais ou desistir do negócio com segurança.",
  },
];

interface ConsultaFormProps {
  nomeComprador: string;
  setNomeComprador: (v: string) => void;
  verificando: boolean;
  captchaToken: string | null;
  setCaptchaToken: (token: string | null) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export function ConsultaForm({
  nomeComprador,
  setNomeComprador,
  verificando,
  captchaToken,
  setCaptchaToken,
  onSubmit,
}: ConsultaFormProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <AvisoTransparencia dark />
      <div className="flex flex-col gap-1.5 text-left">
        <input
          type="text"
          required
          value={nomeComprador}
          onChange={(e) => setNomeComprador(toTitleCase(e.target.value))}
          placeholder="Nome completo do proprietário"
          className="h-14 w-full rounded-xl border border-white/15 bg-white/5 px-4 text-white placeholder:text-white/40 outline-none transition-colors focus:border-[#1daf66] focus:bg-white/10"
        />
      </div>
      <Turnstile
        className="flex justify-center"
        onVerify={setCaptchaToken}
        onExpire={() => setCaptchaToken(null)}
      />
      <Button
        type="submit"
        disabled={verificando || !captchaToken}
        className="flex h-14 items-center justify-center gap-2 rounded-xl bg-[#1daf66] px-8 text-lg font-bold text-white shadow-xl shadow-[#1daf66]/30 transition-all hover:-translate-y-1 hover:bg-[#1daf66]/90 disabled:opacity-70 disabled:hover:translate-y-0"
      >
        {verificando && <Loader2 size={18} className="animate-spin" />}
        {verificando ? "Consultando processos..." : "Consultar"}
        {!verificando && <ArrowRight size={18} />}
      </Button>
      {verificando && (
        <p className="text-center text-xs text-white/40">
          Isso pode levar até 1 minuto — não feche esta página.
        </p>
      )}
    </form>
  );
}

export default function RelatorioAvaliacaoRiscos() {
  useDocumentMeta(
    "Relatório de Avaliação de Riscos na Compra de Imóvel | Orienta",
    "Consulte certidões, processos judiciais e empresas relacionadas ao vendedor antes de fechar negócio, com o Relatório de Avaliação de Riscos da Orienta.",
  );

  const navigate = useNavigate();
  const [nomeComprador, setNomeComprador] = useState("");
  const [verificando, setVerificando] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleVerificar = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!nomeComprador.trim() || !captchaToken || verificando) return;
    setVerificando(true);
    // A consulta de processos é feita na própria página de resultado, para o
    // usuário já ser levado para lá em vez de esperar aqui.
    navigate("/relatorio-avaliacao-riscos/resultado", {
      state: { nomeComprador: nomeComprador.trim() },
    });
  };

  return (
    <Layout>
      {/* ─── HERO — fundo #1A2E35 ──────────────────────────────────── */}
      <section className="relative overflow-hidden pt-10 pb-20 lg:py-28" style={{ background: "#1A2E35" }}>
        <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-[#1daf66] opacity-10 blur-[120px]" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-orange-400 opacity-10 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-6 lg:gap-12 lg:grid-cols-2">
            {/* Left */}
            <div className="flex flex-col gap-6 text-center lg:text-left">
              <h1 className="text-4xl font-black leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
                Não perca seu sonho{" "}
                <span className="bg-gradient-to-r from-[#1daf66] to-emerald-400 bg-clip-text text-transparent">
                  para perigos ocultos.
                </span>
              </h1>

              <p className="mx-auto max-w-xl text-lg text-white/55 lg:mx-0">
                Dívidas, penhoras e processos. Não perca sua nova residência.
                Cruzamos dados do <strong className="font-bold text-white">proprietário </strong> 
                 e do imóvel, para você não ter surpresas.
              </p>

              <div className="flex flex-col items-center gap-3 text-sm text-white/40 sm:flex-row sm:justify-center lg:justify-start">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-[#1daf66]" />
                  Pronto em até 24h úteis
                </span>
                <span className="hidden sm:inline">·</span>
                <span className="flex items-center gap-1.5">
                  <Lock className="h-4 w-4 text-[#1daf66]" />
                  Somente fontes públicas
                </span>
              </div>
            </div>

            {/* Right — imagem + formulário de consulta */}
            <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-8">
              <div className="relative w-full order-2 lg:order-1">
                <div className="pointer-events-none absolute inset-0 rounded-full bg-[#1daf66]/10 blur-3xl" />
                <img
                  src={casaRiscoImg}
                  alt="Casa com alerta de risco"
                  className="relative mx-auto w-full max-w-xs drop-shadow-2xl"
                />
              </div>

              <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl order-1 lg:order-2">
                <ConsultaForm
                  nomeComprador={nomeComprador}
                  setNomeComprador={setNomeComprador}
                  verificando={verificando}
                  captchaToken={captchaToken}
                  setCaptchaToken={setCaptchaToken}
                  onSubmit={handleVerificar}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── RISCOS — fundo branco ─────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 space-y-4 text-center">
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              Sem checar, o que pode dar errado
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              Não é exagero — casos assim viram notícia toda semana.
            </p>
          </div>

          <NoticiasRiscos />
        </div>
      </section>

      {/* ─── O QUE ESTÁ INCLUSO — fundo laranja escuro ────────────── */}
      <section className="relative overflow-hidden py-24" style={{ background: "#B4520E" }}>
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-orange-300 opacity-10 blur-[110px]" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-orange-200 opacity-10 blur-[110px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 space-y-4 text-center">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Um relatório, uma consulta completa
            </h2>
            <p className="mx-auto max-w-2xl text-white/70">
              Tudo o que verificamos nas fontes originais, antes do parecer final de risco.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {incluso.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="rounded-2xl border border-white/10 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#f97316]/10 text-[#f97316]">
                    <Icon size={22} />
                  </div>
                  <h3 className="mb-1.5 text-base font-bold text-slate-900">{f.title}</h3>
                  <p className="text-sm text-slate-600">{f.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── COMO FUNCIONA — fundo #1A2E35 ────────────────────────── */}
      <section className="py-24" style={{ background: "#1A2E35" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-16 text-center text-3xl font-black text-white md:text-4xl">
            Como funciona
          </h2>

          <div className="grid gap-10 md:grid-cols-3">
            {passos.map((p, i) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="flex flex-col items-center text-center">
                  <div className="relative mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#1daf66]/15 text-[#1daf66]">
                    <Icon size={26} />
                    <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#1daf66] text-xs font-black text-white">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-white">{p.title}</h3>
                  <p className="max-w-xs text-sm text-white/50">{p.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── PREÇO — fundo branco ──────────────────────────────────── */}
      <section className="bg-white py-24" id="solicitar">
        <div className="mx-auto max-w-lg px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
            <div className="mb-6 flex items-start justify-between">
              <div className="rounded-xl bg-[#1daf66]/10 p-3 text-[#1daf66]">
                <ShieldCheck size={28} />
              </div>
              <span className="rounded-full bg-[#1daf66] px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white">
                Relatório completo
              </span>
            </div>

            <h3 className="mb-2 text-2xl font-bold text-slate-900">
              Relatório de Avaliação de Riscos
            </h3>
            <p className="mb-6 text-slate-600">
              Um parecer completo sobre o vendedor e o imóvel antes de você assinar qualquer
              papel.
            </p>

           
           {/*<div className="mb-8 flex items-baseline gap-1">
              <span className="text-sm font-bold uppercase text-[#1daf66]">R$</span>
              <span className="text-4xl font-black text-slate-900">149</span>
              <span className="ml-1 text-sm text-slate-500">/por consulta</span>
            </div>*/}

            <ul className="mb-10 flex flex-col gap-4">
              {[
                "Certidões negativas de débito",
                "Processos judiciais relevantes",
                "Empresas relacionadas ao proprietário",
                "Situação do imóvel na prefeitura",
                "Parecer final de risco com recomendação",
                "Entrega em PDF em até 24h úteis",
              ].map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-slate-700">
                  <CheckCircle2 size={18} className="shrink-0 text-[#1daf66]" />
                  {f}
                </li>
              ))}
            </ul>

            <Button
              onClick={() => setModalOpen(true)}
              className="flex w-full items-center justify-center gap-2 rounded-xl py-6 text-base font-bold text-white transition-all hover:opacity-90"
              style={{ background: "#1A2E35" }}
            >
              Solicitar Relatório
              <ArrowRight size={18} />
            </Button>

            <p className="mt-4 text-center text-xs text-slate-400">
            </p>
          </div>
        </div>
      </section>

      {/* ─── FAQ — fundo cinza claro ───────────────────────────────── */}
      <section className="py-24" style={{ background: "#f8faf8" }}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center text-3xl font-bold text-slate-900 md:text-4xl">
            Perguntas frequentes
          </h2>

          <Accordion type="single" collapsible className="rounded-2xl border border-slate-200 bg-white px-6">
            {faq.map((item, i) => (
              <AccordionItem key={item.question} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-slate-900">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ─── CTA BANNER — fundo #1daf66 ──────────────────────────── */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-[#1daf66] p-8 text-center text-white shadow-2xl shadow-[#1daf66]/20 md:p-16">
            <div className="pointer-events-none absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white,_transparent_70%)]" />
            <h2 className="relative z-10 mb-6 text-3xl font-black md:text-5xl">
              Não assine nada sem checar antes.
            </h2>
            <p className="relative z-10 mx-auto mb-10 max-w-2xl text-lg text-white/90">
              Em até 24h você recebe o parecer completo e negocia com muito mais segurança.
            </p>
            <div className="relative z-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                onClick={() => setModalOpen(true)}
                className="rounded-xl px-10 py-6 text-lg font-bold shadow-xl transition-all hover:-translate-y-1"
                style={{ background: "#1A2E35", color: "#ffffff" }}
              >
                Quero meu relatório
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MODAL — formulário de consulta ────────────────────────── */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-md border-white/10 bg-[#1A2E35] text-white sm:rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">
              Solicitar Relatório de Avaliação de Riscos
            </DialogTitle>
            <DialogDescription className="text-white/60">
              Preencha os dados abaixo para começarmos sua consulta.
            </DialogDescription>
          </DialogHeader>
          <ConsultaForm
            nomeComprador={nomeComprador}
            setNomeComprador={setNomeComprador}
            verificando={verificando}
            captchaToken={captchaToken}
            setCaptchaToken={setCaptchaToken}
            onSubmit={handleVerificar}
          />
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
