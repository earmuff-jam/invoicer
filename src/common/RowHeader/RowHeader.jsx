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
        <Typography variant="h5" fontWeight="medium">
          {title}
        </Typography>
        <Typography variant="subtitle2">{caption}</Typography>
      </Stack>
      {showDate && (
        <Typography
          variant="subtitle2"
          fontStyle={"italic"}
          textAlign={"right"}
        >
          Created on {createdDate}
        </Typography>
      )}
    </>
  );
}
