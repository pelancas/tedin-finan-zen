import { Layout } from "@/components/layout/Layout";
import { useParams } from "react-router-dom";
import { lazy, Suspense, ComponentType } from "react";

const CalculadoraFinanceira = lazy(() => import("@/tools/CalculadoraFinanceira"));
const MetasFinanceiras = lazy(() => import("@/tools/MetasFinanceiras"));

type ToolConfig =
  | { type: "component"; component: React.LazyExoticComponent<ComponentType<any>>; title: string }
  | { type: "iframe"; src: string; title: string; minHeight?: string };

const toolsMap: Record<string, ToolConfig> = {
  aposentadoria: {
    type: "component",
    component: CalculadoraFinanceira,
    title: "Calculadora Financeira",
  },
  metas: {
    type: "iframe",
    src: "tools/MetasFinanceiras.html",
    title: "Metas Financeiras",
  },
  "renda-fixa": {
    type: "iframe",
    src: "/comparador-renda-fixa.html",
    title: "Comparador de Renda Fixa",
  },
};

const Ferramentas = () => {
  const { tool } = useParams<{ tool: string }>();
  const current = toolsMap[tool || "aposentadoria"];

  if (!current) {
    return (
      <Layout>
        <section className="py-16 md:py-24">
          <div className="container text-center">
            <h1 className="text-2xl font-bold">Ferramenta não encontrada</h1>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <Suspense fallback={<div className="py-16 text-center">Carregando...</div>}>
        {current.type === "component" ? (
          <current.component />
        ) : (
          <section className="py-16 md:py-24">
            <div className="container">
              <iframe
                src={current.src}
                title={current.title}
                className="w-full border-0"
                style={{ minHeight: current.minHeight || "600px" }}
              />
            </div>
          </section>
        )}
      </Suspense>
    </Layout>
  );
};

export default Ferramentas;
