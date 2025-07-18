import { Card, CardContent, Skeleton, Stack, Typography } from "@mui/material";
import RowHeader from "common/RowHeader/RowHeader";
import {
  derieveTotalRent,
  formatCurrency,
} from "features/RentWorks/common/utils";

export default function FinancialOverview({
  isTenantsLoading,
  property,
  tenants,
  isAnyTenantSoR,
}) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <RowHeader
          title="Financial Overview"
          caption="View your financial details about your property"
          sxProps={{ textAlign: "left", color: "text.secondary" }}
        />
        {isTenantsLoading ? (
          <Skeleton height="5rem" />
        ) : (
          <Stack spacing={2}>
            <Stack direction={{ xs: "column", sm: "row" }}>
              <Stack textAlign="center" flexGrow={1}>
                <Typography
                  variant="subtitle2"
                  color="success"
                  sx={{ fontSize: "2rem" }}
                >
                  {formatCurrency(
                    derieveTotalRent(property, tenants, isAnyTenantSoR),
                  )}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  Monthly Revenue
                </Typography>
              </Stack>
              <Stack textAlign="center" flexGrow={1}>
                <Typography
                  variant="subtitle2"
                  color="success"
                  sx={{ fontSize: "2rem" }}
                >
                  {formatCurrency(
                    derieveTotalRent(property, tenants, isAnyTenantSoR) * 12,
                  )}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  Projected Annual Revenue
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}
