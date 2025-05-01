export const WidgetTypeList = [
  {
    id: 1,
    label: "Invoice Tax Amount",
    caption: "Details about taxes from invoice list.",
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
      widgetID: "9caef12d-a611-4573-8fd2-b5bd3036ce13", // widgetID for config is for provision only
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
      widgetID: "c04637c7-080d-4641-a4f4-4fd523280d74",
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
      widgetID: "052fda00-2d37-4d0f-81b7-3fcb451e5ee1",
    },
  },
];
