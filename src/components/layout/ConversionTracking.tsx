"use client";

import { useEffect } from "react";
import { quoteHref } from "@/content/navigation";
import { track } from "@/lib/analytics";

/**
 * Registra cliques em telefone, WhatsApp e orçamento de material em qualquer página
 * (ver src/lib/analytics.ts). Um único listener delegado: um evento por clique.
 * `placement` vem do `data-track-location` mais próximo (hero, footer, mobile_bar...).
 */
export function ConversionTracking() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const link = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const base = {
        placement: link.closest<HTMLElement>("[data-track-location]")?.dataset.trackLocation ?? "content",
        page_path: window.location.pathname,
      };
      if (href.startsWith("tel:")) {
        track("phone_click", { contact_type: "principal", ...base });
      } else if (/^https:\/\/wa\.me\/\d+/.test(href)) {
        track("whatsapp_click", { contact_type: "principal", ...base });
      } else if (href.startsWith(`${quoteHref}?produto=`)) {
        const slug = new URLSearchParams(href.split("?")[1]).get("produto") ?? "";
        track("product_quote_click", { product: slug, ...base });
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
