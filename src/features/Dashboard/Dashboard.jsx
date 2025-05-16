import { useEffect, useState } from "react";

import {
  Box,
  Button,
  IconButton,
  Popover,
  Stack,
  Tooltip,
} from "@mui/material";

import {
  AddRounded,
  EditRounded,
  RestartAltRounded,
} from "@mui/icons-material";

import RowHeader from "src/common/RowHeader/RowHeader";
import AddWidget from "src/features/Dashboard/AddWidget";
import DndGridLayout from "src/features/Dashboard/DndGridLayout";
import { WidgetTypeList } from "src/features/Dashboard/constants";
import { pluralize } from "src/common/utils";
import { v4 as uuidv4 } from "uuid";
import CustomSnackbar from "src/common/CustomSnackbar/CustomSnackbar";
import { useAppTitle } from "src/hooks/useAppTitle";

export default function Dashboard() {
  useAppTitle("Dashboard");
  const [widgets, setWidgets] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editMode, setEditMode] = useState(false); // re-arrange widgets
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleClose = () => setAnchorEl(null);
  const handleClick = (ev) => setAnchorEl(ev.currentTarget);

  const handleAddWidget = (id) => {
    const selectedWidget = WidgetTypeList.find(
      (widgetType) => widgetType.id === id
    );

    setWidgets((prevWidgets) => {
      const updatedWidgets = [
        ...prevWidgets,
        // create a custom uuid to associate the widget for ui.
        // widgetID !== config.widgetID
        { ...selectedWidget, widgetID: uuidv4() },
      ];
      localStorage.setItem("widgets", JSON.stringify(updatedWidgets));

      return updatedWidgets;
    });

    setShowSnackbar(true);
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
        <Stack direction="row">
          <Tooltip
            title={editMode ? "Save widget layout" : "Edit widget layout"}
          >
            <Box component="span">
              <IconButton
                sx={{ alignSelf: "flex-start" }}
                color="primary"
                disabled={widgets.length <= 0}
                onClick={() => setEditMode(!editMode)}
              >
                <EditRounded
                  fontSize="inherit"
                  color={editMode ? "primary" : "inherit"}
                />
              </IconButton>
            </Box>
          </Tooltip>
          <RowHeader
            sxProps={{ textAlign: "left", fontWeight: "bold" }}
            title={editMode ? "Editing Layout" : "Standard layout"}
            caption={`Displaying ${widgets.length} ${pluralize(
              widgets?.length,
              "widget"
            )}`}
          />
        </Stack>
        <Stack direction="row" spacing={2}>
          <Tooltip title="Add Widget">
            <IconButton onClick={handleClick}>
              <AddRounded fontSize="small" color="primary" />
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
        editMode={editMode}
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

      <CustomSnackbar
        showSnackbar={showSnackbar}
        setShowSnackbar={setShowSnackbar}
        title="Successfully added new widget."
      />
    </Stack>
  );
}
