import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Vite Configuration
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Resolving @ to src folder
    },
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"], // Make sure Vite resolves these extensions correctly
  },
});
