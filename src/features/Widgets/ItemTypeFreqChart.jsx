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
import { useEffect, useState } from "react";
import { normalizeInvoiceItemTypeChartDataset } from "src/features/Widgets/utils";
import EmptyComponent from "src/features/Widgets/EmptyComponent";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title,
  Legend
);

const ItemTypeFreqChart = ({ label, caption }) => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const draftData = JSON.parse(localStorage.getItem("pdfDetails"));
    if (draftData) {
      const chartData = normalizeInvoiceItemTypeChartDataset([draftData]);
      setChartData(chartData);
    }
  }, []);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Item Type Frequency",
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
      {Object.keys(chartData).length <= 0 ? (
        <EmptyComponent />
      ) : (
        <Bar data={chartData} options={options} />
      )}
    </Stack>
  );
};

export default ItemTypeFreqChart;
