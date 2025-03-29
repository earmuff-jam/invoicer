import { ReceiptLong } from "@mui/icons-material";
import { Box, Button, Container, Grid, Typography } from "@mui/material";

export default function HeroSection() {
  return (
    <Box
      sx={{
        bgcolor: "primary.light",
        color: "primary.contrastText",
        pt: { xs: 8, sm: 12, md: 16 },
        pb: { xs: 8, sm: 12, md: 16 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="h2"
              component="h1"
              fontWeight="bold"
              gutterBottom
            >
              Simple. Powerful. Professional.
            </Typography>
            <Typography variant="h5">
              Create and manage invoices in seconds. No complexity, just
              results.
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Button variant="contained" size="large">
                Take me there
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sx={{ position: "relative" }}>
            
            <Box
              sx={{
                width: "100%",
                height: { xs: "300px", sm: "400px", md: "480px" },
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: 8,
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box sx={{ p: 3, textAlign: "center" }}>
                <ReceiptLong
                  sx={{ fontSize: 80, color: "primary.main", mb: 2 }}
                />
                <Typography variant="h6" color="text.primary">
                  Invoicer App.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
