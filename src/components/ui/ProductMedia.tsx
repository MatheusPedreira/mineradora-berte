import { MediaSlot } from "@/components/ui/MediaSlot";
import { productIndex, type Product } from "@/content/products";

type ProductMediaProps = {
  product: Product;
  sizes: string;
  /** Painel escuro com número grande (destaque da Home e hero do produto). */
  large?: boolean;
  preload?: boolean;
  className: string;
};

/**
 * Foto do material quando `product.image.src` existe; caso contrário, painel temporário
 * com o número do catálogo e dados confirmados de comercialização, sem simular a
 * aparência do produto. Ocupa exatamente a mesma área da foto: a troca não altera o layout.
 */
export function ProductMedia({ product, sizes, large, preload, className }: ProductMediaProps) {
  if (product.image.src) {
    return (
      <MediaSlot
        src={product.image.src}
        alt={product.image.alt}
        sizes={sizes}
        preload={preload}
        className={className}
      />
    );
  }

  const index = productIndex(product);
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
