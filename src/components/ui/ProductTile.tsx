import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { productCategories, products, type Product } from "@/content/products";

type ProductTileProps = {
  product: Product;
  sizes: string;
  large?: boolean;
  className?: string;
};

/**
 * Painel temporário enquanto não há foto do material: número do catálogo e dados
 * confirmados de comercialização, sem simular a aparência do produto.
 * Ocupa exatamente a mesma área da foto, então a troca não altera o layout.
 */
function ProductPlaceholder({ product, large, className }: { product: Product; large?: boolean; className: string }) {
  const index = String(products.findIndex((p) => p.slug === product.slug) + 1).padStart(2, "0");
  const slot = process.env.NODE_ENV !== "production" ? `/images/products/${product.slug}.jpg` : null;

  return (
    <div
      aria-hidden="true"
      className={`relative flex flex-col justify-between overflow-hidden p-4 sm:p-5 ${
        large ? "placeholder-hatch text-offwhite lg:p-8" : "placeholder-hatch-light text-graphite"
      } ${className}`}
    >
      <p className="text-[0.65rem] font-semibold tracking-[0.12em] text-offwhite/60 uppercase sm:text-[0.7rem]">
        {large ? "Tonelada ou m³ · Entrega ou retirada" : null}
      </p>

      <div>
        <span
          className={`block font-display leading-[0.8] font-bold tracking-[-0.05em] text-transparent ${
            large
              ? "text-[7rem] [-webkit-text-stroke:1.5px_var(--color-sand)] sm:text-[10rem] lg:text-[13rem]"
              : "text-[4.5rem] [-webkit-text-stroke:1px_rgb(91_98_109_/_0.7)] sm:text-[6rem]"
          }`}
        >
          {index}
        </span>
        {slot ? <span className="mt-2 block text-[0.6rem] opacity-60">{slot}</span> : null}
      </div>
    </div>
  );
}

export function ProductTile({ product, sizes, large, className = "" }: ProductTileProps) {
  const category = productCategories.find((c) => c.id === product.category)?.name;
  const media = `h-full transition-transform duration-700 ease-out-quart group-hover:scale-[1.03] ${
    large ? "aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto lg:min-h-0" : "aspect-[4/3]"
  }`;

  return (
    <Link href={`/produtos/${product.slug}`} className={`group flex flex-col ${className}`}>
      <div className="relative flex-1 overflow-hidden">
        {product.image.src ? (
          <MediaSlot src={product.image.src} alt={product.image.alt} sizes={sizes} className={media} />
        ) : (
          <ProductPlaceholder product={product} large={large} className={media} />
        )}
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
        <ArrowUpRight
          aria-hidden="true"
          className="mb-1 size-5 shrink-0 text-basalt transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-navy"
          strokeWidth={1.5}
        />
      </div>
    </Link>
  );
}
