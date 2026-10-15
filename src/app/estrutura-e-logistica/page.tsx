import { Container } from "@/components/ui/Container";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { PageHeader } from "@/components/ui/PageHeader";
import { FinalCta } from "@/components/home/FinalCta";
import { company, fleet } from "@/content/company";
import { media } from "@/content/media";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Estrutura e Logística",
  description:
    "Frota própria com caminhões truck, 6x4, bitruck e carretas. Entrega de areia, brita e agregados ou retirada na mineradora em Ponte Serrada (SC).",
  path: "/estrutura-e-logistica",
});

export default function LogisticsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Estrutura e logística"
        title="Estrutura para fornecer. Logística para atender."
        lead="Frota própria e flexibilidade no fornecimento: entrega na obra ou retirada na mineradora."
        crumbs={[{ name: "Estrutura e Logística", path: "/estrutura-e-logistica" }]}
      />

      <Container className="py-16 sm:py-20 lg:py-24">
        <MediaSlot
          src={media.logistics.src}
          alt={media.logistics.alt}
          slot={media.logistics.slot}
          label="Fotografia real da frota"
          sizes="100vw"
          className="aspect-[4/3] sm:aspect-[21/9]"
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-8">
          <section aria-labelledby="frota" className="lg:col-span-5">
            <h2 id="frota" className="text-3xl font-bold tracking-[-0.025em] text-graphite sm:text-4xl">
              Frota própria
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-basalt">
              Diferentes configurações de caminhões para atender o volume e o tipo de cada fornecimento.
            </p>
            <ul className="mt-8 border-t border-line">
              {fleet.map((item, i) => (
                <li key={item} className="flex items-baseline gap-5 border-b border-line py-4">
                  <span className="font-display text-xs font-semibold text-sand-deep tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-lg font-semibold text-graphite">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="fornecimento" className="lg:col-span-6 lg:col-start-7">
            <h2 id="fornecimento" className="text-3xl font-bold tracking-[-0.025em] text-graphite sm:text-4xl">
              Modalidades de fornecimento
            </h2>
            <dl className="mt-8 border-t border-line">
              {company.supplyModes.map((mode) => (
                <div key={mode.id} className="grid gap-1 border-b border-line py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <dt className="font-display text-lg font-semibold text-graphite">{mode.label}</dt>
                  <dd className="text-base leading-relaxed text-basalt">{mode.description}</dd>
                </div>
              ))}
              <div className="grid gap-1 border-b border-line py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <dt className="font-display text-lg font-semibold text-graphite">Unidades</dt>
                <dd className="text-base leading-relaxed text-basalt">Comercialização por tonelada e por metro cúbico (m³).</dd>
              </div>
            </dl>
          </section>
        </div>
      </Container>

      <FinalCta />
    </>
  );
}
