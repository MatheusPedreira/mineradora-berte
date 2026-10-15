import type { Metadata, Viewport } from "next";
import { Archivo, Plus_Jakarta_Sans } from "next/font/google";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MobileQuoteBar } from "@/components/layout/MobileQuoteBar";
import { ConversionTracking } from "@/components/layout/ConversionTracking";
import { ConsentManager } from "@/components/analytics/ConsentManager";
import { JsonLd, localBusinessSchema } from "@/components/seo/JsonLd";
import { company } from "@/content/company";
import { isIndexable, siteUrl } from "@/lib/site";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: "Mineradora Berté | Areia, Brita e Agregados em Ponte Serrada SC",
    template: `%s | ${company.name}`,
  },
  description:
    "Areia, brita e agregados para construção civil em Ponte Serrada (SC). Venda por tonelada ou m³, com entrega em frota própria ou retirada na mineradora.",
  applicationName: company.name,
  robots: isIndexable ? { index: true, follow: true } : { index: false, follow: false },
  formatDetection: { telephone: false },
  // Verificação do Search Console por meta tag (opcional; alternativa ao registro DNS).
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: company.name,
  },
};

export const viewport: Viewport = {
  themeColor: "#f4f3ef",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${archivo.variable} ${jakarta.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#conteudo"
          className="sr-only z-[60] bg-navy px-4 py-3 text-sm font-semibold text-offwhite focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Pular para o conteúdo
        </a>
        <SiteHeader />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <MobileQuoteBar />
        <ConversionTracking />
        <ConsentManager />
        <JsonLd data={localBusinessSchema()} />
      </body>
    </html>
  );
}
