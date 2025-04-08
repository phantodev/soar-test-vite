import { useQueries } from "@tanstack/react-query";
import LoadingSpinner from "../components/atoms/LoadingSpinner";
import CardComponent from "../components/Dashboard/CardComponent";
import RecentTransactions from "../components/Dashboard/RecentTransactions";
import WeeklyActivityChart from "../components/Dashboard/WeeklyActivityChart";
import ExpenseStatistics from "../components/Dashboard/ExpenseStatistics";
import QuickTransfer from "../components/Dashboard/QuickTransfer";
import BalanceHistory from "../components/Dashboard/BalanceHistory";
import {
	fetchCards,
	fetchTransactions,
	fetchWeeklyActivity,
	fetchExpenseStatistics,
	fetchQuickTransferContacts,
	fetchBalanceHistory,
	type Card,
	type Transaction,
	type WeeklyActivity,
	type ExpenseStatistic,
	type QuickTransferContact,
	type BalanceHistoryItem,
} from "../services/dashboard";

const DashboardPage = () => {
	// Usando useQueries para fazer múltiplas chamadas em paralelo
	const results = useQueries({
		queries: [
			{
				queryKey: ["cards"],
				queryFn: fetchCards,
			},
			{
				queryKey: ["transactions"],
				queryFn: fetchTransactions,
			},
			{
				queryKey: ["weeklyActivity"],
				queryFn: fetchWeeklyActivity,
			},
			{
				queryKey: ["expenseStatistics"],
				queryFn: fetchExpenseStatistics,
			},
			{
				queryKey: ["quickTransferContacts"],
				queryFn: fetchQuickTransferContacts,
			},
			{
				queryKey: ["balanceHistory"],
				queryFn: fetchBalanceHistory,
			},
		],
	});

	// Verificar se alguma consulta está carregando
	const isLoading = results.some((result) => result.isLoading);

	// Verificar se alguma consulta falhou
	const isError = results.some((result) => result.isError);

	// Extrair os dados das consultas com tipagem correta
	const cardsData = results[0].data as Card[] | undefined;
	const transactionsData = results[1].data as Transaction[] | undefined;
	const weeklyActivityData = results[2].data as WeeklyActivity[] | undefined;
	const expenseStatisticsData = results[3].data as ExpenseStatistic[] | undefined;
	const quickTransferContactsData = results[4].data as QuickTransferContact[] | undefined;
	const balanceHistoryData = results[5].data as BalanceHistoryItem[] | undefined;

	// Renderizar mensagem de erro se alguma consulta falhar
	if (isError) {
		return (
			<div className="flex items-center justify-center h-screen">
				<div className="text-center">
					<h2 className="text-xl font-semibold text-red-600 mb-2">
						Erro ao carregar dados
					</h2>
					<p className="text-gray-600">
						Ocorreu um erro ao carregar os dados. Por favor, tente novamente
						mais tarde.
					</p>
				</div>
			</div>
		);
	}

	return (
		<>
			{/* Spinner de carregamento centralizado */}
			<LoadingSpinner isLoading={isLoading} />

			{/* Conteúdo do Dashboard (só é renderizado quando todos os dados estiverem carregados) */}
			{!isLoading && (
				<div className="sm:p-4 md:p-6">
					{/* Seção de Cartões */}
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
									{cardsData?.map((card) => (
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
								{cardsData?.map((card) => (
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
								<RecentTransactions transactions={transactionsData || []} />
							</div>
						</div>
					</section>

					{/* Seção de Atividade */}
					<div className="mt-6 sm:mt-8 md:mt-10">
						<section className="flex flex-col md:flex-row gap-6 mt-6">
							<div className="w-full md:w-[730px]">
								<div className="flex justify-between items-center mb-4">
									<h2 className="text-md lg:text-2xl font-semibold text-primary">
										Weekly Activity
									</h2>
								</div>
								<WeeklyActivityChart data={weeklyActivityData || []} />
							</div>
							<div className="w-full md:w-[350px]">
								<div className="flex justify-between items-center mb-4">
									<h2 className="text-md lg:text-2xl font-semibold text-primary">
										Expense Statistics
									</h2>
								</div>
								<ExpenseStatistics data={expenseStatisticsData || []} />
							</div>
						</section>
					</div>

					{/* Seção de Transferência */}
					<div className="mt-6 sm:mt-8 md:mt-10">
						<section className="mt-20">
							<div className="flex flex-col md:flex-row gap-6">
								{/* Quick Transfer */}
								<div className="w-full max-w-[445px]">
									<div className="flex justify-between items-center mb-4">
										<h2 className="text-2xl font-semibold text-primary">
											Quick Transfer
										</h2>
									</div>
									<QuickTransfer
										contacts={
											quickTransferContactsData?.map((contact) => ({
												name: contact.name,
												avatar: contact.avatar,
												role:
													contact.id === "1"
														? "CEO"
														: contact.id === "2"
															? "Director"
															: "Designer",
											})) || []
										}
									/>
								</div>

								{/* Balance History */}
								<div className="w-full max-w-[635px]">
									<div className="flex justify-between items-center mb-4">
										<h2 className="text-2xl font-semibold text-primary">
											Balance History
										</h2>
									</div>
									<BalanceHistory
										data={balanceHistoryData?.map((item) => item.balance) || []}
										labels={balanceHistoryData?.map((item) => item.month) || []}
									/>
								</div>
							</div>
						</section>
					</div>
				</div>
			)}
		</>
	);
};

export default DashboardPage;
