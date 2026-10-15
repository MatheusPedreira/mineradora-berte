import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProductTile } from "@/components/ui/ProductTile";
import { FinalCta } from "@/components/home/FinalCta";
import { getProductsByCategory, productCategories } from "@/content/products";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Produtos: Areia, Brita, Pedrisco e Rachão",
  description:
    "Catálogo da Mineradora Berté: brita 1, brita 2, pedrisco, pó de brita, bica corrida, areia industrial, areia natural e rachões. Venda por tonelada ou m³ em Ponte Serrada (SC).",
  path: "/produtos",
});

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Produtos"
        title="Areia, brita e agregados."
        lead="Materiais para construção civil comercializados por tonelada ou metro cúbico, com entrega ou retirada na mineradora."
        crumbs={[{ name: "Produtos", path: "/produtos" }]}
      />

      <Container className="py-16 sm:py-20 lg:py-24">
        {productCategories.map((cat, i) => {
          const items = getProductsByCategory(cat.id);
          return (
            <section key={cat.id} aria-labelledby={`cat-${cat.id}`} className={i > 0 ? "mt-20 lg:mt-28" : ""}>
              <div className="flex items-baseline justify-between gap-6 border-b border-line pb-5">
                <h2 id={`cat-${cat.id}`} className="text-2xl font-bold tracking-[-0.02em] text-graphite sm:text-3xl">
                  {cat.name}
                </h2>
                <span className="text-xs font-medium text-basalt tabular-nums">
                  {String(items.length).padStart(2, "0")} {items.length === 1 ? "material" : "materiais"}
                </span>
              </div>
              <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((p) => (
                  <ProductTile key={p.slug} product={p} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
                ))}
              </div>
            </section>
          );
        })}
      </Container>

      <FinalCta />
    </>
  );
}
