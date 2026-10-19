import { describe, it, expect } from 'vitest';
import { PaginationResponseSchema, createPaginatedResponseSchema, createPaginatedRequestSchema } from './pagination.schema';
import { z } from 'zod';

describe('PaginationResponseSchema', () => {
	it('validates rowCount', () => {
		expect(PaginationResponseSchema.safeParse({ rowCount: 10 }).success).toBe(true);
	});

	it('rejects missing rowCount', () => {
		expect(PaginationResponseSchema.safeParse({}).success).toBe(false);
	});
});

describe('createPaginatedResponseSchema', () => {
	const ItemSchema = z.object({ id: z.string(), name: z.string() });
	const Schema = createPaginatedResponseSchema(ItemSchema);

	it('validates paginated result', () => {
		const result = Schema.safeParse({ items: [{ id: '1', name: 'test' }], rowCount: 1 });
		expect(result.success).toBe(true);
	});

	it('rejects missing items', () => {
		expect(Schema.safeParse({ rowCount: 0 }).success).toBe(false);
	});

	it('rejects invalid item shape', () => {
		expect(Schema.safeParse({ items: [{ id: '1' }], rowCount: 1 }).success).toBe(false);
	});
});

describe('createPaginatedRequestSchema', () => {
	const fields = z.enum(['name', 'date']);
	const Schema = createPaginatedRequestSchema(fields);

	it('accepts empty object', () => {
		expect(Schema.safeParse({}).success).toBe(true);
	});

	it('accepts page and pageSize', () => {
		expect(Schema.safeParse({ page: 1, pageSize: 10 }).success).toBe(true);
	});
});
