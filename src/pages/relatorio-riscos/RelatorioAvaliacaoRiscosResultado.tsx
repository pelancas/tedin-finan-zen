import { useEffect, useState, type ReactNode } from "react";
import { useLocation, Navigate, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useInView } from "@/hooks/use-in-view";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { cn } from "@/lib/utils";
import {
  ShieldCheck,
  FileCheck2,
  Gavel,
  Building2,
  Lock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  User,
} from "lucide-react";
import {
  incluso,
  noticias,
  passos,
  faq,
  waLink,
  verificacaoWaLink,
  CTA_MESSAGE,
} from "./RelatorioAvaliacaoRiscos";

interface ResultadoState {
  nomeComprador: string;
  nomeSolicitante: string;
  emailSolicitante: string;
}

const certidoes = [
  "Receita Federal",
  "Receita Estadual",
  "Receita Municipal",
  "Justiça do Trabalho",
  "Justiça Federal",
];

function hashString(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function RevealTitle({
  as: Tag = "h2",
  className,
  children,
}: {
  as?: "h2" | "h3";
  className?: string;
  children: ReactNode;
}) {
  const { ref, inView } = useInView<HTMLHeadingElement>();
  return (
    <Tag
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

function RevealBox({ className, children }: { className?: string; children: ReactNode }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default function RelatorioAvaliacaoRiscosResultado() {
  const location = useLocation();
  const state = location.state as ResultadoState | null;

  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useDocumentMeta(
    state?.nomeComprador
      ? `Prévia da consulta: ${state.nomeComprador} | Orienta`
      : "Prévia da consulta | Orienta",
    "Prévia da consulta de avaliação de riscos. Solicite o relatório completo para ver certidões, processos e empresas relacionadas ao vendedor.",
  );

  // Página gerada a partir de dados de formulário — não é um destino de busca útil.
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

  if (!state?.nomeComprador || !state?.nomeSolicitante || !state?.emailSolicitante) {
    return <Navigate to="/relatorio-avaliacao-riscos" replace />;
  }

  const { nomeComprador, nomeSolicitante, emailSolicitante } = state;

  const CERT_STEP_MS = 90;
  const empresasDelayMs = certidoes.length * CERT_STEP_MS + 150;
  const processosDelayMs = empresasDelayMs + 200;

  const processosEncontrados = hashString(nomeComprador.toLowerCase()) % 6;
  const temProcessos = processosEncontrados > 0;
  const processosPreview = Array.from(
    { length: Math.min(processosEncontrados, 4) },
    (_, i) => i + 1,
  );

  const consultas = [
    {
      icon: Building2,
      title: "Empresas relacionadas",
      description: "Sociedades, CNPJs e vínculos societários ligados ao vendedor.",
    },
  ];

  return (
    <Layout>
      {/* ─── HEADER — fundo #1A2E35 ────────────────────────────────── */}
      <section className="relative overflow-hidden py-10" style={{ background: "#1A2E35" }}>
        <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-[#1daf66] opacity-10 blur-[120px]" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-orange-400 opacity-10 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Link
            to="/relatorio-avaliacao-riscos"
            className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/70 transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft size={14} />
            Nova consulta
          </Link>
        </div>
      </section>

      {/* ─── RESULTADOS — fundo cinza claro ───────────────────────── */}
      <section className="py-16" style={{ background: "#f8faf8" }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-5">
            {/* Esquerda — o que verificamos */}
            <div className="flex flex-col gap-4 lg:col-span-3">
              <div className="flex items-center gap-3 rounded-2xl border-2 border-[#1daf66] bg-[#1daf66]/5 px-5 py-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#1daf66] text-white">
                  <User size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-[#1daf66]">
                    Consulta referente a
                  </p>
                  <p className="text-xl font-black leading-tight text-slate-900 md:text-2xl">
                    {nomeComprador}
                  </p>
                </div>
              </div>

              {/* Certidões negativas — lista vertical */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                    <FileCheck2 size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-slate-900">
                      Certidões negativas de débito
                    </h3>
                    <p className="text-sm text-slate-600">
                      Consultadas em nome de {nomeComprador}.
                    </p>
                  </div>
                </div>

                <ul className="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-4">
                  {certidoes.map((c, i) => (
                    <li
                      key={c}
                      style={{ transitionDelay: `${i * CERT_STEP_MS}ms` }}
                      className={cn(
                        "flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2.5 transition-all duration-500 ease-out",
                        revealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                      )}
                    >
                      <span className="text-sm font-medium text-slate-700">{c}</span>
                      <span className="flex items-center gap-1 text-xs font-semibold text-slate-500">
                        <Lock size={11} />
                        No relatório
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {consultas.map((c) => {
                const Icon = c.icon;
                return (
                  <div
                    key={c.title}
                    style={{ transitionDelay: `${empresasDelayMs}ms` }}
                    className={cn(
                      "flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-500 ease-out",
                      revealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                    )}
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                      <Icon size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-slate-900">{c.title}</h3>
                      <p className="text-sm text-slate-600">{c.description}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                      <Lock size={12} />
                      No relatório
                    </div>
                  </div>
                );
              })}

              {/* Processos judiciais — destaque verde/laranja */}
              <div
                className={cn(
                  "rounded-2xl border p-5 transition-all duration-500 ease-out",
                  revealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                )}
                style={{
                  borderColor: temProcessos ? "rgba(249,115,22,0.35)" : "rgba(29,175,102,0.35)",
                  background: temProcessos ? "rgba(249,115,22,0.06)" : "rgba(29,175,102,0.06)",
                  transitionDelay: `${processosDelayMs}ms`,
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                    style={{
                      background: temProcessos ? "rgba(249,115,22,0.15)" : "rgba(29,175,102,0.15)",
                      color: temProcessos ? "#c2410c" : "#15803d",
                    }}
                  >
                    <Gavel size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-slate-900">
                      Processos judiciais relevantes
                    </h3>
                    <p className="text-sm text-slate-600">
                      Levantamento de ações vinculadas ao CPF ou CNPJ do proprietário.
                    </p>
                  </div>
                  <div
                    className="flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold"
                    style={{
                      background: temProcessos ? "#f97316" : "#1daf66",
                      color: "#ffffff",
                    }}
                  >
                    {temProcessos ? <AlertTriangle size={12} /> : <CheckCircle2 size={12} />}
                    {temProcessos
                      ? `${processosEncontrados} encontrado${processosEncontrados > 1 ? "s" : ""}`
                      : "Nenhum encontrado"}
                  </div>
                </div>

                {temProcessos && (
                  <div className="mt-4 flex flex-col gap-2 border-t border-orange-200/60 pt-4">
                    {processosPreview.map((n) => (
                      <div
                        key={n}
                        className="flex items-center justify-between rounded-lg bg-white/70 px-3 py-2.5"
                      >
                        <span className="text-sm font-medium text-slate-700">
                          Processo {n} — <span className="blur-sm select-none">detalhes ocultos</span>
                        </span>
                        <span className="flex items-center gap-1 text-xs font-semibold text-orange-700">
                          <Lock size={11} />
                          Bloqueado
                        </span>
                      </div>
                    ))}
                    {processosEncontrados > 4 && (
                      <p className="pt-1 text-xs font-medium text-orange-700">
                        +{processosEncontrados - 4} processo
                        {processosEncontrados - 4 > 1 ? "s" : ""} no relatório completo
                      </p>
                    )}
                    <p className="pt-1 text-xs text-slate-500">
                      Prévia ilustrativa — a confirmação e o detalhamento de cada processo são
                      feitos na elaboração do relatório completo.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Direita — o que é o relatório completo */}
            <div className="lg:col-span-2">
              <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1daf66]/10 text-[#1daf66]">
                    <ShieldCheck size={22} />
                  </div>
                  <RevealTitle className="text-lg font-bold text-slate-900">
                    O que é o Relatório de Avaliação de Riscos?
                  </RevealTitle>
                </div>
                <p className="mb-5 text-sm text-slate-600">
                  É um parecer completo sobre o vendedor e o imóvel, montado a partir de fontes
                  públicas e oficiais, para você saber exatamente o risco que está correndo antes
                  de assinar qualquer papel.
                </p>

                <ul className="mb-6 flex flex-col gap-3">
                  {incluso.map((f) => (
                    <li key={f.title} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#1daf66]" />
                      <span>
                        <strong className="font-semibold text-slate-900">{f.title}.</strong>{" "}
                        {f.description}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() =>
                    window.open(
                      verificacaoWaLink(nomeComprador, nomeSolicitante, emailSolicitante),
                      "_blank",
                    )
                  }
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1daf66] py-6 text-base font-bold text-white shadow-lg shadow-[#1daf66]/30 transition-all hover:-translate-y-0.5 hover:bg-[#1daf66]/90"
                >
                  Liberar relatório completo
                  <ArrowRight size={18} />
                </Button>
                <p className="mt-3 text-center text-xs text-slate-400">
                  Entrega em PDF em até 24h úteis · atendimento via WhatsApp
                </p>
              </div>
            </div>
          </div>
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
                onClick={() => window.open(waLink(CTA_MESSAGE), "_blank")}
                className="rounded-xl px-10 py-6 text-lg font-bold shadow-xl transition-all hover:-translate-y-1"
                style={{ background: "#1A2E35", color: "#ffffff" }}
              >
                Quero meu relatório
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── RISCOS — fundo branco ─────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 space-y-4 text-center">
            <RevealTitle className="text-3xl font-bold text-slate-900 md:text-4xl">
              Sem checar, o que pode dar errado
            </RevealTitle>
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

      {/* ─── COMO FUNCIONA — fundo #1A2E35 ────────────────────────── */}
      <section className="py-24" style={{ background: "#1A2E35" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealTitle className="mb-16 text-center text-3xl font-black text-white md:text-4xl">
            Como funciona
          </RevealTitle>

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
          <RevealBox className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
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

            <ul className="mb-10 flex flex-col gap-4">
              {[
                "Certidões negativas de débito",
                "Processos judiciais relevantes",
                "Empresas relacionadas ao proprietário",
                "Situação da matrícula do imóvel",
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
              onClick={() =>
                window.open(
                  verificacaoWaLink(nomeComprador, nomeSolicitante, emailSolicitante),
                  "_blank",
                )
              }
              className="flex w-full items-center justify-center gap-2 rounded-xl py-6 text-base font-bold text-white transition-all hover:opacity-90"
              style={{ background: "#1A2E35" }}
            >
              Solicitar Relatório
              <ArrowRight size={18} />
            </Button>

            <p className="mt-4 text-center text-xs text-slate-400">
              Atendimento via WhatsApp · resposta rápida
            </p>
          </RevealBox>
        </div>
      </section>

      {/* ─── FAQ — fundo cinza claro ───────────────────────────────── */}
      <section className="py-24" style={{ background: "#f8faf8" }}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <RevealTitle className="mb-10 text-center text-3xl font-bold text-slate-900 md:text-4xl">
            Perguntas frequentes
          </RevealTitle>

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
    </Layout>
  );
}
