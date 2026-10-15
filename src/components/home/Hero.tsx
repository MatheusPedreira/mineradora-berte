import { getImageProps } from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { company } from "@/content/company";
import { media } from "@/content/media";
import { quoteHref } from "@/content/navigation";
import { whatsappDirectHref } from "@/content/quote";

const heroSizes = "(min-width: 1024px) 58vw, 100vw";

/** Fotografia do hero com versões separadas para desktop e celular (art direction). */
function HeroMedia() {
  const { heroDesktop: desktop, heroMobile: mobile } = media;

  if (desktop.src && mobile.src) {
    const common = { alt: desktop.alt, sizes: heroSizes, fetchPriority: "high" as const };
    const {
      props: { srcSet: desktopSet },
    } = getImageProps({ ...common, src: desktop.src, width: desktop.width ?? 2400, height: desktop.height ?? 1600 });
    const {
      props: { srcSet: mobileSet, ...rest },
    } = getImageProps({ ...common, src: mobile.src, width: mobile.width ?? 1080, height: mobile.height ?? 1350 });

    return (
      <picture className="relative block aspect-[4/5] overflow-hidden bg-stone sm:aspect-[16/10] lg:aspect-auto lg:h-full">
        <source media="(min-width: 1024px)" srcSet={desktopSet} />
        <source srcSet={mobileSet} />
        {/* eslint-disable-next-line jsx-a11y/alt-text -- alt vem de getImageProps */}
        <img {...rest} className="h-full w-full object-cover lg:absolute lg:inset-0 lg:object-[28%_50%]" />
      </picture>
    );
  }

  return (
    <>
      <MediaSlot
        src={null}
        alt={mobile.alt}
        slot={mobile.slot}
        label="Fotografia real da mineradora"
        sizes={heroSizes}
        className="aspect-[4/5] sm:aspect-[16/10] lg:hidden"
      />
      <MediaSlot
        src={null}
        alt={desktop.alt}
        slot={desktop.slot}
        label="Fotografia real da mineradora"
        sizes={heroSizes}
        className="hidden h-full lg:block"
      />
    </>
  );
}

const facts = [
  { label: "Comercialização", value: "Tonelada e m³" },
  { label: "Fornecimento", value: "Entrega ou retirada" },
  { label: "Logística", value: "Frota própria" },
];

export function Hero() {
  return (
    <section aria-labelledby="hero-titulo" className="relative border-b border-line">
      <Container className="grid lg:min-h-[min(calc(100svh-5rem),900px)] lg:grid-cols-12">
        <div className="flex flex-col justify-center pt-10 pb-10 sm:pt-16 sm:pb-12 lg:col-span-6 lg:py-20 lg:pr-12 xl:col-span-5">
          <p className="animate-rise text-[0.7rem] font-semibold tracking-eyebrow text-basalt uppercase sm:text-xs">
            Mineradora Berté <span className="px-1.5 text-sand-deep">·</span> Ponte Serrada / SC
          </p>

          <h1
            id="hero-titulo"
            className="mt-6 max-w-[12ch] animate-rise text-[2.6rem] leading-[0.98] font-bold tracking-[-0.035em] text-graphite [animation-delay:80ms] sm:text-6xl lg:text-[4.1rem] xl:text-[4.6rem] 2xl:text-[5rem]"
          >
            Areia, brita e agregados para <span className="text-navy">sua obra.</span>
          </h1>

          <p className="mt-6 max-w-md animate-rise text-base leading-relaxed text-basalt [animation-delay:160ms] sm:text-lg">
            Fornecimento de materiais para construção civil, com qualidade, flexibilidade e logística própria em Ponte
            Serrada e região.
          </p>

          <div className="mt-9 flex animate-rise flex-col gap-3 [animation-delay:240ms] sm:flex-row">
            <ButtonLink href={quoteHref}>Solicitar orçamento</ButtonLink>
            <ButtonLink href="/produtos" variant="outline" icon="none">
              Conhecer produtos
            </ButtonLink>
          </div>

          <p className="mt-5 animate-rise text-sm text-basalt [animation-delay:300ms]">
            Prefere falar agora?{" "}
            <a
              href={company.phone.href}
              className="font-semibold text-ink underline decoration-sand decoration-2 underline-offset-4 transition-colors hover:text-navy hover:decoration-navy"
            >
              Ligue {company.phone.display}
            </a>{" "}
            ou{" "}
            <a
              href={whatsappDirectHref}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-ink underline decoration-sand decoration-2 underline-offset-4 transition-colors hover:text-navy hover:decoration-navy"
            >
              fale no WhatsApp
            </a>
          </p>

          <dl className="mt-10 grid animate-rise sm:mt-12 grid-cols-3 border-t border-line [animation-delay:360ms]">
            {facts.map((fact, i) => (
              <div key={fact.label} className={`pt-4 ${i > 0 ? "border-l border-line pl-3 sm:pl-5" : "pr-3"}`}>
                <dt className="text-[0.65rem] font-semibold tracking-[0.08em] text-basalt uppercase sm:tracking-eyebrow">
                  {fact.label}
                </dt>
                <dd className="mt-1.5 font-display text-sm leading-tight font-semibold text-graphite sm:text-base">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="-mx-4 sm:-mx-8 lg:col-span-6 lg:mx-0 lg:-mr-12 xl:col-span-7">
          <HeroMedia />
        </div>
      </Container>
    </section>
  );
}
