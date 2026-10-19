import { Box, Typography } from '@mui/material';
import { keyframes, styled } from '@mui/material/styles';
import { BarChart, BarChartProps } from '@mui/x-charts/BarChart';
import { mangoFusionPalette } from '@mui/x-charts/colorPalettes';
import { useDrawingArea } from '@mui/x-charts/hooks';

const pulse = keyframes`
  0% { opacity: 0.2; }
  50% { opacity: 0.5; }
  100% { opacity: 0.2; }
`;

const LoadingRect = styled('rect')(({ theme }) => ({
	fill: theme.palette.divider,
	animation: `${pulse} 1.5s ease-in-out infinite`,
}));

const LoadingText = styled('text')(({ theme }) => ({
	stroke: 'none',
	fill: theme.palette.text.secondary,
	shapeRendering: 'crispEdges',
	textAnchor: 'middle',
	dominantBaseline: 'middle',
	fontSize: 14,
	fontWeight: 500,
}));

function LoadingOverlay({ layout }: { layout?: 'horizontal' | 'vertical' }) {
	const { left, top, width, height } = useDrawingArea();
	const isHorz = layout === 'horizontal';

	const barCount = 5; // amount of fake bars
	const gap = 15;
	const step = (isHorz ? height : width) / barCount;
	const thickness = step - gap;
	const ratios = [0.4, 0.8, 0.5, 0.9, 0.6];

	return (
		<g>
			{Array.from({ length: barCount }).map((_, i) => {
				const ratio = ratios[i];
				if (isHorz) {
					const barWidth = width * ratio;
					return (
						<LoadingRect
							key={i}
							x={left}
							y={top + i * step + gap / 2}
							width={barWidth}
							height={Math.max(0, thickness)}
							rx={4}
						/>
					);
				} else {
					const barHeight = height * ratio;
					return (
						<LoadingRect
							key={i}
							x={left + i * step + gap / 2}
							y={top + height - barHeight}
							width={Math.max(0, thickness)}
							height={barHeight}
							rx={4}
						/>
					);
				}
			})}
			<LoadingText x={left + width / 2} y={top + height / 2}>
				Завантаження даних...
			</LoadingText>
		</g>
	);
}

export interface CustomBarChartProps extends BarChartProps {
	isLoading?: boolean;
	isError?: boolean;
	errorMessage?: string;
	/** Min width for scroll behaviour activation instead of shrinking (<430px) */
	minWidth?: number | string;
}

export function CustomBarChart({
	isLoading = false,
	isError = false,
	errorMessage = 'Не вдалося завантажити дані',
	minWidth = 300,
	layout = 'vertical',
	margin = { left: 5, right: 5, top: 5, bottom: 5 },
	colors = mangoFusionPalette,
	slots,
	hideLegend = true,
	...props
}: CustomBarChartProps) {
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
				<BarChart
					loading={isLoading}
					layout={layout}
					margin={margin}
					colors={colors}
					hideLegend={hideLegend}
					slots={{
						loadingOverlay: () => <LoadingOverlay layout={layout} />,
						...slots,
					}}
					{...props}
				/>
			</Box>
		</Box>
	);
}
