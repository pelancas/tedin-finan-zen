import { ToolPageLayout } from "@/components/layout/ToolPageLayout";

const isMobile = window.innerWidth < 768;

export default function ComparadorRendaFixa() {
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
