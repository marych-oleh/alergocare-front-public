import { describe, it, expect } from 'vitest';
import { allergyKeys, allergyQueries } from './allergy.queries';

describe('allergyKeys', () => {
	it('all() returns base key', () => {
		expect(allergyKeys.all()).toEqual(['allergies']);
	});

	it('options() extends all', () => {
		expect(allergyKeys.options()).toContain('options');
	});
});

describe('allergyQueries', () => {
	it('options() returns queryOptions', () => {
		const opts = allergyQueries.options();
		expect(opts.queryFn).toBeInstanceOf(Function);
		expect(opts.queryKey).toBeDefined();
	});
});
