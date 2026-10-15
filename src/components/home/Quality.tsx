import { FileText } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { company, technicalDocuments } from "@/content/company";
import { media } from "@/content/media";

const pillars = ["Basalto de alta qualidade", "Granulometria padronizada", "Controle tecnológico"];

export function Quality() {
  return (
    <section aria-labelledby="qualidade-titulo" className="bg-stone py-20 sm:py-24 lg:py-32">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Eyebrow index="04">Qualidade dos materiais</Eyebrow>
          <h2
            id="qualidade-titulo"
            className="mt-6 text-[2.1rem] leading-[1.02] font-bold tracking-[-0.03em] text-graphite sm:text-5xl xl:text-[3.4rem]"
          >
            Qualidade que começa na rocha.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-basalt">
            O compromisso da Mineradora Berté é fornecer materiais produzidos a partir de basalto de alta qualidade,
            com granulometria padronizada e acompanhamento por controle tecnológico.
          </p>

          <ul className="mt-10 border-t border-ink/15">
            {pillars.map((pillar, i) => (
              <li key={pillar} className="flex items-baseline gap-5 border-b border-ink/15 py-4">
                <span className="font-display text-xs font-semibold text-sand-deep tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-lg font-semibold text-graphite">{pillar}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-6 lg:col-span-6 lg:col-start-7 lg:grid-rows-[1fr_auto]">
          <MediaSlot
            src={media.quality.src}
            alt={media.quality.alt}
            slot={media.quality.slot}
            label="Fotografia real da produção"
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[420px]"
          />

          <div className="border border-ink/15 bg-offwhite p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <FileText aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-navy" strokeWidth={1.5} />
              <div>
                <h3 className="font-display text-lg font-semibold text-graphite">Informações técnicas</h3>
                {technicalDocuments.length > 0 ? (
                  <ul className="mt-3 space-y-2 text-sm">
                    {technicalDocuments.map((doc) => (
                      <li key={doc.href}>
                        <a href={doc.href} className="link-underline font-medium text-navy">
                          {doc.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-sm leading-relaxed text-basalt">
                    Para dados técnicos de cada material, fale com a equipe comercial. A documentação técnica será
                    disponibilizada nesta seção.
                  </p>
                )}
                <ButtonLink href={company.phone.href} variant="outline" icon="phone" className="mt-6">
                  {company.phone.display}
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
