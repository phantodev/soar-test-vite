import type { WeeklyActivity } from "./types";

// Função que simula uma chamada de API para buscar os dados de atividade semanal
export const fetchWeeklyActivity = async (): Promise<WeeklyActivity[]> => {
	// Simulando um delay de rede
	await new Promise((resolve) => setTimeout(resolve, 900));

	// Dados mockados de atividade semanal
	const weeklyActivityData: WeeklyActivity[] = [
		{ day: "Sat", deposit: 230, withdraw: 450 },
		{ day: "Sun", deposit: 120, withdraw: 320 },
		{ day: "Mon", deposit: 260, withdraw: 310 },
		{ day: "Tue", deposit: 350, withdraw: 450 },
		{ day: "Wed", deposit: 230, withdraw: 150 },
		{ day: "Thu", deposit: 230, withdraw: 380 },
		{ day: "Fri", deposit: 320, withdraw: 380 },
	];

	return weeklyActivityData;
};
