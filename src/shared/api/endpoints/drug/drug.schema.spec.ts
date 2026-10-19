import { describe, expect, it } from 'vitest';
import {
	DrugCategoryWriteSchema,
	DrugOptionSchema,
	DrugWriteSchema,
} from './drug.schema';

const VALID_UUID = '123e4567-e89b-12d3-a456-426614174000';
const VALID_UUID_2 = '223e4567-e89b-12d3-a456-426614174001';

// ─── DrugOptionSchema ─────────────────────────────────────────────────────────

describe('DrugOptionSchema', () => {
	const validDrug = {
		id: VALID_UUID,
		name: 'Амоксицилін',
		categoryId: VALID_UUID_2,
	};

	it('валідує коректний препарат', () => {
		expect(DrugOptionSchema.safeParse(validDrug).success).toBe(true);
	});

	it('відхиляє порожню назву', () => {
		const result = DrugOptionSchema.safeParse({ ...validDrug, name: '' });
		expect(result.success).toBe(false);
	});

	it('відхиляє некоректний categoryId', () => {
		const result = DrugOptionSchema.safeParse({
			...validDrug,
			categoryId: 'not-a-uuid',
		});
		expect(result.success).toBe(false);
	});

	it('відхиляє некоректний id', () => {
		const result = DrugOptionSchema.safeParse({ ...validDrug, id: '123' });
		expect(result.success).toBe(false);
	});

	it('відхиляє відсутній categoryId', () => {
		const { categoryId: _omit, ...without } = validDrug;
		expect(DrugOptionSchema.safeParse(without).success).toBe(false);
	});
});

// ─── DrugWriteSchema ──────────────────────────────────────────────────────────

describe('DrugWriteSchema', () => {
	const validWrite = {
		name: 'Ібупрофен',
		categoryId: VALID_UUID,
	};

	it('валідує коректні дані для запису', () => {
		expect(DrugWriteSchema.safeParse(validWrite).success).toBe(true);
	});

	it('відхиляє порожню назву', () => {
		const result = DrugWriteSchema.safeParse({ ...validWrite, name: '' });
		expect(result.success).toBe(false);
	});

	it('відхиляє некоректний categoryId', () => {
		const result = DrugWriteSchema.safeParse({
			...validWrite,
			categoryId: 'bad-uuid',
		});
		expect(result.success).toBe(false);
	});
});

// ─── DrugCategoryWriteSchema ──────────────────────────────────────────────────

describe('DrugCategoryWriteSchema', () => {
	it('валідує категорію без батьківської', () => {
		const result = DrugCategoryWriteSchema.safeParse({
			name: 'Антибіотики',
			parentId: null,
		});
		expect(result.success).toBe(true);
	});

	it('валідує категорію з батьківською', () => {
		const result = DrugCategoryWriteSchema.safeParse({
			name: 'Пеніциліни',
			parentId: VALID_UUID,
		});
		expect(result.success).toBe(true);
	});

	it('відхиляє порожню назву категорії', () => {
		const result = DrugCategoryWriteSchema.safeParse({
			name: '',
			parentId: null,
		});
		expect(result.success).toBe(false);
	});
});
