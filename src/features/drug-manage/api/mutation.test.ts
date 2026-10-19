import { describe, it, expect } from 'vitest';
import { renderHook } from '../../../test-utils';
import { useCreateDrugMutation, createDrugMutationKey, useUpdateDrugMutation, useDeleteDrugMutation } from './mutation';

describe('drug mutations', () => {
	it('useCreateDrugMutation initializes', () => {
		const { result } = renderHook(() => useCreateDrugMutation());
		expect(result.current.mutate).toBeDefined();
		expect(result.current.isPending).toBe(false);
	});

	it('createDrugMutationKey is correct', () => {
		expect(createDrugMutationKey).toEqual(['createDrug']);
	});

	it('useUpdateDrugMutation initializes', () => {
		const { result } = renderHook(() => useUpdateDrugMutation());
		expect(result.current.mutate).toBeDefined();
	});

	it('useDeleteDrugMutation initializes', () => {
		const { result } = renderHook(() => useDeleteDrugMutation());
		expect(result.current.mutate).toBeDefined();
	});
});
