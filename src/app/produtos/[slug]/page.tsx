import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductHero } from "@/components/product/ProductHero";
import { ProductInformation } from "@/components/product/ProductInformation";
import { ProductQuoteCta } from "@/components/product/ProductQuoteCta";
import { ProductSupply } from "@/components/product/ProductSupply";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { Container } from "@/components/ui/Container";
import { getProduct, products } from "@/content/products";
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
    description: `${product.summary} Solicite seu orçamento.`,
    path: `/produtos/${product.slug}`,
  });
}

export default async function ProductPage({ params }: PageProps<"/produtos/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <>
      <ProductHero product={product} />

      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-8 lg:py-28">
        <div className="lg:col-span-6">
          <ProductInformation product={product} />
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <ProductSupply />
        </div>
      </Container>

      <RelatedProducts product={product} />

      <ProductQuoteCta product={product} />
    </>
  );
}
