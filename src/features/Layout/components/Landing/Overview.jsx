import { Box } from "@mui/material";
import FeatureSection from "src/features/Layout/components/Landing/FeatureSection";
import HeroSection from "src/features/Layout/components/Landing/HeroSection";
import HowItWorks from "src/features/Layout/components/Landing/HowItWorks";
import Testimonials from "src/features/Layout/components/Landing/Testimonials";
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
