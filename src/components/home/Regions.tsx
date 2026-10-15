import { MapPin } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cities, company } from "@/content/company";

export function Regions() {
  const served = cities.filter((c) => !c.base);

  return (
    <section aria-labelledby="regioes-titulo" className="py-20 sm:py-24 lg:py-32">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Eyebrow index="05">Regiões atendidas</Eyebrow>
          <h2
            id="regioes-titulo"
            className="mt-6 text-[2.1rem] leading-[1.02] font-bold tracking-[-0.03em] text-graphite sm:text-5xl xl:text-[3.4rem]"
          >
            De Ponte Serrada para a região.
          </h2>

          <div className="mt-10 border-l-2 border-navy pl-6">
            <p className="flex items-center gap-2 text-[0.7rem] font-semibold tracking-eyebrow text-basalt uppercase">
              <MapPin aria-hidden="true" className="size-3.5" strokeWidth={2} />
              Base de operação
            </p>
            <p className="mt-2 font-display text-3xl font-bold tracking-[-0.02em] text-navy sm:text-4xl">
              {company.address.city}
            </p>
            <p className="mt-1 text-sm text-basalt">
              {company.address.stateName} · CEP {company.address.postalCode}
            </p>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <h3 className="text-[0.7rem] font-semibold tracking-eyebrow text-basalt uppercase">Cidades atendidas</h3>
          <ul className="mt-5 grid border-t border-line sm:grid-cols-2 sm:gap-x-10">
            {served.map((city) => (
              <li key={city.name} className="flex items-center justify-between border-b border-line py-4">
                <span className="font-display text-lg font-semibold text-graphite">{city.name}</span>
                <span className="text-xs font-medium text-basalt">SC</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xs text-sm leading-relaxed text-basalt">
              Outras localidades mediante consulta. Fale com a equipe para verificar o atendimento à sua obra.
            </p>
            <ButtonLink href="/regioes-atendidas" variant="outline">
              Ver regiões
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
