import { useEffect, useState } from "react";
import { useLocation, Navigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { cn } from "@/lib/utils";
import {
  baixarPdf,
  consultarJob,
  fontesRelatorioCompleto,
  type JobResponse,
} from "@/lib/orienta-dd";
import {
  ShieldCheck,
  ArrowLeft,
  CheckCircle2,
  MinusCircle,
  Loader2,
  Circle,
  AlertTriangle,
  Download,
  PartyPopper,
  Star,
} from "lucide-react";
import {
  toTitleCase,
  formatEndereco,
  formatIndiceCadastral,
  type DadosRelatorio,
} from "./RelatorioAvaliacaoRiscos";

interface ProcessandoState {
  nomeComprador: string;
  nomeSolicitante: string;
  cpfSolicitante: string;
  emailSolicitante: string;
  dadosRelatorio: DadosRelatorio;
  jobId: string;
}

type StepStatus = "pendente" | "em_andamento" | "ok" | "sem_resultado";

// Rótulos batem com FONTE de cada coletor em orienta_dd/coletores/*.py — é o
// que aparece nas linhas de orienta_dd/fila.py:_anotar (job.progresso).
const STEP_DEFS: { chave: string; label: string }[] = [
  { chave: "cpf_situacao", label: "Situação Cadastral do CPF (Receita Federal)" },
  { chave: "cnd_iptu", label: "CND IPTU (PBH)" },
  { chave: "cndt", label: "CND Trabalhista (TST)" },
  { chave: "empresas", label: "CNPJs ligados" },
  { chave: "empresas_cpf", label: "Empresas ligadas (CPF.CNPJ)" },
  { chave: "processos", label: "Processos judiciais" },
];

function statusDoPasso(progresso: string[], label: string): StepStatus {
  const linhaFinal = progresso.find((l) => l.includes(`${label}: `));
  if (linhaFinal) {
    return linhaFinal.includes(": ok") ? "ok" : "sem_resultado";
  }
  if (progresso.some((l) => l.includes(`consultando ${label}`))) return "em_andamento";
  return "pendente";
}

function resultTextDoPasso(progresso: string[], label: string): string | undefined {
  const linha = progresso.find((l) => l.includes(`${label}: `));
  if (!linha) return undefined;
  return linha.slice(linha.indexOf(`${label}: `) + label.length + 2);
}

function statusPdf(progresso: string[], jobStatus: JobResponse["status"] | undefined): StepStatus {
  if (jobStatus === "pronto") return "ok";
  if (progresso.some((l) => l.includes("gerando o PDF"))) return "em_andamento";
  return "pendente";
}

function StepRow({
  label,
  status,
  resultText,
}: {
  label: string;
  status: StepStatus;
  resultText?: string;
}) {
  const icon =
    status === "ok" ? (
      <CheckCircle2 size={18} className="shrink-0 text-[#1daf66]" />
    ) : status === "sem_resultado" ? (
      <MinusCircle size={18} className="shrink-0 text-slate-400" />
    ) : status === "em_andamento" ? (
      <Loader2 size={18} className="shrink-0 animate-spin text-[#1daf66]" />
    ) : (
      <Circle size={18} className="shrink-0 text-slate-300" />
    );

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 transition-all duration-500 ease-out",
        status === "pendente" ? "opacity-40" : "opacity-100",
        status !== "pendente" && "bg-slate-50",
      )}
    >
      <div className="flex items-center gap-2.5">
        {icon}
        <span
          className={cn(
            "text-sm font-medium",
            status === "pendente" ? "text-slate-400" : "text-slate-700",
          )}
        >
          {label}
        </span>
      </div>
      {resultText && (
        <span
          className={cn(
            "text-xs font-semibold",
            status === "ok" ? "text-[#1daf66]" : "text-slate-400",
          )}
        >
          {resultText}
        </span>
      )}
      {status === "em_andamento" && !resultText && (
        <span className="text-xs font-semibold text-[#1daf66]">consultando...</span>
      )}
    </div>
  );
}

