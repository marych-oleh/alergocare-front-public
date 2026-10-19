import { describe, it, expect } from 'vitest';
import { ComorbidityOptionSchema, ComorbidityWriteSchema } from './comorbidity.schema';

describe('ComorbidityOptionSchema', () => {
	it('validates a valid comorbidity', () => {
		const result = ComorbidityOptionSchema.safeParse({
			id: '123e4567-e89b-42d3-a456-426614174010',
			name: 'Діабет',
		});
		expect(result.success).toBe(true);
	});
});

describe('ComorbidityWriteSchema', () => {
	it('validates write payload', () => {
		expect(ComorbidityWriteSchema.safeParse({ name: 'Гіпертонія' }).success).toBe(true);
	});
});
