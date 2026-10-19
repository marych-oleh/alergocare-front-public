import { z } from 'zod';
import {
	PaginatedTestingsRequestSchema,
	PaginatedTestingsSchema,
	TestingDetailSchema,
	TestingMethodSchema,
	TestingRowSchema,
	TestingsFilterSchema,
	TestingTypeSchema,
	TestingWriteSchema,
} from './testing.schema';

export type TestingType = z.infer<typeof TestingTypeSchema>;
export type TestingMethod = z.infer<typeof TestingMethodSchema>;

// Complex Objects

// TABLE MODELS
export type TestingRow = z.infer<typeof TestingRowSchema>;
export type PaginatedTestings = z.infer<typeof PaginatedTestingsSchema>;

export type TestingFilterForm = z.input<typeof TestingsFilterSchema>;
export type TestingFilterPayload = z.output<typeof TestingsFilterSchema>;

export type PaginatedTestingsRequest = z.infer<
	typeof PaginatedTestingsRequestSchema
>;

export type TestingDetail = z.infer<typeof TestingDetailSchema>;

// For form resolver
export type TestingWriteFormValues = z.input<typeof TestingWriteSchema>;

// for API check
export type TestingWritePayload = z.output<typeof TestingWriteSchema>;
