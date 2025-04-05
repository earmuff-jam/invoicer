import React, { Suspense, useState } from "react";

import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
  Stack,
  ThemeProvider,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import Content from "src/features/Layout/Content";
import Footer from "src/features/Footer/Footer";
import { MenuOutlined } from "@mui/icons-material";
import { Outlet, useLocation } from "react-router-dom";
import { darkTheme, lightTheme } from "src/common/Theme";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Layout() {
  const theme = useTheme();
  const location = useLocation();

  const smScreenSizeAndHigher = useMediaQuery(theme.breakpoints.up("sm"));
  const lgScreenSizeAndHigher = useMediaQuery(theme.breakpoints.up("lg"));

  const [openDialog, setOpenDialog] = useState(false);

  const [currentThemeIdx, setCurrentThemeIdx] = useState(
    localStorage.getItem("theme") || 0
  );

  const [openDrawer, setOpenDrawer] = useState(
    smScreenSizeAndHigher ? true : false
  );

  const handleDrawerOpen = () => setOpenDrawer(true);
  const handleDrawerClose = () => setOpenDrawer(false);

  const showExportAndPrint = location?.pathname === "/view";

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
        <AppBar elevation={0} sx={{ padding: "0.25rem 0rem" }}>
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
                  onClick={() => {
                    setOpenDialog(true);
                    handleDrawerClose();
                  }}
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
        <Stack
          sx={{
            marginTop: "5rem",
            marginBottom: "1rem",
            py: 2,
            flexGrow: 1,
          }}
        >
          <Content
            openDrawer={openDrawer}
            handleDrawerClose={handleDrawerClose}
            smScreenSizeAndHigher={smScreenSizeAndHigher}
            lgScreenSizeAndHigher={lgScreenSizeAndHigher}
          />
          <Box
            sx={{
              transition: "margin-left 0.3s ease",
              marginLeft: openDrawer && lgScreenSizeAndHigher ? "300px" : "0px",
              width:
                openDrawer && lgScreenSizeAndHigher
                  ? "calc(100% - 300px)"
                  : "100%",
              padding: "0rem 1rem",
            }}
          >
            <Box sx={{ minHeight: "90vh" }}>
              <Outlet />
            </Box>
            <Footer />
          </Box>
        </Stack>
        <Dialog
          className="no-print"
          open={openDialog}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => setOpenDialog(false)}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>Verify Information</DialogTitle>
          <DialogContent>
            <Typography sx={{ textTransform: "initial" }}>
              Verify all information is correct before proceeding to print.
              Press print when ready.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpenDialog(false);
                print();
              }}
            >
              Print
            </Button>
            <Button variant="contained" onClick={() => setOpenDialog(false)}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Suspense>
    </ThemeProvider>
  );
}
