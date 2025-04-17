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
  Typography,
} from "@mui/material";

import { useTheme } from "@emotion/react";
import { useLocation, useNavigate } from "react-router-dom";
import { NAVIGATION_LIST } from "src/features/Layout/constants";

export default function NavBar({
  openDrawer,
  handleDrawerClose,
  smScreenSizeAndHigher,
  lgScreenSizeAndHigher,
}) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // the timeout allows to close the drawer first before navigation occurs.
  // Without this, the drawer behaves weird.
  const handleMenuItemClick = (to) => {
    !lgScreenSizeAndHigher && handleDrawerClose();
    setTimeout(() => {
      navigate(to);
    }, 200);
  };

  return (
    <Stack display="flex">
      <Drawer
        variant="persistent"
        open={openDrawer}
        onClose={handleDrawerClose}
        aria-modal="true"
        PaperProps={
          smScreenSizeAndHigher
            ? {
                sx: {
                  width: 300,
                  flexShrink: 0,
                  [`& .MuiDrawer-paper`]: {
                    width: 300,
                    boxSizing: "border-box",
                  },
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
          data-tour="view-pdf-4"
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
          data-tour="view-pdf-5"
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
