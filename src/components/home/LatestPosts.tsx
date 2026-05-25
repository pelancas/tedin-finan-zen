import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface PostMeta {
  id: string;
  title: string;
  summary: string;
  category: string;
}

interface FolderIndex {
  categoryLabels: Record<string, string>;
  posts: PostMeta[];
}

interface PostCard {
  id: string;
  title: string;
  summary: string;
  categoryLabel: string;
  folderLabel: string;
  folderHref: string;
}

const base = import.meta.env.BASE_URL.endsWith("/")
  ? import.meta.env.BASE_URL
  : import.meta.env.BASE_URL + "/";

const folders: { key: string; label: string; href: string }[] = [
  { key: "fundos",    label: "Fundos",     href: "/investimentos/fundos" },
  { key: "acoes",     label: "Ações",       href: "/investimentos/acoes" },
  { key: "rendafixa", label: "Renda Fixa",  href: "/investimentos/renda-fixa" },
  { key: "fii",       label: "FII",         href: "/investimentos/fii" },
];

const POSTS_TO_SHOW = 6;

export function LatestPosts() {
  const [posts, setPosts] = useState<PostCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all(
      folders.map((f) =>
        fetch(`${base}content/${f.key}/index.json`)
          .then((r) => (r.ok ? (r.json() as Promise<FolderIndex>) : null))
          .then((data): PostCard[] => {
            if (!data) return [];
            return data.posts.map((p) => ({
              id: `${f.key}__${p.id}`,
              title: p.title,
              summary: p.summary,
              categoryLabel: data.categoryLabels[p.category] || p.category,
              folderLabel: f.label,
              folderHref: f.href,
            }));
          })
          .catch(() => [] as PostCard[])
      )
    ).then((results) => {
      // Intercala posts de todas as pastas (1 de cada por rodada)
      const interleaved: PostCard[] = [];
      const arrays = results.filter((a) => a.length > 0);
      let i = 0;
      while (interleaved.length < POSTS_TO_SHOW) {
        let added = false;
        for (const arr of arrays) {
          if (arr[i]) { interleaved.push(arr[i]); added = true; }
          if (interleaved.length >= POSTS_TO_SHOW) break;
        }
        if (!added) break;
        i++;
      }
      setPosts(interleaved);
      setLoading(false);
    });
  }, []);

  if (loading || posts.length === 0) return null;

  const [featured, ...rest] = posts;

  return (
    <section style={{
      background: "#1A2E35",
      padding: "5rem 1.5rem",
      fontFamily: "'Work Sans', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
          <p style={{
            fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase",
            letterSpacing: "0.1em", color: "#1daf66", marginBottom: "0.6rem",
          }}>
            Blog
          </p>
          <h2 style={{
            fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900,
            color: "#fff", lineHeight: 1.1, margin: "0 0 0.75rem",
            letterSpacing: "-0.02em",
          }}>
            Últimos artigos
          </h2>
          <p style={{ color: "#a3b8ac", fontSize: "1rem", margin: 0, maxWidth: "36rem" }}>
            Conteúdo para te ajudar a tomar melhores decisões financeiras.
          </p>
        </div>

        {/* Featured post */}
        <Link to={featured.folderHref} style={{ textDecoration: "none", display: "block", marginBottom: "1.5rem" }}>
          <article style={{
            background: "linear-gradient(135deg, #1daf66 0%, #158a50 100%)",
            borderRadius: "1.25rem",
            padding: "2.5rem",
            display: "grid",
            gap: "1.5rem",
            gridTemplateColumns: "1fr",
            position: "relative",
            overflow: "hidden",
            transition: "transform 0.2s, box-shadow 0.2s",
            boxShadow: "0 4px 24px rgba(29,175,102,0.25)",
          }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(29,175,102,0.35)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "none";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(29,175,102,0.25)";
            }}
          >
            {/* Blob decorativo */}
            <svg style={{ position: "absolute", right: "-3rem", top: "-3rem", width: "18rem", height: "18rem", opacity: 0.15, pointerEvents: "none" }}
              viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path d="M44.7,-76.4C58.3,-69.2,70.1,-57.4,77.6,-43.3C85.2,-29.2,88.5,-12.8,87.3,3.3C86.1,19.4,80.4,35.2,70.9,48.2C61.3,61.2,47.9,71.4,33.1,77.4C18.3,83.4,2.2,85.1,-13.7,81.9C-29.5,78.7,-45.1,70.5,-57.8,59.3C-70.5,48.1,-80.4,33.9,-84.6,18.5C-88.7,3,-87.1,-13.7,-80.3,-28.4C-73.6,-43.1,-61.7,-55.8,-48.2,-63C-34.7,-70.2,-19.5,-71.9,-2.4,-67.7C14.7,-63.5,29.3,-53.4,44.7,-76.4Z"
                fill="#fff" transform="translate(100 100)" />
            </svg>

            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
                <span style={{
                  fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase",
                  letterSpacing: "0.06em", color: "#1daf66",
                  background: "#fff", padding: "0.25rem 0.75rem", borderRadius: "999px",
                }}>
                  {featured.folderLabel}
                </span>
                <span style={{
                  fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase",
                  letterSpacing: "0.06em", color: "rgba(255,255,255,0.8)",
                  background: "rgba(255,255,255,0.15)", padding: "0.25rem 0.75rem", borderRadius: "999px",
                }}>
                  {featured.categoryLabel}
                </span>
              </div>

              <h3 style={{
                fontSize: "clamp(1.35rem, 3vw, 1.85rem)", fontWeight: 900,
                color: "#fff", lineHeight: 1.2, margin: "0 0 0.75rem",
                maxWidth: "40rem",
              }}>
                {featured.title}
              </h3>

              {featured.summary && (
                <p style={{
                  fontSize: "1rem", color: "rgba(255,255,255,0.82)",
                  lineHeight: 1.6, margin: "0 0 1.5rem", maxWidth: "38rem",
                }}>
                  {featured.summary}
                </p>
              )}

              <div style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                fontSize: "0.9rem", fontWeight: 700, color: "#fff",
                background: "rgba(255,255,255,0.2)", padding: "0.55rem 1.1rem",
                borderRadius: "999px",
              }}>
                Ler artigo <ArrowRight size={15} />
              </div>
            </div>
          </article>
        </Link>

        {/* Grid dos demais posts */}
        <div style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        }}>
          {rest.map((post) => (
            <Link key={post.id} to={post.folderHref} style={{ textDecoration: "none" }}>
              <article style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "1rem",
                padding: "1.5rem",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "0.65rem",
                transition: "background 0.2s, border-color 0.2s",
              }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.09)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(29,175,102,0.5)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                }}
              >
                <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                  <span style={{
                    fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase",
                    letterSpacing: "0.05em", color: "#1daf66",
                    background: "rgba(29,175,102,0.15)", padding: "0.2rem 0.55rem", borderRadius: "999px",
                  }}>
                    {post.folderLabel}
                  </span>
                  <span style={{
                    fontSize: "0.65rem", fontWeight: 600, textTransform: "uppercase",
                    letterSpacing: "0.05em", color: "#8aab96",
                    background: "rgba(255,255,255,0.07)", padding: "0.2rem 0.55rem", borderRadius: "999px",
                  }}>
                    {post.categoryLabel}
                  </span>
                </div>

                <h3 style={{
                  fontSize: "0.95rem", fontWeight: 700, color: "#fff",
                  lineHeight: 1.35, margin: 0, flexGrow: 1,
                }}>
                  {post.title}
                </h3>

                {post.summary && (
                  <p style={{
                    fontSize: "0.825rem", color: "#8aab96",
                    lineHeight: 1.55, margin: 0,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  } as React.CSSProperties}>
                    {post.summary}
                  </p>
                )}

                <div style={{
                  display: "flex", alignItems: "center", gap: "0.3rem",
                  fontSize: "0.78rem", fontWeight: 700, color: "#1daf66",
                  marginTop: "0.25rem",
                }}>
                  Ler artigo <ArrowRight size={12} />
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
