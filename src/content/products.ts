/**
 * Catálogo de produtos da Mineradora Berté.
 * As categorias agrupam os materiais pela família do nome, sem presumir granulometria
 * ou aplicação técnica. Especificações e aplicações só devem ser preenchidas com dados
 * confirmados pela empresa.
 *
 * A ordem do array define a numeração do catálogo (Nº 01 a 10), agrupada por categoria.
 */

export type ProductCategory = {
  id: "areias" | "britas" | "rachoes";
  name: string;
  /** Descrição geral da família de materiais (conhecimento comum, não especificação da Berté). */
  intro: string;
};

export type ProductImage = {
  /** Caminho em /public/images/products. `null` até o recebimento da foto real. */
  src: string | null;
  alt: string;
};

/**
 * Ficha técnica confirmada pela empresa. Todos os campos são opcionais; ficam
 * registrados aqui para uso futuro no catálogo, quando confirmados.
 */
export type ProductTechnical = {
  granulometry?: string;
  characteristics?: string[];
  applications?: string[];
  /** Unidade comercial específica, se diferente do padrão (tonelada ou m³). */
  unit?: string;
  notes?: string;
};

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory["id"];
  image: ProductImage;
  /** Frase comercial curta, baseada apenas em dados confirmados. */
  summary: string;
  /**
   * Explicação geral do tipo de material (nomenclatura de mercado), sem especificações
   * próprias da Berté. `null` quando não há informação geral segura para publicar.
   */
  about: string[] | null;
  /** Descrição oficial enviada pela empresa. Quando existir, substitui o texto geral no catálogo. */
  description: string | null;
  technical: ProductTechnical;
  featured?: boolean;
};

export const productCategories: ProductCategory[] = [
  {
    id: "britas",
    name: "Britas e derivados",
    intro:
      "Pedra britada em diferentes frações e os materiais resultantes do processo de britagem, como o pó de brita e a bica corrida.",
  },
  {
    id: "areias",
    name: "Areias",
    intro: "Agregados miúdos: areia industrial, produzida pela britagem de rocha, e areia natural.",
  },
  {
    id: "rachoes",
    name: "Rachões",
    intro: "Pedras de maiores dimensões, obtidas no desmonte ou na britagem primária da rocha.",
  },
];

type ProductInput = Pick<Product, "slug" | "name" | "category" | "summary" | "about"> & { featured?: boolean };

function product({ featured = false, ...input }: ProductInput): Product {
  return {
    ...input,
    image: { src: null, alt: `${input.name} da Mineradora Berté` },
    description: null,
    technical: {},
    featured,
  };
}

export const products: Product[] = [
  product({
    slug: "brita-1",
    name: "Brita 1",
    category: "britas",
    featured: true,
    summary:
      "Brita 1 para construção civil, vendida por tonelada ou m³, com entrega em frota própria ou retirada na mineradora em Ponte Serrada (SC).",
    about: [
      "Brita 1 é a designação comercial de uma das frações da pedra britada, agregado graúdo obtido pela britagem e classificação da rocha.",
      "Nas britas numeradas, o número indica a faixa de tamanho dos grãos: quanto maior o número, maiores as pedras.",
    ],
  }),
  product({
    slug: "pedrisco",
    name: "Pedrisco",
    category: "britas",
    featured: true,
    summary:
      "Pedrisco vendido por tonelada ou m³, com entrega na obra ou retirada na Mineradora Berté, em Ponte Serrada (SC).",
    about: [
      "Pedrisco é o nome comercial de uma das frações mais finas da pedra britada, com grãos menores que os da brita 1.",
    ],
  }),
  product({
    slug: "po-de-brita",
    name: "Pó de brita",
    category: "britas",
    featured: true,
    summary:
      "Pó de brita da Mineradora Berté, comercializado por tonelada ou m³, com entrega em frota própria ou retirada em Ponte Serrada (SC).",
    about: [
      "O pó de brita é o material fino resultante do processo de britagem da rocha, separado das frações maiores no peneiramento.",
    ],
  }),
  product({
    slug: "brita-2",
    name: "Brita 2",
    category: "britas",
    summary:
      "Brita 2 vendida por tonelada ou metro cúbico, com entrega na obra ou retirada na mineradora em Ponte Serrada (SC).",
    about: [
      "Brita 2 é a designação comercial de uma fração da pedra britada com grãos maiores que os da brita 1.",
    ],
  }),
  product({
    slug: "bica-corrida",
    name: "Bica corrida",
    category: "britas",
    summary:
      "Bica corrida comercializada por tonelada ou m³, com entrega em frota própria ou retirada na Mineradora Berté, em Ponte Serrada (SC).",
    about: [
      "Bica corrida é o nome dado ao material britado que não passa pela separação em frações: reúne, na mesma carga, grãos de diferentes tamanhos.",
    ],
  }),
  product({
    slug: "areia-industrial",
    name: "Areia industrial",
    category: "areias",
    featured: true,
    summary:
      "Areia industrial vendida por tonelada ou m³, com entrega na obra ou retirada na mineradora em Ponte Serrada (SC).",
    about: [
      "A areia industrial, também chamada de areia artificial ou areia de brita, é produzida pela britagem de rocha, e não extraída de rios ou cavas.",
    ],
  }),
  product({
    slug: "areia-natural",
    name: "Areia natural",
    category: "areias",
    featured: true,
    summary:
      "Areia natural comercializada por tonelada ou m³, com entrega em frota própria ou retirada na Mineradora Berté, em Ponte Serrada (SC).",
    about: ["Areia natural é o agregado miúdo de origem natural, sem passar por processo de britagem."],
  }),
  product({
    slug: "rachaozinho-primario",
    name: "Rachãozinho primário",
    category: "rachoes",
    summary:
      "Rachãozinho primário vendido por tonelada ou m³, com entrega na obra ou retirada na mineradora em Ponte Serrada (SC).",
    about: null,
  }),
  product({
    slug: "rachao-mina",
    name: "Rachão mina",
    category: "rachoes",
    summary:
      "Rachão mina da Mineradora Berté, comercializado por tonelada ou m³, com entrega em frota própria ou retirada em Ponte Serrada (SC).",
    about: null,
  }),
  product({
    slug: "rachao-mataco",
    name: "Rachão mataco",
    category: "rachoes",
    summary:
      "Rachão mataco vendido por tonelada ou metro cúbico, com entrega na obra ou retirada na Mineradora Berté, em Ponte Serrada (SC).",
    about: null,
  }),
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: ProductCategory["id"]) {
  return products.filter((p) => p.category === category);
}

export function getCategory(id: ProductCategory["id"]) {
  return productCategories.find((c) => c.id === id);
}

/** Número do material no catálogo (01 a 10). */
export function productIndex(product: Product) {
  return String(products.findIndex((p) => p.slug === product.slug) + 1).padStart(2, "0");
}

/** Link de orçamento com o material pré-selecionado no formulário (validado em /contato). */
export function quoteHrefFor(product: Product) {
  return `/contato?produto=${product.slug}`;
}
