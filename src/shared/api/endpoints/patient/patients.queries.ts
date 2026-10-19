import { queryOptions } from '@tanstack/react-query';
import { patientsAPI } from './patients.api';
import { PaginatedPatientsRequest } from './patients.model';

export const patientsKeys = {
	all: () => ['patients'] as const,
	lists: () => [...patientsKeys.all(), 'list'] as const,
	list: (params: Record<string, any>) =>
		[...patientsKeys.lists(), params] as const,
	details: () => [...patientsKeys.all(), 'detail'] as const,
	detail: (id: string) => [...patientsKeys.details(), id] as const,
};

export const patientsQueries = {
	list: (params: PaginatedPatientsRequest = { page: 1, pageSize: 20 }) =>
		queryOptions({
			queryKey: patientsKeys.list(params),
			queryFn: () => patientsAPI.getPatients(params),
			placeholderData: (previousData) => previousData,
		}),

	detail: (id: string) =>
		queryOptions({
			queryKey: patientsKeys.detail(id),
			queryFn: () => patientsAPI.getPatientById(id),
			enabled: !!id,
		}),
};
