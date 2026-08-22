import { lazy } from "react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";
import { useDocumentMeta } from "@/hooks/use-document-meta";

const CalculadoraMilhao = lazy(() => import("@/tools/CalculadoraMilhao"));

export default function Milhao() {
  useDocumentMeta(
    "Calculadora do Milhão | Quanto Tempo Para Chegar a R$1 Milhão | Orienta",
    "Veja em quanto tempo seu dinheiro chega a R$ 1.000.000 com a calculadora do milhão gratuita da Orienta.",
  );

  return (
    <ToolPageLayout>
      <CalculadoraMilhao />
    </ToolPageLayout>
  );
}
