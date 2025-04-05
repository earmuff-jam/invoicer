import { createRoot } from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";

import "./main.css";
import App from "./App";
import { lightTheme } from "common/Theme";

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={lightTheme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);
