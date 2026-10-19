import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { TestingWritePayload } from '~/shared/api/endpoints/testing';
import { updateTesting } from './api';

export const useUpdateTestingMutation = (testingId: string) => {
	return useMutation({
		mutationFn: (data: TestingWritePayload) => updateTesting(testingId, data),
		onSuccess: async (editted) => {
			toast.success(`Тестування оновлено`);
		},
	});
};
