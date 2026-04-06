import { lazy } from "react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";

const CalculadoraFinanceira = lazy(() => import("@/tools/CalculadoraFinanceira"));

export default function Aposentadoria() {
  return (
    <ToolPageLayout>
      <CalculadoraFinanceira />
    </ToolPageLayout>
  );
}
