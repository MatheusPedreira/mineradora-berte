# Mineradora Berté — Mensuração (GTM, GA4, Consent Mode v2 avançado)

Situação em 23/10/2026 (Etapa 08): **Consent Mode v2 AVANÇADO no site.** O container `GTM-WQZ8BXHF` carrega em todas as páginas, com todos os estados de consentimento negados por padrão. O container está publicado (versão 1) mas **vazio** — nenhuma tag, acionador ou variável. Portanto o **GA4 não recebe nada** (nem hits com cookies, nem pings sem cookies) até a Google tag ser criada e publicada no painel (seção 5). Nenhuma tag do Google Ads existe.

---

## 1. Identificadores

| Item | Valor | Onde fica |
| --- | --- | --- |
| Google Tag Manager | `GTM-WQZ8BXHF` | `NEXT_PUBLIC_GTM_ID` em `.env.production` (versionado; ID público). Variável com o mesmo nome no painel da Vercel tem precedência. |
| GA4 Measurement ID | `G-LRVXNPM6ZG` | **Somente dentro do GTM** (Google tag). Não aparece no código. |
| Google Ads | — | Não instalado (seção 8). |

Sem `NEXT_PUBLIC_GTM_ID` válido (formato `GTM-…`), o site não carrega o container, não mostra o aviso e não cria `window.dataLayer`. A variável é lida no build.

---

## 2. Básico × avançado — o que mudou

| | Básico (Etapa 07) | **Avançado (Etapa 08, atual)** |
| --- | --- | --- |
| Carregamento do GTM | só depois de "Aceitar"/escolha com alguma finalidade | **em toda página, desde o início** |
| Sem consentimento | nenhuma requisição ao Google | tags do Google compatíveis podem enviar **pings sem cookies** |
| `dataLayer` sem consentimento | inexistente; eventos descartados | existe; **eventos sempre registrados** |
| Revogação | `update` negado + apagar cookies + **recarregar** | `update` negado + apagar cookies, **sem recarregar** |

**Por que antes só carregava após consentimento:** na Etapa 07, `ConsentManager` só chamava `initTagManager()` e renderizava `<Script src="…gtm.js">` quando a escolha salva tinha `analytics` ou `ads` = `true`; sem isso, `window.dataLayer` nem era criado e `track()` retornava sem registrar. Esse caminho foi removido.

---

## 3. Como funciona

### Ordem de inicialização (script inline `beforeInteractive` no `src/app/layout.tsx`, gerado por `gtmBootstrapScript` em `src/lib/analytics.ts`)

Roda **uma vez por carga de página**, antes da hidratação do Next.js e antes de qualquer tag:

```js
window.dataLayer = window.dataLayer || []                                   // 1. dataLayer
gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied',
                             ad_user_data: 'denied', ad_personalization: 'denied' })  // 2. padrão negado
gtag('set', 'ads_data_redaction', true)                                     // 3. privacidade
gtag('consent', 'update', { ...escolha salva })   // 3b. só se houver escolha salva com algo concedido
dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' })
// 4. <script async src="https://www.googletagmanager.com/gtm.js?id=GTM-WQZ8BXHF" data-gtm-container>
//    inserido uma única vez (verifica se já existe)
```

5. Quando o visitante escolhe (aviso ou "Preferências de privacidade"): `gtag('consent', 'update', …)` **imediato**, sem recarregar e sem novo container (`applyConsent`).

Detalhes:

- O padrão é síncrono e vem antes do `gtm.js` (que é inserido pelo próprio script): nenhuma tag executa antes do estado negado.
- Navegação interna (client-side) não reexecuta o script: um container por sessão de página.
- Não há `<noscript>` do GTM: sem JavaScript não seria possível definir o consentimento padrão antes das tags.
- Nenhum HTML personalizado no GTM manipula consentimento; o estado vem do site, pela API `gtag('consent', …)`.
- Não usamos `wait_for_update`: a escolha salva é aplicada de forma síncrona antes do container; um visitante novo começa negado.

### Estados

