import {
  Button,
  IconButton,
  Popover,
  Stack,
  Tooltip,
} from "@mui/material";

import { AddRounded, RestartAltRounded } from "@mui/icons-material";

import RowHeader from "src/common/RowHeader/RowHeader";
import { useState } from "react";
import AddWidget from "src/features/Dashboard/AddWidget";

export default function Dashboard() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <RowHeader
          sxProps={{ textAlign: "left" }}
          title="Default layout"
          caption="Displaying 3 out of 5 widgets"
        />
        <Stack direction="row" spacing={2}>
          <Tooltip title="Add Widget">
            <IconButton onClick={handleClick}>
              <AddRounded fontSize="small" />
            </IconButton>
          </Tooltip>
          <Button variant="outlined" endIcon={<RestartAltRounded />}>
            Reset
          </Button>
        </Stack>
      </Stack>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <AddWidget />
      </Popover>
    </Stack>
  );
}
