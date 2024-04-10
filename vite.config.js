import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
const HOSTNAME = "https://doctor-appointment-system-3-borg.onrender.com";
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000" || HOSTNAME,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
