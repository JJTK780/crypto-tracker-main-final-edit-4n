import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/Crypto-Currency-Tracker/",
  build: {
    outDir: "dist",
    sourcemap: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: [
            "react",
            "react-dom",
            "react-router-dom",
            "@clerk/clerk-react",
            "chart.js",
            "react-chartjs-2",
            "@tanstack/react-query",
          ],
          ui: ["@headlessui/react", "react-icons"],
        },
      },
    },
  },
});
