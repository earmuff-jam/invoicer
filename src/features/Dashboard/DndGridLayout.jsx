import { useState } from "react";
import { Responsive as ResponsiveGridLayout } from "react-grid-layout";

import { Stack, Typography } from "@mui/material";
import Widget from "src/features/Dashboard/Widget";

export default function DndGridLayout({
  widgets,
  setWidgets,
  handleRemoveWidget,
}) {
  const [activeWidget, setActiveWidget] = useState(null); // active widget for drag overlay

  const handleDragStart = (ev) => {
    const { active } = ev;
    const activeId = active.id.toString();
    const widget = widgets.find((w) => w.widgetID === activeId);
    setActiveWidget(widget);
  };

  const handleDragEnd = (ev) => {
    const { active, over } = ev; // active is current, over is replacing

    setActiveWidget(null);

    if (!over) return;
    if (active.id === over.id) return;

    const originalIdx = widgets.findIndex(
      (widget) => widget.widgetID === active.id.toString()
    );
    const newIdx = widgets.findIndex(
      (widget) => widget.widgetID === over.id.toString()
    );

    const updatedWidgets = arrayMove(widgets, originalIdx, newIdx);
    setWidgets(updatedWidgets);
  };

  if (widgets.length <= 0)
    return (
      <Stack textAlign="center">
        <Typography variant="h5" sx={{ textTransform: "initial" }}>
          Sorry, no matching records found
        </Typography>
        <Typography variant="caption" sx={{ textTransform: "initial" }}>
          Add widgets for custom dashboard layout.
        </Typography>
      </Stack>
    );

  console.log(widgets);

  // const layout = [
  //   { widgetID: 1, x: 0, y: 0, w: 1, h: 2 },
  //   { widgetID: 2, x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
  //   { widgetID: 3, x: 4, y: 0, w: 1, h: 2 },
  // ];

  const baseLayout = widgets.map((widget, index) => ({
    i: widget.widgetID,
    x: (index % 4) * 12, // 4 per row, spread horizontally
    y: Math.floor(index / 4) * 8, // move vertically after 4 items
    w: 12,
    h: 8,
  }));

  const layouts = {
    lg: baseLayout,
    md: baseLayout,
    sm: baseLayout,
    xs: baseLayout,
    xxs: baseLayout,
  };

  return (
    <>
      <ResponsiveGridLayout
        margin={[20, 20]}
        containerPadding={[10, 10]}
        rowHeight={20}
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 48, md: 48, sm: 48, xs: 48, xxs: 48 }}
        onLayoutChange={() => {
          console.log("layout has been changed. save it");
        }}
      >
        {widgets.map((widget) => (
          <div key={widget.widgetID}>
            <Widget widget={widget} handleRemoveWidget={handleRemoveWidget} />
          </div>
        ))}
      </ResponsiveGridLayout>
    </>
  );
}
