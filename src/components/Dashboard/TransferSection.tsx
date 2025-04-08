import type { FC } from "react";
import QuickTransfer from "./QuickTransfer";
import BalanceHistory from "./BalanceHistory";

const TransferSection: FC = () => {
	// Dados dos contatos para transferência rápida
	const contacts = [
		{
			name: "Livia Bator",
			avatar: "/assets/avatar-livia.png",
			role: "CEO",
		},
		{
			name: "Randy Press",
			avatar: "/assets/avatar-randy.png",
			role: "Director",
		},
		{
			name: "Workman",
			avatar: "/assets/avatar-workman.png",
			role: "Designer",
		},
	];

	return (
		<section className="mt-20">
			<div className="flex flex-col md:flex-row gap-6">
				{/* Quick Transfer */}
				<div className="w-full max-w-[445px]">
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-2xl font-semibold text-primary">
							Quick Transfer
						</h2>
					</div>
					<QuickTransfer contacts={contacts} />
				</div>

				{/* Balance History */}
				<div className="w-full max-w-[635px]">
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-2xl font-semibold text-primary">
							Balance History
						</h2>
					</div>
					<BalanceHistory />
				</div>
			</div>
		</section>
	);
};

export default TransferSection;
