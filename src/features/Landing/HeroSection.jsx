import { useNavigate } from "react-router-dom";

import { Box, Container, Grid, Stack, Typography } from "@mui/material";

import AButton from "common/AButton";
import { isUserLoggedIn } from "common/utils";
import { authenticateViaGoogle } from "features/Auth/AuthHelper";
import { useCreateUserMutation } from "features/Api/firebaseUserApi";

export default function HeroSection() {
  const navigate = useNavigate();
  const isLoggedIn = isUserLoggedIn();
  const [createUser] = useCreateUserMutation();

  // creates a user in the db
  const handleCreateUser = async (user) => {
    try {
      await createUser(user).unwrap();
    } catch (err) {
      /* eslint-disable no-console */
      console.error("Create failed:", err);
    }
  };

  const handleGoogleAuthentication = async () => {
    const userDetails = await authenticateViaGoogle();
    await handleCreateUser(userDetails);
    navigate(`/properties?refresh=${Date.now()}`); // force refresh
  };

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
            <Typography variant="h5" sx={{ textTransform: "initial" }}>
              Create and manage assets in seconds. No complexity, just results.
            </Typography>

            <Stack direction="row" spacing={1} margin="4rem 0rem">
              {!isLoggedIn && (
                <AButton
                  label="Manage Properties"
                  variant="contained"
                  size="large"
                  onClick={handleGoogleAuthentication}
                />
              )}
              <AButton
                label="Manage Invoices"
                variant="contained"
                size="large"
                onClick={() => navigate("invoice/view")}
              />
            </Stack>
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
                <img src="/logo.png" />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
