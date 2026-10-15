/**
 * Camada de dados e Google Tag Manager (ver docs/ANALYTICS_SETUP.md).
 *
 * O GTM é o único gerenciador de tags: GA4 e Google Ads são configurados dentro do
 * container, nunca instalados direto no site. O container só carrega quando:
 * 1. NEXT_PUBLIC_GTM_ID tem um ID real (formato GTM-XXXXXXX); e
 * 2. o visitante autorizou análise e/ou publicidade (Consent Mode v2 básico).
 * Antes disso `window.dataLayer` não existe e `track` não registra nada.
 *
 * Eventos (nunca enviar nome, telefone digitado, endereço, observações ou a mensagem):
 * - phone_click: clique em link tel: da empresa
 * - whatsapp_click: clique em link direto do WhatsApp
 * - product_quote_click: "Solicitar orçamento" de um material no catálogo
 * - quote_form_start: primeira interação com o formulário de orçamento
 * - quote_whatsapp_open: formulário validado tentou abrir o WhatsApp com a mensagem pronta.
 *   Não é mensagem enviada, orçamento recebido nem venda.
 * - quote_submitted: reservado para um pedido recebido de fato (exige backend com
 *   confirmação real). Não é disparado em nenhum ponto do site.
 */

/** ID do container. Valores fora do formato oficial são ignorados (nenhum script é carregado). */
export const gtmId: string | null = /^GTM-[A-Z0-9]{4,}$/.test(process.env.NEXT_PUBLIC_GTM_ID?.trim() ?? "")
  ? process.env.NEXT_PUBLIC_GTM_ID!.trim()
  : null;

/** Função do número da empresa: nunca o número em si. */
export type ContactLine = "principal" | "secundario";

type EventParams = {
  phone_click: { contact_line: ContactLine; link_location: string; page_path: string };
  whatsapp_click: { contact_line: ContactLine; link_location: string; page_path: string };
  product_quote_click: { product_slug: string; link_location: string; page_path: string };
  quote_form_start: { form_name: "orcamento"; product_slug: string; page_path: string };
  quote_whatsapp_open: {
    form_name: "orcamento";
    product_slug: string;
    supply_mode: string;
    quantity_unit: string;
    contact_line: "principal";
    page_path: string;
  };
  quote_submitted: { form_name: "orcamento" };
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

/** Comandos de consentimento precisam ser enviados no formato `arguments` do gtag. */
function gtag(...args: unknown[]) {
  void args;
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer?.push(arguments);
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
 * Prepara a camada de dados para o GTM, já com a escolha do visitante:
 * padrão "negado" para tudo, seguido da atualização com o que foi autorizado.
 */
export function initTagManager(choice: ConsentChoice) {
  if (window.dataLayer) return;
  window.dataLayer = [];
  gtag("consent", "default", consentState({ analytics: false, ads: false }));
  gtag("set", "ads_data_redaction", true);
  gtag("consent", "update", consentState(choice));
  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
}

/** Alteração posterior das preferências, com o container já carregado. */
export function updateConsent(choice: ConsentChoice) {
  gtag("consent", "update", consentState(choice));
}
