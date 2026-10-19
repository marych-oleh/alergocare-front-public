import { z } from 'zod';
import { BaseOptionSchema } from '../../common/autocomplete.schema';

export const ComorbidityOptionSchema = z.object({
	...BaseOptionSchema.shape,
});

export type ComorbidityOption = z.infer<typeof ComorbidityOptionSchema>;

export const ComorbidityWriteSchema = ComorbidityOptionSchema.pick({
	name: true,
});

export type ComorbidityWriteFormValues = z.input<typeof ComorbidityWriteSchema>;
// for API check
export type ComorbidityWritePayload = z.output<typeof ComorbidityWriteSchema>;
