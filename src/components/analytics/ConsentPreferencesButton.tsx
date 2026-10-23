"use client";

import { CONSENT_OPEN_EVENT } from "@/components/analytics/ConsentManager";
import { gtmId } from "@/lib/analytics";

/** Reabre as preferências de privacidade (consentimento). Só aparece quando há um container GTM configurado. */
export function ConsentPreferencesButton({ className = "" }: { className?: string }) {
  if (!gtmId) return null;
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))} className={className}>
      Preferências de privacidade
    </button>
  );
}
