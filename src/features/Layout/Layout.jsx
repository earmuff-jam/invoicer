import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  CssBaseline,
  IconButton,
  Skeleton,
  Stack,
  ThemeProvider,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { MenuOutlined } from "@mui/icons-material";

import { useTheme } from "@emotion/react";
import { Outlet } from "react-router-dom";
import { Suspense, useState } from "react";
import { lightTheme } from "../../common/Theme";
import Content from "./Content";

export default function Layout() {
  const theme = useTheme();
  const onlySmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerOpen = () => setOpenDrawer(true);
  const handleDrawerClose = () => setOpenDrawer(false);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Suspense
        fallback={
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
          >
            <CircularProgress color="inherit" />
          </Box>
        }
      >
        <AppBar elevation={0}>
          <Toolbar>
            <IconButton onClick={handleDrawerOpen}>
              <MenuOutlined />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Invoicer
            </Typography>
            <Button variant="contained"> Print PDF </Button>
          </Toolbar>
        </AppBar>
        <Stack direction="row" spacing="1rem" sx={{ mt: "5rem" }}>
          <Content
            openDrawer={openDrawer}
            handleDrawerClose={handleDrawerClose}
          />
          <Stack sx={{ py: "1rem", flexGrow: 1 }}>
            <Outlet />
          </Stack>
        </Stack>
      </Suspense>
    </ThemeProvider>
  );
}
