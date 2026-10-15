import type { NextConfig } from "next";
import { products } from "./src/content/products";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // As páginas individuais de produto foram substituídas pelo catálogo único (Etapa 04).
  // URLs antigas levam ao material correspondente em /produtos.
  async redirects() {
    return products.map((p) => ({
      source: `/produtos/${p.slug}`,
      destination: `/produtos#${p.slug}`,
      permanent: true,
    }));
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
