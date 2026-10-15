import Link from "next/link";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ items, tone = "light" }: { items: Crumb[]; tone?: "dark" | "light" }) {
  const all = [{ name: "Início", path: "/" }, ...items];
  const schema = breadcrumbSchema(all);
  const muted = tone === "dark" ? "text-offwhite/60" : "text-basalt";
  const current = tone === "dark" ? "text-offwhite" : "text-ink";
  const hover = tone === "dark" ? "hover:text-offwhite" : "hover:text-ink";

  return (
    <nav aria-label="Trilha de navegação" className="text-xs">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {all.map((item, i) => {
          const last = i === all.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className={current}>
                  {item.name}
                </span>
              ) : (
                <>
                  <Link href={item.path} className={`link-underline ${muted} ${hover}`}>
                    {item.name}
                  </Link>
                  <span aria-hidden="true" className={muted}>
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
      {schema ? <JsonLd data={schema} /> : null}
    </nav>
  );
}
