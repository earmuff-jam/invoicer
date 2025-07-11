import { Card, CardContent, Skeleton, Stack } from "@mui/material";
import RowHeader from "common/RowHeader/RowHeader";
import { useGetRentsByPropertyIdQuery } from "features/Api/rentApi";
import ViewRentalPaymentSummary from "features/RentWorks/components/Widgets/ViewRentalPaymentSummary";

export default function RentalPaymentOverview({ propertyId }) {
  const { data: rentList = [], isLoading: isRentListForPropertyLoading } =
    useGetRentsByPropertyIdQuery(propertyId, {
      skip: !propertyId,
    });

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <RowHeader
          title="Payments Overview"
          caption="View list of all payment summaries for this property"
          sxProps={{ textAlign: "left", color: "text.secondary" }}
        />
        <Stack spacing={2}>
          {isRentListForPropertyLoading ? (
            <Skeleton height="5rem" />
          ) : (
            <ViewRentalPaymentSummary rentData={rentList} />
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
