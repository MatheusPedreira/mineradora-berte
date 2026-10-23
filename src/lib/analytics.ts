/**
 * Camada de dados e Google Tag Manager (ver docs/ANALYTICS_SETUP.md).
 *
 * O GTM é o único gerenciador de tags: GA4 e Google Ads são configurados dentro do
 * container, nunca instalados direto no site. Consent Mode v2 AVANÇADO: com
 * NEXT_PUBLIC_GTM_ID real (formato GTM-XXXXXXX), o container carrega em toda página,
 * com todos os estados negados por padrão (`gtmBootstrapScript`, no layout). A escolha
 * do visitante só concede o que ele autorizou; sem autorização, as tags do Google
 * funcionam no modo limitado, sem cookies. Os eventos entram no `dataLayer` com ou sem
 * escolha; o que cada tag faz com eles depende do consentimento.
 *
 * Eventos (nunca enviar nome, telefone digitado, endereço, observações ou a mensagem):
 * - phone_click: clique em link tel: da empresa
 * - whatsapp_click: clique em link direto do WhatsApp
 * - product_quote_click: "Solicitar orçamento" de um material no catálogo
 * - quote_form_start: primeira interação com o formulário de orçamento
 * - quote_whatsapp_open: formulário validado tentou abrir o WhatsApp com a mensagem pronta.
 *   Não é mensagem enviada, orçamento recebido nem venda. Sem confirmação real de envio,
 *   não existe evento de pedido recebido.
 *
 * Parâmetros: page_path, product (slug do catálogo), placement (onde fica o link),
 * contact_type (principal/secundario), supply_mode e quantity_unit.
 */

/** ID do container. Valores fora do formato oficial são ignorados (nenhum script é carregado). */
export const gtmId: string | null = /^GTM-[A-Z0-9]{4,}$/.test(process.env.NEXT_PUBLIC_GTM_ID?.trim() ?? "")
  ? process.env.NEXT_PUBLIC_GTM_ID!.trim()
  : null;

/** Função do número da empresa: nunca o número em si. */
export type ContactLine = "principal" | "secundario";

type EventParams = {
  phone_click: { contact_type: ContactLine; placement: string; page_path: string };
  whatsapp_click: { contact_type: ContactLine; placement: string; page_path: string };
  product_quote_click: { product: string; placement: string; page_path: string };
  quote_form_start: { form_name: "orcamento"; product: string; page_path: string };
  quote_whatsapp_open: {
    form_name: "orcamento";
    product: string;
    supply_mode: string;
    quantity_unit: string;
    contact_type: "principal";
    page_path: string;
  };
};

export type AnalyticsEvent = keyof EventParams;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function track<E extends AnalyticsEvent>(event: E, params: EventParams[E]) {
  if (typeof window === "undefined" || !window.dataLayer) return;
  window.dataLayer.push({ event, ...params });
}

/* ---------- Consentimento ---------- */

export type ConsentChoice = { analytics: boolean; ads: boolean };

export const noConsent: ConsentChoice = { analytics: false, ads: false };

/** A escolha precisa ser lembrada para não perguntar a cada página; nada além disso é guardado. */
const STORAGE_KEY = "berte-consent-v1";

export function readConsent(): ConsentChoice | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const v = JSON.parse(raw) as Partial<ConsentChoice>;
    return { analytics: v.analytics === true, ads: v.ads === true };
  } catch {
    return null;
  }
}

export function saveConsent(choice: ConsentChoice) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...choice, updatedAt: new Date().toISOString() }));
  } catch {
    // Sem armazenamento: a escolha vale só para esta página.
  }
}

function consentState({ analytics, ads }: ConsentChoice) {
  const ad = ads ? "granted" : "denied";
  return {
    analytics_storage: analytics ? "granted" : "denied",
    ad_storage: ad,
    ad_user_data: ad,
    ad_personalization: ad,
  };
}

/**
 * Script inline do layout (`beforeInteractive`): roda uma vez por carga de página, antes
 * da hidratação e de qualquer tag. Ordem: dataLayer → consent default negado →
 * ads_data_redaction → consent update com a escolha já salva (se houver) → gtm.js,
 * inserido uma única vez. Mesma leitura de `readConsent` (só `true` concede).
 */
export function gtmBootstrapScript(id: string) {
  const src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(id)}`;
  return `(function(){
var w=window,d=document;w.dataLayer=w.dataLayer||[];
function gtag(){w.dataLayer.push(arguments);}
gtag("consent","default",${JSON.stringify(consentState(noConsent))});
gtag("set","ads_data_redaction",true);
try{var c=JSON.parse(localStorage.getItem(${JSON.stringify(STORAGE_KEY)})||"null");
if(c&&typeof c==="object"){var a=c.analytics===true,p=c.ads===true;if(a||p){var g=function(b){return b?"granted":"denied"};
gtag("consent","update",{analytics_storage:g(a),ad_storage:g(p),ad_user_data:g(p),ad_personalization:g(p)});}}}catch(e){}
w.dataLayer.push({"gtm.start":Date.now(),event:"gtm.js"});
if(!d.querySelector("script[data-gtm-container]")){var s=d.createElement("script");s.async=true;s.src=${JSON.stringify(src)};s.setAttribute("data-gtm-container","");d.head.appendChild(s);}
})();`;
}

/** Comandos de consentimento precisam ser enviados no formato `arguments` do gtag. */
function gtag(...args: unknown[]) {
  void args;
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer?.push(arguments);
}

/** Cookies do Google por finalidade: GA4 (`_ga`, `_ga_<ID>`, `_gid`, `_gat`) e Ads (`_gcl_*`, `_gac_*`). */
const consentCookies = { analytics: /^(_ga(_|$)|_gid$|_gat)/, ads: /^(_gcl_|_gac_)/ };

/** Remove os cookies da finalidade revogada (no host e no domínio raiz, onde o GA4 os grava). */
function clearConsentCookies(revoked: ConsentChoice) {
  const host = window.location.hostname;
  const domains = [host, host.replace(/^www\./, "")].map((d) => `; domain=.${d}`);
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0].trim();
    const match = (revoked.analytics && consentCookies.analytics.test(name)) || (revoked.ads && consentCookies.ads.test(name));
    if (!match) continue;
    for (const domain of ["", ...domains]) {
      document.cookie = `${name}=; max-age=0; path=/${domain}`;
    }
  }
}

/**
 * Nova escolha com o container já carregado: `consent update` imediato, sem recarregar
 * (as tags do Google se adaptam ao novo estado). Na revogação, também apaga os cookies
 * já gravados da finalidade revogada; com o estado negado, as tags não gravam outros.
 */
export function applyConsent(previous: ConsentChoice, next: ConsentChoice) {
  if (previous.analytics === next.analytics && previous.ads === next.ads) return;
  gtag("consent", "update", consentState(next));
  clearConsentCookies({ analytics: previous.analytics && !next.analytics, ads: previous.ads && !next.ads });
}
