import { z } from 'zod';
import { BaseOptionSchema } from '../../common/autocomplete.schema';

export const AllergyOptionSchema = z.object({
	...BaseOptionSchema.shape,
});

export type AllergyOption = z.infer<typeof AllergyOptionSchema>;

export const AllergyWriteSchema = AllergyOptionSchema.pick({ name: true });

export type AllergyWriteFormValues = z.input<typeof AllergyWriteSchema>;
// for API check
export type AllergyWritePayload = z.output<typeof AllergyWriteSchema>;
