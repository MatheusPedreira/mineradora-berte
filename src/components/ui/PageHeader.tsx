import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  lead?: string;
  crumbs: Crumb[];
  children?: React.ReactNode;
};

export function PageHeader({ eyebrow, title, lead, crumbs, children }: PageHeaderProps) {
  return (
    <section className="border-b border-line">
      <Container className="pt-8 pb-14 sm:pt-10 sm:pb-20 lg:pb-24">
        <Breadcrumbs items={crumbs} />
        <div className="mt-12 grid gap-8 sm:mt-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="mt-5 text-[2.4rem] leading-[1] font-bold tracking-[-0.035em] text-graphite sm:text-6xl xl:text-7xl">
              {title}
            </h1>
          </div>
          {lead ? (
            <p className="max-w-md text-base leading-relaxed text-basalt lg:col-span-4">{lead}</p>
          ) : null}
        </div>
        {children}
      </Container>
    </section>
  );
}
