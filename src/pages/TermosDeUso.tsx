import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { EMPRESA, WHATSAPP_URL, EMAIL_URL } from "@/lib/empresa";

const ATUALIZADO_EM = "1º de outubro de 2026";

export default function TermosDeUso() {
  useDocumentMeta(
    "Termos de Uso | Orienta",
    "Condições de uso do site da Orienta e das calculadoras financeiras.",
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
            {EMPRESA.dominios.join(" e ")}), com atuação em {EMPRESA.cidade}. Ao usar o site,
            você concorda com eles.
          </p>

          <h2>1. O que oferecemos</h2>
          <ul>
            <li>
              <strong>Conteúdo e calculadoras</strong>: material educativo e simulações
              gratuitas. Os resultados são estimativas e não constituem recomendação de
              investimento, consultoria jurídica ou contábil.
            </li>
          </ul>

          <h2>2. Serviço privado e independente</h2>
          <p>
            A {EMPRESA.marca} <strong>não é órgão público</strong> e não tem vínculo, parceria ou
            representação com Receita Federal, tribunais, cartórios, prefeituras ou outras
            instituições. Os nomes desses órgãos aparecem apenas para indicar a fonte das
            informações públicas eventualmente mencionadas em nosso conteúdo. Também não somos
            parceiros oficiais de bancos, corretoras, seguradoras, imobiliárias ou veículos de
            imprensa.
          </p>

          <h2>3. O que nunca pedimos</h2>
          <p>
            Nunca pedimos senhas, dados de cartão, dados bancários, códigos de verificação ou
            acesso à sua conta gov.br. Se alguém pedir essas informações em nome da{" "}
            {EMPRESA.marca}, não forneça e nos avise.
          </p>

          <h2>4. Privacidade</h2>
          <p>
            O tratamento de dados pessoais segue a nossa{" "}
            <Link to="/politica-de-privacidade">Política de Privacidade</Link>.
          </p>

          <h2>5. Propriedade intelectual</h2>
          <p>
            Textos, marca, layout e ferramentas do site pertencem à {EMPRESA.marca}. Você pode
            compartilhar links e citar trechos com indicação da fonte.
          </p>

          <h2>6. Alterações</h2>
          <p>
            Podemos atualizar estes Termos. A data da última atualização fica sempre no topo da
            página.
          </p>

          <h2>7. Contato</h2>
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
          </ul>
        </div>
      </section>
    </Layout>
  );
}
