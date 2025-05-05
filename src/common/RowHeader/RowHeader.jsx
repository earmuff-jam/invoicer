import { Box, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";

/**
 * RowHeader
 *
 * used to build out header components with custom css decorators. Some css decorators bleed into title variants.
 * Eg, fontWeight is overridden in a few places with this feature.
 *
 * @param {string} title - The header title
 * @param {string} caption - The caption for the title
 * @param {boolean} showDate - The true or false value to display date
 * @param {dayjs} createdDate - The date value of the created timestamp
 * @param {Object} sxProps - Additional wrapper styles based on parent components.
 * @param {Object} children - Can include jsx components to add more data / details to the RowHeader Component.
 *
 */
export default function RowHeader({
  title,
  caption,
  showDate = false,
  createdDate = dayjs().format("DD-MM-YYYY"),
  sxProps,
  children,
}) {
  return (
    <>
      <Stack textAlign="center" {...sxProps} alignContent="center">
        <Typography variant="h5" fontWeight="medium" {...sxProps}>
          {title}
        </Typography>
        <Typography variant="subtitle2" sx={{ textTransform: "initial" }}>
          {caption}
        </Typography>
        <Box sx={{ alignSelf: "flex-end" }}>{children}</Box>
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
