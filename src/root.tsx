import interCyrillicWoff2 from '@fontsource-variable/inter/files/inter-cyrillic-opsz-normal.woff2?url';
import interLatinWoff2 from '@fontsource-variable/inter/files/inter-latin-opsz-normal.woff2?url';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import Loader from '~/shared/ui/Loader/Loader';
import { Route } from './+types/root';
import { AppProvider } from './app/providers/AppProvider';
import styles from './app/theme/fonts.css?inline';
import { RootErrorBoundary } from './app/ui/RootErrorBoundary';

export const links: Route.LinksFunction = () => [
	{
		rel: 'preload',
		href: interLatinWoff2,
		as: 'font',
		type: 'font/woff2',
		crossOrigin: 'anonymous',
	},
	{
		rel: 'preload',
		href: interCyrillicWoff2,
		as: 'font',
		type: 'font/woff2',
		crossOrigin: 'anonymous',
	},
];

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<style>{styles}</style>
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export { clientLoader } from '@app/api/loader';
export default function App() {
	return (
		<AppProvider>
			<Outlet />
		</AppProvider>
	);
}

export function ErrorBoundary({ error }: any) {
	return (
		<AppProvider>
			<RootErrorBoundary error={error} />
		</AppProvider>
	);
}

export function HydrateFallback() {
	return (
		<>
			<CssBaseline enableColorScheme />
			<Box sx={{ width: '100vw', height: '100vh' }}>
				<Loader />
			</Box>
		</>
	);
}
