import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, renderHook, type RenderOptions, type RenderHookOptions } from '@testing-library/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React from 'react';
import { MemoryRouter, type MemoryRouterProps } from 'react-router';

const testTheme = createTheme();

export function createTestQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: { retry: false, gcTime: 0, staleTime: 0 },
			mutations: { retry: false },
		},
	});
}

interface WrapperProps {
	children: React.ReactNode;
	queryClient?: QueryClient;
	initialEntries?: MemoryRouterProps['initialEntries'];
}

function TestProviders({
	children,
	queryClient,
	initialEntries = ['/'],
}: WrapperProps) {
	const client = React.useMemo(
		() => queryClient ?? createTestQueryClient(),
		[queryClient]
	);
	return (
		<ThemeProvider theme={testTheme}>
			<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="uk">
				<QueryClientProvider client={client}>
					<MemoryRouter initialEntries={initialEntries}>
						{children}
					</MemoryRouter>
				</QueryClientProvider>
			</LocalizationProvider>
		</ThemeProvider>
	);
}

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
	queryClient?: QueryClient;
	initialEntries?: MemoryRouterProps['initialEntries'];
}

function customRender(ui: React.ReactElement, options?: CustomRenderOptions) {
	const { queryClient, initialEntries, ...rest } = options ?? {};
	return render(ui, {
		wrapper: ({ children }) => (
			<TestProviders queryClient={queryClient} initialEntries={initialEntries}>
				{children}
			</TestProviders>
		),
		...rest,
	});
}

interface CustomRenderHookOptions<TProps> extends Omit<RenderHookOptions<TProps>, 'wrapper'> {
	queryClient?: QueryClient;
	initialEntries?: MemoryRouterProps['initialEntries'];
}

function customRenderHook<TResult, TProps>(
	render: (props: TProps) => TResult,
	options?: CustomRenderHookOptions<TProps>
) {
	const { queryClient, initialEntries, ...rest } = options ?? {};
	return renderHook(render, {
		wrapper: ({ children }) => (
			<TestProviders queryClient={queryClient} initialEntries={initialEntries}>
				{children}
			</TestProviders>
		),
		...rest,
	});
}

export * from '@testing-library/react';
export { customRender as render, customRenderHook as renderHook };
