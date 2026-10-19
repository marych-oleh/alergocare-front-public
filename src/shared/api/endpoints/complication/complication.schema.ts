import { z } from 'zod';
import { BaseOptionSchema } from '../../common/autocomplete.schema';

export const ComplicationOptionSchema = z.object({
	...BaseOptionSchema.shape,
});

export type ComplicationOption = z.infer<typeof ComplicationOptionSchema>;

export const ComplicationWriteSchema = ComplicationOptionSchema.pick({
	name: true,
});

export type ComplicationWriteFormValues = z.input<
	typeof ComplicationWriteSchema
>;
// for API check
export type ComplicationWritePayload = z.output<typeof ComplicationWriteSchema>;
