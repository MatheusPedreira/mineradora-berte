/**
 * Fotografias reais da Mineradora Berté (fornecidas pela empresa).
 * `src: null` mantém a área reservada visível até o recebimento da foto.
 * Ao receber o arquivo, salve-o na pasta indicada em `slot` e preencha `src`.
 */
export type MediaAsset = {
  src: string | null;
  alt: string;
  /** Destino sugerido do arquivo em /public. */
  slot: string;
  width?: number;
  height?: number;
};

export const media = {
  // Foto quadrada usada no desktop e no celular até haver versões dedicadas.
  heroDesktop: {
    src: "/images/hero/pedreira-basalto.jpg",
    alt: "Frente de lavra de basalto da Mineradora Berté, com escavadeira carregando caminhão fora de estrada",
    slot: "/images/hero/pedreira-basalto.jpg",
    width: 1440,
    height: 1440,
  },
  heroMobile: {
    src: "/images/hero/pedreira-basalto.jpg",
    alt: "Frente de lavra de basalto da Mineradora Berté, com escavadeira carregando caminhão fora de estrada",
    slot: "/images/hero/pedreira-basalto.jpg",
    width: 1440,
    height: 1440,
  },
  logistics: {
    src: "/images/operations/vista-aerea-patio.jpg",
    alt: "Vista aérea do pátio da Mineradora Berté, com pilhas de agregados, usina de britagem, máquinas e estrada de acesso",
    slot: "/images/operations/vista-aerea-patio.jpg",
  },
  structure: {
    src: "/images/operations/usina-vista-superior.jpg",
    alt: "Vista superior da usina de britagem da Mineradora Berté, com correias transportadoras e pilhas de material",
    slot: "/images/operations/usina-vista-superior.jpg",
  },
  quality: {
    src: "/images/operations/usina-britagem.jpg",
    alt: "Usina de britagem da Mineradora Berté com correias transportadoras e pilhas de agregados classificados",
    slot: "/images/operations/usina-britagem.jpg",
  },
  institutional: {
    src: "/images/institutional/vista-aerea-operacao.jpg",
    alt: "Vista aérea da operação da Mineradora Berté em Ponte Serrada, SC",
    slot: "/images/institutional/vista-aerea-operacao.jpg",
  },
  /** Ainda sem foto: caminhões de entrega (truck, 6x4, bitruck, carretas). */
  fleet: {
    src: null,
    alt: "Caminhão da frota própria da Mineradora Berté",
    slot: "/images/fleet/frota-principal.jpg",
  },
} satisfies Record<string, MediaAsset>;
