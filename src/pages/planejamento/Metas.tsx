import { lazy } from "react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";
import { useDocumentMeta } from "@/hooks/use-document-meta";

const CalculadoraMetasFinanceiras = lazy(() => import("@/tools/CalculadoraMetasFinanceiras"));

export default function Metas() {
  useDocumentMeta(
    "Calculadora de Metas Financeiras Grátis | Orienta",
    "Planeje quanto tempo leva para atingir qualquer objetivo financeiro com a calculadora de metas gratuita da Orienta.",
  );

  return (
    <ToolPageLayout>
      <CalculadoraMetasFinanceiras />
    </ToolPageLayout>
  );
}
