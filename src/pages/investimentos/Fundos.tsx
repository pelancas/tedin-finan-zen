import { Layout } from "@/components/layout/Layout";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronRight, ShieldAlert, BookOpen, Play, Wrench, HelpCircle } from "lucide-react";

interface ContentItem {
  id: string;
  title: string;
  category: string;
  subcategory?: string;
  content: React.ReactNode;
}

const categories = [
  {
    id: "cuidados",
    label: "Cuidados iniciais",
    icon: ShieldAlert,
    subcategories: [
      { id: "o-que-sao", label: "Mas o que raios são fundos" },
      { id: "porque-investir", label: "Porque querem que eu invista em um" },
      { id: "multimercado", label: "Multimercado: linguiça ou bilhete premiado?" },
      { id: "como-enganam", label: "Como te enganam - não são todos" },
      { id: "taxa-e-bom", label: "Ter taxa é bom?" },
    ],
  },
  {
    id: "guias",
    label: "Guias",
    icon: BookOpen,
    subcategories: [
      { id: "guia-iniciante", label: "Guia para iniciantes" },
      { id: "guia-comparacao", label: "Como comparar fundos" },
    ],
  },
  {
    id: "videos",
    label: "Vídeos",
    icon: Play,
    subcategories: [
      { id: "video-intro", label: "O que são Fundos de Investimento?" },
      { id: "video-pratica", label: "Fundos de Investimento na Prática" },
    ],
  },
  {
    id: "ferramentas",
    label: "Ferramentas",
    icon: Wrench,
    subcategories: [
      { id: "comparador", label: "Comparador de Fundos" },
    ],
  },
  {
    id: "duvidas",
    label: "Dúvidas comuns",
    icon: HelpCircle,
    subcategories: [
      { id: "risco", label: "Qual o risco de investir em fundos?" },
      { id: "resgatar", label: "Posso resgatar a qualquer hora?" },
      { id: "imposto", label: "Como funciona o imposto?" },
    ],
  },
];

