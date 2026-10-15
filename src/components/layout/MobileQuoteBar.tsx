"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { company } from "@/content/company";
import { quoteHref } from "@/content/navigation";

/**
 * Atalho de orçamento no celular (abaixo de 640px o header não tem o botão).
 * Aparece depois que o visitante rola a página; não é exibido na própria página de contato.
 */
export function MobileQuoteBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 560);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === quoteHref) return null;

  return (
    <div
      inert={!visible}
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-line bg-offwhite px-4 py-3 transition-transform duration-300 ease-out-quart sm:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <ButtonLink href={quoteHref} className="flex-1">
        Solicitar orçamento
      </ButtonLink>
      <a
        href={company.phone.href}
        aria-label={`Ligar para ${company.phone.display}`}
        className="inline-flex size-12 shrink-0 items-center justify-center rounded-[2px] border border-ink/45 text-ink"
      >
        <Phone aria-hidden="true" className="size-4" strokeWidth={1.75} />
      </a>
    </div>
  );
}
