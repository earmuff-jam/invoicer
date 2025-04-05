import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import {
  ReceiptLong,
  Payment,
  AccessTime,
  CloudDownload,
} from "@mui/icons-material";

export default function FeatureSection() {
  const features = [
    {
      icon: <ReceiptLong color="primary" sx={{ fontSize: 40 }} />,
      title: "Simple Invoice Creation",
      description:
        "Create professional invoices in seconds with our intuitive interface.",
    },
    {
      icon: <Payment color="primary" sx={{ fontSize: 40 }} />,
      title: "Secure Payment Processing",
      description:
        "Accept payments directly through invoices with full encryption and security.",
    },
    {
      icon: <AccessTime color="primary" sx={{ fontSize: 40 }} />,
      title: "Time-Saving Templates",
      description:
        "Save hours with customizable templates for recurring invoices.",
    },
    {
      icon: <CloudDownload color="primary" sx={{ fontSize: 40 }} />,
      title: "Easy Exports",
      description:
        "Export invoices in multiple formats for accounting and record keeping.",
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
          Features Designed for Efficiency
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          sx={{ mb: 8, maxWidth: "800px", mx: "auto" }}
        >
          Our invoicing application focuses on what matters: getting you paid
          faster with minimal effort.
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Card
                sx={{
                  height: "100%",
                  boxShadow: 3,
                  transition: "0.3s",
                  "&:hover": { transform: "translateY(-8px)", boxShadow: 6 },
                }}
              >
                <CardContent sx={{ textAlign: "center", p: 4 }}>
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography
                    variant="h6"
                    component="h3"
                    gutterBottom
                  >
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
