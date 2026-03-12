import { useState, useCallback } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, TrendingUp, Scale, Trophy, TriangleAlert } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type RateType = "prefixado" | "cdi" | "cdi_spread" | "ipca";
type TimeUnit = "months" | "years";

interface InvestmentSide {
  type: string;
  rateType: RateType;
  rateValue: number;
}

interface Results {
  netAnnualA: number;
  netAnnualB: number;
  grossRateA: number;
  grossRateB: number;
  netGainA: number;
  netGainB: number;
  ir: number;
  winA: boolean;
  months: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const INVESTMENT_TYPES = [
  "CDB", "LCI", "LCA", "LC", "LIG",
  "CRI", "CRA", "DEBÊNTURE", "DEBÊNTURE INCENTIVADA", "TESOURO DIRETO",
];

const TAX_EXEMPT: Record<string, boolean> = {
  LCI: true, LCA: true, LC: false, LIG: true,
  CRI: true, CRA: true, DEBÊNTURE: false,
  "DEBÊNTURE INCENTIVADA": true, CDB: false, "TESOURO DIRETO": false,
};

const RATE_TYPES: { value: RateType; label: string }[] = [
  { value: "prefixado", label: "Pré-fixado" },
  { value: "cdi", label: "% do CDI" },
  { value: "cdi_spread", label: "CDI + Taxa" },
  { value: "ipca", label: "IPCA + Taxa" },
];

const RATE_SUFFIX: Record<RateType, string> = {
  prefixado: "% a.a.",
  cdi: "% do CDI",
  cdi_spread: "% a.a.",
  ipca: "% a.a.",
};

const RATE_PREFIX: Record<RateType, string | null> = {
  prefixado: null,
  cdi: null,
  cdi_spread: "CDI +",
  ipca: "IPCA +",
};

const RATE_DEFAULTS: Record<RateType, number> = {
  prefixado: 13,
  cdi: 120,
  cdi_spread: 2,
  ipca: 6,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function irRate(months: number) {
  if (months <= 6) return 0.225;
  if (months <= 12) return 0.20;
  if (months <= 24) return 0.175;
  return 0.15;
}

function fmt(n: number) {
  return n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtPct(n: number) {
  return n.toFixed(2).replace(".", ",");
}

// ─── InvestmentCard ───────────────────────────────────────────────────────────
interface InvestmentCardProps {
  label: string;
  accentClass: string;
  dotClass: string;
  activeClass: string;
  investment: InvestmentSide;
  onChange: (next: InvestmentSide) => void;
}

function InvestmentCard({
  label,
  accentClass,
  dotClass,
  activeClass,
  investment,
  onChange,
}: InvestmentCardProps) {
  const isExempt = TAX_EXEMPT[investment.type];

  return (
    <Card className={`border-border border-t-4 ${accentClass}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${dotClass}`} />
            <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground">
              {label}
            </span>
          </div>
          {isExempt && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md bg-primary/10 text-primary">
              <CheckCircle2 className="h-3 w-3" />
              Isento IR
            </span>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Tipo de investimento */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-muted-foreground tracking-wide">
            Tipo de investimento
          </label>
          <div className="relative">
            <select
              value={investment.type}
              onChange={(e) => onChange({ ...investment, type: e.target.value })}
              className="w-full appearance-none bg-accent/40 border-0 rounded-lg px-3 py-2.5 pr-8 text-sm font-semibold text-foreground outline-none cursor-pointer focus:bg-accent"
            >
              {INVESTMENT_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">▾</span>
          </div>
        </div>

        {/* Tipo de rentabilidade */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-muted-foreground tracking-wide">
            Tipo de rentabilidade
          </label>
          <div className="flex flex-wrap gap-2">
            {RATE_TYPES.map(({ value, label: rLabel }) => (
              <button
                key={value}
                onClick={() =>
                  onChange({ ...investment, rateType: value, rateValue: RATE_DEFAULTS[value] })
                }
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all cursor-pointer
                  ${investment.rateType === value
                    ? `${activeClass} text-white border-transparent`
                    : "border-border text-muted-foreground bg-transparent hover:border-primary/40"
                  }`}
              >
                {rLabel}
              </button>
            ))}
          </div>
        </div>

        {/* Valor da rentabilidade */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-muted-foreground tracking-wide">
            Rentabilidade <span className="font-normal">(taxa anual bruta)</span>
          </label>
          <div className="flex items-center gap-2 bg-accent/40 rounded-lg px-3 py-2 focus-within:bg-accent transition-colors">
            {RATE_PREFIX[investment.rateType] && (
              <span className="text-xs text-muted-foreground font-medium whitespace-nowrap">
                {RATE_PREFIX[investment.rateType]}
              </span>
            )}
            <input
              type="number"
              value={investment.rateValue}
              step={investment.rateType === "cdi" ? 1 : 0.1}
              min={0}
              onChange={(e) =>
                onChange({ ...investment, rateValue: parseFloat(e.target.value) || 0 })
              }
              className="flex-1 bg-transparent outline-none text-2xl font-bold text-foreground w-0 min-w-0"
            />
            <span className="text-sm font-semibold text-muted-foreground whitespace-nowrap">
              {RATE_SUFFIX[investment.rateType]}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── ResultCard ───────────────────────────────────────────────────────────────
interface ResultCardProps {
  label: string;
  type: string;
  netAnnual: number;
  grossRate: number;
  irLabel: string;
  isWinner: boolean;
  gradient: string;
}

function ResultCard({ label, type, netAnnual, grossRate, irLabel, isWinner, gradient }: ResultCardProps) {
  return (
    <div
      className="rounded-2xl p-6 text-white relative overflow-hidden"
      style={{ background: gradient }}
    >
      <div className="absolute -top-5 -right-5 w-20 h-20 rounded-full bg-white/10" />
      <p className="text-xs font-bold tracking-widest uppercase opacity-80 mb-1">{label}</p>
      <p className="text-sm font-semibold opacity-90 mb-3">{type}</p>
      <p className="text-5xl font-extrabold tracking-tight leading-none">
        {fmtPct(netAnnual)}
        <span className="text-xl font-semibold opacity-80 ml-1">% a.a. líq.</span>
      </p>
      <p className="text-xs opacity-75 mt-2 font-medium">
        Bruto: {fmtPct(grossRate)}% · {irLabel}
      </p>
      {isWinner && (
        <div className="inline-flex items-center gap-1.5 bg-white/25 rounded-full px-3 py-1 text-xs font-bold mt-3">
          <Trophy className="h-3.5 w-3.5" />
          Melhor opção
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
const ComparadorRendaFixa = () => {
  const [cdiRate, setCdiRate] = useState(14.65);
  const [timeValue, setTimeValue] = useState(12);
  const [timeUnit, setTimeUnit] = useState<TimeUnit>("months");
  const [results, setResults] = useState<Results | null>(null);

  const [investA, setInvestA] = useState<InvestmentSide>({
    type: "LCA",
    rateType: "prefixado",
    rateValue: 13,
  });

  const [investB, setInvestB] = useState<InvestmentSide>({
    type: "CDB",
    rateType: "cdi",
    rateValue: 120,
  });

  const months = timeUnit === "years" ? Math.round(timeValue * 12) : timeValue;
  const timeEquiv =
    timeUnit === "years"
      ? `= ${months} meses`
      : `= ${(timeValue / 12).toFixed(1)} anos`;

  function getAnnualRate(inv: InvestmentSide): number {
    const cdi = cdiRate / 100;
    const ipca = 0.045;
    const val = inv.rateValue / 100;
    if (inv.rateType === "prefixado") return val;
    if (inv.rateType === "cdi") return cdi * val;
    if (inv.rateType === "cdi_spread") return cdi + val;
    if (inv.rateType === "ipca") return ipca + val;
    return val;
  }

  const calculate = useCallback(() => {
    const rateA = getAnnualRate(investA);
    const rateB = getAnnualRate(investB);
    const exemptA = TAX_EXEMPT[investA.type];
    const exemptB = TAX_EXEMPT[investB.type];
    const ir = irRate(months);

    const monthRateA = Math.pow(1 + rateA, 1 / 12) - 1;
    const monthRateB = Math.pow(1 + rateB, 1 / 12) - 1;
    const grossA = Math.pow(1 + monthRateA, months) - 1;
    const grossB = Math.pow(1 + monthRateB, months) - 1;
    const netGainA = exemptA ? grossA : grossA * (1 - ir);
    const netGainB = exemptB ? grossB : grossB * (1 - ir);
    const netAnnualA = (Math.pow(1 + netGainA, 12 / months) - 1) * 100;
    const netAnnualB = (Math.pow(1 + netGainB, 12 / months) - 1) * 100;

    setResults({
      netAnnualA,
      netAnnualB,
      grossRateA: rateA * 100,
      grossRateB: rateB * 100,
      netGainA,
      netGainB,
      ir,
      winA: netAnnualA >= netAnnualB,
      months,
    });
  }, [investA, investB, cdiRate, months]);

  return (
    <Layout>
      {/* ── Seção 1 — Configurações ── */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto  min-h-screen">

            {/* Header */}
            <div className="text-center mb-12">
              <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-6">
                <Scale className="h-8 w-8 text-primary-foreground" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Comparador de Renda Fixa
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Compare dois investimentos e descubra qual rende mais para o seu perfil, já descontando o IR.
              </p>
            </div>

            {/* Taxas de referência */}
            <Card className="border-border mb-6">
              <CardContent className="pt-5">
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                    <span className="text-sm font-medium text-muted-foreground">
                      CDI:{" "}
                      <strong className="text-foreground">
                        {cdiRate.toFixed(2).replace(".", ",")}%
                      </strong>{" "}
                      a.a.
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#F39C12] inline-block" />
                    <span className="text-sm font-medium text-muted-foreground">
                      IPCA: <strong className="text-foreground">4,50%</strong> a.a.
                    </span>
                  </div>
                  <div className="flex items-center gap-2 ml-auto">
                    <span className="text-xs text-muted-foreground">Editar CDI %</span>
                    <input
                      type="number"
                      value={cdiRate}
                      step={0.01}
                      onChange={(e) => setCdiRate(parseFloat(e.target.value) || 0)}
                      className="w-20 bg-accent/40 rounded-lg px-2 py-1.5 text-sm font-bold text-foreground outline-none focus:bg-accent"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Período */}
            <Card className="border-border mb-6">
              <CardContent className="pt-5">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="text-sm font-semibold text-foreground whitespace-nowrap">
                    ⏱ Tempo de investimento
                  </span>
                  <div className="flex items-center gap-3 flex-1 min-w-[200px]">
                    <input
                      type="number"
                      value={timeValue}
                      min={1}
                      onChange={(e) => setTimeValue(parseInt(e.target.value) || 1)}
                      className="w-24 bg-accent/40 rounded-lg px-3 py-2 text-xl font-bold text-foreground outline-none focus:bg-accent"
                    />
                    <div className="flex bg-accent/40 rounded-lg p-1 gap-1">
                      {(["months", "years"] as TimeUnit[]).map((u) => (
                        <button
                          key={u}
                          onClick={() => setTimeUnit(u)}
                          className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all cursor-pointer
                            ${timeUnit === u
                              ? "bg-background text-primary shadow-sm"
                              : "text-muted-foreground"
                            }`}
                        >
                          {u === "months" ? "Meses" : "Anos"}
                        </button>
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground font-medium">{timeEquiv}</span>
                </div>
              </CardContent>
            </Card>

            {/* Cards dos investimentos */}
            <div className="grid sm:grid-cols-2 gap-5 mb-6">
              <InvestmentCard
                label="Investimento A"
                accentClass="border-t-primary"
                dotClass="bg-primary"
                activeClass="bg-primary"
                investment={investA}
                onChange={setInvestA}
              />
              <InvestmentCard
                label="Investimento B"
                accentClass="border-t-[#F39C12]"
                dotClass="bg-[#F39C12]"
                activeClass="bg-[#F39C12]"
                investment={investB}
                onChange={setInvestB}
              />
            </div>

            {/* CTA */}
            <Button size="lg" className="w-full text-base" onClick={calculate}>
              <TrendingUp className="mr-2 h-5 w-5" />
              Calcular e Comparar
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* ── Seção 2 — Resultados ── */}
      {results && (() => {
        const exemptA = TAX_EXEMPT[investA.type];
        const exemptB = TAX_EXEMPT[investB.type];
        const irLabel_A = exemptA ? "Isento de IR" : `IR ${(results.ir * 100).toFixed(1)}%`;
        const irLabel_B = exemptB ? "Isento de IR" : `IR ${(results.ir * 100).toFixed(1)}%`;
        const timeLabel = results.months === 1 ? "1 mês" : `${results.months} meses`;
        const diff = Math.abs(results.netAnnualA - results.netAnnualB).toFixed(2).replace(".", ",");
        const winner = results.winA ? investA.type : investB.type;
        const loser = results.winA ? investB.type : investA.type;
        const principal = 1000;
        const finalA = principal * (1 + results.netGainA);
        const finalB = principal * (1 + results.netGainB);
        const yieldA = finalA - principal;
        const yieldB = finalB - principal;

        return (
          <section className="py-16 md:py-24 bg-accent/20">
            <div className="container">
              <div className="max-w-4xl mx-auto space-y-6">

                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-foreground">Resultado</h2>
                  <p className="text-muted-foreground mt-2">
                    Rentabilidade líquida considerando {timeLabel}
                  </p>
                </div>

                {/* Result cards */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <ResultCard
                    label="Investimento A"
                    type={investA.type}
                    netAnnual={results.netAnnualA}
                    grossRate={results.grossRateA}
                    irLabel={irLabel_A}
                    isWinner={results.winA}
                    gradient="linear-gradient(135deg, #1DB954 0%, #2ECC71 100%)"
                  />
                  <ResultCard
                    label="Investimento B"
                    type={investB.type}
                    netAnnual={results.netAnnualB}
                    grossRate={results.grossRateB}
                    irLabel={irLabel_B}
                    isWinner={!results.winA}
                    gradient="linear-gradient(135deg, #E67E22 0%, #F39C12 100%)"
                  />
                </div>

                {/* Veredicto */}
                <Card className={`border-l-4 ${results.winA ? "border-l-primary" : "border-l-[#F39C12]"} border-border`}>
                  <CardContent className="pt-6 space-y-4">
                    <p className="text-sm text-foreground leading-relaxed">
                      O investimento <strong>{investA.type}</strong> renderá{" "}
                      <strong>{fmtPct(results.netAnnualA)}% a.a. líquido</strong>, enquanto o{" "}
                      <strong>{investB.type}</strong> renderá{" "}
                      <strong>{fmtPct(results.netAnnualB)}% a.a. líquido</strong>, considerando um
                      período de <strong>{timeLabel}</strong>. Nessas condições, o{" "}
                      <strong>{winner}</strong> é{" "}
                      <strong>{diff}% mais rentável</strong> ao ano que o{" "}
                      <strong>{loser}</strong>.{" "}
                      {(exemptA || exemptB) && "A isenção de IR foi considerada no cálculo."}
                    </p>

                    <div className="border-t border-border pt-4 space-y-2">
                      <p className="text-sm font-semibold text-foreground mb-3">
                        Se você investir R$ 1.000,00:
                      </p>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div className="flex items-start gap-3 p-3 rounded-xl bg-accent/50 border border-border">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-semibold text-foreground">{investA.type}</p>
                            <p className="text-sm text-muted-foreground">
                              R$ {fmt(finalA)}{" "}
                              <span className="text-primary font-semibold">(+ R$ {fmt(yieldA)})</span>
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-xl bg-accent/50 border border-border">
                          <CheckCircle2 className="h-4 w-4 text-[#F39C12] mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-semibold text-foreground">{investB.type}</p>
                            <p className="text-sm text-muted-foreground">
                              R$ {fmt(finalB)}{" "}
                              <span className="text-[#E67E22] font-semibold">(+ R$ {fmt(yieldB)})</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Disclaimer */}
                <div className="flex items-start gap-3 p-4 rounded-xl bg-accent/50 border border-border">
                  <TriangleAlert className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-muted-foreground">
                    As taxas são sazonais e podem mudar. Esta calculadora tem caráter informativo.
                  </p>
                </div>

              </div>
            </div>
          </section>
        );
      })()}
    </Layout>
  );
};

export default ComparadorRendaFixa;
