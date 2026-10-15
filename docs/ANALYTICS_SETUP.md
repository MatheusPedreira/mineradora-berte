# Mineradora Berté — Mensuração (GTM, GA4, Google Ads, Search Console)

Situação em 15/10/2026 (Etapa 05B): **infraestrutura pronta e desativada**. Nenhum ID real foi fornecido, então nenhum script de análise ou publicidade é carregado no site, nenhum aviso de cookies aparece e nada é coletado.

---

## 1. IDs e acessos necessários

| Item | Formato | Onde entra | Situação |
| --- | --- | --- | --- |
| Container do Google Tag Manager | `GTM-XXXXXXX` | Variável `NEXT_PUBLIC_GTM_ID` na Vercel (Production) | **Pendente** |
| Measurement ID do GA4 | `G-XXXXXXXXXX` | Somente dentro do GTM (Google tag) | **Pendente** |
| Conta do Google Ads | `123-456-7890` + ID/rótulo de conversão | Somente dentro do GTM ou importado do GA4 | **Pendente** |
| Search Console | propriedade de domínio (DNS) ou meta tag | DNS do domínio **ou** `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | **Pendente** |

Nenhum desses valores fica no código. Valores fora do formato `GTM-` são ignorados.

---

## 2. Como o site carrega o GTM

- `src/lib/analytics.ts` — lê `NEXT_PUBLIC_GTM_ID`, define os eventos e os comandos de consentimento.
- `src/components/analytics/ConsentManager.tsx` — aviso de cookies + carregamento do container (`next/script`, `https://www.googletagmanager.com/gtm.js?id=...`).
- `src/components/analytics/ConsentPreferencesButton.tsx` — "Preferências de cookies" no rodapé e na Política de Privacidade.
- `src/components/layout/ConversionTracking.tsx` — um listener de clique delegado para `tel:`, `wa.me` e orçamento do catálogo.

Regras:

1. **Sem `NEXT_PUBLIC_GTM_ID`**: nada é renderizado (sem aviso, sem script, sem `window.dataLayer`).
2. **Com o ID**: o aviso aparece na primeira visita. O container **só é baixado depois** que o visitante autoriza análise e/ou publicidade (Consent Mode v2 **básico**). Ao recusar, nada é carregado e o site funciona normalmente.
3. Um único container. O GA4 **não** é instalado diretamente no site (apenas pelo GTM). O site **não** envia `page_view` manual (ver 4.3).

Ordem enviada ao `dataLayer` no momento da autorização:

```js
gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' })
gtag('set', 'ads_data_redaction', true)
gtag('consent', 'update', { /* conforme a escolha */ })
dataLayer.push({ 'gtm.start': <timestamp>, event: 'gtm.js' })
```

Para ativar: cadastrar `NEXT_PUBLIC_GTM_ID` na Vercel e fazer um novo deploy (a variável é lida no build).

---

## 3. Camada de dados (eventos existentes)

Todos via `dataLayer.push({ event, ...parâmetros })`, um evento por ação, **sem dados pessoais** (nome, telefone digitado, endereço, observações e texto da mensagem nunca são enviados).

| Evento | Quando | Parâmetros |
| --- | --- | --- |
| `phone_click` | clique em link `tel:` da empresa | `contact_line`, `link_location`, `page_path` |
| `whatsapp_click` | clique em link direto `wa.me` | `contact_line`, `link_location`, `page_path` |
| `product_quote_click` | "Solicitar orçamento" de um material no catálogo | `product_slug`, `link_location`, `page_path` |
| `quote_form_start` | primeira interação com o formulário | `form_name`, `product_slug` (pré-selecionado ou vazio), `page_path` |
| `quote_whatsapp_open` | formulário **validado** tentou abrir o WhatsApp principal | `form_name`, `product_slug`, `supply_mode`, `quantity_unit`, `contact_line`, `page_path` |
| `quote_submitted` | **reservado** — não é disparado (exige backend com confirmação real) | — |

Valores:

