# Mineradora Berté — Mensuração (GTM, GA4, consentimento)

Situação em 23/10/2026 (Etapa 07): **GTM integrado no site, condicionado ao consentimento.** O container `GTM-WQZ8BXHF` está publicado (versão 1) mas **vazio** — nenhuma tag, acionador ou variável. Portanto o **GA4 ainda não coleta dados**: a Google tag precisa ser criada e publicada no painel (seção 4). Nenhuma tag do Google Ads existe.

---

## 1. Identificadores

| Item | Valor | Onde fica |
| --- | --- | --- |
| Google Tag Manager | `GTM-WQZ8BXHF` | `NEXT_PUBLIC_GTM_ID` em `.env.production` (versionado; é um ID público). Uma variável com o mesmo nome no painel da Vercel tem precedência. |
| GA4 Measurement ID | `G-LRVXNPM6ZG` | **Somente dentro do GTM** (Google tag). Não aparece no código do site. |
| Google Ads | — | Não instalado. Ver seção 8. |

Sem `NEXT_PUBLIC_GTM_ID` (ou com valor fora do formato `GTM-…`), o site não carrega o container, não mostra o aviso e não cria `window.dataLayer`. Para desativar: apagar a linha do `.env.production` (ou definir a variável vazia na Vercel) e fazer deploy — a variável é lida no build.

---

## 2. Arquitetura

Nenhuma biblioteca extra: `next/script` + camada de dados própria.

| Arquivo | Função |
| --- | --- |
| `src/lib/analytics.ts` | ID do container, tipos e envio dos eventos (`track`), comandos de consentimento, limpeza de cookies |
| `src/components/analytics/ConsentManager.tsx` | Aviso de consentimento + carregamento do container (uma única `<Script id="gtm">`, no layout raiz) |
| `src/components/analytics/ConsentPreferencesButton.tsx` | "Preferências de privacidade" (rodapé e Política) |
| `src/components/layout/ConversionTracking.tsx` | Um listener de clique delegado: `tel:`, `wa.me` e orçamento do catálogo |
| `src/components/quote/QuoteForm.tsx` | `quote_form_start` e `quote_whatsapp_open` |

### Consent Mode v2 **básico**

- Antes da autorização: o GTM **não é baixado**, `window.dataLayer` não existe, `track()` não faz nada. Nenhuma requisição ao Google, nenhum cookie.
- Ao autorizar (análise e/ou publicidade), nesta ordem:

```js
gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' })
gtag('set', 'ads_data_redaction', true)
gtag('consent', 'update', { /* conforme a escolha */ })
dataLayer.push({ 'gtm.start': <timestamp>, event: 'gtm.js' })
// só então: <script src="https://www.googletagmanager.com/gtm.js?id=GTM-WQZ8BXHF">
```

- Mapeamento: **Análise** → `analytics_storage`; **Publicidade** → `ad_storage`, `ad_user_data`, `ad_personalization`.
- Mais autorização depois (ex.: Recusar → Aceitar): `consent update` e carga do container, sem recarregar.
- **Revogação** (qualquer finalidade passa de concedida para negada): `consent update` negado, remoção dos cookies da finalidade (`_ga`, `_ga_*` para análise; `_gcl_*` para publicidade, no host e no domínio raiz) e **recarga da página**. Na recarga, o container só volta se ainda houver alguma finalidade autorizada — assim nenhuma tag já carregada continua enviando dados.
- Escolha guardada em `localStorage` (`berte-consent-v1`: `analytics`, `ads`, `updatedAt`). Nada mais é armazenado pelo site.
- Nenhum HTML personalizado no GTM manipula consentimento: o estado é definido pelo site, antes do container.

### Aviso

Compacto, paleta da marca (navy `#29375F`, basalto `#5B626D`). **Recusar** · **Aceitar** · **Personalizar preferências** (Análise e Publicidade separadas, **desmarcadas**) → **Salvar escolhas**. No celular fica acima da barra fixa "Solicitar orçamento / WhatsApp" (sobe com `transform`, sem layout shift) e não cobre o cabeçalho; no desktop, canto inferior direito. O site funciona normalmente com o aviso aberto ou recusado.

### Scripts carregados

| Situação | Scripts do Google |
| --- | --- |
| Primeira visita (sem escolha) | nenhum |
| Recusou | nenhum |
| Autorizou análise e/ou publicidade | `gtm.js?id=GTM-WQZ8BXHF`, **uma vez**; o restante depende das tags publicadas no container |
| Revogou tudo | nenhum (após a recarga) |

