import type { FC } from "react";
import WeeklyActivityChart from "./WeeklyActivityChart";
import ExpenseStatistics from "./ExpenseStatistics";

const ActivitySection: FC = () => {
	// Sample data for weekly activity
	const weeklyActivityData = [
		{ day: "Sat", deposit: 230, withdraw: 450 },
		{ day: "Sun", deposit: 120, withdraw: 320 },
		{ day: "Mon", deposit: 260, withdraw: 310 },
		{ day: "Tue", deposit: 350, withdraw: 450 },
		{ day: "Wed", deposit: 230, withdraw: 150 },
		{ day: "Thu", deposit: 230, withdraw: 380 },
		{ day: "Fri", deposit: 320, withdraw: 380 },
	];

	// Sample data for expense statistics
	const expenseStatisticsData = [
		{ name: "Entertainment", percentage: 30, color: "#3B4B80" },
		{ name: "Bill Expense", percentage: 15, color: "#F97316" },
		{ name: "Investment", percentage: 20, color: "#3B82F6" },
		{ name: "Others", percentage: 35, color: "#1F2937" },
	];

	return (
		<section className="flex flex-col md:flex-row gap-6 mt-6">
			<div className="w-full md:w-[730px]">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-md lg:text-2xl font-semibold text-primary">
						Weekly Activity
					</h2>
				</div>
				<WeeklyActivityChart data={weeklyActivityData} />
			</div>
			<div className="w-full md:w-[350px]">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-md lg:text-2xl font-semibold text-primary">
						Expense Statistics
					</h2>
				</div>
				<ExpenseStatistics data={expenseStatisticsData} />
			</div>
		</section>
	);
};

export default ActivitySection;
