import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductMedia } from "@/components/ui/ProductMedia";
import { getCategory, quoteHrefFor, type Product } from "@/content/products";

type CatalogItemProps = {
  product: Product;
  sizes: string;
  /** Destaque (primeiro material de uma categoria com número ímpar de itens). */
  large?: boolean;
  className?: string;
};

/** Texto do card: descrição oficial, se houver; senão, a explicação geral do material. */
function catalogText(product: Product) {
  return product.description ?? product.about?.[0] ?? "Dimensões e características informadas pela equipe comercial.";
}

/**
 * Material no catálogo. No celular, linha com miniatura; a partir de 640px, card vertical.
 * O `id` permite links diretos (/produtos#brita-1), usados pelos redirecionamentos das antigas páginas.
 */
export function CatalogItem({ product, sizes, large, className = "" }: CatalogItemProps) {
  const category = getCategory(product.category)?.name;

  return (
    <article
      id={product.slug}
      data-track-location="catalog"
      aria-labelledby={`${product.slug}-nome`}
      className={`grid scroll-mt-28 grid-cols-[6.5rem_1fr] gap-4 border-b border-line pb-6 sm:flex sm:flex-col sm:gap-0 sm:pb-0 ${className}`}
    >
      <ProductMedia
        product={product}
        large={large}
        compact
        sizes={sizes}
        className={`aspect-square ${large ? "sm:aspect-[16/9]" : "sm:aspect-[4/3]"}`}
      />
      <div className="flex flex-col sm:flex-1 sm:pt-4 sm:pb-5">
        <p className="text-[0.65rem] font-semibold tracking-[0.1em] text-basalt uppercase sm:text-[0.7rem] sm:tracking-eyebrow">
          {category}
        </p>
        <h3
          id={`${product.slug}-nome`}
          className={`mt-1 font-semibold tracking-[-0.015em] text-graphite ${large ? "text-xl sm:text-3xl" : "text-xl"}`}
        >
          {product.name}
        </h3>
        <p className={`mt-2 text-sm leading-relaxed text-basalt ${large ? "sm:max-w-xl" : ""}`}>
          {catalogText(product)}
        </p>
        <Link
          href={quoteHrefFor(product)}
          className="group mt-3 inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-navy sm:mt-auto sm:pt-4"
        >
          <span className="link-underline">Solicitar orçamento</span>
          <span className="sr-only"> de {product.name}</span>
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-300 ease-out-quart group-hover:translate-x-1"
            strokeWidth={1.75}
          />
        </Link>
      </div>
    </article>
  );
}
