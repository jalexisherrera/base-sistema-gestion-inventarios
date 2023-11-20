import React from 'react';
import { Inventory, calculateBalance } from '@/types/inventory';
import { Line } from 'react-chartjs-2';
import { CategoryScale, Chart, ChartData, LineElement, LinearScale, PointElement } from 'chart.js';

interface InventoryChartProps {
  inventories: Inventory[] | undefined;
}

const InventoryChart: React.FC<InventoryChartProps> = ({ inventories }) => {
  if (!inventories || inventories.length === 0) {
    return <div>No data available for the chart.</div>;
  }

  Chart.register(CategoryScale)
  Chart.register(LinearScale)
  Chart.register(PointElement)
  Chart.register(LineElement)
  const balance = calculateBalance(inventories)

  const labels = balance.map(b => b.date)

  const data: ChartData<"line"> = {

    labels: labels,
    datasets: [{

      label: "balance",
      data: balance.map(b => b.balance),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)'
    }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };

  const line = <Line id="Balance" options={options} data={data} />;
  return line
};

export { InventoryChart };


