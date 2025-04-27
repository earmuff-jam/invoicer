export const WidgetTypeList = [
  {
    id: 1,
    label: "Monetary Value Amount",
    caption: "Details about generated $$ from invoice list.",
    columns: [
      {
        label: "Label",
        accessorKey: "label",
      },
    ],
    data: [],
    config: {
      inset: false, // makes text have extra spacing infront
      height: "24rem",
      width: "48rem",
      minHeight: "24rem",
      minWidth: "48rem",
    },
  },
  {
    id: 2,
    label: "Invoice Details",
    caption: "Details about your invoice.",
    columns: [],
    data: [],
    config: {
      inset: false,
      height: "24rem",
      width: "64rem",
      minHeight: "24rem",
      minWidth: "64rem",
    },
  },
  {
    id: 3,
    label: "Invoice Demographics",
    caption:
      "Details about various recievers and their associated frequencies.",
    columns: [],
    data: [],
    config: {
      inset: false,
      height: "24rem",
      width: "24rem",
      minHeight: "24rem",
      minWidth: "24rem",
    },
  },
];
