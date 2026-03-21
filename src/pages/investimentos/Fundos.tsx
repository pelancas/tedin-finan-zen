import ContentPage from "@/components/ContentPage";
import { ShieldAlert, BookOpen, Play, Wrench, HelpCircle } from "lucide-react";
import type { CategoryConfig } from "@/components/ContentPage";

const categories: CategoryConfig[] = [
  { id: "cuidados", label: "Cuidados iniciais", icon: ShieldAlert, order: 0 },
  { id: "guias", label: "Guias", icon: BookOpen, order: 1 },
  { id: "videos", label: "Vídeos", icon: Play, order: 2 },
  { id: "ferramentas", label: "Ferramentas", icon: Wrench, order: 3 },
  { id: "duvidas", label: "Dúvidas comuns", icon: HelpCircle, order: 4 },
];

const Fundos = () => (
  <ContentPage
    folder="fundos"
    badgeLabel="Investimentos"
    pageTitle="Fundos de Investimento"
    categories={categories}
  />
);

export default Fundos;
