"use client";

import { useEffect } from "react";
import { company } from "@/content/company";
import { quoteHref } from "@/content/navigation";
import { track } from "@/lib/analytics";

/**
 * Registra cliques em telefone, WhatsApp e orçamento de material em qualquer página
 * (ver src/lib/analytics.ts). Um único listener delegado: um evento por clique.
 */
export function ConversionTracking() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const link = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const page = window.location.pathname;
      if (href.startsWith("tel:")) {
        track("phone_click", { phone: href.slice(4), page });
      } else if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) {
        const number = href.match(/^https:\/\/wa\.me\/(\d+)/)?.[1];
        const line = number === company.whatsapp.secondary.number ? "secundario" : "principal";
        track("whatsapp_click", { whatsapp: line, page });
      } else if (href.startsWith(`${quoteHref}?produto=`)) {
        track("product_quote_click", { material: new URLSearchParams(href.split("?")[1]).get("produto") ?? "", page });
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
