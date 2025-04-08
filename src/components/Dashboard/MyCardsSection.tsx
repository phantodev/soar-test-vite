import type { FC } from "react";
import CardComponent from "./CardComponent";
import RecentTransactionsComponent from "./RecentTransactionsComponent";

const MyCardsSection: FC = () => {
	// Sample data for cards
	const cards = [
		{
			id: "1",
			variant: "dark" as const,
			balance: "$5,756",
			cardHolder: "Eddy Cusuma",
			validThru: "12/22",
			cardNumber: "3778 **** **** 1234",
		},
		{
			id: "2",
			variant: "light" as const,
			balance: "$5,756",
			cardHolder: "Eddy Cusuma",
			validThru: "12/22",
			cardNumber: "3778 **** **** 1234",
		},
	];

	// Sample data for transactions
	const transactions = [
		{
			id: "1",
			title: "Deposit from my Card",
			date: "28 January 2021",
			amount: "$850",
			type: "deposit-card" as const,
			isPositive: false,
		},
		{
			id: "2",
			title: "Deposit Paypal",
			date: "25 January 2021",
			amount: "$2,500",
			type: "paypal" as const,
			isPositive: true,
		},
		{
			id: "3",
			title: "Jemi Wilson",
			date: "21 January 2021",
			amount: "$5,400",
			type: "money" as const,
			isPositive: true,
		},
	];

	return (
		<section className="flex flex-col md:flex-row gap-4 sm:gap-5 md:gap-6">
			<div className="w-full md:w-[730px]">
				<div className="flex justify-between items-center mb-3 sm:mb-4">
					<h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-primary">
						My Cards
					</h2>
					<a
						href="/cards"
						className="text-base sm:text-lg font-semibold text-primary hover:text-primary/80"
					>
						See All
					</a>
				</div>
				{/* Container com scroll horizontal para mobile e grid para tablet/desktop */}
				<div className="sm:hidden overflow-x-auto pb-4 -mx-4 px-4">
					<div className="flex space-x-4 w-max">
						{cards.map((card) => (
							<div key={card.id} className="flex-shrink-0">
								<CardComponent
									variant={card.variant}
									balance={card.balance}
									cardHolder={card.cardHolder}
									validThru={card.validThru}
									cardNumber={card.cardNumber}
								/>
							</div>
						))}
					</div>
				</div>

				{/* Grid para tablet e desktop */}
				<div className="hidden sm:grid sm:grid-cols-2 gap-6 md:gap-8">
					{cards.map((card) => (
						<div key={card.id} className="flex justify-start">
							<CardComponent
								variant={card.variant}
								balance={card.balance}
								cardHolder={card.cardHolder}
								validThru={card.validThru}
								cardNumber={card.cardNumber}
							/>
						</div>
					))}
				</div>
			</div>
			<div className="w-full md:w-[350px] mt-4 md:mt-0">
				<div className="flex justify-between items-center mb-3 sm:mb-4">
					<h2 className="text-lg sm:text-xl font-semibold text-primary">
						Recent Transaction
					</h2>
				</div>
				<div className="flex justify-center md:justify-start">
					<RecentTransactionsComponent transactions={transactions} />
				</div>
			</div>
		</section>
	);
};

export default MyCardsSection;
