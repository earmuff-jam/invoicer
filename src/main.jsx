import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline, Dialog, ThemeProvider } from "@mui/material";
import "./main.css";
import App from "./App";
import { lightTheme } from "common/Theme";

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={lightTheme}>
    <CssBaseline />
    <Suspense fallback={<Dialog open={false} title="Loading..." />}>
      <App />
    </Suspense>
  </ThemeProvider>
);
