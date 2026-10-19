import { describe, it, expect } from 'vitest';
import { GENDER_LABEL, DISCOVERY_METHOD_LABEL } from './dictionaries';

describe('GENDER_LABEL', () => {
	it('has label for male', () => {
		expect(GENDER_LABEL.male).toBe('Чоловік');
	});

	it('has label for female', () => {
		expect(GENDER_LABEL.female).toBe('Жінка');
	});

	it('has exactly 2 entries', () => {
		expect(Object.keys(GENDER_LABEL).length).toBe(2);
	});
});

describe('DISCOVERY_METHOD_LABEL', () => {
	it('has label for self_discovered', () => {
		expect(DISCOVERY_METHOD_LABEL.self_discovered).toBe('Самостійно');
	});

	it('has label for every discovery method', () => {
		const keys = [
			'self_discovered',
			'social_media',
			'internet',
			'friends_recommendation',
			'dentist_referral',
			'doctor_referral',
		] as const;
		keys.forEach((key) => {
			expect(DISCOVERY_METHOD_LABEL[key]).toBeTruthy();
		});
	});

	it('has 6 entries', () => {
		expect(Object.keys(DISCOVERY_METHOD_LABEL).length).toBe(6);
	});
});
