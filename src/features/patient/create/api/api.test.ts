import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '../../../../test-utils';
import { useCreatePatientMutation } from './mutation';

describe('useCreatePatientMutation', () => {
	it('initializes without error', () => {
		const { result } = renderHook(() => useCreatePatientMutation());
		expect(result.current.mutate).toBeDefined();
		expect(result.current.isPending).toBe(false);
	});

	it('has correct mutation key', async () => {
		const { createPatientMutationKey } = await import('./mutation');
		expect(createPatientMutationKey).toEqual(['createPatient']);
	});
});
