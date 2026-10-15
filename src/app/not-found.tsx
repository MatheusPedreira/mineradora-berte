import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="py-24 sm:py-32">
      <p className="text-[0.7rem] font-semibold tracking-eyebrow text-basalt uppercase">Erro 404</p>
      <h1 className="mt-5 max-w-2xl text-4xl leading-[1.02] font-bold tracking-[-0.03em] text-graphite sm:text-6xl">
        Página não encontrada.
      </h1>
      <p className="mt-5 max-w-md text-base text-basalt">O endereço acessado não existe ou foi alterado.</p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/">Voltar ao início</ButtonLink>
        <ButtonLink href="/produtos" variant="outline">
          Ver produtos
        </ButtonLink>
      </div>
    </Container>
  );
}