| Escolha | `analytics_storage` | `ad_storage` | `ad_user_data` | `ad_personalization` |
| --- | --- | --- | --- | --- |
| Sem resposta / Recusar | denied | denied | denied | denied |
| Aceitar | granted | granted | granted | granted |
| Personalizar: só Análise | granted | denied | denied | denied |
| Personalizar: só Publicidade | denied | granted | granted | granted |

Nada é concedido automaticamente. A escolha fica em `localStorage` (`berte-consent-v1`: `analytics`, `ads`, `updatedAt`); só `true` explícito concede.

### Revogação

`consent update` com os estados negados (as tags do Google param de usar cookies imediatamente) e remoção dos cookies já gravados da finalidade revogada — análise: `_ga`, `_ga_*`, `_gid`, `_gat*`; publicidade: `_gcl_*`, `_gac_*` (no host e no domínio raiz). Sem recarga: o container continua, agora no modo sem cookies.

### Aviso

Interface aprovada mantida: **Recusar · Aceitar · Personalizar preferências** (Análise / Publicidade desmarcadas) → **Salvar escolhas**. Não é modal: navegar, ligar, abrir o WhatsApp, usar o formulário e o catálogo funcionam sem responder. No celular fica acima da barra fixa (sobe com `transform`, CLS 0). Texto: "Com a sua autorização, usamos cookies para medir visitas e anúncios. Sem ela, o Google recebe só sinais limitados, sem cookies."

---

## 4. Eventos e o que cada camada significa

### Camada de dados (site)

`dataLayer.push({ event, ...parâmetros })`, um push por interação real, **com ou sem consentimento**:

| Evento | Quando | Parâmetros |
| --- | --- | --- |
| `phone_click` | clique em link `tel:` da empresa | `contact_type`, `placement`, `page_path` |
| `whatsapp_click` | clique em link direto `wa.me` da empresa | `contact_type`, `placement`, `page_path` |
| `product_quote_click` | "Solicitar orçamento" de um material no catálogo | `product`, `placement`, `page_path` |
| `quote_form_start` | primeira interação com o formulário | `form_name`, `product`, `page_path` |
| `quote_whatsapp_open` | formulário **validado** tentou abrir o WhatsApp principal | `form_name`, `product`, `supply_mode`, `quantity_unit`, `contact_type`, `page_path` |

- `contact_type`: `principal` | `secundario` (nunca o número). `placement`: `header`, `mobile_menu`, `hero`, `floating_button`, `quality`, `final_cta`, `footer`, `mobile_bar`, `contact_aside`, `catalog`, `regions_cta`, `page_hero`, `quote_form`, `content`. `product`: slug do catálogo. `supply_mode`: `entrega` | `retirada`. `quantity_unit`: `tonelada` | `m3`. `form_name`: `orcamento`.
- **Nunca** entram: nome, telefone digitado, endereço, observações, texto ou URL da mensagem do WhatsApp, qualquer identificador pessoal.
- Não existe `purchase`, `generate_lead` como pedido confirmado nem evento de "pedido recebido".

### Não confundir

| Camada | O que é | Onde se vê |
| --- | --- | --- |
| Evento no `dataLayer` | o site registrou a interação no navegador | `window.dataLayer`, Tag Assistant (aba *Data Layer*) |
| Ping sem cookies | a tag do Google enviou um sinal limitado, sem identificador, porque o consentimento está negado | Network: `…/g/collect` com `gcs=G100` (ou similar) e sem `_ga` |
| Hit com cookies | consentimento de análise concedido; a tag usa `_ga` | Network: `gcs=G1…1`; cookies `_ga` |
| Evento no GA4 | o GA4 recebeu e processou | DebugView / Tempo real (pings sem cookies **não** aparecem como usuários no DebugView) |
| Conversão no Google Ads | atribuída a um clique de anúncio, ou **modelada** | Google Ads (não configurado) |
| Mensagem enviada / venda | fora do site | WhatsApp / CRM |

`quote_whatsapp_open` = formulário válido + tentativa de abrir o WhatsApp. **Não** é mensagem enviada. `phone_click` não é ligação concluída, nem venda.

---

## 5. Configuração manual no GTM (pendente)

