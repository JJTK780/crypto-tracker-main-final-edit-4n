import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // Remove or comment out the base URL
  // base: '/crypto-tracker/',
  plugins: [react()],
});
