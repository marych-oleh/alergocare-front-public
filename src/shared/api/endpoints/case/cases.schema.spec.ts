import { describe, expect, it } from 'vitest';
import { BaseCaseFields, CaseWriteSchema } from './cases.schema';

const VALID_UUID = '123e4567-e89b-12d3-a456-426614174000';
const VALID_UUID_2 = '223e4567-e89b-12d3-a456-426614174001';
const VALID_UUID_3 = '323e4567-e89b-12d3-a456-426614174002';

// ─── BaseCaseFields ───────────────────────────────────────────────────────────

describe('BaseCaseFields', () => {
	const validBase = {
		patientId: VALID_UUID,
		symptomsTime: 10,
		drugTestBefore: false,
		needAllergyTesting: true,
	};

	it('валідує коректні базові поля', () => {
		expect(BaseCaseFields.safeParse(validBase).success).toBe(true);
	});

	it('приймає symptomsTime = 0', () => {
		const result = BaseCaseFields.safeParse({ ...validBase, symptomsTime: 0 });
		expect(result.success).toBe(true);
	});

	it('приймає symptomsTime = null', () => {
		const result = BaseCaseFields.safeParse({
			...validBase,
			symptomsTime: null,
		});
		expect(result.success).toBe(true);
	});

	it('відхиляє symptomsTime < 0', () => {
		const result = BaseCaseFields.safeParse({
			...validBase,
			symptomsTime: -1,
		});
		expect(result.success).toBe(false);
	});

	it('відхиляє некоректний patientId', () => {
		const result = BaseCaseFields.safeParse({
			...validBase,
			patientId: 'not-uuid',
		});
		expect(result.success).toBe(false);
	});

	it('відхиляє drugTestBefore що не є boolean', () => {
		const result = BaseCaseFields.safeParse({
			...validBase,
			drugTestBefore: 'yes',
		});
		expect(result.success).toBe(false);
	});

	it('відхиляє відсутній patientId', () => {
		const { patientId: _omit, ...without } = validBase;
		expect(BaseCaseFields.safeParse(without).success).toBe(false);
	});
});

// ─── CaseWriteSchema — трансформація ─────────────────────────────────────────

describe('CaseWriteSchema transform', () => {
	const allergyId = VALID_UUID;
	const comorbidityId = VALID_UUID_2;
	const diagnosisId = VALID_UUID_3;

	const baseWrite = {
		patientId: VALID_UUID,
		symptomsTime: 5,
		drugTestBefore: true,
		needAllergyTesting: false,
	};

	it('трансформує allergies у allergyIds', () => {
		const input = {
			...baseWrite,
			allergies: [{ id: allergyId, name: 'Пеніциліни' }],
		};
		const result = CaseWriteSchema.safeParse(input);
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.allergyIds).toEqual([allergyId]);
		}
	});

	it('трансформує preliminaryDiagnoses у preliminaryDiagnosisIds', () => {
		const input = {
			...baseWrite,
			preliminaryDiagnoses: [{ id: diagnosisId, name: 'Бета-лактами' }],
		};
		const result = CaseWriteSchema.safeParse(input);
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.preliminaryDiagnosisIds).toEqual([diagnosisId]);
		}
	});

	it('трансформує comorbidities у comorbidityIds', () => {
		const input = {
			...baseWrite,
			comorbidities: [{ id: comorbidityId, name: 'Астма' }],
		};
		const result = CaseWriteSchema.safeParse(input);
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.comorbidityIds).toEqual([comorbidityId]);
		}
	});

	it('валідує мінімальний кейс без опціональних полів', () => {
		expect(CaseWriteSchema.safeParse(baseWrite).success).toBe(true);
	});

	it('зберігає patientId після трансформації', () => {
		const result = CaseWriteSchema.safeParse(baseWrite);
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.patientId).toBe(VALID_UUID);
		}
	});
});
