
import { Box, Fab } from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";

import HowItWorks from "./HowItWorks";
import HeroSection from "./HeroSection";
import Testimonials from "./Testimonials";
import FeatureSection from "./FeatureSection";
import ScrollTop from "../../common/ScrollToTop";

export default function Overview() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <div id="back-to-top-anchor" />
      <HeroSection />
      <FeatureSection />
      <HowItWorks />
      <Testimonials />
      <ScrollTop>
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </ScrollTop>
    </Box>
  );
}
