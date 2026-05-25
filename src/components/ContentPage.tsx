import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import { useContentFolder } from "@/lib/useContentFolder";
import type { PostMeta } from "@/lib/useContentFolder";
import { ShieldAlert, BookOpen, Play, Wrench, HelpCircle, ChevronRight } from "lucide-react";

function isSafeVideoUrl(url: string): boolean {
  try {
    const { hostname, protocol } = new URL(url);
    return (
      protocol === "https:" &&
      (hostname === "www.youtube.com" || hostname === "youtube.com" || hostname === "www.youtube-nocookie.com")
    );
  } catch {
    return false;
  }
}

const categoryIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  cuidados: ShieldAlert,
  guias: BookOpen,
  videos: Play,
  ferramentas: Wrench,
  duvidas: HelpCircle,
};

interface ContentPageProps {
  folder: string;
  badgeLabel: string;
  pageTitle: string;
}

export default function ContentPage({ folder, badgeLabel, pageTitle }: ContentPageProps) {
  const { loading, error, index, sortedPosts, selectedPost, loadingPost, selectPost } =
    useContentFolder(folder);

  const groupedPosts: { categoryId: string; label: string; posts: PostMeta[] }[] = [];
  if (index) {
    for (const catId of index.categoryOrder) {
      const posts = sortedPosts.filter((p) => p.category === catId);
      if (posts.length > 0) {
        groupedPosts.push({ categoryId: catId, label: index.categoryLabels[catId] || catId, posts });
      }
    }
    const uncategorized = sortedPosts.filter((p) => !index.categoryOrder.includes(p.category));
    if (uncategorized.length > 0) {
      groupedPosts.push({ categoryId: "outros", label: "Outros", posts: uncategorized });
    }
  }

  const selectedId = selectedPost?.meta.id ?? null;

  return (
    <Layout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600;700;800;900&display=swap');

        .cp-root { font-family: 'Work Sans', sans-serif; }
        .cp-root * { box-sizing: border-box; }

        .cp-hero {
          background: #1A2E35; padding: 3rem 1.5rem 3.5rem;
          position: relative; overflow: hidden;
        }
        @media (min-width: 768px) { .cp-hero { padding: 4rem 5rem 4.5rem; } }
        .cp-hero-inner { max-width: 72rem; margin: 0 auto; position: relative; z-index: 1; }
        .cp-breadcrumb { display: flex; gap: 0.5rem; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; }
        .cp-breadcrumb span { font-size: 0.8rem; font-weight: 500; color: #8aab96; }
        .cp-breadcrumb .active { color: #d9d4c4; }
        .cp-hero h1 {
          font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 900;
          line-height: 1.1; letter-spacing: -0.02em; color: #fff; margin: 0 0 1rem;
        }
        .cp-hero-desc { color: #a3b8ac; font-size: 1.05rem; font-weight: 300; max-width: 42rem; margin: 0; }
        .cp-hero-blob {
          position: absolute; right: -4rem; top: -4rem;
          width: 28rem; height: 28rem; opacity: 0.06; pointer-events: none;
        }

        .cp-body {
          max-width: 80rem; margin: 0 auto; padding: 2.5rem 1.5rem;
          display: grid; gap: 2rem; grid-template-columns: 1fr;
        }
        @media (min-width: 768px) { .cp-body { padding: 3rem 5rem; } }
        @media (min-width: 1024px) { .cp-body { grid-template-columns: 1fr 300px; } }

        .cp-article { min-width: 0; }
        .cp-placeholder {
          padding: 2.5rem; background: #f8faf8;
          border: 1px dashed #ccddd0; border-radius: 1rem;
          color: #607060; font-size: 0.95rem; line-height: 1.6;
        }

        .cp-shimmer {
          background: linear-gradient(90deg, #f0f4f0 25%, #e4ece4 50%, #f0f4f0 75%);
          background-size: 200% 100%; animation: cp-sh 1.4s infinite;
          border-radius: 0.5rem; height: 1.25rem; margin-bottom: 0.75rem;
        }
        @keyframes cp-sh { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

        .cp-video-wrap {
          aspect-ratio: 16/9; border-radius: 1rem; overflow: hidden; margin-bottom: 2rem;
        }
        .cp-video-wrap iframe { width: 100%; height: 100%; border: none; }

        .cp-sidebar-wrap {
          display: flex; flex-direction: column;
        }
        @media (min-width: 1024px) {
          .cp-sidebar-wrap {
            position: sticky; top: 1.5rem;
            max-height: calc(100vh - 3rem); overflow-y: auto;
          }
        }

        .cp-card {
          background: #fff; border: 1px solid #e2e8e2;
          border-radius: 1rem; overflow: hidden;
          box-shadow: 0 1px 4px rgba(26,69,55,0.07);
        }
        .cp-card-header {
          padding: 1rem 1.25rem 0.75rem; border-bottom: 1px solid #eef1ee;
        }
        .cp-card-header h2 {
          margin: 0; font-size: 0.8rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.07em; color: #607060;
        }
        .cp-cat-group { padding: 0.75rem 0 0.5rem; border-bottom: 1px solid #eef1ee; }
        .cp-cat-group:last-child { border-bottom: none; }
        .cp-cat-label {
          display: flex; align-items: center; gap: 0.4rem;
          padding: 0 1.25rem 0.4rem;
          font-size: 0.7rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.06em; color: #1daf66;
        }
        .cp-post-btn {
          display: flex; align-items: center; justify-content: space-between;
          width: 100%; padding: 0.6rem 1.25rem; gap: 0.5rem;
          background: none; border: none; cursor: pointer;
          text-align: left; font-family: 'Work Sans', sans-serif;
          color: #3d5c47; transition: background 0.15s;
        }
        .cp-post-btn:hover { background: #f3f8f3; color: #1daf66; }
        .cp-post-btn.sel { background: #edfaf2; color: #178a50; }
        .cp-post-btn.sel .cp-arrow { opacity: 1; }
        .cp-post-title { font-size: 0.845rem; font-weight: 600; line-height: 1.35; }
        .cp-arrow { opacity: 0; color: #1daf66; flex-shrink: 0; transition: opacity 0.15s; }

        .cp-mobile-only { display: block; }
        @media (min-width: 1024px) { .cp-mobile-only { display: none; } }
        .cp-desktop-only { display: none; }
        @media (min-width: 1024px) { .cp-desktop-only { display: block; } }

        .cp-toggle {
          display: flex; align-items: center; justify-content: space-between;
          width: 100%; padding: 0.75rem 1rem; margin-bottom: 1rem;
          border: 1px solid #e2e8e2; border-radius: 0.75rem; background: #fff;
          cursor: pointer; font-family: 'Work Sans', sans-serif;
          font-size: 0.9rem; font-weight: 600; color: #1A2E35;
        }
        .cp-toggle svg { transition: transform 0.2s; }
        .cp-toggle.open svg { transform: rotate(180deg); }
      `}</style>

      <div className="cp-root">
        <section className="cp-hero">
          <div className="cp-hero-inner">
            <nav className="cp-breadcrumb">
              <span>Home</span><span>/</span>
              <span>{badgeLabel}</span><span>/</span>
              <span className="active">{pageTitle}</span>
            </nav>
            <h1>{pageTitle}</h1>
            {index?.description && <p className="cp-hero-desc">{index.description}</p>}
          </div>
          </section>

        <div className="cp-body">
          {/* Article */}
          <div className="cp-article">
            {(loading || loadingPost) && (
              <div>
                {[100, 80, 90, 65, 95].map((w, i) => (
                  <div key={i} className="cp-shimmer" style={{ width: `${w}%` }} />
                ))}
              </div>
            )}
            {error && <p className="cp-placeholder" style={{ color: "#c0392b" }}>Erro: {error}</p>}
            {!loading && !error && !selectedPost && !loadingPost && (
              <p className="cp-placeholder">Selecione um tema na lista ao lado para começar a leitura.</p>
            )}
            {!loading && !error && !loadingPost && selectedPost && (
              <>
                {selectedPost.meta.video && isSafeVideoUrl(selectedPost.meta.video) && (
                  <div className="cp-video-wrap">
                    <iframe src={selectedPost.meta.video} title={selectedPost.meta.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen />
                  </div>
                )}
                <article className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground">
                  <ReactMarkdown rehypePlugins={[rehypeSanitize]} components={{
                    a: ({ href, children }) => (
                      <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">{children}</a>
                    ),
                    blockquote: ({ children }) => (
                      <div className="p-4 bg-muted rounded-lg my-4">{children}</div>
                    ),
                    table: ({ children }) => (
                      <div className="overflow-x-auto"><table className="w-full border-collapse text-sm">{children}</table></div>
                    ),
                    th: ({ children }) => <th className="text-left py-2 pr-4 font-semibold border-b">{children}</th>,
                    td: ({ children }) => <td className="py-2 pr-4 border-b">{children}</td>,
                  }}>
                    {selectedPost.body}
                  </ReactMarkdown>
                </article>
              </>
            )}
          </div>

          {/* Sidebar */}
          {!loading && !error && groupedPosts.length > 0 && (
            <div className="cp-sidebar-wrap">
              <div className="cp-mobile-only">
                <MobileSidebar groups={groupedPosts} selectedId={selectedId} onSelect={selectPost} />
              </div>
              <div className="cp-desktop-only">
                <PostList groups={groupedPosts} selectedId={selectedId} onSelect={selectPost} />
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

type Groups = { categoryId: string; label: string; posts: PostMeta[] }[];

function PostList({ groups, selectedId, onSelect }: {
  groups: Groups; selectedId: string | null; onSelect: (id: string) => void;
}) {
  return (
    <div className="cp-card">
      <div className="cp-card-header"><h2>Tópicos</h2></div>
      {groups.map((group) => {
        const Icon = categoryIcons[group.categoryId] || BookOpen;
        return (
          <div key={group.categoryId} className="cp-cat-group">
            <p className="cp-cat-label"><Icon size={12} />{group.label}</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {group.posts.map((post) => (
                <li key={post.id}>
                  <button className={`cp-post-btn${selectedId === post.id ? " sel" : ""}`} onClick={() => onSelect(post.id)}>
                    <span className="cp-post-title">{post.title}</span>
                    <ChevronRight size={14} className="cp-arrow" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

function MobileSidebar({ groups, selectedId, onSelect }: {
  groups: Groups; selectedId: string | null; onSelect: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const selectedTitle = groups.flatMap((g) => g.posts).find((p) => p.id === selectedId)?.title ?? "Tópicos";

  return (
    <div>
      <button className={`cp-toggle${open ? " open" : ""}`} onClick={() => setOpen(!open)}>
        <span>{selectedTitle}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div style={{ marginBottom: "1rem" }}>
          <PostList groups={groups} selectedId={selectedId} onSelect={(id) => { onSelect(id); setOpen(false); }} />
        </div>
      )}
    </div>
  );
}
