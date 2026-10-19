import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
	examinationAPI,
	examinationKeys,
	ExaminationOption,
	ExaminationWritePayload,
} from '~/shared/api/endpoints/examination';

// CREATE
interface UseCreateExaminationOptions {
	onSuccess?: (data: ExaminationOption) => void;
}

export const createExaminationMutationKey = ['createExamination'];

export const useCreateExaminationMutation = (
	options?: UseCreateExaminationOptions
) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: createExaminationMutationKey,
		mutationFn: examinationAPI.createExamination,
		onSuccess: (created) => {
			toast.success(`${created.name} створено`);
			queryClient.invalidateQueries({ queryKey: examinationKeys.options() });

			options?.onSuccess?.(created);
		},
	});
};

// EDIT
export const useUpdateExaminationMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			id,
			data,
		}: {
			id: string;
			data: ExaminationWritePayload;
		}) => examinationAPI.updateExamination(id, data),
		onSuccess: async (editted) => {
			toast.success(`${editted.name} оновлено`);
			return await queryClient.invalidateQueries({
				queryKey: examinationKeys.options(),
			});
		},
	});
};

// DELETE
interface UseDeleteExaminationOptions {
	onSuccess?: () => void;
}

export const deleteExaminationMutationKey = ['deleteExamination'];

export const useDeleteExaminationMutation = (
	options?: UseDeleteExaminationOptions
) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: deleteExaminationMutationKey,
		mutationFn: examinationAPI.deleteExamination,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: examinationKeys.options() });
			toast.success('Обстеження успішно видалено');

			options?.onSuccess?.();
		},
	});
};
