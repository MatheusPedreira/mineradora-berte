# Mineradora Berté — Briefing do site

Status: **Etapa 01** (base do projeto + Home). Ambiente de desenvolvimento, sem domínio, `noindex`.

---

## 1. Dados confirmados

| Item | Valor | Onde está no código |
| --- | --- | --- |
| Nome | Mineradora Berté | `src/content/company.ts` |
| Localização | 42M9+Q5 — Ponte Serrada, SC · CEP 89683-000 | `company.address` |
| Telefone | (49) 98409-3337 (principal) | `company.phone` |
| Telefone 2 | (49) 99180-1200 — exibido no rodapé e em /contato | `company.phoneSecondary` |
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
- [x] **Fotografias reais (lote 1)** — 6 fotos e 2 vídeos enviados pela empresa e confirmados como originais (15/10/2026). Ver seção 7.
- [ ] **Fotos da frota de entrega** (truck, 6x4, bitruck, carretas) e **fotos de cada produto** — ainda não recebidas.
- [ ] **Por produto**: descrição, especificações técnicas confirmadas, aplicações confirmadas e foto.
- [ ] **Validação das categorias** — o catálogo foi agrupado pela família do nome (Britas e derivados, Areias, Rachões), sem presumir granulometria. Confirmar com a empresa.
- [ ] **Documentos técnicos** (fichas, ensaios), se a empresa quiser publicá-los — entram em `technicalDocuments`.
- [ ] **Página Sobre** — história, trajetória e equipe (nada foi inventado).
- [ ] **Redes sociais** — somente links oficiais (`company.social`).
- [ ] **Horário de atendimento** — não informado; fora do site e do schema.
- [ ] **Revisão jurídica** da Política de Privacidade.

## 3. Decisões de design

- **Paleta ajustada à logo original.** Azul `#29375F` e cinza `#5B626D` foram amostrados da logo e substituem `#172B57`/`#565D67` como tokens `navy` e `basalt`. Mantidos: grafite `#151A22`, off-white `#F4F3EF`, areia `#C2B29B`. Adicionados `navy-deep` `#1B2541` (seções escuras) e `sand-deep` `#736550` (detalhes sobre fundo claro; escurecido de `#8A7A62` em 15/10/2026 para atingir contraste AA). Tokens em `src/app/globals.css`.
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

## 7. Mídia recebida — lote 1 (15/10/2026)

Originais (nomes do SaveClip) ficam em `public/images/` ignorados pelo Git e em `/Users/matheus/berte-midia-original/`. No site entram cópias renomeadas, sem metadados EXIF:

| Arquivo no site | Original | Conteúdo | Onde aparece |
| --- | --- | --- | --- |
| `hero/pedreira-basalto.jpg` | `…465892585…` | Paredão de basalto, escavadeira e caminhão fora de estrada | Hero da Home (desktop e celular) |
| `operations/vista-aerea-patio.jpg` | `…472340018…` | Vista aérea do pátio, usina, máquinas e estrada | Home — Estrutura e Logística |
| `operations/usina-britagem.jpg` | `…472189487…` | Usina de britagem e pilhas | Home — Qualidade dos materiais |
| `operations/usina-vista-superior.jpg` | `…472943541…` | Usina vista de cima | Página Estrutura e Logística |
| `institutional/vista-aerea-operacao.jpg` | `…471725020…` | Vista aérea da operação | Página Sobre |
| `src/app/opengraph-image.jpg` (1200×630) | `…472900061…` | Vista aérea do pátio | Imagem de compartilhamento (WhatsApp, redes, Google) |

Vídeos (ainda fora do site):

- **Peneira vibratória** (720×1280, 1min58s, 68 MB): bom para um loop curto e mudo (6–10 s, sem áudio, ~1–2 MB) ilustrando "Granulometria padronizada". Exige recorte e compressão.
- **Drone sobre a usina** (638×360, 27 s): resolução baixa demais para destaque; pedir o arquivo original do drone em 1080p/4K.

Fotos ainda necessárias: caminhões da frota de entrega (a seção de logística fala em frota própria, mas as fotos atuais mostram equipamentos de pátio) e um close de cada um dos 10 produtos.

## 8. Refinamento visual da Home (15/10/2026)

Ajustes pontuais, sem redesign. Paleta, tipografia, estrutura editorial, fotos e SEO preservados.

| Área | Antes | Depois |
| --- | --- | --- |
| H1 | "Areia, brita e agregados para construir com confiança." — 4 a 5 linhas no desktop, palavra órfã ("para") em 1024 e 1920 px | "Areia, brita e agregados para **sua obra**." — 3 linhas em 360, 390, 768, 1024, 1440 e 1920 px. Ponte Serrada segue no texto de apoio |
| Botões do hero | "Conhecer produtos" como principal; quebra de texto nos botões em 1024 px | "Solicitar orçamento" como principal, "Conhecer produtos" secundário; botões não quebram linha |
| Foto do hero | Escavadeira cortada em 1024 px | Enquadramento deslocado para a esquerda no desktop (`object-[28%_50%]`): escavadeira e caminhão visíveis em todos os breakpoints |
| Cartões de produto | Áreas vazias com o símbolo da marca e "Foto do material"; no celular, ~2.000 px de cartões vazios empilhados | Painel tipográfico com número de catálogo (Brita 1 em grafite com dados de comercialização). No celular, 2 colunas: página ~1.200 px mais curta |
| Estrutura × Qualidade | Duas aéreas com recorte central parecido | Logística enquadra pátio, caminhões e estrada (`object-[85%_50%]`); Qualidade enquadra correias e pilhas (`object-[30%_50%]`) |
| Legibilidade | Rótulos de 9,6–11,2 px; descrições a 14 px com 65% de opacidade | Rótulos a 12 px (eyebrows, legendas), descrições a 15 px com 75% de opacidade sobre fundo escuro |
| Botões secundários | Borda com contraste 1,7:1 | Borda com contraste ~2,8:1 (claro) e ~4,4:1 (escuro) |
| CTA final | "Seu próximo projeto começa com o material certo." | "Precisa de areia, brita ou agregados para a obra?" + o que informar no pedido (material, quantidade em t ou m³, entrega ou retirada) |

Fotos de produto: ao preencher `image.src` em `src/content/products.ts`, a foto ocupa exatamente a área do painel (mesma proporção), sem alterar o layout.

### Decisões — aprovadas em 15/10/2026

- [x] Novo H1 ("…para sua obra.") e novo título do CTA final.
- [x] Inversão da hierarquia no hero (orçamento como botão principal).
- [x] Painel numerado nos cartões de produto (Brita 1 em fundo grafite). Os números seguem a ordem do catálogo. Os cartões das páginas `/produtos` e `/produtos/[slug]` usam o mesmo componente e também mudaram.
- [x] O novo texto do CTA final aparece também nas páginas internas (componente compartilhado).
- [x] Acessibilidade: `sand-deep` escurecido de #8A7A62 (3,4–3,8:1) para #736550 (4,6–5,1:1 sobre off-white e pedra), mesmo matiz da areia.
- [ ] "Lindóia" mantida sem alteração até confirmação do cliente (Lindóia do Sul?).
