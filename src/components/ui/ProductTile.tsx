import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProductMedia } from "@/components/ui/ProductMedia";
import { getCategory, type Product } from "@/content/products";

type ProductTileProps = {
  product: Product;
  sizes: string;
  large?: boolean;
  /** No desktop, a imagem ocupa a altura disponível da grade (destaque da Home). */
  fill?: boolean;
  className?: string;
};

/** Destaque de material (Home). Leva ao material no catálogo (/produtos#slug). */
export function ProductTile({ product, sizes, large, fill, className = "" }: ProductTileProps) {
  const category = getCategory(product.category)?.name;
  const media = `h-full transition-transform duration-700 ease-out-quart group-hover:scale-[1.03] ${
    large ? `aspect-[4/3] sm:aspect-[16/9] ${fill ? "lg:aspect-auto lg:min-h-0" : ""}` : "aspect-[4/3]"
  }`;

  return (
    <Link href={`/produtos#${product.slug}`} className={`group flex flex-col ${className}`}>
      <div className="relative flex-1 overflow-hidden">
        <ProductMedia product={product} large={large} sizes={sizes} className={media} />
      </div>
      <div className="flex items-end justify-between gap-2 border-b border-line pt-3 pb-3 transition-colors group-hover:border-navy sm:gap-4 sm:pt-4 sm:pb-4">
        <div>
          <p className="text-[0.65rem] font-semibold tracking-[0.1em] text-basalt uppercase sm:text-[0.7rem] sm:tracking-eyebrow">
            {category}
          </p>
          <h3
            className={`mt-1 font-semibold tracking-[-0.015em] text-graphite transition-colors group-hover:text-navy ${
              large ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"
            }`}
          >
            {product.name}
          </h3>
        </div>
        <span className="mb-1 flex shrink-0 items-center gap-1.5 text-basalt transition-colors group-hover:text-navy">
          <ArrowUpRight
            aria-hidden="true"
            className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={1.5}
          />
        </span>
      </div>
    </Link>
  );
}
