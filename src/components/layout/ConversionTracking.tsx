"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/** Registra cliques em telefone e WhatsApp em qualquer página (ver src/lib/analytics.ts). */
export function ConversionTracking() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const link = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const page = window.location.pathname;
      if (href.startsWith("tel:")) track("phone_click", { phone: href.slice(4), page });
      else if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) track("whatsapp_click", { page });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
