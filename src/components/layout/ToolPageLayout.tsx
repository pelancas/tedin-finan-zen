import { ReactNode, Suspense } from "react";
import { Layout } from "./Layout";

interface ToolPageLayoutProps {
  children: ReactNode;
}

export function ToolPageLayout({ children }: ToolPageLayoutProps) {
  return (
    <Layout>
      <Suspense fallback={<div className="py-16 text-center text-muted-foreground">Carregando...</div>}>
        {children}
      </Suspense>
    </Layout>
  );
}
