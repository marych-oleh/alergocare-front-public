import { Box, Typography } from '@mui/material';
import { keyframes, styled } from '@mui/material/styles';
import { PieChart, PieChartProps } from '@mui/x-charts/PieChart';
import { mangoFusionPalette } from '@mui/x-charts/colorPalettes';
import { useDrawingArea } from '@mui/x-charts/hooks';

const pulseCircle = keyframes`
  0% { opacity: 0.15; stroke-dashoffset: 0; }
  50% { opacity: 0.4; stroke-dashoffset: 150; }
  100% { opacity: 0.15; stroke-dashoffset: 300; }
`;

const pulseText = keyframes`
  0% { opacity: 0.5; }
  50% { opacity: 1; }
  100% { opacity: 0.5; }
`;

const LoadingCircle = styled('circle')(({ theme }) => ({
	fill: 'none',
	stroke: theme.palette.divider,
	strokeWidth: 32,
	strokeLinecap: 'round',
	strokeDasharray: '100 40',
	animation: `${pulseCircle} 2.5s linear infinite`,
}));

const LoadingText = styled('text')(({ theme }) => ({
	stroke: 'none',
	fill: theme.palette.text.secondary,
	shapeRendering: 'crispEdges',
	textAnchor: 'middle',
	dominantBaseline: 'middle',
	fontSize: 14,
	fontWeight: 500,
	animation: `${pulseText} 1.5s ease-in-out infinite`,
}));

function PieLoadingOverlay() {
	const { left, top, width, height } = useDrawingArea();

	// Dynamically calculate center point and safe radius
	const cx = left + width / 2;
	const cy = top + height / 2;
	const radius = Math.min(width, height) * 0.28;

	return (
		<g>
			<LoadingCircle cx={cx} cy={cy} r={radius} />
			<LoadingText x={cx} y={cy}>
				Завантаження даних...
			</LoadingText>
		</g>
	);
}

export interface CustomPieChartProps extends PieChartProps {
	isLoading?: boolean;
	isError?: boolean;
	errorMessage?: string;
	/** Minimum width to safeguard chart size on small viewports (<430px) */
	minWidth?: number | string;
}

export function CustomPieChart({
	isLoading = false,
	isError = false,
	errorMessage = 'Не вдалося завантажити дані',
	minWidth = 120,
	margin = { left: 5, right: 5, top: 5, bottom: 5 },
	colors = mangoFusionPalette,
	sx,
	slots,
	slotProps,
	hideLegend = false,
	...props
}: CustomPieChartProps) {
	if (isError) {
		return (
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				height={props.height || 300}
			>
				<Typography color="error">{errorMessage}</Typography>
			</Box>
		);
	}

	return (
		<Box
			sx={{
				width: '100%',
				overflowX: 'auto',
				overflowY: 'hidden',
				height: '100%',
				pb: 1,
				// Add scrollbar to support mobile scrolling
				'&::-webkit-scrollbar': {
					height: '8px',
				},
				'&::-webkit-scrollbar-track': {
					backgroundColor: 'action.hover',
					borderRadius: '4px',
				},
				'&::-webkit-scrollbar-thumb': {
					backgroundColor: 'divider',
					borderRadius: '4px',
					'&:hover': {
						backgroundColor: 'text.secondary',
					},
				},
			}}
		>
			<Box sx={{ minWidth, width: '100%', height: '100%' }}>
				<PieChart
					loading={isLoading}
					margin={margin}
					colors={colors}
					hideLegend={hideLegend}
					slots={{
						loadingOverlay: PieLoadingOverlay,
						...slots,
					}}
					slotProps={{
						legend: {
							direction: 'horizontal',
							position: {
								vertical: 'bottom',
								horizontal: 'center',
							},
						},
					}}
					{...props}
				/>
			</Box>
		</Box>
	);
}
