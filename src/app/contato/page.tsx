import { Suspense } from "react";
import { ArrowUpRight } from "lucide-react";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { company } from "@/content/company";
import { getProduct } from "@/content/products";
import { whatsappDirectHref, whatsappSecondaryHref } from "@/content/quote";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contato e Orçamento",
  description:
    "Solicite orçamento de areia, brita e agregados com a Mineradora Berté, em Ponte Serrada (SC). Informe material, quantidade e entrega ou retirada e envie pelo WhatsApp, ou ligue (49) 98409-3337.",
  path: "/contato",
});

/**
 * Formulário com o material pré-selecionado (/contato?produto=<slug>).
 * O parâmetro só é aceito se corresponder a um material do catálogo.
 */
async function QuoteFormWithProduct({ searchParams }: Pick<PageProps<"/contato">, "searchParams">) {
  const { produto } = await searchParams;
  const product = typeof produto === "string" ? getProduct(produto) : undefined;
  return <QuoteForm initialProduct={product?.slug} />;
}

export default function ContactPage({ searchParams }: PageProps<"/contato">) {
  return (
    <>
      <PageHeader
        eyebrow="Orçamento"
        title="Solicite seu orçamento."
        lead="Informe o material, a quantidade e se prefere entrega na obra ou retirada na mineradora. A equipe comercial informa as condições."
        crumbs={[{ name: "Contato", path: "/contato" }]}
      />

      <Container className="grid gap-14 py-12 sm:py-16 lg:grid-cols-12 lg:gap-8 lg:py-24">
        <section aria-labelledby="orcamento-titulo" id="orcamento" className="scroll-mt-28 lg:col-span-7">
          <h2 id="orcamento-titulo" className="sr-only">
            Formulário de orçamento
          </h2>
          <Suspense fallback={<QuoteForm />}>
            <QuoteFormWithProduct searchParams={searchParams} />
          </Suspense>
        </section>

        <aside className="lg:col-span-4 lg:col-start-9">
          <div className="lg:sticky lg:top-28">
            <section aria-labelledby="atendimento" className="on-dark bg-navy p-8 text-offwhite sm:p-10">
              <h2 id="atendimento" className="text-[0.7rem] font-semibold tracking-eyebrow text-sand uppercase">
                Atendimento comercial
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-offwhite/75">
                Prefere conversar antes de preencher? Fale direto com a equipe.
              </p>
              <a
                href={company.phone.href}
                className="mt-5 block font-display text-[2rem] leading-none font-bold tracking-[-0.02em] tabular-nums hover:text-sand sm:text-4xl"
              >
                {company.phone.display}
              </a>
              <p className="mt-2 text-xs text-offwhite/60">Telefone e WhatsApp</p>
              <div className="mt-6 grid gap-3">
                <ButtonLink href={whatsappDirectHref} variant="light" icon="whatsapp" className="w-full">
                  Falar no WhatsApp
                </ButtonLink>
                <ButtonLink href={company.phone.href} variant="outline-light" icon="phone" className="w-full">
                  Ligar agora
                </ButtonLink>
              </div>

              <div className="mt-8 border-t border-offwhite/20 pt-6">
                <h3 className="text-[0.7rem] font-semibold tracking-eyebrow text-sand uppercase">Contato alternativo</h3>
                <a
                  href={company.phoneSecondary.href}
                  className="mt-3 block font-display text-2xl leading-none font-bold tracking-[-0.02em] tabular-nums hover:text-sand"
                >
                  {company.phoneSecondary.display}
                </a>
                <a
                  href={whatsappSecondaryHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-offwhite underline decoration-offwhite/40 underline-offset-4 hover:text-sand"
                >
                  WhatsApp {company.whatsapp.secondary.display}
                  <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
                </a>
              </div>
            </section>

            <section aria-labelledby="localizacao" className="mt-10 border-t border-line pt-8">
              <h2 id="localizacao" className="text-[0.7rem] font-semibold tracking-eyebrow text-basalt uppercase">
                Localização
              </h2>
              <address className="mt-4 text-base leading-relaxed text-graphite not-italic">
                <span className="font-display text-xl font-semibold">{company.name}</span>
                <br />
                {company.address.plusCode} — {company.address.city}, {company.address.state}
                <br />
                CEP {company.address.postalCode}
              </address>
              <a
                href={company.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:underline"
              >
                Abrir no Google Maps
                <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
                <span className="sr-only">(abre em nova aba)</span>
              </a>
            </section>
          </div>
        </aside>
      </Container>
    </>
  );
}
