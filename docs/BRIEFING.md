# Mineradora Berté — Briefing do site

Status: **Etapa 01** (base do projeto + Home). Ambiente de desenvolvimento, sem domínio, `noindex`.

---

## 1. Dados confirmados

| Item | Valor | Onde está no código |
| --- | --- | --- |
| Nome | Mineradora Berté | `src/content/company.ts` |
| Localização | 42M9+Q5 — Ponte Serrada, SC · CEP 89683-000 | `company.address` |
| Telefone | (49) 98409-3337 | `company.phone` |
| Comercialização | Por tonelada e por metro cúbico (m³) | `company.salesUnits` |
| Fornecimento | Entrega e retirada pelo cliente | `company.supplyModes` |
| Produtos (10) | Brita 1, Pedrisco, Areia industrial, Areia natural, Pó de brita, Brita 2, Bica corrida, Rachãozinho primário, Rachão mina, Rachão mataco | `src/content/products.ts` |
| Diferenciais | Alta qualidade do basalto, flexibilidade no fornecimento, granulometria padronizada, controle tecnológico, frota própria, agilidade e flexibilidade logística | `differentials` |
| Frota | Caminhões truck, caminhões 6x4, bitruck, carretas | `fleet` |
| Cidades | Ponte Serrada, Vargeão, Passos Maia, Abelardo Luz, Faxinal dos Guedes, Xanxerê, Irani, Vargem Bonita, Catanduvas, Lindóia* | `cities` |
| Logo | `public/images/brand/logo-original.png` (PNG 1254×1254) | — |

\* ver pendências.

## 2. Dados pendentes

- [ ] **WhatsApp** — validar se (49) 98409-3337 atende WhatsApp. Até lá, `company.whatsapp = null` e nenhum link de WhatsApp é exibido.
- [ ] **Lindóia** — confirmar se é **Lindóia do Sul**. Está marcada `confirmed: false` e fica fora do JSON-LD `areaServed`.
- [ ] **Canal do formulário de cotação** — e-mail, CRM ou serviço de envio. Até lá, `company.quoteEndpoint = null` e a página de contato mostra o roteiro do pedido, sem formulário enviável.
- [ ] **Domínio oficial** — necessário para canonicals, sitemap e indexação.
- [ ] **Logo em vetor (SVG/AI/PDF)** — os recortes atuais vêm de um PNG. Um vetor melhora a nitidez e permite versões oficiais (horizontal, negativa, monocromática).
- [ ] **Fotografias reais** — ver seção 6.
- [ ] **Por produto**: descrição, especificações técnicas confirmadas, aplicações confirmadas e foto.
- [ ] **Validação das categorias** — o catálogo foi agrupado pela família do nome (Britas e derivados, Areias, Rachões), sem presumir granulometria. Confirmar com a empresa.
- [ ] **Documentos técnicos** (fichas, ensaios), se a empresa quiser publicá-los — entram em `technicalDocuments`.
- [ ] **Página Sobre** — história, trajetória e equipe (nada foi inventado).
- [ ] **Redes sociais** — somente links oficiais (`company.social`).
- [ ] **Horário de atendimento** — não informado; fora do site e do schema.
- [ ] **Revisão jurídica** da Política de Privacidade.

## 3. Decisões de design

- **Paleta ajustada à logo original.** Azul `#29375F` e cinza `#5B626D` foram amostrados da logo e substituem `#172B57`/`#565D67` como tokens `navy` e `basalt`. Mantidos: grafite `#151A22`, off-white `#F4F3EF`, areia `#C2B29B`. Adicionados `navy-deep` `#1B2541` (seções escuras) e `sand-deep` `#8A7A62` (detalhes sobre fundo claro). Tokens em `src/app/globals.css`.
- **Logo**: lockup horizontal no header (símbolo + wordmark), montado a partir de recortes transparentes do PNG original — sem redesenhar. Versão clara (`-light`) para fundos escuros. Ícones (`src/app/icon.png`, `apple-icon.png`) gerados do símbolo.
- **Tipografia**: Archivo (títulos, peso 700, tracking negativo) e Plus Jakarta Sans (textos), via `next/font`.
- **Linguagem visual**: industrial e editorial — grid de 12 colunas, divisórias finas em vez de cards, numeração de seções (01–06), botões retos (raio de 2px), sem sombras nem gradientes decorativos.
- **Alternância de fundos** para dar ritmo: claro → azul → claro → grafite → pedra → claro → azul (CTA) → grafite (rodapé).
- **Áreas de foto reservadas**: textura técnica discreta, marcas de corte e o símbolo da marca em baixíssima opacidade, com a legenda "Fotografia real…". Em desenvolvimento, mostram também o caminho do arquivo esperado. Nenhuma imagem de terceiros.
- **Movimento**: entrada suave do hero (CSS), sublinhados e realces no hover, `prefers-reduced-motion` respeitado. Sem parallax nem JavaScript de animação.
- **Conversão**: telefone clicável no header (desktop e mobile), no hero, nas seções de qualidade, no CTA final, no rodapé e em cada produto. "Solicitar orçamento" leva para `/contato`.
- **Formulário**: não há formulário enviável enquanto não houver canal de recebimento. Os campos pedidos estão em `src/content/quote.ts` e hoje aparecem como roteiro do que informar ao ligar.

