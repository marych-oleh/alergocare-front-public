import { describe, it, expect } from 'vitest';
import { testingsFilterOperators, testingsDefaultFilters } from './testings-filter';

describe('testingsFilterOperators', () => {
	it('has createdAt operator', () => {
		expect(testingsFilterOperators.createdAt).toBe('contains');
	});
});

describe('testingsDefaultFilters', () => {
	it('is an object', () => {
		expect(testingsDefaultFilters).toBeDefined();
		expect(typeof testingsDefaultFilters).toBe('object');
	});
});
