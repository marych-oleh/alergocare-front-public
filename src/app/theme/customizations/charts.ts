import { Theme } from '@mui/material/styles';
import { axisClasses, legendClasses } from '@mui/x-charts';
import type { ChartsComponents } from '@mui/x-charts/themeAugmentation';
import { gray } from '~/shared/config';

/* eslint-disable import/prefer-default-export */
export const chartsCustomizations: ChartsComponents<Theme> = {
	MuiChartsAxis: {
		styleOverrides: {
			root: ({ theme }) => ({
				[`& .${axisClasses.line}`]: {
					stroke: gray[300],
				},
				[`& .${axisClasses.tick}`]: { stroke: gray[300] },
				[`& .${axisClasses.tickLabel}`]: {
					fill: gray[500],
					fontWeight: 500,
				},
				...theme.applyStyles('dark', {
					[`& .${axisClasses.line}`]: {
						stroke: gray[700],
					},
					[`& .${axisClasses.tick}`]: { stroke: gray[700] },
					[`& .${axisClasses.tickLabel}`]: {
						fill: gray[300],
						fontWeight: 500,
					},
				}),
			}),
		},
	},
	MuiChartsTooltip: {
		styleOverrides: {
			mark: ({ theme }) => ({
				ry: 6,
				boxShadow: 'none',
				border: `1px solid ${(theme.vars || theme).palette.divider}`,
			}),
			table: ({ theme }) => ({
				border: `1px solid ${(theme.vars || theme).palette.divider}`,
				borderBottomLeftRadius: theme.shape.borderRadius,
				borderBottomRightRadius: theme.shape.borderRadius,
				background: 'hsl(0, 0%, 100%)',
				...theme.applyStyles('dark', {
					background: gray[900],
				}),
			}),
		},
	},
	MuiChartsLegend: {
		styleOverrides: {
			root: {
				[`& .${legendClasses.mark}`]: {
					ry: 4,
				},
				gap: 8,
			},
		},
	},
};
