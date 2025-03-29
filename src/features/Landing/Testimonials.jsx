import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "This invoicing app has transformed how I manage my freelance business. I save hours every week on invoicing tasks.",
      author: "Sarah J., Graphic Designer",
    },
    {
      quote:
        "The simplicity of this app is its greatest strength. I was able to send my first invoice within minutes of signing up.",
      author: "Mark T., Consultant",
    },
    {
      quote:
        "After trying several invoicing solutions, this is the only one that perfectly balances features with ease of use.",
      author: "Elena M., Marketing Agency",
    },
  ];

  return (
    <Box
      sx={{
        py: { xs: 8, sm: 12 },
        bgcolor: "primary.light",
        color: "primary.contrastText",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
        >
          What Our Users Say
        </Typography>
        <Typography
          variant="h6"
          align="center"
          sx={{ mb: 8, maxWidth: "800px", mx: "auto" }}
        >
          Thousands of businesses trust our platform for their invoicing needs.
        </Typography>

        <Grid container spacing={4}>
          {testimonials.map((testimonial, idx) => (
            <Grid item xs={12} md={4} key={idx}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: 3,
                  borderRadius: 2,
                  p: 2,
                }}
              >
                <CardContent
                  sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
                >
                  <Typography
                    variant="h1"
                    sx={{
                      color: "primary.light",
                      fontSize: "60px",
                      height: "40px",
                      mb: 2,
                      opacity: 0.5,
                    }}
                  >
                    &quot;
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ flexGrow: 1, fontStyle: "italic" }}
                  >
                    {testimonial.quote}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    fontWeight="bold"
                  >
                    {testimonial.author}
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
