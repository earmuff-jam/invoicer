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
  dataTour,
}) {
  return (
    <Stack spacing={0.5} width="100%" data-tour={dataTour}>
      <Typography variant="body2" fontWeight="medium">
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
        error={Boolean(errorMsg.length)}
        helperText={errorMsg}
      />
    </Stack>
  );
}
