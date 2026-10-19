import Stack from '@mui/material/Stack';
import {
	useDrugCategoryDistribution,
	useTopDrugs,
} from '~/shared/api/endpoints/statistics';
import { CustomBarChart } from '~/shared/ui/charts/CustomBarChart';
import { useStatisticsFiltersContext } from '../lib/StatisticsFiltersContext';
import { ChartCard } from '../ui/ChartCard';

export default function TabDrugs() {
	const { filters: f } = useStatisticsFiltersContext();
	const topDrugs = useTopDrugs(10, f);
	const drugCats = useDrugCategoryDistribution(f);

	return (
		<Stack spacing={3}>
			<ChartCard
				title="Топ-10 препаратів за кількістю тестувань"
				height={320}
			>
				<CustomBarChart
					isLoading={topDrugs.isLoading}
					isError={topDrugs.isError}
					dataset={topDrugs.data ?? []}
					layout="horizontal"
					yAxis={[
						{
							dataKey: 'name',
							width: 'auto',
						},
					]}
					series={[
						{
							dataKey: 'count',
							label: 'Тестувань',
						},
					]}
					grid={{ vertical: true }}
				/>
			</ChartCard>

			<ChartCard title="Тестування за категоріями препаратів" height={260}>
				<CustomBarChart
					isLoading={drugCats.isLoading}
					isError={drugCats.isError}
					dataset={drugCats.data ?? []}
					xAxis={[
						{
							scaleType: 'band',
							dataKey: 'name',
						},
					]}
					series={[
						{
							dataKey: 'count',
							label: 'Тестувань',
						},
					]}
					grid={{ horizontal: true }}
				/>
			</ChartCard>
		</Stack>
	);
}
