import { QueryClient } from '@tanstack/react-query';
import { patientsQueries } from '~/shared/api/endpoints/patient';

export const prefetchPatient = async (queryClient: QueryClient, id: string) => {
	return await queryClient.ensureQueryData(patientsQueries.detail(id));
};
