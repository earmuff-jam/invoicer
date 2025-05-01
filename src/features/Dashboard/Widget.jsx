import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

import { CancelRounded, DragIndicatorRounded } from "@mui/icons-material";
import { Badge, Box, IconButton, Paper, Stack, Tooltip } from "@mui/material";

import RowHeader from "src/common/RowHeader/RowHeader";

export default function Widget({ editMode, widget = {}, handleRemoveWidget }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: widget.widgetID,
    });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <Box sx={{ ...style }} ref={setNodeRef}>
      <Badge
        badgeContent={
          editMode && (
            <IconButton
              size="small"
              color="error"
              disableRipple
              disableFocusRipple
              disableTouchRipple
              onClick={() => handleRemoveWidget(widget?.widgetID || "")}
            >
              <CancelRounded fontSize="small" />
            </IconButton>
          )
        }
      >
        <Box
          component={Paper}
          {...widget.config}
          sx={{
            padding: 1,
            overflow: "auto",
            backgroundColor: "background.paper",
          }}
        >
          <Stack direction="row" spacing={1}>
            {editMode && (
              <Tooltip title="Drag and drop to restructure widget layout">
                <IconButton
                  size="small"
                  {...attributes}
                  {...listeners}
                  disableRipple
                  disableFocusRipple
                  disableTouchRipple
                  color="primary"
                  sx={{ cursor: "move" }}
                >
                  <DragIndicatorRounded fontSize="inherit" />
                </IconButton>
              </Tooltip>
            )}
            <RowHeader
              title={widget.label}
              caption={widget.caption}
              sxProps={{
                textAlign: "left",
                fontWeight: "bold",
                color: "text.secondary",
              }}
            />
          </Stack>
        </Box>
      </Badge>
    </Box>
  );
}
