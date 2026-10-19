import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { TestingDetail } from '~/shared/api/endpoints/testing';
import { createTesting } from './api';

interface UseCreateTestingOptions {
	onSuccess?: (data: TestingDetail) => void;
}

export const createTestingMutationKey = ['createTesting'];

export const useCreateTestingMutation = (options?: UseCreateTestingOptions) => {
	return useMutation({
		mutationKey: createTestingMutationKey,
		mutationFn: createTesting,
		onSuccess: (newTesting) => {
			toast.success(`Алерготестування створено`);
			options?.onSuccess?.(newTesting);
		},
	});
};
