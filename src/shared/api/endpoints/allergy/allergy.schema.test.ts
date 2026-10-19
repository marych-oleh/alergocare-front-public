import { describe, it, expect } from 'vitest';
import { AllergyOptionSchema, AllergyWriteSchema } from './allergy.schema';

describe('AllergyOptionSchema', () => {
	it('validates a valid allergy option', () => {
		const result = AllergyOptionSchema.safeParse({ id: '123e4567-e89b-42d3-a456-426614174010', name: 'Пеніцилін' });
		expect(result.success).toBe(true);
	});

	it('rejects missing name', () => {
		expect(AllergyOptionSchema.safeParse({ id: '123e4567-e89b-42d3-a456-426614174010' }).success).toBe(false);
	});
});

describe('AllergyWriteSchema', () => {
	it('validates write payload', () => {
		expect(AllergyWriteSchema.safeParse({ name: 'Пеніцилін' }).success).toBe(true);
	});

	it('rejects empty name', () => {
		expect(AllergyWriteSchema.safeParse({ name: '' }).success).toBe(false);
	});
});
