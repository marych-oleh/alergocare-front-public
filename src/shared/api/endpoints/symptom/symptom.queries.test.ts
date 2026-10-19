import { describe, it, expect } from 'vitest';
import { symptomKeys, symptomQueries } from './symptom.queries';

describe('symptomKeys', () => {
	it('all() returns base key', () => {
		expect(symptomKeys.all()).toEqual(['symptoms']);
	});
	it('options() extends all', () => {
		expect(symptomKeys.options()).toContain('options');
	});
});

describe('symptomQueries', () => {
	it('options() returns queryOptions', () => {
		const opts = symptomQueries.options();
		expect(opts.queryFn).toBeInstanceOf(Function);
	});
});
