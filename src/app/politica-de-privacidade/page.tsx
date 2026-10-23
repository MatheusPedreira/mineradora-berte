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

// Texto base — REQUER REVISÃO JURÍDICA antes do lançamento e sempre que
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
              a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018). Última atualização: 23 de outubro de
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
          {gtmId ? (
            <>
              <section>
                <h2 className="text-2xl font-bold tracking-[-0.02em] text-graphite">Cookies e consentimento</h2>
                <p className="mt-3">
                  Ao acessar o site pela primeira vez, você vê um aviso para autorizar ou recusar, separadamente, o uso
                  de cookies de <strong className="font-semibold text-graphite">análise</strong> e de 
                  <strong className="font-semibold text-graphite">publicidade</strong>. Nenhuma das opções vem marcada.
                  Até que você autorize, nenhuma ferramenta de análise ou publicidade é carregada. Se recusar, o site, o
                  formulário de orçamento e os contatos por telefone e WhatsApp continuam funcionando normalmente.
                </p>
                <p className="mt-3">
                  Você pode revisar ou retirar a sua autorização a qualquer momento em &ldquo;Preferências de
                  privacidade&rdquo;, no rodapé do site ou logo abaixo. Ao retirar, os cookies daquela finalidade são
                  apagados deste site e as ferramentas deixam de ser carregadas. A sua escolha fica guardada no
                  armazenamento local do navegador (somente as opções escolhidas e a data), para não ser perguntada a
                  cada página.
                </p>
                <ConsentPreferencesButton className="mt-3 inline-flex min-h-11 items-center font-semibold text-navy underline underline-offset-4" />
              </section>
              <section>
                <h2 className="text-2xl font-bold tracking-[-0.02em] text-graphite">Google Tag Manager e Google Analytics</h2>
                <p className="mt-3">
                  O site usa o Google Tag Manager, serviço do Google que carrega as ferramentas de medição, e o Google
                  Analytics 4, que gera estatísticas de visitas. Ambos só são carregados depois da autorização de
                  análise.
                </p>
                <p className="mt-3">
                  Com a autorização, o Google Analytics registra informações de navegação, como páginas visitadas,
                  origem do acesso (incluindo parâmetros de campanha presentes no endereço), tipo de dispositivo e
                  navegador e localização aproximada, além de ações no site: cliques em telefone e WhatsApp, cliques em
                  &ldquo;Solicitar orçamento&rdquo; de um material, início do preenchimento do formulário e abertura do
                  pedido no WhatsApp (apenas o material, a unidade e a modalidade escolhidos). Nome, telefone digitado,
                  endereço, observações e o texto da mensagem nunca são enviados.
                </p>
                <p className="mt-3">
                  Para isso, o Google Analytics grava cookies no seu navegador (<code>_ga</code> e 
                  <code>_ga_*</code>), com validade de até dois anos na configuração padrão do Google. A finalidade é
                  entender como o site é usado e quais canais trazem pedidos de orçamento.
                </p>
              </section>
              <section>
                <h2 className="text-2xl font-bold tracking-[-0.02em] text-graphite">Publicidade</h2>
                <p className="mt-3">
                  No momento, o site não utiliza ferramentas de publicidade, como o Google Ads ou pixels de redes
                  sociais. A opção de publicidade do aviso fica disponível para a medição de futuras campanhas de
                  anúncios do Google; antes da ativação, esta política será atualizada.
                </p>
              </section>
              <section>
                <h2 className="text-2xl font-bold tracking-[-0.02em] text-graphite">Compartilhamento com provedores</h2>
                <p className="mt-3">
                  Os dados de medição são tratados pelo Google, fornecedor do Google Tag Manager e do Google Analytics,
                  de acordo com a 
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-ink underline underline-offset-4"
                  >
                    Política de Privacidade do Google
                  </a>
                  , e podem ser processados em servidores fora do Brasil. A {company.name} não vende dados de
                  visitantes.
                </p>
              </section>
            </>
          ) : (
            <section>
              <h2 className="text-2xl font-bold tracking-[-0.02em] text-graphite">Ferramentas de análise</h2>
              <p className="mt-3">
                No momento, o site não utiliza ferramentas de análise de visitas nem pixels de anúncios. Caso venham a
                ser adicionadas, esta política será atualizada antes da ativação.
              </p>
            </section>
          )}
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
