import { queryOptions, useQuery } from '@tanstack/react-query';
import { allergyAPI } from './allergy.api';

export const allergyKeys = {
	all: () => ['allergies'] as const,
	options: () => [...allergyKeys.all(), 'options'] as const,
};

export const allergyQueries = {
	options: () =>
		queryOptions({
			queryKey: allergyKeys.options(),
			queryFn: () => allergyAPI.getAllergies(),
			staleTime: 5 * 60 * 1000,
		}),
};

export const useAllergyOptionsList = () => {
	return useQuery(allergyQueries.options());
};
