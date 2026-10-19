import { describe, expect, it } from 'vitest';
import {
	PatientDetailSchema,
	PatientTableSchema,
	discoveryMethodEnum,
	genderEnum,
} from './patients.schema';

const VALID_UUID = '123e4567-e89b-12d3-a456-426614174000';
const VALID_DATE = '1990-05-15';
const VALID_DATETIME = '2025-01-01T00:00:00.000Z';

// ─── genderEnum ──────────────────────────────────────────────────────────────

describe('genderEnum', () => {
	it('приймає male', () => {
		expect(genderEnum.safeParse('male').success).toBe(true);
	});

	it('приймає female', () => {
		expect(genderEnum.safeParse('female').success).toBe(true);
	});

	it('відхиляє невідоме значення статі', () => {
		expect(genderEnum.safeParse('other').success).toBe(false);
	});

	it('відхиляє порожній рядок', () => {
		expect(genderEnum.safeParse('').success).toBe(false);
	});

	it('відхиляє число', () => {
		expect(genderEnum.safeParse(1).success).toBe(false);
	});
});

// ─── discoveryMethodEnum ─────────────────────────────────────────────────────

describe('discoveryMethodEnum', () => {
	it('приймає refferal', () => {
		expect(discoveryMethodEnum.safeParse('refferal').success).toBe(true);
	});

	it('приймає self_discovered', () => {
		expect(discoveryMethodEnum.safeParse('self_discovered').success).toBe(true);
	});

	it('приймає screening', () => {
		expect(discoveryMethodEnum.safeParse('screening').success).toBe(true);
	});

	it('відхиляє невідомий метод', () => {
		expect(discoveryMethodEnum.safeParse('unknown').success).toBe(false);
	});

	it('відхиляє null', () => {
		expect(discoveryMethodEnum.safeParse(null).success).toBe(false);
	});
});

// ─── PatientTableSchema ───────────────────────────────────────────────────────

describe('PatientTableSchema', () => {
	const validPatient = {
		id: VALID_UUID,
		surname: 'Петренко',
		gender: 'male',
		countryCode: 'UA',
		districtCode: 'UA-46',
		birthday: VALID_DATE,
	};

	it('валідує коректного пацієнта', () => {
		expect(PatientTableSchema.safeParse(validPatient).success).toBe(true);
	});

	it('приймає districtCode = null', () => {
		const result = PatientTableSchema.safeParse({
			...validPatient,
			districtCode: null,
		});
		expect(result.success).toBe(true);
	});

	it('приймає відсутній districtCode', () => {
		const { districtCode: _omit, ...withoutDistrict } = validPatient;
		expect(PatientTableSchema.safeParse(withoutDistrict).success).toBe(true);
	});

	it('відхиляє некоректний gender', () => {
		const result = PatientTableSchema.safeParse({
			...validPatient,
			gender: 'unknown',
		});
		expect(result.success).toBe(false);
	});

	it('відхиляє прізвище коротше 2 символів', () => {
		const result = PatientTableSchema.safeParse({
			...validPatient,
			surname: 'П',
		});
		expect(result.success).toBe(false);
	});

	it('відхиляє id що не є UUID', () => {
		const result = PatientTableSchema.safeParse({
			...validPatient,
			id: 'not-a-uuid',
		});
		expect(result.success).toBe(false);
	});
});

// ─── PatientDetailSchema ──────────────────────────────────────────────────────

describe('PatientDetailSchema', () => {
	const validDetail = {
		id: VALID_UUID,
		surname: 'Коваленко',
		gender: 'female',
		countryCode: 'UA',
		districtCode: null,
		birthday: VALID_DATE,
		createdAt: VALID_DATETIME,
		updatedAt: VALID_DATETIME,
		discoveryMethod: 'screening',
	};

	it('валідує повний обʼєкт пацієнта', () => {
		expect(PatientDetailSchema.safeParse(validDetail).success).toBe(true);
	});

	it('відхиляє некоректний discoveryMethod', () => {
		const result = PatientDetailSchema.safeParse({
			...validDetail,
			discoveryMethod: 'direct',
		});
		expect(result.success).toBe(false);
	});

	it('відхиляє відсутній createdAt', () => {
		const { createdAt: _omit, ...without } = validDetail;
		expect(PatientDetailSchema.safeParse(without).success).toBe(false);
	});
});
