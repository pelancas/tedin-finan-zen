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

function setCanonicalTag(href: string) {
  let tag = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", "canonical");
    document.head.appendChild(tag);
  }
  tag.setAttribute("href", href);
}

/**
 * Sets the document title, description (including Open Graph/Twitter
 * equivalents), and canonical link for the lifetime of the mounted page.
 * Restores the previous values on unmount so navigating away doesn't leak
 * stale meta into the next page during the transition.
 *
 * The canonical href is the current full URL (window.location.href),
 * which for this HashRouter app includes the route's hash — matching the
 * hash-based URLs already listed in sitemap.xml.
 */
export function useDocumentMeta(title: string, description: string) {
  useEffect(() => {
    const prevTitle = document.title;
    const descriptionTag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const ogTitleTag = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    const ogDescTag = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    const canonicalTag = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const prevDescription = descriptionTag?.getAttribute("content") ?? "";
    const prevOgTitle = ogTitleTag?.getAttribute("content") ?? "";
    const prevOgDescription = ogDescTag?.getAttribute("content") ?? "";
    const prevCanonical = canonicalTag?.getAttribute("href") ?? "";

    document.title = title;
    setMetaTag("description", false, description);
    setMetaTag("og:title", true, title);
    setMetaTag("og:description", true, description);
    setCanonicalTag(window.location.href);

    return () => {
      document.title = prevTitle;
      setMetaTag("description", false, prevDescription);
      setMetaTag("og:title", true, prevOgTitle);
      setMetaTag("og:description", true, prevOgDescription);
      if (prevCanonical) setCanonicalTag(prevCanonical);
    };
  }, [title, description]);
}
