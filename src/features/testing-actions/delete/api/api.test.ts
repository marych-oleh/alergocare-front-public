import { describe, it, expect } from 'vitest';
import { renderHook } from '../../../../test-utils';
import { useDeleteTestingMutation, deleteTestingMutationKey } from './mutation';

const TESTING_ID = '123e4567-e89b-42d3-a456-426614174020';

describe('useDeleteTestingMutation', () => {
	it('initializes without error', () => {
		const { result } = renderHook(() => useDeleteTestingMutation(TESTING_ID));
		expect(result.current.mutate).toBeDefined();
		expect(result.current.isPending).toBe(false);
	});

	it('has correct mutation key', () => {
		expect(deleteTestingMutationKey).toEqual(['deleteTesting']);
	});
});