---

## 3. Camada de dados — eventos

`dataLayer.push({ event, ...parâmetros })`, um push por interação real. Nenhum dado pessoal: nome, telefone digitado, endereço, observações e texto/URL da mensagem do WhatsApp **nunca** entram no `dataLayer`.

| Evento | Quando | Parâmetros |
| --- | --- | --- |
| `phone_click` | clique em link `tel:` da empresa | `contact_type`, `placement`, `page_path` |
| `whatsapp_click` | clique em link direto `wa.me` da empresa | `contact_type`, `placement`, `page_path` |
| `product_quote_click` | "Solicitar orçamento" de um material no catálogo | `product`, `placement`, `page_path` |
| `quote_form_start` | primeira interação com o formulário (uma vez por carregamento do formulário) | `form_name`, `product` (pré-selecionado ou vazio), `page_path` |
| `quote_whatsapp_open` | formulário **validado** tentou abrir o WhatsApp principal | `form_name`, `product`, `supply_mode`, `quantity_unit`, `contact_type`, `page_path` |

Valores:

- `contact_type`: `principal` ((49) 98409-3337) ou `secundario` ((49) 99180-1200) — a função, nunca o número.
- `placement`: `header`, `mobile_menu`, `hero`, `quality`, `final_cta`, `footer`, `mobile_bar`, `contact_aside`, `catalog`, `regions_cta`, `page_hero`, `quote_form` ou `content`.
- `product`: `brita-1`, `pedrisco`, `po-de-brita`, `brita-2`, `bica-corrida`, `areia-industrial`, `areia-natural`, `rachaozinho-primario`, `rachao-mina`, `rachao-mataco`.
- `supply_mode`: `entrega` | `retirada`. `quantity_unit`: `tonelada` | `m3`. `form_name`: `orcamento`.

**Nenhum evento é venda ou pedido recebido.** `quote_whatsapp_open` = o visitante validou o formulário e tentou abrir o WhatsApp; a mensagem pode não ter sido enviada. Não existem (e não devem ser criados) `purchase`, `generate_lead` como confirmação de pedido ou `quote_submit_success` — sem backend com confirmação real, não há evento de pedido recebido.

Os parâmetros foram renomeados na Etapa 07 (`product_slug` → `product`, `link_location` → `placement`, `contact_line` → `contact_type`) e o evento reservado `quote_submitted` foi removido. Como o container estava vazio, nada configurado foi afetado.

---

## 4. Configuração manual no GTM (pendente)

1. **Admin → Configurações do container → Ativar visão geral do consentimento.**
2. **Variáveis → Variáveis da camada de dados** (versão 2), cada uma com o nome igual à chave: `page_path`, `product`, `placement`, `contact_type`, `supply_mode`, `quantity_unit`, `form_name`. (Prefixo sugerido no nome da variável: `DLV - product` etc.)
3. **Tag "GA4 - Google tag"**: tipo *Google tag*, ID `G-LRVXNPM6ZG`, acionador **Initialization – All Pages**. Em *Configurações avançadas → Configurações de consentimento*: **Exigir consentimento adicional → `analytics_storage`**. ⚠️ Obrigatório: o container também carrega quando o visitante autoriza só Publicidade; sem essa exigência a Google tag executaria com análise negada (pings sem cookies), o que contraria o modo básico.
4. **Acionadores** (*Evento personalizado*, "Todos os eventos personalizados"), um por evento, com o nome exato: `phone_click`, `whatsapp_click`, `product_quote_click`, `quote_form_start`, `quote_whatsapp_open`. (Alternativa: um único acionador com regex `^(phone_click|whatsapp_click|product_quote_click|quote_form_start|quote_whatsapp_open)$` e nome do evento `{{Event}}`.)
5. **Tags "GA4 - <evento>"**: tipo *Google Analytics: evento do GA4*, ID de medição `G-LRVXNPM6ZG`, nome do evento = nome do acionador, parâmetros do evento conforme a seção 3 (ex.: `product` = `{{DLV - product}}`). Consentimento adicional: `analytics_storage`.
6. **Não criar**: tag de `page_view` manual, acionador *Alteração no histórico* para page_view, HTML personalizado de consentimento, tags do Google Ads (nesta etapa).
7. **Visualizar** (Tag Assistant) e testar (seção 6) → só então **Enviar/Publicar** a versão.

### GA4 (propriedade `G-LRVXNPM6ZG`)

