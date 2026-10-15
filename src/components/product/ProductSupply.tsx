import Link from "next/link";
import { company } from "@/content/company";

/** Dados confirmados de fornecimento, iguais para todos os materiais. */
export function ProductSupply() {
  const rows = [
    { label: "Comercialização", value: "Por tonelada ou por metro cúbico (m³)" },
    { label: "Entrega", value: "Na obra, com frota própria" },
    { label: "Retirada", value: `Na mineradora, em ${company.address.city} (${company.address.state})` },
  ];

  return (
    <section aria-labelledby="fornecimento" className="border border-ink/15 bg-stone p-6 sm:p-8">
      <h2 id="fornecimento" className="font-display text-xl font-semibold text-graphite sm:text-2xl">
        Fornecimento
      </h2>
      <dl className="mt-6 border-t border-ink/15">
        {rows.map((row) => (
          <div key={row.label} className="grid gap-1 border-b border-ink/15 py-4 sm:grid-cols-[9.5rem_1fr] sm:gap-4">
            <dt className="text-sm font-semibold text-graphite">{row.label}</dt>
            <dd className="text-[0.9375rem] leading-relaxed text-basalt">{row.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-6 text-sm leading-relaxed text-basalt">
        Disponibilidade, prazos e condições de fornecimento são informados no orçamento. A relação entre tonelada e m³
        varia conforme o material, por isso não há conversão fixa.
      </p>
      <Link
        href="/regioes-atendidas"
        className="link-underline mt-5 inline-block text-sm font-semibold text-navy"
      >
        Ver regiões atendidas
      </Link>
    </section>
  );
}
