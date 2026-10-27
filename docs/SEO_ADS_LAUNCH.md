# Mineradora Berté — Preparação para Search Console, SEO e Google Ads

Auditoria de 27/10/2026 (Etapa "Search Console, SEO técnico e Google Ads"). Domínio oficial: **https://www.mineradoraberte.com.br/**.

> **Indexação orgânica continua bloqueada** (`noindex, nofollow` + `robots.txt` com `Disallow: /` para `*`). Nada foi enviado ao Search Console e nenhuma indexação foi solicitada. A liberação depende de autorização expressa.

---

## 1. Situação atual (produção)

| Item | Situação |
| --- | --- |
| Search Console | Propriedade `mineradoraberte.com.br` criada pelo usuário. **Não consultada** (sem acesso autenticado nesta etapa). Nenhuma tag de verificação nova, nenhum DNS/TXT alterado. |
| Meta robots | `noindex, nofollow` em todas as páginas |
| `robots.txt` | `*` → `Disallow: /`; `AdsBot-Google` e `AdsBot-Google-Mobile` → `Allow: /` (grupos explícitos adicionados nesta etapa) |
| `sitemap.xml` | 200, `application/xml`, **vazio** — `NEXT_PUBLIC_SITE_URL` não está definida no build de produção |
| Canonicals | **Não emitidos** (mesmo motivo) |
| `metadataBase` | Não definida no código; na Vercel o Next usa o domínio de produção do projeto, por isso `og:image` sai com `https://www.mineradoraberte.com.br/...` |
| HTTPS | HSTS `max-age=63072000`; HTTP → HTTPS 308 |
| www × sem www | `https://mineradoraberte.com.br/*` → `https://www.mineradoraberte.com.br/*` (308, preserva caminho e parâmetros). `http://mineradoraberte.com.br/` faz 2 saltos (→ https apex → www) — aceitável. |
| Barra final | `/sobre/` → `/sobre` (308) |
| `/produtos/<slug>` | 308 → `/produtos#<slug>`; slug inexistente → 404 |
| GTM | `GTM-WQZ8BXHF` carregado em todas as páginas (Consent Mode v2 avançado) — não alterado |

### Por que o sitemap e os canonicals ainda estão desligados

`src/lib/site.ts` só emite canonicals, `og:url`, `@id` do schema, `BreadcrumbList` e URLs no sitemap quando `NEXT_PUBLIC_SITE_URL` existe. A indexação só é liberada quando **também** `NEXT_PUBLIC_SITE_INDEXABLE=true`.

O projeto da Vercel não está acessível pela conta usada nesta etapa, então **não foi possível conferir se `NEXT_PUBLIC_SITE_INDEXABLE` está cadastrada no painel**. Se estiver como `true`, definir só o domínio liberaria a indexação. Por isso `NEXT_PUBLIC_SITE_URL` **não foi ativada** nesta etapa. Antes de ativá-la, conferir no painel (Settings → Environment Variables) que `NEXT_PUBLIC_SITE_INDEXABLE` não existe ou é `false`.

---

## 2. robots.txt e AdsBot

Documentação oficial (*Google special-case crawlers*): **AdsBot-Google** e **AdsBot-Google-Mobile** **ignoram o grupo global `User-agent: *`** e só seguem grupos que os nomeiam. Ou seja, o `Disallow: /` atual **não** bloqueia o AdsBot — e nunca bloqueou.

Mesmo assim foram adicionados grupos explícitos (`src/app/robots.ts`), presentes tanto no modo bloqueado quanto no de lançamento:

```
User-Agent: *
Disallow: /

User-Agent: AdsBot-Google
Allow: /

User-Agent: AdsBot-Google-Mobile
Allow: /
```

Motivo: deixar a intenção registrada e evitar que uma regra futura com o nome do AdsBot bloqueie a verificação das páginas de destino.

### Conflito `Disallow: /` × `noindex` (documentado, não alterado)

