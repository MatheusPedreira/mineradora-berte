import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ProductTile } from "@/components/ui/ProductTile";
import {
  getProductsByCategory,
  getRelatedProducts,
  productCategories,
  productIndex,
  type Product,
} from "@/content/products";

/** Outros materiais (mesma família primeiro) e índice completo do catálogo. */
export function RelatedProducts({ product }: { product: Product }) {
  const related = getRelatedProducts(product);

  return (
    <section aria-labelledby="outros-materiais" className="border-t border-line py-16 sm:py-20 lg:py-28">
      <Container>
        <Eyebrow index="02">Outros materiais</Eyebrow>
        <h2
          id="outros-materiais"
          className="mt-6 text-3xl leading-[1.05] font-bold tracking-[-0.025em] text-graphite sm:text-4xl"
        >
          Continue pelo catálogo.
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6">
          {related.map((p, i) => (
            <ProductTile
              key={p.slug}
              product={p}
              cta
              sizes="(min-width: 640px) 33vw, 50vw"
              className={i === 2 ? "hidden sm:flex" : ""}
            />
          ))}
        </div>

        <nav aria-label="Catálogo completo" className="mt-14 grid gap-10 border-t border-line pt-10 lg:grid-cols-12">
          <p className="text-xs font-semibold tracking-eyebrow text-basalt uppercase lg:col-span-3">
            Catálogo completo
          </p>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-6">
            {productCategories.map((cat) => (
              <div key={cat.id}>
                <p className="font-display text-sm font-semibold text-graphite">{cat.name}</p>
                <ul className="mt-3 space-y-2 text-[0.9375rem]">
                  {getProductsByCategory(cat.id).map((p) => {
                    const current = p.slug === product.slug;
                    return (
                      <li key={p.slug} className="flex items-baseline gap-2">
                        <span className="font-display text-[0.7rem] text-sand-deep tabular-nums">{productIndex(p)}</span>
                        <Link
                          href={`/produtos/${p.slug}`}
                          aria-current={current ? "page" : undefined}
                          className={`link-underline transition-colors hover:text-navy ${
                            current ? "font-semibold text-navy" : "text-basalt"
                          }`}
                        >
                          {p.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
          <div className="lg:col-span-3 lg:flex lg:items-start lg:justify-end">
            <ButtonLink href="/produtos" variant="outline">
              Ver catálogo completo
            </ButtonLink>
          </div>
        </nav>
      </Container>
    </section>
  );
}
