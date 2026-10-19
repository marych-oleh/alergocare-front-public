import { describe, it, expect } from 'vitest';
import { renderHook } from '../../../test-utils';
import { useCreateSymptomMutation, createSymptomMutationKey, useUpdateSymptomMutation, useDeleteSymptomMutation } from './mutation';

describe('symptom mutations', () => {
	it('useCreateSymptomMutation initializes', () => {
		const { result } = renderHook(() => useCreateSymptomMutation());
		expect(result.current.mutate).toBeDefined();
		expect(result.current.isPending).toBe(false);
	});

	it('createSymptomMutationKey is correct', () => {
		expect(createSymptomMutationKey).toEqual(['createSymptom']);
	});

	it('useUpdateSymptomMutation initializes', () => {
		const { result } = renderHook(() => useUpdateSymptomMutation());
		expect(result.current.mutate).toBeDefined();
	});

	it('useDeleteSymptomMutation initializes', () => {
		const { result } = renderHook(() => useDeleteSymptomMutation());
		expect(result.current.mutate).toBeDefined();
	});
});
