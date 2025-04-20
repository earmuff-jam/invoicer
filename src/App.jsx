import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "src/features/Layout/Layout";
import { InvoicerRoutes } from "src/router";

function App() {
  const buildAppRoutes = (routes) => {
    return routes.map((route) => (
      <Route key={route.path} exact path={route.path} element={route.element} />
    ));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {buildAppRoutes(InvoicerRoutes)}
        </Route>
        <Route path="/*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
