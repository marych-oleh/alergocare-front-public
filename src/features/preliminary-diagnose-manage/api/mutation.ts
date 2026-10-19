import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
	preliminaryDiagnoseAPI,
	preliminaryDiagnoseKeys,
	PreliminaryDiagnoseOption,
	PreliminaryDiagnoseWritePayload,
} from '~/shared/api/endpoints/preliminary-diagnose';

// CREATE
interface UseCreatePreliminaryDiagnoseOptions {
	onSuccess?: (data: PreliminaryDiagnoseOption) => void;
}

export const createPreliminaryDiagnoseMutationKey = [
	'createPreliminaryDiagnose',
];

export const useCreatePreliminaryDiagnoseMutation = (
	options?: UseCreatePreliminaryDiagnoseOptions
) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: createPreliminaryDiagnoseMutationKey,
		mutationFn: preliminaryDiagnoseAPI.createPreliminaryDiagnose,
		onSuccess: (created) => {
			toast.success(`${created.name} створено`);
			queryClient.invalidateQueries({
				queryKey: preliminaryDiagnoseKeys.options(),
			});

			options?.onSuccess?.(created);
		},
	});
};

// EDIT
export const useUpdatePreliminaryDiagnoseMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			id,
			data,
		}: {
			id: string;
			data: PreliminaryDiagnoseWritePayload;
		}) => preliminaryDiagnoseAPI.updatePreliminaryDiagnose(id, data),
		onSuccess: async (editted) => {
			toast.success(`${editted.name} оновлено`);
			return await queryClient.invalidateQueries({
				queryKey: preliminaryDiagnoseKeys.options(),
			});
		},
	});
};

// DELETE
interface UseDeletePreliminaryDiagnoseOptions {
	onSuccess?: () => void;
}

export const deletePreliminaryDiagnoseMutationKey = [
	'deletePreliminaryDiagnose',
];

export const useDeletePreliminaryDiagnoseMutation = (
	options?: UseDeletePreliminaryDiagnoseOptions
) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: deletePreliminaryDiagnoseMutationKey,
		mutationFn: preliminaryDiagnoseAPI.deletePreliminaryDiagnose,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: preliminaryDiagnoseKeys.options(),
			});
			toast.success('Елемент успішно видалено');

			options?.onSuccess?.();
		},
	});
};
