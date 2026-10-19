import { describe, it, expect } from 'vitest';
import { dateFormatters } from './formatters';
import { dayjs } from './dayjs';

describe('dateFormatters', () => {
	const isoDate = '2024-03-15T10:30:00.000Z';
	const dayjsDate = dayjs('2024-03-15T10:30:00.000Z');

	describe('toUiDate', () => {
		it('formats ISO string to display date', () => {
			const result = dateFormatters.toUiDate(isoDate);
			expect(result).toMatch(/15/);
			expect(result).toMatch(/03|берез/i);
			expect(result).toMatch(/2024/);
		});

		it('formats dayjs instance to display date', () => {
			const result = dateFormatters.toUiDate(dayjsDate);
			expect(result).toMatch(/15/);
			expect(result).toMatch(/2024/);
		});
	});

	describe('toUiDateTime', () => {
		it('formats ISO string to display date-time', () => {
			const result = dateFormatters.toUiDateTime(isoDate);
			expect(result).toMatch(/15/);
			expect(result).toMatch(/2024/);
		});

		it('formats dayjs instance to display date-time', () => {
			const result = dateFormatters.toUiDateTime(dayjsDate);
			expect(result).toMatch(/2024/);
		});
	});

	describe('toIso', () => {
		it('converts dayjs to ISO string', () => {
			const result = dateFormatters.toIso(dayjsDate);
			expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T/);
		});
	});
});
