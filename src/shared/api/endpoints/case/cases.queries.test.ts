import { describe, it, expect } from 'vitest';
import { casesKeys, casesQueries } from './cases.queries';

describe('casesKeys', () => {
	it('all() returns base key', () => {
		expect(casesKeys.all()).toEqual(['cases']);
	});

	it('lists() extends all', () => {
		expect(casesKeys.lists()).toContain('list');
	});

	it('list(params) contains params', () => {
		const params = { page: 2 };
		expect(casesKeys.list(params)).toContain(params);
	});

	it('patientLists(patientId) contains patientId', () => {
		expect(casesKeys.patientLists('pid')).toContain('pid');
	});

	it('patientList(patientId, params) contains both', () => {
		const params = { page: 1 };
		const key = casesKeys.patientList('pid', params);
		expect(key).toContain('pid');
		expect(key).toContain(params);
	});

	it('details() extends all', () => {
		expect(casesKeys.details()).toContain('detail');
	});

	it('detail(id) contains id', () => {
		expect(casesKeys.detail('cid')).toContain('cid');
	});
});

describe('casesQueries', () => {
	it('list() returns queryOptions', () => {
		const opts = casesQueries.list();
		expect(opts.queryFn).toBeInstanceOf(Function);
	});

	it('patientList(patientId) returns queryOptions', () => {
		const opts = casesQueries.patientList('pid');
		expect(opts.queryFn).toBeInstanceOf(Function);
		expect(opts.enabled).toBe(true);
	});

	it('patientList(empty) is disabled', () => {
		const opts = casesQueries.patientList('');
		expect(opts.enabled).toBe(false);
	});

	it('detail(id) returns queryOptions with enabled=true', () => {
		const opts = casesQueries.detail('cid');
		expect(opts.enabled).toBe(true);
	});

	it('detail(empty id) is disabled', () => {
		const opts = casesQueries.detail('');
		expect(opts.enabled).toBe(false);
	});
});
