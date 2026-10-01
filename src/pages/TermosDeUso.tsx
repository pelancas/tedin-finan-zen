import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { EMPRESA, WHATSAPP_URL, EMAIL_URL } from "@/lib/empresa";

const ATUALIZADO_EM = "1º de outubro de 2026";

export default function TermosDeUso() {
  useDocumentMeta(
    "Termos de Uso | Orienta",
    "Condições de uso do site da Orienta, das calculadoras financeiras e do Relatório de Avaliação de Riscos.",
  );

  return (
    <Layout>
      <section className="py-16" style={{ background: "#1A2E35" }}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-black tracking-tight text-white md:text-4xl">
            Termos de Uso
          </h1>
          <p className="mt-3 text-sm text-white/50">Última atualização: {ATUALIZADO_EM}</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="prose prose-slate mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-a:text-primary">
          <p>
            Estes Termos regulam o uso do site da <strong>{EMPRESA.marca}</strong> (
            {EMPRESA.dominios.join(" e ")}), operado por {EMPRESA.responsavel}, CPF {EMPRESA.cpf},{" "}
            {EMPRESA.cidade}. Ao usar o site, você concorda com eles.
          </p>

          <h2>1. O que oferecemos</h2>
          <ul>
            <li>
              <strong>Conteúdo e calculadoras</strong>: material educativo e simulações
              gratuitas. Os resultados são estimativas e não constituem recomendação de
              investimento, consultoria jurídica ou contábil.
            </li>
            <li>
              <strong>Relatório de Avaliação de Riscos</strong>: levantamento de certidões,
              processos judiciais e empresas ligadas ao vendedor de um imóvel em Belo Horizonte
              (MG), feito a partir de informações públicas, com entrega em PDF.
            </li>
          </ul>

          <h2>2. Serviço privado e independente</h2>
          <p>
            A {EMPRESA.marca} <strong>não é órgão público</strong> e não tem vínculo, parceria ou
            representação com Receita Federal, tribunais, cartórios, prefeituras ou outras
            instituições. Os nomes desses órgãos aparecem apenas para indicar a fonte das
            informações públicas consultadas. Também não somos parceiros oficiais de bancos,
            corretoras, seguradoras, imobiliárias ou veículos de imprensa.
          </p>
          <p>
            As certidões e consultas que compõem o Relatório são obtidas nos sistemas públicos
            de cada órgão e podem ser emitidas gratuitamente por qualquer pessoa, diretamente
            nos sites oficiais. A {EMPRESA.marca} não emite documentos oficiais: o serviço
            consiste em reunir, organizar e explicar essas informações em um único relatório.
          </p>

          <h2>3. Uso do Relatório de Avaliação de Riscos</h2>
          <ul>
            <li>
              Você só deve solicitar o relatório sobre alguém com quem esteja de fato negociando
              um imóvel, e se compromete a usá-lo apenas para avaliar essa negociação.
            </li>
            <li>
              É proibido usar o relatório para discriminar, perseguir, expor ou prejudicar a
              pessoa consultada.
            </li>
            <li>
              Os dados informados precisam ser verdadeiros. Dados incorretos podem gerar um
              relatório incompleto ou impreciso.
            </li>
            <li>
              O relatório reflete o que as fontes públicas mostravam no momento da consulta.
              Algumas fontes podem estar indisponíveis ou desatualizadas, e o relatório não
              substitui a análise de um advogado ou a certidão de matrícula emitida pelo
              cartório.
            </li>
          </ul>

          <h2>4. O que nunca pedimos</h2>
          <p>
            Nunca pedimos senhas, dados de cartão, dados bancários, códigos de verificação ou
            acesso à sua conta gov.br. Se alguém pedir essas informações em nome da{" "}
            {EMPRESA.marca}, não forneça e nos avise.
          </p>

          <h2>5. Privacidade</h2>
          <p>
            O tratamento de dados pessoais segue a nossa{" "}
            <Link to="/politica-de-privacidade">Política de Privacidade</Link>.
          </p>

          <h2>6. Propriedade intelectual</h2>
          <p>
            Textos, marca, layout e ferramentas do site pertencem à {EMPRESA.marca}. Você pode
            compartilhar links e citar trechos com indicação da fonte.
          </p>

          <h2>7. Alterações</h2>
          <p>
            Podemos atualizar estes Termos. A data da última atualização fica sempre no topo da
            página.
          </p>

          <h2>8. Contato</h2>
          <ul>
            <li>
              E-mail: <a href={EMAIL_URL}>{EMPRESA.email}</a>
            </li>
            <li>
              Telefone/WhatsApp:{" "}
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                {EMPRESA.telefone}
              </a>
            </li>
            <li>Horário de atendimento: {EMPRESA.horario}</li>
          </ul>
        </div>
      </section>
    </Layout>
  );
}
