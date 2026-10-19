import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
	return {
		envDir: '../',
		plugins: [reactRouter(), tsconfigPaths()],
		server: {
			host: process.env.VITE_HOST ?? '127.0.0.1',
			port: parseInt(process.env.VITE_PORT ?? '8080', 10),
			strictPort: true,
		},
		optimizeDeps: {
			include: ['@mui/x-data-grid'],
		},
		ssr: {
			noExternal: [
				'@mui/x-data-grid',
				'@mui/x-date-pickers',
				'@mui/x-tree-view',
				'@mui/material',
			],
		},
	};
});
