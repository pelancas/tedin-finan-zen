import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, Shield, MessageCircle, ArrowRight } from "lucide-react";

const features = [
  {
    icon: MessageCircle,
    title: "Atendimento humano",
    description: "Nada de chatbots. Você fala com gente de verdade.",
  },
  {
    icon: TrendingUp,
    title: "Plano de investimentos",
    description: "Estratégias personalizadas pro seu momento de vida.",
  },
  {
    icon: Shield,
    title: "Reestruturação de dívidas",
    description: "Ajudamos você a sair do vermelho de forma sustentável.",
  },
  {
    icon: Users,
    title: "Educação financeira",
    description: "Ensinamos o básico que ninguém te ensinou na escola.",
  },
];

const Consultoria = () => {
  return (
    <Layout>
      <section className="py-16 md:py-24 bg-gradient-to-b from-accent/30 to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-6">
              <Users className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Consultoria Financeira
            </h1>
            <p className="text-lg text-muted-foreground">
              Orientação profissional de quem entende. 
              Sem julgamentos, só soluções.
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
              Agendar consulta
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Consultoria;
