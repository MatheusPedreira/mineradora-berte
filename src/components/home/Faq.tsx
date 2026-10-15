import { Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { JsonLd } from "@/components/seo/JsonLd";
import { faq } from "@/content/faq";

export function Faq() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <section aria-labelledby="faq-titulo" className="border-t border-line py-20 sm:py-24 lg:py-32">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Eyebrow index="06">Perguntas frequentes</Eyebrow>
          <h2
            id="faq-titulo"
            className="mt-6 max-w-sm text-[2.1rem] leading-[1.02] font-bold tracking-[-0.03em] text-graphite sm:text-5xl lg:text-[2.75rem]"
          >
            Antes de pedir seu orçamento.
          </h2>
        </div>

        <div className="border-t border-line lg:col-span-7 lg:col-start-6">
          {faq.map((item) => (
            <details key={item.question} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                <h3 className="font-display text-lg font-semibold text-graphite transition-colors group-hover:text-navy sm:text-xl">
                  {item.question}
                </h3>
                <Plus
                  aria-hidden="true"
                  className="size-5 shrink-0 text-basalt transition-transform duration-300 group-open:rotate-45 group-open:text-navy"
                  strokeWidth={1.5}
                />
              </summary>
              <p className="max-w-2xl pb-7 text-base leading-relaxed text-basalt">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
      <JsonLd data={schema} />
    </section>
  );
}
