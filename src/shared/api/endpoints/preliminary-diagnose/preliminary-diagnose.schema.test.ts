import { describe, it, expect } from 'vitest';
import { PreliminaryDiagnoseOptionSchema, PreliminaryDiagnoseWriteSchema } from './preliminary-diagnose.schema';

describe('PreliminaryDiagnoseOptionSchema', () => {
	it('validates a valid option', () => {
		const result = PreliminaryDiagnoseOptionSchema.safeParse({
			id: '123e4567-e89b-42d3-a456-426614174010',
			name: 'Алергічний риніт',
		});
		expect(result.success).toBe(true);
	});
});

describe('PreliminaryDiagnoseWriteSchema', () => {
	it('validates write payload', () => {
		expect(PreliminaryDiagnoseWriteSchema.safeParse({ name: 'Алергія' }).success).toBe(true);
	});

	it('rejects empty name', () => {
		expect(PreliminaryDiagnoseWriteSchema.safeParse({ name: '' }).success).toBe(false);
	});
});
