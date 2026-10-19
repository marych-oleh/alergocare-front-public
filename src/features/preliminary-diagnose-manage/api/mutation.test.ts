import { describe, it, expect } from 'vitest';
import { renderHook } from '../../../test-utils';
import { useCreatePreliminaryDiagnoseMutation, createPreliminaryDiagnoseMutationKey, useUpdatePreliminaryDiagnoseMutation, useDeletePreliminaryDiagnoseMutation } from './mutation';

describe('preliminary diagnose mutations', () => {
	it('useCreatePreliminaryDiagnoseMutation initializes', () => {
		const { result } = renderHook(() => useCreatePreliminaryDiagnoseMutation());
		expect(result.current.mutate).toBeDefined();
		expect(result.current.isPending).toBe(false);
	});

	it('createPreliminaryDiagnoseMutationKey is correct', () => {
		expect(createPreliminaryDiagnoseMutationKey).toEqual(['createPreliminaryDiagnose']);
	});

	it('useUpdatePreliminaryDiagnoseMutation initializes', () => {
		const { result } = renderHook(() => useUpdatePreliminaryDiagnoseMutation());
		expect(result.current.mutate).toBeDefined();
	});

	it('useDeletePreliminaryDiagnoseMutation initializes', () => {
		const { result } = renderHook(() => useDeletePreliminaryDiagnoseMutation());
		expect(result.current.mutate).toBeDefined();
	});
});
