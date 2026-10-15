import { Suspense } from "react";
import { ArrowUpRight, Phone } from "lucide-react";
import { QuoteProductNote } from "@/components/product/QuoteProductNote";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { company } from "@/content/company";
import { quoteFields } from "@/content/quote";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contato e Orçamento",
  description:
    "Solicite orçamento de areia, brita e agregados com a Mineradora Berté, em Ponte Serrada (SC). Ligue (49) 98409-3337.",
  path: "/contato",
});

export default function ContactPage({ searchParams }: PageProps<"/contato">) {
  return (
    <>
      <PageHeader
        eyebrow="Contato"
        title="Solicite seu orçamento."
        lead="Fale diretamente com a equipe comercial da Mineradora Berté pelo telefone."
        crumbs={[{ name: "Contato", path: "/contato" }]}
      />

      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-8 lg:py-24">
        <div className="lg:col-span-5">
          <section aria-labelledby="telefone" className="on-dark bg-navy p-8 text-offwhite sm:p-10">
            <h2 id="telefone" className="text-[0.7rem] font-semibold tracking-eyebrow text-sand uppercase">
              Telefone comercial
            </h2>
            <a
              href={company.phone.href}
              className="mt-4 block font-display text-[2.1rem] leading-none font-bold tracking-[-0.02em] tabular-nums hover:text-sand sm:text-5xl"
            >
              {company.phone.display}
            </a>
            <a
              href={company.phoneSecondary.href}
              className="mt-3 block font-display text-[2.1rem] leading-none font-bold tracking-[-0.02em] tabular-nums hover:text-sand sm:text-5xl"
            >
              {company.phoneSecondary.display}
            </a>
            <a
              href={company.phone.href}
              className="group mt-8 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-[2px] bg-offwhite px-6 text-sm font-semibold text-graphite transition-colors hover:bg-sand sm:w-auto"
            >
              <Phone aria-hidden="true" className="size-4" strokeWidth={1.75} />
              Ligar agora
            </a>
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

        {/*
          Espaço do formulário de cotação. O formulário só deve ser ativado quando
          company.quoteEndpoint estiver configurado (canal de recebimento confirmado).
          Até lá, os campos servem como roteiro para o contato telefônico.
        */}
        <section aria-labelledby="cotacao" className="border border-line bg-stone/60 p-8 sm:p-10 lg:col-span-6 lg:col-start-7">
          <h2 id="cotacao" className="text-3xl font-bold tracking-[-0.025em] text-graphite sm:text-4xl">
            O que informar no pedido
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-basalt">
            Para agilizar o orçamento, tenha em mãos as informações abaixo ao ligar.
          </p>
          <Suspense fallback={null}>
            <QuoteProductNote searchParams={searchParams} />
          </Suspense>
          <ol className="mt-8 border-t border-ink/15">
            {quoteFields.map((field, i) => (
              <li key={field.name} className="flex items-baseline gap-5 border-b border-ink/15 py-4">
                <span className="font-display text-xs font-semibold text-sand-deep tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex flex-1 flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <span className="font-display text-base font-semibold text-graphite">{field.label}</span>
                  {field.options ? <span className="text-sm text-basalt">{field.options.join(" ou ")}</span> : null}
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-xs leading-relaxed text-basalt">
            O envio de pedidos pelo site será disponibilizado em breve. No momento, o atendimento é feito pelo telefone{" "}
            {company.phone.display}.
          </p>
        </section>
      </Container>
    </>
  );
}
