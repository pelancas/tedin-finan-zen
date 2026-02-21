import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Wallet, PieChart, Bell, CreditCard, ArrowRight, FileSpreadsheet,
  Copy, BookOpen, CheckCircle2, Target, Layers, Banknote,
  Landmark, PiggyBank, Smartphone, Building2, CircleDollarSign
} from "lucide-react";
import planilhaImg from "@/assets/planilha-planejamento.png";
import planilhaAcompanhamentoImg from "@/assets/planilha-acompanhamento.png";

const features = [
  {
    icon: Wallet,
    title: "Registro fácil",
    description: "Adicione gastos em segundos. Foto de recibo? A gente lê pra você.",
  },
  {
    icon: PieChart,
    title: "Relatórios visuais",
    description: "Gráficos simples que mostram para onde seu dinheiro está indo.",
  },
  {
    icon: Bell,
    title: "Alertas inteligentes",
    description: "Avisamos quando você está perto do limite que você mesmo definiu.",
  },
  {
    icon: CreditCard,
    title: "Múltiplas contas",
    description: "Cartão, débito, dinheiro vivo. Tudo num lugar só.",
  },
];

const modeloBeneficios = [
  "Clareza total sobre o destino do dinheiro",
  "Redução de gastos impulsivos",
  "Separação real entre consumo e poupança",
  "Flexibilidade (digital ou físico)",
  "Facilidade de adaptação à renda e aos objetivos",
];

const etapaDiaDia = [
  "Você recebe sua renda",
  "Executa o planejamento mensal",
  "Distribui o dinheiro nos envelopes escolhidos",
  "Gasta apenas o que está disponível em cada envelope",
  "Ajusta os valores no mês seguinte, se necessário",
];

const etapa1Inclui = [
  "Despesas fixas (aluguel, contas, escola)",
  "Despesas variáveis (mercado, lazer, transporte)",
  "Reservas e investimentos",
  "Metas de curto, médio e longo prazo",
];

