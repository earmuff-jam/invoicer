import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { TourProvider } from "@reactour/tour";
import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ScrollTopProvider from "src/common/ScrollTop/ScrollTopProvider";
import { darkTheme, lightTheme } from "src/common/Theme";
import { GeneratedTourSteps } from "src/common/Tour/TourSteps";
import { buildAppRoutes } from "src/common/ValidateClientPerms";
import Layout from "src/features/Layout/Layout";
import { InvoicerRoutes } from "src/Routes";

function App() {
  const [currentThemeIdx, setCurrentThemeIdx] = useState(
    localStorage.getItem("theme") || 0
  );

  return (
    <ThemeProvider
      theme={Number(currentThemeIdx) === 0 ? lightTheme : darkTheme}
    >
      <CssBaseline />
      <TourProvider steps={GeneratedTourSteps}>
        <ScrollTopProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <Layout
                    currentThemeIdx={currentThemeIdx}
                    setCurrentThemeIdx={setCurrentThemeIdx}
                  />
                }
              >
                {buildAppRoutes(InvoicerRoutes)}
              </Route>
              {/* force navigate to main page when routes are not found */}
              <Route path="/*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </ScrollTopProvider>
      </TourProvider>
    </ThemeProvider>
  );
}

export default App;
