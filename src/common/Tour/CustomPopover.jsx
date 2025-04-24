import { Box, useTheme } from "@mui/material";

export default function CustomPopover({ content }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        color: theme.palette.text.secondary,
        borderRadius: "12px",
        padding: "0.5rem",
        maxWidth: "300px",
      }}
    >
      <Box>{content}</Box>
    </Box>
  );
}
