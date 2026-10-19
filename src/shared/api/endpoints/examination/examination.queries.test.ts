import { describe, it, expect } from 'vitest';
import { examinationKeys, examinationQueries } from './examination.queries';

describe('examinationKeys', () => {
	it('all() returns base key', () => {
		expect(examinationKeys.all()).toEqual(['examinations']);
	});
	it('options() extends all', () => {
		expect(examinationKeys.options()).toContain('options');
	});
});

describe('examinationQueries', () => {
	it('options() returns queryOptions', () => {
		expect(examinationQueries.options().queryFn).toBeInstanceOf(Function);
	});
});
