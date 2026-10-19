import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Outlet } from 'react-router';
import { StatisticsFilters } from '~/shared/api/endpoints/statistics';
import { defaultStatisticsFilters } from '~/shared/api/endpoints/statistics/statistics.schema';
import { StatisticsFiltersContext } from '../lib/StatisticsFiltersContext';
import { StatisticsFiltersPanel } from './StatisticsFiltersPanel';

export function StatisticsPage() {
	const [filters, setFilters] = useState<StatisticsFilters>(
		defaultStatisticsFilters
	);

	const activeCount = Object.values(filters).filter(Boolean).length;

	return (
		<Box sx={{ py: 2 }}>
			<Stack
				direction="row"
				alignItems="center"
				justifyContent="space-between"
				mb={2.5}
			>
				<Typography variant="h5" fontWeight={700}>
					Статистика медикаментозної алергії
				</Typography>
				{activeCount > 0 && (
					<Chip
						label={`${activeCount} ${activeCount === 1 ? 'фільтр' : 'фільтри'} активні`}
						color="primary"
						size="small"
					/>
				)}
			</Stack>

			<StatisticsFiltersPanel filters={filters} onChange={setFilters} />

			<Outlet context={{ filters } satisfies StatisticsFiltersContext} />
		</Box>
	);
}
