import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

type Variant = "primary" | "outline" | "light" | "outline-light";

const variants: Record<Variant, string> = {
  primary: "bg-navy text-offwhite hover:bg-navy-deep",
  outline: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-offwhite",
  light: "bg-offwhite text-graphite hover:bg-sand",
  "outline-light": "border border-offwhite/35 text-offwhite hover:border-offwhite hover:bg-offwhite hover:text-graphite",
};

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  icon?: "arrow" | "phone" | "none";
  className?: string;
};

export function ButtonLink({ href, children, variant = "primary", icon = "arrow", className = "" }: ButtonLinkProps) {
  const classes = `group inline-flex min-h-12 items-center justify-center gap-3 rounded-[2px] px-6 text-sm font-semibold tracking-wide transition-colors duration-300 ${variants[variant]} ${className}`;
  const content = (
    <>
      {icon === "phone" ? <Phone aria-hidden="true" className="size-4" strokeWidth={1.75} /> : null}
      <span>{children}</span>
      {icon === "arrow" ? (
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-300 ease-out-quart group-hover:translate-x-1"
          strokeWidth={1.75}
        />
      ) : null}
    </>
  );

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }
  return (
    <a href={href} className={classes}>
      {content}
    </a>
  );
}
