import Image from "next/image";
import Link from "next/link";
import { company } from "@/content/company";

type LogoProps = {
  tone?: "dark" | "light";
  className?: string;
};

/** Lockup horizontal montado a partir de recortes da logo original (símbolo + wordmark). */
export function Logo({ tone = "dark", className = "" }: LogoProps) {
  const suffix = tone === "light" ? "-light" : "";
  return (
    <Link href="/" aria-label={`${company.name} — página inicial`} className={`inline-flex items-center gap-3 ${className}`}>
      <Image
        src={`/images/brand/logo-symbol${suffix}.png`}
        alt=""
        width={512}
        height={480}
        loading="eager"
        className="h-9 w-auto sm:h-10"
      />
      <Image
        src={`/images/brand/logo-wordmark${suffix}.png`}
        alt=""
        width={967}
        height={373}
        loading="eager"
        className="h-8 w-auto sm:h-9"
      />
    </Link>
  );
}
