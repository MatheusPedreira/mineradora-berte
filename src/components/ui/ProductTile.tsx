import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { productCategories, type Product } from "@/content/products";

type ProductTileProps = {
  product: Product;
  sizes: string;
  large?: boolean;
  className?: string;
};

export function ProductTile({ product, sizes, large, className = "" }: ProductTileProps) {
  const category = productCategories.find((c) => c.id === product.category)?.name;
  return (
    <Link href={`/produtos/${product.slug}`} className={`group flex flex-col ${className}`}>
      <div className="relative flex-1 overflow-hidden">
        <MediaSlot
          src={product.image.src}
          alt={product.image.alt}
          slot={`/images/products/${product.slug}.jpg`}
          label="Foto do material"
          sizes={sizes}
          tone="light"
          className={`h-full transition-transform duration-700 ease-out-quart group-hover:scale-[1.03] ${
            large ? "min-h-80 lg:min-h-0" : "aspect-[4/3]"
          }`}
        />
      </div>
      <div className="flex items-end justify-between gap-4 border-b border-line pt-4 pb-4 transition-colors group-hover:border-navy">
        <div>
          <p className="text-[0.65rem] font-semibold tracking-eyebrow text-basalt uppercase">{category}</p>
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
