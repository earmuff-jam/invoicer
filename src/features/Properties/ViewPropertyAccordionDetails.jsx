import {
  CheckCircleOutlineRounded,
  EmailRounded,
  ExpandMoreRounded,
  MoneyOffCsredRounded,
  PaidRounded,
} from "@mui/icons-material";

import {
  Avatar,
  Chip,
  Paper,
  Box,
  Tooltip,
  IconButton,
  Typography,
  Stack,
  Skeleton,
} from "@mui/material";

import dayjs from "dayjs";
import { useState } from "react";
import AButton from "common/AButton";
import { useNavigate } from "react-router-dom";

import EmptyComponent from "common/EmptyComponent";
import { updateDateTime } from "features/Properties/utils";
import QuickConnectMenu from "features/Properties/QuickConnectMenu";
import { handleQuickConnectAction } from "features/Settings/TemplateProcessor";

import { useGetTenantByPropertyIdQuery } from "features/Api/tenantsApi";

const ViewPropertyAccordionDetails = ({ property }) => {
  const navigate = useNavigate();

  const { data: tenants = [], isLoading } = useGetTenantByPropertyIdQuery(
    property?.id,
    {
      skip: !property?.id,
    }
  );

  const [anchorEl, setAnchorEl] = useState(null);

  const isOpen = Boolean(anchorEl);
  const primaryTenantDetails = tenants.find((tenant) => tenant.isPrimary);

  const handleCloseQuickConnect = () => setAnchorEl(null);
  const handleOpenQuickConnect = (ev) => setAnchorEl(ev.currentTarget);
  const handleQuickConnectMenuItem = (action, property) => {
    switch (action) {
      case "CREATE_INVOICE": {
        navigate("/invoice/edit");
        break;
      }
    }

    // fetch templates from the db
    const savedTemplates = JSON.parse(
      localStorage.getItem("email_templates") || "{}"
    );

    // Merge with default templates
    const templates = {
      invoice: {
        subject:
          savedTemplates.invoice?.subject ||
          "Monthly Rent Invoice - {{propertyAddress}}",
        body:
          savedTemplates.invoice?.body ||
          "Dear {{tenantName}},\n\nPlease find attached your rent invoice for {{month}} {{year}}.\n\nAmount Due: ${{amount}}\nDue Date: {{dueDate}}\n\nThank you,\n{{ownerName}}",
      },
      reminder: {
        subject:
          savedTemplates.reminder?.subject ||
          "Payment Reminder - {{propertyAddress}}",
        body:
          savedTemplates.reminder?.body ||
          "Dear {{tenantName}},\n\nYour rent payment of ${{amount}} was due on {{dueDate}}.\n\nPlease submit payment promptly.\n\nBest regards,\n{{ownerName}}",
      },
      // ... other templates
    };

    handleQuickConnectAction(action, property, tenants, templates);
  };

  if (isLoading) return <Skeleton height="10rem" />;

  if (!tenants || tenants.length === 0) {
    return <EmptyComponent caption="Add tenants to begin." />;
  }

  const isLate =
    dayjs().isAfter(dayjs(primaryTenantDetails.dueDate)) &&
    !primaryTenantDetails.isPaid;
  const statusColor = primaryTenantDetails.isPaid
    ? "success"
    : isLate
    ? "error"
    : "warning";
  const statusLabel = primaryTenantDetails.isPaid
    ? "Paid"
    : isLate
    ? "Overdue"
    : "Unpaid";

  return (
    <Stack spacing={2}>
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          borderRadius: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {/* LEFT SECTION */}
        <Stack direction="row" spacing={2} flexWrap="wrap" flex={1}>
          <Avatar sx={{ bgcolor: "primary.main", mt: 0.5 }}>
            {primaryTenantDetails?.first_name ||
              primaryTenantDetails?.googleDisplayName ||
              "U"}
          </Avatar>
          <Stack flexGrow={1}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography
                variant="subtitle1"
                fontWeight={600}
                sx={{ textTransform: "initial" }}
              >
                {primaryTenantDetails?.first_name ||
                  primaryTenantDetails?.googleDisplayName ||
                  primaryTenantDetails?.email}
              </Typography>
              <Tooltip title="Primary point of contact">
                <CheckCircleOutlineRounded color="primary" fontSize="small" />
              </Tooltip>
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              justifyContent="space-around"
              padding={1}
            >
              <Stack textAlign="center">
                <Typography
                  variant="subtitle2"
                  fontSize="1.875rem"
                  color="primary"
                >
                  ${primaryTenantDetails?.rent}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Monthly Rent
                </Typography>
              </Stack>
              <Stack textAlign="center">
                <Typography variant="subtitle2" fontSize="2rem" color="primary">
                  {dayjs(
                    updateDateTime(
                      dayjs(primaryTenantDetails?.start_date || "")
                    )
                  ).format("MMM DD")}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Next payment due date
                </Typography>
              </Stack>
            </Stack>

            <Box>
              <Chip
                icon={
                  primaryTenantDetails?.isPaid ? (
                    <PaidRounded />
                  ) : (
                    <MoneyOffCsredRounded />
                  )
                }
                label={statusLabel}
                size="small"
                color={statusColor}
                sx={{ mt: 1 }}
              />
            </Box>
          </Stack>
        </Stack>

        {/* RIGHT SECTION */}
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          minWidth={180}
          mt={{ xs: 2, sm: 0 }}
          justifyContent="flex-end"
        >
          <Stack spacing={2}>
            <Stack direction="row" spacing={1}>
              <Typography
                flexGrow={1}
                variant="body2"
                color="primary"
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  alignContent: "center",
                  textOverflow: "ellipsis",
                  maxWidth: 150,
                  textTransform: "initial",
                }}
              >
                {primaryTenantDetails?.phone}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1}>
              <Typography
                flexGrow={1}
                variant="body2"
                color="primary"
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  alignContent: "center",
                  textOverflow: "ellipsis",
                  maxWidth: 150,
                  textTransform: "initial",
                }}
              >
                {primaryTenantDetails?.email}
              </Typography>
              <Tooltip title="Send Email">
                <IconButton
                  size="small"
                  href={`mailto:${primaryTenantDetails?.email}`}
                  target="_blank"
                >
                  <EmailRounded fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
            <AButton
              label="Quick Connect"
              disabled={tenants?.length <= 0}
              onClick={(e) => {
                e.stopPropagation();
                handleOpenQuickConnect(e);
              }}
              size="small"
              variant="contained"
              endIcon={<ExpandMoreRounded />}
            />
            <QuickConnectMenu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleCloseQuickConnect}
              property={property}
              onMenuItemClick={handleQuickConnectMenuItem}
              openMaintenanceForm={(o) => o}
              openNoticeComposer={(o) => o}
            />
          </Stack>
        </Box>
      </Paper>
    </Stack>
  );
};

export default ViewPropertyAccordionDetails;
