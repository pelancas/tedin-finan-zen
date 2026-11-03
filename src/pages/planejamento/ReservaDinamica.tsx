import { lazy } from "react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";
import { useDocumentMeta } from "@/hooks/use-document-meta";

const CalculadoraReservaDinamica = lazy(() => import("@/tools/CalculadoraReservaDinamica"));

export default function ReservaDinamica() {
  useDocumentMeta(
    "Calculadora de Reserva Dinâmica | Renda Variável | Orienta",
    "Para quem tem renda instável: descubra o salário que você deve se pagar, o teto da sua reserva e quanto falta para chegar lá.",
  );

  return (
    <ToolPageLayout>
      <CalculadoraReservaDinamica />
    </ToolPageLayout>
  );
}
