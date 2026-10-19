import { describe, it, expect } from 'vitest';
import { renderHook } from '../../../../test-utils';
import { useCreateTestingMutation, createTestingMutationKey } from './mutation';

describe('useCreateTestingMutation', () => {
	it('initializes without error', () => {
		const { result } = renderHook(() => useCreateTestingMutation());
		expect(result.current.mutate).toBeDefined();
		expect(result.current.isPending).toBe(false);
	});

	it('has correct mutation key', () => {
		expect(createTestingMutationKey).toEqual(['createTesting']);
	});
});
