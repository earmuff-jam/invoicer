
import { Box, Fab } from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";
import HeroSection from "src/features/Landing/HeroSection";
import FeatureSection from "src/features/Landing/FeatureSection";
import HowItWorks from "src/features/Landing/HowItWorks";
import Testimonials from "src/features/Landing/Testimonials";
import ScrollTop from "src/common/ScrollToTop";

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
