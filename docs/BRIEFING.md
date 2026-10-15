# Mineradora Berté — Briefing do site

Status: **Etapa 04** concluída (arquitetura comercial para Google Ads, catálogo único, formulário de orçamento). Domínio oficial em uso como ambiente de testes, `noindex`.

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
| `/produtos` | Hero, índice visual, catálogo único em 3 categorias; cada material com descrição e "Solicitar orçamento" com o produto pré-selecionado | Concluída (Etapas 02 e 04) |
| `/produtos/<slug>` | **Removidas na Etapa 04.** Redirecionamento permanente (308) para `/produtos#<slug>` | Redirecionadas |
| `/estrutura-e-logistica` | Hero escuro com foto da usina, estrutura operacional (3 fotos), frota própria, entrega/retirada, atendimento regional, CTA | Concluída (Etapa 03), aguarda fotos da frota |
| `/sobre` | Hero com título recortado sobre a foto, apresentação, operação, 5 diferenciais, próximos passos, CTA | Concluída (Etapa 03), aguarda história da empresa |
| `/regioes-atendidas` | Hero tipográfico + base de operação, operação, índice de cidades, outras localidades, entrega/retirada, CTA | Concluída (Etapa 03), aguarda confirmação de Lindóia |
| `/contato` | Formulário de orçamento (campos condicionais), telefones, localização | Interface pronta; envio aguarda canal confirmado |
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

## 9. Etapa 02 — Catálogo e páginas de produto (15/10/2026)

### Estrutura

**`/produtos`**
1. Cabeçalho: "Agregados para diferentes necessidades de construção." + texto comercial.
2. Índice visual (grafite): "10" em contorno + as 3 categorias com contagem, descrição e atalho (âncoras `#britas`, `#areias`, `#rachoes`). Filtro simples, sem JavaScript.
3. Uma seção por categoria: título e descrição fixos à esquerda (sticky no desktop), materiais à direita em 2 colunas. Com número ímpar de materiais, o primeiro ocupa a largura toda (mesma composição assimétrica da Home).
4. CTA final do site.

**`/produtos/[slug]`** (um único modelo para os 10)
1. Breadcrumbs (Início / Produtos / Material) com BreadcrumbList quando houver domínio.
2. Hero: número + categoria, H1 com o nome, frase comercial, comercialização e fornecimento, "Solicitar orçamento" (com o produto) e telefone; painel numerado no lugar da foto.
3. "O que é …?": texto geral sobre o tipo de material, identificado como informativo. Rachões sem texto próprio usam a descrição da categoria.
4. Fornecimento: tonelada ou m³, entrega com frota própria, retirada em Ponte Serrada; condições sob consulta e aviso de que não há conversão fixa t ↔ m³.
5. Ficha técnica: só aparece quando houver dados confirmados (`technical` em `products.ts`).
6. Outros materiais: mesma categoria primeiro, depois os seguintes do catálogo (sem relação técnica presumida) + índice completo dos 10.
7. CTA: "Precisa de [material] para sua obra?" → `/contato?produto=<slug>`.

**`/contato?produto=<slug>`**: mostra "Material do pedido: …". O parâmetro só é aceito se for um slug do catálogo; outros valores são ignorados.

### Componentes
`src/components/product/`: `ProductHero`, `ProductInformation`, `ProductSpecifications`, `ProductSupply`, `RelatedProducts`, `ProductQuoteCta` (reaproveita `FinalCta`), `QuoteProductNote`.
`src/components/ui/ProductMedia.tsx`: foto ou painel numerado, usado no card e no hero do produto.

### Como completar um produto (`src/content/products.ts`)
- **Foto:** salvar em `public/images/products/<slug>.jpg` (4:3, ≥ 1600 px) e preencher `image.src`. O painel é trocado pela foto sem mudar o layout.
- **Descrição oficial:** `description`.
- **Ficha técnica:** `technical.granulometry`, `characteristics`, `applications`, `unit`, `notes` (todos opcionais; campos vazios não aparecem).

