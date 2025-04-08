import type { Card } from "./types";

// Função que simula uma chamada de API para buscar os dados dos cartões
export const fetchCards = async (): Promise<Card[]> => {
	// Simulando um delay de rede
	await new Promise((resolve) => setTimeout(resolve, 800));

	// Dados mockados dos cartões
	const cards: Card[] = [
		{
			id: "1",
			variant: "dark",
			balance: "$5,756",
			cardHolder: "Eddy Cusuma",
			validThru: "12/22",
			cardNumber: "3778 **** **** 1234",
		},
		{
			id: "2",
			variant: "light",
			balance: "$5,756",
			cardHolder: "Eddy Cusuma",
			validThru: "12/22",
			cardNumber: "3778 **** **** 1234",
		},
	];

	return cards;
};
