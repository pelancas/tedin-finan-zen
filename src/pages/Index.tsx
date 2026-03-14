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
      <Hero />
      

    </Layout>
  );
};

export default Index;