- Fluxo de dados Web `https://www.mineradoraberte.com.br`; **Medição otimizada** ativa com *Visualizações de página → alterações de página baseadas em eventos do histórico do navegador* **ligada**.
- Dimensões personalizadas (escopo de evento): `product`, `placement`, `contact_type`, `supply_mode`, `quantity_unit`, `form_name`. (`page_path` já é coberto pelas dimensões padrão; enviar como parâmetro é opcional.)
- Não marcar como evento-chave o evento automático `click` (cliques de saída): `whatsapp_click` já mede o WhatsApp. Eventos-chave só após aprovação da estratégia (seção 8).
- Retenção de dados conforme a política aprovada; fuso America/Sao_Paulo, moeda BRL.

---

## 5. page_view e navegação do Next.js

- O site **não envia `page_view` próprio**. A Google tag envia o do carregamento e a medição otimizada envia os das navegações internas.
- Teste (23/10/2026, build de produção): cada navegação client-side gera **exatamente um `history.pushState` com mudança de URL** e nenhum `replaceState` na mesma URL — Home → Produtos (1), Produtos → Contato (1), Contato → Home (1). Com a medição otimizada por histórico, isso corresponde a **um `page_view` por navegação**. O container não é recarregado na navegação (1 script `gtm.js` durante toda a sessão).
- Âncoras do catálogo (`/produtos#brita-1`) mudam só o fragmento; o GA4 não conta mudança de fragmento como nova página (comportamento desejado).
- **Ainda não confirmado com o GA4 real** (a Google tag não existe no container): validar no Tag Assistant/DebugView que cada navegação gera um único `page_view`.

---

## 6. Testes

### Realizados em 23/10/2026 — build de produção local com `GTM-WQZ8BXHF` (container real, vazio), Chrome headless via DevTools Protocol

| Cenário | Resultado |
| --- | --- |
| **A. Primeiro acesso** | Aviso exibido; `dataLayer` inexistente; **0 requisições** ao Google; 0 cookies; clique em telefone não gera evento; "Personalizar" mostra as duas opções desmarcadas |
| **C. Recusar** | Escolha salva; aviso não reaparece ao recarregar; 0 requisições; 0 cookies; telefone e WhatsApp continuam clicáveis |
| **B. Aceitar** (reabrindo pelo rodapé) | `gtm.js` solicitado **uma vez**, 1 script no DOM; ordem: default negado → `ads_data_redaction` → update concedido → `gtm.js`; `phone_click` e `whatsapp_click` (principal e secundário) com 1 evento por clique |
| **F. Navegação** | Home → Produtos → Contato (via catálogo) → Home: 1 `pushState` por navegação, container não recarregado, `dataLayer` preservado, `product_quote_click` com `product: brita-1`, `placement: catalog` |
| **Formulário** | `quote_form_start` uma vez; envio inválido não dispara nada e destaca Unidade/Modalidade; envio válido → 1 `quote_whatsapp_open` (`product`, `supply_mode`, `quantity_unit`); nome, telefone e observações **ausentes** do `dataLayer` |
| **D. Alterar** (desmarcar Publicidade) | Recarga; `update` com análise concedida e anúncios negados; cookie `_gcl_au` removido, `_ga` mantido; 1 `gtm.js` |
| **D2. Retirar tudo** | Recarga; 0 scripts, `dataLayer` inexistente, cookies `_ga` removidos, 0 requisições |
| **E. Recarregar** com escolha salva | Estado restaurado sem aviso; ordem de inicialização correta |

Também: lint, `tsc --noEmit` e build sem erros; 360/390/768/1024/1440/1920 px sem overflow e com CLS 0 (Home e /produtos, com o aviso aberto).

### Não realizado (depende da configuração no GTM)

Tag Assistant, DebugView, relatórios em tempo real, cookies `_ga` gravados de fato e hits `g/collect`. **A propriedade não está coletando dados** até a Google tag ser publicada.

### Roteiro após configurar o GTM

