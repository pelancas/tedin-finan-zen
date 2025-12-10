import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, CheckCircle, Calendar, Calculator, ArrowRight } from "lucide-react";

const features = [
  {
    icon: CheckCircle,
    title: "Passo a passo",
    description: "Guiamos você por cada etapa. Sem termos confusos.",
  },
  {
    icon: Calendar,
    title: "Lembretes de prazo",
    description: "Nunca mais perca uma data importante. A gente avisa.",
  },
  {
    icon: Calculator,
    title: "Cálculo automático",
    description: "Descubra se vai restituir ou pagar antes de enviar.",
  },
  {
    icon: FileText,
    title: "Documentos organizados",
    description: "Suba seus comprovantes e a gente guarda tudo certinho.",
  },
];

const Imposto = () => {
  return (
    <Layout>
      <section className="py-16 md:py-24 bg-gradient-to-b from-accent/30 to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-6">
              <FileText className="h-8 w-8 text-secondary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Imposto de Renda
            </h1>
            <p className="text-lg text-muted-foreground">
              Declaração do IR não precisa ser um bicho de sete cabeças. 
              Prometemos.
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
            <Button size="lg" className="text-base bg-secondary hover:bg-secondary/90">
              Organizar meu IR
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Imposto;
