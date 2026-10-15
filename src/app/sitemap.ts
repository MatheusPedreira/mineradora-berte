import type { MetadataRoute } from "next";
import { products } from "@/content/products";
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
  const routes = [...staticRoutes, ...products.map((p) => `/produtos/${p.slug}`)];
  return routes.map((path) => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    priority: path === "/" ? 1 : path.startsWith("/produtos") ? 0.8 : 0.6,
  }));
}
