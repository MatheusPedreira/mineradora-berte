import type { MetadataRoute } from "next";
import { isIndexable, siteUrl } from "@/lib/site";

// AdsBot ignora o grupo "*" e só obedece regras com o próprio nome; os grupos explícitos
// garantem a verificação das páginas de destino do Google Ads mesmo com a indexação bloqueada.
const adsBotRules = [
  { userAgent: "AdsBot-Google", allow: "/" },
  { userAgent: "AdsBot-Google-Mobile", allow: "/" },
];

export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) {
    return { rules: [{ userAgent: "*", disallow: "/" }, ...adsBotRules] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/" }, ...adsBotRules],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
