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
import { WidgetTypeList } from "src/features/Dashboard/constants";

export default function AddWidget({ handleAddWidget }) {
  return (
    <Stack sx={{ minWidth: "12rem", padding: "1rem" }}>
      <Typography> Add Widget</Typography>
      <Divider />
      <MenuList dense>
        {WidgetTypeList.map((widgetType) => (
          <MenuItem
            key={widgetType.id}
            onClick={() => handleAddWidget(widgetType.id)}
          >
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
