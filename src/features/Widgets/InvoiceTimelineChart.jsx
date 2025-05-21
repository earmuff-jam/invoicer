import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title,
} from "chart.js";
import { Stack } from "@mui/material";
import RowHeader from "src/common/RowHeader/RowHeader";
import EmptyComponent from "common/EmptyComponent";
import { normalizeInvoiceTimelineChartDataset } from "src/features/Widgets/utils";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Title);

const InvoiceTimelineChart = ({ label, caption }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    const draftData = JSON.parse(localStorage.getItem("pdfDetails"));
    if (draftData) {
      const chartData = normalizeInvoiceTimelineChartDataset([draftData]);
      setData(chartData);
    }
  }, []);

  const options = {
    indexAxis: "y",
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Invoice Timeline",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `Duration: ${context.raw} days`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Days",
        },
        min: 0,
        max: 31,
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
      {Object.keys(data).length <= 0 ? (
        <EmptyComponent />
      ) : (
        <Bar data={data} options={options} />
      )}
    </Stack>
  );
};

export default InvoiceTimelineChart;
