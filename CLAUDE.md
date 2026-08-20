# Orienta — Guia de Design e Metodologia do Site

Site institucional/educacional de finanças pessoais ("Orienta" / "Orienta+"), com calculadoras
financeiras, conteúdo educativo e páginas de produto (seguros, investimentos, planejamento).
Tagline: *"Dê rumo à sua vida financeira."* Tom de voz: profissional mas acessível, direto,
fala com o leitor na 2ª pessoa ("você"), ocasionalmente usa emojis em títulos de calculadoras
(ex.: "💰💰💰"). Público-alvo: pessoas comuns buscando educação financeira, não especialistas.

Este arquivo existe para que qualquer sessão futura do Claude Code replique fielmente o estilo
visual e os padrões de código já estabelecidos, em vez de reinventar convenções novas.

## Stack técnica

- **Build**: Vite 5 + `@vitejs/plugin-react-swc`, TypeScript 5, deploy estático via `gh-pages`
  para domínio próprio (`CNAME` → orientafinancas.com.br), hospedado no GitHub Pages.
- **Roteamento**: `react-router-dom` v6 com `HashRouter` (necessário para GitHub Pages sem
  configuração de servidor). Rotas centralizadas em `src/App.tsx`.
- **UI Kit**: shadcn/ui (`components.json`, style "default", baseColor "slate", cssVariables
  true) sobre Radix UI + `class-variance-authority` + `tailwind-merge`. Componentes prontos em
  `src/components/ui/*` — **sempre reaproveitar esses componentes em vez de recriar** (Button,
  Card, Dialog, Accordion, Tabs, Select, Toast/Sonner, etc.).
- **Estilo**: Tailwind CSS 3 + `tailwindcss-animate` + `@tailwindcss/typography` (usado via
  classes `prose` em blocos de conteúdo/artigo).
- **Ícones**: `lucide-react` exclusivamente.
- **Formulários**: `react-hook-form` + `@hookform/resolvers` + `zod` (disponível, ainda que
  as calculadoras atuais usem `useState` simples em vez de RHF).
- **Dados/gráficos**: `@tanstack/react-query` (provider já configurado em `App.tsx`), `recharts`
  para gráficos.
- **Outros**: `date-fns`, `sonner` (toasts), `embla-carousel-react`, `react-markdown` +
  `rehype-sanitize` (conteúdo de artigos vindo de markdown, ver `src/lib/content-parser.ts`).
- **Alias de import**: `@/` aponta para `src/` (configurado em `tsconfig` e `components.json`).
  Sempre importar com `@/components/...`, `@/lib/...`, `@/hooks/...`.

## Estrutura de pastas

```
src/
  components/
    ui/        → primitives shadcn (não editar estilo à mão, só compor)
    layout/    → Header, Footer, Layout, ToolPageLayout, CalculadoraSidebar, CalculadoraTextBlock
    home/      → seções específicas da home (Hero, Calculadoras, SeusPrimeiros)
  pages/       → uma pasta por área temática: planejamento/, investimentos/, seguros/,
                 impostos/, orienta-plus/ — cada página é o componente roteado em App.tsx
  tools/       → calculadoras "standalone" mais elaboradas (ex.: CalculadoraMilhao.tsx)
  hooks/       → hooks utilitários (use-mobile, use-toast)
  lib/         → utils.ts (função cn), content-parser.ts, useContentFolder.ts
```

Convenção de nomes: componentes em PascalCase, um componente por arquivo, nome do arquivo =
nome do componente exportado. Páginas ficam em `src/pages/<area>/<Nome>.tsx` e são registradas
como `<Route>` em `src/App.tsx` com paths como `/planejamento/calculadoras/aposentadoria`,
`/investimentos/renda-fixa/comparador` — sempre em português, kebab-case, agrupadas por área
temática (`planejamento`, `investimentos`, `seguros`, `impostos`, `orienta-plus`).

## Sistema de design (tokens)

Definido em `src/index.css` como variáveis CSS HSL (consumidas pelo `tailwind.config.ts`).
**Toda nova cor deve ser HSL e, preferencialmente, adicionada como variável, não hardcoded.**

- `--primary`: `150 72% 40%` → verde principal da marca (≈ `#1daf66` / `#1AAF66`)
- `--secondary`: `25 95% 55%` → laranja de destaque (≈ `#f59e0b` / `#FFA726`)
- `--background`: `180 20% 98%` (quase branco, leve tom verde-água)
- `--background-dark`: `196 34% 15%` → navy escuro (≈ `#1A2E35`), usado em seções "hero" de
  destaque/dark
