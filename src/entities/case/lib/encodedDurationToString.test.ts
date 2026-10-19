import { describe, it, expect } from 'vitest';
import { encodedDurationToString } from './encodedDurationToString';
import { UNITS } from '../model/DurationUnits';

describe('encodedDurationToString', () => {
	it('returns "Не вказано" for null', () => {
		expect(encodedDurationToString(null)).toBe('Не вказано');
	});

	it('returns "Не вказано" for undefined', () => {
		expect(encodedDurationToString(undefined)).toBe('Не вказано');
	});

	it('returns "Не вказано" for 0', () => {
		expect(encodedDurationToString(0)).toBe('Не вказано');
	});

	it('formats exact weeks', () => {
		expect(encodedDurationToString(UNITS.WEEKS)).toBe('1 тиж.');
		expect(encodedDurationToString(UNITS.WEEKS * 2)).toBe('2 тиж.');
	});

	it('formats exact days (not divisible by weeks)', () => {
		expect(encodedDurationToString(UNITS.DAYS)).toBe('1 дн.');
		expect(encodedDurationToString(UNITS.DAYS * 3)).toBe('3 дн.');
	});

	it('formats exact hours (not divisible by days)', () => {
		expect(encodedDurationToString(UNITS.HOURS)).toBe('1 год.');
		expect(encodedDurationToString(UNITS.HOURS * 6)).toBe('6 год.');
	});

	it('formats minutes as fallback', () => {
		expect(encodedDurationToString(UNITS.MINUTES)).toBe('1 хв.');
		expect(encodedDurationToString(UNITS.MINUTES * 30)).toBe('30 хв.');
	});
});
