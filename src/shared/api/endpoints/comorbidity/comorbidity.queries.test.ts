import { describe, it, expect } from 'vitest';
import { comorbidityKeys, comorbidityQueries } from './comorbidity.queries';

describe('comorbidityKeys', () => {
	it('all() returns base key', () => {
		expect(comorbidityKeys.all()).toEqual(['comorbidities']);
	});
	it('options() extends all', () => {
		expect(comorbidityKeys.options()).toContain('options');
	});
});

describe('comorbidityQueries', () => {
	it('options() returns queryOptions', () => {
		expect(comorbidityQueries.options().queryFn).toBeInstanceOf(Function);
	});
});
