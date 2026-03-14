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
    reverse: true,
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
    reverse: false,
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
    reverse: true,
  },
];

const Index = () => {
  return (
    <Layout>

<!DOCTYPE html>

<html class="dark" lang="pt-BR"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Orienta+ | Consultoria Financeira Especializada</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600;700;800;900&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#1daf66",
                        "secondary": "#FFA726",
                        "background-light": "#FFFDF5",
                        "background-dark": "#0F2A2A",
                        "surface-dark": "#1A2E35",
                    },
                    fontFamily: {
                        "display": ["Work Sans", "sans-serif"]
                    },
                    borderRadius: {
                        "DEFAULT": "0.5rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                },
            },
        }
    </script>
<style>
        body {
            font-family: 'Work Sans', sans-serif;
        }
    </style>
<style>
        body {
            min-height: max(884px, 100dvh);
        }
    </style>
</head>
<body class="bg-background-dark text-slate-100 antialiased font-display">
<!-- Header / TopAppBar - Keeping Dark for Elegance -->
<header class="sticky top-0 z-50 bg-background-dark/95 backdrop-blur-md border-b border-white/5">
<div class="max-w-7xl mx-auto flex items-center justify-between p-4 lg:px-8">
<div class="flex items-center gap-2">
<div class="bg-primary text-white p-2 rounded-lg flex items-center justify-center">
<span class="material-symbols-outlined">payments</span>
</div>
<h2 class="text-white text-xl font-bold tracking-tight">Orienta<span class="text-primary">+</span></h2>
</div>
<nav class="hidden md:flex items-center gap-8 text-sm font-medium">
<a class="hover:text-primary transition-colors" href="#planejamento">Planejamento</a>
<a class="hover:text-primary transition-colors" href="#investimentos">Investimentos</a>
<a class="hover:text-primary transition-colors" href="#impostos">Impostos</a>
<a class="text-secondary font-bold hover:opacity-80 transition-opacity" href="#orientaplus">Orienta+</a>
</nav>
<div class="flex items-center gap-4">
<button class="hidden sm:block text-sm font-semibold hover:text-primary transition-colors">Login</button>
<button class="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-lg text-sm font-bold transition-all shadow-lg shadow-primary/20">
                    Começar Agora
                </button>
</div>
</div>
</header>
<main>
<!-- Hero Section - Remains Dark as per Initial Request/Visual Flow -->
<section class="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-32 bg-background-dark">
<div class="max-w-7xl mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
<div class="flex flex-col gap-8 z-10">
<div class="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider w-fit">
<span class="material-symbols-outlined text-sm">verified_user</span>
                        Sua segurança financeira em primeiro lugar
                    </div>
<h1 class="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tight">
                        Transforme seu futuro com <span class="text-primary">orientação especializada.</span>
</h1>
<p class="text-lg text-slate-300 max-w-lg leading-relaxed">
                        Navegue pelo mundo do planejamento, investimentos e impostos com a confiança de quem tem especialistas ao seu lado.
                    </p>
<div class="flex flex-col sm:flex-row gap-4">
<button class="bg-primary text-white h-14 px-8 rounded-xl font-bold text-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-2">
                            Agendar Consultoria <span class="material-symbols-outlined">arrow_forward</span>
</button>
<button class="bg-surface-dark text-white h-14 px-8 rounded-xl font-bold text-lg hover:bg-slate-700 transition-colors">
                            Ver Planos
                        </button>
