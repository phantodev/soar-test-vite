import type { FC } from "react";
import type { ChartOptions, TooltipItem } from "chart.js";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Registrando os componentes necessários do Chart.js
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend,
);

interface BalanceHistoryProps {
	data?: number[];
	labels?: string[];
}

const BalanceHistory: FC<BalanceHistoryProps> = ({
	data = [150, 320, 250, 450, 520, 780, 220, 550, 300, 580, 250, 620],
	labels = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"],
}) => {
	const chartData = {
		labels,
		datasets: [
			{
				fill: true,
				label: "Balance",
				data,
				borderColor: "rgb(53, 85, 235)",
				backgroundColor: "rgba(53, 85, 235, 0.2)",
				tension: 0.4, // Isso faz as linhas ficarem curvas
				pointRadius: 0, // Remove os pontos
				borderWidth: 3,
			},
		],
	};

	const chartOptions: ChartOptions<"line"> = {
		responsive: true,
		maintainAspectRatio: false,
		elements: {
			line: {
				borderCapStyle: "round", // Arredonda as pontas da linha
			},
			point: {
				radius: 0, // Remove os pontos
				hitRadius: 0, // Remove a interação com os pontos
			},
		},
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				mode: "index" as const,
				intersect: false,
				backgroundColor: "white",
				titleColor: "#333",
				bodyColor: "#333",
				borderColor: "#e2e8f0",
				borderWidth: 1,
				padding: 10,
				callbacks: {
					label: (context: TooltipItem<"line">) => {
						return `$${context.parsed.y}`;
					},
				},
			},
			datalabels: {
				display: false, // Desativa os rótulos de dados na linha
			},
		},
		scales: {
			y: {
				border: {
					display: false,
				},
				grid: {
					color: "rgba(0, 0, 0, 0.05)",
					drawTicks: false,
				},
				ticks: {
					padding: 10,
					color: "#94a3b8",
					font: {
						size: 12,
					},
					stepSize: 200, // Incremento de 200 em 200
					callback: (value) => (value === 0 ? "0" : `${value}`),
				},
				min: 0,
				max: 800,
			},
			x: {
				border: {
					display: false,
				},
				grid: {
					display: false,
				},
				ticks: {
					color: "#94a3b8",
					font: {
						size: 12,
					},
				},
			},
		},
	};

	return (
		<div className="w-full bg-white rounded-2xl lg:p-6 lg:border lg:border-gray-200">
			<div className="h-[250px]">
				<Line data={chartData} options={chartOptions} />
			</div>
		</div>
	);
};

export default BalanceHistory;
