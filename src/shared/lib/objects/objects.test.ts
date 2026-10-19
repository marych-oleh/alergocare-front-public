import { describe, it, expect } from 'vitest';
import { clearEmpties } from './objects';

describe('clearEmpties', () => {
	it('removes null values', () => {
		expect(clearEmpties({ a: 1, b: null })).toEqual({ a: 1 });
	});

	it('removes undefined values', () => {
		expect(clearEmpties({ a: 'x', b: undefined })).toEqual({ a: 'x' });
	});

	it('removes empty string values', () => {
		expect(clearEmpties({ a: 'x', b: '' })).toEqual({ a: 'x' });
	});

	it('keeps falsy number 0', () => {
		expect(clearEmpties({ a: 0, b: 1 })).toEqual({ a: 0, b: 1 });
	});

	it('keeps false booleans', () => {
		expect(clearEmpties({ a: false, b: true })).toEqual({ a: false, b: true });
	});

	it('removes empty nested objects', () => {
		expect(clearEmpties({ a: 1, b: {} })).toEqual({ a: 1 });
	});

	it('recursively cleans nested objects', () => {
		expect(clearEmpties({ outer: { inner: null, keep: 'yes' } })).toEqual({
			outer: { keep: 'yes' },
		});
	});

	it('keeps arrays as-is', () => {
		expect(clearEmpties({ a: [1, 2, 3] })).toEqual({ a: [1, 2, 3] });
	});

	it('keeps non-empty nested objects', () => {
		expect(clearEmpties({ a: { b: 1 } })).toEqual({ a: { b: 1 } });
	});

	it('returns empty object when all values are empty', () => {
		expect(clearEmpties({ a: null, b: undefined, c: '' })).toEqual({});
	});

	it('handles empty input', () => {
		expect(clearEmpties({})).toEqual({});
	});
});
