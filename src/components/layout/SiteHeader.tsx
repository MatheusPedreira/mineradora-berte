"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { company } from "@/content/company";
import { mainNav, quoteHref } from "@/content/navigation";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-offwhite">
      <div className="mx-auto flex h-18 w-full max-w-[1440px] items-center justify-between gap-6 px-4 sm:h-20 sm:px-8 lg:px-12">
        <Logo />

        <nav aria-label="Navegação principal" className="hidden xl:block">
          <ul className="flex items-center gap-8">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative py-2 text-[0.875rem] font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-navy after:transition-transform after:duration-300 hover:text-navy ${
                      active ? "text-navy after:scale-x-100" : "text-ink/75 after:scale-x-0 hover:after:scale-x-100"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={company.phone.href}
            className="hidden items-center gap-2 px-2 text-sm font-semibold text-ink tabular-nums transition-colors hover:text-navy lg:inline-flex"
          >
            <Phone aria-hidden="true" className="size-4" strokeWidth={1.75} />
            {company.phone.display}
          </a>
          <a
            href={company.phone.href}
            aria-label={`Ligar para ${company.phone.display}`}
            className="inline-flex size-11 items-center justify-center rounded-[2px] border border-line text-ink transition-colors hover:border-navy hover:text-navy lg:hidden"
          >
            <Phone aria-hidden="true" className="size-4" strokeWidth={1.75} />
          </a>
          <div className="hidden sm:block">
            <ButtonLink href={quoteHref} icon="none">
              Solicitar orçamento
            </ButtonLink>
          </div>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-11 items-center justify-center rounded-[2px] bg-graphite text-offwhite xl:hidden"
          >
            {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
          </button>
        </div>
      </div>

      <div
        id="menu-mobile"
        hidden={!open}
        className="fixed inset-x-0 top-18 bottom-0 overflow-y-auto border-t border-line bg-offwhite sm:top-20 xl:hidden"
      >
        <nav
          aria-label="Navegação principal (celular)"
          onClick={(e) => {
            if ((e.target as HTMLElement).closest("a")) setOpen(false);
          }}
          className="mx-auto flex min-h-full max-w-[1440px] flex-col px-4 pt-6 pb-10 sm:px-8">
          <ul className="border-t border-line">
            {mainNav.map((item, i) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href} className="border-b border-line">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-baseline gap-4 py-4 font-display text-2xl font-semibold tracking-tight ${active ? "text-navy" : "text-ink"}`}
                  >
                    <span className="w-6 text-xs font-medium text-basalt tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-auto flex flex-col gap-3 pt-10">
            <ButtonLink href={quoteHref} className="w-full">
              Solicitar orçamento
            </ButtonLink>
            <ButtonLink href={company.phone.href} variant="outline" icon="phone" className="w-full">
              Ligar {company.phone.display}
            </ButtonLink>
            <p className="pt-2 text-xs text-basalt">
              {company.address.city} / {company.address.state}
            </p>
          </div>
        </nav>
      </div>
    </header>
  );
}
