import { describe, it, expect } from 'vitest';
import { renderHook } from '../../../test-utils';
import { useCreateAllergyMutation, createAllergyMutationKey, useUpdateAllergyMutation, useDeleteAllergyMutation } from './mutation';

describe('allergy mutations', () => {
	it('useCreateAllergyMutation initializes', () => {
		const { result } = renderHook(() => useCreateAllergyMutation());
		expect(result.current.mutate).toBeDefined();
		expect(result.current.isPending).toBe(false);
	});

	it('createAllergyMutationKey is correct', () => {
		expect(createAllergyMutationKey).toEqual(['createAllergy']);
	});

	it('useUpdateAllergyMutation initializes', () => {
		const { result } = renderHook(() => useUpdateAllergyMutation());
		expect(result.current.mutate).toBeDefined();
	});

	it('useDeleteAllergyMutation initializes', () => {
		const { result } = renderHook(() => useDeleteAllergyMutation());
		expect(result.current.mutate).toBeDefined();
	});
});
