import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { testingsKeys } from '~/shared/api/endpoints/testing';
import { deleteTesting } from './api';

interface UseDeleteTestingOptions {
	onSuccess?: () => void;
}

export const deleteTestingMutationKey = ['deleteTesting'];

export const useDeleteTestingMutation = (
	testingId: string,
	options?: UseDeleteTestingOptions
) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: deleteTestingMutationKey,
		mutationFn: () => deleteTesting(testingId),
		meta: { skipGlobalInvalidation: true },
		onSuccess: async () => {
			await queryClient.cancelQueries({
				queryKey: testingsKeys.detail(testingId),
			});

			queryClient.removeQueries({
				queryKey: testingsKeys.detail(testingId),
			});

			queryClient.invalidateQueries({ queryKey: testingsKeys.all() });

			toast.success('Алерготестування успішно видалено');

			options?.onSuccess?.();
		},
	});
};