1. **Admin → Configurações do container → Ativar visão geral do consentimento.**
2. **Variáveis da camada de dados** (versão 2), nome da chave igual ao parâmetro: `page_path`, `product`, `placement`, `contact_type`, `supply_mode`, `quantity_unit`, `form_name`.
3. **Tag "GA4 - Google tag"**: tipo *Google tag*, ID `G-LRVXNPM6ZG`, acionador **Initialization – All Pages**. Não é preciso tag no acionador *Consent Initialization*: o padrão negado já vem do site, antes do container. Configurações de consentimento: **"Não é necessário consentimento adicional"**. A Google tag tem verificações **incorporadas** (`analytics_storage`, `ad_storage`…) e se adapta sozinha — com estado negado envia pings sem cookies. ⚠️ **Não** marcar "Exigir consentimento adicional → `analytics_storage`" (isso bloquearia os pings do modo avançado).
4. **Acionadores** *Evento personalizado* com o nome exato de cada evento: `phone_click`, `whatsapp_click`, `product_quote_click`, `quote_form_start`, `quote_whatsapp_open`.
5. **Tags "GA4 - <evento>"**: tipo *Google Analytics: evento do GA4*, ID de medição `G-LRVXNPM6ZG`, nome do evento = acionador, parâmetros da seção 4 (ex.: `product` = `{{DLV - product}}`). Também **sem** consentimento adicional.
6. **Não criar**: tag de `page_view` manual, acionador *Alteração no histórico* para page_view, HTML personalizado de consentimento, segunda Google tag, tags do Google Ads (nesta etapa), tags de terceiros sem consentimento (se no futuro houver, exigir consentimento adicional nelas, pois não têm o modo sem cookies).
7. **Visualizar** (Tag Assistant), testar (seção 7) e só então publicar.

### GA4 (`G-LRVXNPM6ZG`)

- Fluxo Web `https://www.mineradoraberte.com.br`; Medição otimizada com *alterações de página baseadas em eventos do histórico do navegador* ligada.
- Dimensões personalizadas (evento): `product`, `placement`, `contact_type`, `supply_mode`, `quantity_unit`, `form_name`.
- **Identidade dos relatórios**: "Combinada" ou "Com base em modelos" para usar a modelagem comportamental do GA4. A modelagem só é aplicada se a propriedade atender aos requisitos do Google (volume mínimo diário de eventos com e sem consentimento por vários dias); sem isso, os relatórios mostram apenas o que foi observado com consentimento.
- Retenção conforme a política aprovada; fuso America/Sao_Paulo; moeda BRL.

---

## 6. page_view e navegação

- O site não envia `page_view` próprio; a Google tag (carregamento) e a medição otimizada (navegações internas) cuidam disso, com ou sem consentimento (sem consentimento, como ping sem cookies).
- Teste de 23/10/2026: Home → Produtos → Contato → Home = **1 `pushState` com mudança de URL por navegação**, nenhum `replaceState` na mesma URL, `gtm.js` não baixado de novo, 1 container. Corresponde a **um `page_view` por página**. Confirmar no Tag Assistant quando a Google tag existir.

---

## 7. Testes

### Realizados em 23/10/2026 — build de produção local e domínio oficial, container real `GTM-WQZ8BXHF` (vazio), Chrome headless (DevTools Protocol)

Estado de consentimento lido em `google_tag_data.ics` (o estado interno que as tags do GTM consultam). Cliques em `tel:`/`wa.me` e `window.open` interceptados: **nenhuma ligação ou mensagem real**.

| Cenário | Resultado |
| --- | --- |
| **A. Primeiro acesso** | `gtm.js` baixado **1 vez** com o aviso aberto; ordem: default negado → `ads_data_redaction` → `gtm.js`; GTM com os 4 estados *denied (default)*; 0 cookies; cliques geram eventos no `dataLayer` |
| **B. Recusar** | estados negados; GTM continua (1 script, 1 container); recarregar não mostra o aviso; telefone/WhatsApp clicáveis e eventos no `dataLayer`; 0 cookies |
| **C. Aceitar** (rodapé) | `update` concedido **sem recarregar**; GTM com os 4 *granted (update)*; 1 script; eventos continuam |
| **D. Só Análise** | `analytics_storage` granted, publicidade denied; `_gcl_au` (de teste) apagado, `_ga` mantido; sem recarga |
| **E. Só Publicidade** | `analytics_storage` denied, publicidade granted; `_ga` apagado; após recarga, ordem default → `ads_data_redaction` → `update` → `gtm.js` |
| **F. Revogar tudo** | 4 estados *denied (update)*; cookies apagados; GTM permanece; 3 cliques = 3 eventos (sem duplicação) |
| **G. Navegação** | 1 `pushState` por navegação; `gtm.js` não baixado de novo; `product_quote_click` com `product: pedrisco`, `placement: catalog` |
| **H. Conversão** (recusado e aceito) | `phone_click`, `whatsapp_click` (principal e secundário), `quote_form_start` e, após validação, 1 `quote_whatsapp_open`; nome, telefone, observações e URL `?text=` **ausentes** do `dataLayer` |

