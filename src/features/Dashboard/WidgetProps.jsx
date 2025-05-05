import { Box } from "@mui/material";
import InvoiceTimelineChart from "src/features/Widgets/InvoiceTimelineChart";
import InvoiceTrendsChart from "src/features/Widgets/InvoiceTrends";
import ItemTypeFreqChart from "src/features/Widgets/ItemTypeFreqChart";

export default function WidgetProps(widget) {
  switch (widget.id) {
    case 1:
      return (
        <Box sx={{ height: "20rem", width: "40rem" }}>
          <InvoiceTimelineChart label={widget.label} caption={widget.caption} />
        </Box>
      );
    case 2:
      return (
        <Box sx={{ height: "20rem", width: "40rem" }}>
          <InvoiceTrendsChart
            label={widget.label}
            caption={widget.caption}
          />
        </Box>
      );
    case 3:
      return (
        <Box sx={{ height: "20rem", width: "40rem" }}>
          <ItemTypeFreqChart
            label={widget.label}
            caption={widget.caption}
          />
        </Box>
      );
    default:
      return null;
  }
}
