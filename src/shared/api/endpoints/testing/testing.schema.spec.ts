import { describe, expect, it } from 'vitest';
import {
	BaseTestingFields,
	TestingMethodSchema,
	TestingRowSchema,
	TestingTypeSchema,
} from './testing.schema';

const VALID_UUID = '123e4567-e89b-12d3-a456-426614174000';
const VALID_UUID_2 = '223e4567-e89b-12d3-a456-426614174001';
const VALID_DATETIME = '2025-03-15T10:00:00.000Z';

// ─── TestingTypeSchema ────────────────────────────────────────────────────────

describe('TestingTypeSchema', () => {
	it('приймає suspected', () => {
		expect(TestingTypeSchema.safeParse('suspected').success).toBe(true);
	});

	it('приймає alternative', () => {
		expect(TestingTypeSchema.safeParse('alternative').success).toBe(true);
	});

	it('відхиляє невідомий тип', () => {
		expect(TestingTypeSchema.safeParse('unknown').success).toBe(false);
	});

	it('відхиляє порожній рядок', () => {
		expect(TestingTypeSchema.safeParse('').success).toBe(false);
	});

	it('відхиляє число', () => {
		expect(TestingTypeSchema.safeParse(1).success).toBe(false);
	});
});

// ─── TestingMethodSchema ──────────────────────────────────────────────────────

describe('TestingMethodSchema', () => {
	it('приймає skin', () => {
		expect(TestingMethodSchema.safeParse('skin').success).toBe(true);
	});

	it('приймає challenge', () => {
		expect(TestingMethodSchema.safeParse('challenge').success).toBe(true);
	});

	it('відхиляє невідомий метод', () => {
		expect(TestingMethodSchema.safeParse('oral').success).toBe(false);
	});

	it('відхиляє null', () => {
		expect(TestingMethodSchema.safeParse(null).success).toBe(false);
	});
});

// ─── BaseTestingFields ────────────────────────────────────────────────────────

describe('BaseTestingFields', () => {
	const validBase = {
		caseId: VALID_UUID,
		type: 'suspected',
		method: 'skin',
		isPositive: false,
		finalStage: null,
	};

	it('валідує коректні базові поля', () => {
		expect(BaseTestingFields.safeParse(validBase).success).toBe(true);
	});

	it('приймає finalStage як число', () => {
		const result = BaseTestingFields.safeParse({
			...validBase,
			isPositive: true,
			finalStage: 3,
		});
		expect(result.success).toBe(true);
	});

	it('приймає finalStage = null', () => {
		const result = BaseTestingFields.safeParse({
			...validBase,
			finalStage: null,
		});
		expect(result.success).toBe(true);
	});

	it('відхиляє некоректний type', () => {
		const result = BaseTestingFields.safeParse({
			...validBase,
			type: 'primary',
		});
		expect(result.success).toBe(false);
	});

	it('відхиляє некоректний method', () => {
		const result = BaseTestingFields.safeParse({
			...validBase,
			method: 'iv',
		});
		expect(result.success).toBe(false);
	});

	it('відхиляє isPositive що не є boolean', () => {
		const result = BaseTestingFields.safeParse({
			...validBase,
			isPositive: 'true',
		});
		expect(result.success).toBe(false);
	});

	it('відхиляє некоректний caseId', () => {
		const result = BaseTestingFields.safeParse({
			...validBase,
			caseId: 'not-a-uuid',
		});
		expect(result.success).toBe(false);
	});
});

// ─── TestingRowSchema ─────────────────────────────────────────────────────────

describe('TestingRowSchema', () => {
	const validRow = {
		id: VALID_UUID,
		caseId: VALID_UUID,
		type: 'alternative',
		method: 'challenge',
		isPositive: true,
		finalStage: 2,
		drugId: VALID_UUID_2,
		testingDate: VALID_DATETIME,
		complications: [],
		createdAt: VALID_DATETIME,
		updatedAt: VALID_DATETIME,
	};

	it('валідує коректний рядок тестування', () => {
		expect(TestingRowSchema.safeParse(validRow).success).toBe(true);
	});

	it('валідує тестування без ускладнень', () => {
		const result = TestingRowSchema.safeParse({
			...validRow,
			complications: [],
		});
		expect(result.success).toBe(true);
	});

	it('відхиляє некоректний drugId', () => {
		const result = TestingRowSchema.safeParse({
			...validRow,
			drugId: 'bad-id',
		});
		expect(result.success).toBe(false);
	});

	it('відхиляє відсутній testingDate', () => {
		const { testingDate: _omit, ...without } = validRow;
		expect(TestingRowSchema.safeParse(without).success).toBe(false);
	});
});
