import { Eyebrow } from "@/components/ui/Eyebrow";
import { ProductSpecifications } from "@/components/product/ProductSpecifications";
import { getCategory, productNameInline, type Product } from "@/content/products";

function hasTechnical(product: Product) {
  return Object.values(product.technical).some((v) => (Array.isArray(v) ? v.length > 0 : Boolean(v)));
}

/**
 * Sobre o material: descrição oficial (quando enviada), texto geral sobre o tipo de
 * material e ficha técnica confirmada. Sem conteúdo seguro, a seção fica curta.
 */
export function ProductInformation({ product }: { product: Product }) {
  const category = getCategory(product.category);
  const general = product.about ?? (category ? [category.intro] : []);

  return (
    <section aria-labelledby="sobre-material">
      <Eyebrow index="01">Sobre o material</Eyebrow>
      <h2
        id="sobre-material"
        className="mt-6 text-3xl leading-[1.05] font-bold tracking-[-0.025em] text-graphite sm:text-4xl"
      >
        O que é {productNameInline(product)}?
      </h2>

      <div className="mt-6 max-w-xl space-y-4 text-base leading-relaxed text-basalt sm:text-[1.0625rem]">
        {product.description ? <p className="text-graphite">{product.description}</p> : null}
        {general.map((text) => (
          <p key={text}>{text}</p>
        ))}
        {product.about === null ? (
          <p>
            As características que diferenciam este material dos demais {category?.name.toLowerCase() ?? "materiais"}{" "}
            são informadas pela equipe comercial.
          </p>
        ) : null}
      </div>

      <ProductSpecifications technical={product.technical} />

      {hasTechnical(product) ? null : (
        <p className="mt-8 max-w-xl border-l-2 border-sand pl-4 text-sm leading-relaxed text-basalt">
          Texto informativo sobre o tipo de material. Faixa granulométrica, características e indicação de uso do
          material da Mineradora Berté são informadas pela equipe comercial no orçamento.
        </p>
      )}
    </section>
  );
}
