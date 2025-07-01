import { useEffect, useState } from "react";

import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { TourProvider } from "@reactour/tour";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Layout from "features/Layout/Layout";
import { darkTheme, lightTheme } from "common/Theme";
import { GeneratedTourSteps } from "common/Tour/TourSteps";
import { buildAppRoutes } from "common/ValidateClientPerms";
import ScrollTopProvider from "common/ScrollTop/ScrollTopProvider";

import { InvoicerRoutes } from "src/Routes";
import { fetchLoggedInUser } from "features/Properties/utils";

function App() {
  const user = fetchLoggedInUser();

  const [currentThemeIdx, setCurrentThemeIdx] = useState(
    localStorage.getItem("theme") || 0
  );

  const [appRoutes, setAppRoutes] = useState([]);

  useEffect(() => {
    const draftAppRoutes = buildAppRoutes(InvoicerRoutes, user?.role);
    setAppRoutes(draftAppRoutes);
  }, [user?.uid]);

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
                    routes={InvoicerRoutes}
                    currentThemeIdx={currentThemeIdx}
                    setCurrentThemeIdx={setCurrentThemeIdx}
                  />
                }
              >
                {appRoutes}
              </Route>
              {/* force navigate to main page when routes are not found but wait until we have routes built first; prevents redirect in refresh */}
              {appRoutes.length > 0 && (
                <Route path="/*" element={<Navigate to="/" replace />} />
              )}
            </Routes>
          </BrowserRouter>
        </ScrollTopProvider>
      </TourProvider>
    </ThemeProvider>
  );
}

export default App;
