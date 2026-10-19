import { describe, it, expect } from 'vitest';
import { renderHook } from '../../../../test-utils';
import { useDeletePatientMutation, deletePatientMutationKey } from './mutation';

const PATIENT_ID = '123e4567-e89b-42d3-a456-426614174001';

describe('useDeletePatientMutation', () => {
	it('initializes without error', () => {
		const { result } = renderHook(() => useDeletePatientMutation(PATIENT_ID));
		expect(result.current.mutate).toBeDefined();
		expect(result.current.isPending).toBe(false);
	});

	it('has correct mutation key', () => {
		expect(deletePatientMutationKey).toEqual(['deletePatient']);
	});
});
