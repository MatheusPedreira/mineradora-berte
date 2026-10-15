import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ProductMedia } from "@/components/ui/ProductMedia";
import { company } from "@/content/company";
import { getCategory, productIndex, quoteHrefFor, type Product } from "@/content/products";

const facts = [
  { label: "Comercialização", value: "Tonelada ou m³" },
  { label: "Fornecimento", value: "Entrega ou retirada" },
];

export function ProductHero({ product }: { product: Product }) {
  const category = getCategory(product.category);

  return (
    <section aria-labelledby="produto-titulo" className="border-b border-line">
      <Container className="pt-8 pb-14 sm:pt-10 sm:pb-20 lg:pb-24">
        <Breadcrumbs
          items={[
            { name: "Produtos", path: "/produtos" },
            { name: product.name, path: `/produtos/${product.slug}` },
          ]}
        />

        <div className="mt-10 grid gap-10 sm:mt-14 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col lg:col-span-5 lg:pr-8">
            <Eyebrow index={productIndex(product)}>{category?.name ?? "Produto"}</Eyebrow>
            <h1
              id="produto-titulo"
              className="mt-6 text-[2.6rem] leading-[0.98] font-bold tracking-[-0.035em] text-graphite sm:text-6xl xl:text-7xl"
            >
              {product.name}
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-basalt sm:text-lg">{product.summary}</p>

            <dl className="mt-8 grid grid-cols-2 border-t border-line">
              {facts.map((fact, i) => (
                <div key={fact.label} className={`pt-4 ${i > 0 ? "border-l border-line pl-4 sm:pl-5" : "pr-4"}`}>
                  <dt className="text-[0.65rem] font-semibold tracking-[0.08em] text-basalt uppercase sm:tracking-eyebrow">
                    {fact.label}
                  </dt>
                  <dd className="mt-1.5 font-display text-base leading-tight font-semibold text-graphite">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <ButtonLink href={quoteHrefFor(product)}>Solicitar orçamento</ButtonLink>
              <ButtonLink href={company.phone.href} variant="outline" icon="phone">
                {company.phone.display}
              </ButtonLink>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ProductMedia
              product={product}
              large
              preload
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="aspect-[4/3]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
