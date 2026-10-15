import { company, cities } from "@/content/company";
import { siteUrl } from "@/lib/site";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** Negócio local apenas com dados confirmados (sem rua, coordenadas ou horários). */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    ...(siteUrl ? { "@id": `${siteUrl}/#empresa`, url: siteUrl } : {}),
    name: company.name,
    description:
      "Mineradora em Ponte Serrada (SC) com fornecimento de areia, brita e agregados para construção civil, por tonelada ou metro cúbico, com entrega ou retirada.",
    telephone: company.phone.e164,
    address: {
      "@type": "PostalAddress",
      addressLocality: company.address.city,
      addressRegion: company.address.state,
      postalCode: company.address.postalCode,
      addressCountry: company.address.country,
    },
    hasMap: company.mapsUrl,
    areaServed: cities
      .filter((c) => c.confirmed)
      .map((c) => ({ "@type": "City", name: `${c.name}, SC` })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  if (!siteUrl) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.path === "/" ? "" : item.path}`,
    })),
  };
}
