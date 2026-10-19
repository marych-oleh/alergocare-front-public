import { describe, it, expect } from 'vitest';
import {
	drugKeys,
	drugQueries,
	drugCategoryKeys,
	drugCategoryQueries,
} from './drug.queries';

describe('drugKeys', () => {
	it('all() returns base key', () => {
		expect(drugKeys.all()).toEqual(['drugs']);
	});
	it('options() extends all', () => {
		expect(drugKeys.options()).toContain('options');
	});
});

describe('drugCategoryKeys', () => {
	it('all() returns base key', () => {
		expect(drugCategoryKeys.all()).toEqual(['drugCategories']);
	});
	it('options() extends all', () => {
		expect(drugCategoryKeys.options()).toContain('options');
	});
	it('tree() extends all', () => {
		expect(drugCategoryKeys.tree()).toContain('tree');
	});
});

describe('drugQueries', () => {
	it('options() returns queryOptions', () => {
		const opts = drugQueries.options();
		expect(opts.queryFn).toBeInstanceOf(Function);
	});
});

describe('drugCategoryQueries', () => {
	it('options() returns queryOptions', () => {
		const opts = drugCategoryQueries.options();
		expect(opts.queryFn).toBeInstanceOf(Function);
	});
	it('tree() returns queryOptions', () => {
		const opts = drugCategoryQueries.tree();
		expect(opts.queryFn).toBeInstanceOf(Function);
	});
});
