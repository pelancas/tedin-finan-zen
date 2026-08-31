import { useEffect, useState } from "react";
import { useLocation, Navigate, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { cn } from "@/lib/utils";
import { downloadBlankPdf } from "@/lib/blank-pdf";
import {
  ShieldCheck,
  ArrowLeft,
  CheckCircle2,
  MinusCircle,
  Loader2,
  Circle,
  Download,
  PartyPopper,
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
}

type StepStatus = "pendente" | "em_andamento" | "ok" | "sem_resultado";

interface StepConfig {
  key: string;
  label: string;
  startAtMs: number;
  doneAtMs: number;
  finalStatus: "ok" | "sem_resultado";
  resultText: string;
}

interface FinalStepConfig {
  key: string;
  label: string;
  startAtMs: number;
  doneAtMs: number;
}

const STEPS: StepConfig[] = [
  {
    key: "cpf",
    label: "Situação Cadastral do CPF (Receita Federal)",
    startAtMs: 0,
    doneAtMs: 1600,
    finalStatus: "ok",
    resultText: "ok (2s)",
  },
  {
    key: "iptu",
    label: "CND IPTU (PBH)",
    startAtMs: 100,
    doneAtMs: 400,
    finalStatus: "sem_resultado",
    resultText: "sem resultado (0s)",
  },
  {
    key: "trabalhista",
    label: "CND Trabalhista (TST)",
    startAtMs: 200,
    doneAtMs: 11000,
    finalStatus: "sem_resultado",
    resultText: "sem resultado (99s)",
  },
  {
    key: "cnpjs",
    label: "CNPJs ligados",
    startAtMs: 300,
    doneAtMs: 2200,
    finalStatus: "ok",
    resultText: "ok (1s)",
  },
  {
    key: "processos",
    label: "Processos judiciais",
    startAtMs: 400,
    doneAtMs: 6200,
    finalStatus: "ok",
    resultText: "ok (42s)",
  },
];

const FINAL_STEPS: FinalStepConfig[] = [
  { key: "pdf", label: "Gerando o PDF", startAtMs: 11200, doneAtMs: 13800 },
];

const PDF_PRONTO_MS = 13800;
const JOB_PRONTO_MS = 14200;
const PDF_FILENAME = "relatorio_due_diligence.pdf";

const REPORT_ID_ALPHABET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function generateReportId(length = 21) {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => REPORT_ID_ALPHABET[b % REPORT_ID_ALPHABET.length]).join("");
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
      {status === "em_andamento" && (
        <span className="text-xs font-semibold text-[#1daf66]">consultando...</span>
      )}
    </div>
  );
}

export default function RelatorioAvaliacaoRiscosProcessando() {
  const location = useLocation();
  const state = location.state as ProcessandoState | null;

  const [elapsedMs, setElapsedMs] = useState(0);
  const [jobPronto, setJobPronto] = useState(false);
  const [reportId] = useState(() => generateReportId());

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

  useEffect(() => {
    const interval = setInterval(() => setElapsedMs((ms) => ms + 200), 200);
    const timeout = setTimeout(() => {
      setJobPronto(true);
      clearInterval(interval);
    }, JOB_PRONTO_MS);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  if (!state?.nomeComprador || !state?.dadosRelatorio) {
    return <Navigate to="/relatorio-avaliacao-riscos" replace />;
  }

  const { dadosRelatorio, nomeSolicitante, cpfSolicitante, emailSolicitante } = state;
  const nomeVendedor = toTitleCase(dadosRelatorio.nomeVendedor || state.nomeComprador);
  const endereco = formatEndereco(dadosRelatorio);
  const indiceCadastralTexto = formatIndiceCadastral(dadosRelatorio);

  function statusFor(startAtMs: number, doneAtMs: number): "pendente" | "em_andamento" | "concluido" {
    if (elapsedMs >= doneAtMs) return "concluido";
    if (elapsedMs >= startAtMs) return "em_andamento";
    return "pendente";
  }

  const pdfProntoDone = elapsedMs >= PDF_PRONTO_MS;

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
            ID do relatório: <span className="font-mono text-white/70">{reportId}</span>
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
          </div>

          {/* Progresso da consulta */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#1daf66]/10 text-[#1daf66]">
                {jobPronto ? <ShieldCheck size={22} /> : <Loader2 size={22} className="animate-spin" />}
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {jobPronto ? "Relatório pronto!" : "Consultando fontes oficiais..."}
                </h2>
                <p className="text-xs text-slate-500">
                  Tempo decorrido: {(elapsedMs / 1000).toFixed(1)}s
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              {STEPS.map((step) => {
                const st = statusFor(step.startAtMs, step.doneAtMs);
                const status: StepStatus =
                  st === "concluido" ? step.finalStatus : st === "em_andamento" ? "em_andamento" : "pendente";
                return (
                  <StepRow
                    key={step.key}
                    label={step.label}
                    status={status}
                    resultText={status === "ok" || status === "sem_resultado" ? step.resultText : undefined}
                  />
                );
              })}
            </div>

            <div className="mt-1.5 flex flex-col gap-1.5 border-t border-slate-100 pt-1.5">
              {FINAL_STEPS.map((step) => {
                const st = statusFor(step.startAtMs, step.doneAtMs);
                const status: StepStatus = st === "concluido" ? "ok" : st === "em_andamento" ? "em_andamento" : "pendente";
                return <StepRow key={step.key} label={step.label} status={status} />;
              })}
              <StepRow
                label={`PDF pronto: ${PDF_FILENAME}`}
                status={pdfProntoDone ? "ok" : "pendente"}
              />
            </div>

            {jobPronto && (
              <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl border-2 border-[#1daf66] bg-[#1daf66]/5 p-6 text-center">
                <PartyPopper size={28} className="text-[#1daf66]" />
                <p className="text-sm font-semibold text-slate-800">
                  Seu Relatório de Avaliação de Riscos está pronto para download.
                </p>
                <Button
                  onClick={() => downloadBlankPdf(PDF_FILENAME)}
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
    </Layout>
  );
}
