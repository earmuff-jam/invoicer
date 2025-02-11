import { FlightTakeoffRounded } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const handleNavigate = () => navigate("/view");

  return (
    <Stack spacing={1} textAlign="center">
      <Typography sx={{ fontSize: "4rem" }}> Invoicer. </Typography>
      <Typography>
        Build your invoices with ease. No login or signup required.
      </Typography>
      <Box sx={{padding: '2rem 0rem'}}>
        <Button
          variant="contained"
          startIcon={<FlightTakeoffRounded />}
          onClick={handleNavigate}
        >
          Take me there !
        </Button>
      </Box>
    </Stack>
  );
}
