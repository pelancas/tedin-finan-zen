import { lazy } from "react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";
import { useDocumentMeta } from "@/hooks/use-document-meta";

const CalculadoraCotacaoSeguro = lazy(() => import("@/tools/CalculadoraCotacaoSeguro"));

export default function CotacaoSeguro() {
  useDocumentMeta(
    "Cotação de Seguro de Vida e Invalidez | Calculadora Grátis | Orienta",
    "Informe o valor da cobertura, sua idade e seu sexo e veja a estimativa de mensalidade do seguro de vida e de invalidez por acidente, com base em cotações médias de mercado.",
  );

  return (
    <ToolPageLayout>
      <CalculadoraCotacaoSeguro />
    </ToolPageLayout>
  );
}
