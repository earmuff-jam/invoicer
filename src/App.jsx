import { Suspense } from "react";

import { RouterProvider } from "react-router-dom";

import { Box, Dialog } from "@mui/material";

import { router } from "src/router";
import { TourProvider } from "@reactour/tour";
import { GeneratedTourSteps } from "src/common/TourSteps";

function App() {
  return (
    <Box>
      <Suspense fallback={<Dialog open={false} title="Loading..." />}>
        <TourProvider steps={GeneratedTourSteps}>
          <RouterProvider router={router} />
        </TourProvider>
      </Suspense>
    </Box>
  );
}

export default App;
