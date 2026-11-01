// ─── Comparação CLT x PJ ──────────────────────────────────────────────────────
// Simulação simplificada com as tabelas de 2026 (INSS, IRRF, Simples Nacional, MEI).
// Não considera dependentes, pensão, deduções extras nem particularidades de cada
// atividade — serve como estimativa para comparar propostas.

export type RegimePj = "simples_iii" | "simples_v" | "mei";

export const SALARIO_MINIMO = 1621;
export const TETO_INSS = 8475.55;
export const LIMITE_FATURAMENTO_MEI_MENSAL = 81_000 / 12;
const DAS_MEI_SERVICOS = 86.05; // 5% do salário mínimo (INSS) + R$5 de ISS
const FATOR_R = 0.28;

const FAIXAS_INSS = [
  { ate: 1621, aliquota: 0.075 },
  { ate: 2902.84, aliquota: 0.09 },
  { ate: 4354.27, aliquota: 0.12 },
  { ate: TETO_INSS, aliquota: 0.14 },
];

const FAIXAS_IRRF = [
  { ate: 2428.8, aliquota: 0, deducao: 0 },
  { ate: 2826.65, aliquota: 0.075, deducao: 182.16 },
  { ate: 3751.05, aliquota: 0.15, deducao: 394.16 },
  { ate: 4664.68, aliquota: 0.225, deducao: 675.49 },
  { ate: Infinity, aliquota: 0.275, deducao: 908.73 },
];
const DESCONTO_SIMPLIFICADO = 607.2;

const FAIXAS_SIMPLES: Record<"simples_iii" | "simples_v", { ate: number; aliquota: number; deducao: number }[]> = {
  simples_iii: [
    { ate: 180_000, aliquota: 0.06, deducao: 0 },
    { ate: 360_000, aliquota: 0.112, deducao: 9_360 },
    { ate: 720_000, aliquota: 0.135, deducao: 17_640 },
    { ate: 1_800_000, aliquota: 0.16, deducao: 35_640 },
    { ate: 3_600_000, aliquota: 0.21, deducao: 125_640 },
    { ate: Infinity, aliquota: 0.33, deducao: 648_000 },
  ],
  simples_v: [
    { ate: 180_000, aliquota: 0.155, deducao: 0 },
    { ate: 360_000, aliquota: 0.18, deducao: 4_500 },
    { ate: 720_000, aliquota: 0.195, deducao: 9_900 },
    { ate: 1_800_000, aliquota: 0.205, deducao: 17_100 },
    { ate: 3_600_000, aliquota: 0.23, deducao: 62_100 },
    { ate: Infinity, aliquota: 0.305, deducao: 540_000 },
  ],
};

export const calcularInss = (base: number) => {
  const limitada = Math.min(Math.max(base, 0), TETO_INSS);
  let total = 0;
  let anterior = 0;
  for (const faixa of FAIXAS_INSS) {
    if (limitada <= anterior) break;
    total += (Math.min(limitada, faixa.ate) - anterior) * faixa.aliquota;
    anterior = faixa.ate;
  }
  return total;
};

// Tabela progressiva + redução da Lei 15.270/2025 (isenção até R$5.000, gradual até R$7.350).
export const calcularIrrf = (rendimentoBruto: number, inss: number) => {
  if (rendimentoBruto <= 5000) return 0;
  const base = rendimentoBruto - Math.max(inss, DESCONTO_SIMPLIFICADO);
  const faixa = FAIXAS_IRRF.find((f) => base <= f.ate) ?? FAIXAS_IRRF[FAIXAS_IRRF.length - 1];
  const imposto = Math.max(0, base * faixa.aliquota - faixa.deducao);
  const reducao = rendimentoBruto >= 7350 ? 0 : Math.max(0, 978.62 - 0.133145 * rendimentoBruto);
  return Math.max(0, imposto - reducao);
};

// ─── CLT ──────────────────────────────────────────────────────────────────────

const liquidoClt = (bruto: number) => {
  const inss = calcularInss(bruto);
  return bruto - inss - calcularIrrf(bruto, inss);
};

export interface ResultadoClt {
  salarioBruto: number;
  inss: number;
  irrf: number;
  salarioLiquido: number;
  /** 13º salário + 1/3 de férias, líquidos, divididos por 12. */
  decimoFeriasMensal: number;
  fgtsMensal: number;
  beneficiosMensal: number;
  pacoteMensal: number;
}

