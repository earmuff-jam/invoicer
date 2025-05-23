import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      common: path.resolve(__dirname, "src/common"),
      hooks: path.resolve(__dirname, "src/hooks"),
      features: path.resolve(__dirname, "src/features"),
      src: path.resolve(__dirname, "src"),
    },
  },
});
