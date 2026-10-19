import { describe, it, expect } from 'vitest';
import { prefetchPatient } from './queries';
import { createTestQueryClient } from '../../../test-utils';

describe('prefetchPatient', () => {
	it('is a function', () => {
		expect(typeof prefetchPatient).toBe('function');
	});

	it('returns a promise when called', () => {
		const queryClient = createTestQueryClient();
		const result = prefetchPatient(queryClient, '123e4567-e89b-42d3-a456-426614174001');
		expect(result).toBeInstanceOf(Promise);
	});
});
