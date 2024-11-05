import { ChevronLeftRounded, ChevronRightRounded } from "@mui/icons-material";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Drawer,
  IconButton,
  Divider,
  useMediaQuery,
  Typography,
} from "@mui/material";

import { useTheme } from "@emotion/react";
import { NAVIGATION_LIST } from "./constants";
import { useLocation, useNavigate } from "react-router-dom";

export default function Content({ openDrawer, handleDrawerClose }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const smallerAndHigher = useMediaQuery(theme.breakpoints.up("sm"));

  // the timeout allows to close the drawer first before navigation occurs.
  // Without this, the drawer behaves weird.
  const handleMenuItemClick = (to) => {
    handleDrawerClose();
    setTimeout(() => {
      navigate(to);
    }, 200);
  };

  return (
    <Stack display="flex">
      <Drawer
        variant="temporary"
        open={openDrawer}
        onClose={handleDrawerClose}
        aria-modal="true"
        PaperProps={
          smallerAndHigher
            ? {
                sx: {
                  width: 300,
                },
              }
            : {
                sx: {
                  width: "100%",
                },
              }
        }
      >
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem",
          }}
        >
          <Typography variant="h5">Invoicer</Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightRounded />
            ) : (
              <ChevronLeftRounded />
            )}
          </IconButton>
        </Stack>
        <Divider />
        <List
          sx={{ width: "100%" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          {NAVIGATION_LIST.map((v) => (
            <ListItemButton
              key={v.id}
              selected={pathname === v.to}
              onClick={() => handleMenuItemClick(v.to)}
            >
              <ListItemIcon
                sx={{ color: pathname === v.to && theme.palette.primary.main }}
              >
                {v.icon}
              </ListItemIcon>
              <ListItemText primary={v.label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </Stack>
  );
}
