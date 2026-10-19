import { describe, it, expect } from 'vitest';
import type { AppRouteHandle, HandleRouteTab } from './handle';

describe('AppRouteHandle', () => {
	it('accepts title only', () => {
		const handle: AppRouteHandle = { title: 'Пацієнти' };
		expect(handle.title).toBe('Пацієнти');
	});

	it('accepts tabs only', () => {
		const tabs: HandleRouteTab[] = [{ label: 'Деталі', path: '/details' }];
		const handle: AppRouteHandle = { tabs };
		expect(handle.tabs).toHaveLength(1);
	});

	it('accepts both title and tabs', () => {
		const handle: AppRouteHandle = {
			title: 'Test',
			tabs: [{ label: 'Tab', path: '/tab' }],
		};
		expect(handle.title).toBe('Test');
		expect(handle.tabs).toBeDefined();
	});

	it('accepts empty handle', () => {
		const handle: AppRouteHandle = {};
		expect(handle.title).toBeUndefined();
		expect(handle.tabs).toBeUndefined();
	});
});
