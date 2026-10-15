import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { company } from "@/content/company";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Política de Privacidade",
  description: "Política de privacidade do site da Mineradora Berté.",
  path: "/politica-de-privacidade",
});

// Texto base — revisar com o responsável jurídico antes do lançamento e sempre que
// um formulário, ferramenta de análise ou pixel de anúncios for adicionado ao site.
export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Institucional"
        title="Política de Privacidade"
        crumbs={[{ name: "Política de Privacidade", path: "/politica-de-privacidade" }]}
      />
      <Container className="py-16 sm:py-20">
        <div className="max-w-2xl space-y-8 text-base leading-relaxed text-basalt">
          <section>
            <h2 className="text-2xl font-bold tracking-[-0.02em] text-graphite">Sobre esta política</h2>
            <p className="mt-3">
              Esta política descreve como o site da {company.name} trata informações de visitantes, em conformidade com
              a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018).
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold tracking-[-0.02em] text-graphite">Dados coletados</h2>
            <p className="mt-3">
              No momento, o site não possui formulários e não coleta dados pessoais diretamente. O contato comercial é
              realizado por telefone. Caso essa condição mude, esta política será atualizada.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold tracking-[-0.02em] text-graphite">Links externos</h2>
            <p className="mt-3">
              O site pode conter links para serviços de terceiros, como o Google Maps, que possuem políticas de
              privacidade próprias.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold tracking-[-0.02em] text-graphite">Contato</h2>
            <p className="mt-3">
              Para dúvidas sobre esta política, entre em contato pelo telefone{" "}
              <a href={company.phone.href} className="font-semibold text-ink underline underline-offset-4">
                {company.phone.display}
              </a>
              .
            </p>
          </section>
        </div>
      </Container>
    </>
  );
}
