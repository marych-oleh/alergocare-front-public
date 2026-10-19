import { Components, Theme } from '@mui/material/styles';

export const muiCssBaseLineCustomizations: Components<Theme> = {
	MuiCssBaseline: {
		styleOverrides: (theme) => `
            body {
                font-optical-sizing: auto;
            }
            input:-webkit-autofill,
            input:-webkit-autofill:hover,
            input:-webkit-autofill:focus,
            input:-webkit-autofill:active {
                -webkit-box-shadow: 0 0 0 0px transparent inset !important;
                background-color: red !important;
            }`,
	},
};
