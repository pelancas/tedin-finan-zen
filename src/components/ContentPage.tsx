import { Layout } from "@/components/layout/Layout";
import { useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import { loadContent } from "@/lib/content-loader";
import type { ContentItem } from "@/lib/content-parser";
import type { LucideIcon } from "lucide-react";
import { ShieldAlert, BookOpen, Play, Wrench, HelpCircle } from "lucide-react";

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

  const categories = useMemo(() => {
    if (customCategories) return customCategories;
    const seen = new Map<string, number>();
    for (const item of contentItems) {
      const cat = item.meta.category;
      if (!seen.has(cat)) seen.set(cat, seen.size);
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

  const currentContent = contentItems.find((c) => c.meta.id === selectedContent);
  const currentCategory = sortedCategories.find((cat) =>
    contentByCategory.get(cat.id)?.some((item) => item.meta.id === selectedContent)
  );

  // Other topics: grouped by category in sortedCategories order, items sorted by order within each category
  const otherTopicsGrouped = useMemo(() => {
    const others = contentItems.filter((c) => c.meta.id !== selectedContent);
    const groups: { category: CategoryConfig; items: ContentItem[] }[] = [];
    for (const cat of sortedCategories) {
      const items = others.filter((c) => c.meta.category === cat.id);
      if (items.length > 0) {
        groups.push({ category: cat, items });
      }
    }
    return groups;
  }, [contentItems, selectedContent, sortedCategories]);

  return (
    <Layout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600;700;800;900&display=swap');

        .cp-root {
          font-family: 'Work Sans', sans-serif;
          --cp-dark: #1daf66;
          --cp-darker: #1A2E35;
          --cp-light: #FFFDF5;
        }

        /* Hero */
        .cp-hero {
          background: var(--cp-darker);
          padding: 3rem 1.5rem 3.5rem;
          position: relative;
          overflow: hidden;
        }
        @media (min-width: 768px) {
          .cp-hero { padding: 4rem 5rem 4.5rem; }
        }
        .cp-hero-inner { max-width: 72rem; margin: 0 auto; position: relative; z-index: 1; }
        .cp-breadcrumb { display: flex; gap: 0.5rem; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; }
        .cp-breadcrumb span { font-size: 0.8rem; font-weight: 500; color: #8aab96; }
        .cp-breadcrumb .cp-bc-active { color: #d9d4c4; }
        .cp-hero h1 { font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 900; line-height: 1.1; letter-spacing: -0.02em; color: #fff; margin-bottom: 1rem; }
        .cp-hero-summary { color: #a3b8ac; font-size: 1.1rem; font-weight: 300; max-width: 36rem; margin-bottom: 0.75rem; }
        .cp-hero-author { color: #6b9a7a; font-size: 0.85rem; font-weight: 500; }
        .cp-hero-blob { position: absolute; right: -4rem; top: -4rem; width: 28rem; height: 28rem; opacity: 0.06; pointer-events: none; }

        /* Layout */
        .cp-main { max-width: 80rem; margin: 0 auto; padding: 3rem 1.5rem; display: grid; gap: 3rem; }
        @media (min-width: 768px) { .cp-main { padding: 3rem 5rem; } }
        @media (min-width: 1024px) { .cp-main { grid-template-columns: 1fr 340px; } }

        /* Sidebar */
        .cp-aside { display: flex; flex-direction: column; gap: 1.5rem; }
        .cp-card { background: #fff; border-radius: 1rem; border: 1px solid #e2e8e2; padding: 1.5rem; box-shadow: 0 1px 3px rgba(26,69,55,0.06); }

        .cp-sidebar-title { font-size: 1.05rem; font-weight: 800; color: var(--cp-darker); margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.5rem; }
        .cp-sidebar-title svg { color: var(--cp-dark); }

        .cp-topic-btn {
          display: flex; align-items: flex-start; gap: 0.75rem; padding: 0.85rem 0;
          background: none; border: none; cursor: pointer; text-align: left;
          color: #4a6450; transition: color 0.2s; width: 100%; font-family: 'Work Sans', sans-serif;
        }
        .cp-topic-btn:hover { color: var(--cp-dark); }
        .cp-topic-btn:hover .cp-topic-icon { color: var(--cp-dark); }
        .cp-topic-active { color: var(--cp-dark); font-weight: 700; }
        .cp-topic-icon { color: #9ab8a0; flex-shrink: 0; margin-top: 2px; transition: color 0.2s; }
        .cp-topic-title { font-size: 0.875rem; font-weight: 600; margin-bottom: 0.15rem; }
        .cp-topic-cat { font-size: 0.7rem; color: #8aab96; text-transform: uppercase; letter-spacing: 0.04em; font-weight: 600; }
        .cp-divider { border: none; border-top: 1px solid #e8ede9; margin: 0; }

        /* Mobile topics toggle */
        .cp-mobile-toggle {
          display: flex; align-items: center; justify-content: space-between;
          width: 100%; padding: 0.75rem 1rem; border: 1px solid #e2e8e2;
          border-radius: 0.5rem; background: #fff; font-family: 'Work Sans', sans-serif;
          font-size: 0.9rem; font-weight: 600; color: var(--cp-darker);
          cursor: pointer; margin-bottom: 1rem;
        }
        @media (min-width: 1024px) { .cp-mobile-toggle { display: none; } }
      `}</style>

      <div className="cp-root">
        {/* Hero */}
        <section className="cp-hero">
          <div className="cp-hero-inner">
            <nav className="cp-breadcrumb">
              <span>Home</span>
              <span>/</span>
              <span>{badgeLabel}</span>
              <span>/</span>
              <span className="cp-bc-active">{pageTitle}</span>
              {currentCategory && (
                <>
                  <span>/</span>
                  <span className="cp-bc-active">{currentCategory.label}</span>
                </>
              )}
            </nav>
            <h1>{currentContent?.meta.title || pageTitle}</h1>
            {currentContent?.meta.summary && (
              <p className="cp-hero-summary">{currentContent.meta.summary}</p>
            )}
            {currentContent?.meta.author && (
              <p className="cp-hero-author">Por {currentContent.meta.author}</p>
            )}
          </div>
          <svg className="cp-hero-blob" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M44.7,-76.4C58.3,-69.2,70.1,-57.4,77.6,-43.3C85.2,-29.2,88.5,-12.8,87.3,3.3C86.1,19.4,80.4,35.2,70.9,48.2C61.3,61.2,47.9,71.4,33.1,77.4C18.3,83.4,2.2,85.1,-13.7,81.9C-29.5,78.7,-45.1,70.5,-57.8,59.3C-70.5,48.1,-80.4,33.9,-84.6,18.5C-88.7,3,-87.1,-13.7,-80.3,-28.4C-73.6,-43.1,-61.7,-55.8,-48.2,-63C-34.7,-70.2,-19.5,-71.9,-2.4,-67.7C14.7,-63.5,29.3,-53.4,44.7,-76.4Z"
              fill="#abccb5"
              transform="translate(100 100)"
            />
          </svg>
        </section>

        {/* Main content */}
        <main className="cp-main">
          {/* Left: article content */}
          <div>
            {currentContent ? (
              <>
                {currentContent.meta.video && (
                  <div style={{ aspectRatio: "16/9", borderRadius: "1rem", overflow: "hidden", marginBottom: "2rem" }}>
                    <iframe
                      src={currentContent.meta.video}
                      title={currentContent.meta.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ width: "100%", height: "100%", border: "none" }}
                    />
                  </div>
                )}

                <article className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground">
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
              </>
            ) : (
              <p style={{ color: "#607060" }}>Selecione um conteúdo no menu ao lado.</p>
            )}
          </div>

          {/* Right: sidebar with other topics */}
          <aside className="cp-aside">
            <MobileTopicsToggle
              groups={otherTopicsGrouped}
              selectedContent={selectedContent}
              onSelect={setSelectedContent}
              defaultLabelMap={defaultLabelMap}
            />

            <div className="cp-card" style={{ display: "none" }} id="cp-desktop-sidebar" />

            <DesktopSidebar
              groups={otherTopicsGrouped}
              selectedContent={selectedContent}
              onSelect={setSelectedContent}
              defaultLabelMap={defaultLabelMap}
            />
          </aside>
        </main>
      </div>
    </Layout>
  );
}

function MobileTopicsToggle({
  groups,
  selectedContent,
  onSelect,
  defaultLabelMap,
}: {
  groups: { category: CategoryConfig; items: ContentItem[] }[];
  selectedContent: string;
  onSelect: (id: string) => void;
  defaultLabelMap: Record<string, string>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ display: "block" }} className="lg:hidden">
      <button className="cp-mobile-toggle" onClick={() => setOpen(!open)}>
        <span>Outros temas</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className="cp-card" style={{ marginBottom: "1rem" }}>
          <TopicList
            groups={groups}
            selectedContent={selectedContent}
            onSelect={(id) => { onSelect(id); setOpen(false); }}
            defaultLabelMap={defaultLabelMap}
          />
        </div>
      )}
    </div>
  );
}

function DesktopSidebar({
  groups,
  selectedContent,
  onSelect,
  defaultLabelMap,
}: {
  groups: { category: CategoryConfig; items: ContentItem[] }[];
  selectedContent: string;
  onSelect: (id: string) => void;
  defaultLabelMap: Record<string, string>;
}) {
  return (
    <div className="cp-card hidden lg:block">
      <h3 className="cp-sidebar-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
        Outros Temas
      </h3>
      <TopicList
        groups={groups}
        selectedContent={selectedContent}
        onSelect={onSelect}
        defaultLabelMap={defaultLabelMap}
      />
    </div>
  );
}

function TopicList({
  groups,
  selectedContent,
  onSelect,
  defaultLabelMap,
}: {
  groups: { category: CategoryConfig; items: ContentItem[] }[];
  selectedContent: string;
  onSelect: (id: string) => void;
  defaultLabelMap: Record<string, string>;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {groups.map((group, gi) => {
        const CatIcon = defaultIconMap[group.category.id] || BookOpen;
        return (
          <div key={group.category.id}>
            {gi > 0 && <hr className="cp-divider" style={{ margin: "0.75rem 0" }} />}
            <p style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "#1daf66",
              marginBottom: "0.25rem",
              marginTop: gi > 0 ? "0.25rem" : 0,
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}>
              <CatIcon size={14} />
              {defaultLabelMap[group.category.id] || group.category.id}
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {group.items.map((item, i) => (
                <li key={item.meta.id}>
                  <button
                    className={`cp-topic-btn ${selectedContent === item.meta.id ? "cp-topic-active" : ""}`}
                    onClick={() => onSelect(item.meta.id)}
                  >
                    <svg className="cp-topic-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                    <div>
                      <p className="cp-topic-title">{item.meta.title}</p>
                    </div>
                  </button>
                  {i < group.items.length - 1 && <hr className="cp-divider" />}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
