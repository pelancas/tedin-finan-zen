import { ToolPageLayout } from "@/components/layout/ToolPageLayout";
import { useDocumentMeta } from "@/hooks/use-document-meta";

const isMobile = window.innerWidth < 768;

export default function ComparadorRendaFixa() {
  useDocumentMeta(
    "Comparador de Renda Fixa | CDB, LCI, LCA e Tesouro | Orienta",
    "Compare CDB, LCI, LCA, Tesouro Direto e outros produtos de renda fixa lado a lado e descubra qual investimento rende mais para o seu objetivo.",
  );

  return (
    <ToolPageLayout>
      <section className="py-16 md:py-24">
        <div className="container">
          <iframe
            src="/comparador-renda-fixa.html"
            title="Comparador de Renda Fixa"
            className="w-full border-0"
            style={{ minHeight: isMobile ? "1500px" : "1200px" }}
          />
        </div>
      </section>
    </ToolPageLayout>
  );
}
