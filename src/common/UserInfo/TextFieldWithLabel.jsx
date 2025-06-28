import { Stack, TextField, Tooltip, Typography } from "@mui/material";

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
  isDisabled = false,
  labelIcon = null,
  labelIconHelper = "",
}) {
  return (
    <Stack spacing={0.5} width="100%" data-tour={dataTour}>
      <Stack direction="row" spacing={1}>
        <Typography variant="body2" fontWeight="medium">
          {label}
        </Typography>
        {labelIcon && <Tooltip title={labelIconHelper}>{labelIcon}</Tooltip>}
      </Stack>
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
        error={Boolean(errorMsg?.length)}
        helperText={errorMsg}
        disabled={isDisabled}
      />
    </Stack>
  );
}
