import React from "react";
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  ReceiptLongRounded,
  NotificationsRounded,
  BuildRounded,
  CampaignRounded,
} from "@mui/icons-material";

export default function QuickConnectMenu({
  anchorEl,
  open,
  onClose,
  property,
  onMenuItemClick,
}) {
  const handleMenuItemClick = (action) => {
    onMenuItemClick?.(action, property);
    onClose();
  };

  const menuItems = [
    {
      id: "invoice",
      label: "Create/Send Invoice",
      icon: <ReceiptLongRounded fontSize="small" />,
      action: "CREATE_INVOICE",
    },
    {
      id: "payment-reminder",
      label: "Send Payment Reminder",
      icon: <NotificationsRounded fontSize="small" />,
      action: "PAYMENT_REMINDER",
    },
    {
      id: "maintenance-request",
      label: "Send Maintenance Form",
      icon: <BuildRounded fontSize="small" />,
      action: "MAINTENANCE_REQUEST",
    },
    {
      id: "general-notice",
      label: "Send General Notice",
      icon: <CampaignRounded fontSize="small" />,
      action: "GENERAL_NOTICE",
    },
  ];

  return (
    <Menu
      id="quick-connect-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          elevation: 3,
          sx: {
            minWidth: 220,
            mt: 1,
          },
        },
        list: {
          "aria-labelledby": "quick-connect-button",
        },
      }}
    >
      {menuItems.map((item, index) => (
        <React.Fragment key={item.id}>
          <MenuItem
            onClick={() => handleMenuItemClick(item.action)}
            sx={{ py: 1 }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText
              primary={item.label}
              slotProps={{
                primary: {
                  fontSize: 14,
                  fontWeight: 500,
                },
              }}
            />
          </MenuItem>
          {index < menuItems.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </Menu>
  );
}
