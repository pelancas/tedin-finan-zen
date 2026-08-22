import { useEffect } from "react";

function setMetaTag(name: string, property: boolean, content: string) {
  const attr = property ? "property" : "name";
  let tag = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

/**
 * Sets the document title and description (including Open Graph/Twitter
 * equivalents) for the lifetime of the mounted page. Restores the previous
 * values on unmount so navigating away doesn't leak stale meta into the
 * next page during the transition.
 */
export function useDocumentMeta(title: string, description: string) {
  useEffect(() => {
    const prevTitle = document.title;
    const descriptionTag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const ogTitleTag = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    const ogDescTag = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    const prevDescription = descriptionTag?.getAttribute("content") ?? "";
    const prevOgTitle = ogTitleTag?.getAttribute("content") ?? "";
    const prevOgDescription = ogDescTag?.getAttribute("content") ?? "";

    document.title = title;
    setMetaTag("description", false, description);
    setMetaTag("og:title", true, title);
    setMetaTag("og:description", true, description);

    return () => {
      document.title = prevTitle;
      setMetaTag("description", false, prevDescription);
      setMetaTag("og:title", true, prevOgTitle);
      setMetaTag("og:description", true, prevOgDescription);
    };
  }, [title, description]);
}
