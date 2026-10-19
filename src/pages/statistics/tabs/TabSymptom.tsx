import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import {
	useSymptomCategoryDistribution,
	useSymptomReactionType,
	useTopAllergens,
} from '~/shared/api/endpoints/statistics';
import { SYMPTOM_CATEGORY_LABELS } from '~/shared/lib/symptom';
import { CustomBarChart } from '~/shared/ui/charts/CustomBarChart';
import { CustomPieChart } from '~/shared/ui/charts/CustomPieChart';
import { useStatisticsFiltersContext } from '../lib/StatisticsFiltersContext';
import { ChartCard } from '../ui/ChartCard';
import { createArcPercentageLabel } from '../ui/createArcPercentageLabel';

export default function TabSymptoms() {
	const { filters: f } = useStatisticsFiltersContext();
	const theme = useTheme();
	const symptomCats = useSymptomCategoryDistribution(f);
	const topAllergens = useTopAllergens(10, f);
	const reactionType = useSymptomReactionType(f);

	const symptomPalette = [
		theme.palette.primary.main,
		theme.palette.info.main,
		theme.palette.warning.main,
		theme.palette.error.main,
		theme.palette.success.main,
		theme.palette.primary.light,
		theme.palette.info.light,
	];

	const symptomPieData = (symptomCats.data ?? []).map((d, i) => ({
		id: d.name,
		value: d.count,
		label: SYMPTOM_CATEGORY_LABELS[d.name] ?? d.name,
		color: symptomPalette[i % symptomPalette.length],
	}));

	const reactionPieData = [
		{
			id: 'immediate',
			label: 'Негайна (<24 год)',
			value: reactionType.data?.immediate ?? 0,
			color: theme.palette.error.main,
		},
		{
			id: 'delayed',
			label: 'Сповільнена (≥24 год)',
			value: reactionType.data?.delayed ?? 0,
			color: theme.palette.warning.main,
		},
		{
			id: 'unknown',
			label: 'Не вказано',
			value: reactionType.data?.unknown ?? 0,
			color: theme.palette.grey[500],
		},
	].filter((d) => d.value > 0);

	const compactLegendProps = {
		direction: 'horizontal' as const,
		position: { vertical: 'bottom' as const, horizontal: 'center' as const },
	};

	return (
		<Stack spacing={3}>
			<Grid container spacing={2}>
				<Grid size={{ xs: 12, sm: 6 }}>
					<ChartCard title="Симптоми за системами організму" height={300}>
						<CustomPieChart
							isLoading={symptomCats.isLoading}
							isError={symptomCats.isError}
							series={[
								{
									data: symptomPieData,
									outerRadius: 110,
									arcLabel: createArcPercentageLabel(symptomPieData),
								},
							]}
							slotProps={{ legend: compactLegendProps }}
						/>
					</ChartCard>
				</Grid>

				<Grid size={{ xs: 12, sm: 6 }}>
					<ChartCard
						title="Тип реакції за часом виникнення симптомів"
						height={300}
					>
						<CustomPieChart
							isLoading={reactionType.isLoading}
							isError={reactionType.isError}
							series={[
								{
									data: reactionPieData,
									outerRadius: 110,
									arcLabel: createArcPercentageLabel(reactionPieData),
								},
							]}
							slotProps={{ legend: compactLegendProps }}
						/>
					</ChartCard>
				</Grid>

				<Grid size={12}>
					<ChartCard title="Топ-10 алергенів" height={300}>
						<CustomBarChart
							isLoading={topAllergens.isLoading}
							isError={topAllergens.isError}
							dataset={topAllergens.data ?? []}
							layout="horizontal"
							yAxis={[
								{
									scaleType: 'band',
									dataKey: 'name',
									width: 'auto',
								},
							]}
							xAxis={[
								{
									tickMinStep: 1,
								},
							]}
							series={[
								{
									dataKey: 'count',
									label: 'Звернень',
									color: theme.palette.primary.main,
								},
							]}
							grid={{ vertical: true }}
						/>
					</ChartCard>
				</Grid>
			</Grid>
		</Stack>
	);
}
