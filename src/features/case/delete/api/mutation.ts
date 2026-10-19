import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { casesKeys } from '~/shared/api/endpoints/case';
import { patientsKeys } from '~/shared/api/endpoints/patient';
import { deleteCase } from './api';

interface UseDeleteCaseOptions {
	onSuccess?: () => void;
}

export const deleteCaseMutationKey = ['deleteCase'];

export const useDeleteCaseMutation = (
	caseId: string,
	options?: UseDeleteCaseOptions
) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: deleteCaseMutationKey,
		mutationFn: () => deleteCase(caseId),
		meta: { skipGlobalInvalidation: true },
		onSuccess: async () => {
			await queryClient.cancelQueries({
				queryKey: casesKeys.detail(caseId),
			});

			queryClient.removeQueries({ queryKey: casesKeys.detail(caseId) });

			queryClient.invalidateQueries({ queryKey: casesKeys.lists() });
			queryClient.invalidateQueries({ queryKey: patientsKeys.all() });

			toast.success('Звернення успішно видалено');

			options?.onSuccess?.();
		},
	});
};
