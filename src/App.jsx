import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import validateClientPermissions, {
  isValidPermissions,
} from "src/common/ValidateClientPerms";
import Layout from "src/features/Layout/Layout";
import { InvoicerRoutes } from "src/Routes";

function App() {
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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {buildAppRoutes(InvoicerRoutes)}
        </Route>
        {/* force navigate to main page when routes are not found */}
        <Route path="/*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
