import { Box, Container, Grid, Typography } from "@mui/material";

export default function HowItWorks() {
  const steps = [
    {
      title: "Create an account",
      description: "Sign up in seconds with just your email address.",
    },
    {
      title: "Set up your business profile",
      description: "Add your logo, business details, and payment information.",
    },
    {
      title: "Create your first invoice",
      description: "Use our intuitive editor to create professional invoices.",
    },
    {
      title: "Send and get paid",
      description: "Send invoices directly to clients and track payments.",
    },
  ];

  return (
    <Box sx={{ py: { xs: 8, sm: 12 } }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          fontWeight="medium"
        >
          How It Works
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          paragraph
          sx={{ mb: 8, maxWidth: "800px", mx: "auto" }}
        >
          Get started in minutes with our simple four-step process.
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          {steps.map((step, idx) => (
            <Grid item xs={12} md={6} lg={3} key={idx}>
              <Box
                sx={{
                  textAlign: "center",
                  p: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "24px",
                    fontWeight: "bold",
                    mb: 3,
                    mx: "auto",
                  }}
                >
                  {idx + 1}
                </Box>
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  fontWeight="bold"
                >
                  {step.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {step.description}
                </Typography>

                {idx < steps.length - 1 && (
                  <Box
                    sx={{
                      display: { xs: "none", lg: "block" },
                      position: "absolute",
                      top: "30px",
                      right: "-16px",
                      width: "30px",
                      height: "2px",
                      bgcolor: "grey.300",
                      zIndex: 1,
                    }}
                  />
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
