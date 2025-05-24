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
import { InvoicerRoutes } from "src/Routes";
import { useLocation, useNavigate } from "react-router-dom";
import validateClientPermissions, {
  isValidPermissions,
} from "src/common/ValidateClientPerms";

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

  const formattedInvoicerRoutes = (InvoicerRoutes = []) => {
    const validRouteFlags = validateClientPermissions();
    return InvoicerRoutes.map(({ id, path, label, icon, requiredFlags }) => {
      const isRequired = isValidPermissions(validRouteFlags, requiredFlags);
      if (!isRequired) return;
      return (
        <ListItemButton
          key={id}
          selected={pathname === path}
          onClick={() => handleMenuItemClick(path)}
        >
          <ListItemIcon
            sx={{ color: pathname === path && theme.palette.primary.main }}
          >
            {icon}
          </ListItemIcon>
          <ListItemText primary={label} />
        </ListItemButton>
      );
    });
  };

  return (
    <Stack>
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
          {formattedInvoicerRoutes(InvoicerRoutes)}
        </List>
      </Drawer>
    </Stack>
  );
}
