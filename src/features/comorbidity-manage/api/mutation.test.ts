import { describe, it, expect } from 'vitest';
import { renderHook } from '../../../test-utils';
import { useCreateComorbidityMutation, createComorbidityMutationKey, useUpdateComorbidityMutation, useDeleteComorbidityMutation } from './mutation';

describe('comorbidity mutations', () => {
	it('useCreateComorbidityMutation initializes', () => {
		const { result } = renderHook(() => useCreateComorbidityMutation());
		expect(result.current.mutate).toBeDefined();
		expect(result.current.isPending).toBe(false);
	});

	it('createComorbidityMutationKey is correct', () => {
		expect(createComorbidityMutationKey).toEqual(['createComorbidity']);
	});

	it('useUpdateComorbidityMutation initializes', () => {
		const { result } = renderHook(() => useUpdateComorbidityMutation());
		expect(result.current.mutate).toBeDefined();
	});

	it('useDeleteComorbidityMutation initializes', () => {
		const { result } = renderHook(() => useDeleteComorbidityMutation());
		expect(result.current.mutate).toBeDefined();
	});
});
