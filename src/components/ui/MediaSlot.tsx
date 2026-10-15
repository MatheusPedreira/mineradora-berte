import Image from "next/image";

type MediaSlotProps = {
  src: string | null;
  alt: string;
  /** Destino do arquivo, exibido apenas em desenvolvimento. */
  slot?: string;
  label?: string;
  sizes: string;
  preload?: boolean;
  tone?: "dark" | "light";
  className?: string;
};

/**
 * Área de fotografia. Renderiza a foto real quando `src` existe; caso contrário,
 * mostra uma área reservada neutra, sem simular imagens da empresa.
 */
export function MediaSlot({
  src,
  alt,
  slot,
  label = "Fotografia real em breve",
  sizes,
  preload,
  tone = "dark",
  className = "",
}: MediaSlotProps) {
  if (src) {
    return (
      <div className={`relative overflow-hidden bg-stone ${className}`}>
        <Image src={src} alt={alt} fill sizes={sizes} preload={preload} className="object-cover" />
      </div>
    );
  }

  const dark = tone === "dark";
  const showSlot = process.env.NODE_ENV !== "production" && slot;

  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden ${dark ? "placeholder-hatch text-offwhite/55" : "placeholder-hatch-light text-basalt"} ${className}`}
    >
      <Image
        src={dark ? "/images/brand/logo-symbol-light.png" : "/images/brand/logo-symbol.png"}
        alt=""
        width={512}
        height={480}
        className={`absolute top-1/2 left-1/2 w-[34%] max-w-56 -translate-x-1/2 -translate-y-1/2 ${dark ? "opacity-[0.07]" : "opacity-[0.08]"}`}
      />
      <span className={`absolute top-4 left-4 size-3 border-t border-l ${dark ? "border-offwhite/30" : "border-ink/25"}`} />
      <span className={`absolute top-4 right-4 size-3 border-t border-r ${dark ? "border-offwhite/30" : "border-ink/25"}`} />
      <span className={`absolute bottom-4 left-4 size-3 border-b border-l ${dark ? "border-offwhite/30" : "border-ink/25"}`} />
      <span className={`absolute right-4 bottom-4 size-3 border-r border-b ${dark ? "border-offwhite/30" : "border-ink/25"}`} />
      <span className="absolute bottom-5 left-9 right-9 flex flex-col gap-1 text-[0.65rem] font-medium tracking-eyebrow uppercase">
        <span>{label}</span>
        {showSlot ? <span className="normal-case tracking-normal opacity-70">{slot}</span> : null}
      </span>
    </div>
  );
}