- `contact_line`: `principal` (49 98409-3337) ou `secundario` (49 99180-1200) — só a função, nunca o número.
- `link_location`: `header`, `mobile_menu`, `hero`, `quality`, `final_cta`, `footer`, `mobile_bar`, `contact_aside`, `catalog`, `regions_cta`, `page_hero`, `quote_form` (link "Abrir novamente" após o envio) ou `content`.
- `product_slug`: `brita-1`, `pedrisco`, `po-de-brita`, `brita-2`, `bica-corrida`, `areia-industrial`, `areia-natural`, `rachaozinho-primario`, `rachao-mina`, `rachao-mataco`.
- `supply_mode`: `entrega` | `retirada`. `quantity_unit`: `tonelada` | `m3`.

`quote_whatsapp_open` é a **tentativa de abrir o WhatsApp** com o pedido pronto. Não significa mensagem enviada, orçamento recebido nem venda. `phone_click` e `whatsapp_click` também são intenção, não venda.

---

## 4. Configuração manual no Google

### 4.1 GA4

1. Criar (ou selecionar) a propriedade GA4 da Mineradora Berté, fuso America/Sao_Paulo, moeda BRL.
2. Criar um **fluxo de dados Web** para `https://www.mineradoraberte.com.br`.
3. Copiar o **Measurement ID** (`G-…`).
4. Em *Medição otimizada*, manter **Visualizações de página** com "alterações de página baseadas no histórico do navegador" (o site é Next.js; a navegação interna não recarrega a página).
5. Não marcar como evento-chave os eventos automáticos `click` (cliques de saída) — o `whatsapp_click` já mede o WhatsApp.
6. Criar dimensões personalizadas (escopo de evento): `contact_line`, `link_location`, `product_slug`, `supply_mode`, `quantity_unit`, `form_name`.
7. Retenção de dados: definir conforme a política aprovada.

### 4.2 GTM

1. Criar o container Web e copiar o ID (`GTM-…`).
2. **Configurações do container → Visão geral do consentimento**: ativar.
3. **Google tag** (GA4) com o Measurement ID, acionador *Initialization – All Pages*. Consentimento exigido: `analytics_storage`.
4. Variáveis da camada de dados: `contact_line`, `link_location`, `product_slug`, `supply_mode`, `quantity_unit`, `form_name`, `page_path`.
5. Acionadores *Evento personalizado* para `phone_click`, `whatsapp_click`, `product_quote_click`, `quote_form_start`, `quote_whatsapp_open`.
6. Uma tag **GA4 Event** por evento (nome do evento = nome do acionador), repassando os parâmetros acima.
7. Google Ads (quando houver conta): **Conversion Linker** em todas as páginas (exige `ad_storage`) e, se for usar tags nativas, *Google Ads Conversion Tracking* (exige `ad_storage` e `ad_user_data`). Ver seção 6 para não duplicar.
8. Publicar a versão somente depois dos testes da seção 7.

### 4.3 page_view

O `page_view` vem só da Google tag (carregamento) e da medição otimizada (navegação interna). O site não envia `page_view` próprio. Não criar outra tag de `page_view` no GTM.

---

## 5. Consentimento (Consent Mode v2 básico)

- Estado inicial: tudo **negado**. Antes da autorização o GTM não é baixado, então nenhuma tag do Google executa nem envia sinais.
- Aviso compacto no rodapé da tela (celular: acima da barra "Solicitar orçamento / WhatsApp", sem cobrir o WhatsApp; desktop: canto inferior direito).
- Opções: **Aceitar** (análise + publicidade), **Recusar**, **Preferências** (Análise e Publicidade separadas, **desmarcadas** por padrão) → **Salvar**.
- "Preferências de cookies" no rodapé e na Política de Privacidade reabre o aviso a qualquer momento. Revogar envia `consent update` negado; na página seguinte o container não é carregado.
- A escolha é guardada em `localStorage` (`berte-consent-v1`: `analytics`, `ads`, data) — necessário para não perguntar a cada página. Nada além disso é armazenado.
- Mapeamento: Análise → `analytics_storage`; Publicidade → `ad_storage`, `ad_user_data`, `ad_personalization`.
- A Política de Privacidade passa a descrever o GTM/GA4/Google Ads automaticamente quando `NEXT_PUBLIC_GTM_ID` estiver configurado (sem o ID, informa que não há ferramentas de análise).

