import type { BalanceHistoryItem } from "./types";

// Função que simula uma chamada de API para buscar os dados do histórico de saldo
export const fetchBalanceHistory = async (): Promise<BalanceHistoryItem[]> => {
	// Simulando um delay de rede
	await new Promise((resolve) => setTimeout(resolve, 1100));
	
	// Dados mockados do histórico de saldo
	const balanceHistory: BalanceHistoryItem[] = [
		{ month: "Jul", balance: 150 },
		{ month: "Aug", balance: 320 },
		{ month: "Sep", balance: 250 },
		{ month: "Oct", balance: 450 },
		{ month: "Nov", balance: 520 },
		{ month: "Dec", balance: 780 },
		{ month: "Jan", balance: 220 },
		{ month: "Feb", balance: 550 },
		{ month: "Mar", balance: 300 },
		{ month: "Apr", balance: 580 },
		{ month: "May", balance: 250 },
		{ month: "Jun", balance: 620 }
	];
	
	return balanceHistory;
};
