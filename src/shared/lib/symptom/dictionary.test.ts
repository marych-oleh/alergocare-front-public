import { describe, it, expect } from 'vitest';
import {
	SYMPTOM_CATEGORY_LABELS,
	SYMPTOM_CATEGORY_OPTIONS,
	getLabelBySymptomCategory,
} from './dictionary';
import { SymptomCategory } from './categories';

describe('getLabelBySymptomCategory', () => {
	it('returns label for CARDIOVASCULAR', () => {
		expect(getLabelBySymptomCategory(SymptomCategory.CARDIOVASCULAR)).toBe(
			SYMPTOM_CATEGORY_LABELS[SymptomCategory.CARDIOVASCULAR]
		);
	});

	it('returns label for DERMATOLOGICAL', () => {
		expect(getLabelBySymptomCategory(SymptomCategory.DERMATOLOGICAL)).toBeTruthy();
	});

	it('returns label for GASTROINTESTINAL', () => {
		expect(getLabelBySymptomCategory(SymptomCategory.GASTROINTESTINAL)).toBeTruthy();
	});

	it('returns label for RESPIRATORY', () => {
		expect(getLabelBySymptomCategory(SymptomCategory.RESPIRATORY)).toBeTruthy();
	});
});

describe('SYMPTOM_CATEGORY_OPTIONS', () => {
	it('has an option for every SymptomCategory', () => {
		const codes = SYMPTOM_CATEGORY_OPTIONS.map((o) => o.code);
		Object.values(SymptomCategory).forEach((cat) => {
			expect(codes).toContain(cat);
		});
	});

	it('each option has code and label', () => {
		SYMPTOM_CATEGORY_OPTIONS.forEach((opt) => {
			expect(opt.code).toBeTruthy();
			expect(opt.label).toBeTruthy();
		});
	});

	it('has 4 options', () => {
		expect(SYMPTOM_CATEGORY_OPTIONS).toHaveLength(4);
	});
});