- Googlebot respeita o `Disallow: /`, então **não baixa as páginas e não lê o `noindex`**. URLs com links externos podem aparecer no Google só com o endereço, sem descrição.
- No Search Console, a **Inspeção de URL** e o "Testar URL publicado" vão mostrar **"Bloqueado pelo robots.txt"**. Isso é esperado enquanto a proteção estiver ativa.
- A proteção atual foi mantida por decisão do usuário. A alternativa (permitir rastreamento e confiar só no `noindex` + `X-Robots-Tag`) está em `ANALYTICS_SETUP.md`, seção 10.
- Combinação `noindex` + canonical: quando o domínio for configurado antes do lançamento, as páginas terão canonical e `noindex` ao mesmo tempo. Inofensivo enquanto o `Disallow` impede o rastreamento; some no lançamento.

### robots.txt final recomendado (lançamento — gerado automaticamente com `NEXT_PUBLIC_SITE_INDEXABLE=true`)

```
User-Agent: *
Allow: /

User-Agent: AdsBot-Google
Allow: /

User-Agent: AdsBot-Google-Mobile
Allow: /

Sitemap: https://www.mineradoraberte.com.br/sitemap.xml
```

Validado em build local com as duas variáveis (não publicado).

---

## 3. Sitemap

Implementação: `src/app/sitemap.ts` (lista estática; sem rotas dinâmicas). Validado em build local com o domínio:

| URL | Prioridade |
| --- | --- |
| `https://www.mineradoraberte.com.br` | 1 |
| `/produtos` | 0.8 |
| `/estrutura-e-logistica` | 0.6 |
| `/sobre` | 0.6 |
| `/regioes-atendidas` | 0.6 |
| `/contato` | 0.8 |
| `/politica-de-privacidade` | 0.6 |

- **`/estrutura-e-logistica`**: não constava da lista esperada, mas é uma página pública real (Etapa 03), com conteúdo próprio, linkada no menu e rodapé. Mantida.
- **Política de Privacidade**: mantida. É página pública, canônica, indexável e linkada em todo rodapé; o sitemap deve listar as canônicas que podem aparecer na busca, e retirá-la não impediria o rastreamento. Não há motivo técnico para excluí-la.
- **`/produtos/<slug>`** ausentes (redirecionam). `/contato?produto=<slug>` ausente e com canonical para `/contato`.
- Todas as URLs: 200, sem redirecionamento, mesmo valor do canonical. `priority` é ignorada pelo Google (inofensiva).

---

## 4. SEO técnico (auditoria em produção)

| Página | Title | H1 | Description | og:image |
| --- | --- | --- | --- | --- |
| `/` | Mineradora Berté \| Areia, Brita e Agregados em Ponte Serrada SC | Areia, brita e agregados para sua obra. | ok | ok |
| `/produtos` | Produtos: Areia, Brita, Pedrisco e Rachão \| Mineradora Berté | Agregados para diferentes necessidades de construção. | ok | **faltava → corrigido** |
| `/estrutura-e-logistica` | Estrutura e Logística em Ponte Serrada SC \| … | Da mineradora até sua obra. | ok | **corrigido** |
| `/sobre` | Sobre a empresa em Ponte Serrada SC \| … | Da rocha ao fornecimento… | ok | **corrigido** |
| `/regioes-atendidas` | Regiões Atendidas a partir de Ponte Serrada SC \| … | De Ponte Serrada para sua região. | ok (cita as 9 cidades uma vez) | **corrigido** |
| `/contato` | Contato e Orçamento \| … | Solicite seu orçamento. | ok | **corrigido** |
| `/politica-de-privacidade` | Política de Privacidade \| … | Política de Privacidade | ok | **corrigido** |

