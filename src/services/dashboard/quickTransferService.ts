import type { QuickTransferContact } from "./types";

// Função que simula uma chamada de API para buscar os contatos para transferência rápida
export const fetchQuickTransferContacts = async (): Promise<
	QuickTransferContact[]
> => {
	// Simulando um delay de rede
	await new Promise((resolve) => setTimeout(resolve, 700));

	// Dados mockados dos contatos
	const contacts: QuickTransferContact[] = [
		{
			id: "1",
			name: "Livia Bator",
			avatar: "/assets/avatar-livia.png",
		},
		{
			id: "2",
			name: "Randy Press",
			avatar: "/assets/avatar-randy.png",
		},
		{
			id: "3",
			name: "Workman",
			avatar: "/assets/avatar-workman.png",
		},
	];

	return contacts;
};
