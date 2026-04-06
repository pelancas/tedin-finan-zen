import { lazy } from "react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";

const CalculadoraMetasFinanceiras = lazy(() => import("@/tools/CalculadoraMetasFinanceiras"));

export default function Metas() {
  return (
    <ToolPageLayout>
      <CalculadoraMetasFinanceiras />
    </ToolPageLayout>
  );
}
