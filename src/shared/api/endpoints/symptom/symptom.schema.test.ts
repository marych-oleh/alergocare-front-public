import { describe, it, expect } from 'vitest';
import { SymptomOptionSchema, SymptomWriteSchema, SymptomCategoryEnumSchema } from './symptom.schema';

describe('SymptomCategoryEnumSchema', () => {
	it('accepts respiratory', () => {
		expect(SymptomCategoryEnumSchema.safeParse('respiratory').success).toBe(true);
	});

	it('rejects unknown category', () => {
		expect(SymptomCategoryEnumSchema.safeParse('unknown').success).toBe(false);
	});
});

describe('SymptomOptionSchema', () => {
	it('validates a valid symptom', () => {
		const result = SymptomOptionSchema.safeParse({
			id: '123e4567-e89b-42d3-a456-426614174010',
			name: 'Кашель',
			category: 'respiratory',
		});
		expect(result.success).toBe(true);
	});

	it('rejects missing category', () => {
		expect(SymptomOptionSchema.safeParse({ id: '123e4567-e89b-42d3-a456-426614174010', name: 'Test' }).success).toBe(false);
	});
});

describe('SymptomWriteSchema', () => {
	it('validates write payload', () => {
		expect(SymptomWriteSchema.safeParse({ name: 'Кашель', category: 'respiratory' }).success).toBe(true);
	});
});
