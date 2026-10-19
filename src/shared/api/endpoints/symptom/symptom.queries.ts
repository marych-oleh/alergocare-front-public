import { queryOptions, useQuery } from '@tanstack/react-query';
import { symptomAPI } from './symptom.api';

export const symptomKeys = {
	all: () => ['symptoms'] as const,
	options: () => [...symptomKeys.all(), 'options'] as const,
};

export const symptomQueries = {
	options: () =>
		queryOptions({
			queryKey: symptomKeys.options(),
			queryFn: () => symptomAPI.getSymptoms(),
			staleTime: 5 * 60 * 1000,
		}),
};

export const useSymptomOptionsList = () => {
	return useQuery(symptomQueries.options());
};
