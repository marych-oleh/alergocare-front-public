import { queryOptions } from '@tanstack/react-query';
import { casesAPI } from './cases.api';
import { PaginatedCasesRequest } from './cases.model';

export const casesKeys = {
	all: () => ['cases'] as const,
	lists: () => [...casesKeys.all(), 'list'] as const,
	list: (params: Record<string, any>) =>
		[...casesKeys.lists(), params] as const,
	patientLists: (patientId: string) =>
		[...casesKeys.lists(), 'patient-list', patientId] as const,
	patientList: (patientId: string, params: Record<string, any>) =>
		[...casesKeys.patientLists(patientId), params] as const,
	details: () => [...casesKeys.all(), 'detail'] as const,
	detail: (id: string) => [...casesKeys.details(), id] as const,
};

export const casesQueries = {
	list: (params: PaginatedCasesRequest = { page: 1, pageSize: 20 }) =>
		queryOptions({
			queryKey: casesKeys.list(params),
			queryFn: () => casesAPI.getCases(params),
			placeholderData: (previousData) => previousData,
		}),

	patientList: (
		patientId: string,
		params: PaginatedCasesRequest = { page: 1, pageSize: 20 }
	) =>
		queryOptions({
			queryKey: casesKeys.patientList(patientId, params),
			queryFn: () => casesAPI.getPatientCases(patientId, params),
			placeholderData: (previousData) => previousData,
			enabled: !!patientId,
		}),

	detail: (id: string) =>
		queryOptions({
			queryKey: casesKeys.detail(id),
			queryFn: () => casesAPI.getCaseById(id),
			enabled: !!id,
		}),
};
