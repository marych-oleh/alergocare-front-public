import { describe, it, expect } from 'vitest';
import { renderHook } from '../../../test-utils';
import { useLogoutMutation } from './logout.mutation';

describe('useLogoutMutation', () => {
	it('initializes without error', () => {
		const { result } = renderHook(() => useLogoutMutation());
		expect(result.current.mutate).toBeDefined();
		expect(result.current.isPending).toBe(false);
	});
});
