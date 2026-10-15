"use client";

import { useEffect } from "react";
import { company } from "@/content/company";
import { quoteHref } from "@/content/navigation";
import { track, type ContactLine } from "@/lib/analytics";

const digits = (v: string) => v.replace(/\D/g, "");

/** Identifica o número da empresa apenas pela função (principal/secundário). */
function contactLine(number: string): ContactLine {
  const n = digits(number);
  return n === company.whatsapp.secondary.number || n === digits(company.phoneSecondary.href) ? "secundario" : "principal";
}

/**
 * Registra cliques em telefone, WhatsApp e orçamento de material em qualquer página
 * (ver src/lib/analytics.ts). Um único listener delegado: um evento por clique.
 * `link_location` vem do `data-track-location` mais próximo (hero, footer, mobile_bar...).
 */
export function ConversionTracking() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const link = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const base = {
        link_location: link.closest<HTMLElement>("[data-track-location]")?.dataset.trackLocation ?? "content",
        page_path: window.location.pathname,
      };
      if (href.startsWith("tel:")) {
        track("phone_click", { contact_line: contactLine(href), ...base });
      } else if (/^https:\/\/wa\.me\/\d+/.test(href)) {
        track("whatsapp_click", { contact_line: contactLine(href.match(/^https:\/\/wa\.me\/(\d+)/)![1]), ...base });
      } else if (href.startsWith(`${quoteHref}?produto=`)) {
        const slug = new URLSearchParams(href.split("?")[1]).get("produto") ?? "";
        track("product_quote_click", { product_slug: slug, ...base });
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
