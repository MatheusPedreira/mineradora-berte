import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { FinalCta } from "@/components/home/FinalCta";
import { company } from "@/content/company";
import { media } from "@/content/media";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Sobre a empresa em Ponte Serrada SC",
  description:
    "Conheça a Mineradora Berté: extração de basalto, britagem e fornecimento de britas, areias e rachões para construção civil em Ponte Serrada (SC), com frota própria.",
  path: "/sobre",
});

const pad = (n: number) => String(n).padStart(2, "0");

/** Famílias de materiais citadas na apresentação (não é um segundo catálogo). */
const materials = [
  { label: "Britas", href: "/produtos#britas" },
  { label: "Areias", href: "/produtos#areias" },
  { label: "Pedrisco", href: "/produtos#pedrisco" },
  { label: "Pó de brita", href: "/produtos#po-de-brita" },
  { label: "Bica corrida", href: "/produtos#bica-corrida" },
  { label: "Rachões", href: "/produtos#rachoes" },
];

const operation = [
  {
    title: "Estrutura de mineração",
    text: "Frente de lavra de basalto, máquinas de carregamento e pátio próprio em Ponte Serrada (SC).",
  },
  {
    title: "Beneficiamento",
    text: "A rocha passa pela usina de britagem, onde é separada em diferentes frações, das britas ao pó de brita.",
  },
  {
    title: "Organização do fornecimento",
    text: "Os materiais ficam estocados no pátio e são comercializados por tonelada ou metro cúbico.",
  },
  {
    title: "Compromisso com a qualidade",
    text: "Basalto de alta qualidade, granulometria padronizada e controle tecnológico dos materiais.",
  },
];

const differentials = [
  {
    title: "Qualidade do basalto",
    text: "Os materiais são produzidos a partir de basalto de alta qualidade.",
  },
  {
    title: "Granulometria padronizada",
    text: "Cada material é separado na usina dentro do seu padrão, para manter a regularidade entre um fornecimento e outro.",
  },
  {
    title: "Controle tecnológico",
    text: "A produção é acompanhada por controle tecnológico. Dados técnicos de cada material são informados pela equipe comercial.",
  },
  {
    title: "Flexibilidade no fornecimento",
    text: "Venda por tonelada ou metro cúbico, com entrega na obra ou retirada na mineradora.",
  },
  {
    title: "Frota própria",
    text: "Caminhões truck, 6x4, bitruck e carretas, com agilidade e flexibilidade logística.",
  },
];

const nextSteps = [
  {
    title: "Conhecer produtos",
    text: "Britas, areias e rachões: os 10 materiais da Berté.",
    href: "/produtos",
  },
  {
    title: "Estrutura e logística",
    text: "Usina, pátio de estocagem e frota própria para entrega na obra.",
    href: "/estrutura-e-logistica",
  },
];

