import { useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Box, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import RowHeader from "src/common/RowHeader/RowHeader";
import { BarChartRounded, StackedLineChartRounded } from "@mui/icons-material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Title
);

const invoices = [
  {
    title: "Rent - March",
    date: "2025-03-01",
    total: 1000,
    tax_rate: 5, // percent
  },
  {
    title: "Rent - April",
    date: "2025-04-01",
    total: 1200,
    tax_rate: 1,
  },
  {
    title: "Rent - May",
    date: "2025-05-01",
    total: 900,
    tax_rate: 1.5,
  },
];

const InvoiceTrendsChart = ({ label, caption }) => {
  const [chartType, setChartType] = useState("bar"); // or "line"

  // Process invoices into monthly labels, rent, and tax arrays
  const labels = invoices.map((inv) =>
    new Date(inv.date).toLocaleString("default", {
      month: "short",
      year: "numeric",
    })
  );

  const rentTotals = invoices.map((inv) => inv.total);
  const taxCollected = invoices.map((inv) =>
    parseFloat(((inv.total * inv.tax_rate) / 100).toFixed(2))
  );

  const handleChartType = (ev, draftChartType) => {
    if (draftChartType !== null) {
      setChartType(draftChartType);
    }
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Rent Collected",
        data: rentTotals,
        backgroundColor: "rgba(54, 162, 235, 0.7)",
        borderColor: "rgba(54, 162, 235, 1)",
        fill: chartType === "line",
        tension: 0.4,
      },
      {
        label: "Tax Collected",
        data: taxCollected,
        backgroundColor: "rgba(255, 99, 132, 0.7)",
        borderColor: "rgba(255, 99, 132, 1)",
        fill: chartType === "line",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Invoice Totals & Tax Collected Over Time",
      },
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        stacked: chartType === "bar",
      },
      x: {
        stacked: chartType === "bar",
      },
    },
  };

  return (
    <Stack>
      <Stack direction="row" justifyContent="space-between">
        <RowHeader
          title={label}
          caption={caption}
          sxProps={{
            textAlign: "left",
            fontWeight: "bold",
            color: "text.secondary",
          }}
        />

        <Box>
          <ToggleButtonGroup
            value={chartType}
            exclusive
            onChange={handleChartType}
            aria-label="bar or line chart"
          >
            <ToggleButton value="bar" aria-label="bar chart" size="small">
              <BarChartRounded />
            </ToggleButton>
            <ToggleButton value="line" aria-label="line chart" size="small">
              <StackedLineChartRounded />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Stack>

      <div>
        <div style={{ marginBottom: "10px" }}></div>
        {chartType === "bar" ? (
          <Bar data={data} options={options} />
        ) : (
          <Line data={data} options={options} />
        )}
      </div>
    </Stack>
  );
};

export default InvoiceTrendsChart;
