/**
 * Cliente para a API do orienta-dd (due diligence), exposta via túnel Cloudflare.
 * Ver ORIENTA_ORIGENS/ORIENTA_API_TOKEN em orienta-dd/orienta_dd/config.py.
 */

const API_URL = (import.meta.env.VITE_ORIENTA_API_URL || "").replace(/\/+$/, "");
const API_TOKEN = import.meta.env.VITE_ORIENTA_API_TOKEN || "";

export type JobStatus = "fila" | "rodando" | "pronto" | "erro";

export interface JobResponse {
  id: string;
  status: JobStatus;
  fontes: string[];
  progresso: string[];
  pdf: string | null;
  erro: string | null;
  criado_em: string;
  inicio_em: string | null;
  fim_em: string | null;
}

/** Espelha executor.PADRAO (orienta_dd/executor.py) — todos os coletores exceto
 * cnd_federal, que exige uma credencial (Conecta gov.br) ainda não configurada. */
const FONTES_RELATORIO_COMPLETO = [
  "cpf_situacao",
  "cnd_iptu",
  "cndt",
  "processos",
  "empresas",
  "empresas_cpf",
];

/** As fontes do relatório completo, tirando o IPTU quando não há índice cadastral. */
export function fontesRelatorioCompleto(temIndiceCadastral: boolean | null): string[] {
  return FONTES_RELATORIO_COMPLETO.filter((f) => f !== "cnd_iptu" || temIndiceCadastral === true);
}

export interface AlvoPayload {
  nome?: string;
  doc?: string;
  indice_iptu?: string;
  endereco?: string;
  endereco2?: string;
  comprador_nome?: string;
  comprador_cpf?: string;
  email?: string;
}

export interface ProcessoItem {
  relevante: "Relevante" | "Não relevante";
  nome: string;
  descricao: string;
  area: string;
  numero: string;
  orgao: string;
  atualizacao: string;
}

interface EstadoRelatorio {
  processos: ProcessoItem[];
}

function apiConfigurada(): boolean {
  return Boolean(API_URL && API_TOKEN);
}

async function chamar<T>(caminho: string, init?: RequestInit): Promise<T> {
  if (!apiConfigurada()) {
    throw new Error(
      "Consulta indisponível no momento: API do relatório não configurada.",
    );
  }
  const resposta = await fetch(`${API_URL}${caminho}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      "X-API-Token": API_TOKEN,
      ...init?.headers,
    },
  });
  if (!resposta.ok) {
    const corpo = await resposta.json().catch(() => null);
    throw new Error(corpo?.erro || `Falha na consulta (HTTP ${resposta.status})`);
  }
  return resposta.json() as Promise<T>;
}

/** Cria um job pedindo só a fonte "processos" — usado na prévia, ao enviar o nome. */
export async function criarJobProcessos(nome: string, doc?: string): Promise<string> {
  const corpo = await chamar<{ id: string }>("/jobs", {
    method: "POST",
    body: JSON.stringify({ nome, doc: doc || "", fontes: ["processos"] }),
  });
  return corpo.id;
}

/** Cria o job do relatório completo (certidões, empresas, processos, PDF final). */
export async function criarJobCompleto(alvo: AlvoPayload, fontes: string[]): Promise<string> {
  const corpo = await chamar<{ id: string }>("/jobs", {
    method: "POST",
    body: JSON.stringify({ ...alvo, fontes }),
  });
  return corpo.id;
}

export async function consultarJob(jobId: string): Promise<JobResponse> {
  return chamar<JobResponse>(`/jobs/${jobId}`);
}

/** Baixa o PDF pronto de um job e dispara o download no navegador. */
export async function baixarPdf(jobId: string, nomeArquivo: string): Promise<void> {
  if (!apiConfigurada()) {
    throw new Error("Consulta indisponível no momento: API do relatório não configurada.");
  }
  const resposta = await fetch(`${API_URL}/jobs/${jobId}/pdf`, {
    headers: { "X-API-Token": API_TOKEN },
  });
  if (!resposta.ok) {
    const corpo = await resposta.json().catch(() => null);
    throw new Error(corpo?.erro || `Falha ao baixar o PDF (HTTP ${resposta.status})`);
  }
  const blob = await resposta.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = nomeArquivo;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

async function buscarEstado(jobId: string): Promise<EstadoRelatorio> {
  return chamar<EstadoRelatorio>(`/jobs/${jobId}/estado`);
}

/** Remove a linha em branco que o backend usa como placeholder de "sem processos". */
function itensValidos(itens: ProcessoItem[]): ProcessoItem[] {
  return itens.filter((i) => i.numero || i.nome || i.descricao);
}

interface ResultadoProcessos {
  itens: ProcessoItem[];
  erro?: string;
}

/** Faz o polling de um job já criado até ele terminar, e devolve os processos achados. */
export async function aguardarProcessos(
  jobId: string,
  opcoes: { intervaloMs?: number; tentativasMax?: number } = {},
): Promise<ResultadoProcessos> {
  const intervaloMs = opcoes.intervaloMs ?? 4000;
  const tentativasMax = opcoes.tentativasMax ?? 30; // ~2min

  for (let tentativa = 0; tentativa < tentativasMax; tentativa++) {
    const job = await consultarJob(jobId);
    if (job.status === "pronto") {
      const estado = await buscarEstado(jobId);
      return { itens: itensValidos(estado.processos || []) };
    }
    if (job.status === "erro") {
      return { itens: [], erro: job.erro || "Não foi possível concluir a consulta." };
    }
    await new Promise((r) => setTimeout(r, intervaloMs));
  }
  return { itens: [], erro: "A consulta demorou mais que o esperado." };
}

/** Cria o job de "processos" para o nome informado e aguarda o resultado (poll). */
export async function buscarProcessos(
  nome: string,
  opcoes: { intervaloMs?: number; tentativasMax?: number } = {},
): Promise<ResultadoProcessos> {
  const jobId = await criarJobProcessos(nome);
  return aguardarProcessos(jobId, opcoes);
}

export function apiOrientaDdConfigurada(): boolean {
  return apiConfigurada();
}
