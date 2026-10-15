import { NextResponse, type NextRequest } from "next/server";
import { products } from "@/content/products";

const slugs = new Set(products.map((p) => p.slug));

/**
 * Com Cache Components, o notFound() da página de produto é enviado depois que a
 * resposta começa a ser transmitida (status 200 + noindex). Esta verificação devolve
 * o 404 real para materiais inexistentes, antes da renderização.
 */
export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2];
  if (slug && !slugs.has(slug)) {
    return NextResponse.rewrite(new URL("/produto-nao-encontrado", request.url));
  }
}

export const config = {
  matcher: "/produtos/:slug",
};
