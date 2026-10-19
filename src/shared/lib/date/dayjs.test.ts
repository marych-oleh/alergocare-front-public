import { describe, it, expect } from 'vitest';
import { dayjs } from './dayjs';

describe('dayjs', () => {
	it('parses a date string', () => {
		const d = dayjs('2024-01-15');
		expect(d.isValid()).toBe(true);
	});

	it('formats to ISO string', () => {
		const d = dayjs('2024-01-15T10:00:00.000Z');
		expect(d.toISOString()).toContain('2024-01-15');
	});

	it('returns current date', () => {
		const now = dayjs();
		expect(now.isValid()).toBe(true);
	});

	it('supports diff between dates', () => {
		const d1 = dayjs('2024-01-01');
		const d2 = dayjs('2024-01-31');
		expect(d2.diff(d1, 'day')).toBe(30);
	});

	it('supports isBefore / isAfter', () => {
		const d1 = dayjs('2024-01-01');
		const d2 = dayjs('2024-12-31');
		expect(d1.isBefore(d2)).toBe(true);
		expect(d2.isAfter(d1)).toBe(true);
	});
});
