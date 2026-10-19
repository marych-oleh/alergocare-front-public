import { z } from 'zod';
import {
	CaseDetailSchema,
	CasesFilterSchema,
	CaseTableSchema,
	CaseWriteSchema,
	PaginatedCasesRequestSchema,
	PaginatedCasesSchema,
} from './cases.schema';

// Complex Objects

// TABLE MODELS
export type CaseTable = z.infer<typeof CaseTableSchema>;
export type PaginatedCases = z.infer<typeof PaginatedCasesSchema>;

export type CaseFilterForm = z.input<typeof CasesFilterSchema>;
export type CaseFilterPayload = z.output<typeof CasesFilterSchema>;

export type PaginatedCasesRequest = z.infer<typeof PaginatedCasesRequestSchema>;

export type CaseDetail = z.infer<typeof CaseDetailSchema>;

// For form resolver
export type CaseWriteFormValues = z.input<typeof CaseWriteSchema>;

// for API check
export type CaseWritePayload = z.output<typeof CaseWriteSchema>;
