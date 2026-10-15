/**
 * Eventos de conversão. Os dados vão para `window.dataLayer` somente se uma tag
 * (Google Tag Manager / GA4 / Google Ads) estiver instalada e tiver criado o array.
 * Sem a tag, nada é registrado nem enviado. Nenhum ID de rastreamento fica no código.
 *
 * - phone_click: clique em link tel: (qualquer página)
 * - whatsapp_click: clique em link do WhatsApp (só existe após confirmação do número)
 * - quote_form_start: primeira interação com o formulário de orçamento
 * - quote_whatsapp_open: formulário válido abriu o WhatsApp com a mensagem pronta (não é venda)
 * - quote_submitted: pedido recebido de fato — usar apenas com confirmação real do canal de envio
 */
export type AnalyticsEvent =
  | "phone_click"
  | "whatsapp_click"
  | "quote_form_start"
  | "quote_whatsapp_open"
  | "quote_submitted";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(event: AnalyticsEvent, params: Record<string, string> = {}) {
  if (typeof window === "undefined" || !window.dataLayer) return;
  window.dataLayer.push({ event, ...params });
}
