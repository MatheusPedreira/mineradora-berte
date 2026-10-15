import type { Metadata } from "next";
import { company } from "@/content/company";

/**
 * Domínio oficial. Enquanto NEXT_PUBLIC_SITE_URL não estiver definido, o site não emite
 * canonicals, sitemap com URLs nem permite indexação.
 * Indexação só é liberada com NEXT_PUBLIC_SITE_INDEXABLE="true" e domínio configurado.
 */
export const siteUrl: string | null = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || null;

export const isIndexable = Boolean(siteUrl) && process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true";

export function absoluteUrl(path: string) {
  return siteUrl ? `${siteUrl}${path === "/" ? "" : path}` : null;
}

type PageMeta = {
  title: string;
  description: string;
  path: string;
  /** Usa o título sem o sufixo do template. */
  absoluteTitle?: boolean;
};

export function pageMetadata({ title, description, path, absoluteTitle }: PageMeta): Metadata {
  const url = absoluteUrl(path);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: url ? { canonical: url } : undefined,
    openGraph: {
      type: "website",
      locale: "pt_BR",
      siteName: company.name,
      title: absoluteTitle ? title : `${title} | ${company.name}`,
      description,
      ...(url ? { url } : {}),
    },
  };
}