### SEO
- Title único (`<Material> em Ponte Serrada SC | Mineradora Berté`), meta description própria (`summary`), H1 único, URL descritiva, breadcrumbs, links internos (catálogo, relacionados, regiões, contato).
- Open Graph com título e descrição de cada material; imagem de compartilhamento padrão do site.
- **Sem JSON-LD `Product`**: o Google exige `offers`, `review` ou `aggregateRating` para esse tipo, e não há preço nem avaliações confirmados.
- Material inexistente (`/produtos/qualquer-coisa`) retorna **404 real** via `src/proxy.ts` (com Cache Components, o `notFound()` da página chegaria com status 200).
- Canonical, sitemap e `noindex` sem alteração.

### Decisões de design
- Ordem do catálogo agrupada por categoria (Britas 01–05, Areias 06–07, Rachões 08–10), para a numeração ficar sequencial no catálogo. Na Home, os destaques passaram a ser Brita 1, Pedrisco, Pó de brita, Areia industrial e Areia natural (mesmos 5 materiais, nova ordem).
- Destaque visual do primeiro material de Britas (Brita 1) e de Rachões (Rachãozinho primário) é só de composição, não indica relevância comercial.

### Pendências com o cliente
- [ ] Fotos dos 10 materiais (close, luz natural, mesmo enquadramento).
- [ ] Descrição oficial e ficha técnica de cada material (faixa granulométrica, características, aplicações).
- [ ] O que diferencia **Rachãozinho primário**, **Rachão mina** e **Rachão mataco** (hoje sem texto próprio).
- [ ] Origem de cada material (ex.: se a areia natural é extraída pela própria Berté ou adquirida).
- [ ] Validar os textos gerais de "O que é …?".
- [ ] Validar o agrupamento em 3 categorias.

## 10. Etapa 03 — Páginas institucionais (15/10/2026)

As três páginas usam o mesmo design system (tokens, Archivo/Jakarta, grid de 12 colunas, divisórias finas, numeração), mas cada uma tem composição própria. As seções de cada página ficam no próprio `page.tsx`, como em `/produtos`.

### Páginas

| Página | Composição | Fundo das seções |
| --- | --- | --- |
| `/sobre` | Hero: foto ampla com o H1 em um painel recortado sobre o canto inferior (no celular, título antes da foto) · 01 A empresa: frase editorial + famílias de materiais com links (não é catálogo) · 02 Nossa operação: foto panorâmica + 4 etapas em linha · 03 Diferenciais: tabela com numeração vazada (5 itens) · links "Conhecer produtos" / "Estrutura e logística" · CTA final | claro → claro → grafite → claro → pedra → azul |
| `/estrutura-e-logistica` | Hero escuro: H1 grande, CTA e foto panorâmica da usina com faixa de dados (frota, fornecimento, comercialização, base) · 01 Estrutura operacional: mosaico assimétrico com legendas numeradas · 02 Frota própria: composição tipográfica das 4 configurações · 03 Entrega × Retirada lado a lado + faixa tonelada/m³ · 04 Atendimento regional · CTA "Precisa organizar o fornecimento…" | grafite → claro → azul profundo → claro → claro → azul |
| `/regioes-atendidas` | Hero tipográfico ("De Ponte Serrada para sua região.") com faixa base/localização/link do Google Maps · 01 A operação: foto sangrando até a borda + texto · 02 Índice de cidades (Ponte Serrada em destaque como base; demais numeradas) + bloco "Sua obra fica em outra cidade?" com os dois telefones · 03 Entrega ou retirada · CTA "Consulte o fornecimento para a sua cidade." | claro → claro → grafite → claro → azul |

### Fotografias utilizadas (nenhum arquivo novo, nenhuma recompressão)