const contents: ContentItem[] = [
  // Cuidados iniciais
  {
    id: "o-que-sao",
    title: "Mas o que raios são fundos",
    category: "cuidados",
    subcategory: "o-que-sao",
    content: (
      <article className="prose prose-sm md:prose-base max-w-none">
        <p className="text-lg text-muted-foreground mb-6">
          Se você já ouviu falar de fundos de investimento e ficou confuso, calma. Vamos descomplicar.
        </p>
        <h2 className="text-xl font-semibold mb-4">A ideia por trás</h2>
        <p>Imagine que você e mais algumas pessoas juntam dinheiro e contratam alguém experiente para investir por vocês. Esse "alguém" é o <strong>gestor do fundo</strong>. Ele decide onde aplicar o dinheiro — pode ser em ações, títulos do governo, moedas estrangeiras, imóveis e muito mais.</p>
        <p>Quando você investe em um fundo, na verdade está comprando <strong>cotas</strong>. Cada cota representa uma fração do patrimônio total do fundo. Se o fundo vai bem, suas cotas valorizam. Se vai mal… já sabe.</p>
        <h2 className="text-xl font-semibold mt-8 mb-4">Tipos principais</h2>
        <ul className="space-y-2">
          <li><strong>Renda Fixa:</strong> Investem majoritariamente em títulos de renda fixa. Mais conservadores.</li>
          <li><strong>Multimercado:</strong> Misturam vários tipos de ativos. Mais flexíveis, mais risco.</li>
          <li><strong>Ações:</strong> Pelo menos 67% em ações. Para quem aguenta volatilidade.</li>
          <li><strong>Cambial:</strong> Atrelados a moedas estrangeiras, como dólar e euro.</li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-4">Resumo rápido</h2>
        <p>Fundos são uma forma <strong>coletiva</strong> e <strong>profissional</strong> de investir. Você não precisa escolher cada ativo — o gestor faz isso por você. Em troca, paga taxas. Simples assim.</p>
      </article>
    ),
  },
  {
    id: "porque-investir",
    title: "Porque querem que eu invista em um",
    category: "cuidados",
    subcategory: "porque-investir",
    content: (
      <article className="prose prose-sm md:prose-base max-w-none">
        <p className="text-lg text-muted-foreground mb-6">
          Todo mundo parece empurrar fundos pra você. Seu gerente, influenciadores, até o app do banco. Mas por quê?
        </p>
        <h2 className="text-xl font-semibold mb-4">O interesse do banco</h2>
        <p>Bancos e corretoras ganham com as <strong>taxas de administração</strong> dos fundos. Quanto mais gente investindo, mais eles lucram — independente do fundo ir bem ou mal. Por isso insistem tanto.</p>
        <h2 className="text-xl font-semibold mt-8 mb-4">Quando faz sentido pra você</h2>
        <p>Nem todo fundo é golpe. Fundos podem ser bons quando:</p>
        <ul className="space-y-2">
          <li>Você <strong>não tem tempo</strong> para acompanhar o mercado</li>
          <li>Quer acesso a ativos que sozinho seria difícil (ex: mercado internacional)</li>
          <li>Busca <strong>diversificação</strong> sem complicação</li>
          <li>O gestor é <strong>reconhecido e transparente</strong></li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-4">Quando NÃO faz sentido</h2>
        <p>Desconfie quando a taxa é alta para um fundo que apenas replica o CDI. Se você pode comprar um Tesouro Selic direto pagando quase nada, por que pagar 2% ao ano para alguém fazer a mesma coisa?</p>
        <p className="mt-4 p-4 bg-muted rounded-lg"><strong>Regra de ouro:</strong> Sempre pergunte "eu consigo fazer isso sozinho por menos?" Se a resposta for sim, pule o fundo.</p>
      </article>
    ),
  },
  {
    id: "multimercado",
    title: "Multimercado: linguiça ou bilhete premiado?",
    category: "cuidados",
    subcategory: "multimercado",
    content: (
      <article className="prose prose-sm md:prose-base max-w-none">
        <p className="text-lg text-muted-foreground mb-6">
          Fundos multimercado são os mais "livres" do mercado. Isso pode ser ótimo — ou péssimo.
        </p>
        <h2 className="text-xl font-semibold mb-4">O que são</h2>
        <p>Multimercados podem investir em praticamente tudo: ações, câmbio, renda fixa, derivativos, commodities. O gestor tem liberdade total para montar a estratégia.</p>
        <h2 className="text-xl font-semibold mt-8 mb-4">O lado bom</h2>
        <ul className="space-y-2">
          <li>Flexibilidade para surfar diferentes cenários econômicos</li>
          <li>Potencial de retorno acima da renda fixa</li>
          <li>Gestores talentosos podem realmente entregar valor</li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-4">O lado ruim</h2>
        <ul className="space-y-2">
          <li>Taxas costumam ser altas (2% admin + 20% performance é comum)</li>
          <li>Muitos não batem nem o CDI de forma consistente</li>
          <li>A "liberdade" do gestor pode significar apostas arriscadas</li>
        </ul>
        <p className="mt-4 p-4 bg-muted rounded-lg"><strong>Dica:</strong> Antes de investir, olhe o histórico de pelo menos 3 anos. Compare com o CDI. Se o fundo não ganha do CDI consistentemente, não vale a taxa.</p>
      </article>
    ),
  },
  {
    id: "como-enganam",
    title: "Como te enganam - não são todos",
    category: "cuidados",
    subcategory: "como-enganam",
    content: (
      <article className="prose prose-sm md:prose-base max-w-none">
        <p className="text-lg text-muted-foreground mb-6">
          Existem fundos excelentes. Mas existem armadilhas disfarçadas de investimento. Saiba identificar.
        </p>
        <h2 className="text-xl font-semibold mb-4">Truques comuns</h2>
        <ul className="space-y-3">
          <li><strong>Taxa alta para estratégia simples:</strong> Fundos de renda fixa cobrando 2% ao ano para comprar Tesouro Selic. Você faz isso sozinho pagando quase nada.</li>
          <li><strong>Rentabilidade "passada":</strong> Mostram o melhor período possível. Peça para ver os últimos 5 anos completos.</li>
          <li><strong>Nome bonito, estratégia vazia:</strong> "Fundo Premium Exclusive Gold". O nome não importa, a lâmina sim.</li>
          <li><strong>Come-cotas:</strong> Imposto antecipado que muita gente nem sabe que existe. Ele "come" suas cotas duas vezes ao ano.</li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-4">Como se proteger</h2>
        <ol className="space-y-2">
          <li>Leia a <strong>lâmina do fundo</strong> antes de investir</li>
          <li>Compare a <strong>taxa de administração</strong> com fundos similares</li>
          <li>Verifique se o fundo <strong>supera o benchmark</strong> de forma consistente</li>
          <li>Desconfie de promessas de retorno garantido</li>
        </ol>
      </article>
    ),
  },
  {
    id: "taxa-e-bom",
    title: "Ter taxa é bom?",
    category: "cuidados",
    subcategory: "taxa-e-bom",
    content: (
      <article className="prose prose-sm md:prose-base max-w-none">
        <p className="text-lg text-muted-foreground mb-6">
          Parece contraditório, mas sim — em alguns casos, pagar taxa faz sentido.
        </p>
        <h2 className="text-xl font-semibold mb-4">Taxa de administração</h2>
        <p>É o custo anual pela gestão do fundo. Um gestor competente que entrega retorno acima do mercado <strong>vale</strong> a taxa. O problema é quando a taxa é alta e o retorno é medíocre.</p>
        <h2 className="text-xl font-semibold mt-8 mb-4">Taxa de performance</h2>
        <p>Cobrada quando o fundo supera o benchmark. Em tese, alinha interesses: o gestor só ganha mais se você ganhar mais. Faz sentido — <strong>se o fundo realmente entregar</strong>.</p>
        <h2 className="text-xl font-semibold mt-8 mb-4">Quando a taxa é justa</h2>
        <ul className="space-y-2">
          <li>O fundo consistentemente <strong>supera o benchmark</strong> mesmo após taxas</li>
          <li>A estratégia é complexa e difícil de replicar sozinho</li>
          <li>O gestor tem <strong>histórico comprovado</strong> de longo prazo</li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-4">Quando não é</h2>
        <ul className="space-y-2">
          <li>Fundo de renda fixa simples com taxa acima de 0,5% ao ano</li>
          <li>Fundo que apenas replica um índice (prefira ETFs)</li>
          <li>Fundo que perde do CDI na maioria dos anos</li>
        </ul>
      </article>
    ),
  },
  // Guias
  {
    id: "guia-iniciante",
    title: "Guia para iniciantes",
    category: "guias",
    subcategory: "guia-iniciante",
    content: (
      <article className="prose prose-sm md:prose-base max-w-none">
        <p className="text-lg text-muted-foreground mb-6">
          Um guia completo sobre fundos de investimento para quem está começando.
        </p>
        <h2 className="text-xl font-semibold mb-4">Guia Completo – InfoMoney</h2>
        <p>O InfoMoney oferece um guia detalhado sobre fundos de investimento, cobrindo desde o que são até como escolher os melhores para seu perfil.</p>
        <div className="mt-4 p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">O que você vai aprender:</h3>
          <ul className="space-y-1">
            <li>O que são fundos de investimento</li>
            <li>Como funcionam as cotas e taxas</li>
            <li>Tipos de fundos disponíveis no mercado</li>
            <li>Como começar a investir</li>
          </ul>
          <a href="https://www.infomoney.com.br/guias/fundos-de-investimento/" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-primary hover:underline font-medium">
            Acessar guia completo →
          </a>
        </div>
        <h2 className="text-xl font-semibold mt-8 mb-4">Curso ANBIMA</h2>
        <p>A ANBIMA oferece um curso gratuito sobre fundos de investimento, ideal para quem quer conteúdo de qualidade com certificação reconhecida pelo mercado.</p>
        <div className="mt-4 p-4 border rounded-lg">
          <Badge className="mb-2">Gratuito</Badge>
          <p className="text-sm">Curso completo sobre fundos com certificação.</p>
          <a href="https://www.anbima.com.br/email/Paginas/carreiras/curso-fundos/" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-primary hover:underline font-medium">
            Acessar curso →
          </a>
        </div>
      </article>
    ),
  },
  {
    id: "guia-comparacao",
    title: "Como comparar fundos",
    category: "guias",
    subcategory: "guia-comparacao",
    content: (
      <article className="prose prose-sm md:prose-base max-w-none">
        <p className="text-lg text-muted-foreground mb-6">
          Antes de investir em qualquer fundo, saiba o que comparar para tomar a melhor decisão.
        </p>
        <h2 className="text-xl font-semibold mb-4">O que analisar</h2>
        <ul className="space-y-2">
          <li><strong>Rentabilidade vs Benchmark:</strong> O fundo supera o CDI ou o Ibovespa? Compare ao longo de 1, 3 e 5 anos.</li>
          <li><strong>Taxa de administração:</strong> Fundos similares cobram quanto? Compare sempre.</li>
          <li><strong>Volatilidade:</strong> Quanto o fundo oscila? Quanto maior, mais risco.</li>
          <li><strong>Patrimônio líquido:</strong> Fundos muito pequenos podem ter problemas de liquidez.</li>
          <li><strong>Prazo de resgate:</strong> Quanto tempo leva para você receber o dinheiro de volta?</li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-4">Ferramenta de comparação</h2>
        <div className="mt-4 p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Comparador de Fundos – Mais Retorno</h3>
          <p className="text-sm text-muted-foreground">Compare fundos lado a lado: rentabilidade, taxas, risco e muito mais.</p>
          <a href="https://maisretorno.com/comparacao-fundos" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-primary hover:underline font-medium">
            Acessar comparador →
          </a>
        </div>
      </article>
    ),
  },
  // Videos
  {
    id: "video-intro",
    title: "O que são Fundos de Investimento?",
    category: "videos",
    subcategory: "video-intro",
    content: (
      <article className="prose prose-sm md:prose-base max-w-none">
        <p className="text-lg text-muted-foreground mb-6">
          Entenda de forma simples como funcionam os fundos de investimento, seus tipos e como escolher o melhor para o seu perfil.
        </p>
        <div className="aspect-video rounded-lg overflow-hidden mb-6">
          <iframe
            src="https://www.youtube.com/embed/8QnAr1sF4Sg"
            title="O que são Fundos de Investimento?"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
        <h2 className="text-xl font-semibold mb-4">Sobre o vídeo</h2>
        <p>Este vídeo explica de forma didática o conceito de fundos de investimento, abordando como funcionam, quais são os principais tipos e o que considerar antes de investir. Ideal para quem está começando e quer entender o básico antes de tomar qualquer decisão.</p>
      </article>
    ),
  },
  {
    id: "video-pratica",
    title: "Fundos de Investimento na Prática",
    category: "videos",
    subcategory: "video-pratica",
    content: (
      <article className="prose prose-sm md:prose-base max-w-none">
        <p className="text-lg text-muted-foreground mb-6">
          Aprenda na prática como investir em fundos, analisar taxas e comparar rentabilidades.
        </p>
        <div className="aspect-video rounded-lg overflow-hidden mb-6">
          <iframe
            src="https://www.youtube.com/embed/YHnaVTXMI_I"
            title="Fundos de Investimento na Prática"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
        <h2 className="text-xl font-semibold mb-4">Sobre o vídeo</h2>
        <p>Neste vídeo, você aprende na prática como analisar e investir em fundos. São abordados temas como leitura de lâminas, comparação de taxas e análise de rentabilidade histórica — tudo que você precisa para tomar decisões mais informadas.</p>
      </article>
    ),
  },
  // Ferramentas
  {
    id: "comparador",
    title: "Comparador de Fundos",
    category: "ferramentas",
    subcategory: "comparador",
    content: (
      <article className="prose prose-sm md:prose-base max-w-none">
        <p className="text-lg text-muted-foreground mb-6">
          Ferramentas essenciais para analisar e comparar fundos de investimento antes de tomar uma decisão.
        </p>
        <h2 className="text-xl font-semibold mb-4">Mais Retorno – Comparador de Fundos</h2>
        <p>A plataforma Mais Retorno permite comparar fundos lado a lado, analisando rentabilidade, taxas de administração, risco e outros indicadores importantes.</p>
        <div className="mt-4 p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">O que você pode fazer:</h3>
          <ul className="space-y-1">
            <li>Comparar rentabilidade de múltiplos fundos</li>
            <li>Analisar taxas de administração e performance</li>
            <li>Verificar o nível de risco (volatilidade)</li>
            <li>Consultar patrimônio líquido e captação</li>
          </ul>
          <a href="https://maisretorno.com/comparacao-fundos" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-primary hover:underline font-medium">
            Acessar comparador →
          </a>
        </div>
      </article>
    ),
  },
  // Dúvidas comuns
  {
    id: "risco",
    title: "Qual o risco de investir em fundos?",
    category: "duvidas",
    subcategory: "risco",
    content: (
      <article className="prose prose-sm md:prose-base max-w-none">
        <p className="text-lg text-muted-foreground mb-6">
          Todo investimento tem risco. Em fundos, o risco depende do tipo e da estratégia.
        </p>
        <h2 className="text-xl font-semibold mb-4">Tipos de risco</h2>
        <ul className="space-y-3">
          <li><strong>Risco de mercado:</strong> As cotas podem desvalorizar se os ativos do fundo caírem. Fundos de ações e multimercado têm mais esse risco.</li>
          <li><strong>Risco de crédito:</strong> Em fundos de renda fixa, existe o risco do emissor dos títulos não pagar. Fundos que investem em crédito privado têm mais esse risco.</li>
          <li><strong>Risco de liquidez:</strong> Alguns fundos demoram dias ou semanas para devolver seu dinheiro. Verifique sempre o prazo de resgate.</li>
          <li><strong>Risco de gestão:</strong> O gestor pode tomar decisões ruins. Por isso é importante avaliar o histórico.</li>
        </ul>
        <p className="mt-4 p-4 bg-muted rounded-lg"><strong>Importante:</strong> Fundos NÃO têm garantia do FGC (Fundo Garantidor de Créditos). Se o fundo tiver prejuízo, você perde dinheiro.</p>
      </article>
    ),
  },
  {
    id: "resgatar",
    title: "Posso resgatar a qualquer hora?",
    category: "duvidas",
    subcategory: "resgatar",
    content: (
      <article className="prose prose-sm md:prose-base max-w-none">
        <p className="text-lg text-muted-foreground mb-6">
          Depende do fundo. Alguns permitem resgate no mesmo dia, outros levam semanas.
        </p>
        <h2 className="text-xl font-semibold mb-4">Prazos importantes</h2>
        <ul className="space-y-3">
          <li><strong>D+0:</strong> Resgate no mesmo dia. Comum em fundos de renda fixa simples e fundos DI.</li>
          <li><strong>D+1 a D+5:</strong> Resgate em poucos dias úteis. Fundos multimercado mais líquidos.</li>
          <li><strong>D+30 ou mais:</strong> Fundos com estratégias mais complexas. Podem levar 30, 60 ou até 90 dias para devolver seu dinheiro.</li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-4">Cotização vs Liquidação</h2>
        <p><strong>Cotização</strong> é quando calculam o valor das suas cotas. <strong>Liquidação</strong> é quando o dinheiro cai na sua conta. São datas diferentes!</p>
        <p className="mt-4 p-4 bg-muted rounded-lg"><strong>Dica:</strong> Se você pode precisar do dinheiro com urgência, prefira fundos com resgate em D+0 ou D+1.</p>
      </article>
    ),
  },
  {
    id: "imposto",
    title: "Como funciona o imposto?",
    category: "duvidas",
    subcategory: "imposto",
    content: (
      <article className="prose prose-sm md:prose-base max-w-none">
        <p className="text-lg text-muted-foreground mb-6">
          Fundos de investimento têm tributação própria — e um mecanismo chamado come-cotas que muita gente desconhece.
        </p>
        <h2 className="text-xl font-semibold mb-4">Tabela regressiva de IR</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 pr-4 font-semibold">Prazo</th>
                <th className="text-left py-2 font-semibold">Alíquota</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b"><td className="py-2 pr-4">Até 180 dias</td><td>22,5%</td></tr>
              <tr className="border-b"><td className="py-2 pr-4">181 a 360 dias</td><td>20%</td></tr>
              <tr className="border-b"><td className="py-2 pr-4">361 a 720 dias</td><td>17,5%</td></tr>
              <tr><td className="py-2 pr-4">Acima de 720 dias</td><td>15%</td></tr>
            </tbody>
          </table>
        </div>
        <h2 className="text-xl font-semibold mt-8 mb-4">Come-cotas</h2>
        <p>É uma antecipação do imposto de renda que acontece em maio e novembro. O governo "come" parte das suas cotas automaticamente, mesmo que você não resgate. A alíquota é de 15% (longo prazo) ou 20% (curto prazo) sobre o rendimento do período.</p>
        <h2 className="text-xl font-semibold mt-8 mb-4">Fundos de ações</h2>
        <p>Fundos classificados como "ações" têm alíquota fixa de <strong>15%</strong> sobre o lucro, independente do prazo. E não têm come-cotas!</p>
      </article>
    ),
  },
];

