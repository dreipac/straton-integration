import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/straton-integration/login/",
  resolve: {
    dedupe: ["react", "react-dom"],
  },
});
