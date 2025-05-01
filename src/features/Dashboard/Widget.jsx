import { CancelRounded, DragIndicatorRounded } from "@mui/icons-material";
import { Badge, Box, IconButton, Paper, Stack, Tooltip } from "@mui/material";
import RowHeader from "src/common/RowHeader/RowHeader";

export default function Widget({ widget = {}, handleRemoveWidget }) {
  console.log(widget);
  return (
    <Box sx={{ ...widget.config }}>
      <Badge
        badgeContent={
          <IconButton
            size="small"
            disableRipple
            disableFocusRipple
            disableTouchRipple
            onClick={() => handleRemoveWidget(widget?.widgetID || "")}
          >
            <CancelRounded fontSize="small" />
          </IconButton>
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
            <Tooltip title="Drag and drop to restructure widget layout">
              <IconButton
                size="small"
                disableRipple
                disableFocusRipple
                disableTouchRipple
                sx={{ cursor: "move", alignItems: "flex-start" }}
              >
                <DragIndicatorRounded fontSize="inherit" />
              </IconButton>
            </Tooltip>
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
