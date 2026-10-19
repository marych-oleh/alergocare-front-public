import { QueryClient } from '@tanstack/react-query';
import { casesQueries } from '~/shared/api/endpoints/case';

export const prefetchCase = async (queryClient: QueryClient, id: string) => {
	return await queryClient.ensureQueryData(casesQueries.detail(id));
};
