import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { company } from "@/content/company";
import { mainNav, quoteHref } from "@/content/navigation";
import { products } from "@/content/products";
import { whatsappDirectHref, whatsappSecondaryHref } from "@/content/quote";

const linkClass = "link-underline text-offwhite/70 transition-colors hover:text-offwhite";

export function SiteFooter() {
  return (
    <footer className="on-dark bg-graphite text-offwhite">
      <Container className="pt-16 pb-28 sm:pt-20 sm:pb-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-offwhite/65">
              Mineração e fornecimento de areia, brita e agregados para construção civil em {company.address.city},{" "}
              {company.address.stateName}. Venda por tonelada ou m³, com entrega ou retirada.
            </p>
            <ButtonLink href={quoteHref} variant="light" className="mt-8">
              Solicitar orçamento
            </ButtonLink>
          </div>

          <nav aria-label="Navegação do rodapé" className="lg:col-span-2">
            <h2 className="text-xs font-semibold tracking-eyebrow text-sand uppercase">Navegação</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/politica-de-privacidade" className={linkClass}>
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="text-xs font-semibold tracking-eyebrow text-sand uppercase">Produtos</h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm lg:grid-cols-1">
              {products.map((p) => (
                <li key={p.slug}>
                  <Link href={`/produtos#${p.slug}`} className={linkClass}>
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <address className="not-italic lg:col-span-3">
            <h2 className="text-xs font-semibold tracking-eyebrow text-sand uppercase">Contato</h2>
            <a
              href={company.phone.href}
              className="mt-5 block font-display text-2xl font-semibold tracking-tight tabular-nums transition-colors hover:text-sand"
            >
              {company.phone.display}
            </a>
            <a
              href={whatsappDirectHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-1 inline-block text-sm ${linkClass}`}
            >
              Falar no WhatsApp
            </a>
            <p className="mt-5 text-xs text-offwhite/60">Contato alternativo</p>
            <a
              href={company.phoneSecondary.href}
              className="mt-1 block font-display text-2xl font-semibold tracking-tight tabular-nums transition-colors hover:text-sand"
            >
              {company.phoneSecondary.display}
            </a>
            <a
              href={whatsappSecondaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-1 inline-block text-sm ${linkClass}`}
            >
              WhatsApp alternativo
            </a>
            <p className="mt-6 text-sm leading-relaxed text-offwhite/70">
              {company.address.plusCode} — {company.address.city}, {company.address.state}
              <br />
              CEP {company.address.postalCode}
            </p>
            <a
              href={company.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-offwhite transition-colors hover:text-sand"
            >
              Abrir no Google Maps
              <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
              <span className="sr-only">(abre em nova aba)</span>
            </a>
          </address>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line-dark pt-6 text-xs text-offwhite/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {company.name}. Todos os direitos reservados.</p>
          <p>
            {company.address.city} · {company.address.stateName} · Brasil
          </p>
        </div>
      </Container>
    </footer>
  );
}
