import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { CaseDetail } from '~/shared/api/endpoints/case';
import { createCase } from './api';

interface UseCreateCaseOptions {
	onSuccess?: (data: CaseDetail) => void;
}

export const createCaseMutationKey = ['createCase'];

export const useCreateCaseMutation = (options?: UseCreateCaseOptions) => {
	return useMutation({
		mutationKey: createCaseMutationKey,
		mutationFn: createCase,
		onSuccess: (newCase) => {
			toast.success(`Звернення для ${newCase.patient.surname} створено`);
			options?.onSuccess?.(newCase);
		},
	});
};
