import z from 'zod';
import {
	DrugCategoryOptionSchema,
	DrugCategoryTreeSchema,
	DrugOptionSchema,
	DrugWriteSchema,
} from './drug.schema';

// for form values
export type DrugCategoryWriteFormValues = z.input<typeof DrugWriteSchema>;
// for API check
export type DrugCategoryWritePayload = z.output<typeof DrugWriteSchema>;

export type DrugCategoryOption = z.infer<typeof DrugCategoryOptionSchema>;

export type DrugCategoryTreeNode = z.infer<typeof DrugCategoryTreeSchema>;

// for form values
export type DrugWriteFormValues = z.input<typeof DrugWriteSchema>;
// for API check
export type DrugWritePayload = z.output<typeof DrugWriteSchema>;

// for autocomplete
export type DrugOption = z.infer<typeof DrugOptionSchema>;
