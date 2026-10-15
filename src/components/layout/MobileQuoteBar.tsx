"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { quoteHref } from "@/content/navigation";
import { whatsappDirectHref } from "@/content/quote";

/**
 * Atalho de orçamento no celular (abaixo de 640px o header não tem o botão):
 * "Solicitar orçamento" leva ao formulário; "WhatsApp" abre a conversa com o número principal.
 * Aparece depois que o visitante rola a página; não é exibido na página de contato (formulário).
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

  const shown = visible && pathname !== quoteHref;
  // Permite que o aviso de cookies fique acima da barra, sem cobrir o WhatsApp.
  useEffect(() => {
    document.documentElement.toggleAttribute("data-quote-bar", shown);
    return () => document.documentElement.removeAttribute("data-quote-bar");
  }, [shown]);

  if (pathname === quoteHref) return null;

  return (
    <div
      data-track-location="mobile_bar"
      inert={!visible}
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-line bg-offwhite px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-300 ease-out-quart sm:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <ButtonLink href={quoteHref} className="flex-1">
        Solicitar orçamento
      </ButtonLink>
      <a
        href={whatsappDirectHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-[2px] border border-ink/45 px-4 text-sm font-semibold text-ink"
      >
        <MessageCircle aria-hidden="true" className="size-4" strokeWidth={1.75} />
        WhatsApp
      </a>
    </div>
  );
}
