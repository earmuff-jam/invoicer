/**
 * WidgetTypeList ...
 *
 * Array of objects that denote the available widgets for use.
 *
 * Columns  {Array}   -   primarily used for table data structures.
 * Data     {Array}   -   actual table / chart data.
 * Config   {Object}  -   widget config of the specific widget.
 *
 *
 * WidgetID !== config.widgetID
 * =============================
 * This is such because config.widgetID is used to specifically denote a selected widget. useful during viewing
 * logs of the application or for analytics. Config.widgetID can be duplicated to denote multiple instances of
 * the same widget during analytics. WidgetID on the other hand, is generated during adding a widget, and is present
 * to help structure the layout of the dashboard.
 *
 */
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
      position: { x: 100, y: 100 },
      widgetID: "58d51b07-d3e7-46f5-ab1b-1afe18dc978d", // protected id of the widget
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
      position: { x: 300, y: 100 },
      widgetID: "35cf7f32-9bd6-478a-a7ac-a025c4e839f8", // protected id of the widget
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
      position: { x: 500, y: 100 },
      widgetID: "539e6d39-7554-4a05-90e0-87644ba8fea3", // protected id of the widget
    },
  },
];
