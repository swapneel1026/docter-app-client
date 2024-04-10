import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
const HOSTNAME = "https://docter-app-backend.onrender.com";
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: HOSTNAME, // This is just a placeholder, it will be overridden by setupProxy.js
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
