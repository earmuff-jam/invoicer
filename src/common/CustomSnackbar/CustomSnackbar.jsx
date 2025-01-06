import { Alert, Snackbar, Typography } from "@mui/material";

function CustomSnackbar({
  showSnackbar,
  setShowSnackbar,
  title,
  caption,
  onClick,
}) {
  return (
    <Snackbar
      open={showSnackbar}
      autoHideDuration={3000}
      onClose={() => setShowSnackbar(false)}
    >
      <Alert
        onClose={() => setShowSnackbar(false)}
        severity="success"
        variant="filled"
        onClick={onClick}
        sx={{ width: "100%", cursor: "pointer" }}
      >
        <Typography variant="caption">{title}</Typography>
        <Typography variant="caption"> {caption}</Typography>
      </Alert>
    </Snackbar>
  );
}

export default CustomSnackbar;
