import { defineConfig } from "vite";
import { createProxy } from "vite-plugin-proxy";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
const HOSTNAME = "https://docter-app-backend.onrender.com";
export default defineConfig({
  plugins: [
    react(),
    createProxy({
      "/api": {
        target: "https://docter-app-backend.onrender.com",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: HOSTNAME || "http://localhost:8000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
