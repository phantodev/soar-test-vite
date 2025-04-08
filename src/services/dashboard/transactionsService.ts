import type { Transaction } from "./types";

// Função que simula uma chamada de API para buscar as transações recentes
export const fetchTransactions = async (): Promise<Transaction[]> => {
	// Simulando um delay de rede
	await new Promise((resolve) => setTimeout(resolve, 1200));

	// Dados mockados das transações
	const transactions: Transaction[] = [
		{
			id: "1",
			title: "Deposit from my Card",
			date: "28 January 2021",
			amount: "$850",
			type: "deposit-card",
			isPositive: false,
		},
		{
			id: "2",
			title: "Deposit Paypal",
			date: "25 January 2021",
			amount: "$2,500",
			type: "paypal",
			isPositive: true,
		},
		{
			id: "3",
			title: "Jemi Wilson",
			date: "21 January 2021",
			amount: "$5,400",
			type: "money",
			isPositive: true,
		},
		{
			id: "4",
			title: "Netflix Subscription",
			date: "18 January 2021",
			amount: "$14.99",
			type: "deposit-card",
			isPositive: false,
		},
		{
			id: "5",
			title: "Amazon Purchase",
			date: "15 January 2021",
			amount: "$250",
			type: "deposit-card",
			isPositive: false,
		},
	];

	return transactions;
};
