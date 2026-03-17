import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Heart, Zap } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Direto ao ponto",
    description: "Nada de enrolação. Soluções claras para problemas reais.",
  },
  {
    icon: Heart,
    title: "Honestidade sempre",
    description: "Falamos a verdade, mesmo quando ela não é o que você quer ouvir.",
  },
  {
    icon: Zap,
    title: "Simplicidade",
    description: "Finanças não precisam ser complicadas. A gente prova isso todo dia.",
  },
];

const Sobre = () => {
  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Sobre a <span className="text-primary">TE</span>
              <span className="text-secondary">din</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Nascemos da frustração com serviços financeiros complicados demais. 
              Acreditamos que cuidar do dinheiro deveria ser simples, acessível e 
              até um pouco divertido.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {values.map((value) => (
              <Card key={value.title} className="text-center border-border">
                <CardContent className="pt-8">
                  <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-7 w-7 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="max-w-3xl mx-auto">
            <Card className="border-border">
              <CardContent className="p-8 md:p-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">Nossa história</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    A Orienta começou em 2025, quando um grupo de amigos cansou de ver 
                    tanta gente perdida com as próprias finanças. Não por falta de 
                    inteligência, mas por falta de ferramentas acessíveis.
                  </p>
                  <p>
                    Criamos uma plataforma que fala a sua língua. Sem jargões 
                    financeiros, sem letras miúdas escondidas. Só você e seu 
                    dinheiro, numa relação mais saudável.
                  </p>
                  <p>
                    Hoje ajudamos milhares de brasileiros a organizar despesas, 
                    declarar imposto de renda sem stress e planejar o futuro com 
                    consultoria de verdade.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Sobre;
