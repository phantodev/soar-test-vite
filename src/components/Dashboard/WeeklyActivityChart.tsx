import type { FC } from "react";

interface WeeklyActivity {
	day: string;
	deposit: number;
	withdraw: number;
}

interface WeeklyActivityChartProps {
	data: WeeklyActivity[];
}

const WeeklyActivityChart: FC<WeeklyActivityChartProps> = ({ data }) => {
	const maxValue = Math.max(
		...data.flatMap((item) => [item.deposit, item.withdraw]),
	);

	// Calcular os valores para as linhas de referência
	const valueLines = [0, 100, 200, 300, 400, 500];

	return (
		<div className="w-full h-full bg-white rounded-2xl lg:p-6 lg:border lg:border-gray-200">
			<div className="flex items-center justify-end lg:mb-6">
				<div className="flex items-center gap-6">
					<div className="flex items-center gap-2">
						<div className="w-3 h-3 rounded-full bg-blue-500" />
						<span className="text-sm text-gray-500">Deposit</span>
					</div>
					<div className="flex items-center gap-2">
						<div className="w-3 h-3 rounded-full bg-gray-800" />
						<span className="text-sm text-gray-500">Withdraw</span>
					</div>
				</div>
			</div>

			<div className="flex flex-col h-[220px] mt-4 lg:mt-14">
				{/* Área principal do gráfico */}
				<div className="flex flex-1">
					{/* Coluna vertical com os valores */}
					<div className="flex flex-col justify-between h-[180px] pr-4 text-xs text-gray-500">
						{valueLines.reverse().map((value) => (
							<div key={value} className="flex items-center">
								<span>{value}</span>
							</div>
						))}
					</div>

					{/* Área principal do gráfico com linhas de referência */}
					<div className="flex-1 relative">
						{/* Linhas horizontais de referência */}
						<div className="absolute inset-0 flex flex-col justify-between h-[180px] pointer-events-none">
							{valueLines.reverse().map((value) => (
								<div key={value} className="w-full h-[1px] bg-gray-100" />
							))}
						</div>

						{/* Barras do gráfico */}
						<div className="flex items-end justify-between h-[180px] relative z-10 px-1 lg:px-0">
							{data.map((item) => (
								<div
									key={item.day}
									className="flex flex-col items-center gap-2 w-full"
								>
									<div className="flex items-end justify-center gap-1 lg:gap-2 h-full w-full">
										{/* Withdraw bar */}
										<div
											className="w-2 lg:w-4 bg-gray-800 rounded-full"
											style={{
												height: `${(item.withdraw / maxValue) * 180}px`,
											}}
										/>

										{/* Deposit bar */}
										<div
											className="w-2 lg:w-4 bg-blue-500 rounded-full"
											style={{
												height: `${(item.deposit / maxValue) * 180}px`,
											}}
										/>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Linha de dias da semana separada */}
				<div className="flex justify-between mt-2 pl-8">
					{data.map((item) => (
						<div key={`day-${item.day}`} className="flex justify-center w-full">
							<span className="text-xs text-gray-500">{item.day}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default WeeklyActivityChart;
