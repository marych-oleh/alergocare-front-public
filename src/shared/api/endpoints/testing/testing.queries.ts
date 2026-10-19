import { queryOptions } from '@tanstack/react-query';
import { testingAPI } from './testing.api';
import { PaginatedTestingsRequest } from './testing.model';

export const testingsKeys = {
	all: () => ['testings'] as const,
	lists: () => [...testingsKeys.all(), 'list'] as const,
	caseLists: (caseId: string) =>
		[...testingsKeys.lists(), 'case-testings', caseId] as const,
	caseList: (caseId: string, params: Record<string, any>) =>
		[...testingsKeys.caseLists(caseId), params] as const,
	details: () => [...testingsKeys.all(), 'detail'] as const,
	detail: (id: string) => [...testingsKeys.details(), id] as const,
};

export const testingsQueries = {
	caseList: (
		caseId: string,
		params: PaginatedTestingsRequest = { page: 1, pageSize: 20 }
	) =>
		queryOptions({
			queryKey: testingsKeys.caseList(caseId, params),
			queryFn: () => testingAPI.getCaseTestings(caseId, params),
			placeholderData: (previousData) => previousData,
			enabled: !!caseId,
		}),

	detail: (id: string) =>
		queryOptions({
			queryKey: testingsKeys.detail(id),
			queryFn: () => testingAPI.getTestingById(id),
			enabled: !!id,
		}),
};
