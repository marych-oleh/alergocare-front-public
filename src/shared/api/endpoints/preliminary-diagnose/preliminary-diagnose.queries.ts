import { queryOptions, useQuery } from '@tanstack/react-query';
import { preliminaryDiagnoseAPI } from './preliminary-diagnose.api';

export const preliminaryDiagnoseKeys = {
	all: () => ['preliminaryDiagnose'] as const,
	options: () => [...preliminaryDiagnoseKeys.all(), 'options'] as const,
};

export const preliminaryDiagnoseQueries = {
	options: () =>
		queryOptions({
			queryKey: preliminaryDiagnoseKeys.options(),
			queryFn: () => preliminaryDiagnoseAPI.getPreliminaryDiagnoses(),
			staleTime: 5 * 60 * 1000,
		}),
};

export const usePreliminaryDiagnoseOptionsList = () => {
	return useQuery(preliminaryDiagnoseQueries.options());
};
