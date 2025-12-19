import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/home/Hero";
import { ServiceSection } from "@/components/home/ServiceSection";
import iconDespesas from "@/assets/icon-despesas.png";
import iconLeao from "@/assets/icon-leao.png";
import iconConsultoria from "@/assets/icon-consultoria.png";

const services = [
  {
    title: "Controle de Despesas",
    description: "Acompanhe para onde seu dinheiro vai. Simples assim.",
    icon: iconDespesas,
    href: "/despesas",
    features: [
      "Categorize seus gastos automaticamente",
      "Relatórios mensais claros",
      "Alertas de limite de gastos",
      "Sincronização com sua conta bancária",
    ],
    bgClass: "bg-emerald-50 dark:bg-emerald-950/20",
    reverse: false,
  },
  {
    title: "Imposto de Renda",
    description: "Declaração sem dor de cabeça. A gente te guia.",
    icon: iconLeao,
    href: "/imposto",
    features: [
      "Passo a passo simplificado",
      "Organização de documentos",
      "Cálculo automático de restituição",
      "Alerta de prazos importantes",
    ],
    bgClass: "bg-amber-50 dark:bg-amber-950/20",
    reverse: true,
  },
  {
    title: "Consultoria Financeira",
    description: "Conselhos reais de quem entende do assunto.",
    icon: iconConsultoria,
    href: "/consultoria",
    features: [
      "Análise personalizada",
      "Plano de investimentos",
      "Reestruturação de dívidas",
      "Atendimento humano e próximo",
    ],
    bgClass: "bg-blue-50 dark:bg-blue-950/20",
    reverse: false,
  },
];

const Index = () => {
  return (
    <Layout>
      <Hero />
      
      {services.map((service) => (
        <ServiceSection 
          key={service.href} 
          {...service}
        />
      ))}
      
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="bg-primary rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              Pronto para organizar sua vida financeira?
            </h2>
            <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
              Milhares de pessoas já simplificaram suas finanças com a TEdin. 
              Você pode ser a próxima.
            </p>
            <a 
              href="/sobre" 
              className="inline-flex items-center justify-center rounded-lg bg-secondary px-6 py-3 text-sm font-medium text-secondary-foreground hover:opacity-90 transition-opacity"
            >
              Fale com a gente
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
