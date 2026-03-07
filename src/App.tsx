import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Sobre from "./pages/Sobre";
import Despesas from "./pages/Despesas";
import Imposto from "./pages/Imposto";
import Consultoria from "./pages/Consultoria";
import AnaliseCarteira from "./pages/AnaliseCarteira";
import Ferramentas from "./pages/Ferramentas";
import Fundos from "./pages/investimentos/Fundos";
import ConsultoriaLanding from "./pages/ConsultoriaLanding";
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
          <Route path="/consultorialanding" element={<ConsultoriaLanding />} />
          <Route path="/consultoria/analisecarteira" element={<AnaliseCarteira />} />
          <Route path="/ferramentas" element={<Ferramentas />} />
          <Route path="/ferramentas/:tool" element={<Ferramentas />} />
          <Route path="/investimentos/fundos" element={<Fundos />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
