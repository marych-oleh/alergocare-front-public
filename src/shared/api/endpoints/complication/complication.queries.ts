import { queryOptions, useQuery } from '@tanstack/react-query';
import { complicationAPI } from './complication.api';

export const complicationKeys = {
	all: () => ['complications'] as const,
	options: () => [...complicationKeys.all(), 'options'] as const,
};

export const complicationQueries = {
	options: () =>
		queryOptions({
			queryKey: complicationKeys.options(),
			queryFn: () => complicationAPI.getComplications(),
			staleTime: 5 * 60 * 1000,
		}),
};

export const useComplicationOptionsList = () => {
	return useQuery(complicationQueries.options());
};
