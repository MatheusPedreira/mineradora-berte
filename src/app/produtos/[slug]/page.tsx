import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { ProductTile } from "@/components/ui/ProductTile";
import { company } from "@/content/company";
import { quoteHref } from "@/content/navigation";
import { getProduct, productCategories, products } from "@/content/products";
import { pageMetadata } from "@/lib/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/produtos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return pageMetadata({
    title: `${product.name} em Ponte Serrada SC`,
    description: `${product.name} da Mineradora Berté, em Ponte Serrada (SC). Venda por tonelada ou m³, com entrega em frota própria ou retirada na mineradora. Solicite seu orçamento.`,
    path: `/produtos/${product.slug}`,
  });
}

export default async function ProductPage({ params }: PageProps<"/produtos/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = productCategories.find((c) => c.id === product.category);
  const related = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 3);

  return (
    <>
      <section className="border-b border-line">
        <Container className="pt-8 pb-16 sm:pt-10 lg:pb-24">
          <Breadcrumbs
            items={[
              { name: "Produtos", path: "/produtos" },
              { name: product.name, path: `/produtos/${product.slug}` },
            ]}
          />

          <div className="mt-10 grid gap-10 sm:mt-14 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <MediaSlot
                src={product.image.src}
                alt={product.image.alt}
                slot={`/images/products/${product.slug}.jpg`}
                label="Foto do material"
                sizes="(min-width: 1024px) 55vw, 100vw"
                tone="light"
                preload
                className="aspect-[4/3]"
              />
            </div>

            <div className="flex flex-col lg:col-span-5 lg:pl-8">
              <Eyebrow>{category?.name ?? "Produto"}</Eyebrow>
              <h1 className="mt-5 text-[2.6rem] leading-[1] font-bold tracking-[-0.035em] text-graphite sm:text-6xl">
                {product.name}
              </h1>
              {product.description ? (
                <p className="mt-6 text-base leading-relaxed text-basalt">{product.description}</p>
              ) : null}

              <dl className="mt-8 border-t border-line">
                <div className="grid grid-cols-[9rem_1fr] gap-4 border-b border-line py-4 text-sm">
                  <dt className="font-semibold text-graphite">Comercialização</dt>
                  <dd className="text-basalt">Por tonelada ou metro cúbico (m³)</dd>
                </div>
                <div className="grid grid-cols-[9rem_1fr] gap-4 border-b border-line py-4 text-sm">
                  <dt className="font-semibold text-graphite">Fornecimento</dt>
                  <dd className="text-basalt">Entrega com frota própria ou retirada na mineradora</dd>
                </div>
                {product.specs.map((spec) => (
                  <div key={spec.label} className="grid grid-cols-[9rem_1fr] gap-4 border-b border-line py-4 text-sm">
                    <dt className="font-semibold text-graphite">{spec.label}</dt>
                    <dd className="text-basalt">{spec.value}</dd>
                  </div>
                ))}
              </dl>

              {product.applications.length > 0 ? (
                <div className="mt-8">
                  <h2 className="text-[0.7rem] font-semibold tracking-eyebrow text-basalt uppercase">Aplicações</h2>
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-basalt">
                    {product.applications.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="mt-6 text-sm leading-relaxed text-basalt">
                  Para especificações técnicas e indicação de uso, consulte a equipe comercial.
                </p>
              )}

              <div className="mt-10 flex flex-col gap-3 sm:flex-row lg:mt-auto lg:pt-10">
                <ButtonLink href={quoteHref}>Solicitar orçamento</ButtonLink>
                <ButtonLink href={company.phone.href} variant="outline" icon="phone">
                  {company.phone.display}
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {related.length > 0 ? (
        <section aria-labelledby="relacionados" className="py-16 sm:py-20 lg:py-24">
          <Container>
            <h2 id="relacionados" className="text-2xl font-bold tracking-[-0.02em] text-graphite sm:text-3xl">
              Outros materiais em {category?.name.toLowerCase()}
            </h2>
            <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProductTile key={p.slug} product={p} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
              ))}
            </div>
            <div className="mt-10">
              <ButtonLink href="/produtos" variant="outline">
                Ver catálogo completo
              </ButtonLink>
            </div>
          </Container>
        </section>
      ) : null}

    </>
  );
}