## 4. Estrutura de páginas

| Rota | Conteúdo | Status |
| --- | --- | --- |
| `/` | Hero, Diferenciais, Produtos, Estrutura e Logística, Qualidade, Regiões, FAQ, CTA final | Completa (aguarda fotos) |
| `/produtos` | Catálogo por categoria | Básica |
| `/produtos/[slug]` | 10 páginas estáticas; ficha com comercialização e fornecimento; especificações e aplicações aparecem quando forem cadastradas | Básica |
| `/estrutura-e-logistica` | Frota e modalidades de fornecimento | Básica |
| `/sobre` | Apresentação com dados confirmados + diferenciais | Básica |
| `/regioes-atendidas` | Base de operação + cidades | Básica |
| `/contato` | Telefone, localização, Google Maps, roteiro do pedido | Básica |
| `/politica-de-privacidade` | Texto base (LGPD) | Revisar |

Slugs: `brita-1`, `pedrisco`, `areia-industrial`, `areia-natural`, `po-de-brita`, `brita-2`, `bica-corrida`, `rachaozinho-primario`, `rachao-mina`, `rachao-mataco`.

### SEO técnico

- Metadata API com title/description por página; template `%s | Mineradora Berté`.
- `NEXT_PUBLIC_SITE_URL` (ver `.env.example`) ativa `metadataBase`, canonicals, URLs no Open Graph, `@id`/`url` no schema e o sitemap.
- `NEXT_PUBLIC_SITE_INDEXABLE=true` (com domínio) libera a indexação. Sem isso: `<meta name="robots" content="noindex, nofollow">` e `robots.txt` com `Disallow: /`.
- JSON-LD: `LocalBusiness` (nome, telefone, cidade, UF, CEP, país, link do mapa, cidades confirmadas — sem rua, coordenadas ou horário), `FAQPage` na Home e `BreadcrumbList` nas páginas internas (quando há domínio).
- O schema `Product` não foi usado: sem preço/oferta, ele geraria avisos no Search Console.

## 5. Pendências para lançamento

1. Fotos reais em `public/images/*` e preencher `src` em `src/content/media.ts` e `src/content/products.ts`.
2. Confirmar WhatsApp → se confirmado, adicionar botão de WhatsApp.
3. Definir o canal do formulário → implementar envio real (Server Action + serviço de e-mail/CRM) e trocar o roteiro pelo formulário.
4. Confirmar Lindóia / Lindóia do Sul.
5. Logo em vetor.
6. Textos e especificações por produto.
7. Imagem de Open Graph (1200×630) com foto real ou com a marca.
8. Configurar domínio na Vercel, `NEXT_PUBLIC_SITE_URL` e, no lançamento, `NEXT_PUBLIC_SITE_INDEXABLE=true`.
9. Google Search Console + envio do sitemap; perfil da empresa no Google com o mesmo NAP (nome, endereço, telefone).
10. Tag do Google Ads / GA4 com acompanhamento de cliques em `tel:` como conversão (exige atualizar a Política de Privacidade).
11. Revisão jurídica da Política de Privacidade.

## 6. Fotografias — como entregar

Pastas em `public/images/`:

| Pasta | Uso | Sugestão |
| --- | --- | --- |
| `hero/` | `hero-desktop.jpg` (paisagem, ≥ 2400 px de largura) e `hero-mobile.jpg` (retrato 4:5, ≥ 1080 px) | Vista ampla da mineradora |
| `products/` | `<slug>.jpg`, ex.: `brita-1.jpg` (4:3, ≥ 1600 px) | Close do material, luz natural, mesmo enquadramento para todos |
| `fleet/` | `frota-principal.jpg` (≥ 2000 px) | Caminhões da frota |
| `operations/` | `producao.jpg` | Britagem, pilhas de material, operação |
| `institutional/` | `instalacoes.jpg` | Instalações, escritório, equipe |
| `brand/` | Logo e variações | Preferencialmente em SVG |

Depois de salvar o arquivo, basta preencher `src` com o caminho (ex.: `"/images/hero/hero-desktop.jpg"`). Enquanto `src` for `null`, a área reservada continua aparecendo.
