import { describe, it, expect } from 'vitest';
import { complicationKeys, complicationQueries } from './complication.queries';

describe('complicationKeys', () => {
	it('all() returns base key', () => {
		expect(complicationKeys.all()).toEqual(['complications']);
	});
	it('options() extends all', () => {
		expect(complicationKeys.options()).toContain('options');
	});
});

describe('complicationQueries', () => {
	it('options() returns queryOptions', () => {
		const opts = complicationQueries.options();
		expect(opts.queryFn).toBeInstanceOf(Function);
	});
});
