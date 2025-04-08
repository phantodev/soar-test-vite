import type { ExpenseStatistic } from "./types";

// Função que simula uma chamada de API para buscar os dados de estatísticas de despesas
export const fetchExpenseStatistics = async (): Promise<ExpenseStatistic[]> => {
	// Simulando um delay de rede
	await new Promise((resolve) => setTimeout(resolve, 1000));

	// Dados mockados de estatísticas de despesas
	const expenseStatisticsData: ExpenseStatistic[] = [
		{ name: "Entertainment", percentage: 30, color: "#3B4B80" },
		{ name: "Bill Expense", percentage: 15, color: "#F97316" },
		{ name: "Investment", percentage: 20, color: "#3B82F6" },
		{ name: "Others", percentage: 35, color: "#1F2937" },
	];

	return expenseStatisticsData;
};
