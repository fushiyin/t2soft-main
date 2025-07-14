import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

// https://vite.dev/config/
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			"@": resolve(__dirname, "src"),
		},
	},
	optimizeDeps: {
		esbuildOptions: {
			loader: {
				".js": "jsx",
			},
		},
	},
	server: {
		proxy: {
			'/api': 'http://localhost:3001',
		},
	},
});
