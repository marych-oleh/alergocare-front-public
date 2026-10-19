import { describe, it, expect } from 'vitest';
import { renderHook } from '../../../test-utils';
import { useLoginMutation } from './mutation';

describe('useLoginMutation', () => {
	it('initializes without error', () => {
		const { result } = renderHook(() => useLoginMutation());
		expect(result.current.mutate).toBeDefined();
		expect(result.current.isPending).toBe(false);
	});
});