</div>
<div class="flex items-center gap-4 text-sm text-slate-400">
<div class="flex -space-x-2">
<div class="w-8 h-8 rounded-full border-2 border-background-dark bg-primary/20 flex items-center justify-center">
<span class="material-symbols-outlined text-xs">person</span>
</div>
<div class="w-8 h-8 rounded-full border-2 border-background-dark bg-secondary/20 flex items-center justify-center">
<span class="material-symbols-outlined text-xs">person</span>
</div>
<div class="w-8 h-8 rounded-full border-2 border-background-dark bg-primary/40 flex items-center justify-center">
<span class="material-symbols-outlined text-xs">person</span>
</div>
</div>
<span>+10.000 clientes satisfeitos em todo o Brasil</span>
</div>
</div>
<div class="relative">
<div class="absolute -top-20 -right-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px]"></div>
<div class="absolute -bottom-20 -left-20 w-80 h-80 bg-secondary/20 rounded-full blur-[100px]"></div>
<div class="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-video bg-surface-dark">
<img alt="Consultoria Financeira" class="w-full h-full object-cover opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-RfzxSmT8ArVeoluFY7oD_TsiRnR6y_VtDsBO7VQYF7hbCA8yVVr7qTqoXC4MsVUV2CCr8hgDUYuESr7YV4yvdoQuHWt3eUrMtXTE_lnsnQTKG_-z_I680Qw61ekpzs5kGaYUTdsS3VW7l8dXoEYIXoZuX739fH4c7ZGJC3bXEewefL9pfBY_yYy2YFN8LenGd9UzVukEXo1uNdkEbdC2FE3qwd0XIqP1kEQ_jpXt68OYxxHo-Cxr47V8h3wPQAuk15y0URmeHRw"/>
<div class="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent"></div>
<div class="absolute bottom-6 left-6 right-6 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
<p class="text-white font-medium italic text-sm">"A Orienta+ mudou completamente minha forma de enxergar meus investimentos. Hoje durmo tranquilo."</p>
<p class="text-primary text-xs font-bold mt-2">— Ricardo M., Empresário</p>
</div>
</div>
</div>
</div>
</section>
<!-- Planejamento Section - Lightened (Light Background) -->
<section class="py-20 bg-background-light text-surface-dark" id="planejamento">
<div class="max-w-7xl mx-auto px-4 lg:px-8">
<div class="mb-16">
<h2 class="text-primary font-bold tracking-widest uppercase text-sm mb-3">Serviços</h2>
<h3 class="text-3xl md:text-4xl font-black mb-4">Planejamento Estratégico</h3>
<p class="text-slate-600 max-w-2xl">Estratégias personalizadas para ajudar você a alcançar seus objetivos de vida com clareza e precisão.</p>
</div>
<div class="grid md:grid-cols-3 gap-6">
<div class="p-8 rounded-2xl bg-white border border-slate-200 hover:border-primary transition-all group shadow-sm">
<div class="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
<span class="material-symbols-outlined text-3xl">trending_up</span>
</div>
<h4 class="text-xl font-bold mb-3">Gestão de Patrimônio</h4>
<p class="text-slate-600 text-sm leading-relaxed">Otimize seus ativos para crescimento a longo prazo com as melhores taxas do mercado.</p>
</div>
<div class="p-8 rounded-2xl bg-white border border-slate-200 hover:border-primary transition-all group shadow-sm">
<div class="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
<span class="material-symbols-outlined text-3xl">event_available</span>
</div>
<h4 class="text-xl font-bold mb-3">Aposentadoria</h4>
<p class="text-slate-600 text-sm leading-relaxed">Garanta um futuro confortável com estratégias de poupança inteligente e previdência.</p>
</div>
<div class="p-8 rounded-2xl bg-white border border-slate-200 hover:border-primary transition-all group shadow-sm">
<div class="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
<span class="material-symbols-outlined text-3xl">account_balance_wallet</span>
</div>
<h4 class="text-xl font-bold mb-3">Controle de Gastos</h4>
<p class="text-slate-600 text-sm leading-relaxed">Ferramentas de orçamento intuitivas para acompanhar seus gastos com facilidade.</p>
</div>
</div>
</div>
</section>
<!-- Investimentos Section - Remains Dark for contrast -->
<section class="py-24 bg-background-dark" id="investimentos">
<div class="max-w-7xl mx-auto px-4 lg:px-8">
<div class="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
<div class="max-w-xl">
<h2 class="text-primary font-bold tracking-widest uppercase text-sm mb-3">Onde Investir</h2>
<h3 class="text-3xl md:text-4xl font-black text-white mb-4">Tendências de Mercado</h3>
<p class="text-slate-400">Análise em tempo real dos melhores setores para alocação de capital hoje.</p>
</div>
<button class="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all">
                        Ver Relatório Completo <span class="material-symbols-outlined">east</span>
</button>
</div>
<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
<div class="bg-surface-dark p-6 rounded-2xl border border-white/5">
<span class="text-slate-400 text-xs font-bold uppercase block mb-1">Renda Fixa</span>
<div class="text-2xl font-bold text-white mb-2">12.5% a.a.</div>
<div class="text-primary text-xs flex items-center gap-1">
<span class="material-symbols-outlined text-sm">trending_up</span> +0.4% este mês
                        </div>
</div>
<div class="bg-surface-dark p-6 rounded-2xl border border-white/5">
<span class="text-slate-400 text-xs font-bold uppercase block mb-1">Ações (Ibov)</span>
<div class="text-2xl font-bold text-white mb-2">118.432</div>
<div class="text-red-400 text-xs flex items-center gap-1">
<span class="material-symbols-outlined text-sm">trending_down</span> -1.2% este mês
                        </div>
