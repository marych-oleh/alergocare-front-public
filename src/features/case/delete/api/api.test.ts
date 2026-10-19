import { describe, it, expect } from 'vitest';
import { renderHook } from '../../../../test-utils';
import { useDeleteCaseMutation, deleteCaseMutationKey } from './mutation';

const CASE_ID = '123e4567-e89b-42d3-a456-426614174002';

describe('useDeleteCaseMutation', () => {
	it('initializes without error', () => {
		const { result } = renderHook(() => useDeleteCaseMutation(CASE_ID));
		expect(result.current.mutate).toBeDefined();
		expect(result.current.isPending).toBe(false);
	});

	it('has correct mutation key', () => {
		expect(deleteCaseMutationKey).toEqual(['deleteCase']);
	});
});
