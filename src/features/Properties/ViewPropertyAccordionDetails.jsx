import {
  EmailRounded,
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
} from "@mui/material";

import dayjs from "dayjs";
import EmptyComponent from "src/common/EmptyComponent";

const ViewPropertyAccordionDetails = ({ tenants }) => {
  if (!tenants || tenants.length === 0) {
    return <EmptyComponent caption="Add tenants to begin." />;
  }

  return (
    <Stack spacing={2}>
      {tenants.map((tenant) => {
        const isLate = dayjs().isAfter(dayjs(tenant.dueDate)) && !tenant.isPaid;
        const statusColor = tenant.isPaid
          ? "success"
          : isLate
          ? "error"
          : "warning";
        const statusLabel = tenant.isPaid
          ? "Paid"
          : isLate
          ? "Overdue"
          : "Unpaid";

        return (
          <Paper
            key={tenant.id}
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
                {tenant.name[0]}
              </Avatar>
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>
                  {tenant.name}
                </Typography>

                <Typography variant="body2" mt={0.5}>
                  💵 Rent: <strong>${tenant.monthlyRent}</strong>
                </Typography>

                <Typography variant="body2">
                  📅 Due:{" "}
                  <strong>{dayjs(tenant.dueDate).format("MMM D, YYYY")}</strong>
                </Typography>

                <Typography variant="body2">
                  🧾 Last Paid:{" "}
                  <strong>
                    {tenant.lastPaidDate
                      ? dayjs(tenant.lastPaidDate).format("MMM D, YYYY")
                      : "N/A"}
                  </strong>
                </Typography>

                <Chip
                  icon={
                    tenant.isPaid ? <PaidRounded /> : <MoneyOffCsredRounded />
                  }
                  label={statusLabel}
                  size="small"
                  color={statusColor}
                  sx={{ mt: 1 }}
                />
              </Box>
            </Stack>

            {/* RIGHT SECTION - EMAIL */}
            <Box
              display="flex"
              alignItems="center"
              gap={1}
              minWidth={180}
              mt={{ xs: 2, sm: 0 }}
              justifyContent="flex-end"
            >
              <Stack>
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
                    {tenant.phone}
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
                    {tenant.email}
                  </Typography>
                  <Tooltip title="Send Email">
                    <IconButton
                      size="small"
                      href={`mailto:${tenant.email}`}
                      target="_blank"
                    >
                      <EmailRounded fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Stack>
            </Box>
          </Paper>
        );
      })}
    </Stack>
  );
};

export default ViewPropertyAccordionDetails;
