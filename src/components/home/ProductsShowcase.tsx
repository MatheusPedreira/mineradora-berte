import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ProductTile } from "@/components/ui/ProductTile";
import { getProductsByCategory, productCategories, products } from "@/content/products";

export function ProductsShowcase() {
  const [lead, ...rest] = products.filter((p) => p.featured);

  return (
    <section aria-labelledby="produtos-titulo" className="py-20 sm:py-24 lg:py-32">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow index="02">Nossos produtos</Eyebrow>
            <h2
              id="produtos-titulo"
              className="mt-6 max-w-2xl text-[2.1rem] leading-[1.02] font-bold tracking-[-0.03em] text-graphite sm:text-5xl xl:text-[3.6rem]"
            >
              Materiais para cada etapa da sua obra.
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-basalt lg:col-span-4 lg:col-start-9">
            Britas, areias e rachões comercializados por tonelada ou metro cúbico, com entrega ou retirada na
            mineradora.
          </p>
        </div>

        <div className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-12 lg:grid-rows-2">
          {lead ? (
            <ProductTile
              product={lead}
              large
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="sm:col-span-2 lg:col-span-6 lg:row-span-2"
            />
          ) : null}
          {rest.map((p) => (
            <ProductTile key={p.slug} product={p} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="lg:col-span-3" />
          ))}
        </div>

        <div className="mt-16 grid gap-10 border-t border-line pt-10 lg:mt-20 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <h3 className="text-[0.7rem] font-semibold tracking-eyebrow text-basalt uppercase">
              Catálogo completo · {products.length} materiais
            </h3>
          </div>
          <div className="grid gap-8 sm:grid-cols-3 lg:col-span-6">
            {productCategories.map((cat) => (
              <div key={cat.id}>
                <p className="font-display text-sm font-semibold text-graphite">{cat.name}</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {getProductsByCategory(cat.id).map((p) => (
                    <li key={p.slug}>
                      <Link href={`/produtos/${p.slug}`} className="link-underline text-basalt transition-colors hover:text-navy">
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="lg:col-span-3 lg:flex lg:items-start lg:justify-end">
            <ButtonLink href="/produtos" variant="outline">
              Explorar todos os materiais
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
