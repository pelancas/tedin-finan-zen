import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Sobre from "./pages/Sobre";
import Despesas from "./pages/planejamento/Despesas";
import Imposto from "./pages/impostos/Imposto";
import OrientaPlus from "./pages/orienta-plus/OrientaPlus";
import AnaliseCarteira from "./pages/orienta-plus/AnaliseCarteira";
import PlanejamentoFinanceiro from "./pages/orienta-plus/PlanejamentoFinanceiro";
import Ferramentas from "./pages/planejamento/Ferramentas";
import Fundos from "./pages/investimentos/Fundos";
import RendaFixa from "./pages/investimentos/RendaFixa";
import FII from "./pages/investimentos/FII";
import Acoes from "./pages/investimentos/Acoes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/despesas" element={<Despesas />} />
          <Route path="/imposto" element={<Imposto />} />
          <Route path="/orientaplus" element={<OrientaPlus />} />
          <Route path="/orientaplus/analisecarteira" element={<AnaliseCarteira />} />
          <Route path="/orientaplus/planejamentofinanceiro" element={<PlanejamentoFinanceiro />} />
          <Route path="/ferramentas" element={<Ferramentas />} />
          <Route path="/ferramentas/:tool" element={<Ferramentas />} />
          <Route path="/investimentos/fundos" element={<Fundos />} />
          <Route path="/investimentos/rendafixa" element={<RendaFixa />} />
          <Route path="/investimentos/fii" element={<FII />} />
          <Route path="/investimentos/acoes" element={<Acoes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
