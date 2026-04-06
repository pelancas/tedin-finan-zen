import { lazy } from "react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";

const CalculadoraMilhao = lazy(() => import("@/tools/CalculadoraMilhao"));

export default function Milhao() {
  return (
    <ToolPageLayout>
      <CalculadoraMilhao />
    </ToolPageLayout>
  );
}
