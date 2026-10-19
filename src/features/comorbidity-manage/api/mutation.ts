import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
	comorbidityAPI,
	comorbidityKeys,
	ComorbidityOption,
	ComorbidityWritePayload,
} from '~/shared/api/endpoints/comorbidity';

// CREATE
interface UseCreateComorbidityOptions {
	onSuccess?: (data: ComorbidityOption) => void;
}

export const createComorbidityMutationKey = ['createComorbidity'];

export const useCreateComorbidityMutation = (
	options?: UseCreateComorbidityOptions
) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: createComorbidityMutationKey,
		mutationFn: comorbidityAPI.createComorbidity,
		onSuccess: (created) => {
			toast.success(`${created.name} створено`);
			queryClient.invalidateQueries({ queryKey: comorbidityKeys.options() });

			options?.onSuccess?.(created);
		},
	});
};

// EDIT
export const useUpdateComorbidityMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			id,
			data,
		}: {
			id: string;
			data: ComorbidityWritePayload;
		}) => comorbidityAPI.updateComorbidity(id, data),
		onSuccess: async (editted) => {
			toast.success(`${editted.name} оновлено`);
			return await queryClient.invalidateQueries({
				queryKey: comorbidityKeys.options(),
			});
		},
	});
};

// DELETE
interface UseDeleteComorbidityOptions {
	onSuccess?: () => void;
}

export const deleteComorbidityMutationKey = ['deleteComorbidity'];

export const useDeleteComorbidityMutation = (
	options?: UseDeleteComorbidityOptions
) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: deleteComorbidityMutationKey,
		mutationFn: comorbidityAPI.deleteComorbidity,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: comorbidityKeys.options() });
			toast.success('Елемент успішно видалено');

			options?.onSuccess?.();
		},
	});
};
