/**
 * Catálogo de produtos da Mineradora Berté.
 * As categorias agrupam os materiais pela família do nome, sem presumir granulometria
 * ou aplicação técnica. Especificações e aplicações só devem ser preenchidas com dados
 * confirmados pela empresa.
 */

export type ProductCategory = {
  id: "areias" | "britas" | "rachoes";
  name: string;
};

export type ProductImage = {
  /** Caminho em /public/images/products. `null` até o recebimento da foto real. */
  src: string | null;
  alt: string;
};

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory["id"];
  image: ProductImage;
  /** Descrição confirmada pela empresa. `null` até o recebimento. */
  description: string | null;
  /** Especificações técnicas confirmadas (ex.: { label: "Faixa granulométrica", value: "..." }). */
  specs: { label: string; value: string }[];
  /** Aplicações confirmadas pela empresa. */
  applications: string[];
  featured?: boolean;
};

export const productCategories: ProductCategory[] = [
  { id: "britas", name: "Britas e derivados" },
  { id: "areias", name: "Areias" },
  { id: "rachoes", name: "Rachões" },
];

function product(
  slug: string,
  name: string,
  category: ProductCategory["id"],
  featured = false,
): Product {
  return {
    slug,
    name,
    category,
    image: { src: null, alt: `${name} — Mineradora Berté` },
    description: null,
    specs: [],
    applications: [],
    featured,
  };
}

export const products: Product[] = [
  product("brita-1", "Brita 1", "britas", true),
  product("pedrisco", "Pedrisco", "britas", true),
  product("areia-industrial", "Areia industrial", "areias", true),
  product("areia-natural", "Areia natural", "areias", true),
  product("po-de-brita", "Pó de brita", "britas", true),
  product("brita-2", "Brita 2", "britas"),
  product("bica-corrida", "Bica corrida", "britas"),
  product("rachaozinho-primario", "Rachãozinho primário", "rachoes"),
  product("rachao-mina", "Rachão mina", "rachoes"),
  product("rachao-mataco", "Rachão mataco", "rachoes"),
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: ProductCategory["id"]) {
  return products.filter((p) => p.category === category);
}
