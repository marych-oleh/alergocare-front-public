import { useOutletContext } from 'react-router';
import { StatisticsFilters } from '~/shared/api/endpoints/statistics';

export type StatisticsFiltersContext = {
	filters: StatisticsFilters;
};
export const useStatisticsFiltersContext =
	useOutletContext<StatisticsFiltersContext>;
