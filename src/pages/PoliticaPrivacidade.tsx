import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { INSTAGRAM_URL } from "@/components/layout/Header";
import { WHATSAPP_NUMBER } from "@/pages/imoveis/RelatorioAvaliacaoRiscos";

const ATUALIZADO_EM = "1º de outubro de 2026";

export default function PoliticaPrivacidade() {
  useDocumentMeta(
    "Política de Privacidade | Orienta",
    "Saiba quais dados a Orienta coleta, para que eles são usados, com quem são compartilhados e como exercer seus direitos previstos na LGPD.",
  );

  return (
    <Layout>
      <section className="py-16" style={{ background: "#1A2E35" }}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-black tracking-tight text-white md:text-4xl">
            Política de Privacidade
          </h1>
          <p className="mt-3 text-sm text-white/50">Última atualização: {ATUALIZADO_EM}</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="prose prose-slate mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-a:text-primary">
          <p>
            Esta Política explica como a <strong>Orienta</strong> (orientafinancas.com.br) trata
            os dados pessoais de quem usa o site, em conformidade com a Lei Geral de Proteção de
            Dados (Lei nº 13.709/2018 — LGPD). Ao usar nossas ferramentas, você declara que leu e
            entendeu este documento.
          </p>

          <h2>1. Quem somos</h2>
          <p>
            A Orienta é um projeto independente de educação financeira. <strong>Não somos órgão
            público</strong> e não temos qualquer vínculo com a Receita Federal, tribunais,
            cartórios, prefeituras ou outras instituições cujas informações públicas consultamos.
            Também não representamos bancos, corretoras ou imobiliárias.
          </p>

          <h2>2. Quais dados coletamos</h2>
          <h3>Calculadoras e conteúdo</h3>
          <p>
            As calculadoras do site rodam no seu navegador. Os valores digitados nelas não são
            enviados nem armazenados por nós.
          </p>
          <h3>Relatório de Avaliação de Riscos</h3>
          <p>Somente se você solicitar o relatório, coletamos:</p>
          <ul>
            <li>
              <strong>Seus dados</strong>: nome completo, CPF e e-mail — para identificar quem
              solicitou a consulta e enviar o relatório.
            </li>
            <li>
              <strong>Dados do proprietário/vendedor do imóvel</strong>: nome completo e CPF —
              necessários para pesquisar certidões e processos públicos em nome dele.
            </li>
            <li>
              <strong>Dados do imóvel</strong>: endereço, CEP e, se informado, índice cadastral
              (IPTU).
            </li>
          </ul>
          <p>
            <strong>Nunca pedimos senhas, dados de cartão, dados bancários, códigos de
            verificação ou acesso a contas gov.br.</strong> Se alguém pedir essas informações em
            nome da Orienta, não forneça.
          </p>
          <h3>Dados de navegação</h3>
          <p>
            Usamos o Google Analytics para medir, de forma agregada, quais páginas são visitadas,
            e o Cloudflare Turnstile para impedir uso automatizado (robôs) dos formulários. Essas
            ferramentas podem usar cookies e dados técnicos do dispositivo, conforme as políticas
            do Google e da Cloudflare.
          </p>

          <h2>3. Para que usamos os dados</h2>
          <ul>
            <li>Realizar as consultas a fontes públicas e gerar o relatório solicitado;</li>
            <li>Enviar o relatório e responder dúvidas sobre ele;</li>
            <li>Prevenir fraudes e abusos no uso da ferramenta;</li>
            <li>Melhorar o site, a partir de estatísticas de uso e avaliações opcionais.</li>
          </ul>
          <p>
            Não vendemos dados pessoais e não os usamos para publicidade de terceiros.
          </p>

          <h2>4. Base legal</h2>
          <p>
            Tratamos seus dados para executar o serviço que você pediu (art. 7º, V, da LGPD). Os
            dados do proprietário do imóvel são tratados com base no legítimo interesse do
            comprador em verificar riscos antes de uma negociação imobiliária (art. 7º, IX) e
            limitados a informações de acesso público. Ao solicitar o relatório, você declara que
            está de fato negociando o imóvel com essa pessoa.
          </p>

          <h2>5. Com quem compartilhamos</h2>
          <p>
            Os dados informados são usados apenas para consultar as fontes públicas necessárias
            (certidões, tribunais e cadastro municipal) e são processados em servidores
            contratados pela Orienta. O relatório é entregue somente a quem o solicitou e
            <strong> nada é informado ao proprietário consultado</strong>. Podemos compartilhar
            dados quando exigido por lei ou ordem judicial.
          </p>

          <h2>6. Por quanto tempo guardamos</h2>
          <p>
            Os dados das consultas e os relatórios gerados são mantidos apenas pelo tempo
            necessário para a entrega, suporte e cumprimento de obrigações legais, e depois são
            excluídos.
          </p>

          <h2>7. Seus direitos</h2>
          <p>
            Você pode, a qualquer momento, pedir acesso, correção, exclusão dos seus dados ou
            informações sobre o tratamento deles. O mesmo vale para quem foi consultado em um
            relatório.
          </p>

          <h2>8. Contato</h2>
          <p>Para exercer seus direitos ou tirar dúvidas sobre esta Política, fale com a gente:</p>
          <ul>
            <li>
              WhatsApp:{" "}
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
                +55 (31) 97177-8537
              </a>
            </li>
            <li>
              Instagram:{" "}
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                @orienta.vc
              </a>
            </li>
          </ul>

          <div className="not-prose mt-10 rounded-lg border border-primary/30 bg-primary/10 p-6 text-sm text-foreground">
            Podemos atualizar esta Política para refletir mudanças no site ou na legislação. A
            data da última atualização fica sempre no topo da página. Voltar para a{" "}
            <Link to="/" className="font-semibold text-primary underline underline-offset-2">
              página inicial
            </Link>
            .
          </div>
        </div>
      </section>
    </Layout>
  );
}