Também: lint, `tsc --noEmit`, build; 360–1920 px sem overflow e com CLS 0.

### O que estes testes NÃO comprovam

- **Pings sem cookies e hits do GA4**: o container não tem nenhuma tag; nenhuma requisição `g/collect` existe ainda. Os cookies `_ga` também não aparecem com "Aceitar" pelo mesmo motivo.
- Tag Assistant, DebugView, Tempo real, modelagem e atribuição.

### Roteiro após configurar o GTM

1. GTM → **Visualizar** em `https://www.mineradoraberte.com.br/`.
2. Sem responder ao aviso: aba *Consentimento* com os 4 estados **negados (padrão)** no evento *Consent Initialization*; Google tag **disparada**; Network: `g/collect` com `gcs=G100`, `npa=1` e sem cookie `_ga` (ping sem cookies).
3. **Aceitar**: aba *Consentimento* com *update* concedido; novos hits com `gcs=G111`; cookies `_ga`/`_ga_*` criados.
4. Clicar telefone, WhatsApp (principal e secundário), orçamento do catálogo; preencher e validar o formulário com dados fictícios (**não enviar** a mensagem). 1 tag de evento por ação.
5. GA4 → **DebugView** (com consentimento): eventos e parâmetros; navegação Home → Produtos → Contato → Home com **um** `page_view` por página.
6. Repetir com **Recusar** e com **só Publicidade**: nenhum cookie `_ga`; hits com `gcs=G100`/`G110`.
7. Publicar a versão.

---

## 8. Google Ads — planejamento (NÃO ativado)

Campanha de Pesquisa com dois grupos — **Brita** e **Areia** — ambos com URL final `https://www.mineradoraberte.com.br/`. Nenhuma campanha, tag ou conversão foi criada.

| Evento | Papel planejado |
| --- | --- |
| `quote_whatsapp_open` | **Principal candidato** a conversão comercial (formulário validado) |
| `whatsapp_click` | Contato direto — inicialmente **secundária** |
| `phone_click` | Interesse em ligação — inicialmente **secundária** |
| `quote_form_start` | Engajamento (não conversão) |
| `product_quote_click` | Engajamento (não conversão) |

- A escolha definitiva das conversões principais será feita **depois** de validar os eventos e a qualidade dos contatos recebidos.
- **Uma fonte por ação**: importar do GA4 **ou** tag nativa do Google Ads no GTM — nunca as duas para a mesma ação. Não disparar a mesma conversão duas vezes.
- Conversões de intenção sem valor de receita; quando houver CRM com orçamento/venda confirmados, importar conversões offline e rebaixar as de intenção.
- **Limitações**: com consentimento negado, a conversão não é atribuída individualmente; o Google Ads pode **modelar** parte delas, desde que a conta atinja os requisitos de volume e elegibilidade do Google. Não há garantia de que toda interação será atribuída a uma campanha. Quando o Google Ads for configurado, avaliar `url_passthrough` (Conversion Linker) para preservar o `gclid` entre páginas sem cookies.
- Marcação automática (auto-tagging) ativa no Google Ads; o site preserva UTMs e `gclid` nos redirecionamentos e não guarda parâmetros de campanha.

---

## 9. Cuidados contra duplicação

