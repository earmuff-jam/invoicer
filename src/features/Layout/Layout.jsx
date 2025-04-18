import React, { Suspense, useState } from "react";

import {
  AppBar,
  Box,
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

import NavBar from "src/features/Layout/NavBar";
import Footer from "src/features/Footer/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { darkTheme, lightTheme } from "src/common/Theme";
import AButton from "src/common/AButton";
import { NavigationProvider } from "src/common/ANavigation";
import { MenuOutlined, QuestionMarkRounded } from "@mui/icons-material";
import AIconButton from "src/common/AIconButton";
import { useTour } from "@reactour/tour";

import {
  DefaultTourStepsMapperObj,
  GeneratedTourSteps,
} from "src/common/TourSteps";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Layout() {
  const theme = useTheme();
  const location = useLocation();

  const { setIsOpen, setCurrentStep, setSteps } = useTour();

  const currentUri = location?.pathname || "";
  const showHelpButton = currentUri !== "/";
  const showPrintButton = currentUri === "/view";

  const smScreenSizeAndHigher = useMediaQuery(theme.breakpoints.up("sm"));
  const lgScreenSizeAndHigher = useMediaQuery(theme.breakpoints.up("lg"));

  const [dialogTitle, setDialogTitle] = useState("");
  const [openHelpDialog, setOpenHelpDialog] = useState(false);
  const [openPrintDialog, setOpenPrintDialog] = useState(false);

  const [currentThemeIdx, setCurrentThemeIdx] = useState(
    localStorage.getItem("theme") || 0
  );

  const [openDrawer, setOpenDrawer] = useState(
    smScreenSizeAndHigher ? true : false
  );

  const setTour = () => {
    const currentStep = DefaultTourStepsMapperObj[currentUri];

    const formattedDraftTourSteps = GeneratedTourSteps.slice(
      currentStep.start,
      currentStep.end
    );

    setIsOpen(true);
    setCurrentStep(0);
    setSteps(formattedDraftTourSteps);
  };

  const handleDrawerOpen = () => setOpenDrawer(true);
  const handleDrawerClose = () => setOpenDrawer(false);

  const handleHelp = () => {
    const draftDialogTitle = DefaultTourStepsMapperObj[currentUri]?.title;

    setDialogTitle(draftDialogTitle);
    setOpenHelpDialog(!openHelpDialog);
    handleDrawerOpen();
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
    <NavigationProvider>
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
                {showPrintButton ? (
                  <AButton
                    data-tour="view-pdf-1"
                    variant="contained"
                    onClick={() => {
                      setOpenPrintDialog(true);
                      handleDrawerClose();
                    }}
                    className="no-print"
                    label="Print"
                  />
                ) : null}
                <AButton
                  data-tour="view-pdf-2"
                  size="small"
                  variant="outlined"
                  onClick={(ev) => changeTheme(ev, currentThemeIdx)}
                  className="no-print"
                  label="Change Theme"
                />
                {showHelpButton && (
                  <AIconButton
                    data-tour="view-pdf-3"
                    size="small"
                    label={<QuestionMarkRounded />}
                    onClick={handleHelp}
                    className="no-print"
                  />
                )}
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
            <NavBar
              openDrawer={openDrawer}
              handleDrawerClose={handleDrawerClose}
              smScreenSizeAndHigher={smScreenSizeAndHigher}
              lgScreenSizeAndHigher={lgScreenSizeAndHigher}
            />
            <Box
              sx={{
                transition: "margin-left 0.3s ease",
                marginLeft:
                  openDrawer && lgScreenSizeAndHigher ? "300px" : "0px",
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
          {/* Dialog for help box */}
          <Dialog
            className="no-print"
            open={openHelpDialog}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => setOpenHelpDialog(false)}
            aria-describedby="alert-dialog-slide-help-box"
          >
            <DialogTitle>Help and Support</DialogTitle>
            <DialogContent>
              <Typography sx={{ textTransform: "initial" }}>
                {dialogTitle}
              </Typography>
            </DialogContent>
            <DialogActions>
              <AButton
                onClick={() => {
                  setOpenHelpDialog(!openHelpDialog);
                  setTour();
                }}
                className="no-print"
                label="Start help"
              />
              <AButton
                size="small"
                variant="outlined"
                onClick={() => setOpenHelpDialog(!openHelpDialog)}
                className="no-print"
                label="Cancel"
              />
            </DialogActions>
          </Dialog>

          {/* Dialog for print box */}
          <Dialog
            className="no-print"
            open={openPrintDialog}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => setOpenPrintDialog(false)}
            aria-describedby="alert-dialog-slide-print-box"
          >
            <DialogTitle>Verify Information</DialogTitle>
            <DialogContent>
              <Typography sx={{ textTransform: "initial" }}>
                Verify all information is correct before proceeding to print.
                Press print when ready.
              </Typography>
            </DialogContent>
            <DialogActions>
              <AButton
                onClick={() => {
                  setOpenPrintDialog(false);
                  print();
                }}
                label="Print"
              />
              <AButton
                variant="outlined"
                size="small"
                onClick={() => setOpenPrintDialog(false)}
                label="Close"
              />
            </DialogActions>
          </Dialog>
        </Suspense>
      </ThemeProvider>
    </NavigationProvider>
  );
}
