import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  CssBaseline,
  IconButton,
  Stack,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";

import { MenuOutlined } from "@mui/icons-material";

import { Suspense, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { darkTheme, lightTheme } from "../../common/Theme";
import Content from "./Content";

export default function Layout() {
  const location = useLocation();

  const [currentThemeIdx, setCurrentThemeIdx] = useState(
    localStorage.getItem("theme") || 0
  );
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerOpen = () => setOpenDrawer(true);
  const handleDrawerClose = () => setOpenDrawer(false);

  const showExportAndPrint = location?.pathname === "/view";
  const printPage = () => {
    window.print();
  };

  const changeTheme = (_, currentThemeIdx) => {
    if (Number(currentThemeIdx) === 0) {
      localStorage.setItem("theme", 1);
      setCurrentThemeIdx(1);
      return;
    }
    localStorage.setItem("theme", 0);
    setCurrentThemeIdx(0);
  };

  return (
    <ThemeProvider
      theme={Number(currentThemeIdx) === 0 ? lightTheme : darkTheme}
    >
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
            <Stack direction="row" spacing={1}>
              {showExportAndPrint ? (
                <Button
                  variant="contained"
                  onClick={printPage}
                  className="no-print"
                >
                  Print
                </Button>
              ) : null}
              <Button
                variant="outlined"
                onClick={(ev) => changeTheme(ev, currentThemeIdx)}
                className="no-print"
              >
                Change Theme
              </Button>
            </Stack>
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