- Um único container, inserido só pelo script `gtm-bootstrap` (layout raiz, verifica `script[data-gtm-container]`). Não instalar GTM ou `gtag.js` por outra via (integração da Vercel, plugin, snippet do GA4).
- Uma Google tag com `G-LRVXNPM6ZG`; nada de `page_view` manual.
- Um listener de cliques delegado (`ConversionTracking`); o formulário dispara `quote_form_start` uma vez e `quote_whatsapp_open` só após validação.
- A URL do WhatsApp com `?text=` nunca vira parâmetro. Não usar a variável *Click URL* em tags do GA4 para links `wa.me`.

---

## 10. Search Console e indexação (Etapa 05B, sem alterações)

Auditoria do domínio em 15/10/2026:

| Item | Situação |
| --- | --- |
| `robots.txt` | `User-Agent: * / Disallow: /` |
| Meta robots | `noindex, nofollow` em todas as páginas |
| Cabeçalho `X-Robots-Tag` | ausente |
| `sitemap.xml` | vazio (`NEXT_PUBLIC_SITE_URL` não configurada na Vercel) |
| Canonicals | não emitidos (mesmo motivo) |
| Redirecionamentos | apex → `www` (308); `/produtos/<slug>` → `/produtos#<slug>` (308, preserva parâmetros); slug inexistente → 404 |
| Catálogo / institucionais | 200, 1 H1 por página, links internos válidos |

Propriedade no Search Console: **não verificada nesta etapa** (sem acesso às contas). Nenhum registro DNS foi criado.

### Particularidade: `Disallow: /` + `noindex`

Pela documentação do Google (*Block Search indexing with noindex*): para a regra `noindex` funcionar, a página **não pode estar bloqueada no robots.txt** — se o rastreador não acessa a página, ele não lê o `noindex`. Uma URL bloqueada ainda pode aparecer nos resultados (sem descrição) se houver links externos para ela.

**Correção recomendada (aguardando aprovação; não aplicada):**

1. Enquanto `NEXT_PUBLIC_SITE_INDEXABLE` não for `true`, `robots.txt` passa a permitir o rastreamento (`Allow: /`, sem sitemap).
2. Manter a meta `noindex, nofollow` e adicionar o cabeçalho `X-Robots-Tag: noindex, nofollow` em todas as respostas (via `headers()` no `next.config.ts`, condicionado à mesma variável).
3. No lançamento: `NEXT_PUBLIC_SITE_URL=https://www.mineradoraberte.com.br` e `NEXT_PUBLIC_SITE_INDEXABLE=true` (remove o `noindex`, libera robots e sitemap, ativa canonicals).

### Verificação da propriedade (antes do lançamento, sem pedir indexação)

- **Recomendado:** propriedade de **domínio** com registro TXT no DNS (exige autorização para alterar o DNS).
- **Alternativa sem DNS:** propriedade de prefixo de URL com meta tag — cadastrar o código em `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` na Vercel e fazer deploy (o site já emite a meta `google-site-verification` quando a variável existe).
- Não enviar sitemap nem solicitar indexação durante os testes.

---


## 11. Privacidade e LGPD

A Política de Privacidade (`/politica-de-privacidade`) descreve: coleta com cookies só após autorização; **sinais limitados sem cookies** enviados ao Google mesmo sem autorização (página, ocorrência de ação, estado do consentimento e dados técnicos da conexão, como IP); finalidades (estatísticas, modelagem); publicidade ainda não ativa; como revisar preferências.

**Revisão jurídica necessária** antes do lançamento: no modo avançado há transmissão de dados ao Google sem consentimento (pings sem cookies, incluindo o IP inerente à conexão). A base legal para esse tratamento (ex.: legítimo interesse, com teste de balanceamento) e a transparência do aviso precisam ser avaliadas por um profissional. Esta implementação **não** garante conformidade com a LGPD por si só.

## 12. Pendências

1. **GTM:** variáveis, Google tag **sem** consentimento adicional, acionadores e tags de evento (seção 5); testar (seção 7) e publicar.
2. **GA4:** medição otimizada, dimensões personalizadas, identidade dos relatórios, retenção.
3. **Revisão jurídica** do modo avançado, da Política e do aviso (seção 11).
4. **Google Ads:** conta, validação dos eventos e da qualidade dos contatos, escolha das conversões (seção 8).
5. Search Console e `robots.txt` (seção 10) — aguardando aprovação.
6. Futuro: CRM com confirmação real de orçamento/venda.
