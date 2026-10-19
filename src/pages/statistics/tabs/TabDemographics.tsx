import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import { DISCOVERY_METHOD_LABEL } from '~/entities/patient';
import {
	useComorbidityPresence,
	usePatientDemographics,
} from '~/shared/api/endpoints/statistics';
import { CustomBarChart } from '~/shared/ui/charts/CustomBarChart';
import { CustomPieChart } from '~/shared/ui/charts/CustomPieChart';
import { useStatisticsFiltersContext } from '../lib/StatisticsFiltersContext';
import { ChartCard } from '../ui/ChartCard';
import { createArcPercentageLabel } from '../ui/createArcPercentageLabel';

export default function TabDemographics() {
	const { filters: f } = useStatisticsFiltersContext();
	const theme = useTheme();
	const demo = usePatientDemographics(f);
	const comorbidityPresence = useComorbidityPresence(f);

	const genderData = [
		{
			id: 'male',
			label: 'Чоловіки',
			value: demo.data?.gender.male ?? 0,
			color: '#2196f3',
		},
		{
			id: 'female',
			label: 'Жінки',
			value: demo.data?.gender.female ?? 0,
			color: '#e91e63',
		},
	].filter((d) => d.value > 0);

	const comorbidityData =
		comorbidityPresence.data ?
			[
				{
					id: 'with',
					label: 'Є супутні хвороби',
					value: comorbidityPresence.data.withCount,
					color: '#ff9800',
				},
				{
					id: 'without',
					label: 'Без супутніх хвороб',
					value: comorbidityPresence.data.withoutCount,
					color: '#4caf50',
				},
			].filter((d) => d.value > 0)
		:	[];

	const discoveryData = (demo.data?.discoveryMethods ?? []).map((d) => ({
		...d,
		name: DISCOVERY_METHOD_LABEL[d.name] ?? d.name,
	}));

	return (
		<Stack spacing={3}>
			<Grid container spacing={2}>
				<Grid size={{ xs: 12, md: 8 }} order={{ xs: 1, md: 1 }}>
					<ChartCard title="Вікові групи" height={240}>
						<CustomBarChart
							isLoading={demo.isLoading}
							isError={demo.isError}
							dataset={demo.data?.ageGroups ?? []}
							xAxis={[
								{
									scaleType: 'band',
									dataKey: 'ageGroup',
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
									label: 'Пацієнтів',
									color: theme.palette.primary.main,
								},
							]}
							grid={{ horizontal: true }}
						/>
					</ChartCard>
				</Grid>

				<Grid size={{ xs: 12, sm: 6, md: 4 }} order={{ xs: 2, md: 2 }}>
					<ChartCard title="Розподіл за статтю" height={240}>
						<CustomPieChart
							isLoading={demo.isLoading}
							isError={demo.isError}
							series={[
								{
									data: genderData,
									outerRadius: 85,
									arcLabel: createArcPercentageLabel(genderData),
								},
							]}
						/>
					</ChartCard>
				</Grid>

				<Grid size={{ xs: 12, sm: 6, md: 4 }} order={{ xs: 3, md: 4 }}>
					<ChartCard title="Супутні захворювання" height={240}>
						<CustomPieChart
							isLoading={comorbidityPresence.isLoading}
							isError={comorbidityPresence.isError}
							series={[
								{
									data: comorbidityData,
									outerRadius: 85,
									arcLabel: createArcPercentageLabel(comorbidityData),
								},
							]}
						/>
					</ChartCard>
				</Grid>

				<Grid size={{ xs: 12, md: 8 }} order={{ xs: 4, md: 3 }}>
					<ChartCard title="Як дізнався про медичний центр" height={240}>
						<CustomBarChart
							isLoading={demo.isLoading}
							isError={demo.isError}
							dataset={discoveryData}
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
									label: 'Пацієнтів',
									color: theme.palette.info.main,
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
