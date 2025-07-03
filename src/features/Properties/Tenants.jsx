import { useState } from "react";

import {
  Box,
  Avatar,
  Typography,
  Chip,
  Card,
  CardContent,
  Paper,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";

import {
  CalendarTodayRounded,
  PersonRounded,
  RemoveCircleOutlineRounded,
} from "@mui/icons-material";

import dayjs from "dayjs";
import { fetchLoggedInUser, formatCurrency } from "features/Properties/utils";
import CustomSnackbar from "common/CustomSnackbar/CustomSnackbar";

import { useDeleteTenantByIdMutation } from "features/Api/tenantsApi";
import { useUpdatePropertyByIdMutation } from "src/features/Api/propertiesApi";

export default function Tenants({ tenants = [], property }) {
  const user = fetchLoggedInUser();
  const [deleteTenant] = useDeleteTenantByIdMutation();
  const [updateProperty] = useUpdatePropertyByIdMutation();

  const [showSnackbar, setShowSnackbar] = useState(false);

  const sortedByPrimaryStatus = (arr) => {
    return [...arr].sort((a, b) => b.isPrimary - a.isPrimary);
  };

  const handleRemoveAssociatedTenant = async (ev, tenant) => {
    ev.preventDefault();

    if (!tenant?.id) return;

    const filteredRentees = property?.rentees.filter(
      (rentee) => rentee !== tenant.email
    );

    await deleteTenant(tenant?.id);
    await updateProperty({
      id: property?.id,
      rentees: filteredRentees,
      updatedBy: user?.uid,
      updatedOn: dayjs().toISOString(),
    });

    setShowSnackbar(true);
  };

  return (
    <Stack spacing={1} maxHeight="22rem" overflow="auto">
      {sortedByPrimaryStatus(tenants)?.map((tenant) => (
        <Stack key={tenant?.id}>
          <Card sx={{ width: "100%" }}>
            <CardContent sx={{ p: 3 }}>
              {/* Header with Avatar and Primary Badge */}
              <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2.5 }}>
                <Avatar
                  sx={{
                    bgcolor: "primary.main",
                    width: 48,
                    height: 48,
                  }}
                >
                  {tenant.email.charAt(0).toUpperCase()}
                </Avatar>
                <Box sx={{ ml: 2, flex: 1 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ textTransform: "initial" }}
                  >
                    {tenant.email}
                  </Typography>
                  {tenant.isPrimary && (
                    <Chip
                      label="Primary"
                      size="small"
                      color="primary"
                      sx={{
                        height: 24,
                        fontSize: "0.75rem",
                        fontWeight: 500,
                      }}
                    />
                  )}
                </Box>
                <Tooltip title="Remove tenant from property">
                  <IconButton
                    size="small"
                    onClick={(ev) => handleRemoveAssociatedTenant(ev, tenant)}
                  >
                    <RemoveCircleOutlineRounded
                      fontSize="small"
                      color="error"
                    />
                  </IconButton>
                </Tooltip>
              </Box>

              {/* Rent Highlight */}
              <Paper
                elevation={0}
                sx={{
                  padding: "1rem",
                  bgcolor: "background.default",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                    justifyContent: "space-around",
                  }}
                >
                  {tenant?.isPrimary ? (
                    <Stack>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontSize: "2rem" }}
                        color="textSecondary"
                      >
                        {formatCurrency(
                          Number(tenant?.rent || 0) +
                            Number(property?.additional_rent || 0)
                        )}
                      </Typography>

                      <Typography variant="subtitle2" color="textSecondary">
                        Monthly Rent
                      </Typography>
                    </Stack>
                  ) : null}
                  <Stack>
                    <Box>
                      <CalendarTodayRounded fontSize="small" />
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      LEASE TERM
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      {tenant.term}
                    </Typography>
                  </Stack>
                  <Stack>
                    <Box>
                      <PersonRounded fontSize="small" />
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      START DATE
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      {dayjs(tenant?.start_date).format("MMM DD, YYYY")}
                    </Typography>
                  </Stack>
                </Box>
              </Paper>
            </CardContent>
          </Card>
        </Stack>
      ))}

      <CustomSnackbar
        showSnackbar={showSnackbar}
        setShowSnackbar={setShowSnackbar}
        title="Changes saved."
      />
    </Stack>
  );
}