export default function RelatorioAvaliacaoRiscosProcessando() {
  const location = useLocation();
  const state = location.state as ProcessandoState | null;

  const [job, setJob] = useState<JobResponse | null>(null);
  const [erroConsulta, setErroConsulta] = useState<string | null>(null);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [baixando, setBaixando] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackTexto, setFeedbackTexto] = useState("");
  const [feedbackNota, setFeedbackNota] = useState(0);
  const [feedbackNotaHover, setFeedbackNotaHover] = useState(0);

  useDocumentMeta(
    "Gerando seu Relatório de Avaliação de Riscos | Orienta",
    "Acompanhe em tempo real a geração do seu Relatório de Avaliação de Riscos.",
  );

  useEffect(() => {
    let tag = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", "robots");
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", "noindex");
    return () => tag?.removeAttribute("content");
  }, []);

  const jobId = state?.jobId;

  // Polling do job real — para sozinho quando ele termina (pronto ou erro).
  useEffect(() => {
    if (!jobId) return;
    let cancelado = false;
    let timer: ReturnType<typeof setTimeout>;

    async function poll() {
      try {
        const atual = await consultarJob(jobId as string);
        if (cancelado) return;
        setJob(atual);
        setErroConsulta(null);
        if (atual.status === "pronto" || atual.status === "erro") return;
      } catch (err) {
        if (cancelado) return;
        setErroConsulta(
          err instanceof Error ? err.message : "Não foi possível consultar o andamento.",
        );
      }
      timer = setTimeout(poll, 3000);
    }
    poll();

    return () => {
      cancelado = true;
      clearTimeout(timer);
    };
  }, [jobId]);

  // Cronômetro local — só decorativo, para o usuário ver que algo está acontecendo.
  useEffect(() => {
    if (job?.status === "pronto" || job?.status === "erro") return;
    const interval = setInterval(() => setElapsedMs((ms) => ms + 500), 500);
    return () => clearInterval(interval);
  }, [job?.status]);

  if (!state?.nomeComprador || !state?.dadosRelatorio || !state?.jobId) {
    return <Navigate to="/relatorio-avaliacao-riscos" replace />;
  }

  const { dadosRelatorio, nomeSolicitante, cpfSolicitante, emailSolicitante } = state;
  const nomeVendedor = toTitleCase(dadosRelatorio.nomeVendedor || state.nomeComprador);
  const endereco = formatEndereco(dadosRelatorio);
  const indiceCadastralTexto = formatIndiceCadastral(dadosRelatorio);
  const pdfFilename = `relatorio_${nomeVendedor.replace(/\s+/g, "_").toLowerCase()}_${jobId}.pdf`;

  const progresso = job?.progresso ?? [];
  const passos = fontesRelatorioCompleto(dadosRelatorio.temIndiceCadastral)
    .map((chave) => STEP_DEFS.find((d) => d.chave === chave))
    .filter((d): d is { chave: string; label: string } => Boolean(d));

  const jobPronto = job?.status === "pronto";
  const jobComErro = job?.status === "erro";
  const pdfStatus = statusPdf(progresso, job?.status);

  async function handleBaixarPdf() {
    if (baixando || !jobId) return;
    setBaixando(true);
    try {
      await baixarPdf(jobId, pdfFilename);
      setFeedbackOpen(false);
    } catch (err) {
      toast(err instanceof Error ? err.message : "Não foi possível baixar o PDF agora.");
    } finally {
      setBaixando(false);
    }
  }

  return (
    <Layout>
      {/* ─── HEADER — fundo #1A2E35 ────────────────────────────────── */}
      <section className="relative overflow-hidden py-10" style={{ background: "#1A2E35" }}>
        <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-[#1daf66] opacity-10 blur-[120px]" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-orange-400 opacity-10 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            to="/relatorio-avaliacao-riscos"
            className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/70 transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft size={14} />
            Nova consulta
          </Link>
          <h1 className="text-2xl font-black text-white md:text-3xl">
            Gerando seu Relatório de Avaliação de Riscos
          </h1>
          <p className="mt-2 text-sm text-white/50">
            Consulta referente a <strong className="text-white/80">{nomeVendedor}</strong>
          </p>
          <p className="mt-1 text-xs text-white/40">
            ID do relatório: <span className="font-mono text-white/70">{jobId}</span>
          </p>
        </div>
      </section>

      {/* ─── CONTEÚDO — fundo cinza claro ───────────────────────────── */}
      <section className="py-16" style={{ background: "#f8faf8" }}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Dados do solicitante */}
          <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-400">
              Dados de quem solicitou
            </h2>
            <dl className="grid gap-3 sm:grid-cols-2">
              <div>
                <dt className="text-xs text-slate-400">Nome completo</dt>
                <dd className="text-sm font-semibold text-slate-800">
                  {toTitleCase(nomeSolicitante) || "não informado"}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-slate-400">CPF</dt>
                <dd className="text-sm font-semibold text-slate-800">
                  {cpfSolicitante || "não informado"}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs text-slate-400">E-mail de envio</dt>
                <dd className="text-sm font-semibold text-slate-800">
                  {emailSolicitante || "não informado"}
                </dd>
              </div>
            </dl>
          </div>

          {/* Dados enviados */}
          <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-400">
              Dados enviados para a consulta
            </h2>
            <dl className="grid gap-3 sm:grid-cols-2">
              <div>
                <dt className="text-xs text-slate-400">Nome completo do proprietário</dt>
                <dd className="text-sm font-semibold text-slate-800">{nomeVendedor}</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-400">CPF do proprietário</dt>
                <dd className="text-sm font-semibold text-slate-800">
                  {dadosRelatorio.cpfVendedor || "não informado"}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs text-slate-400">Endereço do imóvel</dt>
                <dd className="text-sm font-semibold text-slate-800">
                  {endereco || "não informado"}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-slate-400">Índice cadastral do imóvel</dt>
                <dd className="text-sm font-semibold text-slate-800">{indiceCadastralTexto}</dd>
              </div>
            </dl>
            {dadosRelatorio.temIndiceCadastral !== true && (
              <p className="mt-4 border-t border-slate-100 pt-4 text-xs text-slate-500">
                Sem índice cadastral, a CND de IPTU (PBH) não é consultada — as demais fontes
                seguem normalmente.
              </p>
            )}
          </div>

          {/* Progresso da consulta */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#1daf66]/10 text-[#1daf66]">
                {jobPronto ? (
                  <ShieldCheck size={22} />
                ) : jobComErro ? (
                  <AlertTriangle size={22} className="text-orange-500" />
                ) : (
                  <Loader2 size={22} className="animate-spin" />
                )}
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {jobPronto
                    ? "Relatório pronto!"
                    : jobComErro
                      ? "Não foi possível concluir o relatório"
                      : "Consultando fontes oficiais..."}
                </h2>
                <p className="text-xs text-slate-500">
                  Tempo decorrido: {(elapsedMs / 1000).toFixed(0)}s
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              {passos.map((passo) => (
                <StepRow
                  key={passo.chave}
                  label={passo.label}
                  status={statusDoPasso(progresso, passo.label)}
                  resultText={resultTextDoPasso(progresso, passo.label)}
                />
              ))}
            </div>

            <div className="mt-1.5 flex flex-col gap-1.5 border-t border-slate-100 pt-1.5">
              <StepRow label="Gerando o PDF" status={pdfStatus} />
            </div>

            {erroConsulta && (
              <p className="mt-4 text-xs text-slate-400">
                {erroConsulta} — tentando de novo automaticamente.
              </p>
            )}

            {jobComErro && (
              <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl border-2 border-orange-300 bg-orange-50 p-6 text-center">
                <AlertTriangle size={28} className="text-orange-500" />
                <p className="text-sm font-semibold text-slate-800">
                  Algumas fontes não puderam ser consultadas agora.
                </p>
                {job?.erro && <p className="text-xs text-slate-500">{job.erro}</p>}
                <Link
                  to="/relatorio-avaliacao-riscos"
                  className="text-sm font-semibold text-[#1daf66] underline underline-offset-2"
                >
                  Iniciar uma nova consulta
                </Link>
              </div>
            )}

            {jobPronto && (
              <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl border-2 border-[#1daf66] bg-[#1daf66]/5 p-6 text-center">
                <PartyPopper size={28} className="text-[#1daf66]" />
                <p className="text-sm font-semibold text-slate-800">
                  Seu Relatório de Avaliação de Riscos está pronto para download.
                </p>
                <Button
                  onClick={() => setFeedbackOpen(true)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#1daf66] px-8 py-6 text-base font-bold text-white shadow-lg shadow-[#1daf66]/30 transition-all hover:-translate-y-0.5 hover:bg-[#1daf66]/90"
                >
                  <Download size={18} />
                  Baixar PDF
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      <Dialog open={feedbackOpen} onOpenChange={setFeedbackOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>O que você achou da ferramenta?</DialogTitle>
            <DialogDescription>
              Sua opinião nos ajuda a melhorar. As perguntas abaixo são opcionais.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="feedback-nota" className="text-sm font-medium text-slate-700">
                Avalie a ferramenta
              </label>
              <div id="feedback-nota" className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((valor) => {
                  const preenchida = valor <= (feedbackNotaHover || feedbackNota);
                  return (
                    <button
                      key={valor}
                      type="button"
                      onClick={() => setFeedbackNota((atual) => (atual === valor ? 0 : valor))}
                      onMouseEnter={() => setFeedbackNotaHover(valor)}
                      onMouseLeave={() => setFeedbackNotaHover(0)}
                      className="p-0.5 transition-transform hover:scale-110"
                      aria-label={`${valor} de 5 estrelas`}
                    >
                      <Star
                        size={26}
                        className={cn(
                          "transition-colors",
                          preenchida ? "fill-[#1daf66] text-[#1daf66]" : "fill-transparent text-slate-300",
                        )}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="feedback-texto" className="text-sm font-medium text-slate-700">
                O que está achando da ferramenta?
              </label>
              <Textarea
                id="feedback-texto"
                value={feedbackTexto}
                onChange={(e) => setFeedbackTexto(e.target.value)}
                placeholder="Conte pra gente sua experiência (opcional)"
                rows={3}
              />
            </div>

            <Button
              onClick={handleBaixarPdf}
              disabled={baixando}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#1daf66] py-6 text-base font-bold text-white shadow-lg shadow-[#1daf66]/30 transition-all hover:-translate-y-0.5 hover:bg-[#1daf66]/90 disabled:opacity-70"
            >
              <Download size={18} />
              {baixando ? "Baixando..." : "Baixar PDF"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
