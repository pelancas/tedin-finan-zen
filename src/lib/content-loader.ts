import { parseMarkdownContent, type ContentItem } from "./content-parser";

// Auto-import all markdown files from content folders at build time
const allMarkdownFiles = import.meta.glob("/src/content/**/*.md", {
  query: "?raw",
  eager: true,
  import: "default",
}) as Record<string, string>;

/**
 * Loads and parses all markdown content from a specific folder.
 * Example: loadContent("fundos") returns all parsed items from src/content/fundos/
 */
export function loadContent(folder: string): ContentItem[] {
  const prefix = `/src/content/${folder}/`;
  const items: ContentItem[] = [];

  for (const [path, raw] of Object.entries(allMarkdownFiles)) {
    if (path.startsWith(prefix) && path.endsWith(".md")) {
      items.push(parseMarkdownContent(raw));
    }
  }

  return items.sort((a, b) => a.meta.order - b.meta.order);
}
