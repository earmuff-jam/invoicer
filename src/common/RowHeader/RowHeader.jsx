import { Stack, Typography } from "@mui/material";
import dayjs from "dayjs";

/**
 * RowHeader
 *
 * used to build out header components
 *
 * @param {string} title - The header title
 * @param {string} caption - The caption for the title
 * @param {boolean} showDate - The true or false value to display date
 * @param {dayjs} createdDate - The date value of the created timestamp
 * @param {Object} sxProps - Additional wrapper styles based on parent components
 *
 */
export default function RowHeader({
  title,
  caption,
  showDate = false,
  createdDate = dayjs().format("DD-MM-YYYY"),
  sxProps,
}) {
  return (
    <>
      <Stack textAlign="center" {...sxProps}>
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
