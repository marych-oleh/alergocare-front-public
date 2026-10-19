import { describe, it, expect, beforeEach } from 'vitest';
import { getCookie } from './cookie';

describe('getCookie', () => {
	beforeEach(() => {
		Object.defineProperty(document, 'cookie', {
			writable: true,
			value: '',
		});
	});

	it('returns null when cookie does not exist', () => {
		document.cookie = '';
		expect(getCookie('csrf-token')).toBeNull();
	});

	it('returns cookie value when it exists', () => {
		document.cookie = 'csrf-token=abc123';
		expect(getCookie('csrf-token')).toBe('abc123');
	});

	it('returns correct value when multiple cookies are present', () => {
		document.cookie = 'other=xyz; csrf-token=mytoken; another=val';
		expect(getCookie('csrf-token')).toBe('mytoken');
	});

	it('returns null when searching for a non-existent cookie among many', () => {
		document.cookie = 'a=1; b=2; c=3';
		expect(getCookie('missing')).toBeNull();
	});
});
