import { useEffect, useRef } from "react";

const SITE_KEY = "0x4AAAAAAEYs6dIrFdqHkY4X";

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: Record<string, unknown>) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId: string) => void;
    };
  }
}

interface TurnstileProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  className?: string;
}

/**
 * Renders a Cloudflare Turnstile widget. Since this is a static site with
 * no backend, the token isn't verified server-side — the widget itself
 * (which requires real JS execution and passes Cloudflare's own bot
 * analysis) is the deterrent. Callbacks are read from refs so the widget
 * is created once on mount, regardless of parent re-renders.
 */
export function Turnstile({ onVerify, onExpire, className }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const onVerifyRef = useRef(onVerify);
  const onExpireRef = useRef(onExpire);
  onVerifyRef.current = onVerify;
  onExpireRef.current = onExpire;

  useEffect(() => {
    let cancelled = false;
    let widgetId: string | null = null;
    let pollTimer: ReturnType<typeof setInterval> | undefined;

    function renderWidget() {
      if (cancelled || !containerRef.current || !window.turnstile) return;
      widgetId = window.turnstile.render(containerRef.current, {
        sitekey: SITE_KEY,
        callback: (token: string) => onVerifyRef.current(token),
        "expired-callback": () => onExpireRef.current?.(),
        "error-callback": () => onExpireRef.current?.(),
      });
    }

    if (window.turnstile) {
      renderWidget();
    } else {
      pollTimer = setInterval(() => {
        if (window.turnstile) {
          clearInterval(pollTimer);
          renderWidget();
        }
      }, 100);
    }

    return () => {
      cancelled = true;
      if (pollTimer) clearInterval(pollTimer);
      if (widgetId && window.turnstile) window.turnstile.remove(widgetId);
    };
  }, []);

  return <div ref={containerRef} className={className} />;
}
