import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
	complicationAPI,
	complicationKeys,
	ComplicationOption,
	ComplicationWritePayload,
} from '~/shared/api/endpoints/complication';

// CREATE
interface UseCreateComplicationOptions {
	onSuccess?: (data: ComplicationOption) => void;
}

export const createComplicationMutationKey = ['createComplication'];

export const useCreateComplicationMutation = (
	options?: UseCreateComplicationOptions
) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: createComplicationMutationKey,
		mutationFn: complicationAPI.createComplication,
		onSuccess: (created) => {
			toast.success(`${created.name} створено`);
			queryClient.invalidateQueries({
				queryKey: complicationKeys.options(),
			});

			options?.onSuccess?.(created);
		},
	});
};

// EDIT
export const useUpdateComplicationMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			id,
			data,
		}: {
			id: string;
			data: ComplicationWritePayload;
		}) => complicationAPI.updateComplication(id, data),
		onSuccess: async (editted) => {
			toast.success(`${editted.name} оновлено`);
			return await queryClient.invalidateQueries({
				queryKey: complicationKeys.options(),
			});
		},
	});
};

// DELETE
interface UseDeleteComplicationOptions {
	onSuccess?: () => void;
}

export const deleteComplicationMutationKey = ['deleteComplication'];

export const useDeleteComplicationMutation = (
	options?: UseDeleteComplicationOptions
) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: deleteComplicationMutationKey,
		mutationFn: complicationAPI.deleteComplication,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: complicationKeys.options(),
			});
			toast.success('Елемент успішно видалено');

			options?.onSuccess?.();
		},
	});
};
