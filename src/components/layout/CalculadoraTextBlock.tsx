import { ReactNode } from "react";

interface CalculadoraTextBlockProps {
  children: ReactNode;
}

export function CalculadoraTextBlock({ children }: CalculadoraTextBlockProps) {
  return (
    <article className="max-w-4xl mx-auto px-6 md:px-20 pb-16 prose prose-lg dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground">
      {children}
    </article>
  );
}
