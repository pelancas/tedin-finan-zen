import { lazy } from "react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";
import { useDocumentMeta } from "@/hooks/use-document-meta";

const CalculadoraPossoComprar = lazy(() => import("@/tools/CalculadoraPossoComprar"));

export default function PossoComprar() {
  useDocumentMeta(
    "Posso Comprar Este Imóvel? | Calculadora Grátis | Orienta",
    "Descubra se o imóvel que você quer comprar é confortável, possível ou arriscado para o seu bolso, com a calculadora gratuita da Orienta.",
  );

  return (
    <ToolPageLayout>
      <CalculadoraPossoComprar />
    </ToolPageLayout>
  );
}