const Fundos = () => {
  const [selectedContent, setSelectedContent] = useState<string>("o-que-sao");
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["cuidados"]);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    );
  };

  const currentContent = contents.find((c) => c.id === selectedContent);
  const currentCategory = categories.find((cat) =>
    cat.subcategories.some((sub) => sub.id === selectedContent)
  );

  const handleSelectContent = (id: string) => {
    setSelectedContent(id);
    setMobileSidebarOpen(false);
  };

  const Sidebar = () => (
    <nav className="space-y-1">
      {categories.map((category) => {
        const isExpanded = expandedCategories.includes(category.id);
        const Icon = category.icon;
        const hasActive = category.subcategories.some((sub) => sub.id === selectedContent);

        return (
          <div key={category.id}>
            <button
              onClick={() => toggleCategory(category.id)}
              className={cn(
                "flex items-center gap-2 w-full px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                hasActive ? "bg-primary/10 text-primary" : "hover:bg-muted text-foreground"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="flex-1 text-left">{category.label}</span>
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 shrink-0" />
              ) : (
                <ChevronRight className="h-4 w-4 shrink-0" />
              )}
            </button>
            {isExpanded && (
              <div className="ml-4 mt-1 space-y-0.5 border-l-2 border-border pl-3">
                {category.subcategories.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => handleSelectContent(sub.id)}
                    className={cn(
                      "block w-full text-left px-2 py-1.5 rounded text-sm transition-colors",
                      selectedContent === sub.id
                        ? "bg-primary text-primary-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );

  return (
    <Layout>
      <section className="py-8 md:py-12">
        <div className="container max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">Investimentos</Badge>
              {currentCategory && (
                <>
                  <span className="text-muted-foreground">/</span>
                  <Badge variant="outline">{currentCategory.label}</Badge>
                </>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold">Fundos de Investimento</h1>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="md:hidden mb-4 flex items-center gap-2 px-4 py-2 border rounded-md text-sm font-medium w-full justify-between"
          >
            <span>Navegar conteúdos</span>
            <ChevronDown className={cn("h-4 w-4 transition-transform", mobileSidebarOpen && "rotate-180")} />
          </button>

          {/* Mobile sidebar */}
          {mobileSidebarOpen && (
            <div className="md:hidden mb-6 p-4 border rounded-lg bg-card">
              <Sidebar />
            </div>
          )}

          <div className="flex gap-8">
            {/* Desktop sidebar */}
            <aside className="hidden md:block w-72 shrink-0">
              <div className="sticky top-24">
                <ScrollArea className="h-[calc(100vh-12rem)]">
                  <Sidebar />
                </ScrollArea>
              </div>
            </aside>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {currentContent ? (
                <div>
                  <h2 className="text-2xl font-bold mb-6">{currentContent.title}</h2>
              {currentContent.content}

                  {/* Mobile bottom navigation */}
                  <div className="md:hidden mt-10 p-4 border rounded-lg bg-card">
                    <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Navegar conteúdos</h3>
                    <Sidebar />
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">Selecione um conteúdo no menu ao lado.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Fundos;
