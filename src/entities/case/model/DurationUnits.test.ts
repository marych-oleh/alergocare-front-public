import { describe, it, expect } from 'vitest';
import { UNITS, UNIT_LABELS } from './DurationUnits';

describe('UNITS', () => {
	it('MINUTES is 60 seconds', () => {
		expect(UNITS.MINUTES).toBe(60);
	});

	it('HOURS is 3600 seconds', () => {
		expect(UNITS.HOURS).toBe(3600);
	});

	it('DAYS is 86400 seconds', () => {
		expect(UNITS.DAYS).toBe(86400);
	});

	it('WEEKS is 604800 seconds', () => {
		expect(UNITS.WEEKS).toBe(604800);
	});
});

describe('UNIT_LABELS', () => {
	it('has labels for all units', () => {
		expect(UNIT_LABELS.MINUTES).toBeTruthy();
		expect(UNIT_LABELS.HOURS).toBeTruthy();
		expect(UNIT_LABELS.DAYS).toBeTruthy();
		expect(UNIT_LABELS.WEEKS).toBeTruthy();
	});
});
