import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import { TestingMethodDict, TestingTypeDict } from '~/entities/testing';
import {
	useComplicationPresence,
	usePositiveTestingByStageAndMethod,
	useTestingByMethod,
	useTestingByType,
	useTestingResults,
	useTopComplications,
} from '~/shared/api/endpoints/statistics';
import { CustomBarChart } from '~/shared/ui/charts/CustomBarChart';
import { CustomPieChart } from '~/shared/ui/charts/CustomPieChart';
import { useStatisticsFiltersContext } from '../lib/StatisticsFiltersContext';
import { ChartCard } from '../ui/ChartCard';
import { createArcPercentageLabel } from '../ui/createArcPercentageLabel';

export default function TabTestings() {
	const { filters: f } = useStatisticsFiltersContext();
	const theme = useTheme();
	const results = useTestingResults(f);
	const byStageMethod = usePositiveTestingByStageAndMethod(f);
	const byType = useTestingByType(f);
	const byMethod = useTestingByMethod(f);
	const complications = useTopComplications(10, f);
	const complicationPresence = useComplicationPresence(f);

	const resultsPieData =
		results.data ?
			[
				{
					id: 'pos',
					value: results.data.positive,
					label: 'Позитивні',
					color: theme.palette.success.main,
				},
				{
					id: 'neg',
					value: results.data.negative,
					label: 'Негативні',
					color: theme.palette.error.main,
				},
			]
		:	[];

	const typePieData = (byType.data ?? []).map((d, i) => ({
		id: d.name,
		value: d.count,
		label: TestingTypeDict[d.name] ?? d.name,
		color: i === 0 ? theme.palette.primary.main : theme.palette.warning.main,
	}));

	const methodPieData = (byMethod.data ?? []).map((d, i) => ({
		id: d.name,
		value: d.count,
		label: TestingMethodDict[d.name] ?? d.name,
		color: i === 0 ? theme.palette.info.main : theme.palette.primary.light,
	}));

	const complicationPresenceData =
		complicationPresence.data ?
			[
				{
					id: 'with',
					value: complicationPresence.data.withCount,
					label: 'Є ускладнення',
					color: theme.palette.error.main,
				},
				{
					id: 'without',
					value: complicationPresence.data.withoutCount,
					label: 'Без ускладнень',
					color: theme.palette.success.main,
				},
			]
		:	[];

	const skinData = byStageMethod.data?.skin ?? [];

	const challengeData = (byStageMethod.data?.challenge ?? []).map((d, i) => ({
		...d,
		color: [
			theme.palette.primary.light,
			theme.palette.primary.main,
			theme.palette.primary.dark,
			theme.palette.info.main,
		][i % 4],
	}));

	return (
		<Stack spacing={3}>
			<Grid container spacing={2}>
				<Grid size={{ xs: 12, sm: 6, lg: 3 }}>
					<ChartCard title="Результати тестувань" height={240}>
						<CustomPieChart
							isLoading={results.isLoading}
							isError={results.isError}
							series={[
								{
									data: resultsPieData,
									outerRadius: 85,
									arcLabel: createArcPercentageLabel(resultsPieData),
								},
							]}
						/>
					</ChartCard>
				</Grid>

				<Grid size={{ xs: 12, sm: 6, lg: 3 }}>
					<ChartCard title="За типом препарату" height={240}>
						<CustomPieChart
							isLoading={byType.isLoading}
							isError={byType.isError}
							series={[
								{
									data: typePieData,
									outerRadius: 85,
									arcLabel: createArcPercentageLabel(typePieData),
								},
							]}
						/>
					</ChartCard>
				</Grid>

				<Grid size={{ xs: 12, sm: 6, lg: 3 }}>
					<ChartCard title="За методом тестування" height={240}>
						<CustomPieChart
							isLoading={byMethod.isLoading}
							isError={byMethod.isError}
							series={[
								{
									data: methodPieData,
									outerRadius: 85,
									arcLabel: createArcPercentageLabel(methodPieData),
								},
							]}
						/>
					</ChartCard>
				</Grid>

				<Grid size={{ xs: 12, sm: 6, lg: 3 }}>
					<ChartCard title="Ускладнення після тестування" height={240}>
						<CustomPieChart
							isLoading={complicationPresence.isLoading}
							isError={complicationPresence.isError}
							series={[
								{
									data: complicationPresenceData,
									outerRadius: 85,
									arcLabel: createArcPercentageLabel(
										complicationPresenceData
									),
								},
							]}
						/>
					</ChartCard>
				</Grid>
			</Grid>

			<ChartCard title="Топ ускладнень під час тестувань" height={280}>
				<CustomBarChart
					isLoading={complications.isLoading}
					isError={complications.isError}
					dataset={complications.data ?? []}
					layout="horizontal"
					margin={5}
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
							label: 'Випадків',
							color: theme.palette.primary.main,
						},
					]}
					hideLegend
					grid={{ vertical: true }}
				/>
			</ChartCard>

			<Grid container spacing={2}>
				<Grid size={{ xs: 12, md: 6 }}>
					<ChartCard
						title="Шкірний тест - позитивні за етапом"
						height={260}
					>
						<CustomBarChart
							isLoading={byStageMethod.isLoading}
							isError={byStageMethod.isError}
							dataset={skinData}
							xAxis={[
								{
									scaleType: 'band',
									dataKey: 'name',
								},
							]}
							yAxis={[
								{
									tickMinStep: 1,
								},
							]}
							series={[
								{
									dataKey: 'count',
									label: 'Позитивних',
									color: theme.palette.info.main,
								},
							]}
							grid={{ horizontal: true }}
						/>
					</ChartCard>
				</Grid>

				<Grid size={{ xs: 12, md: 6 }}>
					<ChartCard
						title="Провокаційний тест - позитивні за етапом"
						height={260}
					>
						<CustomBarChart
							isLoading={byStageMethod.isLoading}
							isError={byStageMethod.isError}
							dataset={challengeData}
							xAxis={[
								{
									scaleType: 'band',
									dataKey: 'name',
								},
							]}
							yAxis={[
								{
									tickMinStep: 1,
								},
							]}
							series={[
								{
									dataKey: 'count',
									label: 'Позитивних',
								},
							]}
							grid={{ horizontal: true }}
						/>
					</ChartCard>
				</Grid>
			</Grid>
		</Stack>
	);
}
