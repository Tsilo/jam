import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from "@tailwindcss/vite";

const bareModules = [
	// Bare runtime modules
	'hyperswarm',
	'hypercore-crypto',
	'hypercore',
	'hyperdrive',
	'hyperbee',
	'b4a',
	'bare-fs',
	'bare-path',
	'bare-fetch',
	'bare-process',
	'bare-os',
	'bare-crypto',
	'bare-events',
	'bare-stream',
	'bare-buffer',
	'bare-url',
	'bare-util',
	// Pear modules
	'pear',

];
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '',
  build: {
    sourcemap: true, // Enable source maps for production builds
    outDir: 'dist',
    rollupOptions: {
      external: bareModules,
      output: {
        sourcemap: true, // Ensure source maps are generated for chunks
      }
    }
  },
  optimizeDeps: {
    exclude: bareModules
  }
});