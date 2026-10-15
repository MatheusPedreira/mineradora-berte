import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { fleet } from "@/content/company";
import { media } from "@/content/media";

const points = [
  {
    title: "Entrega de materiais",
    text: "Entrega com frota própria, para atender a obra com agilidade e flexibilidade.",
  },
  {
    title: "Retirada na mineradora",
    text: "O cliente também pode retirar o material diretamente em Ponte Serrada.",
  },
  {
    title: "Tonelada ou m³",
    text: "Comercialização por tonelada e por metro cúbico, conforme a necessidade da obra.",
  },
];

export function Logistics() {
  return (
    <section aria-labelledby="logistica-titulo" className="on-dark bg-graphite text-offwhite">
      <Container className="grid gap-12 py-20 sm:py-24 lg:grid-cols-12 lg:gap-8 lg:py-32">
        <div className="lg:col-span-6 xl:col-span-7">
          <MediaSlot
            src={media.logistics.src}
            alt={media.logistics.alt}
            slot={media.logistics.slot}
            label="Fotografia real da operação"
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[640px]"
            imageClassName="object-[85%_50%]"
          />
        </div>

        <div className="flex flex-col lg:col-span-6 lg:pl-8 xl:col-span-5 xl:pl-12">
          <Eyebrow index="03" tone="dark">
            Estrutura e logística
          </Eyebrow>
          <h2
            id="logistica-titulo"
            className="mt-6 text-[2.1rem] leading-[1.02] font-bold tracking-[-0.03em] sm:text-5xl xl:text-[3.4rem]"
          >
            Estrutura para fornecer. Logística para atender.
          </h2>

          <div className="mt-10 border-t border-line-dark pt-8">
            <h3 className="text-xs font-semibold tracking-eyebrow text-sand uppercase">Frota própria</h3>
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Configurações de caminhões">
              {fleet.map((item) => (
                <li
                  key={item}
                  className="border border-offwhite/20 px-3 py-2 text-sm font-medium text-offwhite/90 transition-colors hover:border-sand"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <dl className="mt-8">
            {points.map((point) => (
              <div key={point.title} className="grid gap-1 border-t border-line-dark py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
                <dt className="font-display text-base font-semibold">{point.title}</dt>
                <dd className="text-[0.9375rem] leading-relaxed text-offwhite/75">{point.text}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 border-t border-line-dark pt-8 lg:mt-auto">
            <ButtonLink href="/estrutura-e-logistica" variant="outline-light">
              Conhecer a estrutura
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
