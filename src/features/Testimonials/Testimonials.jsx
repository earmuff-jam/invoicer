import { Stack } from "@mui/material";
import Review from "./Review";
import TextContent from "../Landing/TextContent";

function Testimonials() {
  return (
    <Stack spacing={1} textAlign="center">
      <TextContent title="Check out what our users have to say ..." />
      <Review />
    </Stack>
  );
}

export default Testimonials;
