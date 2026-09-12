import { lazy } from "react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";
import { useDocumentMeta } from "@/hooks/use-document-meta";

const CalculadoraPossoComprar = lazy(() => import("@/tools/CalculadoraPossoComprar"));

export default function PossoComprar() {
  useDocumentMeta(
    "Posso Comprar Este Imóvel? | Calculadora Grátis | Orienta",
    "Descubra o valor máximo de imóvel que você pode comprar com segurança, com base na sua renda e no valor disponível para entrada, com a calculadora gratuita da Orienta.",
  );

  return (
    <ToolPageLayout>
      <CalculadoraPossoComprar />
    </ToolPageLayout>
  );
}
