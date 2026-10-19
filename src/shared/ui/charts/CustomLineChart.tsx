import { Box, Typography } from '@mui/material';
import { keyframes, styled } from '@mui/material/styles';
import { LineChart, LineChartProps } from '@mui/x-charts/LineChart';
import { mangoFusionPalette } from '@mui/x-charts/colorPalettes';
import { useDrawingArea } from '@mui/x-charts/hooks';

const drawLine = keyframes`
  0% { stroke-dasharray: 0, 1000; opacity: 0.3; }
  50% { stroke-dasharray: 1000, 0; opacity: 0.7; }
  100% { stroke-dasharray: 0, 1000; opacity: 0.3; }
`;

const pulseText = keyframes`
  0% { opacity: 0.5; }
  50% { opacity: 1; }
  100% { opacity: 0.5; }
`;

const LoadingPath = styled('path')(({ theme }) => ({
	fill: 'none',
	stroke: theme.palette.divider,
	strokeWidth: 3,
	strokeLinecap: 'round',
	animation: `${drawLine} 3s ease-in-out infinite`,
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

function LineLoadingOverlay() {
	const { left, top, width, height } = useDrawingArea();

	// Mathematically generate a smooth bezier curve spanning the exact drawing area
	const startY = top + height * 0.8;
	const midX1 = left + width * 0.3;
	const midY1 = top + height * 0.2;
	const midX2 = left + width * 0.7;
	const midY2 = top + height * 0.9;
	const endX = left + width;
	const endY = top + height * 0.3;

	const pathString = `M ${left} ${startY} C ${midX1} ${midY1}, ${midX2} ${midY2}, ${endX} ${endY}`;

	return (
		<g>
			<LoadingPath d={pathString} />
			<LoadingText x={left + width / 2} y={top + height / 2}>
				Завантаження даних...
			</LoadingText>
		</g>
	);
}

export interface CustomLineChartProps extends LineChartProps {
	isLoading?: boolean;
	isError?: boolean;
	errorMessage?: string;
	/** Minimum width to trigger horizontal scrolling on small viewports */
	minWidth?: number | string;
}

export function CustomLineChart({
	isLoading = false,
	isError = false,
	errorMessage = 'Не вдалося завантажити дані',
	minWidth = 500,
	margin = { left: 5, right: 5, top: 5, bottom: 5 },
	colors = mangoFusionPalette,
	sx,
	slots,
	hideLegend = true,
	...props
}: CustomLineChartProps) {
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
				<LineChart
					loading={isLoading}
					margin={margin}
					colors={colors}
					hideLegend={hideLegend}
					slots={{
						// Inject our custom SVG path overlay
						loadingOverlay: LineLoadingOverlay,
						...slots,
					}}
					sx={{
						'& .MuiLineElement-root': {
							transition: 'stroke-width 0.3s ease, filter 0.3s ease',
						},
						'& .MuiLineElement-root:hover': {
							strokeWidth: 4,
							filter: 'drop-shadow(0px 4px 8px rgba(0,0,0,0.3))',
						},

						'& .MuiMarkElement-root': {
							transition:
								'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
							transformOrigin: 'center',
							cursor: 'pointer',
						},
						'& .MuiMarkElement-root:hover': {
							transform: 'scale(1.8)',
						},

						'& .MuiAreaElement-root': {
							transition: 'opacity 0.3s ease',
						},
						'& .MuiAreaElement-root:hover': {
							opacity: 0.8,
						},
						...sx,
					}}
					{...props}
				/>
			</Box>
		</Box>
	);
}
