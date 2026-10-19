import { describe, it, expect } from 'vitest';
import { prefetchCase } from './queries';
import { createTestQueryClient } from '../../../test-utils';

describe('prefetchCase', () => {
	it('is a function', () => {
		expect(typeof prefetchCase).toBe('function');
	});

	it('returns a promise when called', () => {
		const queryClient = createTestQueryClient();
		const result = prefetchCase(queryClient, '123e4567-e89b-42d3-a456-426614174002');
		expect(result).toBeInstanceOf(Promise);
	});
});
