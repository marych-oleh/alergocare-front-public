import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
	allergyAPI,
	allergyKeys,
	AllergyOption,
	AllergyWritePayload,
} from '~/shared/api/endpoints/allergy';

// CREATE
interface UseCreateAllergyOptions {
	onSuccess?: (data: AllergyOption) => void;
}

export const createAllergyMutationKey = ['createAllergy'];

export const useCreateAllergyMutation = (options?: UseCreateAllergyOptions) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: createAllergyMutationKey,
		mutationFn: allergyAPI.createAllergy,
		onSuccess: (created) => {
			toast.success(`${created.name} створено`);
			queryClient.invalidateQueries({ queryKey: allergyKeys.options() });

			options?.onSuccess?.(created);
		},
	});
};

// EDIT
export const useUpdateAllergyMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: AllergyWritePayload }) =>
			allergyAPI.updateAllergy(id, data),
		onSuccess: async (editted) => {
			toast.success(`${editted.name} оновлено`);
			return await queryClient.invalidateQueries({
				queryKey: allergyKeys.options(),
			});
		},
	});
};

// DELETE
interface UseDeleteAllergyOptions {
	onSuccess?: () => void;
}

export const deleteAllergyMutationKey = ['deleteAllergy'];

export const useDeleteAllergyMutation = (options?: UseDeleteAllergyOptions) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: deleteAllergyMutationKey,
		mutationFn: allergyAPI.deleteAllergy,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: allergyKeys.options() });
			toast.success('Елемент успішно видалено');

			options?.onSuccess?.();
		},
	});
};
