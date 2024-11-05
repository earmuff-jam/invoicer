import { Container, Dialog } from "@mui/material";
import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

function App() {
  return (
    <Container maxWidth="xl">
      <Suspense fallback={<Dialog open={false} title="Loading..." />}>
        <RouterProvider router={router} />
      </Suspense>
    </Container>
  );
}

export default App;
