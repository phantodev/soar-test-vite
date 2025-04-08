import { useRef, useEffect } from "react";
import type { FC } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import type { ChartData, ChartOptions } from "chart.js";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface ExpenseCategory {
  name: string;
  percentage: number;
  color: string;
}

interface ExpenseStatisticsProps {
  data: ExpenseCategory[];
}

const ExpenseStatistics: FC<ExpenseStatisticsProps> = ({ data }) => {
  const chartContainer = useRef<HTMLDivElement>(null);
  const chartData: ChartData<"pie"> = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        data: data.map((item) => item.percentage),
        backgroundColor: data.map((item) => item.color),
        borderColor: ["#ffffff"],
        borderWidth: 4,
      },
    ],
  };

  const chartOptions: ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Escondendo a legenda para mostrar apenas os rótulos internos
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: { label?: string; raw: unknown }) => {
            const label = tooltipItem.label || "";
            const value = tooltipItem.raw as number;
            return `${label}: ${value}%`;
          },
        },
      },
      // Configuração do plugin datalabels para mostrar texto dentro do gráfico
      datalabels: {
        color: "#ffffff",
        textAlign: "center",
        font: {
          weight: "bold",
          size: 13,
          family: "Arial, sans-serif",
        },
        formatter: (
          value: number,
          context: { chart: { data: { labels: string[] } }; dataIndex: number },
        ) => {
          const label = context.chart.data.labels[context.dataIndex];

          // Esconder o texto para "Bill Expense" (fatia laranja) - vamos adicionar manualmente
          if (label === "Bill Expense") {
            return null; // Não mostrar texto para esta fatia
          }

          // Para as outras fatias - sem truncamento
          return [`${value}%`, label];
        },
        display: (context) => {
          const value = context.dataset.data[context.dataIndex];
          return typeof value === "number" && value > 5; // Só mostra rótulos em fatias maiores que 5%
        },
        anchor: "center",
        align: (context) => {
          // Posicionamento especial para "Bill Expense" (fatia laranja)
          if (
            context.chart.data.labels &&
            context.chart.data.labels[context.dataIndex] === "Bill Expense"
          ) {
            return "center"; // Centralizado
          }
          return "center";
        },
        offset: (context) => {
          // Deslocamento para "Bill Expense" (fatia laranja)
          if (
            context.chart.data.labels &&
            context.chart.data.labels[context.dataIndex] === "Bill Expense"
          ) {
            return 0; // Sem deslocamento radial, usamos x e y diretamente
          }
          return 0;
        },
        rotation: (context) => {
          // Rotação para "Bill Expense" (fatia laranja)
          if (
            context.chart.data.labels &&
            context.chart.data.labels[context.dataIndex] === "Bill Expense"
          ) {
            return 0; // Sem rotação
          }
          return 0;
        },
        // Deslocamento horizontal para "Bill Expense"
        x: (context: {
          chart: { data: { labels?: string[] } };
          dataIndex: number;
        }) => {
          if (
            context.chart.data.labels &&
            context.chart.data.labels[context.dataIndex] === "Bill Expense"
          ) {
            return 55; // 55px para a direita
          }
          return 0;
        },
        // Deslocamento vertical para "Bill Expense"
        y: (context: {
          chart: { data: { labels?: string[] } };
          dataIndex: number;
        }) => {
          if (
            context.chart.data.labels &&
            context.chart.data.labels[context.dataIndex] === "Bill Expense"
          ) {
            return 55; // 55px para baixo
          }
          return 0;
        },
        padding: 0,
      },
    },
    cutout: "0%", // Pie chart (0%) vs Doughnut chart (50%+)
    layout: {
      padding: 10,
    },
  } as ChartOptions<"pie">; // Casting para o tipo correto

  useEffect(() => {
    if (chartContainer.current) {
      // Limpar qualquer label personalizado anterior
      const existingLabels = document.querySelectorAll(".custom-bill-label");
      // Usando for...of para evitar erro de lint
      for (const label of Array.from(existingLabels)) {
        label.remove();
      }

      // Adicionar label personalizado após o gráfico ser renderizado
      setTimeout(() => {
        if (chartContainer.current) {
          // Criar elemento para o texto "Bill Expense"
          const labelDiv = document.createElement("div");
          labelDiv.className =
            "custom-bill-label absolute text-white font-bold text-center text-xs";
          labelDiv.style.position = "absolute";
          labelDiv.style.top = "70%";
          labelDiv.style.left = "72%";
          labelDiv.style.transform = "translate(-50%, -50%)";
          labelDiv.innerHTML = `
            <div>15%</div>
            <div>Bill</div>
            <div>Expense</div>
          `;

          // Adicionar ao container
          chartContainer.current.style.position = "relative";
          chartContainer.current.appendChild(labelDiv);
        }
      }, 500); // Pequeno atraso para garantir que o gráfico já foi renderizado
    }
  }, []);

  return (
    <div className="w-full h-full bg-white rounded-2xl p-6 border border-gray-200">
      <div
        ref={chartContainer}
        className="h-[300px] w-full flex items-center justify-center relative"
      >
        <Pie data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default ExpenseStatistics;
