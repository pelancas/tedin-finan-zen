import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight, CheckCircle, Copy } from "lucide-react";

const investmentTypes = [
  "FII", "Ações", "Títulos Bancários (CDB, LCI, LCA, etc.)", "Títulos Públicos",
  "Títulos Privados", "Previdência", "Investimentos Internacionais", "Fundos de Investimento",
  "Poupança e Conta Corrente", "Cashback", "Criptomoedas", "COE", "Derivativos", "FIDC",
];

const spreadsheetFeatures = [
  "Separação clara entre Bens e Direitos e Rendimentos",
  "Campos padronizados para cada tipo de investimento",
  "Espaço para saldos, custos, impostos e rendimentos",
  "Organização pensada para facilitar a transcrição para o programa da Receita",
  "Estrutura simples, copiável e adaptável ao seu caso",
];

const Imposto = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-accent/30 to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-6">
              <FileText className="h-8 w-8 text-secondary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Planilha de Apoio à Declaração do IRPF
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              Organize seus investimentos e declare com segurança
            </p>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Declarar investimentos no Imposto de Renda não precisa ser complicado. Esta página foi criada para ajudar você a{" "}
              <strong className="text-foreground">organizar todos os seus produtos financeiros em uma única planilha</strong>, facilitando o preenchimento da declaração do IRPF e reduzindo o risco de erros.
            </p>
            <p className="text-base text-muted-foreground mt-4 max-w-2xl mx-auto">
              <strong className="text-foreground">Copie a planilha</strong>, preencha com seus dados e use como base para declarar corretamente seus bens e rendimentos.
            </p>
          </div>
        </div>
      </section>

      {/* Para quem é */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Para quem é essa planilha?
            </h2>
            <p className="text-muted-foreground mb-8">
              Esta planilha é ideal para quem investe em <strong className="text-foreground">qualquer um dos produtos abaixo</strong>, mesmo que tenha poucos valores ou poucas operações:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              {investmentTypes.map((type) => (
                <Card key={type} className="border-border">
                  <CardContent className="p-4 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-secondary shrink-0" />
                    <span className="text-sm text-foreground">{type}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-muted-foreground">
              Se você investe em <strong className="text-foreground">mais de um tipo de produto</strong>, a planilha é ainda mais importante.
            </p>
          </div>
        </div>
      </section>

      {/* O que vai encontrar */}
      <section className="py-16 bg-accent/20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
              O que você vai encontrar na planilha?
            </h2>
            <ul className="space-y-4 mb-8">
              {spreadsheetFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <ArrowRight className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
            <Card className="border-secondary/30 bg-secondary/10">
              <CardContent className="p-6">
                <p className="text-foreground font-semibold">
                  🎯 Objetivo: deixar tudo organizado antes de abrir o programa do IRPF.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Copie a planilha e facilite sua declaração
            </h2>
            <p className="text-muted-foreground mb-2">Não importa se você investe pouco ou muito.</p>
            <p className="text-muted-foreground mb-2">Não importa se investe há anos ou começou agora.</p>
            <p className="text-foreground font-semibold mb-8">
              Uma boa declaração começa com organização.
            </p>
            <p className="text-muted-foreground mb-8">
              Copie a planilha, preencha com calma e declare com mais segurança e tranquilidade.
            </p>
            <Button size="lg" className="text-base" variant="secondary">
              <Copy className="mr-2 h-5 w-5" />
              Copiar planilha agora
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Imposto;
