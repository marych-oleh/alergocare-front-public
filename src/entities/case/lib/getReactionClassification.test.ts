import { describe, it, expect } from 'vitest';
import { getReactionClassification } from './getReactionClassification';
import { UNITS } from '../model/DurationUnits';

describe('getReactionClassification', () => {
	it('returns null for null', () => {
		expect(getReactionClassification(null)).toBeNull();
	});

	it('returns null for undefined', () => {
		expect(getReactionClassification(undefined)).toBeNull();
	});

	it('returns null for 0', () => {
		expect(getReactionClassification(0)).toBeNull();
	});

	it('classifies minutes as immediate reaction', () => {
		const result = getReactionClassification(UNITS.MINUTES * 30);
		expect(result?.type).toBe('immediate');
		expect(result?.label).toBe('Негайна реакція');
	});

	it('classifies hours as immediate reaction', () => {
		const result = getReactionClassification(UNITS.HOURS * 6);
		expect(result?.type).toBe('immediate');
	});

	it('classifies exactly 23 hours as immediate (< 24h)', () => {
		const result = getReactionClassification(UNITS.HOURS * 23);
		expect(result?.type).toBe('immediate');
	});

	it('classifies exactly 1 day as delayed reaction', () => {
		const result = getReactionClassification(UNITS.DAYS);
		expect(result?.type).toBe('delayed');
		expect(result?.label).toBe('Сповільнена реакція');
	});

	it('classifies weeks as delayed reaction', () => {
		const result = getReactionClassification(UNITS.WEEKS * 2);
		expect(result?.type).toBe('delayed');
	});
});
