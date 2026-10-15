import { getProduct } from "@/content/products";

/**
 * Mostra o material vindo da página do produto (/contato?produto=<slug>).
 * O parâmetro só é aceito se corresponder a um slug do catálogo; qualquer outro valor é ignorado.
 */
export async function QuoteProductNote({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { produto } = await searchParams;
  const product = typeof produto === "string" ? getProduct(produto) : undefined;
  if (!product) return null;

  return (
    <p className="mt-6 border-l-2 border-navy bg-offwhite px-4 py-3 text-[0.9375rem] leading-relaxed text-graphite">
      Material do pedido: <strong className="font-semibold">{product.name}</strong>. Informe também a quantidade e a
      modalidade de fornecimento.
    </p>
  );
}
