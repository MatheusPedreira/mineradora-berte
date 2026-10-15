import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { FinalCta } from "@/components/home/FinalCta";
import { cities, company, fleet } from "@/content/company";
import { media, type MediaAsset } from "@/content/media";
import { quoteHref } from "@/content/navigation";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Estrutura e Logística em Ponte Serrada SC",
  description:
    "Usina de britagem, pátio de estocagem e frota própria com caminhões truck, 6x4, bitruck e carretas. Entrega de agregados na região ou retirada na mineradora em Ponte Serrada (SC).",
  path: "/estrutura-e-logistica",
});

const pad = (n: number) => String(n).padStart(2, "0");

const heroFacts = [
  { label: "Frota", value: "Própria" },
  { label: "Fornecimento", value: "Entrega ou retirada" },
  { label: "Comercialização", value: "Tonelada ou m³" },
  { label: "Base", value: `${company.address.city} (${company.address.state})` },
];

type Figure = {
  asset: MediaAsset;
  title: string;
  text: string;
  className: string;
  imageClassName?: string;
  sizes: string;
};

const structure: Figure[] = [
  {
    asset: media.heroDesktop,
    title: "Frente de lavra",
    text: "Extração do basalto, com escavadeira e caminhão fora de estrada.",
    className: "aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[640px]",
    imageClassName: "object-[30%_55%]",
    sizes: "(min-width: 1024px) 40vw, 100vw",
  },
  {
    asset: media.quality,
    title: "Usina de britagem",
    text: "Correias transportadoras e britagem da rocha em diferentes frações.",
    className: "aspect-[4/3] sm:aspect-[16/10]",
    imageClassName: "object-[40%_50%]",
    sizes: "(min-width: 1024px) 55vw, 100vw",
  },
  {
    asset: media.logistics,
    title: "Pátio e estocagem",
    text: "Pilhas de agregados, máquinas de carregamento e estrada de acesso.",
    className: "aspect-[4/3] sm:aspect-[16/10]",
    imageClassName: "object-[60%_50%]",
    sizes: "(min-width: 1024px) 55vw, 100vw",
  },
];

const modes = [
  {
    id: "entrega",
    title: "Entrega",
    text: "O material segue da mineradora para a obra com a frota própria da Berté. As condições de entrega são consultadas para cada localidade atendida.",
    rows: [
      { label: "Destino", value: "A obra, nas cidades atendidas" },
      { label: "Transporte", value: "Frota própria" },
      { label: "Condições", value: "Informadas no orçamento" },
    ],
  },
  {
    id: "retirada",
    title: "Retirada",
    text: "O cliente pode retirar o material diretamente na mineradora, mediante alinhamento das condições comerciais com a equipe.",
    rows: [
      { label: "Local", value: `Mineradora Berté, ${company.address.city} (${company.address.state})` },
      { label: "Localização", value: `${company.address.plusCode} · CEP ${company.address.postalCode}` },
      { label: "Condições", value: "Alinhadas com a equipe comercial" },
    ],
  },
];

