import React, { Suspense, useState } from "react";

import {
  Box,
  CircularProgress,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Stack,
  ThemeProvider,
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
import { useTour } from "@reactour/tour";

import {
  DefaultTourStepsMapperObj,
  GeneratedTourSteps,
} from "src/common/TourSteps";
import AppToolbar from "src/features/Layout/AppToolbar";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const defaultDialog = {
  title: "",
  label: "",
  type: "",
  display: false,
};

export default function Layout() {
  const theme = useTheme();
  const location = useLocation();

  const { setIsOpen, setCurrentStep, setSteps } = useTour();

  const currentUri = location?.pathname || "";
  const smScreenSizeAndHigher = useMediaQuery(theme.breakpoints.up("sm"));
  const lgScreenSizeAndHigher = useMediaQuery(theme.breakpoints.up("lg"));

  const [dialog, setDialog] = useState(defaultDialog);
  const [currentThemeIdx, setCurrentThemeIdx] = useState(
    localStorage.getItem("theme") || 0
  );

  const [openDrawer, setOpenDrawer] = useState(
    smScreenSizeAndHigher ? true : false
  );

  const closeDialog = () => setDialog(defaultDialog);

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
          <AppToolbar
            currentUri={currentUri}
            handleDrawerClose={() => setOpenDrawer(false)}
            handleDrawerOpen={() => setOpenDrawer(true)}
            currentThemeIdx={currentThemeIdx}
            setCurrentThemeIdx={setCurrentThemeIdx}
            setDialog={setDialog}
          />
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
              handleDrawerClose={() => setOpenDrawer(false)}
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
          {/* Dialog for help and print */}
          <Dialog
            className="no-print"
            open={dialog.type === "HELP" || dialog.type === "PRINT"}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => setDialog(defaultDialog)}
            aria-describedby="alert-dialog-slide-help-box"
          >
            <DialogTitle>{dialog.label}</DialogTitle>
            <DialogContent>
              <Typography sx={{ textTransform: "initial" }}>
                {dialog.title}
              </Typography>
            </DialogContent>
            <DialogActions>
              <AButton
                onClick={() => {
                  closeDialog();
                  dialog.type === "HELP" && setTour();
                  dialog.type === "PRINT" && print();
                }}
                className="no-print"
                label={dialog.type === "HELP" ? "Start help" : "Print"}
              />
              <AButton
                size="small"
                variant="outlined"
                onClick={closeDialog}
                className="no-print"
                label="Cancel"
              />
            </DialogActions>
          </Dialog>
        </Suspense>
      </ThemeProvider>
    </NavigationProvider>
  );
}
