import { queryOptions, useQuery } from '@tanstack/react-query';
import { comorbidityAPI } from './comorbidity.api';

export const comorbidityKeys = {
	all: () => ['comorbidities'] as const,
	options: () => [...comorbidityKeys.all(), 'options'] as const,
};

export const comorbidityQueries = {
	options: () =>
		queryOptions({
			queryKey: comorbidityKeys.options(),
			queryFn: () => comorbidityAPI.getComorbidities(),
			staleTime: 5 * 60 * 1000,
		}),
};

export const useComorbidityOptionsList = () => {
	return useQuery(comorbidityQueries.options());
};