</div>
<div class="bg-surface-dark p-6 rounded-2xl border border-white/5">
<span class="text-slate-400 text-xs font-bold uppercase block mb-1">Fundos Imob.</span>
<div class="text-2xl font-bold text-white mb-2">3.120 pts</div>
<div class="text-primary text-xs flex items-center gap-1">
<span class="material-symbols-outlined text-sm">trending_up</span> +2.1% este mês
                        </div>
</div>
<div class="bg-surface-dark p-6 rounded-2xl border border-white/5">
<span class="text-slate-400 text-xs font-bold uppercase block mb-1">Dólar</span>
<div class="text-2xl font-bold text-white mb-2">R$ 4,92</div>
<div class="text-slate-400 text-xs flex items-center gap-1">
<span class="material-symbols-outlined text-sm">horizontal_rule</span> Estável
                        </div>
</div>
</div>
</div>
</section>
<!-- Impostos Section - Lightened (Light Background) -->
<section class="py-20 bg-background-light text-surface-dark" id="impostos">
<div class="max-w-7xl mx-auto px-4 lg:px-8 grid md:grid-cols-2 gap-16 items-center">
<div class="order-2 md:order-1 relative">
<img alt="Consultoria Tributária" class="rounded-3xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-500 border border-slate-200" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSqPfPlULcivkFDKHqONg3n0277soe1q8ckzRaOlT4FEScSAsUlWsdL_0xJXuXkAltv9FPiqIs1H4bZQ4m4BEFjk1oEIXWIpRckoI9E9uKijHM_H9DGckjjQAc-NQIvgn-FQEh8xgBDuEl-uYC1Up11vuNuPcnlexVgxm4JNAOGOeRU0FQwNeAmNsoomjsOci-Sw52eQjS0sEWMWWWcf0x6Wtk8MWvkhjGjm8hhgaK2sxLEBkHjryqB-HT4sDw0HXlYuVnlg-7Rbs"/>
<div class="absolute -top-6 -right-6 bg-secondary text-white p-6 rounded-2xl shadow-xl">
<span class="material-symbols-outlined text-4xl mb-2 block">receipt_long</span>
<p class="font-bold">Economia Fiscal</p>
<p class="text-xs opacity-90">Reduza sua carga tributária legalmente.</p>
</div>
</div>
<div class="order-1 md:order-2 flex flex-col gap-6">
<h2 class="text-primary font-bold tracking-widest uppercase text-sm">Eficiência Fiscal</h2>
<h3 class="text-3xl md:text-4xl font-black">Impostos sem dor de cabeça.</h3>
<p class="text-slate-600 leading-relaxed">Nossa equipe de especialistas revisa sua situação tributária para garantir que você não pague nem um centavo a mais do que o necessário.</p>
<ul class="space-y-4">
<li class="flex items-center gap-3">
<span class="material-symbols-outlined text-primary">check_circle</span>
<span class="font-medium">Declaração de IR completa e simplificada</span>
</li>
<li class="flex items-center gap-3">
<span class="material-symbols-outlined text-primary">check_circle</span>
<span class="font-medium">Planejamento tributário sucessório</span>
</li>
<li class="flex items-center gap-3">
<span class="material-symbols-outlined text-primary">check_circle</span>
<span class="font-medium">Regularização de ativos no exterior</span>
</li>
</ul>
<button class="w-fit border-b-2 border-primary text-primary font-bold pb-1 hover:text-surface-dark transition-colors">
                        Falar com Especialista Tributário
                    </button>
