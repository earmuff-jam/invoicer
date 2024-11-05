import { Stack, Typography } from "@mui/material";
import dayjs from "dayjs";

export default function RowHeader({
  title,
  caption,
  showDate = false,
  createdDate = dayjs().format("DD-MM-YYYY"),
}) {
  return (
    <>
      <Stack textAlign="center">
        <Typography variant="h5" fontWeight="medium" sx={{ color: "#555" }}>
          {title}
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "#666" }}>
          {caption}
        </Typography>
      </Stack>
      {showDate && (
        <Typography
          variant="subtitle2"
          fontStyle={"italic"}
          sx={{ color: "#666" }}
          textAlign={"right"}
        >
          Created on {createdDate}
        </Typography>
      )}
    </>
  );
}
