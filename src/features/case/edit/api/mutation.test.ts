import { describe, it, expect } from 'vitest';
import { renderHook } from '../../../../test-utils';
import { useUpdateCaseMutation } from './mutation';

const CASE_ID = '123e4567-e89b-42d3-a456-426614174002';

describe('useUpdateCaseMutation', () => {
	it('initializes without error', () => {
		const { result } = renderHook(() => useUpdateCaseMutation(CASE_ID));
		expect(result.current.mutate).toBeDefined();
		expect(result.current.isPending).toBe(false);
	});
});
