import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5101",
        changeOrigin: true,
      },
      "/files": {
        target: "http://localhost:5101",
        changeOrigin: true,
      },
      "/media": {
        target: "http://localhost:5101",
        changeOrigin: true,
      },
    },
  },
});
