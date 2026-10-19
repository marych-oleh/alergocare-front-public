import { describe, it, expect } from 'vitest';
import { SymptomCategory } from './categories';

describe('SymptomCategory', () => {
	it('has RESPIRATORY category', () => {
		expect(SymptomCategory.RESPIRATORY).toBe('respiratory');
	});

	it('has DERMATOLOGICAL category', () => {
		expect(SymptomCategory.DERMATOLOGICAL).toBe('dermatological');
	});

	it('has GASTROINTESTINAL category', () => {
		expect(SymptomCategory.GASTROINTESTINAL).toBe('gastrointestinal');
	});

	it('has CARDIOVASCULAR category', () => {
		expect(SymptomCategory.CARDIOVASCULAR).toBe('cardiovascular');
	});

	it('has exactly 4 categories', () => {
		expect(Object.keys(SymptomCategory).length).toBe(4);
	});
});
