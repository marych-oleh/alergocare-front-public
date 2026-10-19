import { describe, it, expect } from 'vitest';
import { renderHook } from '../../../test-utils';
import { useCreateExaminationMutation, createExaminationMutationKey, useUpdateExaminationMutation, useDeleteExaminationMutation } from './mutation';

describe('examination mutations', () => {
	it('useCreateExaminationMutation initializes', () => {
		const { result } = renderHook(() => useCreateExaminationMutation());
		expect(result.current.mutate).toBeDefined();
		expect(result.current.isPending).toBe(false);
	});

	it('createExaminationMutationKey is correct', () => {
		expect(createExaminationMutationKey).toEqual(['createExamination']);
	});

	it('useUpdateExaminationMutation initializes', () => {
		const { result } = renderHook(() => useUpdateExaminationMutation());
		expect(result.current.mutate).toBeDefined();
	});

	it('useDeleteExaminationMutation initializes', () => {
		const { result } = renderHook(() => useDeleteExaminationMutation());
		expect(result.current.mutate).toBeDefined();
	});
});
