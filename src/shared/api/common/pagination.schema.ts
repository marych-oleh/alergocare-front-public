import { z } from 'zod';

// Pagination Meta
export const PaginationResponseSchema = z.object({
	rowCount: z.number(),
});

// A factory function that creates a paginated schema
export function createPaginatedResponseSchema<ItemType extends z.ZodTypeAny>(
	itemSchema: ItemType
) {
	return z.object({
		items: z.array(itemSchema),
		...PaginationResponseSchema.shape,
	});
}

export type PaginationResponse = z.infer<typeof PaginationResponseSchema>;

export const FilterOperatorSchema = z.enum([
	'contains',
	'equals',
	'startsWith',
	'endsWith',
	'isEmpty',
	'isNotEmpty',
	'isAnyOf',
]);
export type FilterOperatorEnum = z.infer<typeof FilterOperatorSchema>;

export const createFilterItemSchema = <T extends z.ZodEnum>(fields: T) =>
	z.object({
		field: fields,
		operator: FilterOperatorSchema,
		value: z.string(),
	});

export const createSortItemSchema = <T extends z.ZodEnum>(fields: T) =>
	z.object({
		field: fields,
		order: z.enum(['asc', 'desc']).optional().default('asc'),
	});

export const createPaginatedRequestSchema = <T extends z.ZodEnum>(
	fields: T
) => {
	return z
		.object({
			page: z.number().min(1).default(1),
			pageSize: z.number().min(1).max(200).default(15),
			filters: z.array(createFilterItemSchema(fields)).optional(),
			sort: createSortItemSchema(fields).optional(),
		})
		.partial();
};

export type FilterItemDto<T extends z.ZodEnum> = z.infer<
	ReturnType<typeof createFilterItemSchema<T>>
>;
export type PaginatedRequest<T extends z.ZodEnum> = z.infer<
	ReturnType<typeof createPaginatedRequestSchema<T>>
>;
