import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import calculadoraImg from '@/assets/Calculadora.png';
import { LatestPosts } from "@/components/home/LatestPosts";
import { Calculadoras } from "@/components/home/Calculadoras";

export function Hero() {
  return <section className="relative overflow-hidden">
      {/* Background image */}
      <>

      
  <meta charSet="utf-8" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />
  <title>Orienta+ | Consultoria Financeira Especializada</title>
  <link
    href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600;700;800;900&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700,0..1&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
    rel="stylesheet"
  />
  <style
    dangerouslySetInnerHTML={{
      __html:
        "\n        body {\n            font-family: 'Work Sans', sans-serif;\n        }\n    "
    }}
  />
  <style
    dangerouslySetInnerHTML={{
      __html:
        "\n        body {\n            min-height: max(884px, 100dvh);\n        }\n    "
    }}
  />
  {/* Hero Section - Remains Dark as per Initial Request/Visual Flow */}
  <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-32 bg-background-dark">
    <div className="max-w-7xl mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
      <div className="flex flex-col gap-8 z-10">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider w-fit">
          <span className="material-symbols-outlined text-sm">
            verified_user
          </span>
          Sua segurança financeira em primeiro lugar
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tight">
          Oriente{" "}
          <span className="text-primary">seu futuro.</span>
        </h1>
        <p className="text-lg text-slate-300 max-w-lg leading-relaxed">
          Se torne um orientado e navegue pelo mundo do das finanças com
          guias especializados ao seu lado.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-400">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full border-2 border-background-dark bg-primary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-xs">person</span>
            </div>
            <div className="w-8 h-8 rounded-full border-2 border-background-dark bg-secondary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-xs">person</span>
            </div>
            <div className="w-8 h-8 rounded-full border-2 border-background-dark bg-primary/40 flex items-center justify-center">
              <span className="material-symbols-outlined text-xs">person</span>
            </div>
          </div>
          <span>Uma abordagem para todos os públicos</span>
        </div>
      </div>
      <div className="relative">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-secondary/20 rounded-full blur-[100px]" />
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-video bg-surface-dark">
          <img
            alt="Consultoria Financeira"
            className="w-full h-full object-cover opacity-80"
            src={calculadoraImg}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent" />

        </div>
      </div>
    </div>
  </section>
  <LatestPosts />
  {/* Planejamento Section - Lightened (Light Background) */}
  <section
    className="py-20 bg-background-light text-surface-dark"
    id="planejamento"
  >
    <div className="max-w-7xl mx-auto px-4 lg:px-8">
      <div className="mb-16">
        <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-3">
          Serviços
        </h2>
        <h3 className="text-3xl md:text-4xl font-black mb-4">
          Planejamento Estratégico
        </h3>
        <p className="text-slate-600 max-w-2xl">
          Estratégias personalizadas para ajudar você a alcançar seus objetivos
          de vida com clareza e precisão.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-primary transition-all group shadow-sm">
          <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
            <span className="material-symbols-outlined text-3xl">
              trending_up
            </span>
          </div>
          <h4 className="text-xl font-bold mb-3">Gestão de Patrimônio</h4>
          <p className="text-slate-600 text-sm leading-relaxed">
            Otimize seus ativos para crescimento a longo prazo com as melhores
            taxas do mercado.
          </p>
        </div>
        <div className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-primary transition-all group shadow-sm">
          <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
            <span className="material-symbols-outlined text-3xl">
              event_available
            </span>
          </div>
          <h4 className="text-xl font-bold mb-3">Aposentadoria</h4>
          <p className="text-slate-600 text-sm leading-relaxed">
            Garanta um futuro confortável com estratégias de poupança
            inteligente e previdência.
          </p>
        </div>
        <div className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-primary transition-all group shadow-sm">
          <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
            <span className="material-symbols-outlined text-3xl">
              account_balance_wallet
            </span>
          </div>
          <h4 className="text-xl font-bold mb-3">Controle de Gastos</h4>
          <p className="text-slate-600 text-sm leading-relaxed">
            Ferramentas de orçamento intuitivas para acompanhar seus gastos com
            facilidade.
          </p>
        </div>
      </div>
    </div>
  </section>
  <Calculadoras />
</>

    </section>;
}