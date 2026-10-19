import { queryOptions, useQuery } from '@tanstack/react-query';
import { examinationAPI } from './examination.api';

export const examinationKeys = {
	all: () => ['examinations'] as const,
	options: () => [...examinationKeys.all(), 'options'] as const,
};

export const examinationQueries = {
	options: () =>
		queryOptions({
			queryKey: examinationKeys.options(),
			queryFn: () => examinationAPI.getExaminations(),
			staleTime: 5 * 60 * 1000,
		}),
};

export const useExaminationOptionsList = () => {
	return useQuery(examinationQueries.options());
};