| Arquivo | Onde |
| --- | --- |
| `institutional/vista-aerea-operacao.jpg` | Hero de /sobre |
| `operations/usina-britagem.jpg` | /sobre (Nossa operação) e mosaico de /estrutura-e-logistica (Usina de britagem) |
| `operations/usina-vista-superior.jpg` | Hero de /estrutura-e-logistica |
| `hero/pedreira-basalto.jpg` | Mosaico de /estrutura-e-logistica (Frente de lavra) |
| `operations/vista-aerea-patio.jpg` | Mosaico de /estrutura-e-logistica (Pátio e estocagem) e /regioes-atendidas (A operação) |

O 6º original (`…472900061…`) é quase idêntico a `vista-aerea-patio.jpg` e segue só como imagem de Open Graph. As fotos têm 1440 px de largura: em telas de 1920 px a imagem panorâmica é levemente ampliada — pedir originais em resolução maior.

### Dados usados (somente confirmados)

Localização (42M9+Q5, Ponte Serrada, CEP 89683-000), os dois telefones, tonelada/m³, entrega/retirada, frota (truck, 6x4, bitruck, carretas), diferenciais e as 10 cidades. Nada de anos de mercado, capacidade, quantidade de caminhões, capacidade de carga, prazos, distâncias, rotas ou história. Lindóia continua com o nome informado (sem converter para Lindóia do Sul) e fora do JSON-LD.

### Decisões de design

- **Frota sem foto**: composição tipográfica. A foto aparece automaticamente quando `media.fleet.src` for preenchido (sem área vazia "em breve" no site publicado).
- **Mapa**: mantido o link externo do Google Maps (`company.mapsUrl`); nenhum mapa incorporado, para não carregar serviço externo.
- **Sem páginas por cidade** e sem filiais: o SEO local fica no título/descrição de `/regioes-atendidas`, na lista de cidades e no `areaServed` do LocalBusiness.
- **Metadata**: títulos "Sobre a empresa em Ponte Serrada SC", "Estrutura e Logística em Ponte Serrada SC" e "Regiões Atendidas a partir de Ponte Serrada SC", com descrições próprias. noindex mantido.
- Descrições das fotos (legendas) se limitam ao que aparece na imagem.

### Pendências com o cliente

- Fotos da frota de entrega (truck, 6x4, bitruck, carretas) → `public/images/fleet/frota-principal.jpg`.
- História, trajetória e equipe para a página Sobre.
- Confirmar Lindóia × Lindóia do Sul.
- Fotos originais em maior resolução (≥ 2400 px) e vídeo original do drone.
- Validar os textos institucionais (operação, diferenciais, legendas das fotos).
- Confirmar se todas as etapas (lavra, britagem, estocagem) ocorrem no mesmo local em Ponte Serrada e a origem da areia natural.

## 11. Etapa 04 — Estratégia comercial e formulário de orçamento (15/10/2026)

### Estratégia de Google Ads (configurada fora do site)

- Uma campanha de Pesquisa com dois grupos: **Brita** e **Areia**.
- Os dois grupos usam a mesma URL final: **https://www.mineradoraberte.com.br/** (a Home). Sem landing pages por produto.
- Nenhuma campanha, credencial ou ID de rastreamento está no código.

### Arquitetura comercial

```
Anúncio (Brita / Areia) → Home → "Solicitar orçamento" → /contato (formulário)
                                → Catálogo (/produtos) → "Solicitar orçamento" do material → /contato?produto=<slug>
                                → Telefone (header, hero, CTA final, rodapé, barra no celular)
```

- **Todos os botões "Solicitar orçamento"** (header, menu mobile, hero, seções institucionais, CTA final, rodapé, barra do celular) levam a `/contato`, sem exigir a escolha de um produto.
- **No catálogo**, cada material leva a `/contato?produto=<slug>`, que abre o formulário com o material pré-selecionado. Parâmetros inválidos são ignorados.

### Catálogo

