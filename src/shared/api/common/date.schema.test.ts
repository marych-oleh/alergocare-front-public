import { describe, it, expect } from 'vitest';
import { DateSchemas } from './date.schema';
import { dayjs } from '../../lib/date/dayjs';

describe('DateSchemas.timestamp.read', () => {
	it('parses ISO string to dayjs', () => {
		const result = DateSchemas.timestamp.read.safeParse('2024-01-15T10:00:00.000Z');
		expect(result.success).toBe(true);
		if (result.success) {
			expect(dayjs.isDayjs(result.data)).toBe(true);
		}
	});
});

describe('DateSchemas.timestamp.write', () => {
	it('transforms dayjs to ISO string', () => {
		const d = dayjs('2024-01-15T10:00:00.000Z');
		const result = DateSchemas.timestamp.write.safeParse(d);
		expect(result.success).toBe(true);
	});

	it('rejects invalid input', () => {
		const result = DateSchemas.timestamp.write.safeParse('not-a-dayjs');
		expect(result.success).toBe(false);
	});
});

describe('DateSchemas.calendar.read', () => {
	it('parses date string to dayjs', () => {
		const result = DateSchemas.calendar.read.safeParse('1990-05-15');
		expect(result.success).toBe(true);
	});
});

describe('DateSchemas.calendar.write', () => {
	it('transforms dayjs to YYYY-MM-DD string', () => {
		const d = dayjs('1990-05-15');
		const result = DateSchemas.calendar.write.safeParse(d);
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data).toBe('1990-05-15');
		}
	});
});
