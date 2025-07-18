import react from '@vitejs/plugin-react';
import tailwindcss from "@tailwindcss/vite";

const bareModules =[
	// Bare runtime modules
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
export default {
	plugins: [react(), tailwindcss()],
	base: '',
	build: {
		outDir: 'dist',
		rollupOptions: {
			external: bareModules,
		}
	},
	optimizeDeps: {
		exclude: bareModules
	}
};