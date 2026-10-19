import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [tsconfigPaths()],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./vitest.setup.ts'],
		include: ['src/**/*.{test,spec}.{ts,tsx}'],
		css: false,
		env: {
			VITE_API_URL: 'http://localhost:8080',
		},
		server: {
			deps: {
				inline: ['@mui/x-data-grid'],
			},
		},
		coverage: {
			provider: 'v8',
			reporter: ['text', 'html', 'lcov', 'json-summary'],
			reportsDirectory: './coverage',
			include: ['src/**/*.{ts,tsx}'],
			exclude: [
				'src/routes.ts',
				'src/root.tsx',
				'src/**/*.d.ts',
				'src/**/index.ts',
				'src/mocks/**',
				'src/app/theme/**',
				'src/app/providers/**',
				'src/shared/config/**',
				'src/shared/routes/**',
				'src/shared/queryClient.ts',
				'src/test-utils.tsx',
				// type-only files — no runtime code to cover
				'src/**/*.model.ts',
				'src/**/*.model.tsx',
				'src/shared/lib/tree/type.ts',
				'src/shared/lib/router/handle.ts',
				'src/shared/lib/objects/nullable.ts',
				'src/shared/auth/auth.model.ts',
				// loader files (React Router loaders)
				'src/**/loader.ts',
				'src/**/loader.tsx',
				// page-level layouts that require full router context
				'src/pages/dashboard-layout/ui/DashboardLayout.tsx',
				'src/pages/dashboard-layout/ui/sideMenu/**',
				'src/pages/dashboard-layout/ui/AppNavbar.tsx',
				'src/pages/dashboard-layout/ui/BottomAppNavigation.tsx',
				'src/pages/dashboard-layout/ui/Header.tsx',
				'src/pages/dashboard-layout/ui/HeaderTabs.tsx',
				'src/app/api/loader.ts',
				'src/app/ui/**',
			],
			thresholds: {
				lines: 80,
				branches: 70,
				functions: 80,
				statements: 80,
			},
		},
	},
});
