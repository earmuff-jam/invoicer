import { Suspense } from "react";

import { RouterProvider } from "react-router-dom";

import { Box, Dialog } from "@mui/material";

import { router } from "src/router";

function App() {
  return (
    <Box>
      <Suspense fallback={<Dialog open={false} title="Loading..." />}>
        <RouterProvider router={router} />
      </Suspense>
    </Box>
  );
}

export default App;