/** Fotografia ampla com o título recortado sobre ela (desktop); no celular, título antes da foto. */
function AboutHero() {
  return (
    <section aria-labelledby="sobre-titulo" className="border-b border-line">
      <Container className="pt-8 sm:pt-10">
        <Breadcrumbs items={[{ name: "Sobre", path: "/sobre" }]} />
      </Container>

      <Container className="mt-10 flex flex-col sm:mt-14 lg:mt-10 lg:grid">
        <MediaSlot
          src={media.institutional.src}
          alt={media.institutional.alt}
          slot={media.institutional.slot}
          label="Fotografia real da operação"
          sizes="(min-width: 1440px) 1344px, 100vw"
          preload
          className="-mx-4 aspect-[4/3] sm:mx-0 sm:aspect-[16/9] lg:[grid-area:1/1] lg:aspect-auto lg:h-[min(calc(100svh-15rem),760px)] lg:min-h-[520px]"
          imageClassName="object-[60%_50%]"
        />
        <div className="relative z-10 order-first pb-10 sm:pb-12 lg:order-none lg:[grid-area:1/1] lg:w-[64%] lg:self-end lg:bg-offwhite lg:pt-12 lg:pr-14 lg:pb-0 xl:w-[58%]">
          <Eyebrow>Sobre a Mineradora Berté</Eyebrow>
          <h1
            id="sobre-titulo"
            className="mt-6 text-[2.5rem] leading-[0.98] font-bold tracking-[-0.035em] text-graphite sm:text-6xl lg:text-[3.6rem] xl:text-[4.2rem]"
          >
            Da rocha ao fornecimento. <span className="text-navy">Estrutura para atender sua obra.</span>
          </h1>
        </div>
      </Container>

      <Container className="grid gap-6 py-10 sm:py-12 lg:grid-cols-12 lg:gap-8 lg:py-14">
        <p className="max-w-xl text-base leading-relaxed text-basalt sm:text-lg lg:col-span-6">
          Mineração, britagem e fornecimento de agregados para construção civil em {company.address.city},{" "}
          {company.address.stateName}.
        </p>
        <p className="text-xs font-semibold tracking-eyebrow text-basalt uppercase lg:col-span-5 lg:col-start-8 lg:text-right">
          {company.address.city} · {company.address.state}
          <span className="px-2 text-sand-deep">/</span>
          {company.address.plusCode}
        </p>
      </Container>
    </section>
  );
}