export const simularClt = (salarioBruto: number, beneficiosMensal: number): ResultadoClt => {
  const inss = calcularInss(salarioBruto);
  const irrf = calcularIrrf(salarioBruto, inss);
  const salarioLiquido = salarioBruto - inss - irrf;

  const liquido13 = liquidoClt(salarioBruto);
  const liquidoTercoFerias = liquidoClt(salarioBruto * (4 / 3)) - liquidoClt(salarioBruto);
  const decimoFeriasMensal = (liquido13 + liquidoTercoFerias) / 12;

  const fgtsMensal = (0.08 * (salarioBruto * 13 + salarioBruto / 3)) / 12;

  return {
    salarioBruto,
    inss,
    irrf,
    salarioLiquido,
    decimoFeriasMensal,
    fgtsMensal,
    beneficiosMensal,
    pacoteMensal: salarioLiquido + decimoFeriasMensal + fgtsMensal + beneficiosMensal,
  };
};

// ─── PJ ───────────────────────────────────────────────────────────────────────

export interface OpcoesPj {
  regime: RegimePj;
  contadorMensal: number;
  /** PJ não recebe nas férias: considera 11 meses de faturamento no ano. */
  semFeriasRemuneradas: boolean;
}

export interface ResultadoPj {
  faturamentoMensal: number;
  feriasSemReceita: number;
  imposto: number;
  aliquotaEfetiva: number;
  contador: number;
  proLabore: number;
  inssProLabore: number;
  irrfProLabore: number;
  /** Renda líquida mensal média, antes de pagar benefícios do próprio bolso. */
  rendaLiquidaMensal: number;
}

export const aliquotaEfetivaSimples = (receitaAnual: number, regime: "simples_iii" | "simples_v") => {
  if (receitaAnual <= 0) return 0;
  const faixas = FAIXAS_SIMPLES[regime];
  const faixa = faixas.find((f) => receitaAnual <= f.ate) ?? faixas[faixas.length - 1];
  return Math.max(0, (receitaAnual * faixa.aliquota - faixa.deducao) / receitaAnual);
};

export const simularPj = (faturamentoMensal: number, opcoes: OpcoesPj): ResultadoPj => {
  const meses = opcoes.semFeriasRemuneradas ? 11 : 12;
  const receitaAnual = faturamentoMensal * meses;
  const receitaMedia = receitaAnual / 12;
  const feriasSemReceita = faturamentoMensal - receitaMedia;

  let imposto = 0;
  let aliquotaEfetiva = 0;
  let proLabore = 0;
  let inssProLabore = 0;
  let irrfProLabore = 0;

  if (opcoes.regime === "mei") {
    imposto = DAS_MEI_SERVICOS;
    aliquotaEfetiva = receitaMedia > 0 ? imposto / receitaMedia : 0;
  } else {
    aliquotaEfetiva = aliquotaEfetivaSimples(receitaAnual, opcoes.regime);
    imposto = receitaMedia * aliquotaEfetiva;
    // Anexo III exige fator R ≥ 28% (pró-labore sobre o faturamento); Anexo V usa o mínimo.
    const alvo = opcoes.regime === "simples_iii" ? Math.max(SALARIO_MINIMO, FATOR_R * receitaMedia) : SALARIO_MINIMO;
    proLabore = Math.min(alvo, receitaMedia);
    inssProLabore = 0.11 * Math.min(proLabore, TETO_INSS);
    irrfProLabore = calcularIrrf(proLabore, inssProLabore);
  }

  return {
    faturamentoMensal,
    feriasSemReceita,
    imposto,
    aliquotaEfetiva,
    contador: opcoes.contadorMensal,
    proLabore,
    inssProLabore,
    irrfProLabore,
    rendaLiquidaMensal: receitaMedia - imposto - opcoes.contadorMensal - inssProLabore - irrfProLabore,
  };
};

// ─── Equivalência ─────────────────────────────────────────────────────────────

// Busca binária numa função crescente: acha x tal que f(x) ≈ alvo.
const resolver = (f: (x: number) => number, alvo: number) => {
  let baixo = 0;
  let alto = Math.max(alvo * 4, 10_000);
  for (let i = 0; i < 80; i++) {
    const meio = (baixo + alto) / 2;
    if (f(meio) < alvo) baixo = meio;
    else alto = meio;
  }
  return (baixo + alto) / 2;
};

/** Faturamento mensal PJ que entrega o mesmo pacote de uma CLT. */
export const faturamentoPjEquivalente = (pacoteClt: number, opcoes: OpcoesPj) =>
  resolver((r) => simularPj(r, opcoes).rendaLiquidaMensal, pacoteClt);

/** Salário bruto CLT que entrega o mesmo pacote de um PJ. */
export const salarioCltEquivalente = (rendaPj: number, beneficiosMensal: number) =>
  resolver((s) => simularClt(s, beneficiosMensal).pacoteMensal, rendaPj);
