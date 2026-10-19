import { describe, it, expect } from 'vitest';
import { DrugOptionSchema, DrugWriteSchema, DrugCategoryOptionSchema, DrugCategoryWriteSchema } from './drug.schema';

describe('DrugOptionSchema', () => {
	it('validates valid drug option', () => {
		const result = DrugOptionSchema.safeParse({
			id: '123e4567-e89b-42d3-a456-426614174011',
			name: 'Амоксицилін',
			categoryId: '123e4567-e89b-42d3-a456-426614174012',
		});
		expect(result.success).toBe(true);
	});

	it('rejects missing categoryId', () => {
		const result = DrugOptionSchema.safeParse({
			id: '123e4567-e89b-42d3-a456-426614174011',
			name: 'Амоксицилін',
		});
		expect(result.success).toBe(false);
	});
});

describe('DrugWriteSchema', () => {
	it('validates valid write payload', () => {
		const result = DrugWriteSchema.safeParse({
			name: 'Новий препарат',
			categoryId: '123e4567-e89b-42d3-a456-426614174012',
		});
		expect(result.success).toBe(true);
	});
});

describe('DrugCategoryOptionSchema', () => {
	it('validates with null parentId', () => {
		const result = DrugCategoryOptionSchema.safeParse({
			id: '123e4567-e89b-42d3-a456-426614174012',
			name: 'Антибіотики',
			parentId: null,
		});
		expect(result.success).toBe(true);
	});

	it('validates with a parentId', () => {
		const result = DrugCategoryOptionSchema.safeParse({
			id: '123e4567-e89b-42d3-a456-426614174012',
			name: 'Beta-lactams',
			parentId: '123e4567-e89b-42d3-a456-426614174013',
		});
		expect(result.success).toBe(true);
	});
});

describe('DrugCategoryWriteSchema', () => {
	it('validates write payload', () => {
		const result = DrugCategoryWriteSchema.safeParse({
			name: 'Антибіотики',
			parentId: null,
		});
		expect(result.success).toBe(true);
	});
});
