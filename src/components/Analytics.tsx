import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Fires a GA4 page_view on every route change. Required because the app
 * uses HashRouter and GA's automatic page_view tracking (send_page_view,
 * disabled in index.html) doesn't reliably pick up hash-only navigation.
 * Mount once inside the router.
 */
export function Analytics() {
  const location = useLocation();

  useEffect(() => {
    // Deferred so document.title (set by useDocumentMeta on the page
    // component) has already updated by the time we read it.
    const timer = setTimeout(() => {
      if (typeof window.gtag !== "function") return;
      window.gtag("event", "page_view", {
        page_path: `#${location.pathname}${location.search}`,
        page_location: window.location.href,
        page_title: document.title,
      });
    }, 0);

    return () => clearTimeout(timer);
  }, [location.pathname, location.search]);

  return null;
}
