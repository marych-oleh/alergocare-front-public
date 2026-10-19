import { describe, it, expect } from 'vitest';
import { CasesFilterSchema, BaseCaseFields, MedicalDocumentSchema } from './cases.schema';
import { dayjs } from '~/shared/lib/date';

describe('BaseCaseFields', () => {
	it('validates correct case fields', () => {
		const result = BaseCaseFields.safeParse({
			patientId: '123e4567-e89b-42d3-a456-426614174001',
			symptomsTime: 0,
			drugTestBefore: false,
			needAllergyTesting: true,
		});
		expect(result.success).toBe(true);
	});

	it('rejects non-boolean drugTestBefore', () => {
		const result = BaseCaseFields.safeParse({
			patientId: '123e4567-e89b-42d3-a456-426614174001',
			symptomsTime: 0,
			drugTestBefore: 'yes',
			needAllergyTesting: true,
		});
		expect(result.success).toBe(false);
	});

	it('accepts null symptomsTime', () => {
		const result = BaseCaseFields.safeParse({
			patientId: '123e4567-e89b-42d3-a456-426614174001',
			symptomsTime: null,
			drugTestBefore: false,
			needAllergyTesting: false,
		});
		expect(result.success).toBe(true);
	});
});

describe('MedicalDocumentSchema', () => {
	it('accepts discharge_summary', () => {
		expect(MedicalDocumentSchema.safeParse('discharge_summary').success).toBe(true);
	});

	it('accepts emergency_report', () => {
		expect(MedicalDocumentSchema.safeParse('emergency_report').success).toBe(true);
	});

	it('rejects unknown document type', () => {
		expect(MedicalDocumentSchema.safeParse('unknown_type').success).toBe(false);
	});
});

describe('CasesFilterSchema', () => {
	it('accepts empty filter', () => {
		expect(CasesFilterSchema.safeParse({}).success).toBe(true);
	});

	it('accepts surname filter', () => {
		expect(CasesFilterSchema.safeParse({ patientSurname: 'Тест' }).success).toBe(true);
	});

	it('accepts birthday filter as dayjs', () => {
		const result = CasesFilterSchema.safeParse({ patientBirthday: dayjs('1990-01-01') });
		expect(result.success).toBe(true);
	});
});