- `--foreground`: `180 10% 15%`
- `--muted` / `--muted-foreground`: verde acinzentado claro / médio
- `--radius`: `0.75rem` (usado como `rounded-lg`; `md`/`sm` derivam subtraindo 2px/4px)
- Existe um bloco `.dark { ... }` no CSS mas os valores não fazem sentido visual (parecem
  gerados automaticamente e nunca usados/testados) — **na prática o site é somente light mode**,
  não ativar dark mode sem antes revisar/corrigir essas variáveis.
- Sombras (`--shadow-*`), `--chart-1..5` (para gráficos recharts) também definidas em
  `index.css`.

### Tipografia

Três famílias carregadas via Google Fonts nos `@import` do topo de `index.css`:
- **Sans (padrão)**: `Work Sans` — usada em praticamente tudo, inclusive títulos.
- **Serif**: `Lora` (disponível, pouco usada na prática).
- **Mono**: `Inconsolata`.

Pesos usados nos textos hero/marketing: `font-black`/`font-weight: 900` para H1/H2 grandes,
`font-bold`/`800` para subtítulos de card, `font-semibold`/`600-700` para labels. Tracking
apertado em headings grandes: `tracking-tight` / `letterSpacing: "-0.02em"`.

## Dois padrões de estilo convivendo no código

O site mistura **dois métodos de estilização** — é importante saber qual usar em cada contexto:

1. **Tailwind + tokens shadcn** (Header, Footer, Layout, componentes `ui/`, páginas mais
   "utilitárias"): classes utilitárias, cores via `bg-primary`, `text-muted-foreground`,
   `border-border` etc., composição com o helper `cn()` de `@/lib/utils`
   (`clsx` + `tailwind-merge`). Use este padrão para navegação, layout estrutural, formulários
   simples, qualquer componente que deva herdar tema automaticamente.

2. **CSS-in-JS "manual" com classes `vt-*` / inline styles** (seções de marketing da Home —
   `Hero.tsx`, `Calculadoras.tsx`, `SeusPrimeiros.tsx` — e as calculadoras em `src/tools/*`):
   um bloco `<style>{\`...\`}</style>` escopado no topo do componente, com classes prefixadas
   `vt-` (ex.: `.vt-hero`, `.vt-card`, `.vt-input`, `.vt-btn`), cores em hex/rgba **hardcoded**
   (não usa as variáveis CSS), fontFamily `'Work Sans', sans-serif` repetido literalmente, e
   handlers `onMouseEnter`/`onMouseLeave` manipulando `style` diretamente para hover (em vez de
   `:hover` no CSS ou classes Tailwind). Paleta recorrente nesse padrão:
   - `#1A2E35` (fundo escuro / "vt-darker")
   - `#1daf66` (verde de ação / "vt-dark")
   - `#FFA726` / `#e8a020` (dourado/laranja de destaque, usado em campos "meta"/"objetivo")
   - `#FFFDF5` (creme claro / "vt-light")
   - `#607060`, `#8aab96`, `#a3b8ac` (textos secundários em variações de verde acinzentado)
   - `#e2e8e2` (bordas), fundo de seção `#f8faf8`
   - Sombra padrão de card: `0 1px 3px rgba(26,69,55,0.06)`; hover eleva com
     `translateY(-2px)` + sombra colorida `${cor}22`.

   **Use este padrão ao criar novas seções de marketing/landing ou novas calculadoras**, para
   manter consistência visual com o que já existe — não convertir para Tailwind puro, pois
   quebraria a identidade visual da seção. Ao criar uma nova calculadora, siga a estrutura do
   `CalculadoraMilhao.tsx` (ver abaixo).

## Padrão de página de calculadora (`src/tools/*`, usado por `src/pages/planejamento/*`)

Estrutura consistente observada em todas as calculadoras:

1. Bloco `<style>` escopado com classes `vt-*` (ver paleta acima).
2. `<section className="vt-hero">` escuro (`--vt-darker`) com breadcrumb (`Home / Ferramentas /
   Nome`), `<h1>` com parte do texto em `<span>` colorido, parágrafo de contexto, e um SVG
   "blob" decorativo (`viewBox 0 0 200 200`, `fill="#abccb5"`, `opacity: 0.06`) posicionado
   `absolute` no canto.
3. `<main className="vt-main">` em grid: coluna principal (formulário + resultados) + sidebar
   fixa (`<CalculadoraSidebar>` de `@/components/layout`, com `promo` em destaque + lista de
   `resources` relacionados).
4. Formulário: inputs com prefixo/sufixo (`R$`, `%`) via `.vt-input-wrap` +
   `.vt-prefix`/`.vt-suffix`, máscara de moeda BRL feita manualmente:
   ```ts
   const parseBRL = (v: string) => parseFloat(v.replace(/\./g, "").replace(",", ".")) || 0;
   const formatBRL = (n: number) => n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
   const maskBRL = (raw: string) => { /* formata dígitos como moeda enquanto digita */ };
   ```
