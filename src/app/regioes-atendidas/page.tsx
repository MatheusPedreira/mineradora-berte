import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { FinalCta } from "@/components/home/FinalCta";
import { cities, company } from "@/content/company";
import { media } from "@/content/media";
import { quoteHref } from "@/content/navigation";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Regiões Atendidas a partir de Ponte Serrada SC",
  description:
    "Fornecimento de areia, brita e agregados para Ponte Serrada, Vargeão, Passos Maia, Abelardo Luz, Faxinal dos Guedes, Xanxerê, Irani, Vargem Bonita, Catanduvas e região. Entrega ou retirada; outras localidades mediante consulta.",
  path: "/regioes-atendidas",
});

const pad = (n: number) => String(n).padStart(2, "0");

const mapsLinkClass = "inline-flex items-center gap-1.5 font-semibold text-navy hover:underline";

function MapsLink({ className = "" }: { className?: string }) {
  return (
    <a href={company.mapsUrl} target="_blank" rel="noopener noreferrer" className={`${mapsLinkClass} ${className}`}>
      Abrir no Google Maps
      <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
      <span className="sr-only">(abre em nova aba)</span>
    </a>
  );
}

/** Hero tipográfico, com a base de operação como "ponto de partida". */
function RegionsHero() {
  const base = [
    { label: "Base de operação", value: `${company.address.city} · ${company.address.state}` },
    { label: "Localização", value: `${company.address.plusCode} · CEP ${company.address.postalCode}` },
  ];

  return (
    <section aria-labelledby="regioes-titulo">
      <Container className="pt-8 sm:pt-10">
        <Breadcrumbs items={[{ name: "Regiões Atendidas", path: "/regioes-atendidas" }]} />

        <div className="mt-12 grid gap-8 sm:mt-16 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-8">
            <Eyebrow>Regiões atendidas</Eyebrow>
            <h1
              id="regioes-titulo"
              className="mt-6 text-[2.6rem] leading-[0.96] font-bold tracking-[-0.04em] text-graphite sm:text-7xl xl:text-[5.75rem]"
            >
              De <span className="text-navy">Ponte Serrada</span> para sua região.
            </h1>
          </div>
          <p className="max-w-md text-base leading-relaxed text-basalt sm:text-lg lg:col-span-4">
            Areia, brita e agregados para obras de cidades do oeste catarinense, com entrega em frota própria ou
            retirada na mineradora.
          </p>
        </div>

        <div className="mt-12 grid border-t border-ink sm:mt-16 sm:grid-cols-3">
          {base.map((item, i) => (
            <div key={item.label} className={`py-5 sm:py-6 ${i > 0 ? "border-t border-line sm:border-t-0 sm:border-l sm:pl-6" : "sm:pr-6"}`}>
              <p className="text-[0.7rem] font-semibold tracking-eyebrow text-basalt uppercase">{item.label}</p>
              <p className="mt-2 font-display text-lg font-semibold text-graphite sm:text-xl">{item.value}</p>
            </div>
          ))}
          <div className="border-t border-line py-5 sm:border-t-0 sm:border-l sm:py-6 sm:pl-6">
            <p className="text-[0.7rem] font-semibold tracking-eyebrow text-basalt uppercase">Mapa</p>
            <MapsLink className="mt-2 font-display text-lg sm:text-xl" />
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Fotografia sangrando até a borda esquerda, com o texto da operação ao lado. */
function OperationIntro() {
  return (
    <section aria-labelledby="operacao-titulo" className="pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-32">
      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-12 lg:items-center lg:gap-8">
        <MediaSlot
          src={media.logistics.src}
          alt={media.logistics.alt}
          slot={media.logistics.slot}
          label="Fotografia real da mineradora"
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="aspect-[4/3] sm:aspect-[16/9] lg:col-span-7 lg:aspect-[4/3] xl:aspect-[3/2]"
          imageClassName="object-[75%_50%]"
        />
        <div className="px-4 pt-12 sm:px-8 lg:col-span-5 lg:px-0 lg:pt-0 lg:pr-12 xl:pr-16">
          <Eyebrow index="01">A operação</Eyebrow>
          <h2
            id="operacao-titulo"
            className="mt-6 text-[2.1rem] leading-[1.02] font-bold tracking-[-0.03em] text-graphite sm:text-5xl"
          >
            O material sai da mineradora para a sua obra.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-basalt">
            A Mineradora Berté fica em Ponte Serrada e atende cidades da região com britas, areias e rachões. A venda é
            feita por tonelada ou metro cúbico.
          </p>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6 text-sm font-semibold text-graphite">
            <li>Entrega com frota própria</li>
            <li>Retirada na mineradora</li>
            <li>Tonelada ou m³</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

/** Índice das cidades: base em destaque e demais municípios em grade numerada. */
function CityIndex() {
  const [base, ...served] = cities;
  return (
    <section aria-labelledby="cidades-titulo" className="on-dark bg-graphite py-20 text-offwhite sm:py-24 lg:py-32">
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <Eyebrow index="02" tone="dark">
              Cidades atendidas
            </Eyebrow>
            <h2
              id="cidades-titulo"
              className="mt-6 text-[2.1rem] leading-[1.02] font-bold tracking-[-0.03em] sm:text-5xl xl:text-[3.4rem]"
            >
              Onde a Berté entrega.
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-offwhite/75 lg:col-span-4 lg:col-start-9">
            Cidades de Santa Catarina atendidas a partir da mineradora. Outras localidades mediante consulta.
          </p>
        </div>

        <ol className="mt-12 grid border-t border-offwhite/20 sm:mt-16 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-3">
          <li className="col-span-full flex flex-col gap-2 border-b border-offwhite/20 py-8 sm:flex-row sm:items-baseline sm:justify-between sm:py-10">
            <span className="flex items-baseline gap-5 sm:gap-8">
              <span className="font-display text-sm font-semibold text-sand tabular-nums">01</span>
              <span className="font-display text-4xl leading-none font-bold tracking-[-0.035em] sm:text-6xl xl:text-7xl">
                {base.name}
              </span>
            </span>
            <span className="pl-10 text-xs font-semibold tracking-eyebrow text-sand uppercase sm:pl-0">
              Base de operação · SC
            </span>
          </li>
          {served.map((city, i) => (
            <li key={city.name} className="group flex items-baseline gap-5 border-b border-offwhite/20 py-5 sm:py-6">
              <span className="font-display text-xs font-semibold text-sand tabular-nums">{pad(i + 2)}</span>
              <span className="font-display text-2xl font-semibold tracking-[-0.02em] transition-colors group-hover:text-sand sm:text-[1.75rem]">
                {city.name}
              </span>
              <span className="ml-auto text-xs font-medium text-offwhite/60">SC</span>
            </li>
          ))}
        </ol>

        <div className="mt-14 grid gap-8 border border-offwhite/20 p-6 sm:mt-16 sm:p-10 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-6">
            <h3 className="text-2xl font-bold tracking-[-0.02em] sm:text-3xl">Sua obra fica em outra cidade?</h3>
            <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-offwhite/75">
              O atendimento a outras localidades é feito mediante consulta. Informe a cidade da obra, o material e a
              quantidade.
            </p>
          </div>
          <div className="flex flex-col gap-4 lg:col-span-6 lg:items-end">
            <div className="flex flex-col gap-1 font-display text-xl font-semibold tabular-nums sm:flex-row sm:gap-6 lg:justify-end">
              <a href={company.phone.href} className="hover:text-sand">
                {company.phone.display}
              </a>
              <a href={company.phoneSecondary.href} className="hover:text-sand">
                {company.phoneSecondary.display}
              </a>
            </div>
            <ButtonLink href={quoteHref} variant="light">
              Consultar atendimento
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

function SupplySummary() {
  const rows = [
    {
      title: "Entrega",
      text: "Na obra, com frota própria. As condições são consultadas para cada cidade atendida.",
    },
    {
      title: "Retirada",
      text: `Na mineradora, em ${company.address.city} (${company.address.state}), mediante alinhamento das condições comerciais.`,
    },
  ];

  return (
    <section aria-labelledby="fornecimento-titulo" className="py-20 sm:py-24 lg:py-28">
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Eyebrow index="03">Fornecimento</Eyebrow>
          <h2
            id="fornecimento-titulo"
            className="mt-6 text-[2.1rem] leading-[1.02] font-bold tracking-[-0.03em] text-graphite sm:text-5xl"
          >
            Entrega ou retirada.
          </h2>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <dl className="border-t border-line">
            {rows.map((row) => (
              <div key={row.title} className="grid gap-2 border-b border-line py-6 sm:grid-cols-[10rem_1fr] sm:gap-8 sm:py-8">
                <dt className="font-display text-2xl font-bold tracking-[-0.02em] text-navy">{row.title}</dt>
                <dd className="text-base leading-relaxed text-basalt">{row.text}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <Link href="/estrutura-e-logistica" className="link-underline font-semibold text-navy">
              Conhecer a estrutura e a frota
            </Link>
            <MapsLink />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default function RegionsPage() {
  return (
    <>
      <RegionsHero />
      <OperationIntro />
      <CityIndex />
      <SupplySummary />
      <FinalCta
        title="Consulte o fornecimento para a sua cidade."
        text="Informe a cidade da obra, o material e a quantidade em tonelada ou m³. A equipe comercial informa as condições de entrega ou retirada."
      />
    </>
  );
}
