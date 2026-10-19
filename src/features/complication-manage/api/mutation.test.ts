import { describe, it, expect } from 'vitest';
import { renderHook } from '../../../test-utils';
import { useCreateComplicationMutation, createComplicationMutationKey, useUpdateComplicationMutation, useDeleteComplicationMutation } from './mutation';

describe('complication mutations', () => {
	it('useCreateComplicationMutation initializes', () => {
		const { result } = renderHook(() => useCreateComplicationMutation());
		expect(result.current.mutate).toBeDefined();
		expect(result.current.isPending).toBe(false);
	});

	it('createComplicationMutationKey is correct', () => {
		expect(createComplicationMutationKey).toEqual(['createComplication']);
	});

	it('useUpdateComplicationMutation initializes', () => {
		const { result } = renderHook(() => useUpdateComplicationMutation());
		expect(result.current.mutate).toBeDefined();
	});

	it('useDeleteComplicationMutation initializes', () => {
		const { result } = renderHook(() => useDeleteComplicationMutation());
		expect(result.current.mutate).toBeDefined();
	});
});
