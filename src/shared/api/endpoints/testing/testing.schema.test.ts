import { describe, it, expect } from 'vitest';
import { TestingTypeSchema, TestingMethodSchema, TestingRowSchema } from './testing.schema';

describe('TestingTypeSchema', () => {
	it('accepts suspected', () => {
		expect(TestingTypeSchema.safeParse('suspected').success).toBe(true);
	});

	it('accepts alternative', () => {
		expect(TestingTypeSchema.safeParse('alternative').success).toBe(true);
	});

	it('rejects unknown type', () => {
		expect(TestingTypeSchema.safeParse('unknown').success).toBe(false);
	});
});

describe('TestingMethodSchema', () => {
	it('accepts skin', () => {
		expect(TestingMethodSchema.safeParse('skin').success).toBe(true);
	});

	it('accepts challenge', () => {
		expect(TestingMethodSchema.safeParse('challenge').success).toBe(true);
	});

	it('rejects unknown method', () => {
		expect(TestingMethodSchema.safeParse('other').success).toBe(false);
	});
});

describe('TestingRowSchema', () => {
	it('validates a full testing row', () => {
		const result = TestingRowSchema.safeParse({
			id: '123e4567-e89b-42d3-a456-426614174020',
			caseId: '123e4567-e89b-42d3-a456-426614174002',
			type: 'suspected',
			method: 'skin',
			isPositive: false,
			finalStage: null,
			drug: { id: '123e4567-e89b-42d3-a456-426614174011', name: 'Drug', categoryId: '123e4567-e89b-42d3-a456-426614174012' },
			testingDate: '2024-03-15T10:00:00.000Z',
			complications: [],
			createdAt: '2024-03-15T10:00:00.000Z',
			updatedAt: '2024-03-15T10:00:00.000Z',
		});
		expect(result.success).toBe(true);
	});
});
