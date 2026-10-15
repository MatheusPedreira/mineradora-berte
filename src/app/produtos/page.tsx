import { ArrowDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProductTile } from "@/components/ui/ProductTile";
import { FinalCta } from "@/components/home/FinalCta";
import { getProductsByCategory, productCategories, products } from "@/content/products";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Produtos: Areia, Brita, Pedrisco e Rachão",
  description:
    "Catálogo da Mineradora Berté: brita 1, brita 2, pedrisco, pó de brita, bica corrida, areia industrial, areia natural e rachões. Venda por tonelada ou m³ em Ponte Serrada (SC).",
  path: "/produtos",
});

const pad = (n: number) => String(n).padStart(2, "0");

/** Índice visual do catálogo: total de materiais e atalhos para cada categoria. */
function CatalogIndex() {
  return (
    <div className="on-dark mt-12 grid bg-graphite text-offwhite sm:mt-16 lg:grid-cols-12">
      <div className="placeholder-hatch flex items-end justify-between gap-6 p-6 sm:p-8 lg:col-span-5 lg:p-10">
        <span
          aria-hidden="true"
          className="block font-display text-[7rem] leading-[0.8] font-bold tracking-[-0.05em] text-transparent [-webkit-text-stroke:1.5px_var(--color-sand)] sm:text-[9rem] lg:text-[11rem]"
        >
          {pad(products.length)}
        </span>
        <p className="max-w-[12rem] pb-2 text-sm leading-relaxed text-offwhite/75">
          materiais vendidos por tonelada ou m³, com entrega ou retirada.
        </p>
      </div>

      <nav aria-label="Categorias do catálogo" className="lg:col-span-7">
        <ul className="divide-y divide-line-dark">
          {productCategories.map((cat) => {
            const count = getProductsByCategory(cat.id).length;
            return (
              <li key={cat.id}>
                <a
                  href={`#${cat.id}`}
                  className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 px-6 py-5 transition-colors hover:bg-graphite-soft sm:px-8 sm:py-6 lg:px-10"
                >
                  <span className="font-display text-sm font-semibold text-sand tabular-nums">{pad(count)}</span>
                  <span>
                    <span className="block font-display text-xl font-semibold sm:text-2xl">{cat.name}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-offwhite/70">{cat.intro}</span>
                  </span>
                  <ArrowDown
                    aria-hidden="true"
                    className="size-5 text-offwhite/60 transition-transform duration-300 group-hover:translate-y-0.5 group-hover:text-sand"
                    strokeWidth={1.5}
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Produtos"
        title="Agregados para diferentes necessidades de construção."
        lead="Britas, areias e rachões da Mineradora Berté, comercializados por tonelada ou metro cúbico, com entrega em frota própria ou retirada na mineradora em Ponte Serrada (SC)."
        crumbs={[{ name: "Produtos", path: "/produtos" }]}
      >
        <CatalogIndex />
      </PageHeader>

      <Container className="py-16 sm:py-20 lg:py-28">
        {productCategories.map((cat, i) => {
          const items = getProductsByCategory(cat.id);
          // Com número ímpar de materiais, o primeiro ganha destaque (composição assimétrica da Home).
          const leadFirst = items.length % 2 === 1;
          return (
            <section
              key={cat.id}
              id={cat.id}
              aria-labelledby={`cat-${cat.id}`}
              className={`grid scroll-mt-28 gap-10 lg:grid-cols-12 lg:gap-8 ${
                i > 0 ? "mt-20 border-t border-line pt-16 lg:mt-28 lg:pt-20" : ""
              }`}
            >
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <Eyebrow index={pad(i + 1)}>{pad(items.length)} materiais</Eyebrow>
                  <h2
                    id={`cat-${cat.id}`}
                    className="mt-6 text-3xl leading-[1.05] font-bold tracking-[-0.025em] text-graphite sm:text-4xl"
                  >
                    {cat.name}
                  </h2>
                  <p className="mt-4 max-w-sm text-base leading-relaxed text-basalt">{cat.intro}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:col-span-8">
                {items.map((p, j) => {
                  const large = leadFirst && j === 0;
                  return (
                    <ProductTile
                      key={p.slug}
                      product={p}
                      cta
                      large={large}
                      sizes={large ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 30vw, 50vw"}
                      className={large ? "col-span-2" : ""}
                    />
                  );
                })}
              </div>
            </section>
          );
        })}
      </Container>

      <FinalCta />
    </>
  );
}
