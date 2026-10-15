import type { ProductTechnical } from "@/content/products";

/** Ficha técnica confirmada. Não renderiza nada quando não há campos preenchidos. */
export function ProductSpecifications({ technical }: { technical: ProductTechnical }) {
  const rows = [
    { label: "Faixa granulométrica", value: technical.granulometry },
    { label: "Características", value: technical.characteristics?.join(" · ") },
    { label: "Aplicações", value: technical.applications?.join(" · ") },
    { label: "Unidade comercial", value: technical.unit },
    { label: "Observações técnicas", value: technical.notes },
  ].filter((row): row is { label: string; value: string } => Boolean(row.value));

  if (rows.length === 0) return null;

  return (
    <section aria-labelledby="especificacoes" className="mt-12">
      <h3 id="especificacoes" className="text-xs font-semibold tracking-eyebrow text-basalt uppercase">
        Especificações técnicas
      </h3>
      <dl className="mt-4 border-t border-line">
        {rows.map((row) => (
          <div key={row.label} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[12rem_1fr] sm:gap-6">
            <dt className="font-display text-base font-semibold text-graphite">{row.label}</dt>
            <dd className="text-[0.9375rem] leading-relaxed text-basalt">{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
