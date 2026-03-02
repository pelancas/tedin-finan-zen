import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Play, BookOpen, GraduationCap } from "lucide-react";

const videos = [
  {
    title: "O que são Fundos de Investimento?",
    description: "Entenda de forma simples como funcionam os fundos de investimento, seus tipos e como escolher o melhor para o seu perfil.",
    url: "https://www.youtube.com/watch?v=8QnAr1sF4Sg",
    thumbnail: "https://img.youtube.com/vi/8QnAr1sF4Sg/hqdefault.jpg",
  },
  {
    title: "Fundos de Investimento na Prática",
    description: "Aprenda na prática como investir em fundos, analisar taxas e comparar rentabilidades para tomar melhores decisões.",
    url: "https://www.youtube.com/watch?v=YHnaVTXMI_I",
    thumbnail: "https://img.youtube.com/vi/YHnaVTXMI_I/hqdefault.jpg",
  },
];

const links = [
  {
    title: "Comparador de Fundos – Mais Retorno",
    description: "Compare fundos de investimento lado a lado: rentabilidade, taxas, risco e muito mais. Ferramenta essencial para escolher os melhores fundos.",
    url: "https://maisretorno.com/comparacao-fundos",
    tag: "Comparador",
  },
  {
    title: "Guia Completo de Fundos – InfoMoney",
    description: "Guia detalhado sobre fundos de investimento: o que são, como funcionam, tipos disponíveis e como começar a investir.",
    url: "https://www.infomoney.com.br/guias/fundos-de-investimento/",
    tag: "Guia",
  },
];

const cursos = [
  {
    title: "Curso de Fundos de Investimento – ANBIMA",
    description: "Curso gratuito da ANBIMA sobre fundos de investimento. Ideal para quem quer se aprofundar no tema com conteúdo de qualidade e certificação reconhecida pelo mercado.",
    url: "https://www.anbima.com.br/email/Paginas/carreiras/curso-fundos/",
    tag: "Gratuito",
  },
];

const Fundos = () => {
  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container max-w-5xl">
          {/* Hero */}
          <div className="mb-12 text-center">
            <Badge variant="secondary" className="mb-4">Investimentos</Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Fundos de Investimento</h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Fundos de investimento são uma forma coletiva de aplicar dinheiro. Ao investir em um fundo, você compra cotas e um gestor profissional cuida de aplicar os recursos em diferentes ativos — como ações, títulos públicos, câmbio e mais — de acordo com a estratégia do fundo. É uma ótima opção para quem busca diversificação e gestão profissional sem precisar acompanhar o mercado diariamente.
            </p>
          </div>

          {/* Resumo */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-xl">Como funcionam?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>Os fundos são classificados em categorias como <strong className="text-foreground">Renda Fixa</strong>, <strong className="text-foreground">Multimercado</strong>, <strong className="text-foreground">Ações</strong> e <strong className="text-foreground">Cambial</strong>, entre outros. Cada um tem um nível de risco e estratégia diferentes.</p>
              <p>Ao investir, você paga uma <strong className="text-foreground">taxa de administração</strong> (e às vezes uma <strong className="text-foreground">taxa de performance</strong>) ao gestor. É importante comparar essas taxas entre fundos semelhantes.</p>
              <p>A rentabilidade passada não garante ganhos futuros, mas analisar o histórico do fundo e do gestor ajuda na tomada de decisão.</p>
            </CardContent>
          </Card>

          {/* Vídeos */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Play className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Vídeos</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {videos.map((video) => (
                <a key={video.url} href={video.url} target="_blank" rel="noopener noreferrer" className="group">
                  <Card className="overflow-hidden transition-shadow hover:shadow-md h-full">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{video.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{video.description}</p>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Conteúdos Relevantes</h2>
            </div>
            <div className="grid gap-4">
              {links.map((link) => (
                <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="group">
                  <Card className="transition-shadow hover:shadow-md">
                    <CardHeader className="flex-row items-start gap-4 space-y-0">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <CardTitle className="text-base">{link.title}</CardTitle>
                          <Badge variant="outline" className="text-xs">{link.tag}</Badge>
                        </div>
                        <CardDescription>{link.description}</CardDescription>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground mt-1 shrink-0 group-hover:text-primary transition-colors" />
                    </CardHeader>
                  </Card>
                </a>
              ))}
            </div>
          </div>

          {/* Cursos */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Cursos</h2>
            </div>
            <div className="grid gap-4">
              {cursos.map((curso) => (
                <a key={curso.url} href={curso.url} target="_blank" rel="noopener noreferrer" className="group">
                  <Card className="transition-shadow hover:shadow-md">
                    <CardHeader className="flex-row items-start gap-4 space-y-0">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <CardTitle className="text-base">{curso.title}</CardTitle>
                          <Badge className="text-xs">{curso.tag}</Badge>
                        </div>
                        <CardDescription>{curso.description}</CardDescription>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground mt-1 shrink-0 group-hover:text-primary transition-colors" />
                    </CardHeader>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Fundos;
