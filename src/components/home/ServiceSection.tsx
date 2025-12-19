import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";

interface ServiceSectionProps {
  title: string;
  description: string;
  icon: string;
  href: string;
  features: string[];
  reverse?: boolean;
  bgClass?: string;
}

export function ServiceSection({
  title,
  description,
  icon,
  href,
  features,
  reverse = false,
  bgClass = "",
}: ServiceSectionProps) {
  return (
    <section className={`py-16 md:py-24 ${bgClass}`}>
      <div className="container">
        <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12`}>
          <div className="flex-1 flex justify-center">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-lg">
              <img src={icon} alt={title} className="w-full h-full object-cover" />
            </div>
          </div>
          
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {title}
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              {description}
            </p>
            
            <ul className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3 justify-center lg:justify-start">
                  <Check className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
            
            <Button asChild size="lg">
              <Link to={href}>
                Saiba mais
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
