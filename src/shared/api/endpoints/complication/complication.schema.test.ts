import { describe, it, expect } from 'vitest';
import { ComplicationOptionSchema, ComplicationWriteSchema } from './complication.schema';

describe('ComplicationOptionSchema', () => {
	it('validates a valid complication', () => {
		const result = ComplicationOptionSchema.safeParse({ id: '123e4567-e89b-42d3-a456-426614174010', name: "Кропив'янка" });
		expect(result.success).toBe(true);
	});

	it('rejects missing id', () => {
		expect(ComplicationOptionSchema.safeParse({ name: 'Test' }).success).toBe(false);
	});
});

describe('ComplicationWriteSchema', () => {
	it('validates write payload', () => {
		expect(ComplicationWriteSchema.safeParse({ name: 'Набряк' }).success).toBe(true);
	});
});
