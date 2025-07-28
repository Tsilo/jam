import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const bareModules = [
  // Bare runtime modules
  "hyperswarm",
  "hypercore-crypto",
  "hypercore",
  "hyperdrive",
  "hyperbee",
  "b4a",
  "bare-fs",
  "bare-path",
  "bare-fetch",
  "bare-process",
  "bare-os",
  "bare-crypto",
  "bare-events",
  "bare-stream",
  "bare-buffer",
  "bare-url",
  "bare-util",
  // Pear modules
  "pear",
];
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "",
  minify: false,
  build: {
    sourcemap: "inline",
    outDir: "dist",
    minify: false,
    terserOptions: {
      compress: false,
      mangle: false,
    },
    rollupOptions: {
      external: bareModules,
    },
  },
  optimizeDeps: {
    exclude: bareModules,
  },
});