</div>
</div>
</section>
<!-- Orienta+ Featured Section - Premium Dark CTA -->
<section class="py-24 bg-background-dark" id="orientaplus">
<div class="max-w-7xl mx-auto px-4 lg:px-8">
<div class="bg-gradient-to-br from-primary via-primary/90 to-surface-dark rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden shadow-2xl">
<div class="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
<svg class="w-full h-full fill-white" viewbox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
<path d="M44.7,-76.4C58.1,-69.2,69.2,-58.1,76.4,-44.7C83.7,-31.3,87.1,-15.7,85.6,-0.8C84.1,14.1,77.7,28.2,69.5,41.2C61.3,54.1,51.3,65.9,38.8,72.9C26.3,79.9,13.1,82.1,-0.6,83.1C-14.3,84.1,-28.7,83.9,-41.7,77.9C-54.7,71.9,-66.3,60.1,-74,46.5C-81.7,32.9,-85.5,17.5,-84.9,2.4C-84.3,-12.7,-79.3,-27.5,-70.7,-40.1C-62.1,-52.7,-49.9,-63,-36.5,-70.2C-23.1,-77.4,-8.6,-81.5,4.7,-89.7C18.1,-97.8,31.4,-83.6,44.7,-76.4Z" transform="translate(100 100)"></path>
</svg>
</div>
<div class="relative z-10 max-w-2xl">
<div class="bg-secondary text-background-dark text-xs font-black px-4 py-1.5 rounded-full w-fit mb-6 shadow-lg">PREMIUM COMMUNITY</div>
<h2 class="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">Chegou a Orienta<span class="text-secondary">+</span></h2>
<p class="text-white/90 text-xl mb-10 leading-relaxed">Uma experiência exclusiva com acesso direto a analistas, masterclasses semanais e uma comunidade de investidores de alta performance.</p>
<div class="grid sm:grid-cols-2 gap-8 mb-12">
<div class="flex gap-4">
<span class="material-symbols-outlined text-secondary text-4xl">groups</span>
<div>
<h4 class="text-white font-bold text-lg">Networking VIP</h4>
<p class="text-white/70 text-sm">Conecte-se com outros investidores e troque insights valiosos.</p>
</div>
</div>
<div class="flex gap-4">
<span class="material-symbols-outlined text-secondary text-4xl">school</span>
<div>
<h4 class="text-white font-bold text-lg">Conteúdo Exclusivo</h4>
<p class="text-white/70 text-sm">Aulas práticas e relatórios que não chegam ao grande público.</p>
</div>
</div>
</div>
<button class="bg-white text-primary px-10 py-4 rounded-xl font-black text-lg hover:bg-slate-100 transition-all shadow-xl shadow-black/20">
                            Faça parte da Orienta+
                        </button>
</div>
</div>
</div>
</section>
</main>
<!-- Footer - Keeping Dark for Elegance -->
<footer class="bg-surface-dark py-16 border-t border-white/5">
<div class="max-w-7xl mx-auto px-4 lg:px-8 grid md:grid-cols-4 gap-12">
<div class="col-span-2">
<div class="flex items-center gap-2 mb-6">
<div class="bg-primary text-white p-1.5 rounded flex items-center justify-center">
<span class="material-symbols-outlined text-sm">payments</span>
</div>
<h2 class="text-white text-xl font-bold tracking-tight">Orienta<span class="text-primary">+</span></h2>
</div>
<p class="text-slate-400 max-w-sm mb-8 leading-relaxed">Guiando brasileiros para a liberdade financeira através de educação, tecnologia e consultoria humana especializada.</p>
<div class="flex gap-4">
<a class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors text-white" href="#">
<span class="material-symbols-outlined">share</span>
</a>
<a class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors text-white" href="#">
<span class="material-symbols-outlined">video_library</span>
</a>
<a class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors text-white" href="#">
<span class="material-symbols-outlined">chat</span>
</a>
</div>
</div>
<div>
<h4 class="text-white font-bold mb-6">Links Rápidos</h4>
<ul class="space-y-4 text-slate-400 text-sm">
<li><a class="hover:text-primary transition-colors" href="#">Sobre Nós</a></li>
<li><a class="hover:text-primary transition-colors" href="#">Nossos Planos</a></li>
<li><a class="hover:text-primary transition-colors" href="#">Blog &amp; Notícias</a></li>
<li><a class="hover:text-primary transition-colors" href="#">Carreiras</a></li>
<li><a class="hover:text-primary transition-colors" href="#">Termos de Uso</a></li>
</ul>
</div>
<div>
<h4 class="text-white font-bold mb-6">Contato</h4>
<ul class="space-y-4 text-slate-400 text-sm">
<li class="flex items-center gap-3">
<span class="material-symbols-outlined text-primary text-lg">mail</span>
                        contato@orienta.plus
                    </li>
<li class="flex items-center gap-3">
<span class="material-symbols-outlined text-primary text-lg">phone</span>
                        0800 123 4567
                    </li>
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-primary text-lg">location_on</span>
<span>Av. Paulista, 1000<br/>Bela Vista, São Paulo - SP</span>
</li>
</ul>
</div>
</div>
<div class="max-w-7xl mx-auto px-4 lg:px-8 mt-16 pt-8 border-t border-white/5 text-center text-slate-500 text-xs">
            © 2023 Orienta+ Financial Guidance. Todos os direitos reservados.
        </div>
</footer>
</body></html>

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