const Despesas = () => {
  return (
    <Layout>
      {/* Seção 1 — Hero */}

      {/* Seção 2 — Modelo TEDin */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-primary-foreground" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Modelo TEDin
              </h2>
              <p className="text-lg font-medium text-foreground mb-4">
                Planejamento inteligente com controle real do dinheiro
              </p>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                O Modelo TEDin é um método híbrido de organização financeira que une o planejamento completo das despesas (orçamento base zero) com a separação prática do dinheiro (técnica do envelope).
              </p>
              <p className="text-muted-foreground font-medium max-w-2xl mx-auto mb-10">
                O objetivo é simples: dar destino a cada real e evitar que o dinheiro se misture.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
              {modeloBeneficios.map((beneficio) => (
                <div key={beneficio} className="flex items-start gap-3 p-4 rounded-xl bg-accent/50 border border-border">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground text-sm">{beneficio}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Seção 3 — O princípio do Modelo TEDin */}
      <section className="py-16 md:py-24 bg-accent/20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                O princípio do Modelo TEDin
              </h2>
              <p className="text-lg text-primary font-semibold mb-6">
                Todo dinheiro precisa de um destino definido e separado.
              </p>
              <p className="text-muted-foreground mb-2">Isso significa que:</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-12">
              <Card className="border-border text-center">
                <CardContent className="pt-6">
                  <p className="text-foreground font-medium">Nenhum valor fica "sem função"</p>
                </CardContent>
              </Card>
              <Card className="border-border text-center">
                <CardContent className="pt-6">
                  <p className="text-foreground font-medium">Poupar e investir fazem parte do planejamento, não do que "sobrar"</p>
                </CardContent>
              </Card>
              <Card className="border-border text-center">
                <CardContent className="pt-6">
                  <p className="text-foreground font-medium">Cada categoria tem um limite claro</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <Card className="border-border overflow-hidden">
                <CardHeader>
                  <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center mb-2">
                    <Layers className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg">Planejar</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-muted-foreground">Decidir para onde vai cada real</p>
                  <div className="rounded-xl overflow-hidden border border-border">
                    <img src={planilhaImg} alt="Exemplo de planilha de planejamento financeiro" className="w-full h-auto" />
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border overflow-hidden">
                <CardHeader>
                  <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center mb-2">
                    <Banknote className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg">Separar</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-muted-foreground">Colocar o dinheiro em "envelopes" reais ou digitais</p>
                  <div className="rounded-xl border border-border p-4 bg-accent/30">
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                        <Wallet className="h-7 w-7 text-primary-foreground" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { icon: CreditCard, label: "Dia a dia" },
                        { icon: Landmark, label: "Contas Fixas" },
                        { icon: PiggyBank, label: "Reserva" },
                        { icon: CircleDollarSign, label: "Investimentos" },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center gap-2 p-3 rounded-lg bg-background border border-border">
                          <item.icon className="h-5 w-5 text-primary flex-shrink-0" />
                          <span className="text-foreground text-sm font-medium">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-xl">Como o Modelo TEDin funciona no dia a dia</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {etapaDiaDia.map((passo, index) => (
                    <div key={index} className="flex gap-4 items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                        {index + 1}
                      </div>
                      <p className="text-muted-foreground pt-1">{passo}</p>
                    </div>
                  ))}
                </div>
                <p className="text-foreground font-medium mt-6 text-center border-t border-border pt-6">
                  O controle deixa de ser apenas "anotação" e passa a ser comportamental.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Seção 4 — Etapa 1: Planejamento */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary-foreground">1</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Planejamento completo das despesas
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                Nesta etapa, você lista toda a sua renda e define todos os destinos do dinheiro, até que o saldo planejado seja zero.
              </p>
              <p className="text-muted-foreground mb-2">Isso inclui:</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {etapa1Inclui.map((item) => (
                <div key={item} className="flex items-start gap-3 p-4 rounded-xl bg-accent/50 border border-border">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground text-sm">{item}</span>
                </div>
              ))}
            </div>

            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="pt-6 text-center space-y-4">
                <p className="text-foreground font-semibold text-lg">
                  "Zero" não significa gastar tudo, significa <span className="text-primary">planejar tudo</span>.
                </p>
                <p className="text-muted-foreground">Ao final do planejamento:</p>
                <p className="text-foreground font-mono text-lg font-bold">
                  renda – despesas – investimentos = 0 (planejado)
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Seção 5 — Planilha de Acompanhamento Financeiro */}
      <section className="py-16 md:py-24 bg-accent/20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-6">
                <FileSpreadsheet className="h-8 w-8 text-accent-foreground" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Planilha de Acompanhamento Financeiro
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Faça uma cópia da nossa planilha gratuita no Google Sheets e comece a organizar suas finanças agora mesmo.
              </p>
              <Button size="lg" className="text-base" asChild>
                <a href="https://docs.google.com/spreadsheets/d/1OL4LNo0j7ybXSS0hqpxxGaEK1Wk0ipIR71kevrlmTH8/copy" target="_blank" rel="noopener noreferrer">
                  <Copy className="mr-2 h-5 w-5" />
                  Copiar planilha
                </a>
              </Button>
              <div className="mt-10 rounded-xl overflow-hidden border border-border shadow-sm">
                <img src={planilhaAcompanhamentoImg} alt="Planilha de Acompanhamento Financeiro TEDin" className="w-full h-auto" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Seção 6 — Etapa 2: Separação do dinheiro */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary-foreground">2</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Separação do dinheiro (os "envelopes")
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
                Depois de planejar, o Modelo TEDin transforma cada categoria em um envelope, que pode ser físico ou digital.
              </p>
              <p className="text-primary font-semibold">
                Você escolhe a forma que melhor se adapta à sua rotina.
              </p>
            </div>

            <div className="space-y-8">
              {/* Opção 1 */}
              <Card className="border-border">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-accent-foreground" />
                    </div>
                    <CardTitle className="text-lg">Opção 1 — Envelopes com bancos digitais diferentes</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Cada conta representa um objetivo específico.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      "Conta 1: despesas do dia a dia",
                      "Conta 2: contas fixas",
                      "Conta 3: reserva de emergência",
                      "Conta 4: investimentos",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2 p-3 rounded-lg bg-accent/50 border border-border">
                        <Landmark className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-foreground text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm italic">
                    Essa opção funciona bem para quem prefere separação rígida e menor risco de misturar valores.
                  </p>
                </CardContent>
              </Card>

              {/* Opção 2 */}
              <Card className="border-border">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                      <Smartphone className="h-5 w-5 text-accent-foreground" />
                    </div>
                    <CardTitle className="text-lg">Opção 2 — Envelopes dentro da mesma conta (caixinhas ou metas)</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Alguns bancos permitem criar subdivisões internas dentro da mesma conta. Você mantém uma conta principal e várias "caixinhas" ou "metas", cada uma com um objetivo.
                  </p>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {["Mercado", "Lazer", "Reserva de emergência", "Viagens", "Investimentos"].map((item) => (
                      <div key={item} className="flex items-center gap-2 p-3 rounded-lg bg-accent/50 border border-border">
                        <PiggyBank className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-foreground text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm italic">
                    Na prática, é como ter vários envelopes digitais, sem abrir várias contas.
                  </p>
                </CardContent>
              </Card>

              {/* Opção 3 */}
              <Card className="border-border">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                      <Banknote className="h-5 w-5 text-accent-foreground" />
                    </div>
                    <CardTitle className="text-lg">Opção 3 — Envelope clássico (dinheiro físico)</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Para quem prefere controle visual ou tem dificuldade com gastos impulsivos: o dinheiro é separado em espécie, cada envelope recebe um nome e, ao acabar o valor, o gasto daquela categoria termina.
                  </p>
                  <p className="text-muted-foreground">Funciona especialmente bem para:</p>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {["Lazer", "Alimentação fora de casa", "Gastos pessoais variáveis"].map((item) => (
                      <div key={item} className="flex items-center gap-2 p-3 rounded-lg bg-accent/50 border border-border">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-foreground text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Despesas;
