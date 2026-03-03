import { Layout } from "@/components/layout/Layout";
import { useParams } from "react-router-dom";
import { lazy, Suspense } from "react";

const toolsMap: Record<string, { src: string; title: string; minHeight: string }> = {
  aposentadoria: {
    component: lazy(() => import("@/tools/CalculadoraFinanceira")),
    title: "Calculadora Financeira",
  },
  metas: {
    src: "/metas-investimento.html",
    title: "Metas de Investimento",
    minHeight: "900px",
  },
  "renda-fixa": {
    src: "/comparador-renda-fixa.html",
    title: "Comparador de Renda Fixa",
    minHeight: "900px",
  },
};

const defaultTool = "aposentadoria";

const Ferramentas = () => {
  const { tool } = useParams<{ tool: string }>();
  const current = toolsMap[tool || "aposentadoria"];

  return (
          <Layout>
            <section className="py-16 md:py-24">
              <div className="container">
                <Suspense fallback={<div>Carregando...</div>}>
                  <current.component />
                </Suspense>
              </div>
            </section>
          </Layout>
  );
};

export default Ferramentas;
