import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5101/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/files": {
        target: "http://localhost:5101",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/files/, ""),
      },
      "/media": {
        target: "http://localhost:5101",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/media/, ""),
      },
    },
  },
});
