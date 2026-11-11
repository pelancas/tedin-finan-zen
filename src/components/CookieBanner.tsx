import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CHAVE = "orienta-cookies";
export const ABRIR_COOKIES = "orienta:abrir-cookies";

type Escolha = "aceito" | "recusado";
type JanelaPixel = Window & { carregarMetaPixel?: () => void };

const ler = (): Escolha | null => {
  try {
    const v = localStorage.getItem(CHAVE);
    return v === "aceito" || v === "recusado" ? v : null;
  } catch {
    return null;
  }
};

const gravar = (v: Escolha) => {
  try {
    localStorage.setItem(CHAVE, v);
  } catch {
    /* sem armazenamento: a escolha vale só nesta visita */
  }
};

export function CookieBanner() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    if (ler() === null) setVisivel(true);
    const abrir = () => setVisivel(true);
    window.addEventListener(ABRIR_COOKIES, abrir);
    return () => window.removeEventListener(ABRIR_COOKIES, abrir);
  }, []);

  const escolher = (nova: Escolha) => {
    const anterior = ler();
    gravar(nova);
    setVisivel(false);
    if (nova === "aceito") {
      (window as JanelaPixel).carregarMetaPixel?.();
    } else if (anterior === "aceito") {
      // O Pixel já foi carregado nesta visita: recarregar é a forma de interrompê-lo.
      window.location.reload();
    }
  };

  if (!visivel) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-border bg-white p-4 shadow-[0_-4px_20px_rgba(26,46,53,0.12)]"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-3 md:flex-row md:items-center md:gap-6">
        <p className="text-sm leading-relaxed text-muted-foreground">
          Usamos cookies para entender como o site é usado e, com a sua permissão, o Pixel da Meta
          para medir e melhorar nossos anúncios. Você pode aceitar ou recusar. Saiba mais na{" "}
          <Link
            to="/politica-de-privacidade"
            className="font-semibold text-primary underline underline-offset-2"
          >
            Política de Privacidade
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <Button variant="outline" onClick={() => escolher("recusado")} className="flex-1 md:flex-none">
            Recusar
          </Button>
          <Button onClick={() => escolher("aceito")} className="flex-1 md:flex-none">
            Aceitar
          </Button>
        </div>
      </div>
    </div>
  );
}
