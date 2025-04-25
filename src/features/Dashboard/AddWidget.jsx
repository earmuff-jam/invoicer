import React from "react";

import {
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Stack,
  Typography,
} from "@mui/material";
import { AddRounded } from "@mui/icons-material";

const WidgetTypeList = [
  {
    id: 1,
    label: "Details Chart",
    inset: false, // makes text have extra spacing infront
  },
  {
    id: 2,
    label: "Invoice Details",
    inset: false,
  },
  {
    id: 3,
    label: "Invoice Demographics",
    inset: false,
  },
];

export default function AddWidget() {
  return (
    <Stack sx={{ minWidth: "12rem", padding: "1rem" }}>
      <Typography> Add Widget</Typography>
      <Divider />
      <MenuList dense>
        {WidgetTypeList.map((widgetType) => (
          <MenuItem key={widgetType.id}>
            <ListItemIcon>
              <AddRounded />
            </ListItemIcon>
            <ListItemText inset={widgetType.inset}>
              {widgetType.label}
            </ListItemText>
          </MenuItem>
        ))}
      </MenuList>
    </Stack>
  );
}
