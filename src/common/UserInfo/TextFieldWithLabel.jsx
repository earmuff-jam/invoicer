import { Stack, TextField, Typography } from "@mui/material";

export default function TextFieldWithLabel({
  label,
  id,
  name,
  placeholder,
  value,
  handleChange,
  errorMsg,
  multiline = false,
  maxRows = 0,
}) {
  return (
    <Stack spacing={0.5} width="100%">
      <Typography variant="body2" fontWeight="medium" sx={{ color: "#555" }}>
        {label}
      </Typography>
      <TextField
        fullWidth
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        variant="outlined"
        size="small"
        multiline={multiline}
        rows={maxRows}
        sx={{
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
        }}
        error={Boolean(errorMsg.length)}
        helperText={errorMsg}
      />
    </Stack>
  );
}