- **Corrigido — imagem social nas páginas internas.** O `openGraph` definido por cada página (via `pageMetadata`) substitui o do layout por inteiro (merge raso do Next), e com isso a imagem de `src/app/opengraph-image.jpg` só aparecia na Home; as demais saíam sem `og:image` e com `twitter:card=summary`. Agora `pageMetadata` inclui a mesma imagem (1200×630, mesmo alt). Resultado: `og:image` e `twitter:card=summary_large_image` em todas as páginas.
- **Headings**: 1 H1 por página, hierarquia H2/H3 coerente.
- **Alt**: todas as imagens com alt; as 4 do logotipo têm `alt=""` (decorativas — o link tem `aria-label="Mineradora Berté — página inicial"`). Correto.
- **Links internos**: todos 200 ou âncoras válidas (`/produtos#<slug>`, `/contato?produto=<slug>`).
- **Idioma**: `<html lang="pt-BR">`, `og:locale=pt_BR`.
- **Ícones**: `icon.png` 512×512 e `apple-icon.png` 180×180 (200). `/favicon.ico` responde 404 — sem impacto (navegadores e Google usam o `<link rel="icon">`); opcional adicionar.
- **JSON-LD**: `LocalBusiness` em todas as páginas (nome, telefone, cidade/UF/CEP, mapa, 9 cidades confirmadas em `areaServed` — sem rua, horário, avaliações ou certificações); `FAQPage` na Home; `BreadcrumbList` nas internas **só com o domínio configurado** (validado localmente: 1 bloco por página).
- **Pendente de decisão (conteúdo)**: **Lindóia** aparece na lista visível de cidades (Home e /regioes-atendidas) embora esteja `confirmed: false` e fora do schema. A lista fornecida nesta etapa tem 9 cidades sem Lindóia. Não foi alterado; confirmar com a empresa ou retirar da lista visível antes dos anúncios.

---

## 5. SEO regional

O conteúdo atual comunica, sem repetição artificial:

| Tema | Onde |
| --- | --- |
| Venda de brita e areia / agregados | H1 e title da Home, catálogo, descriptions |
| Entrega com frota própria | Home (Logística), /estrutura-e-logistica, /sobre, /regioes-atendidas |
| Retirada na mineradora | Home (hero, FAQ), /regioes-atendidas, /contato |
| Atendimento regional | Home (Regiões), /regioes-atendidas |
| Tonelada e m³ | Description da Home, FAQ, formulário, catálogo |

Cidades: cada uma aparece 1× na Home e 1× em /regioes-atendidas (mais o JSON-LD). Nenhuma página de localização artificial. Nenhuma alteração de texto foi necessária.

---

## 6. Google Ads — página de destino

Campanha prevista (criada fora do site): **Pesquisa | Mineradora Berté | SC** — grupos **Brita** e **Areia**, ambos para `https://www.mineradoraberte.com.br/`.

| Verificação | Resultado (27/10/2026) |
| --- | --- |
| Home HTTP | 200, HTML ~157 KB, TTFB 0,15–0,6 s, cache da Vercel (HIT) |
| HTTPS / redirecionamentos | http e apex → `https://www.` (308) |
| URL final × canonical | A URL final é a própria versão canônica (www + https); canonical será `https://www.mineradoraberte.com.br` após configurar o domínio |
| AdsBot-Google (UA real) | `/`, `/produtos`, `/contato`, `/robots.txt` → 200 |
| AdsBot-Google-Mobile (UA real) | 200 |
| Googlebot (UA) | 200 (o bloqueio é só por robots.txt, não por firewall) |
| Firewall / desafio / autenticação | Nenhum bloqueio, nenhum desafio, nenhuma autenticação observados |
| `noindex` | Não impede anúncios: o Google Ads não depende da indexação orgânica |
| Mobile | Layout responsivo validado nas etapas anteriores (360–1920 px); botão de orçamento e WhatsApp visíveis |
| Recursos essenciais | CSS, JS, fontes (`next/font`, auto-hospedadas) e imagens servidos pelo próprio domínio; nenhum bloqueado no robots.txt para AdsBot |

