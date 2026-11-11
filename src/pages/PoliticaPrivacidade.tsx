import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { EMPRESA, WHATSAPP_URL, EMAIL_URL } from "@/lib/empresa";

const ATUALIZADO_EM = "11 de novembro de 2026";

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
            Esta Política explica como a <strong>Orienta</strong> ({EMPRESA.dominios.join(" e ")}) trata
            os dados pessoais de quem usa o site, em conformidade com a Lei Geral de Proteção de
            Dados (Lei nº 13.709/2018 — LGPD). Ao usar nossas ferramentas, você declara que leu e
            entendeu este documento.
          </p>

          <h2>1. Quem somos</h2>
          <p>
            A Orienta é um serviço privado e independente de educação financeira, com atuação
            em {EMPRESA.cidade}, controladora dos dados pessoais tratados neste site. Nossos
            domínios oficiais são{" "}
            {EMPRESA.dominios.join(" e ")}. <strong>Não somos órgão
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
          <p>
            <strong>Nunca pedimos senhas, dados de cartão, dados bancários, códigos de
            verificação ou acesso a contas gov.br.</strong> Se alguém pedir essas informações em
            nome da Orienta, não forneça.
          </p>
          <h3>Diagnóstico financeiro</h3>
          <p>
            Ao responder o diagnóstico financeiro, você informa seu <strong>nome, e-mail, faixa
            etária, tipo de trabalho</strong> e dados financeiros como renda, gastos mensais,
            valores que guarda ou investe e expectativas de aposentadoria. Esses dados são
            enviados e armazenados por nós quando você pede para ver o resultado, em uma
            ferramenta do Google (Google Forms e Planilhas). Você só informa o que quiser, e
            não precisa de dados de contas bancárias para usar a ferramenta.
          </p>
          <h3>Dados de navegação e cookies</h3>
          <p>
            Usamos o Google Analytics para medir, de forma agregada, quais páginas são visitadas,
            e o Cloudflare Turnstile para impedir uso automatizado (robôs) dos formulários. Essas
            ferramentas podem usar cookies e dados técnicos do dispositivo, conforme as políticas
            do Google e da Cloudflare.
          </p>
          <p>
            Com a sua permissão, usamos também o <strong>Pixel da Meta</strong> (Facebook e
            Instagram). Ele registra, por meio de cookies e identificadores do navegador, dados
            como as páginas que você visita, o dispositivo e o navegador usados, o endereço IP e
            ações no site, por exemplo cliques no botão de iniciar o diagnóstico. Esses dados
            são enviados à Meta e usados para medir os resultados dos nossos anúncios, otimizá-los
            e mostrar anúncios a pessoas com perfil semelhante. O Pixel <strong>só é carregado
            depois que você clica em &quot;Aceitar&quot;</strong> no aviso de cookies. A Meta atua
            como controladora própria desses dados, segundo a política de privacidade dela.
          </p>
          <p>
            Você pode mudar sua escolha quando quiser, em &quot;Preferências de cookies&quot;, no
            rodapé do site. Também pode limpar os cookies pelo navegador ou ajustar suas
            preferências de anúncios nas configurações da sua conta no Facebook e no Instagram.
          </p>

          <h2>3. Para que usamos os dados</h2>
          <ul>
            <li>Gerar o resultado do seu diagnóstico financeiro;</li>
            <li>Entender como o diagnóstico é usado e melhorá-lo;</li>
            <li>Medir o uso do site e melhorá-lo a partir de estatísticas agregadas;</li>
            <li>Medir e otimizar nossos próprios anúncios, se você aceitar o Pixel da Meta;</li>
            <li>Prevenir fraudes e abusos no uso dos formulários.</li>
          </ul>
          <p>
            Não vendemos dados pessoais. Os dados enviados à Meta são usados apenas para os
            anúncios da própria Orienta.
          </p>

          <h2>4. Base legal</h2>
          <p>
            Tratamos os dados do diagnóstico financeiro e os dados coletados pelo Pixel da Meta
            com base no seu <strong>consentimento</strong> (art. 7º, I, da LGPD), que você pode
            retirar a qualquer momento. Tratamos os dados de navegação agregados e os de
            segurança com base no nosso legítimo interesse em entender o uso do site e em
            protegê-lo contra fraudes e abusos (art. 7º, IX).
          </p>

          <h2>5. Com quem compartilhamos</h2>
          <p>
            Os dados são processados pelos prestadores de serviço que utilizamos: Google
            (Analytics, Forms e Planilhas), Cloudflare e, se você aceitar, Meta (Pixel).
            Alguns desses prestadores armazenam dados em servidores fora do Brasil, como nos
            Estados Unidos. Nesses casos, a transferência ocorre conforme a LGPD. Podemos
            compartilhar dados quando exigido por lei ou ordem judicial.
          </p>

          <h2>6. Por quanto tempo guardamos</h2>
          <p>
            Os dados de navegação são mantidos pelo período padrão de retenção das ferramentas
            utilizadas (Google Analytics, Cloudflare e Meta). Os dados do diagnóstico financeiro
            ficam guardados pelo tempo necessário às finalidades descritas nesta Política, ou
            até você pedir a exclusão.
          </p>

          <h2>7. Seus direitos</h2>
          <p>
            Você pode, a qualquer momento, pedir confirmação de que tratamos seus dados, acesso,
            correção, exclusão, portabilidade ou informações sobre o tratamento deles, e também
            retirar o consentimento dado. Para parar o uso do Pixel da Meta, use &quot;Preferências
            de cookies&quot; no rodapé do site.
          </p>

          <h2>8. Contato</h2>
          <p>Para exercer seus direitos ou tirar dúvidas sobre esta Política, fale com a gente:</p>
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
            <li>
              Instagram:{" "}
              <a href={EMPRESA.instagramUrl} target="_blank" rel="noopener noreferrer">
                {EMPRESA.instagram}
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
