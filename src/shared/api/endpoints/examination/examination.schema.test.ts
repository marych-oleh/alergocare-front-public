import { describe, it, expect } from 'vitest';
import { ExaminationOptionSchema, ExaminationWriteSchema } from './examination.schema';

describe('ExaminationOptionSchema', () => {
	it('validates a valid examination', () => {
		const result = ExaminationOptionSchema.safeParse({
			id: '123e4567-e89b-42d3-a456-426614174010',
			name: 'Аналіз крові',
			type: 'text',
		});
		expect(result.success).toBe(true);
	});

	it('validates with number type', () => {
		const result = ExaminationOptionSchema.safeParse({
			id: '123e4567-e89b-42d3-a456-426614174010',
			name: 'Test',
			type: 'number',
		});
		expect(result.success).toBe(true);
	});
});

describe('ExaminationWriteSchema', () => {
	it('validates write payload with type array', () => {
		const result = ExaminationWriteSchema.safeParse({ name: 'Аналіз крові', type: ['норма', 'патологія'] });
		expect(result.success).toBe(true);
	});

	it('rejects empty type array', () => {
		const result = ExaminationWriteSchema.safeParse({ name: 'Test', type: [] });
		expect(result.success).toBe(false);
	});
});
