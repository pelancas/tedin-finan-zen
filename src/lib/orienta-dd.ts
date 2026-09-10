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
  cidade?: string;
  estado?: string;
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

export interface ConsultaProcessosResponse {
  consulta_id: string;
  ok: boolean;
  diagnostico: string;
  total: number;
  relevantes: number;
  itens: ProcessoItem[];
  avisos: string[];
  erro: string | null;
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

/** Remove a linha em branco que o backend usa como placeholder de "sem processos". */
function itensValidos(itens: ProcessoItem[]): ProcessoItem[] {
  return itens.filter((i) => i.numero || i.nome || i.descricao);
}

/** Busca só os processos, na hora (sem job/polling) — usado na prévia, ao enviar o nome.
 * O consulta_id devolvido pode ser passado a criarJobCompleto para o relatório completo
 * herdar nome/doc e não refazer essa consulta. */
export async function consultarProcessos(
  nome: string,
  doc?: string,
): Promise<ConsultaProcessosResponse> {
  // Ainda não coletamos o CPF/CNPJ do proprietário nesta etapa — "0" é o
  // placeholder combinado com o backend enquanto isso não muda.
  const resposta = await chamar<ConsultaProcessosResponse>("/processos", {
    method: "POST",
    body: JSON.stringify({ nome, doc: doc || "0" }),
  });
  return { ...resposta, itens: itensValidos(resposta.itens) };
}

/** Cria o job do relatório completo (certidões, empresas, processos, PDF final). */
export async function criarJobCompleto(
  alvo: AlvoPayload,
  fontes: string[],
  consultaId?: string,
): Promise<string> {
  const corpo = await chamar<{ id: string }>("/jobs", {
    method: "POST",
    body: JSON.stringify({ ...alvo, fontes, consulta_id: consultaId || undefined }),
  });
  return corpo.id;
}

export async function consultarJob(jobId: string): Promise<JobResponse> {
  return chamar<JobResponse>(`/jobs/${jobId}`);
}

/** Envia a nota/observação sobre um job — usado no modal de feedback antes do download. */
export async function enviarFeedback(
  jobId: string,
  nota: number,
  observacao?: string,
): Promise<string> {
  const corpo = await chamar<{ id: string; id_job: string }>(`/jobs/${jobId}/feedback`, {
    method: "POST",
    body: JSON.stringify({ nota, observacao: observacao || "" }),
  });
  return corpo.id;
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

export function apiOrientaDdConfigurada(): boolean {
  return apiConfigurada();
}