- As 10 páginas individuais foram removidas. A base de dados (`src/content/products.ts`) foi mantida e alimenta o catálogo, a Home, o rodapé e o formulário.
- `/produtos/<slug>` → **308** para `/produtos#<slug>` (o card do material tem `id` = slug). Slugs inexistentes retornam 404. Regras em `next.config.ts`; o `src/proxy.ts` deixou de ser necessário.
- Componentes removidos por terem ficado sem uso: `src/components/product/*` e os helpers `getRelatedProducts` e `productNameInline`.
- Card do catálogo (`CatalogItem`): miniatura numerada (foto quando houver), categoria, nome, descrição (oficial, se houver; senão o texto geral) e "Solicitar orçamento". No celular, formato de lista; a partir de 640px, cards.
- Home e rodapé apontam para `/produtos#<slug>`. Sitemap sem as URLs antigas.

### Home como destino dos anúncios (auditoria)

| Critério | Situação |
| --- | --- |
| Vende areia e brita | H1 aprovado "Areia, brita e agregados para sua obra." mantido |
| Ponte Serrada, SC | Linha acima do H1 + seção de regiões |
| Estrutura da mineradora | Foto real no hero + seções de logística e qualidade |
| Entrega e retirada | Faixa de dados do hero + seção de logística + FAQ |
| Orçamento | Botão "Solicitar orçamento" visível sem rolar em 360×640, 390×844 e desktop |

Ajuste de conversão: abaixo de 640px o header não tem botão de orçamento; foi adicionada uma **barra fixa no celular** (Solicitar orçamento + telefone) que aparece após rolar a página e não aparece em /contato. Nenhuma outra mudança visual na Home.

### Formulário (`src/components/quote/QuoteForm.tsx`, regras em `src/content/quote.ts`)

1. Material (10 materiais agrupados por categoria), quantidade, unidade (toneladas ou m³).
2. Modalidade: **entrega** → cidade (lista de cidades atendidas + "Outra cidade") e endereço/referência (opcional); **retirada** → aviso com a localização da mineradora.
3. Nome, telefone (máscara (49) 99999-9999), observações (opcional).

- Um único formulário para todos os materiais. Resumo do pedido montado em tempo real.
- **Canal de envio:** nenhum confirmado. `company.whatsapp = null` e `company.quoteEndpoint = null`, portanto **não existe botão de envio**: o formulário termina com "Finalize o pedido por telefone" e os dois números clicáveis.
- **Quando o WhatsApp comercial for confirmado:** preencher `company.whatsapp` (ex.: `"+55 49 9XXXX-XXXX"`). Aparece o botão "Revisar e enviar pelo WhatsApp", com validação dos campos, que abre o WhatsApp com a mensagem estruturada para o cliente revisar e enviar. Fluxo testado localmente com número fictício (não publicado).
- Envio direto (e-mail/CRM) exigirá backend; não implementado sem canal definido.

### Telefones

- Principal: **(49) 98409-3337** (`company.phone`) — header, hero, CTAs, barra do celular, JSON-LD.
- Secundário: **(49) 99180-1200** (`company.phoneSecondary`) — rodapé, /contato, final do formulário, /regioes-atendidas.
- Nenhum número é tratado como WhatsApp.

### Analytics (`src/lib/analytics.ts`)

Eventos enviados para `window.dataLayer` **somente se** uma tag (GTM/GA4/Google Ads) for instalada; sem a tag, nada é registrado.

| Evento | Quando |
| --- | --- |
| `phone_click` | Clique em qualquer link `tel:` (com número e página) |
| `whatsapp_click` | Clique em link do WhatsApp (só existirá após confirmação) |
| `quote_form_start` | Primeira interação com o formulário |
| `quote_whatsapp_open` | Formulário válido abriu o WhatsApp — **não é venda nem pedido recebido** |
| `quote_submitted` | Reservado: usar apenas com confirmação real de recebimento (backend) |

Para medir no Google Ads: instalar a tag (com ID real fornecido pelo cliente), criar conversões a partir desses eventos e atualizar a Política de Privacidade.

### Pendências

- Confirmar qual número tem WhatsApp comercial (se houver).
- Definir canal de recebimento do formulário (WhatsApp, e-mail ou CRM).
- Conta do Google Ads / GTM para instalação da tag e definição das conversões.
- Atualizar a Política de Privacidade ao ativar formulário e medição.

