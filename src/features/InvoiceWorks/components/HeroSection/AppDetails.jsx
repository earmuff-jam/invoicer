import { Stack, Typography } from "@mui/material";

export default function AppDetails() {
  return (
    <Stack textAlign="center">
      <Typography variant="h4" fontWeight="bold" sx={{ color: "#333" }}>
        Invoicer
      </Typography>
      <Typography variant="subtitle2" sx={{ color: "#666" }}>
        Build simple rental pdfs
      </Typography>
    </Stack>
  );
}
