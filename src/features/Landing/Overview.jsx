import { Stack } from "@mui/material";
import Header from "./Header";
import TextContent from "./TextContent";
import CloudSvgResource from "./CloudSvgResource";
import Testimonials from "../Testimonials/Testimonials";
import Footer from "../Footer/Footer";

export default function Overview() {
  return (
    <Stack spacing={5}>
      <Header />
      <Stack direction="row" justifyContent="space-between" textAlign="center" alignItems="center">
        <TextContent
          title="Building out invoices has never been easier..."
          caption="No matter the situation, we got you covered."
        />
        <CloudSvgResource />
      </Stack>
      <Stack direction="row" justifyContent="space-between" textAlign="center" alignItems="center">
        <CloudSvgResource />
        <TextContent
          title="Simple, effortless and intuitive ..."
          caption="Recently used contacts are automatically populated, for easy access"
        />
      </Stack>
      <Testimonials />
      <Footer />

    </Stack>
  );
}