1. GTM → **Visualizar** com `https://www.mineradoraberte.com.br/` (Tag Assistant).
2. Antes de responder ao aviso: nenhuma tag no Tag Assistant (o container nem carrega — o Tag Assistant pode mostrar "não encontrado" até autorizar; é esperado).
3. **Aceitar** → aba *Consentimento*: default negado, update concedido; *Tags*: "GA4 - Google tag" disparada.
4. Clicar telefone, WhatsApp principal e secundário, orçamento do catálogo; preencher o formulário com dados fictícios e validar (**não enviar** a mensagem no WhatsApp). Cada ação = 1 tag de evento disparada.
5. GA4 → **Admin → DebugView** (o modo de visualização do GTM ativa o `debug_mode`): eventos com parâmetros; navegar Home → Produtos → Contato → Home e conferir **um** `page_view` por página.
6. GA4 → **Relatórios → Tempo real**: usuário ativo e eventos.
7. Testar **Recusar** e **Personalizar → só Publicidade**: a Google tag **não** deve disparar.
8. Publicar a versão do container.

---

## 7. Cuidados contra duplicação

- Um único container, carregado só pelo `ConsentManager` (layout raiz). Não instalar GTM ou `gtag.js` em outro lugar (nem por integração da Vercel, plugin ou script do GA4).
- Não criar segunda Google tag com `G-LRVXNPM6ZG` nem tag de `page_view` manual no GTM.
- Um evento por interação: o listener de cliques é único e delegado; o formulário dispara `quote_form_start` uma vez e `quote_whatsapp_open` só após validação.
- A URL do WhatsApp com a mensagem preenchida nunca é enviada como parâmetro. Desativar no GTM qualquer variável de "Click URL" em tags do GA4 para links `wa.me` com `?text=`.
- UTMs e `gclid` são preservados pelos redirecionamentos (apex → `www`, `/produtos/<slug>` → `/produtos#<slug>`) e lidos pela Google tag na página de entrada. O site não guarda parâmetros de campanha.

## 8. Google Ads — estratégia de conversões (proposta, NÃO ativada)

Campanha de Pesquisa com dois grupos — **01 Brita** e **02 Areia** — ambos com URL final `https://www.mineradoraberte.com.br/`. Nenhuma campanha, grupo ou conversão foi criado nesta etapa.

| Ação | Fonte | Classificação proposta | Contagem |
| --- | --- | --- | --- |
| `quote_whatsapp_open` | GA4 importado | **Primária** (lead qualificado: formulário validado) | Uma por clique |
| `whatsapp_click` (`contact_type = principal`) | GA4 importado | **Primária** | Uma por clique |
| `phone_click` (`contact_type = principal`) | GA4 importado | **Primária** | Uma por clique |
| `whatsapp_click` / `phone_click` secundário | GA4 importado | Secundária | Uma |
| `product_quote_click`, `quote_form_start` | GA4 importado | Secundária (observação) | Uma |
| Orçamento/venda confirmados no CRM | Importação offline (gclid) | **Futura primária**, substituindo as de intenção | — |

Regras para não duplicar:

- Escolher **uma** fonte por ação: ou importar o evento do GA4, ou criar a tag nativa do Google Ads no GTM — nunca as duas como primárias.
- Como `quote_whatsapp_open` sempre vem depois de interações no formulário, não usar `quote_form_start` como primária.
- Todas as conversões de intenção devem ter valor simbólico (ou nenhum) — não representam receita.
- Quando existir confirmação real (CRM), rebaixar as conversões de intenção para secundárias.

Atribuição:

- O site preserva UTMs e `gclid` em redirecionamentos (domínio sem `www` → `www` e `/produtos/<slug>` → `/produtos#<slug>`; testado em 15/10/2026).
- Ativar a **marcação automática** (auto-tagging) no Google Ads.
- Não colocar dados pessoais em URLs. O site não guarda parâmetros de campanha.

---


**Limitação do modo básico:** se o visitante chega por um anúncio (`gclid`) e só autoriza depois de navegar para outra página, o `gclid` não está mais na URL e aquele clique pode não ser atribuído. O modo avançado (pings sem cookies, `url_passthrough`) reduz a perda, mas carrega o Google antes do consentimento — decisão jurídica.

## 9. Search Console e indexação (Etapa 05B, sem alterações)

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


## 10. Pendências

1. **GTM:** criar variáveis, Google tag, acionadores e tags de evento (seção 4), testar (seção 6) e publicar.
2. **GA4:** medição otimizada, dimensões personalizadas, retenção, eventos-chave após aprovação.
3. **Revisão jurídica** da Política de Privacidade e do aviso de consentimento antes do lançamento.
4. **Google Ads:** conta, aprovação da estratégia (seção 8), Conversion Linker/importação — etapa futura.
5. Search Console e correção do `robots.txt` (seção 9) — aguardando aprovação.
6. Futuro: CRM com confirmação real de orçamento/venda.
