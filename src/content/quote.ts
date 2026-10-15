import { company } from "./company";
import { getProduct } from "./products";

/**
 * Pedido de orçamento. O formulário só oferece envio quando houver um canal confirmado:
 * hoje, apenas o WhatsApp comercial (`company.whatsapp`), que abre a mensagem para o
 * cliente revisar e enviar. Sem canal confirmado, o formulário orienta o contato por telefone.
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

/** Linhas do pedido (resumo na tela e mensagem do WhatsApp). Campos vazios são omitidos. */
export function quoteLines(q: QuoteData): { label: string; value: string }[] {
  const product = getProduct(q.material);
  const city = q.cidade === OTHER_CITY ? q.outraCidade.trim() : q.cidade;
  const lines = [
    { label: "Material", value: product?.name ?? "" },
    { label: "Quantidade", value: q.quantidade && q.unidade ? `${q.quantidade.trim()} ${unitLabels[q.unidade]}` : "" },
    { label: "Fornecimento", value: q.modalidade ? modeLabels[q.modalidade] : "" },
    { label: "Cidade", value: q.modalidade === "entrega" ? city : "" },
    { label: "Endereço/referência", value: q.modalidade === "entrega" ? q.endereco.trim() : "" },
    { label: "Nome", value: q.nome.trim() },
    { label: "Telefone", value: q.telefone.trim() },
    { label: "Observações", value: q.observacoes.trim() },
  ];
  return lines.filter((l) => l.value);
}

/** Link do WhatsApp com a mensagem estruturada. `null` enquanto o número não for confirmado. */
export function whatsappQuoteUrl(q: QuoteData): string | null {
  if (!company.whatsapp) return null;
  const text = [
    `Olá! Gostaria de um orçamento com a ${company.name}.`,
    "",
    ...quoteLines(q).map((l) => `*${l.label}:* ${l.value}`),
  ].join("\n");
  return `https://wa.me/${company.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
}

/** Máscara simples para telefone brasileiro: (49) 99999-9999. */
export function formatPhone(value: string) {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}
