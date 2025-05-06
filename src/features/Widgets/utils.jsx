import dayjs from "dayjs";

/**
 * fakeDataset
 *
 * creates a fake dataset function for testing purposes only.
 * TODO: REMOVE THIS AFTER DASHBOARD WORK IS COMPLETED.
 */
export function fakeDataset() {
  const draftData = {
    title: "Rent for the month of April",
    caption: "No additional information provided",
    note: "Payment should be made by 3rd of every month",
    start_date: "04-01-2025",
    end_date: "04-30-2025",
    tax_rate: "1.5",
    invoice_header: "Rent details",
    items: [
      {
        descpription: "Base rent",
        caption: "Period of April",
        quantity: "1",
        price: "1389.98",
        payment: "1389.98",
        payment_method: "zelle",
      },
    ],
    updated_on: "2025-04-30T13:14:09.627Z",
  };

  const draftData2 = {
    title: "Rent for the month of May",
    caption: "No additional information provided",
    note: "Payment should be made by 3rd of every month",
    start_date: "05-01-2025",
    end_date: "05-31-2025",
    tax_rate: "0.5",
    invoice_header: "Rent details",
    items: [
      {
        descpription: "Base rent",
        caption: "Period of May",
        quantity: "1",
        price: "1389.98",
        payment: "1389.98",
        payment_method: "zelle",
      },
      {
        descpription: "Floor replacement",
        caption: "Period of May",
        quantity: "1",
        price: "240.00",
        payment: "240.00",
        payment_method: "zelle",
      },
    ],
    updated_on: "2025-05-30T13:14:09.627Z",
  };

  localStorage.setItem(
    "invoiceDataList",
    JSON.stringify([draftData, draftData2])
  );
}

/**
 * normalizeInvoiceTrendsChartsDataset
 *
 * used to build out a bar chart dataset for chartjs.
 *
 * @param {Array} draftInvoiceList - Array of invoices
 * @param {String} chartType - The type of chart
 * @returns Object containing single dataset
 */
export function normalizeInvoiceTrendsChartsDataset(
  draftInvoiceList = [],
  chartType = ""
) {
  const monthMap = new Map();

  draftInvoiceList.forEach((invoice) => {
    const month = dayjs(invoice.start_date).format("MMMM");
    const taxRate = Number(invoice.tax_rate || 0);

    const collectedTotal = invoice?.items?.reduce((acc, item) => {
      return acc + Number(item?.price || 0);
    }, 0);

    const taxCollected = parseFloat(
      ((collectedTotal * taxRate) / 100).toFixed(2)
    );

    if (!monthMap.has(month)) {
      monthMap.set(month, {
        collected: 0,
        tax: 0,
      });
    }

    const current = monthMap.get(month);
    monthMap.set(month, {
      collected: current.collected + collectedTotal,
      tax: current.tax + taxCollected,
    });
  });

  const labels = Array.from(monthMap.keys());
  const collectedData = Array.from(monthMap.values()).map(
    (val) => val.collected
  );
  const taxData = Array.from(monthMap.values()).map((val) => val.tax);

  return [
    {
      labels,
      datasets: [
        {
          label: "Collected Invoice",
          data: collectedData,
          backgroundColor: "rgba(54, 162, 235, 0.7)",
          borderColor: "rgba(54, 162, 235, 1)",
          fill: chartType === "line",
          tension: 0.4,
        },
        {
          label: "Tax Collected",
          data: taxData,
          backgroundColor: "rgba(255, 99, 132, 0.7)",
          borderColor: "rgba(255, 99, 132, 1)",
          fill: chartType === "line",
          tension: 0.4,
        },
      ],
    },
  ];
}

/**
 * normalizeBarChartDataset
 *
 * used to build out a bar chart dataset for chartjs.
 *
 * @param {Array} draftInvoiceList - Array of invoices
 *
 * @returns Object containing single dataset
 */
export function normalizeDataset(draftInvoiceList = []) {
  const months = new Set();

  draftInvoiceList.forEach((invoice) => {
    const month = dayjs(invoice.start_date).format("MMMM");
    months.add(month);
  });

  const monthLabels = Array.from(months);

  const datasets = draftInvoiceList.map((invoice, id) => {
    const month = dayjs(invoice.start_date).format("MMMM");
    const index = monthLabels.indexOf(month);

    const duration = dayjs(invoice.end_date).diff(invoice.start_date, "day");
    const data = monthLabels.map((_, idx) => (idx === index ? duration : null));

    return {
      label: `Payment: $${invoice.items?.[0]?.payment} via ${invoice.items?.[0]?.payment_method}`,
      data,
      backgroundColor: id % 2 === 0 ? "#4CAF50" : "rgba(255, 99, 132, 0.7)",
      borderWidth: 1,
    };
  });

  return {
    labels: monthLabels,
    datasets,
  };
}
