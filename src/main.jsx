import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline, Dialog, ThemeProvider } from "@mui/material";

import { GeneratedTourSteps } from "src/common/TourSteps";

import "./main.css";
import App from "./App";
import { lightTheme } from "common/Theme";
import { TourProvider } from "@reactour/tour";

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={lightTheme}>
    <Suspense fallback={<Dialog open={false} title="Loading..." />}>
      <TourProvider steps={GeneratedTourSteps}>
        <CssBaseline />
        <App />
      </TourProvider>
    </Suspense>
  </ThemeProvider>
);
