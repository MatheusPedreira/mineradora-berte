"use client";

import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { cities, company } from "@/content/company";
import { getProductsByCategory, productCategories } from "@/content/products";
import {
  OTHER_CITY,
  emptyQuote,
  formatPhone,
  quoteLines,
  unitLabels,
  validateQuote,
  whatsappQuoteUrl,
  type QuoteData,
  type QuoteErrors,
  type QuoteMode,
  type QuoteUnit,
} from "@/content/quote";
import { track } from "@/lib/analytics";

const inputClass =
  "block min-h-12 w-full rounded-[2px] border border-ink/25 bg-offwhite px-4 text-base text-ink transition-colors placeholder:text-basalt/70 hover:border-ink/45 focus:border-navy aria-[invalid=true]:border-[#a3361f]";

function SelectWrap({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      {children}
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-basalt"
        strokeWidth={1.75}
      />
    </div>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline justify-between gap-3 text-sm font-semibold text-graphite">
        {label}
        {optional ? <span className="text-xs font-normal text-basalt">Opcional</span> : null}
      </label>
      {hint ? <p className="mt-1 text-xs text-basalt">{hint}</p> : null}
      <div className="mt-2">{children}</div>
      {error ? (
        <p id={`${id}-erro`} className="mt-2 text-sm font-medium text-[#a3361f]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Grupo de opções exclusivas em formato segmentado (rádios nativos, acessíveis por teclado). */
function Segmented<T extends string>({
  name,
  legend,
  options,
  value,
  error,
  onChange,
}: {
  name: string;
  legend: string;
  options: { value: T; label: string }[];
  value: T | "";
  error?: string;
  onChange: (value: T) => void;
}) {
  return (
    <fieldset aria-describedby={error ? `${name}-erro` : undefined}>
      <legend className="text-sm font-semibold text-graphite">{legend}</legend>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {options.map((opt) => (
          <label
            key={opt.value}
            className="flex min-h-12 cursor-pointer items-center justify-center rounded-[2px] border border-ink/25 px-3 text-center text-sm font-semibold text-graphite transition-colors hover:border-ink/50 has-[:checked]:border-navy has-[:checked]:bg-navy has-[:checked]:text-offwhite has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-sand-deep"
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="sr-only"
            />
            {opt.label}
          </label>
        ))}
      </div>
      {error ? (
        <p id={`${name}-erro`} className="mt-2 text-sm font-medium text-[#a3361f]">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

function Step({ index, title, children }: { index: string; title: string; children: ReactNode }) {
  return (
    <fieldset className="border-t border-line pt-8 first:border-t-0 first:pt-0">
      <legend className="float-left mb-6 flex w-full items-baseline gap-4">
        <span className="font-display text-xs font-semibold text-sand-deep tabular-nums">{index}</span>
        <span className="font-display text-xl font-semibold text-graphite">{title}</span>
      </legend>
      <div className="clear-left grid gap-6">{children}</div>
    </fieldset>
  );
}

export function QuoteForm({ initialProduct = "" }: { initialProduct?: string }) {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const [data, setData] = useState<QuoteData>(() => emptyQuote(initialProduct));
  const [errors, setErrors] = useState<QuoteErrors>({});
  const started = useRef(false);
  const canSend = Boolean(company.whatsapp);

  function update<K extends keyof QuoteData>(key: K, value: QuoteData[K]) {
    if (!started.current) {
      started.current = true;
      track("quote_form_start");
    }
    setData((d) => ({ ...d, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  const invalid = (name: keyof QuoteData) =>
    errors[name] ? { "aria-invalid": true as const, "aria-describedby": `${id(name)}-erro` } : {};

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateQuote(data);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    const url = whatsappQuoteUrl(data);
    if (!url) return;
    track("quote_whatsapp_open", { material: data.material });
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const summary = quoteLines(data);

  return (
    <form noValidate onSubmit={handleSubmit} className="grid gap-10">
      <Step index="01" title="Material">
        <Field id={id("material")} label="Material desejado" error={errors.material}>
          <SelectWrap>
            <select
              id={id("material")}
              name="material"
              value={data.material}
              onChange={(e) => update("material", e.target.value)}
              className={`${inputClass} appearance-none pr-11`}
              {...invalid("material")}
            >
              <option value="">Selecione</option>
              {productCategories.map((cat) => (
                <optgroup key={cat.id} label={cat.name}>
                  {getProductsByCategory(cat.id).map((p) => (
                    <option key={p.slug} value={p.slug}>
                      {p.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </SelectWrap>
        </Field>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field id={id("quantidade")} label="Quantidade" error={errors.quantidade}>
            <input
              id={id("quantidade")}
              name="quantidade"
              inputMode="decimal"
              autoComplete="off"
              placeholder="Ex.: 20"
              value={data.quantidade}
              onChange={(e) => update("quantidade", e.target.value.replace(/[^\d.,]/g, ""))}
              className={inputClass}
              {...invalid("quantidade")}
            />
          </Field>
          <Segmented<QuoteUnit>
            name="unidade"
            legend="Unidade"
            value={data.unidade}
            error={errors.unidade}
            onChange={(v) => update("unidade", v)}
            options={(Object.keys(unitLabels) as QuoteUnit[]).map((v) => ({ value: v, label: unitLabels[v] }))}
          />
        </div>
      </Step>

      <Step index="02" title="Fornecimento">
        <Segmented<QuoteMode>
          name="modalidade"
          legend="Modalidade"
          value={data.modalidade}
          error={errors.modalidade}
          onChange={(v) => update("modalidade", v)}
          options={[
            { value: "entrega", label: "Entrega" },
            { value: "retirada", label: "Retirada" },
          ]}
        />

        {data.modalidade === "entrega" ? (
          <>
            <Field id={id("cidade")} label="Cidade de entrega" error={errors.cidade}>
              <SelectWrap>
                <select
                  id={id("cidade")}
                  name="cidade"
                  value={data.cidade}
                  onChange={(e) => update("cidade", e.target.value)}
                  className={`${inputClass} appearance-none pr-11`}
                  {...invalid("cidade")}
                >
                  <option value="">Selecione</option>
                  {cities.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                  <option value={OTHER_CITY}>Outra cidade (mediante consulta)</option>
                </select>
              </SelectWrap>
            </Field>
            {data.cidade === OTHER_CITY ? (
              <Field id={id("outraCidade")} label="Qual cidade?" error={errors.outraCidade}>
                <input
                  id={id("outraCidade")}
                  name="outraCidade"
                  autoComplete="address-level2"
                  value={data.outraCidade}
                  onChange={(e) => update("outraCidade", e.target.value)}
                  className={inputClass}
                  {...invalid("outraCidade")}
                />
              </Field>
            ) : null}
            <Field
              id={id("endereco")}
              label="Endereço ou referência da obra"
              hint="Rua, bairro, comunidade ou ponto de referência."
              optional
            >
              <input
                id={id("endereco")}
                name="endereco"
                autoComplete="street-address"
                value={data.endereco}
                onChange={(e) => update("endereco", e.target.value)}
                className={inputClass}
              />
            </Field>
          </>
        ) : null}

        {data.modalidade === "retirada" ? (
          <p className="border-l-2 border-navy bg-stone px-4 py-3 text-sm leading-relaxed text-graphite">
            Retirada na mineradora: {company.address.plusCode}, {company.address.city} ({company.address.state}). As
            condições são alinhadas com a equipe comercial.
          </p>
        ) : null}
      </Step>

      <Step index="03" title="Seus dados">
        <div className="grid gap-6 sm:grid-cols-2">
          <Field id={id("nome")} label="Nome" error={errors.nome}>
            <input
              id={id("nome")}
              name="nome"
              autoComplete="name"
              value={data.nome}
              onChange={(e) => update("nome", e.target.value)}
              className={inputClass}
              {...invalid("nome")}
            />
          </Field>
          <Field id={id("telefone")} label="Telefone" error={errors.telefone}>
            <input
              id={id("telefone")}
              name="telefone"
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              placeholder="(49) 99999-9999"
              value={data.telefone}
              onChange={(e) => update("telefone", formatPhone(e.target.value))}
              className={inputClass}
              {...invalid("telefone")}
            />
          </Field>
        </div>
        <Field id={id("observacoes")} label="Observações" optional>
          <textarea
            id={id("observacoes")}
            name="observacoes"
            rows={3}
            value={data.observacoes}
            onChange={(e) => update("observacoes", e.target.value)}
            className={`${inputClass} py-3`}
          />
        </Field>
      </Step>

      <div className="border-t border-ink pt-8">
        {summary.length > 0 ? (
          <div className="mb-8">
            <p className="text-xs font-semibold tracking-eyebrow text-basalt uppercase">Resumo do pedido</p>
            <dl className="mt-3 grid gap-x-6 text-sm sm:grid-cols-[9rem_1fr]">
              {summary.map((line) => (
                <div key={line.label} className="contents">
                  <dt className="pt-2 text-basalt">{line.label}</dt>
                  <dd className="border-b border-line pb-2 font-medium text-graphite sm:pt-2">{line.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        ) : null}

        {canSend ? (
          <>
            <button
              type="submit"
              className="group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-[2px] bg-navy px-6 text-sm font-semibold tracking-wide text-offwhite transition-colors hover:bg-navy-deep sm:w-auto"
            >
              Revisar e enviar pelo WhatsApp
              <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" strokeWidth={1.75} />
            </button>
            <p className="mt-3 text-xs leading-relaxed text-basalt">
              A mensagem abre no WhatsApp com os dados acima para você revisar antes de enviar.
            </p>
          </>
        ) : (
          <div role="note">
            <p className="font-display text-lg font-semibold text-graphite">Finalize o pedido por telefone</p>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-basalt">
              O envio pelo site ainda não está disponível. Ligue para a equipe comercial e informe os dados do
              resumo.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={company.phone.href} icon="phone">
                {company.phone.display}
              </ButtonLink>
              <ButtonLink href={company.phoneSecondary.href} variant="outline" icon="phone">
                {company.phoneSecondary.display}
              </ButtonLink>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}

