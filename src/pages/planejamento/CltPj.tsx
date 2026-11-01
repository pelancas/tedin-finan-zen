import { lazy } from "react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";
import { useDocumentMeta } from "@/hooks/use-document-meta";

const CalculadoraCltPj = lazy(() => import("@/tools/CalculadoraCltPj"));

export default function CltPj() {
  useDocumentMeta(
    "CLT ou PJ: Quanto Cobrar? | Calculadora Grátis | Orienta",
    "Compare uma proposta CLT com uma PJ e descubra o valor equivalente na outra modalidade, considerando impostos, 13º, férias, FGTS, plano de saúde e seguro de vida.",
  );

  return (
    <ToolPageLayout>
      <CalculadoraCltPj />
    </ToolPageLayout>
  );
}
