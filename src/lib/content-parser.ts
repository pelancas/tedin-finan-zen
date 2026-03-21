export interface ContentMeta {
  id: string;
  title: string;
  category: string;
  summary: string;
  order: number;
  video?: string;
}

export interface ContentItem {
  meta: ContentMeta;
  body: string;
}

/**
 * Parses a markdown file with YAML-like frontmatter.
 * Frontmatter is delimited by --- lines at the top.
 */
export function parseMarkdownContent(raw: string): ContentItem {
  const lines = raw.trim().split("\n");
  const meta: Record<string, string> = {};
  let bodyStartIndex = 0;

  if (lines[0]?.trim() === "---") {
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim() === "---") {
        bodyStartIndex = i + 1;
        break;
      }
      const colonIndex = lines[i].indexOf(":");
      if (colonIndex > 0) {
        const key = lines[i].slice(0, colonIndex).trim();
        let value = lines[i].slice(colonIndex + 1).trim();
        // Remove surrounding quotes
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        meta[key] = value;
      }
    }
  }

  const body = lines.slice(bodyStartIndex).join("\n").trim();

  return {
    meta: {
      id: meta.id || "",
      title: meta.title || "",
      category: meta.category || "",
      summary: meta.summary || "",
      order: parseInt(meta.order || "0", 10),
      video: meta.video,
    },
    body,
  };
}
