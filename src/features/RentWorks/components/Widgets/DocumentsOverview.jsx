import { Card, CardContent, Skeleton, Stack } from "@mui/material";
import RowHeader from "common/RowHeader/RowHeader";
import ViewDocuments from "features/RentWorks/components/Widgets/ViewDocuments";

export default function DocumentsOverview({ isPropertyLoading }) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <RowHeader
          title="Documents Overview"
          caption="View list of your documents assoicated with this property"
          sxProps={{ textAlign: "left", color: "text.secondary" }}
        />
        <Stack spacing={2}>
          {isPropertyLoading ? <Skeleton height="5rem" /> : <ViewDocuments />}
        </Stack>
      </CardContent>
    </Card>
  );
}
