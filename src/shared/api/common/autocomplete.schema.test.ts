import { describe, it, expect } from 'vitest';
import { BaseOptionSchema, BaseOptionMutateSchema } from './autocomplete.schema';

describe('BaseOptionSchema', () => {
	it('validates a valid option', () => {
		const result = BaseOptionSchema.safeParse({ id: '123e4567-e89b-42d3-a456-426614174001', name: 'Test' });
		expect(result.success).toBe(true);
	});

	it('rejects empty name', () => {
		const result = BaseOptionSchema.safeParse({ id: '123e4567-e89b-42d3-a456-426614174001', name: '' });
		expect(result.success).toBe(false);
	});

	it('rejects missing id', () => {
		const result = BaseOptionSchema.safeParse({ name: 'Test' });
		expect(result.success).toBe(false);
	});
});

describe('BaseOptionMutateSchema', () => {
	it('validates a valid name', () => {
		expect(BaseOptionMutateSchema.safeParse({ name: 'Valid Name' }).success).toBe(true);
	});

	it('rejects too short name', () => {
		expect(BaseOptionMutateSchema.safeParse({ name: 'X' }).success).toBe(false);
	});

	it('rejects too long name', () => {
		expect(BaseOptionMutateSchema.safeParse({ name: 'A'.repeat(101) }).success).toBe(false);
	});
});
