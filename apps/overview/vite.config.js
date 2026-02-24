import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, "", "");

  const repoBase = env.VITE_REPO_BASE || "";
  const appBase = env.VITE_APP_BASE || "/";
  const base = repoBase ? `${repoBase}${appBase}` : appBase;

  return {
    plugins: [react()],
    base,
  };
});