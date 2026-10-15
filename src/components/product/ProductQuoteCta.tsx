import { FinalCta } from "@/components/home/FinalCta";
import { productNameInline, quoteHrefFor, type Product } from "@/content/products";

/** CTA final do produto: reaproveita o CTA do site com o material já identificado. */
export function ProductQuoteCta({ product }: { product: Product }) {
  return (
    <FinalCta
      title={`Precisa de ${productNameInline(product)} para sua obra?`}
      text="Informe a quantidade e consulte as condições de fornecimento e entrega com a Mineradora Berté."
      href={quoteHrefFor(product)}
    />
  );
}
