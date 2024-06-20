import { defineConfig } from "@natsuneko-laboratory/kiana/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  externals: ["next/headers", "react", "react/jsx-runtime", "react-dom"],
});
