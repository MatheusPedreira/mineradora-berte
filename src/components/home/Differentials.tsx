import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { differentials } from "@/content/company";

export function Differentials() {
  return (
    <section aria-labelledby="diferenciais-titulo" className="on-dark bg-navy-deep text-offwhite">
      <Container className="grid gap-12 py-20 sm:py-24 lg:grid-cols-12 lg:gap-8 lg:py-28">
        <div className="lg:col-span-4">
          <Eyebrow index="01" tone="dark">
            Diferenciais
          </Eyebrow>
          <h2
            id="diferenciais-titulo"
            className="mt-6 max-w-sm text-3xl leading-[1.05] font-bold tracking-[-0.025em] sm:text-4xl xl:text-[2.75rem]"
          >
            O que sustenta cada fornecimento.
          </h2>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-offwhite/75">
            Da rocha à entrega: material, padrão e logística sob o cuidado da própria Mineradora Berté.
          </p>
        </div>

        <ol className="grid border-t border-offwhite/15 sm:grid-cols-2 lg:col-span-8">
          {differentials.map((item, i) => (
            <li
              key={item.id}
              className={`group relative border-b border-offwhite/15 py-8 sm:py-10 ${
                i % 2 === 0 ? "sm:border-r sm:pr-8 lg:pr-12" : "sm:pl-8 lg:pl-12"
              }`}
            >
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 h-px w-0 bg-sand transition-[width] duration-700 ease-out-quart group-hover:w-full"
              />
              <div className="flex items-baseline gap-5">
                <span className="font-display text-sm font-semibold text-sand tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl font-semibold tracking-[-0.01em] sm:text-2xl">{item.title}</h3>
                  <p className="mt-3 max-w-xs text-[0.9375rem] leading-relaxed text-offwhite/75">{item.text}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