5. Botão de calcular (`.vt-btn`) full-width, ícone seta que desliza no hover
   (`transform: translateX(4px)` no `:hover svg`).
6. Cards de resultado (`.vt-results-grid`) com animação de entrada: `opacity`/`translateY`
   controlados por state (`resultsVisible`) com `transitionDelay` escalonado por card, e um
   `result-card--highlight` com gradiente escuro para o resultado principal.
7. Frase de conclusão (`.vt-conclusion`) com `<strong>` destacando os números do resultado.
8. No mobile, scroll automático até os resultados após calcular
   (`resultsRef.current?.scrollIntoView(...)`, só se `window.innerWidth < 768`).
9. Ao final, `<CalculadoraTextBlock>` (de `@/components/layout`) com conteúdo educativo/SEO em
   Tailwind `prose` (`prose-headings:text-foreground prose-p:text-muted-foreground` etc.) —
   texto explicativo sobre o tema da calculadora, terminando num box de resumo
   `bg-primary/10 border border-primary/30 rounded-lg p-6`.

Toda página de calculadora é envolvida por `<ToolPageLayout>` (que aplica `<Layout>` = Header +
Footer + `<Suspense>`).

## Padrão de seções de marketing da Home

`Hero.tsx`, `Calculadoras.tsx`, `SeusPrimeiros.tsx`: seções full-width com `maxWidth: "80rem"`
centralizado, padding vertical generoso (`5rem 1.5rem`), heading com `clamp()` para tamanho
responsivo (ex.: `clamp(1.75rem, 4vw, 2.75rem)`), subtítulo curto em cinza-esverdeado, e um grid
de cards `repeat(auto-fill, minmax(XXXpx, 1fr))`. Cards têm ícone colorido em box arredondado
(`lucide-react`, cor de destaque própria por item — ex.: verde para aposentadoria, azul para
metas, dourado para o milhão, roxo para comparador), título bold, descrição curta, e um CTA
"Acessar →" na cor do card. Hover eleva o card e colore a borda/sombra na cor do item.

## Header / navegação

`Header.tsx` usa Tailwind puro + tokens (`bg-primary`, `border-border` etc.) + `cn()`.
Padrões a manter:
- Sticky no topo, some ao rolar para baixo e reaparece ao rolar para cima
  (`headerVisible` + listener de `scroll`, threshold de 5px de delta).
- Item de destaque "Seus Primeiros" como botão pill (`rounded-full bg-primary`), diferente dos
  demais itens do menu que são links com `border-b-2` ativo.
- Dropdowns fecham ao clicar fora (`useRef` + listener `mousedown`) e ao trocar de rota.
- Menu mobile bloqueia scroll do body (`position: fixed` + restaura `scrollY` ao fechar).
- Estrutura de navegação por área: **Seus Primeiros** (Imóveis "em breve", Seguros,
  Investimentos, Planejamento) · **Ferramentas** (lista de calculadoras) · **Artigos** · **Sobre**
  (link externo para Instagram).

## Footer

Grid de 5 colunas (`lg:grid-cols-5`): logo + descrição + Instagram (2 colunas), depois colunas
de links por área temática (Planejamento, Investimentos, ...), barra final com copyright
centralizado. Tudo em Tailwind + tokens, sem `vt-*`.

## SEO / meta

`index.html` define `<title>`, `<meta name="description">`, Open Graph (`og:title`,
`og:description`, `og:image`) e Twitter Card. Ao criar novas páginas, se precisar de
título/descrição por rota, seguir o padrão de meta tags já existente (atualmente não há biblioteca
tipo `react-helmet` — títulos por página são setados ad-hoc via `<title>` dentro do JSX de
alguns componentes, o que é um ponto a padronizar/melhorar caso peçam SEO por rota).

## Convenções de código

- TypeScript em todo o `src/`, `strict` habilitado via `tsconfig`.
- ESLint flat config (`eslint.config.js`) com `typescript-eslint`, `eslint-plugin-react-hooks`,
  `eslint-plugin-react-refresh`.
- Sempre usar o alias `@/...` em vez de caminhos relativos longos.
- Reaproveitar `cn()` (`@/lib/utils`) para combinar classes condicionais, em vez de template
  strings manuais, em componentes Tailwind.
- Ícones sempre de `lucide-react`, nunca SVGs custom exceto os decorativos (blobs) já usados no
  padrão `vt-*`.
- Textos e rótulos de UI em **português do Brasil**, moeda formatada como `R$` com
  `toLocaleString("pt-BR")`.
