import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title,
  Legend,
} from "chart.js";
import { Stack } from "@mui/material";
import RowHeader from "src/common/RowHeader/RowHeader";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title,
  Legend
);

const invoices = [
  {
    date: "2025-04-01",
    items: [
      { description: "Rent", quantity: 1, price: 1000 },
      { description: "Utilities", quantity: 1, price: 150 },
    ],
  },
  {
    date: "2025-05-01",
    items: [
      { description: "Rent", quantity: 1, price: 1000 },
      { description: "Internet", quantity: 1, price: 60 },
    ],
  },
];

const ItemTypeFreqChart = ({ label, caption }) => {
  // Flatten items across all invoices and count occurrences by description
  const itemCountMap = {};

  invoices.forEach((invoice) => {
    invoice.items.forEach((item) => {
      const desc = item.description || "Unknown";
      itemCountMap[desc] = (itemCountMap[desc] || 0) + 1;
    });
  });

  const labels = Object.keys(itemCountMap);
  const frequencies = Object.values(itemCountMap);

  const data = {
    labels,
    datasets: [
      {
        label: "Item Type Frequency",
        data: frequencies,
        backgroundColor: "rgba(153, 102, 255, 0.7)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Item/Service Type Frequency",
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  return (
    <Stack>
      <RowHeader
        title={label}
        caption={caption}
        sxProps={{
          textAlign: "left",
          fontWeight: "bold",
          color: "text.secondary",
        }}
      />

      <Bar data={data} options={options} />
    </Stack>
  );
};

export default ItemTypeFreqChart;
