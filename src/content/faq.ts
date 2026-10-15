import { company } from "./company";

export const faq = [
  {
    question: "A Mineradora Berté vende por tonelada?",
    answer:
      "Sim. Os materiais são comercializados por tonelada e também por metro cúbico (m³). Informe a unidade de sua preferência ao solicitar o orçamento.",
  },
  {
    question: "É possível comprar por metro cúbico?",
    answer:
      "Sim. Além da venda por tonelada, todos os materiais podem ser comercializados por metro cúbico (m³).",
  },
  {
    question: "Posso retirar o material na mineradora?",
    answer: `Sim. Além da entrega, o cliente pode retirar o material diretamente na mineradora, em ${company.address.city} (${company.address.state}). Combine a retirada pelo telefone ${company.phone.display}.`,
  },
  {
    question: "A empresa realiza entregas?",
    answer:
      "Sim. A Mineradora Berté entrega com frota própria, composta por caminhões truck, 6x4, bitruck e carretas. Consulte as condições de entrega para o endereço da sua obra.",
  },
  {
    question: "Como solicitar um orçamento?",
    answer: `Ligue para ${company.phone.display} e informe o material, a quantidade, a unidade (tonelada ou m³), se prefere entrega ou retirada e a cidade ou endereço da obra.`,
  },
  {
    question: "Quais cidades são atendidas?",
    answer:
      "Ponte Serrada, Vargeão, Passos Maia, Abelardo Luz, Faxinal dos Guedes, Xanxerê, Irani, Vargem Bonita, Catanduvas e Lindóia. Outras localidades mediante consulta.",
  },
];
