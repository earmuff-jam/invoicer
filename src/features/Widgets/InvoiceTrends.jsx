import { useEffect, useState } from "react";
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
import { normalizeInvoiceTrendsChartsDataset } from "src/features/Widgets/utils";
import EmptyComponent from "src/features/Widgets/EmptyComponent";

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

const InvoiceTrendsChart = ({ label, caption }) => {
  const [chartData, setChartData] = useState(null);
  const [chartType, setChartType] = useState("bar"); // or "line"

  const handleChartType = (ev, draftChartType) => {
    if (draftChartType !== null) {
      setChartType(draftChartType);
    }
  };

  useEffect(() => {
    const draftData = JSON.parse(localStorage.getItem("pdfDetails"));
    const draftDataList = [draftData];
    if (Array.isArray(draftDataList) && draftDataList.length > 0) {
      const chartData = normalizeInvoiceTrendsChartsDataset(
        draftDataList,
        chartType
      );

      setChartData(chartData[0]);
    }
  }, [chartType]);

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

      <Box>
        {chartData === null ? (
          <EmptyComponent />
        ) : chartType === "bar" ? (
          <Bar data={chartData} options={options} />
        ) : (
          <Line data={chartData} options={options} />
        )}
      </Box>
    </Stack>
  );
};

export default InvoiceTrendsChart;
