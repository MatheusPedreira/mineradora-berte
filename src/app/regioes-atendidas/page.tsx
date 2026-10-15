import { ArrowUpRight, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { FinalCta } from "@/components/home/FinalCta";
import { cities, company } from "@/content/company";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Regiões Atendidas",
  description:
    "A Mineradora Berté atende Ponte Serrada, Vargeão, Passos Maia, Abelardo Luz, Faxinal dos Guedes, Xanxerê, Irani, Vargem Bonita, Catanduvas e região. Outras localidades mediante consulta.",
  path: "/regioes-atendidas",
});

export default function RegionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Regiões atendidas"
        title="De Ponte Serrada para a região."
        lead="Fornecimento de areia, brita e agregados para cidades do oeste catarinense. Outras localidades mediante consulta."
        crumbs={[{ name: "Regiões Atendidas", path: "/regioes-atendidas" }]}
      />

      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-8 lg:py-24">
        <div className="lg:col-span-4">
          <div className="border-l-2 border-navy pl-6">
            <p className="flex items-center gap-2 text-[0.7rem] font-semibold tracking-eyebrow text-basalt uppercase">
              <MapPin aria-hidden="true" className="size-3.5" strokeWidth={2} />
              Base de operação
            </p>
            <p className="mt-2 font-display text-4xl font-bold tracking-[-0.02em] text-navy">{company.address.city}</p>
            <p className="mt-2 text-sm leading-relaxed text-basalt">
              {company.address.plusCode} · {company.address.stateName}
              <br />
              CEP {company.address.postalCode}
            </p>
            <a
              href={company.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:underline"
            >
              Abrir no Google Maps
              <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
              <span className="sr-only">(abre em nova aba)</span>
            </a>
          </div>
        </div>

        <section aria-labelledby="cidades" className="lg:col-span-7 lg:col-start-6">
          <h2 id="cidades" className="text-3xl font-bold tracking-[-0.025em] text-graphite sm:text-4xl">
            Cidades atendidas
          </h2>
          <ul className="mt-8 grid border-t border-line sm:grid-cols-2 sm:gap-x-10">
            {cities.map((city) => (
              <li key={city.name} className="flex items-center justify-between border-b border-line py-4">
                <span className="font-display text-lg font-semibold text-graphite">{city.name}</span>
                <span className="text-xs font-medium text-basalt">{city.base ? "Base · SC" : "SC"}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-md text-sm leading-relaxed text-basalt">
            Outras localidades mediante consulta. Ligue para{" "}
            <a href={company.phone.href} className="font-semibold text-ink underline underline-offset-4 hover:text-navy">
              {company.phone.display}
            </a>{" "}
            e verifique o atendimento para a sua obra.
          </p>
        </section>
      </Container>

      <FinalCta />
    </>
  );
}
