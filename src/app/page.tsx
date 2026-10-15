import { Hero } from "@/components/home/Hero";
import { Differentials } from "@/components/home/Differentials";
import { ProductsShowcase } from "@/components/home/ProductsShowcase";
import { Logistics } from "@/components/home/Logistics";
import { Quality } from "@/components/home/Quality";
import { Regions } from "@/components/home/Regions";
import { Faq } from "@/components/home/Faq";
import { FinalCta } from "@/components/home/FinalCta";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Mineradora Berté | Areia, Brita e Agregados em Ponte Serrada SC",
  description:
    "Areia, brita e agregados para construção civil em Ponte Serrada (SC). Venda por tonelada ou m³, com entrega em frota própria ou retirada na mineradora. Solicite seu orçamento.",
  path: "/",
  absoluteTitle: true,
});

export default function Home() {
  return (
    <>
      <Hero />
      <Differentials />
      <ProductsShowcase />
      <Logistics />
      <Quality />
      <Regions />
      <Faq />
      <FinalCta />
    </>
  );
}
