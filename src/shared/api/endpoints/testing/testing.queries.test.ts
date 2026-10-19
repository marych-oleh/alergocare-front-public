import { describe, it, expect } from 'vitest';
import { testingsKeys, testingsQueries } from './testing.queries';

describe('testingsKeys', () => {
	it('all() returns base key', () => {
		expect(testingsKeys.all()).toEqual(['testings']);
	});

	it('lists() extends all', () => {
		expect(testingsKeys.lists()).toContain('list');
	});

	it('caseLists(caseId) contains caseId', () => {
		expect(testingsKeys.caseLists('cid')).toContain('cid');
	});

	it('caseList(caseId, params) contains both', () => {
		const params = { page: 1 };
		const key = testingsKeys.caseList('cid', params);
		expect(key).toContain('cid');
		expect(key).toContain(params);
	});

	it('details() contains detail', () => {
		expect(testingsKeys.details()).toContain('detail');
	});

	it('detail(id) contains id', () => {
		expect(testingsKeys.detail('tid')).toContain('tid');
	});
});

describe('testingsQueries', () => {
	it('caseList(caseId) returns queryOptions with enabled=true', () => {
		const opts = testingsQueries.caseList('cid');
		expect(opts.queryFn).toBeInstanceOf(Function);
		expect(opts.enabled).toBe(true);
	});

	it('caseList(empty) is disabled', () => {
		const opts = testingsQueries.caseList('');
		expect(opts.enabled).toBe(false);
	});

	it('detail(id) is enabled', () => {
		const opts = testingsQueries.detail('tid');
		expect(opts.enabled).toBe(true);
	});

	it('detail(empty) is disabled', () => {
		const opts = testingsQueries.detail('');
		expect(opts.enabled).toBe(false);
	});
});
