import { describe, it, expect } from 'vitest';
import { patientsKeys, patientsQueries } from './patients.queries';

describe('patientsKeys', () => {
	it('all() returns base key', () => {
		expect(patientsKeys.all()).toEqual(['patients']);
	});

	it('lists() extends all key', () => {
		expect(patientsKeys.lists()).toEqual(['patients', 'list']);
	});

	it('list(params) includes params', () => {
		const params = { page: 1 };
		expect(patientsKeys.list(params)).toContain(params);
	});

	it('details() extends all key', () => {
		expect(patientsKeys.details()).toEqual(['patients', 'detail']);
	});

	it('detail(id) includes id', () => {
		expect(patientsKeys.detail('abc')).toContain('abc');
	});
});

describe('patientsQueries', () => {
	it('list() returns queryOptions with correct queryKey', () => {
		const options = patientsQueries.list();
		expect(options.queryKey).toBeDefined();
		expect(options.queryFn).toBeInstanceOf(Function);
	});

	it('detail(id) returns queryOptions with correct queryKey', () => {
		const options = patientsQueries.detail('test-id');
		expect(options.queryKey).toContain('test-id');
		expect(options.queryFn).toBeInstanceOf(Function);
	});

	it('detail(empty id) has enabled=false', () => {
		const options = patientsQueries.detail('');
		expect(options.enabled).toBe(false);
	});
});
