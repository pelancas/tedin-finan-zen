import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/home/Hero";
import { ServiceCard } from "@/components/home/ServiceCard";
import { Wallet, FileText, Users } from "lucide-react";

const services = [
  {
    title: "Controle de Despesas",
    description: "Acompanhe para onde seu dinheiro vai. Simples assim.",
    icon: Wallet,
    href: "/despesas",
    features: [
      "Categorize seus gastos automaticamente",
      "Relatórios mensais claros",
      "Alertas de limite de gastos",
      "Sincronização com sua conta bancária",
    ],
  },
  {
    title: "Imposto de Renda",
    description: "Declaração sem dor de cabeça. A gente te guia.",
    icon: FileText,
    href: "/imposto",
    features: [
      "Passo a passo simplificado",
      "Organização de documentos",
      "Cálculo automático de restituição",
      "Alerta de prazos importantes",
    ],
  },
  {
    title: "Consultoria Financeira",
    description: "Conselhos reais de quem entende do assunto.",
    icon: Users,
    href: "/consultoria",
    features: [
      "Análise personalizada",
      "Plano de investimentos",
      "Reestruturação de dívidas",
      "Atendimento humano e próximo",
    ],
  },
];

const Index = () => {
  return (
    <Layout>
      <Hero />
      
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nossos Serviços
            </h2>
            <p className="text-lg text-muted-foreground">
              Ferramentas práticas que funcionam. Sem letras miúdas, sem surpresas.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.href} {...service} />
            ))}
          </div>
        </div>
      </section>
      
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
