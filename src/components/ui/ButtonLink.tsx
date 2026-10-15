import Link from "next/link";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";

type Variant = "primary" | "outline" | "light" | "outline-light";

const variants: Record<Variant, string> = {
  primary: "bg-navy text-offwhite hover:bg-navy-deep",
  outline: "border border-ink/45 text-ink hover:border-ink hover:bg-ink hover:text-offwhite",
  light: "bg-offwhite text-graphite hover:bg-sand",
  "outline-light": "border border-offwhite/55 text-offwhite hover:border-offwhite hover:bg-offwhite hover:text-graphite",
};

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  icon?: "arrow" | "phone" | "whatsapp" | "none";
  className?: string;
};

export function ButtonLink({ href, children, variant = "primary", icon = "arrow", className = "" }: ButtonLinkProps) {
  const classes = `group inline-flex min-h-12 items-center whitespace-nowrap justify-center gap-3 rounded-[2px] px-6 text-sm font-semibold tracking-wide transition-colors duration-300 ${variants[variant]} ${className}`;
  const content = (
    <>
      {icon === "phone" ? <Phone aria-hidden="true" className="size-4" strokeWidth={1.75} /> : null}
      {icon === "whatsapp" ? <MessageCircle aria-hidden="true" className="size-4" strokeWidth={1.75} /> : null}
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
  // Links externos (WhatsApp) abrem em nova aba no desktop; no celular, o próprio app.
  const external = href.startsWith("https://");
  return (
    <a
      href={href}
      className={classes}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {content}
    </a>
  );
}
