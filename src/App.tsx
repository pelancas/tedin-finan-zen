import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@/components/Analytics";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Sobre from "./pages/Sobre";
import Despesas from "./pages/planejamento/Despesas";
import Aposentadoria from "./pages/planejamento/Aposentadoria";
import Metas from "./pages/planejamento/Metas";
import Milhao from "./pages/planejamento/Milhao";
import Imposto from "./pages/impostos/Imposto";
import OrientaPlus from "./pages/orienta-plus/OrientaPlus";
import AnaliseCarteira from "./pages/orienta-plus/AnaliseCarteira";
import PlanejamentoFinanceiro from "./pages/orienta-plus/PlanejamentoFinanceiro";
import Fundos from "./pages/investimentos/Fundos";
import RendaFixa from "./pages/investimentos/RendaFixa";
import ComparadorRendaFixa from "./pages/investimentos/ComparadorRendaFixa";
import FII from "./pages/investimentos/FII";
import Acoes from "./pages/investimentos/Acoes";
import Seguros from "./pages/seguros/Seguros";
import SegurosConteudo from "./pages/seguros/SegurosConteudo";
import PlanejamentoConteudo from "./pages/planejamento/PlanejamentoConteudo";
import RelatorioAvaliacaoRiscos from "./pages/relatorio-riscos/RelatorioAvaliacaoRiscos";
import RelatorioAvaliacaoRiscosAutonomos from "./pages/relatorio-riscos/RelatorioAvaliacaoRiscosAutonomos";
import RelatorioAvaliacaoRiscosResultado from "./pages/relatorio-riscos/RelatorioAvaliacaoRiscosResultado";
import RelatorioAvaliacaoRiscosProcessando from "./pages/relatorio-riscos/RelatorioAvaliacaoRiscosProcessando";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter future={{ v7_relativeSplatPath: true }}>
        <ScrollToTop />
        <Analytics />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/planejamento/despesas" element={<Despesas />} />
          <Route path="/planejamento/calculadoras/aposentadoria" element={<Aposentadoria />} />
          <Route path="/planejamento/calculadoras/metas" element={<Metas />} />
          <Route path="/planejamento/calculadoras/milhao" element={<Milhao />} />
          <Route path="/planejamento/conteudos" element={<PlanejamentoConteudo />} />
          <Route path="/impostos" element={<Imposto />} />
          <Route path="/orientaplus" element={<OrientaPlus />} />
          <Route path="/orientaplus/analisecarteira" element={<AnaliseCarteira />} />
          <Route path="/orientaplus/planejamentofinanceiro" element={<PlanejamentoFinanceiro />} />
          <Route path="/investimentos/acoes" element={<Acoes />} />
          <Route path="/investimentos/fii" element={<FII />} />
          <Route path="/investimentos/fundos" element={<Fundos />} />
          <Route path="/investimentos/renda-fixa" element={<RendaFixa />} />
          <Route path="/investimentos/renda-fixa/comparador" element={<ComparadorRendaFixa />} />
          <Route path="/seguros" element={<Seguros />} />
          <Route path="/seguros/conteudos" element={<SegurosConteudo />} />
          <Route path="/relatorio-avaliacao-riscos" element={<RelatorioAvaliacaoRiscos />} />
          <Route
            path="/relatorio-avaliacao-riscos-autonomos"
            element={<RelatorioAvaliacaoRiscosAutonomos />}
          />
          <Route
            path="/relatorio-avaliacao-riscos/resultado"
            element={<RelatorioAvaliacaoRiscosResultado />}
          />
          <Route
            path="/relatorio-avaliacao-riscos/processando"
            element={<RelatorioAvaliacaoRiscosProcessando />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
