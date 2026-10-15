"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useId, useRef, useState } from "react";
import { gtmId, initTagManager, updateConsent, type ConsentChoice } from "@/lib/analytics";

/** Evento para reabrir as preferências (rodapé e Política de Privacidade). */
export const CONSENT_OPEN_EVENT = "berte:consent-open";

/** A escolha precisa ser lembrada para não perguntar a cada página; nada além disso é guardado. */
const STORAGE_KEY = "berte-consent-v1";

function readChoice(): ConsentChoice | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const v = JSON.parse(raw) as Partial<ConsentChoice>;
    return { analytics: v.analytics === true, ads: v.ads === true };
  } catch {
    return null;
  }
}

function saveChoice(choice: ConsentChoice) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...choice, updatedAt: new Date().toISOString() }));
  } catch {
    // Sem armazenamento: a escolha vale só para esta visita.
  }
}

const buttonBase =
  "inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-[2px] px-4 text-sm font-semibold transition-colors";

/**
 * Consentimento (Consent Mode v2 básico) + carregamento do Google Tag Manager.
 * Sem NEXT_PUBLIC_GTM_ID real, não renderiza nada: nenhum banner, nenhum script.
 * Com o ID, o container só é carregado depois que o visitante autoriza análise e/ou publicidade.
 */
export function ConsentManager() {
  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(false);
  const [draft, setDraft] = useState<ConsentChoice>({ analytics: false, ads: false });
  const [loaded, setLoaded] = useState(false);
  const initialized = useRef(false);
  const uid = useId();

  useEffect(() => {
    if (!gtmId) return;
    const stored = readChoice();
    // Leitura do armazenamento só existe no navegador; o estado inicial do servidor é "sem escolha".
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored) setChoice(stored);
    else setOpen(true);

    const reopen = () => {
      const current = readChoice();
      setDraft(current ?? { analytics: false, ads: false });
      setDetails(true);
      setOpen(true);
    };
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
  }, []);

  useEffect(() => {
    if (!gtmId || !choice) return;
    if (initialized.current) {
      updateConsent(choice);
    } else if (choice.analytics || choice.ads) {
      initialized.current = true;
      initTagManager(choice);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoaded(true);
    }
  }, [choice]);

  if (!gtmId) return null;

  function decide(next: ConsentChoice) {
    saveChoice(next);
    setChoice(next);
    setOpen(false);
    setDetails(false);
  }

  return (
    <>
      {loaded ? (
        <Script id="gtm" src={`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`} />
      ) : null}

      {open ? (
        <section
          aria-labelledby={`${uid}-titulo`}
          className="fixed inset-x-0 bottom-0 z-[45] border-t border-line bg-offwhite px-4 py-4 text-graphite sm:inset-x-auto sm:right-6 sm:bottom-6 sm:max-w-md sm:border sm:p-5 [html[data-quote-bar]_&]:bottom-[73px] sm:[html[data-quote-bar]_&]:bottom-6"
        >
          <h2 id={`${uid}-titulo`} className="text-sm font-semibold">
            Cookies de análise e publicidade
          </h2>
          <p className="mt-1 text-[0.8125rem] leading-relaxed text-basalt">
            Usamos somente com a sua autorização, para medir visitas e anúncios. O site funciona normalmente se você
            recusar.{" "}
            <Link href="/politica-de-privacidade" className="font-semibold text-navy underline underline-offset-4">
              Política de Privacidade
            </Link>
          </p>

          {details ? (
            <fieldset className="mt-3 grid gap-2">
              <legend className="sr-only">Escolha o que autorizar</legend>
              {(
                [
                  ["analytics", "Análise", "Estatísticas de visitas (Google Analytics)."],
                  ["ads", "Publicidade", "Medição de anúncios (Google Ads)."],
                ] as const
              ).map(([key, label, hint]) => (
                <label key={key} className="flex cursor-pointer items-start gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={draft[key]}
                    onChange={(e) => setDraft((d) => ({ ...d, [key]: e.target.checked }))}
                    className="mt-0.5 size-4 accent-navy"
                  />
                  <span>
                    <span className="font-semibold">{label}</span>
                    <span className="block text-xs text-basalt">{hint}</span>
                  </span>
                </label>
              ))}
            </fieldset>
          ) : null}

          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => decide({ analytics: false, ads: false })}
              className={`${buttonBase} flex-1 border border-ink/45 text-ink hover:border-ink`}
            >
              Recusar
            </button>
            {details ? (
              <button
                type="button"
                onClick={() => decide(draft)}
                className={`${buttonBase} flex-1 border border-ink/45 text-ink hover:border-ink`}
              >
                Salvar
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setDetails(true)}
                className={`${buttonBase} flex-1 border border-ink/45 text-ink hover:border-ink`}
              >
                Preferências
              </button>
            )}
            <button
              type="button"
              onClick={() => decide({ analytics: true, ads: true })}
              className={`${buttonBase} flex-1 bg-navy text-offwhite hover:bg-navy-deep`}
            >
              Aceitar
            </button>
          </div>
        </section>
      ) : null}
    </>
  );
}
