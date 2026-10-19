import { describe, it, expect } from 'vitest';
import { api, unauthorisedApi } from './api.instance';

describe('api instance', () => {
	it('exports api service', () => {
		expect(api).toBeDefined();
		expect(typeof api.get).toBe('function');
		expect(typeof api.post).toBe('function');
		expect(typeof api.delete).toBe('function');
	});

	it('exports unauthorisedApi service', () => {
		expect(unauthorisedApi).toBeDefined();
		expect(typeof unauthorisedApi.get).toBe('function');
		expect(typeof unauthorisedApi.post).toBe('function');
	});
});
