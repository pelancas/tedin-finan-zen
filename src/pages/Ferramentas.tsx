import { Layout } from "@/components/layout/Layout";
import { useParams } from "react-router-dom";
import { lazy, Suspense, ComponentType } from "react";

const CalculadoraFinanceira = lazy(() => import("@/tools/CalculadoraFinanceira"));

type ToolConfig =
  | { type: "component"; component: React.LazyExoticComponent<ComponentType<any>>; title: string }
  | { type: "iframe"; src: string; title: string; minHeight: string };

const toolsMap: Record<string, ToolConfig> = {
  aposentadoria: {
    type: "component",
    component: CalculadoraFinanceira,
    title: "Calculadora Financeira",
  },
  metas: {
    type: "iframe",
    src: "/metas-investimento.html",
    title: "Metas de Investimento",
    minHeight: "900px",
  },
  "renda-fixa": {
    type: "iframe",
    src: "/comparador-renda-fixa.html",
    title: "Comparador de Renda Fixa",
    minHeight: "900px",
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
      <section className="py-16 md:py-24">
        <div className="container">
          <Suspense fallback={<div>Carregando...</div>}>
            {current.type === "component" ? (
              <current.component />
            ) : (
              <iframe
                src={current.src}
                title={current.title}
                className="w-full border-0"
                style={{ minHeight: current.minHeight }}
              />
            )}
          </Suspense>
        </div>
      </section>
    </Layout>
  );
};

export default Ferramentas;
