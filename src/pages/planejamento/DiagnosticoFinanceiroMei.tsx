import { useDocumentMeta } from "@/hooks/use-document-meta";

/**
 * Tela cheia, sem Header/Footer do site: o próprio HTML tem a logo, que leva de volta ao site.
 */
export default function DiagnosticoFinanceiroMei() {
  useDocumentMeta(
    "Diagnóstico Financeiro Rápido Grátis | Orienta",
    "Responda a poucas perguntas e receba na hora uma nota e um retrato das suas finanças: renda, gastos, regra 50/30/20, envelopes e aposentadoria.",
  );

  return (
    <iframe
      src="/diagnostico-rapido.html"
      title="Diagnóstico Financeiro Rápido"
      className="block w-full border-0"
      style={{ height: "100dvh" }}
    />
  );
}
