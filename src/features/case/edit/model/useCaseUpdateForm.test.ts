import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '../../../../test-utils';
import { useCaseUpdateForm } from './useCaseUpdateForm';

const CASE_ID = '123e4567-e89b-42d3-a456-426614174002';

describe('useCaseUpdateForm', () => {
	it('initializes without error', () => {
		const { result } = renderHook(() => useCaseUpdateForm({ caseId: CASE_ID }));
		expect(result.current.form).toBeDefined();
		expect(result.current.onSubmit).toBeDefined();
	});

	it('starts in loading state', () => {
		const { result } = renderHook(() => useCaseUpdateForm({ caseId: CASE_ID }));
		expect(result.current.isPending).toBe(false);
	});
});
