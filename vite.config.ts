import { defineConfig } from "@natsuneko-laboratory/kiana/vite";
import { directive } from "@natsuneko-laboratory/vite-plugin-next-directives";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react(), ...directive()],
  externals: ["next/headers", "react", "react/jsx-runtime", "react-dom"],
});
