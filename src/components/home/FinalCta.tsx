import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { company } from "@/content/company";
import { quoteHref } from "@/content/navigation";

type FinalCtaProps = {
  title?: string;
  text?: string;
  /** Destino do botão de orçamento (ex.: /contato?produto=brita-1). */
  href?: string;
};

const defaults = {
  title: "Precisa de areia, brita ou agregados para a obra?",
  text: "Informe o material, a quantidade em tonelada ou m³ e se prefere entrega na obra ou retirada em Ponte Serrada. Solicite seu orçamento ou ligue para a equipe comercial.",
};

export function FinalCta({ title = defaults.title, text = defaults.text, href = quoteHref }: FinalCtaProps) {
  return (
    <section aria-labelledby="cta-titulo" data-track-location="final_cta" className="on-dark relative overflow-hidden bg-navy text-offwhite">
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
            {title}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-offwhite/75 sm:text-lg">
            {text}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={href} variant="light">
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