**Depende de verificação externa:** velocidade em campo (PageSpeed Insights / Core Web Vitals), e a política da página de destino no próprio Google Ads após criar os anúncios (status "Qualificado").

---

## 7. Conversões (somente análise; GTM e GA4 não alterados)

Eventos existentes no `dataLayer` (`src/lib/analytics.ts`, `ConversionTracking.tsx`, `QuoteForm.tsx`), sem dados pessoais:

| Evento | Origem | Candidato a conversão no Ads? |
| --- | --- | --- |
| `whatsapp_click` (`contact_type: principal`) | Hero, botão flutuante, barra do celular, /contato, rodapé | **Sim — principal** |
| `whatsapp_click` (`contact_type: secundario`) | /contato, rodapé | Sim, como secundária ou somada à principal |
| `phone_click` | Todos os links `tel:` | **Sim — principal** |
| `product_quote_click` | "Solicitar orçamento" do catálogo | Não (micro-conversão: leva a /contato) |
| `quote_form_start` | Primeira interação com o formulário | Não |
| `quote_whatsapp_open` | Formulário válido abriu o WhatsApp | Sim, como secundária — **não** é pedido enviado |

**Divergência a esclarecer:** o briefing desta etapa diz que não há formulário comercial ativo. Existe, em `/contato`, o formulário de orçamento da Etapa 05A, que **não envia dados a servidor**: apenas monta a mensagem e abre o WhatsApp principal. Os eventos `quote_form_start` e `quote_whatsapp_open` pertencem a ele e **não representam envio de formulário**. Nenhum evento de envio de formulário existe ou foi criado.

Nenhum evento novo é necessário para a campanha. Recomendações (a fazer no GTM/Ads, não no código):

1. Importar/criar conversões a partir de `whatsapp_click` e `phone_click` (ação principal); `quote_whatsapp_open` como secundária para não contar duas vezes o mesmo contato.
2. Ligações a partir dos anúncios: usar **extensão de chamada** com conversão de chamada (Google Ads), que mede duração — melhor sinal que o clique em `tel:`.
3. Conversion Linker no GTM ao instalar a tag do Google Ads.
4. Variável *Click URL* não deve ir para o GA4 em links `wa.me` (mensagem no `?text=`).

---

## 8. Checklist de lançamento orgânico (somente com autorização)

1. Conferir na Vercel que `NEXT_PUBLIC_SITE_INDEXABLE` não está `true` e definir `NEXT_PUBLIC_SITE_URL=https://www.mineradoraberte.com.br` (em `.env.production` ou no painel). Deploy → conferir canonicals, `og:url`, `BreadcrumbList` e sitemap com 7 URLs, ainda com `noindex`.
2. Decidir sobre Lindóia (seção 4).
3. No lançamento: `NEXT_PUBLIC_SITE_INDEXABLE=true` → remove `noindex`, troca o `robots.txt` pela versão da seção 2 e adiciona a linha `Sitemap:`.
4. Validar em produção: `robots.txt`, `sitemap.xml`, meta robots `index, follow` e canonical em cada página.
5. Search Console: Sitemaps → enviar `https://www.mineradoraberte.com.br/sitemap.xml`.
6. Inspeção de URL da Home → "Testar URL publicado" → "Solicitar indexação" (somente a Home).
7. Acompanhar Páginas (indexação), Sitemaps e Experiência nas semanas seguintes; perfil da empresa no Google com o mesmo NAP.

## 9. Como conferir no Search Console agora (manual)

- **Configurações → Verificação de propriedade**: método e status (DNS TXT, se for propriedade de domínio).
- **Configurações → Rastreamento**: requisições e respostas do `robots.txt` (deve mostrar o arquivo atual, sem erro de busca).
- **Inspeção de URL** da Home: esperado "Bloqueado pelo robots.txt" / "URL não está no Google". Não clicar em "Solicitar indexação".
- **Sitemaps**: não enviar ainda.