/** Hero escuro: título em destaque e fotografia panorâmica da usina. */
function StructureHero() {
  return (
    <section aria-labelledby="estrutura-titulo" className="on-dark bg-graphite text-offwhite">
      <Container className="pt-8 sm:pt-10">
        <Breadcrumbs tone="dark" items={[{ name: "Estrutura e Logística", path: "/estrutura-e-logistica" }]} />

        <div className="mt-12 grid gap-8 sm:mt-16 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <Eyebrow tone="dark">Estrutura e logística</Eyebrow>
            <h1
              id="estrutura-titulo"
              className="mt-6 text-[2.75rem] leading-[0.95] font-bold tracking-[-0.04em] sm:text-7xl xl:text-[6rem]"
            >
              Da mineradora até sua obra.
            </h1>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="max-w-md text-base leading-relaxed text-offwhite/75 sm:text-lg">
              Uma operação que reúne fornecimento de agregados, flexibilidade comercial e logística própria para atender
              Ponte Serrada e região.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <ButtonLink href={quoteHref} variant="light">
                Solicitar orçamento
              </ButtonLink>
              <ButtonLink href={company.phone.href} variant="outline-light" icon="phone">
                {company.phone.display}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>

      <Container className="mt-12 sm:mt-16">
        <MediaSlot
          src={media.structure.src}
          alt={media.structure.alt}
          slot={media.structure.slot}
          label="Fotografia real da usina"
          sizes="(min-width: 1440px) 1344px, 100vw"
          preload
          className="-mx-4 aspect-[4/3] sm:mx-0 sm:aspect-[16/9] lg:aspect-[21/9]"
          imageClassName="object-[42%_50%]"
        />
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {heroFacts.map((fact, i) => (
            <div
              key={fact.label}
              className={`border-line-dark py-6 sm:py-8 ${i % 2 === 1 ? "border-l pl-4 sm:pl-6" : "pr-4"} ${
                i > 1 ? "border-t lg:border-t-0" : ""
              } ${i === 2 ? "lg:border-l lg:pl-6" : ""}`}
            >
              <dt className="text-[0.65rem] font-semibold tracking-[0.1em] text-sand uppercase sm:text-xs sm:tracking-eyebrow">
                {fact.label}
              </dt>
              <dd className="mt-2 font-display text-lg leading-tight font-semibold sm:text-xl">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

function StructureFigure({ figure, index }: { figure: Figure; index: number }) {
  return (
    <figure className="flex h-full flex-col">
      <MediaSlot
        src={figure.asset.src}
        alt={figure.asset.alt}
        slot={figure.asset.slot}
        label="Fotografia real da operação"
        sizes={figure.sizes}
        className={`flex-1 ${figure.className}`}
        imageClassName={figure.imageClassName}
      />
      <figcaption className="flex items-baseline gap-4 border-b border-line py-4">
        <span className="font-display text-xs font-semibold text-sand-deep tabular-nums">{pad(index + 1)}</span>
        <span>
          <span className="block font-display text-lg font-semibold text-graphite">{figure.title}</span>
          <span className="mt-1 block text-sm leading-relaxed text-basalt">{figure.text}</span>
        </span>
      </figcaption>
    </figure>
  );
}

function OperationalStructure() {
  const [quarry, plant, yard] = structure;
  return (
    <section aria-labelledby="operacional-titulo" className="py-20 sm:py-24 lg:py-32">
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <Eyebrow index="01">Estrutura operacional</Eyebrow>
            <h2
              id="operacional-titulo"
              className="mt-6 text-[2.1rem] leading-[1.02] font-bold tracking-[-0.03em] text-graphite sm:text-5xl xl:text-[3.4rem]"
            >
              A estrutura que sustenta o fornecimento.
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-basalt lg:col-span-4 lg:col-start-9">
            Frente de lavra, usina de britagem e pátio de estocagem em Ponte Serrada. É daqui que saem os
            materiais para entrega ou retirada.
          </p>
        </div>

        <div className="mt-12 grid gap-10 sm:mt-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5 lg:row-span-2">
            <StructureFigure figure={quarry} index={0} />
          </div>
          <div className="lg:col-span-7">
            <StructureFigure figure={plant} index={1} />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <StructureFigure figure={yard} index={2} />
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Frota própria: composição tipográfica; a foto entra quando `media.fleet.src` for preenchido. */
function Fleet() {
  return (
    <section aria-labelledby="frota-titulo" className="on-dark bg-navy-deep py-20 text-offwhite sm:py-24 lg:py-32">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Eyebrow index="02" tone="dark">
            Frota própria
          </Eyebrow>
          <h2
            id="frota-titulo"
            className="mt-6 text-[2.1rem] leading-[1.02] font-bold tracking-[-0.03em] sm:text-5xl xl:text-[3.4rem]"
          >
            Caminhões próprios para levar o material até a obra.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-offwhite/75">
            A Mineradora Berté dispõe de frota própria, com caminhões de diferentes configurações. O veículo e as
            condições de cada entrega são combinados com a equipe comercial.
          </p>
          {media.fleet.src ? (
            <MediaSlot
              src={media.fleet.src}
              alt={media.fleet.alt}
              slot={media.fleet.slot}
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="mt-10 aspect-[4/3]"
            />
          ) : null}
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <p className="text-xs font-semibold tracking-eyebrow text-sand uppercase">Configurações disponíveis</p>
          <ol className="mt-5 border-t border-offwhite/20">
            {fleet.map((item, i) => (
              <li key={item} className="group relative flex items-baseline gap-5 border-b border-offwhite/20 py-6 sm:gap-8 sm:py-8">
                <span
                  aria-hidden="true"
                  className="absolute bottom-[-1px] left-0 h-px w-0 bg-sand transition-[width] duration-700 ease-out-quart group-hover:w-full"
                />
                <span className="font-display text-sm font-semibold text-sand tabular-nums">{pad(i + 1)}</span>
                <span className="font-display text-[2rem] leading-none font-bold tracking-[-0.03em] sm:text-5xl xl:text-6xl">
                  {item}
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-offwhite/70">
            Agilidade e flexibilidade logística no atendimento a Ponte Serrada e região.
          </p>
        </div>
      </Container>
    </section>
  );
}

function SupplyModes() {
  return (
    <section aria-labelledby="modalidades-titulo" className="py-20 sm:py-24 lg:py-32">
      <Container>
        <Eyebrow index="03">Modalidades de fornecimento</Eyebrow>
        <h2
          id="modalidades-titulo"
          className="mt-6 max-w-3xl text-[2.1rem] leading-[1.02] font-bold tracking-[-0.03em] text-graphite sm:text-5xl xl:text-[3.4rem]"
        >
          Entrega na obra ou retirada na mineradora.
        </h2>

        <div className="mt-12 grid border-t border-line sm:mt-16 lg:grid-cols-2">
          {modes.map((mode, i) => (
            <section
              key={mode.id}
              aria-labelledby={`modo-${mode.id}`}
              className={`py-10 sm:py-12 ${i > 0 ? "border-t border-line lg:border-t-0 lg:border-l lg:pl-12" : "lg:pr-12"}`}
            >
              <h3
                id={`modo-${mode.id}`}
                className="text-4xl font-bold tracking-[-0.03em] text-navy sm:text-5xl"
              >
                {mode.title}
              </h3>
              <p className="mt-5 max-w-md text-base leading-relaxed text-basalt">{mode.text}</p>
              <dl className="mt-8 border-t border-line">
                {mode.rows.map((row) => (
                  <div key={row.label} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[8.5rem_1fr] sm:gap-4">
                    <dt className="text-sm font-semibold text-graphite">{row.label}</dt>
                    <dd className="text-[0.9375rem] leading-relaxed text-basalt">{row.value}</dd>
                  </div>
                ))}
              </dl>
              {mode.id === "retirada" ? (
                <a
                  href={company.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:underline"
                >
                  Abrir no Google Maps
                  <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
                  <span className="sr-only">(abre em nova aba)</span>
                </a>
              ) : (
                <Link
                  href="/regioes-atendidas"
                  className="link-underline mt-5 inline-block text-sm font-semibold text-navy"
                >
                  Ver regiões atendidas
                </Link>
              )}
            </section>
          ))}
        </div>

        <div className="mt-6 grid gap-6 bg-stone p-6 sm:p-8 lg:grid-cols-12 lg:items-center lg:gap-8 lg:p-10">
          <p className="text-xs font-semibold tracking-eyebrow text-basalt uppercase lg:col-span-3">Comercialização</p>
          <p className="font-display text-2xl font-bold tracking-[-0.02em] text-graphite sm:text-3xl lg:col-span-4">
            Tonelada <span className="font-normal text-sand-deep">/</span> metro cúbico
          </p>
          <p className="max-w-md text-sm leading-relaxed text-basalt lg:col-span-5">
            A relação entre tonelada e m³ varia conforme o material, por isso não há conversão fixa. Informe a
            quantidade na unidade que preferir.
          </p>
        </div>
      </Container>
    </section>
  );
}

function RegionalService() {
  const highlighted = cities.filter((c) => c.confirmed).slice(0, 6);
  return (
    <section aria-labelledby="regional-titulo" className="border-t border-line py-20 sm:py-24">
      <Container className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
        <div className="lg:col-span-4">
          <Eyebrow index="04">Atendimento regional</Eyebrow>
          <h2
            id="regional-titulo"
            className="mt-6 text-[2.1rem] leading-[1.02] font-bold tracking-[-0.03em] text-graphite sm:text-5xl"
          >
            Ponte Serrada e região.
          </h2>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <p className="font-display text-xl leading-snug font-semibold text-graphite sm:text-2xl">
            {highlighted.map((c) => c.name).join(", ")} e outras cidades do oeste catarinense.
          </p>
          <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-sm text-[0.9375rem] leading-relaxed text-basalt">
              Outras localidades mediante consulta.
            </p>
            <ButtonLink href="/regioes-atendidas" variant="outline">
              Ver regiões atendidas
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default function LogisticsPage() {
  return (
    <>
      <StructureHero />
      <OperationalStructure />
      <Fleet />
      <SupplyModes />
      <RegionalService />
      <FinalCta
        title="Precisa organizar o fornecimento de materiais para sua obra?"
        text="Informe o material, a quantidade em tonelada ou m³, a cidade da obra e se prefere entrega ou retirada. A equipe comercial informa as condições."
      />
    </>
  );
}
