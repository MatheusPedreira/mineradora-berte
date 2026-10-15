import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { company } from "@/content/company";
import { quoteHref } from "@/content/navigation";

export function FinalCta() {
  return (
    <section aria-labelledby="cta-titulo" className="on-dark relative overflow-hidden bg-navy text-offwhite">
      {/* Geometria discreta derivada do símbolo da marca */}
      <svg
        aria-hidden="true"
        viewBox="0 0 400 300"
        className="pointer-events-none absolute -right-24 -bottom-24 w-[640px] max-w-none text-offwhite/[0.06] sm:-right-10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
      >
        <path d="M10 290 L140 70 L270 290 M178 134 L252 12 L390 290 M10 290 H390" />
      </svg>

      <Container className="relative py-20 sm:py-24 lg:py-32">
        <div className="max-w-4xl">
          <h2
            id="cta-titulo"
            className="text-[2.3rem] leading-[1] font-bold tracking-[-0.035em] sm:text-6xl xl:text-[4.5rem]"
          >
            Seu próximo projeto começa com o material certo.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-offwhite/75 sm:text-lg">
            Consulte a disponibilidade dos materiais e solicite um orçamento para sua obra.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={quoteHref} variant="light">
              Solicitar orçamento
            </ButtonLink>
            <ButtonLink href={company.phone.href} variant="outline-light" icon="phone">
              {company.phone.display}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
