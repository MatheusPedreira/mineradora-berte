/**
 * Fotografias reais da Mineradora Berté.
 * `src: null` mantém a área reservada visível até o recebimento da foto.
 * Ao receber o arquivo, salve-o na pasta indicada em `slot` e preencha `src`.
 */
export type MediaAsset = {
  src: string | null;
  alt: string;
  /** Destino sugerido do arquivo em /public. */
  slot: string;
};

export const media = {
  heroDesktop: {
    src: null,
    alt: "Vista da área de operação da Mineradora Berté em Ponte Serrada, SC",
    slot: "/images/hero/hero-desktop.jpg",
  },
  heroMobile: {
    src: null,
    alt: "Vista da área de operação da Mineradora Berté em Ponte Serrada, SC",
    slot: "/images/hero/hero-mobile.jpg",
  },
  logistics: {
    src: null,
    alt: "Caminhão da frota própria da Mineradora Berté",
    slot: "/images/fleet/frota-principal.jpg",
  },
  quality: {
    src: null,
    alt: "Material britado na área de produção da Mineradora Berté",
    slot: "/images/operations/producao.jpg",
  },
  institutional: {
    src: null,
    alt: "Instalações da Mineradora Berté",
    slot: "/images/institutional/instalacoes.jpg",
  },
} satisfies Record<string, MediaAsset>;
