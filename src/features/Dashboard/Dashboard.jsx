import { useEffect, useState } from "react";

import { Button, IconButton, Popover, Stack, Tooltip } from "@mui/material";

import { AddRounded, RestartAltRounded } from "@mui/icons-material";

import RowHeader from "src/common/RowHeader/RowHeader";
import AddWidget from "src/features/Dashboard/AddWidget";
import DndGridLayout from "src/features/Dashboard/DndGridLayout";
import { WidgetTypeList } from "src/features/Dashboard/constants";
import { pluralize } from "src/common/utils";
import { v4 as uuidv4 } from "uuid";

export default function Dashboard() {
  const [widgets, setWidgets] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => setAnchorEl(null);
  const handleClick = (ev) => setAnchorEl(ev.currentTarget);

  const handleAddWidget = (id) => {
    const selectedWidget = WidgetTypeList.find(
      (widgetType) => widgetType.id === id
    );

    setWidgets((prevWidgets) => {
      const updatedWidgets = [
        ...prevWidgets,
        // create a custom uuid to associate the widget
        { ...selectedWidget, widgetID: uuidv4() },
      ];
      localStorage.setItem("widgets", JSON.stringify(updatedWidgets));

      return updatedWidgets;
    });

    handleClose();
  };

  const handleRemoveWidget = (widgetID) => {
    setWidgets((prevWidgets) => {
      const remainingWidgets = prevWidgets.filter(
        (widget) => widget.widgetID !== widgetID
      );

      localStorage.setItem("widgets", JSON.stringify(remainingWidgets));
      return remainingWidgets;
    });
  };

  const reset = () => {
    setWidgets([]);
    localStorage.setItem("widgets", JSON.stringify([]));
    handleClose();
  };

  useEffect(() => {
    const draftWidgets = localStorage.getItem("widgets");
    if (draftWidgets) {
      setWidgets(JSON.parse(draftWidgets));
    }
  }, []);

  return (
    <Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <RowHeader
          sxProps={{ textAlign: "left", fontWeight: "bold" }}
          title="Standard Layout"
          caption={`Displaying ${widgets.length} ${pluralize(
            widgets?.length,
            "widget"
          )}`}
        />
        <Stack direction="row" spacing={2}>
          <Tooltip title="Add Widget">
            <IconButton onClick={handleClick}>
              <AddRounded fontSize="small" />
            </IconButton>
          </Tooltip>
          <Button
            variant="outlined"
            endIcon={<RestartAltRounded />}
            onClick={reset}
          >
            Reset
          </Button>
        </Stack>
      </Stack>

      <DndGridLayout
        widgets={widgets}
        setWidgets={setWidgets}
        handleRemoveWidget={handleRemoveWidget}
      />

      {/* Add Widget Popover Content */}
      <Popover
        id={open ? "simple-popover" : undefined}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <AddWidget handleAddWidget={handleAddWidget} />
      </Popover>
    </Stack>
  );
}
