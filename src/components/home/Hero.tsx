import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import tedinLogo from "@/assets/tedin-logo.png";
export function Hero() {
  return <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/50 via-background to-background -z-10" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
      
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            Finanças simplificadas para você
          </div>
          
          <div className="flex flex-col items-center mb-6">
            
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground text-justify font-sans">
              Sua vida financeira na palma da mão
            </h1>
          </div>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Sem enrolação. Controle suas despesas, organize seu imposto de renda e 
            tenha consultoria financeira de verdade. Tudo em um só lugar.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="text-base">
              <Link to="/despesas">
                Começar agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-base">
              <Link to="/sobre">
                Conhecer a TEdin
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>;
}