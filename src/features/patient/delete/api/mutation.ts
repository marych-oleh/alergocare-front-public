import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { patientsKeys } from '~/shared/api/endpoints/patient';
import { deletePatient } from './api';

interface UseDeletePatientOptions {
	onSuccess?: () => void;
}

export const deletePatientMutationKey = ['deletePatient'];

export const useDeletePatientMutation = (
	patientId: string,
	options?: UseDeletePatientOptions
) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: deletePatientMutationKey,
		mutationFn: () => deletePatient(patientId),
		meta: { skipGlobalInvalidation: true },
		onSuccess: async () => {
			await queryClient.cancelQueries({
				queryKey: patientsKeys.detail(patientId),
			});

			queryClient.removeQueries({
				queryKey: patientsKeys.detail(patientId),
			});

			queryClient.invalidateQueries({ queryKey: patientsKeys.all() });

			toast.success('Пацієнта успішно видалено');

			options?.onSuccess?.();
		},
	});
};
