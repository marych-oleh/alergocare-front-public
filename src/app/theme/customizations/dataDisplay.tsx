import { buttonBaseClasses } from '@mui/material/ButtonBase';
import { chipClasses } from '@mui/material/Chip';
import { iconButtonClasses } from '@mui/material/IconButton';
import { alpha, Components, Theme } from '@mui/material/styles';
import { svgIconClasses } from '@mui/material/SvgIcon';
import { typographyClasses } from '@mui/material/Typography';
import { gray, green, red } from '~/shared/config';

/* eslint-disable import/prefer-default-export */
export const dataDisplayCustomizations: Components<Theme> = {
	MuiList: {
		styleOverrides: {
			root: {
				padding: '8px',
				display: 'flex',
				flexDirection: 'column',
				gap: 0,
			},
		},
	},
	MuiListItem: {
		styleOverrides: {
			root: ({ theme }) => ({
				[`& .${svgIconClasses.root}`]: {
					width: '1rem',
					height: '1rem',
					color: (theme.vars || theme).palette.text.secondary,
				},
				[`& .${typographyClasses.root}`]: {
					fontWeight: 500,
				},
				[`& .${buttonBaseClasses.root}`]: {
					display: 'flex',
					gap: 8,
					padding: '2px 8px',
					borderRadius: (theme.vars || theme).shape.borderRadius,
					opacity: 0.7,
					'&.Mui-selected': {
						opacity: 1,
						backgroundColor: alpha(theme.palette.action.selected, 0.3),
						[`& .${svgIconClasses.root}`]: {
							color: (theme.vars || theme).palette.text.primary,
						},
						'&:focus-visible': {
							backgroundColor: alpha(theme.palette.action.selected, 0.3),
						},
						'&:hover': {
							backgroundColor: alpha(theme.palette.action.selected, 0.5),
						},
					},
					'&:focus-visible': {
						backgroundColor: 'transparent',
					},
				},
			}),
		},
	},
	MuiListItemText: {
		styleOverrides: {
			primary: ({ theme }) => ({
				fontSize: theme.typography.body2.fontSize,
				fontWeight: 500,
				lineHeight: theme.typography.body2.lineHeight,
			}),
			secondary: ({ theme }) => ({
				fontSize: theme.typography.caption.fontSize,
				lineHeight: theme.typography.caption.lineHeight,
			}),
		},
	},
	MuiListSubheader: {
		styleOverrides: {
			root: ({ theme }) => ({
				backgroundColor: 'transparent',
				padding: '4px 8px',
				fontSize: theme.typography.caption.fontSize,
				fontWeight: 500,
				lineHeight: theme.typography.caption.lineHeight,
			}),
		},
	},
	MuiListItemIcon: {
		styleOverrides: {
			root: {
				minWidth: 0,
			},
		},
	},
	MuiChip: {
		defaultProps: {
			size: 'medium',
			variant: 'filled',
		},
		styleOverrides: {
			root: ({ theme }) => ({
				borderRadius: '999px',
				height: 'auto',
				maxWidth: '100%',
				[`& .${chipClasses.label}`]: {
					fontWeight: 600,
					display: 'block',
					whiteSpace: 'normal',
					padding: '0.35rem 0.75rem',
				},
				variants: [
					{
						props: {
							color: 'default',
						},
						style: {
							borderColor: gray[300],
							backgroundColor: gray[200],
							[`& .${chipClasses.label}`]: {
								color: gray[700],
							},
							[`& .${chipClasses.icon}`]: {
								color: gray[700],
							},
							...theme.applyStyles('dark', {
								borderColor: gray[800],
								backgroundColor: gray[700],
								[`& .${chipClasses.label}`]: {
									color: gray[100],
								},
								[`& .${chipClasses.icon}`]: {
									color: gray[200],
								},
							}),
						},
					},
					{
						props: {
							color: 'success',
						},
						style: {
							borderColor: green[300],
							backgroundColor: green[200],
							[`& .${chipClasses.label}`]: {
								color: green[500],
							},
							[`& .${chipClasses.icon}`]: {
								color: green[500],
							},
							...theme.applyStyles('dark', {
								borderColor: green[900],
								backgroundColor: green[800],
								[`& .${chipClasses.label}`]: {
									color: green[300],
								},
								[`& .${chipClasses.icon}`]: {
									color: green[300],
								},
							}),
						},
					},
					{
						props: {
							color: 'error',
						},
						style: {
							borderColor: red[200],
							backgroundColor: red[100],
							[`& .${chipClasses.label}`]: {
								color: red[500],
							},
							[`& .${chipClasses.icon}`]: {
								color: red[500],
							},
							...theme.applyStyles('dark', {
								borderColor: red[900],
								backgroundColor: red[800],
								[`& .${chipClasses.label}`]: {
									color: red[200],
								},
								[`& .${chipClasses.icon}`]: {
									color: red[300],
								},
							}),
						},
					},
					{
						props: { size: 'small' },
						style: {
							lineHeight: 1.1,
							[`& .${chipClasses.label}`]: {
								fontSize: theme.typography.caption.fontSize,
							},
							[`& .${svgIconClasses.root}`]: {
								fontSize: theme.typography.caption.fontSize,
							},
						},
					},
					{
						props: { size: 'medium' },
						style: {
							[`& .${chipClasses.label}`]: {
								fontSize: theme.typography.caption.fontSize,
							},
						},
					},
					{
						props: { variant: 'outlined' },
						style: {
							borderWidth: '2px',
							backgroundColor: 'transparent',
							...theme.applyStyles('dark', {
								backgroundColor: 'transparent',
							}),
						},
					},
				],
			}),
		},
	},
	MuiTablePagination: {
		styleOverrides: {
			actions: {
				display: 'flex',
				gap: 8,
				marginRight: 6,
				[`& .${iconButtonClasses.root}`]: {
					minWidth: 0,
					width: 36,
					height: 36,
				},
			},
		},
	},
	MuiIcon: {
		defaultProps: {
			fontSize: 'small',
		},
		styleOverrides: {
			root: {
				variants: [
					{
						props: {
							fontSize: 'small',
						},
						style: {
							fontSize: '1rem',
						},
					},
				],
			},
		},
	},
};
