/**
 * Campos do pedido de cotação. Usados hoje como roteiro para o contato telefônico
 * e, quando houver canal de recebimento (company.quoteEndpoint), como schema do formulário.
 */
export type QuoteField = {
  name: string;
  label: string;
  type: "text" | "tel" | "select" | "number" | "radio" | "textarea";
  options?: string[];
  required?: boolean;
};

export const quoteFields: QuoteField[] = [
  { name: "nome", label: "Nome", type: "text", required: true },
  { name: "telefone", label: "Telefone", type: "tel", required: true },
  { name: "produto", label: "Produto", type: "select", required: true },
  { name: "quantidade", label: "Quantidade", type: "number", required: true },
  { name: "unidade", label: "Unidade", type: "radio", options: ["Tonelada", "m³"], required: true },
  { name: "modalidade", label: "Modalidade", type: "radio", options: ["Entrega", "Retirada"], required: true },
  { name: "local", label: "Cidade ou endereço de entrega", type: "text" },
  { name: "observacoes", label: "Observações", type: "textarea" },
];
