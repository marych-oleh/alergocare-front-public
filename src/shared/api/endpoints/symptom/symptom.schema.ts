import { z } from 'zod';
import { SymptomCategory } from '~/shared/lib/symptom';
import { BaseOptionSchema } from '../../common/autocomplete.schema';

export const SymptomCategoryEnumSchema = z.enum(SymptomCategory);

export const SymptomOptionSchema = z.object({
	...BaseOptionSchema.shape,
	category: SymptomCategoryEnumSchema,
});

export type SymptomOption = z.infer<typeof SymptomOptionSchema>;

export const SymptomWriteSchema = SymptomOptionSchema.pick({
	name: true,
	category: true,
});

export type SymptomWriteFormValues = z.input<typeof SymptomWriteSchema>;
// for API check
export type SymptomWritePayload = z.output<typeof SymptomWriteSchema>;
