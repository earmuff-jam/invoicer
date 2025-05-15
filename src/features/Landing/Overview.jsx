import { Box } from "@mui/material";
import HeroSection from "src/features/Landing/HeroSection";
import FeatureSection from "src/features/Landing/FeatureSection";
import HowItWorks from "src/features/Landing/HowItWorks";
import Testimonials from "src/features/Landing/Testimonials";
import { useAppTitle } from "src/hooks/useAppTitle";

export default function Overview() {
  useAppTitle("Home");

  return (
    <Box sx={{ flexGrow: 1 }}>
      <HeroSection />
      <FeatureSection />
      <HowItWorks />
      <Testimonials />
    </Box>
  );
}
