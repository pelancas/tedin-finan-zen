import { Layout } from "@/components/layout/Layout";
import { useParams } from "react-router-dom";

const toolsMap: Record<string, { src: string; title: string; minHeight: string }> = {
  aposentadoria: {
    src: "/calculadora-financeira.html",
    title: "Calculadora Financeira",
    minHeight: "700px",
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
  const current = toolsMap[tool || defaultTool] || toolsMap[defaultTool];

  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="w-full h-full">
            <iframe
              src={current.src}
              className="w-full border-0 rounded-lg"
              style={{ minHeight: current.minHeight }}
              title={current.title}
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Ferramentas;
