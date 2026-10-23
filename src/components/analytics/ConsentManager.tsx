"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { applyConsent, gtmId, noConsent, readConsent, saveConsent, type ConsentChoice } from "@/lib/analytics";

/** Evento para reabrir as preferências (rodapé e Política de Privacidade). */
export const CONSENT_OPEN_EVENT = "berte:consent-open";

const buttonBase =
  "inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-[2px] px-4 text-sm font-semibold transition-colors";

/**
 * Aviso de consentimento (Consent Mode v2 avançado). O container já foi carregado pelo
 * script inline do layout, com os estados negados e a escolha salva aplicada; aqui só
 * se registra uma escolha nova. Não é modal: o site, os contatos e o formulário funcionam
 * sem resposta. Sem NEXT_PUBLIC_GTM_ID real, não renderiza nada.
 */
export function ConsentManager() {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(false);
  const [draft, setDraft] = useState<ConsentChoice>(noConsent);
  const uid = useId();

  useEffect(() => {
    if (!gtmId) return;
    // Leitura do armazenamento só existe no navegador; o estado inicial do servidor é "fechado".
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!readConsent()) setOpen(true);

    const reopen = () => {
      setDraft(readConsent() ?? noConsent);
      setDetails(true);
      setOpen(true);
    };
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
  }, []);

  if (!gtmId) return null;

  function decide(next: ConsentChoice) {
    applyConsent(readConsent() ?? noConsent, next);
    saveConsent(next);
    setOpen(false);
    setDetails(false);
  }

  return (
    <>
      {open ? (
        <section
          aria-labelledby={`${uid}-titulo`}
          data-consent-banner
          // Sobe com transform (não com `bottom`) quando a barra do celular aparece: sem layout shift.
          className="fixed inset-x-0 bottom-0 z-[45] border-t border-line bg-offwhite px-4 py-4 text-graphite sm:inset-x-auto sm:right-6 sm:bottom-6 sm:max-w-md sm:border sm:p-5 [html[data-quote-bar]_&]:-translate-y-[73px] sm:[html[data-quote-bar]_&]:translate-y-0"
        >
          <h2 id={`${uid}-titulo`} className="text-sm font-semibold">
            Cookies de análise e publicidade
          </h2>
          <p className="mt-1 text-[0.8125rem] leading-relaxed text-basalt">
            Com a sua autorização, usamos cookies para medir visitas e anúncios. Sem ela, o Google recebe só sinais
            limitados, sem cookies. O site funciona normalmente se você recusar.{" "}
            <Link href="/politica-de-privacidade" className="font-semibold text-navy underline underline-offset-4">
              Política de Privacidade
            </Link>
          </p>

          {details ? (
            <fieldset className="mt-3 grid gap-2">
              <legend className="sr-only">Escolha o que autorizar</legend>
              {(
                [
                  ["analytics", "Análise", "Estatísticas de visitas e cliques (Google Analytics)."],
                  ["ads", "Publicidade", "Medição de anúncios do Google, quando houver campanhas ativas."],
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
                Salvar escolhas
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => decide({ analytics: true, ads: true })}
              className={`${buttonBase} flex-1 bg-navy text-offwhite hover:bg-navy-deep`}
            >
              Aceitar
            </button>
          </div>
          {details ? null : (
            <button
              type="button"
              onClick={() => setDetails(true)}
              className="mt-1 inline-flex min-h-11 items-center text-sm font-semibold text-navy underline underline-offset-4"
            >
              Personalizar preferências
            </button>
          )}
        </section>
      ) : null}
    </>
  );
}
