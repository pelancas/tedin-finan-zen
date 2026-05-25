import { useState, useEffect, useRef } from "react";
import { parseMarkdownContent } from "./content-parser";
import type { ContentItem } from "./content-parser";

export interface PostMeta {
  id: string;
  file: string;
  title: string;
  category: string;
  summary: string;
  order: number;
  author?: string;
  video?: string;
}

export interface FolderIndex {
  description: string;
  categoryOrder: string[];
  categoryLabels: Record<string, string>;
  posts: PostMeta[];
}

export interface UseContentFolderResult {
  loading: boolean;
  error: string | null;
  index: FolderIndex | null;
  sortedPosts: PostMeta[];
  selectedPost: ContentItem | null;
  loadingPost: boolean;
  selectPost: (id: string) => void;
}

export function useContentFolder(folder: string): UseContentFolderResult {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [index, setIndex] = useState<FolderIndex | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<ContentItem | null>(null);
  const [loadingPost, setLoadingPost] = useState(false);

  // Cache so each .md is fetched at most once per session
  const cache = useRef<Map<string, ContentItem>>(new Map());

  useEffect(() => {
    setLoading(true);
    setError(null);
    setIndex(null);
    setSelectedId(null);
    setSelectedPost(null);

    fetch(`/content/${folder}/index.json`)
      .then((r) => {
        if (!r.ok) throw new Error(`Não foi possível carregar o índice de ${folder}`);
        return r.json() as Promise<FolderIndex>;
      })
      .then((data) => {
        setIndex(data);
        setLoading(false);
        if (data.posts.length > 0) {
          const first = [...data.posts].sort((a, b) => {
            const catA = data.categoryOrder.indexOf(a.category);
            const catB = data.categoryOrder.indexOf(b.category);
            if (catA !== catB) return catA - catB;
            return a.order - b.order;
          })[0];
          setSelectedId(first.id);
        }
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, [folder]);

  // Fetch post body whenever selectedId changes
  useEffect(() => {
    if (!selectedId || !index) return;

    const postMeta = index.posts.find((p) => p.id === selectedId);
    if (!postMeta) return;

    if (cache.current.has(selectedId)) {
      setSelectedPost(cache.current.get(selectedId)!);
      return;
    }

    setLoadingPost(true);
    fetch(`/content/${folder}/${postMeta.file}`)
      .then((r) => {
        if (!r.ok) throw new Error(`Não foi possível carregar o post ${postMeta.file}`);
        return r.text();
      })
      .then((raw) => {
        const parsed = parseMarkdownContent(raw);
        // Merge video from index in case it's not in frontmatter
        if (!parsed.meta.video && postMeta.video) {
          parsed.meta.video = postMeta.video;
        }
        cache.current.set(selectedId, parsed);
        setSelectedPost(parsed);
        setLoadingPost(false);
      })
      .catch(() => {
        setLoadingPost(false);
      });
  }, [selectedId, index, folder]);

  const sortedPosts = index
    ? [...index.posts].sort((a, b) => {
        const catA = index.categoryOrder.indexOf(a.category);
        const catB = index.categoryOrder.indexOf(b.category);
        if (catA !== catB) return catA - catB;
        return a.order - b.order;
      })
    : [];

  return {
    loading,
    error,
    index,
    sortedPosts,
    selectedPost,
    loadingPost,
    selectPost: setSelectedId,
  };
}
