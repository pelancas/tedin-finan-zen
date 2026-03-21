import { Layout } from "@/components/layout/Layout";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronRight, ShieldAlert, BookOpen, Play, Wrench, HelpCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { loadContent } from "@/lib/content-loader";
import type { ContentItem } from "@/lib/content-parser";
import type { LucideIcon } from "lucide-react";

const defaultIconMap: Record<string, LucideIcon> = {
  cuidados: ShieldAlert,
  guias: BookOpen,
  videos: Play,
  ferramentas: Wrench,
  duvidas: HelpCircle,
};

const defaultLabelMap: Record<string, string> = {
  cuidados: "Cuidados iniciais",
  guias: "Guias",
  videos: "Vídeos",
  ferramentas: "Ferramentas",
  duvidas: "Dúvidas comuns",
};

export interface CategoryConfig {
  id: string;
  label: string;
  icon: LucideIcon;
  order: number;
}

interface ContentPageProps {
  folder: string;
  badgeLabel: string;
  pageTitle: string;
  categories?: CategoryConfig[];
}

export default function ContentPage({ folder, badgeLabel, pageTitle, categories: customCategories }: ContentPageProps) {
  const contentItems = useMemo<ContentItem[]>(() => loadContent(folder), [folder]);

  // Build categories from content if not provided
  const categories = useMemo(() => {
    if (customCategories) return customCategories;

    const seen = new Map<string, number>();
    for (const item of contentItems) {
      const cat = item.meta.category;
      if (!seen.has(cat)) {
        seen.set(cat, seen.size);
      }
    }

    return Array.from(seen.keys()).map((catId, i) => ({
      id: catId,
      label: defaultLabelMap[catId] || catId,
      icon: defaultIconMap[catId] || BookOpen,
      order: i,
    }));
  }, [contentItems, customCategories]);

  const sortedCategories = useMemo(
    () => [...categories].sort((a, b) => a.order - b.order),
    [categories]
  );

  // Group content items by category
  const contentByCategory = useMemo(() => {
    const map = new Map<string, ContentItem[]>();
    for (const item of contentItems) {
      const cat = item.meta.category;
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)!.push(item);
    }
    return map;
  }, [contentItems]);

  const firstItemId = contentItems[0]?.meta.id || "";
  const [selectedContent, setSelectedContent] = useState<string>(firstItemId);
  const [expandedCategories, setExpandedCategories] = useState<string[]>(
    sortedCategories.length > 0 ? [sortedCategories[0].id] : []
  );
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    );
  };

  const currentContent = contentItems.find((c) => c.meta.id === selectedContent);
  const currentCategory = sortedCategories.find((cat) =>
    contentByCategory.get(cat.id)?.some((item) => item.meta.id === selectedContent)
  );

  const handleSelectContent = (id: string) => {
    setSelectedContent(id);
    setMobileSidebarOpen(false);
  };

  const Sidebar = () => (
    <nav className="space-y-1">
      {sortedCategories.map((category) => {
        const isExpanded = expandedCategories.includes(category.id);
        const Icon = category.icon;
        const items = contentByCategory.get(category.id) || [];
        const hasActive = items.some((item) => item.meta.id === selectedContent);

        if (items.length === 0) return null;

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
                {items.map((item) => (
                  <button
                    key={item.meta.id}
                    onClick={() => handleSelectContent(item.meta.id)}
                    className={cn(
                      "block w-full text-left px-2 py-1.5 rounded text-sm transition-colors",
                      selectedContent === item.meta.id
                        ? "bg-primary text-primary-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    {item.meta.title}
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
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{badgeLabel}</Badge>
              {currentCategory && (
                <>
                  <span className="text-muted-foreground">/</span>
                  <Badge variant="outline">{currentCategory.label}</Badge>
                </>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold">{pageTitle}</h1>
          </div>

          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="md:hidden mb-4 flex items-center gap-2 px-4 py-2 border rounded-md text-sm font-medium w-full justify-between"
          >
            <span>Navegar conteúdos</span>
            <ChevronDown className={cn("h-4 w-4 transition-transform", mobileSidebarOpen && "rotate-180")} />
          </button>

          {mobileSidebarOpen && (
            <div className="md:hidden mb-6 p-4 border rounded-lg bg-card">
              <Sidebar />
            </div>
          )}

          <div className="flex gap-8">
            <aside className="hidden md:block w-72 shrink-0">
              <div className="sticky top-24">
                <ScrollArea className="h-[calc(100vh-12rem)]">
                  <Sidebar />
                </ScrollArea>
              </div>
            </aside>

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
}
