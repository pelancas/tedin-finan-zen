import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, PieChart, Bell, CreditCard, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Wallet,
    title: "Registro fácil",
    description: "Adicione gastos em segundos. Foto de recibo? A gente lê pra você.",
  },
  {
    icon: PieChart,
    title: "Relatórios visuais",
    description: "Gráficos simples que mostram para onde seu dinheiro está indo.",
  },
  {
    icon: Bell,
    title: "Alertas inteligentes",
    description: "Avisamos quando você está perto do limite que você mesmo definiu.",
  },
  {
    icon: CreditCard,
    title: "Múltiplas contas",
    description: "Cartão, débito, dinheiro vivo. Tudo num lugar só.",
  },
];

const Despesas = () => {
  return (
    <Layout>
      <section className="py-16 md:py-24 bg-gradient-to-b from-accent/30 to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-6">
              <Wallet className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Controle de Despesas
            </h1>
            <p className="text-lg text-muted-foreground">
              Saber para onde vai seu dinheiro é o primeiro passo. 
              A gente facilita o resto.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {features.map((feature) => (
              <Card key={feature.title} className="border-border">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-2">
                    <feature.icon className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" className="text-base">
              Começar a controlar
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Despesas;
