import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Resets scroll position on every route change. SPA navigation via
 * react-router doesn't reload the page, so the browser keeps whatever
 * scrollY the previous route was at — without this, landing on a new
 * page can drop the visitor at the bottom instead of the top.
 * Mount once inside the router.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
