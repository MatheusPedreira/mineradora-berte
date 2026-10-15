import { Container } from "@/components/ui/Container";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { PageHeader } from "@/components/ui/PageHeader";
import { Differentials } from "@/components/home/Differentials";
import { FinalCta } from "@/components/home/FinalCta";
import { media } from "@/content/media";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Sobre a Mineradora Berté",
  description:
    "Conheça a Mineradora Berté, empresa de mineração e fornecimento de agregados para construção civil em Ponte Serrada, Santa Catarina.",
  path: "/sobre",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Sobre"
        title="Mineração e agregados em Ponte Serrada."
        lead="A Mineradora Berté fornece areia, brita e agregados para construção civil em Ponte Serrada e região, em Santa Catarina."
        crumbs={[{ name: "Sobre", path: "/sobre" }]}
      />

      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-8 lg:py-24">
        <div className="lg:col-span-7">
          <MediaSlot
            src={media.institutional.src}
            alt={media.institutional.alt}
            slot={media.institutional.slot}
            label="Fotografia real das instalações"
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="aspect-[4/3]"
          />
        </div>
        <div className="space-y-5 text-base leading-relaxed text-basalt lg:col-span-5 lg:pl-8">
          <h2 className="text-3xl font-bold tracking-[-0.025em] text-graphite sm:text-4xl">A empresa</h2>
          <p>
            Com base em Ponte Serrada (SC), a Mineradora Berté trabalha com materiais produzidos a partir de basalto de
            alta qualidade, com granulometria padronizada e controle tecnológico.
          </p>
          <p>
            A operação conta com frota própria e flexibilidade no fornecimento: os materiais são comercializados por
            tonelada ou metro cúbico, com entrega ou retirada na mineradora.
          </p>
          {/* Pendente: história, trajetória e equipe — aguardando conteúdo oficial da empresa. */}
        </div>
      </Container>

      <Differentials />
      <FinalCta />
    </>
  );
}
