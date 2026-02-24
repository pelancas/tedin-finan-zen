import { Layout } from "@/components/layout/Layout";

const Ferramentas = () => {
  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container">


          <div className="w-full h-full">
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
