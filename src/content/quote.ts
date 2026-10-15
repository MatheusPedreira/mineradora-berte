import { company } from "./company";
import { getProduct } from "./products";

/**
 * Pedido de orçamento. O site não envia nem armazena o pedido: o formulário monta a
 * mensagem e abre o WhatsApp principal (`company.whatsapp.primary`) para o cliente
 * revisar e enviar. Abrir o WhatsApp não garante que a mensagem foi enviada.
 */
export type QuoteUnit = "tonelada" | "m3";
export type QuoteMode = "entrega" | "retirada";

export type QuoteData = {
  material: string;
  quantidade: string;
  unidade: QuoteUnit | "";
  modalidade: QuoteMode | "";
  cidade: string;
  outraCidade: string;
  endereco: string;
  nome: string;
  telefone: string;
  observacoes: string;
};

export const OTHER_CITY = "outra";

export const unitLabels: Record<QuoteUnit, string> = { tonelada: "Toneladas", m3: "m³" };
export const modeLabels: Record<QuoteMode, string> = { entrega: "Entrega", retirada: "Retirada na mineradora" };

export function emptyQuote(material = ""): QuoteData {
  return {
    material,
    quantidade: "",
    unidade: "",
    modalidade: "",
    cidade: "",
    outraCidade: "",
    endereco: "",
    nome: "",
    telefone: "",
    observacoes: "",
  };
}

export type QuoteErrors = Partial<Record<keyof QuoteData, string>>;

export function validateQuote(q: QuoteData): QuoteErrors {
  const errors: QuoteErrors = {};
  if (!getProduct(q.material)) errors.material = "Selecione o material.";
  if (!/^\d+([.,]\d+)?$/.test(q.quantidade.trim()) || Number(q.quantidade.replace(",", ".")) <= 0)
    errors.quantidade = "Informe a quantidade.";
  if (!q.unidade) errors.unidade = "Escolha toneladas ou m³.";
  if (!q.modalidade) errors.modalidade = "Escolha entrega ou retirada.";
  if (q.modalidade === "entrega" && !q.cidade) errors.cidade = "Selecione a cidade de entrega.";
  if (q.modalidade === "entrega" && q.cidade === OTHER_CITY && !q.outraCidade.trim())
    errors.outraCidade = "Informe a cidade.";
  if (!q.nome.trim()) errors.nome = "Informe seu nome.";
  if (q.telefone.replace(/\D/g, "").length < 10) errors.telefone = "Informe um telefone com DDD.";
  return errors;
}

type QuoteLine = { label: string; value: string; group: "pedido" | "dados" | "obs" };

function quantityText(q: QuoteData) {
  if (!q.quantidade || !q.unidade) return "";
  const qty = q.quantidade.trim();
  if (q.unidade === "m3") return `${qty} m³`;
  return `${qty} ${Number(qty.replace(",", ".")) === 1 ? "tonelada" : "toneladas"}`;
}

/** Linhas do pedido (resumo na tela e mensagem do WhatsApp). Campos vazios são omitidos. */
export function quoteLines(q: QuoteData): QuoteLine[] {
  const product = getProduct(q.material);
  const city = q.cidade === OTHER_CITY ? q.outraCidade.trim() : q.cidade;
  const lines: QuoteLine[] = [
    { label: "Material", value: product?.name ?? "", group: "pedido" },
    { label: "Quantidade", value: quantityText(q), group: "pedido" },
    { label: "Modalidade", value: q.modalidade ? modeLabels[q.modalidade] : "", group: "pedido" },
    { label: "Cidade", value: q.modalidade === "entrega" ? city : "", group: "pedido" },
    { label: "Endereço/referência", value: q.modalidade === "entrega" ? q.endereco.trim() : "", group: "pedido" },
    { label: "Nome", value: q.nome.trim(), group: "dados" },
    { label: "Telefone", value: q.telefone.trim(), group: "dados" },
    { label: "Observações", value: q.observacoes.trim(), group: "obs" },
  ];
  return lines.filter((l) => l.value);
}

/** Link wa.me com mensagem opcional, sempre codificada. `number`: só dígitos, com DDI. */
export function whatsappUrl(number: string, text?: string) {
  const base = `https://wa.me/${number.replace(/\D/g, "")}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/** "Falar no WhatsApp": conversa direta com o WhatsApp principal. */
export const whatsappDirectHref = whatsappUrl(company.whatsapp.primary.number, company.whatsapp.directMessage);

/** Contato alternativo (somente /contato e rodapé). */
export const whatsappSecondaryHref = whatsappUrl(company.whatsapp.secondary.number, company.whatsapp.directMessage);

/** Mensagem do pedido, no modelo aprovado. Campos vazios não aparecem. */
export function quoteMessage(q: QuoteData) {
  const lines = quoteLines(q);
  const block = (group: QuoteLine["group"]) =>
    lines.filter((l) => l.group === group).map((l) => `*${l.label}:* ${l.value}`);
  const obs = block("obs");
  return [
    `Olá! Gostaria de solicitar um orçamento na ${company.name}.`,
    "",
    "*Dados do pedido*",
    "",
    ...block("pedido"),
    "",
    "*Meus dados*",
    "",
    ...block("dados"),
    ...(obs.length ? ["", ...obs] : []),
    "",
    "Aguardo o retorno com as condições de fornecimento. Obrigado!",
  ].join("\n");
}

/** Pedido completo para o WhatsApp principal (usar somente após `validateQuote`). */
export function whatsappQuoteUrl(q: QuoteData) {
  return whatsappUrl(company.whatsapp.primary.number, quoteMessage(q));
}

/** Máscara simples para telefone brasileiro: (49) 99999-9999. */
export function formatPhone(value: string) {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}
