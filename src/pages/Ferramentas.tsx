import { Layout } from "@/components/layout/Layout";

const Ferramentas = () => {
  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ferramentas
            </h1>
            <p className="text-lg text-muted-foreground">
              Ferramentas práticas para ajudar na sua organização financeira.
            </p>
          </div>

          <div className="w-full">
            <iframe
              src="/calculadora-financeira.html"
              className="w-full border-0 rounded-lg"
              style={{ minHeight: "700px" }}
              title="Calculadora Financeira"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Ferramentas;
