import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { ConsentPreferencesButton } from "@/components/analytics/ConsentPreferencesButton";
import { company } from "@/content/company";
import { gtmId } from "@/lib/analytics";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Política de Privacidade",
  description:
    "Política de privacidade do site da Mineradora Berté: formulário de orçamento, WhatsApp e dados de contato.",
  path: "/politica-de-privacidade",
});

// Texto base — revisar com o responsável jurídico antes do lançamento e sempre que
// o envio do formulário mudar ou uma ferramenta de análise ou pixel de anúncios for adicionado.
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
              a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018). Última atualização: 15 de outubro de
              2026.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold tracking-[-0.02em] text-graphite">Formulário de orçamento</h2>
            <p className="mt-3">
              O formulário de orçamento usa as informações que você digita (nome, telefone, material, quantidade,
              unidade, entrega ou retirada, cidade, endereço ou referência e observações) apenas para montar a mensagem
              do pedido na sua tela. O site não envia esses dados para um servidor próprio, não os armazena e não os
              salva no navegador.
            </p>
            <p className="mt-3">
              Ao tocar em &ldquo;Revisar e enviar pelo WhatsApp&rdquo;, a mensagem é aberta no WhatsApp para você
              revisar. Ela só chega à {company.name} se você decidir enviá-la.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold tracking-[-0.02em] text-graphite">WhatsApp e telefone</h2>
            <p className="mt-3">
              Os botões de WhatsApp do site abrem uma conversa com os números comerciais da {company.name}. O WhatsApp
              é um serviço externo, com termos de uso e política de privacidade próprios. Ao abrir e enviar sua
              solicitação, seu número, seu nome de perfil e o conteúdo da mensagem são compartilhados com esse serviço
              de mensagens e recebidos pela equipe comercial, que os utiliza para responder ao seu pedido.
            </p>
            <p className="mt-3">
              Os links de telefone apenas iniciam uma ligação pelo aparelho do visitante.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold tracking-[-0.02em] text-graphite">Ferramentas de análise</h2>
            {gtmId ? (
              <>
                <p className="mt-3">
                  O site usa o Google Tag Manager para gerenciar ferramentas do Google: o Google Analytics 4
                  (estatísticas de visitas) e o Google Ads (medição de anúncios). Elas só são carregadas depois da sua
                  autorização no aviso de cookies, separada entre análise e publicidade. Se você recusar, nenhuma delas
                  é carregada e o site funciona normalmente.
                </p>
                <p className="mt-3">
                  Com a autorização, são registrados dados de navegação e ações como cliques em telefone ou WhatsApp e
                  a abertura do pedido no WhatsApp. Nome, telefone digitado, endereço, observações e o texto da
                  mensagem não são enviados a essas ferramentas. A sua escolha fica guardada no navegador para não ser
                  perguntada a cada página.
                </p>
                <ConsentPreferencesButton className="mt-3 font-semibold text-navy underline underline-offset-4" />
              </>
            ) : (
              <p className="mt-3">
                No momento, o site não utiliza ferramentas de análise de visitas nem pixels de anúncios. Caso venham a
                ser adicionadas, esta política será atualizada antes da ativação.
              </p>
            )}
          </section>
          <section>
            <h2 className="text-2xl font-bold tracking-[-0.02em] text-graphite">Links externos</h2>
            <p className="mt-3">
              O site contém links para serviços de terceiros, como o WhatsApp e o Google Maps, que possuem políticas de
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
