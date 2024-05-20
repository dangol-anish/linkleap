import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://linkleap-nrfuxtxkb-anish-dangols-projects.vercel.app",
        secure: false,
      },
    },
  },
  plugins: [react()],
});
