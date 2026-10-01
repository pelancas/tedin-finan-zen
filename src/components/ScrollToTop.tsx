import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Resets scroll position on every route change. SPA navigation via
 * react-router doesn't reload the page, so the browser keeps whatever
 * scrollY the previous route was at — without this, landing on a new
 * page can drop the visitor at the bottom instead of the top.
 * When the location carries a hash (e.g. "/sobre#contato"), scrolls to
 * that element instead. Mount once inside the router.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Deferred so the target page has rendered its sections.
      const timer = setTimeout(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
      }, 0);
      return () => clearTimeout(timer);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
