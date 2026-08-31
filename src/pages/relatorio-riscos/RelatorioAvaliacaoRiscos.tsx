import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { Turnstile } from "@/components/Turnstile";
import { maskCPF } from "@/lib/masks";
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
import noticiaHerancaDividaImg from "@/assets/noticia-heranca-divida.webp";
import noticiaLeilaoImovelImg from "@/assets/noticia-leilao-imovel.webp";
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
} from "lucide-react";

export function toTitleCase(value: string) {
  return value
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export const WHATSAPP_NUMBER = "5531971778537";

export function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
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

export const noticias = [
  {
    image: noticiaHerancaDividaImg,
    alt: "Manchete: Comprador herda débitos acumulados em aluguéis após aquisição de imóvel",
  },
  {
    image: noticiaLeilaoImovelImg,
    alt: "Manchete: Ele comprou apartamento à vista, mas imóvel vai a leilão",
  },
];

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
    description: "Nome, CPF do proprietário e, dados do imóvel.",
  },
  {
    icon: FileSearch,
    title: "Cruzamos as fontes oficiais",
    description: "Nossos sistemas consultam certidões, tribunais e cartórios envolvidos.",
  },
  {
    icon: ShieldCheck,
    title: "Você recebe o relatório",
    description: "Classificação clara de risco, um PDF em até 24h úteis.",
  },
];

