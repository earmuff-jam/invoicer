import { Stack, Typography } from "@mui/material";

export default function EmptyComponent() {
  return (
    <Stack textAlign="center" padding="2rem 0rem">
      <Typography> Sorry, no matching records found.</Typography>
    </Stack>
  );
}
