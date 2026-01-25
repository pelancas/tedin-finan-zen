import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, Video, Check, ArrowRight } from "lucide-react";

const plans = [
  {
    icon: TrendingUp,
    title: "Análise de Investimentos",
    description: "Avaliação completa dos seus investimentos atuais",
    price: "R$ 197",
    features: [
      "Análise detalhada da carteira atual",
      "Identificação de oportunidades",
      "Relatório com recomendações",
      "Sugestões de diversificação",
    ],
    highlighted: false,
  },
  {
    icon: Users,
    title: "Consultoria Virtual",
    description: "Acompanhamento completo da sua vida financeira",
    price: "R$ 397",
    features: [
      "Tudo do plano Análise",
      "Mapeamento de necessidades financeiras",
      "Plano de ação personalizado",
      "Suporte por 30 dias",
      "Material educativo exclusivo",
    ],
    highlighted: true,
  },
  {
    icon: Video,
    title: "Consultoria Premium",
    description: "Imersão total na sua vida financeira",
    price: "R$ 697",
    features: [
      "Tudo do plano Virtual",
      "Reunião online de 2 horas",
      "Mapeamento completo financeiro",
      "Planejamento de longo prazo",
      "Suporte por 60 dias",
      "Acompanhamento mensal",
    ],
    highlighted: false,
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
              Escolha o plano ideal para você.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {plans.map((plan) => (
              <Card 
                key={plan.title} 
                className={`border-border relative flex flex-col ${
                  plan.highlighted 
                    ? 'ring-2 ring-primary shadow-lg scale-105' 
                    : ''
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                      Mais Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center pb-2">
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mx-auto mb-4">
                    <plan.icon className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <CardTitle className="text-xl">{plan.title}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="text-center mb-6">
                    <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    variant={plan.highlighted ? "default" : "outline"}
                  >
                    Escolher plano
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Consultoria;
