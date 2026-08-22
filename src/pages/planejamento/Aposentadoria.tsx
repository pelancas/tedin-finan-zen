import { lazy } from "react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";
import { useDocumentMeta } from "@/hooks/use-document-meta";

const CalculadoraFinanceira = lazy(() => import("@/tools/CalculadoraFinanceira"));

export default function Aposentadoria() {
  useDocumentMeta(
    "Calculadora de Aposentadoria Grátis | Orienta",
    "Descubra quanto guardar por mês para se aposentar com tranquilidade usando a calculadora de aposentadoria gratuita da Orienta.",
  );

  return (
    <ToolPageLayout>
      <CalculadoraFinanceira />
    </ToolPageLayout>
  );
}