**Limitação conhecida do modo básico:** se o visitante chega por um anúncio (`gclid`) e só autoriza depois de navegar para outra página, o `gclid` não está mais na URL e aquele clique pode não ser atribuído. O modo **avançado** (com pings sem cookies e `url_passthrough`) reduz essa perda, mas carrega o Google antes do consentimento — avaliar com o jurídico antes de adotar.

---

## 6. Estratégia de conversões (proposta para aprovação)

Campanha de Pesquisa com dois grupos — **01 Brita** e **02 Areia** — ambos com URL final `https://www.mineradoraberte.com.br/`. Nenhuma campanha, grupo ou conversão foi criado nesta etapa.

| Ação | Fonte | Classificação proposta | Contagem |
| --- | --- | --- | --- |
| `quote_whatsapp_open` | GA4 importado | **Primária** (lead qualificado: formulário validado) | Uma por clique |
| `whatsapp_click` (`contact_line = principal`) | GA4 importado | **Primária** | Uma por clique |
| `phone_click` (`contact_line = principal`) | GA4 importado | **Primária** | Uma por clique |
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

## 7. Testes

### Realizados em 15/10/2026 (sem IDs reais)

- Build oficial (sem `NEXT_PUBLIC_GTM_ID`): em `/`, `/produtos` e `/contato` não há aviso, não há script do GTM, `window.dataLayer` não existe e **nenhuma requisição externa** é feita, mesmo clicando em telefone, WhatsApp e catálogo.
- Build local temporária com o ID de teste `GTM-TESTE00` (não publicada; requisições ao Google bloqueadas no navegador de teste):
  - primeira visita: aviso exibido, nada carregado;
  - Preferências: caixas desmarcadas;
  - Recusar: nada carregado, escolha salva, aviso não reaparece;
  - reabrir pelo rodapé e autorizar só Análise: GTM solicitado somente após a escolha, com `consent default` negado → `update` (`analytics_storage: granted`, anúncios negados);
  - eventos com os parâmetros da seção 3 (catálogo, hero, barra do celular, rodapé, formulário), sem nome/telefone no `dataLayer`;
  - revogar: `consent update` negado;
  - celular: aviso acima da barra fixa, sem sobreposição.

**Não testado (exige IDs reais):** execução real do container, Tag Assistant, DebugView, `page_view` e relatórios em tempo real. Nenhum dado foi coletado.

### Roteiro ao receber os IDs

1. Cadastrar `NEXT_PUBLIC_GTM_ID` na Vercel e fazer deploy.
2. GTM → *Visualizar* (Tag Assistant) em `https://www.mineradoraberte.com.br/`.
3. Conferir: antes do aviso, nada carrega; **Recusar** → nenhuma tag; **Aceitar** → Google tag dispara com consentimento concedido.
4. Clicar em telefone, WhatsApp (principal e secundário), orçamento do catálogo, iniciar e validar o formulário (dados fictícios; **não enviar** a mensagem no WhatsApp).
5. GA4 → *DebugView*: eventos e parâmetros; *Tempo real*: `page_view` sem duplicidade ao navegar entre páginas.
6. Só então publicar a versão do container e marcar os eventos-chave.

---

## 8. Search Console e indexação

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

## 9. Pendências para ativar

1. Fornecer os IDs (GTM, GA4, Google Ads) e acesso de administrador às contas.
2. Aprovar a estratégia de conversões (seção 6) e o modo de consentimento (básico).
3. Revisão jurídica da Política de Privacidade e do aviso de cookies.
4. Configurar GA4 e GTM (seção 4), testar (seção 7) e publicar o container.
5. Aprovar a correção do `robots.txt` (seção 8) e decidir o método de verificação do Search Console.
6. Futuro: CRM com confirmação de orçamento/venda para importar conversões reais.
