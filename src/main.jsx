import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline, Dialog, ThemeProvider } from "@mui/material";
import "./main.css";
import App from "./App";
import { lightTheme } from "common/Theme";
import { Provider } from "react-redux";
import { store } from "./store";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Suspense fallback={<Dialog open={false} title="Loading..." />}>
        <App />
      </Suspense>
    </ThemeProvider>
  </Provider>
);
