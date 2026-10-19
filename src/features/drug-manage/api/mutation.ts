import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
	drugAPI,
	drugKeys,
	DrugOption,
	DrugWritePayload,
} from '~/shared/api/endpoints/drug';

// CREATE
interface UseCreateDrugOptions {
	onSuccess?: (data: DrugOption) => void;
}

export const createDrugMutationKey = ['createDrug'];

export const useCreateDrugMutation = (options?: UseCreateDrugOptions) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: createDrugMutationKey,
		mutationFn: drugAPI.createDrug,
		onSuccess: (created) => {
			toast.success(`${created.name} створено`);
			queryClient.invalidateQueries({ queryKey: drugKeys.options() });

			options?.onSuccess?.(created);
		},
	});
};

// EDIT
export const useUpdateDrugMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: DrugWritePayload }) =>
			drugAPI.updateDrug(id, data),
		onSuccess: async (editted) => {
			toast.success(`${editted.name} оновлено`);
			return await queryClient.invalidateQueries({
				queryKey: drugKeys.options(),
			});
		},
	});
};

// DELETE
interface UseDeleteDrugOptions {
	onSuccess?: () => void;
}

export const deleteDrugMutationKey = ['deleteDrug'];

export const useDeleteDrugMutation = (options?: UseDeleteDrugOptions) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: deleteDrugMutationKey,
		mutationFn: drugAPI.deleteDrug,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: drugKeys.options() });
			toast.success('Елемент успішно видалено');

			options?.onSuccess?.();
		},
	});
};
