import { describe, it, expect } from 'vitest';
import { preliminaryDiagnoseKeys, preliminaryDiagnoseQueries } from './preliminary-diagnose.queries';

describe('preliminaryDiagnoseKeys', () => {
	it('all() returns base key', () => {
		expect(preliminaryDiagnoseKeys.all()).toEqual(['preliminaryDiagnose']);
	});
	it('options() extends all', () => {
		expect(preliminaryDiagnoseKeys.options()).toContain('options');
	});
});

describe('preliminaryDiagnoseQueries', () => {
	it('options() returns queryOptions', () => {
		expect(preliminaryDiagnoseQueries.options().queryFn).toBeInstanceOf(Function);
	});
});
