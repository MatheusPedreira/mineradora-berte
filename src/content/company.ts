/**
 * Dados institucionais da Mineradora Berté.
 * Fonte única de verdade: somente informações confirmadas pela empresa.
 * Itens pendentes estão marcados com `null` ou `confirmed: false` e listados em docs/BRIEFING.md.
 */

export const company = {
  name: "Mineradora Berté",
  shortName: "Berté",
  tagline: "Areia, brita e agregados em Ponte Serrada, SC",

  /** Número único de telefone e WhatsApp (definido pelo cliente em 28/10/2026). */
  phone: {
    display: "(49) 99180-1200",
    href: "tel:+5549991801200",
    e164: "+55-49-99180-1200",
  },

  /**
   * WhatsApp comercial: recebe o formulário de orçamento e os botões "Falar no WhatsApp".
   * `number`: formato internacional, só dígitos, usado no link wa.me.
   */
  whatsapp: {
    primary: { display: "(49) 99180-1200", number: "5549991801200" },
    directMessage:
      "Olá! Vim pelo site da Mineradora Berté e gostaria de consultar um orçamento de materiais para construção.",
  },

  /** Canal de recebimento do formulário de cotação. `null` = formulário desativado. */
  quoteEndpoint: null as string | null,

  address: {
    plusCode: "42M9+Q5",
    city: "Ponte Serrada",
    state: "SC",
    stateName: "Santa Catarina",
    postalCode: "89683-000",
    country: "BR",
  },

  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=42M9%2BQ5%20Ponte%20Serrada%2C%20SC",

  /** Mapa incorporado (Google Maps → Compartilhar → Incorporar um mapa). */
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.193927242629!2d-51.9820917!3d-26.865579099999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94e461e38e442c7b%3A0x34d79866da5dfaf1!2sMineradora%20Bert%C3%A9!5e0!3m2!1spt-BR!2sbr!4v1793379874018!5m2!1spt-BR!2sbr",

  salesUnits: ["tonelada", "metro cúbico (m³)"],

  supplyModes: [
    { id: "entrega", label: "Entrega", description: "Entrega do material com frota própria." },
    { id: "retirada", label: "Retirada", description: "Retirada pelo cliente na mineradora." },
  ],

  /** Redes sociais: preencher somente com links oficiais. */
  social: [] as { label: string; href: string }[],
} as const;

export const differentials = [
  {
    id: "basalto",
    title: "Qualidade do basalto",
    text: "Materiais produzidos a partir de basalto de alta qualidade.",
  },
  {
    id: "granulometria",
    title: "Granulometria padronizada",
    text: "Materiais fornecidos com granulometria padronizada.",
  },
  {
    id: "controle",
    title: "Controle tecnológico",
    text: "Produção acompanhada por controle tecnológico dos materiais.",
  },
  {
    id: "logistica",
    title: "Logística própria",
    text: "Frota própria, com agilidade e flexibilidade no fornecimento.",
  },
] as const;

export const fleet = ["Caminhões truck", "Caminhões 6x4", "Bitruck", "Carretas"] as const;

export type City = { name: string; confirmed: boolean; base?: boolean };

export const cities: City[] = [
  { name: "Ponte Serrada", confirmed: true, base: true },
  { name: "Vargeão", confirmed: true },
  { name: "Passos Maia", confirmed: true },
  { name: "Abelardo Luz", confirmed: true },
  { name: "Faxinal dos Guedes", confirmed: true },
  { name: "Xanxerê", confirmed: true },
  { name: "Irani", confirmed: true },
  { name: "Vargem Bonita", confirmed: true },
  { name: "Catanduvas", confirmed: true },
  // Pendente: confirmar se a cidade é Lindóia do Sul.
  { name: "Lindóia", confirmed: false },
];

/**
 * Documentos técnicos (fichas, laudos, ensaios) fornecidos pela empresa.
 * Manter vazio até o recebimento dos arquivos oficiais.
 */
export const technicalDocuments: { title: string; href: string }[] = [];
