import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
const HOSTNAME = "https://docter-app-backend.onrender.com";
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: HOSTNAME,
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  base: "https://docter-app-backend.onrender.com/",
});
