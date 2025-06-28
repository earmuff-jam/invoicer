import {
  CalendarTodayRounded,
  PersonRounded,
} from "@mui/icons-material";
import {
  Box,
  Avatar,
  Typography,
  Chip,
  Card,
  CardContent,
  Paper,
  Stack,
} from "@mui/material";

export default function Tenants({ tenants = [] }) {
  const formatCurrency = (amount) => {
    return `$${parseInt(amount).toLocaleString()}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const sortedByPrimaryStatus = (arr) => {
    return [...arr].sort((a, b) => b.isPrimary - a.isPrimary);
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
                        {formatCurrency(tenant.rent)}
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
                      {formatDate(tenant.start_date)}
                    </Typography>
                  </Stack>
                </Box>
              </Paper>
            </CardContent>
          </Card>
        </Stack>
      ))}
    </Stack>
  );
}
