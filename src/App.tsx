import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Sobre from "./pages/Sobre";
import Despesas from "./pages/planejamento/Despesas";
import Imposto from "./pages/impostos/Imposto";
import Consultoria from "./pages/orienta-plus/Consultoria";
import AnaliseCarteira from "./pages/orienta-plus/AnaliseCarteira";
import ConsultoriaFinanceira from "./pages/orienta-plus/ConsultoriaFinanceira";
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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/despesas" element={<Despesas />} />
          <Route path="/imposto" element={<Imposto />} />
          <Route path="/consultoria" element={<Consultoria />} />
          <Route path="/consultoria/analisecarteira" element={<AnaliseCarteira />} />
          <Route path="/consultoria/consultoriafinanceira" element={<ConsultoriaFinanceira />} />
          <Route path="/ferramentas" element={<Ferramentas />} />
          <Route path="/ferramentas/:tool" element={<Ferramentas />} />
          <Route path="/investimentos/fundos" element={<Fundos />} />
          <Route path="/investimentos/rendafixa" element={<RendaFixa />} />
          <Route path="/investimentos/fii" element={<FII />} />
          <Route path="/investimentos/acoes" element={<Acoes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
