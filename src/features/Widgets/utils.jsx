import dayjs from "dayjs";

/**
 * fakeDataset
 *
 * creates a fake dataset function for testing purposes only.
 * TODO: REMOVE THIS AFTER DASHBOARD WORK IS COMPLETED.
 */
export function fakeDataset() {
  const draftData = {
    title: "Rent for the month of March",
    caption: "Test title",
    note: "No additional notes",
    start_date: "04-01-2025",
    end_date: "04-30-2025",
    tax_rate: "1",
    invoice_header: "test",
    items: [
      {
        descpription: "test",
        caption: "test",
        quantity: "1",
        price: "1389.98",
        payment: "1389.98",
        payment_method: "zelle",
      },
    ],
    updated_on: "2025-04-15T13:14:09.627Z",
  };

  const draftData2 = {
    title: "Rent for the month of April",
    caption: "Test title",
    note: "No additional notes",
    start_date: "05-01-2025",
    end_date: "05-31-2025",
    tax_rate: "1",
    invoice_header: "test",
    items: [
      {
        descpription: "test",
        caption: "test",
        quantity: "1",
        price: "1389.98",
        payment: "1389.98",
        payment_method: "zelle",
      },
    ],
    updated_on: "2025-04-15T13:14:09.627Z",
  };

  localStorage.setItem(
    "invoiceDataList",
    JSON.stringify([draftData, draftData2])
  );
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

  const datasets = draftInvoiceList.map((invoice) => {
    const month = dayjs(invoice.start_date).format("MMMM");
    const index = monthLabels.indexOf(month);

    const duration = dayjs(invoice.end_date).diff(invoice.start_date, "day");
    const data = monthLabels.map((_, idx) => (idx === index ? duration : null));

    return {
      label: `Payment: $${invoice.items?.[0]?.payment} via ${invoice.items?.[0]?.payment_method}`,
      data,
      backgroundColor: "#4CAF50",
      borderWidth: 1,
    };
  });

  return {
    labels: monthLabels,
    datasets,
  };
}
