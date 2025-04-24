import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { darkTheme, lightTheme } from "src/common/Theme";
import validateClientPermissions, {
  isValidPermissions,
} from "src/common/ValidateClientPerms";
import Layout from "src/features/Layout/Layout";
import { InvoicerRoutes } from "src/Routes";

function App() {
  const [currentThemeIdx, setCurrentThemeIdx] = useState(
    localStorage.getItem("theme") || 0
  );

  const buildAppRoutes = (routes) => {
    const validRouteFlags = validateClientPermissions();

    return routes
      .map(({ path, element, requiredFlags }) => {
        const isRequired = isValidPermissions(validRouteFlags, requiredFlags);

        if (!isRequired) return;
        return <Route key={path} exact path={path} element={element} />;
      })
      .filter(Boolean);
  };

  return (
    <ThemeProvider
      theme={Number(currentThemeIdx) === 0 ? lightTheme : darkTheme}
    >
      <CssBaseline />
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
    </ThemeProvider>
  );
}

export default App;
