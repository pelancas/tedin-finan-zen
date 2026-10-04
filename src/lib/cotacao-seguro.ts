// ─── Estimativa de mensalidade (idade + sexo) ─────────────────────────────────
// Tabela de referência com cotações médias de mercado para seguro de vida
// (mensalidade, em R$, por capital segurado de R$500 mil e R$1 milhão).
// Serve só como estimativa — a mensalidade real varia por seguradora, saúde e hábitos.
export type Genero = "feminino" | "masculino";
// Opção extra oferecida no formulário — não existe linha própria na tabela de
// referência, então a estimativa usa a tabela "masculino" (valores mais altos).
export type GeneroSelecionado = Genero | "nao_informar";

const generoParaTabela = (genero: GeneroSelecionado): Genero =>
  genero === "feminino" ? "feminino" : "masculino";

const TABELA_PREMIOS_SEGURO_VIDA: Record<Genero, { idade: number; c500k: number; c1m: number }[]> = {
  feminino: [
    { idade: 35, c500k: 36, c1m: 71 },
    { idade: 40, c500k: 50, c1m: 100 },
    { idade: 45, c500k: 77, c1m: 154 },
    { idade: 50, c500k: 121, c1m: 242 },
  ],
  masculino: [
    { idade: 35, c500k: 58, c1m: 117 },
    { idade: 40, c500k: 74, c1m: 148 },
    { idade: 45, c500k: 105, c1m: 209 },
    { idade: 50, c500k: 163, c1m: 325 },
  ],
};

const interpolarLinear = (x: number, pontos: { x: number; y: number }[]) => {
  if (x <= pontos[0].x) return pontos[0].y;
  if (x >= pontos[pontos.length - 1].x) return pontos[pontos.length - 1].y;
  for (let i = 0; i < pontos.length - 1; i++) {
    const a = pontos[i];
    const b = pontos[i + 1];
    if (x >= a.x && x <= b.x) {
      const t = (x - a.x) / (b.x - a.x);
      return a.y + t * (b.y - a.y);
    }
  }
  return pontos[pontos.length - 1].y;
};

// Interpola a tabela por idade (dentro da faixa 35-50) e depois escala
// linearmente pelo capital segurado, usando os pontos de R$500 mil e R$1 milhão.
export const estimarMensalidadeSeguroVida = (capital: number, idade: number, genero: GeneroSelecionado) => {
  if (capital <= 0 || idade <= 0) return null;
  const idadeClamp = Math.min(50, Math.max(35, idade));
  const tabela = TABELA_PREMIOS_SEGURO_VIDA[generoParaTabela(genero)];
  const c500k = interpolarLinear(idadeClamp, tabela.map((p) => ({ x: p.idade, y: p.c500k })));
  const c1m = interpolarLinear(idadeClamp, tabela.map((p) => ({ x: p.idade, y: p.c1m })));
  const porReal = (c1m - c500k) / 500_000;
  return Math.max(0, c500k + porReal * (capital - 500_000));
};
