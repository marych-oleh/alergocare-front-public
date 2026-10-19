import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicationIcon from '@mui/icons-material/Medication';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import {
	useCasesByPeriod,
	useOverviewStatistics,
} from '~/shared/api/endpoints/statistics';
import { CustomLineChart } from '~/shared/ui/charts/CustomLineChart';
import { useStatisticsFiltersContext } from '../lib/StatisticsFiltersContext';
import { ChartCard } from '../ui/ChartCard';
import { StatisticValueCard } from '../ui/StatisticValueCard';

export default function TabOverview() {
	const { filters: f } = useStatisticsFiltersContext();
	const theme = useTheme();
	const overview = useOverviewStatistics(f);
	const trend = useCasesByPeriod(12, f);

	const stats = [
		{
			label: 'Пацієнтів',
			value: overview.data?.totalPatients ?? 0,
			icon: <PeopleAltIcon fontSize="large" />,
			color: theme.palette.primary.main,
		},
		{
			label: 'Звернень',
			value: overview.data?.totalCases ?? 0,
			icon: <LocalHospitalIcon fontSize="large" />,
			color: theme.palette.success.main,
		},
		{
			label: 'Тестувань',
			value: overview.data?.totalTestings ?? 0,
			icon: <MedicationIcon fontSize="large" />,
			color: theme.palette.warning.main,
			sub: `Препаратів: ${overview.data?.totalDrugs ?? 0}`,
		},
		{
			label: 'Позитивних реакцій',
			value: `${overview.data?.positiveTestingRate ?? 0}%`,
			icon: <CoronavirusIcon fontSize="large" />,
			color: theme.palette.error.main,
			sub: 'від усіх тестувань',
		},
	];

	return (
		<Stack spacing={3}>
			<Grid container spacing={2}>
				{stats.map((c) => (
					<Grid key={c.label} size={{ xs: 6, md: 3 }}>
						<StatisticValueCard {...c} isLoading={overview.isLoading} />
					</Grid>
				))}
			</Grid>

			<ChartCard title="Динаміка звернень - останні 12 місяців">
				<CustomLineChart
					isLoading={trend.isLoading}
					isError={trend.isError}
					dataset={trend.data ?? []}
					xAxis={[
						{
							scaleType: 'point',
							dataKey: 'period',
						},
					]}
					margin={{ top: 5, bottom: 5, left: 5, right: 30 }}
					yAxis={[
						{
							tickMinStep: 1,
						},
					]}
					hideLegend
					series={[
						{
							dataKey: 'count',
							label: 'Звернень',
							curve: 'monotoneX',
							color: theme.palette.primary.main,
						},
					]}
					grid={{ horizontal: true, vertical: true }}
				/>
			</ChartCard>
		</Stack>
	);
}
