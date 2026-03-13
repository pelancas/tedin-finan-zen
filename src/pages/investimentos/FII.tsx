import { Layout } from "@/components/layout/Layout";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronRight, ShieldAlert, BookOpen, Play, Wrench, HelpCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { fundosContent } from "@/content/fundos";
import { parseMarkdownContent, type ContentItem } from "@/lib/content-parser";

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

const Fundos = () => {
  const [selectedContent, setSelectedContent] = useState<string>("o-que-sao");
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["cuidados"]);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const contentItems = useMemo<ContentItem[]>(
    () => fundosContent.map(parseMarkdownContent),
    []
  );

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    );
  };

  const currentContent = contentItems.find((c) => c.meta.id === selectedContent);
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
                <article className="prose prose-sm md:prose-base max-w-none">
                  <h2 className="text-2xl font-bold mb-2">{currentContent.meta.title}</h2>
                  <p className="text-lg text-muted-foreground mb-6">{currentContent.meta.summary}</p>

                  {currentContent.meta.video && (
                    <div className="aspect-video rounded-lg overflow-hidden mb-6">
                      <iframe
                        src={currentContent.meta.video}
                        title={currentContent.meta.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>
                  )}

                  <ReactMarkdown
                    components={{
                      a: ({ href, children }) => (
                        <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                          {children}
                        </a>
                      ),
                      blockquote: ({ children }) => (
                        <div className="p-4 bg-muted rounded-lg my-4">{children}</div>
                      ),
                      table: ({ children }) => (
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse text-sm">{children}</table>
                        </div>
                      ),
                      th: ({ children }) => (
                        <th className="text-left py-2 pr-4 font-semibold border-b">{children}</th>
                      ),
                      td: ({ children }) => (
                        <td className="py-2 pr-4 border-b">{children}</td>
                      ),
                    }}
                  >
                    {currentContent.body}
                  </ReactMarkdown>
                </article>
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
