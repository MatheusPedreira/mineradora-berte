/**
 * Eventos de conversão. Os dados vão para `window.dataLayer` somente se uma tag
 * (Google Tag Manager / GA4 / Google Ads) estiver instalada e tiver criado o array.
 * Sem a tag, nada é registrado nem enviado. Nenhum ID de rastreamento fica no código.
 *
 * - phone_click: clique em link tel: (número da empresa e página)
 * - whatsapp_click: clique em link direto do WhatsApp ("principal" ou "secundario" e página)
 * - product_quote_click: "Solicitar orçamento" de um material no catálogo (slug e página)
 * - quote_form_start: primeira interação com o formulário de orçamento
 * - quote_whatsapp_open: formulário validado tentou abrir o WhatsApp com a mensagem pronta.
 *   Não é venda nem pedido recebido: não há como saber se o cliente enviou a mensagem.
 * - quote_submitted: reservado para um pedido recebido de fato (exige backend com confirmação real).
 *   Não é disparado em nenhum ponto do site.
 *
 * Nunca enviar dados pessoais (nome, telefone, endereço, mensagem) nos parâmetros.
 */
export type AnalyticsEvent =
  | "phone_click"
  | "whatsapp_click"
  | "product_quote_click"
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
