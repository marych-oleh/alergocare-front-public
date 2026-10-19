import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
	symptomAPI,
	symptomKeys,
	SymptomOption,
	SymptomWritePayload,
} from '~/shared/api/endpoints/symptom';

// CREATE
interface UseCreateSymptomOptions {
	onSuccess?: (data: SymptomOption) => void;
}

export const createSymptomMutationKey = ['createSymptom'];

export const useCreateSymptomMutation = (options?: UseCreateSymptomOptions) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: createSymptomMutationKey,
		mutationFn: symptomAPI.createSymptom,
		onSuccess: (created) => {
			toast.success(`${created.name} створено`);
			queryClient.invalidateQueries({ queryKey: symptomKeys.options() });

			options?.onSuccess?.(created);
		},
	});
};

// EDIT
export const useUpdateSymptomMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: SymptomWritePayload }) =>
			symptomAPI.updateSymptom(id, data),
		onSuccess: async (editted) => {
			toast.success(`${editted.name} оновлено`);
			return await queryClient.invalidateQueries({
				queryKey: symptomKeys.options(),
			});
		},
	});
};

// DELETE
interface UseDeleteSymptomOptions {
	onSuccess?: () => void;
}

export const deleteSymptomMutationKey = ['deleteSymptom'];

export const useDeleteSymptomMutation = (options?: UseDeleteSymptomOptions) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: deleteSymptomMutationKey,
		mutationFn: symptomAPI.deleteSymptom,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: symptomKeys.options() });
			toast.success('Елемент успішно видалено');

			options?.onSuccess?.();
		},
	});
};
