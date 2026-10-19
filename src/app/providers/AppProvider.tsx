import AppTheme from '@app/theme/AppTheme';
import {
	chartsCustomizations,
	dataGridCustomizations,
	datePickersCustomizations,
	treeViewCustomizations,
} from '@app/theme/customizations';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { setZodConfig } from '~/shared/lib/zod';
import { queryClient } from '~/shared/queryClient';
import { Toaster } from '~/shared/ui/sonner/Toaster';

const xThemeComponents = {
	...treeViewCustomizations,
	...dataGridCustomizations,
	...datePickersCustomizations,
	...chartsCustomizations,
};

setZodConfig();

export function AppProvider({ children }: { children: React.ReactNode }) {
	return (
		<StrictMode>
			<AppTheme themeComponents={xThemeComponents}>
				<QueryClientProvider client={queryClient}>
					<CssBaseline enableColorScheme />
					<Toaster />
					{children}
				</QueryClientProvider>
			</AppTheme>
		</StrictMode>
	);
}
