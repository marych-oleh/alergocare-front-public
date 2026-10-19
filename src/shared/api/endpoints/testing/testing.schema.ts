import { z } from 'zod';
import { DateSchemas } from '../../common/date.schema';
import {
	createPaginatedRequestSchema,
	createPaginatedResponseSchema,
} from '../../common/pagination.schema';
import { ComplicationOptionSchema } from '../complication';
import { DrugOptionSchema } from '../drug';

export const TestingTypeSchema = z.enum(['suspected', 'alternative']);
export const TestingMethodSchema = z.enum(['skin', 'challenge']);

// Complex Schemas ------------------
export const BaseTestingFields = z.object({
	caseId: z.uuid(),
	type: TestingTypeSchema,
	method: TestingMethodSchema,
	isPositive: z.boolean(),
	finalStage: z.number().nullable(),
});

// Table view testing
export const TestingRowSchema = z.object({
	id: z.uuid(),
	...BaseTestingFields.shape,
	drug: DrugOptionSchema,
	testingDate: DateSchemas.timestamp.read,
	complications: z.array(ComplicationOptionSchema),
	createdAt: DateSchemas.timestamp.read,
	updatedAt: DateSchemas.timestamp.read,
});

// TABLE SCHEMAS
// server response
export const PaginatedTestingsSchema =
	createPaginatedResponseSchema(TestingRowSchema);
// server request
export const TestingsFilterSchema = z.object({
	createdAt: DateSchemas.timestamp.write,
});
export const PaginatedTestingsRequestSchema = createPaginatedRequestSchema(
	TestingsFilterSchema.keyof()
);

// Full Testing info
export const TestingDetailSchema = z.object({
	id: z.uuid(),
	...BaseTestingFields.shape,
	drug: DrugOptionSchema,
	testingDate: DateSchemas.timestamp.read,
	complications: z.array(ComplicationOptionSchema),
	createdAt: DateSchemas.timestamp.read,
	updatedAt: DateSchemas.timestamp.read,
});

// FOR WRITE OPERATIONS (CREATE/EDIT)
export const TestingWriteSchema = z
	.object({
		caseId: z.uuid(),
		type: TestingTypeSchema,
		method: TestingMethodSchema,
		isPositive: z.boolean(),
		finalStage: z.coerce.number().nullable(),
		drug: DrugOptionSchema,
		testingDate: DateSchemas.timestamp.write,
		complications: z.array(ComplicationOptionSchema).optional(),
	})
	.transform((data) => ({
		// Direct fields
		caseId: data.caseId,
		drugId: data.drug.id,
		testingDate: data.testingDate,
		type: data.type,
		method: data.method,
		isPositive: data.isPositive,

		finalStage: data.isPositive ? data.finalStage : null,
		complicationIds:
			data.isPositive ? data.complications?.map((com) => com.id) : [],
	}));
