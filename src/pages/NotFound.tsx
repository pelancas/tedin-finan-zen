import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDocumentMeta } from "@/hooks/use-document-meta";

const NotFound = () => {
  const location = useLocation();

  useDocumentMeta("Página não encontrada | Orienta", "A página que você procura não existe ou foi movida.");

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);

    let tag = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", "robots");
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", "noindex");
    return () => tag?.removeAttribute("content");
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Página não encontrada</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Voltar para a página inicial
        </a>
      </div>
    </div>
  );
};

export default NotFound;
