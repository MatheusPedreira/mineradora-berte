import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

const staticRoutes = [
  "/",
  "/produtos",
  "/estrutura-e-logistica",
  "/sobre",
  "/regioes-atendidas",
  "/contato",
  "/politica-de-privacidade",
];

/** Gera URLs apenas quando o domínio oficial estiver configurado em NEXT_PUBLIC_SITE_URL. */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];
  return staticRoutes.map((path) => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    priority: path === "/" ? 1 : path === "/produtos" || path === "/contato" ? 0.8 : 0.6,
  }));
}