function Presentation() {
  return (
    <section aria-labelledby="empresa-titulo" className="py-20 sm:py-24 lg:py-32">
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-3">
          <Eyebrow index="01">A empresa</Eyebrow>
          <h2 id="empresa-titulo" className="sr-only">
            A empresa
          </h2>
        </div>
        <div className="lg:col-span-9">
          <p className="font-display text-[1.65rem] leading-[1.18] font-semibold tracking-[-0.02em] text-graphite sm:text-4xl lg:text-[2.75rem]">
            A Mineradora Berté fornece agregados para construção civil a partir de Ponte Serrada, no oeste de Santa
            Catarina.{" "}
            <span className="text-basalt">
              A operação reúne a extração do basalto, a britagem e a estocagem dos materiais que seguem para as obras
              da região.
            </span>
          </p>

          <div className="mt-12 grid gap-6 border-t border-line pt-8 sm:mt-16 lg:grid-cols-9 lg:gap-8">
            <p className="text-xs font-semibold tracking-eyebrow text-basalt uppercase lg:col-span-2 lg:pt-2">
              Materiais
            </p>
            <div className="lg:col-span-7">
              <ul className="flex flex-wrap items-baseline gap-x-3 gap-y-2 font-display text-xl font-semibold text-graphite sm:text-2xl">
                {materials.map((item, i) => (
                  <li key={item.label} className="flex items-baseline gap-3">
                    <Link href={item.href} className="link-underline transition-colors hover:text-navy">
                      {item.label}
                    </Link>
                    {i < materials.length - 1 ? (
                      <span aria-hidden="true" className="font-normal text-sand-deep">
                        /
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
              <p className="mt-5 max-w-lg text-[0.9375rem] leading-relaxed text-basalt">
                Comercializados por tonelada ou metro cúbico, com entrega em frota própria ou retirada na mineradora.{" "}
                <Link href="/produtos" className="link-underline font-semibold text-navy">
                  Ver o catálogo
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Operation() {
  return (
    <section aria-labelledby="operacao-titulo" className="on-dark bg-graphite py-20 text-offwhite sm:py-24 lg:py-32">
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <Eyebrow index="02" tone="dark">
              Nossa operação
            </Eyebrow>
            <h2
              id="operacao-titulo"
              className="mt-6 text-[2.1rem] leading-[1.02] font-bold tracking-[-0.03em] sm:text-5xl xl:text-[3.4rem]"
            >
              Da frente de lavra ao pátio de materiais.
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-offwhite/75 lg:col-span-4 lg:col-start-9">
            Extração, britagem e estocagem compõem a operação da Mineradora Berté em Ponte Serrada, antes de o material seguir para a obra.
          </p>
        </div>

        <MediaSlot
          src={media.quality.src}
          alt={media.quality.alt}
          slot={media.quality.slot}
          label="Fotografia real da usina"
          sizes="(min-width: 1440px) 1344px, 100vw"
          className="-mx-4 mt-12 aspect-[4/3] sm:mx-0 sm:mt-16 sm:aspect-[16/9] lg:aspect-[21/9]"
          imageClassName="object-[35%_50%]"
        />

        <ol className="mt-12 grid gap-x-8 gap-y-10 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {operation.map((item, i) => (
            <li key={item.title} className="border-t border-offwhite/20 pt-6">
              <span className="font-display text-sm font-semibold text-sand tabular-nums">{pad(i + 1)}</span>
              <h3 className="mt-4 text-xl font-semibold tracking-[-0.01em]">{item.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-offwhite/75">{item.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/** Diferenciais em formato de tabela editorial: numeração vazada, título e texto. */
function AboutDifferentials() {
  return (
    <section aria-labelledby="diferenciais-titulo" className="py-20 sm:py-24 lg:py-32">
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <Eyebrow index="03">Diferenciais</Eyebrow>
            <h2
              id="diferenciais-titulo"
              className="mt-6 text-[2.1rem] leading-[1.02] font-bold tracking-[-0.03em] text-graphite sm:text-5xl xl:text-[3.4rem]"
            >
              O padrão por trás de cada fornecimento.
            </h2>
          </div>
        </div>

        <ol className="mt-12 border-b border-line sm:mt-16">
          {differentials.map((item, i) => (
            <li
              key={item.title}
              className="group relative grid grid-cols-[3.5rem_1fr] gap-x-4 gap-y-2 border-t border-line py-7 sm:grid-cols-[6rem_1fr] sm:py-9 lg:grid-cols-12 lg:items-baseline lg:gap-8"
            >
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 h-px w-0 bg-navy transition-[width] duration-700 ease-out-quart group-hover:w-full"
              />
              <span
                aria-hidden="true"
                className="row-span-2 font-display text-4xl leading-none font-bold text-transparent [-webkit-text-stroke:1px_var(--color-navy)] sm:text-6xl lg:col-span-2 lg:row-span-1"
              >
                {pad(i + 1)}
              </span>
              <h3 className="text-xl font-semibold tracking-[-0.015em] text-graphite sm:text-2xl lg:col-span-4 lg:text-[1.75rem]">
                {item.title}
              </h3>
              <p className="max-w-md text-[0.9375rem] leading-relaxed text-basalt lg:col-span-5 lg:col-start-8">
                {item.text}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

function NextSteps() {
  return (
    <nav aria-label="Continue navegando" className="bg-stone">
      <Container className="grid lg:grid-cols-2">
        {nextSteps.map((step, i) => (
          <Link
            key={step.href}
            href={step.href}
            className={`group flex items-end justify-between gap-6 py-10 sm:py-14 ${
              i > 0 ? "border-t border-ink/15 lg:border-t-0 lg:border-l lg:pl-12" : "lg:pr-12"
            }`}
          >
            <span>
              <span className="block font-display text-3xl font-bold tracking-[-0.025em] text-graphite transition-colors group-hover:text-navy sm:text-4xl">
                {step.title}
              </span>
              <span className="mt-3 block text-[0.9375rem] leading-relaxed text-basalt">{step.text}</span>
            </span>
            <ArrowRight
              aria-hidden="true"
              className="mb-1 size-6 shrink-0 text-basalt transition-transform duration-300 ease-out-quart group-hover:translate-x-1 group-hover:text-navy"
              strokeWidth={1.5}
            />
          </Link>
        ))}
      </Container>
    </nav>
  );
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Presentation />
      <Operation />
      <AboutDifferentials />
      <NextSteps />
      <FinalCta
        title="Conte o que a sua obra precisa."
        text="Informe o material, a quantidade em tonelada ou m³ e se prefere entrega na obra ou retirada em Ponte Serrada. A equipe comercial informa as condições de fornecimento."
      />
    </>
  );
}
