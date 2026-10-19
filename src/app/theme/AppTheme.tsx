import type { ThemeOptions } from '@mui/material/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import * as React from 'react';
import { colorSchemes, shadows, shape, typography } from '~/shared/config';
import { dataDisplayCustomizations } from './customizations/dataDisplay';
import { feedbackCustomizations } from './customizations/feedback';
import { inputsCustomizations } from './customizations/inputs';
import { muiCssBaseLineCustomizations } from './customizations/muiCssBaseLine';
import { navigationCustomizations } from './customizations/navigation';
import { surfacesCustomizations } from './customizations/surfaces';

// For date localization
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ukUA as datePickersUkUA } from '@mui/x-date-pickers/locales';

interface AppThemeProps {
	children: React.ReactNode;
	disableCustomTheme?: boolean;
	themeComponents?: ThemeOptions['components'];
}

export default function AppTheme(props: AppThemeProps) {
	const { children, disableCustomTheme, themeComponents } = props;
	const theme = React.useMemo(() => {
		return disableCustomTheme ?
				{}
			:	createTheme(
					{
						// For more details about CSS variables configuration, see https://mui.com/material-ui/customization/css-theme-variables/configuration/
						cssVariables: {
							colorSchemeSelector: 'data-mui-color-scheme',
							cssVarPrefix: 'template',
						},
						colorSchemes, // Recently added in v6 for building light & dark mode app, see https://mui.com/material-ui/customization/palette/#color-schemes
						typography,
						shadows,
						shape,
						components: {
							...muiCssBaseLineCustomizations,
							...inputsCustomizations,
							...dataDisplayCustomizations,
							...feedbackCustomizations,
							...navigationCustomizations,
							...surfacesCustomizations,
							...themeComponents,
						},
					},
					datePickersUkUA
				);
	}, [disableCustomTheme, themeComponents]);
	if (disableCustomTheme) {
		return <React.Fragment>{children}</React.Fragment>;
	}
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="uk">
			<ThemeProvider theme={theme} disableTransitionOnChange>
				{children}
			</ThemeProvider>
		</LocalizationProvider>
	);
}