export const faq = [
  {
    question: "É legal solicitar esse tipo de consulta?",
    answer:
      "Sim. O relatório é montado a partir de fontes públicas e oficiais — certidões, tribunais e cartórios — o mesmo tipo de checagem que um advogado faria antes de fechar um negócio.",
  },
  {
    question: "Quanto tempo leva para ficar pronto?",
    answer:
      "Em até 24h úteis após o envio dos dados do proprietário e, quando disponível, da matrícula do imóvel.",
  },
  {
    question: "A consulta é sigilosa?",
    answer:
      "Sim. O relatório é enviado somente para você, em PDF, e nenhum dado é compartilhado com o proprietário ou terceiros.",
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
  nomeSolicitante: string;
  setNomeSolicitante: (v: string) => void;
  cpfSolicitante: string;
  setCpfSolicitante: (v: string) => void;
  emailSolicitante: string;
  setEmailSolicitante: (v: string) => void;
  verificando: boolean;
  captchaToken: string | null;
  setCaptchaToken: (token: string | null) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export function ConsultaForm({
  nomeComprador,
  setNomeComprador,
  nomeSolicitante,
  setNomeSolicitante,
  cpfSolicitante,
  setCpfSolicitante,
  emailSolicitante,
  setEmailSolicitante,
  verificando,
  captchaToken,
  setCaptchaToken,
  onSubmit,
}: ConsultaFormProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <input
        type="text"
        required
        value={nomeSolicitante}
        onChange={(e) => setNomeSolicitante(e.target.value)}
        placeholder="Seu nome"
        className="h-14 w-full rounded-xl border border-white/15 bg-white/5 px-4 text-white placeholder:text-white/40 outline-none transition-colors focus:border-[#1daf66] focus:bg-white/10"
      />
      <input
        type="text"
        required
        inputMode="numeric"
        value={cpfSolicitante}
        onChange={(e) => setCpfSolicitante(maskCPF(e.target.value))}
        placeholder="Seu CPF"
        className="h-14 w-full rounded-xl border border-white/15 bg-white/5 px-4 text-white placeholder:text-white/40 outline-none transition-colors focus:border-[#1daf66] focus:bg-white/10"
      />
      <input
        type="email"
        required
        value={emailSolicitante}
        onChange={(e) => setEmailSolicitante(e.target.value)}
        placeholder="Seu email"
        className="h-14 w-full rounded-xl border border-white/15 bg-white/5 px-4 text-white placeholder:text-white/40 outline-none transition-colors focus:border-[#1daf66] focus:bg-white/10"
      />
      <div className="flex flex-col gap-1.5 text-left">
        <label className="text-sm font-medium text-white/70">
          Nome completo do proprietário para consulta:
        </label>
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
        {verificando ? "Verificando..." : "Consultar"}
        {!verificando && <ArrowRight size={18} />}
      </Button>
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
  const [nomeSolicitante, setNomeSolicitante] = useState("");
  const [cpfSolicitante, setCpfSolicitante] = useState("");
  const [emailSolicitante, setEmailSolicitante] = useState("");
  const [verificando, setVerificando] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleVerificar = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !nomeComprador.trim() ||
      !nomeSolicitante.trim() ||
      !cpfSolicitante.trim() ||
      !emailSolicitante.trim() ||
      !captchaToken ||
      verificando
    )
      return;
    setVerificando(true);
    setTimeout(() => {
      navigate("/relatorio-avaliacao-riscos/resultado", {
        state: {
          nomeComprador: nomeComprador.trim(),
          nomeSolicitante: nomeSolicitante.trim(),
          cpfSolicitante: cpfSolicitante.trim(),
          emailSolicitante: emailSolicitante.trim(),
        },
      });
    }, 1400);
  };

  return (
    <Layout>
      {/* ─── HERO — fundo #1A2E35 ──────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 lg:py-28" style={{ background: "#1A2E35" }}>
        <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-[#1daf66] opacity-10 blur-[120px]" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-orange-400 opacity-10 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left */}
            <div className="flex flex-col gap-6 text-center lg:text-left">
              <h1 className="text-4xl font-black leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
                Não perca seu sonho{" "}
                <span className="bg-gradient-to-r from-[#1daf66] to-emerald-400 bg-clip-text text-transparent">
                  para perigos ocultos.
                </span>
              </h1>

              <p className="mx-auto max-w-xl text-lg text-white/55 lg:mx-0">
                Dívidas, penhoras e processos, tudo isso pode fazer com que você perca sua residência.
                Cruzamos dados do <strong className="font-bold text-white">proprietário</strong> em fontes oficiais e entregamos um relatório
                completo sobre ele e o imóvel, para você não ter surpresas.
              </p>

              <div className="flex flex-col items-center gap-3 text-sm text-white/40 sm:flex-row sm:justify-center lg:justify-start">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-[#1daf66]" />
                  Pronto em até 24h úteis
                </span>
                <span className="hidden sm:inline">·</span>
                <span className="flex items-center gap-1.5">
                  <Lock className="h-4 w-4 text-[#1daf66]" />
                  100% sigiloso
                </span>
              </div>
            </div>

            {/* Right — imagem + formulário de consulta */}
            <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-8">
              <div className="relative w-full">
                <div className="pointer-events-none absolute inset-0 rounded-full bg-[#1daf66]/10 blur-3xl" />
                <img
                  src={casaRiscoImg}
                  alt="Casa com alerta de risco"
                  className="relative mx-auto w-full max-w-xs drop-shadow-2xl"
                />
              </div>

              <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl">
                <ConsultaForm
                  nomeComprador={nomeComprador}
                  setNomeComprador={setNomeComprador}
                  nomeSolicitante={nomeSolicitante}
                  setNomeSolicitante={setNomeSolicitante}
                  cpfSolicitante={cpfSolicitante}
                  setCpfSolicitante={setCpfSolicitante}
                  emailSolicitante={emailSolicitante}
                  setEmailSolicitante={setEmailSolicitante}
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

          <div className="grid gap-6 sm:grid-cols-2">
            {noticias.map((n) => (
              <div
                key={n.image}
                className="overflow-hidden rounded-2xl border border-orange-100 bg-orange-50/50 p-3 shadow-sm"
              >
                <img
                  src={n.image}
                  alt={n.alt}
                  className="w-full rounded-lg border border-slate-200"
                />
              </div>
            ))}
          </div>
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
            nomeSolicitante={nomeSolicitante}
            setNomeSolicitante={setNomeSolicitante}
            cpfSolicitante={cpfSolicitante}
            setCpfSolicitante={setCpfSolicitante}
            emailSolicitante={emailSolicitante}
            setEmailSolicitante={setEmailSolicitante}
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
