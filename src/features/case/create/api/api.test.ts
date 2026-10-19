import { describe, it, expect } from 'vitest';
import { renderHook } from '../../../../test-utils';
import { useCreateCaseMutation, createCaseMutationKey } from './mutation';

describe('useCreateCaseMutation', () => {
	it('initializes without error', () => {
		const { result } = renderHook(() => useCreateCaseMutation());
		expect(result.current.mutate).toBeDefined();
		expect(result.current.isPending).toBe(false);
	});

	it('has correct mutation key', () => {
		expect(createCaseMutationKey).toEqual(['createCase']);
	});
});
