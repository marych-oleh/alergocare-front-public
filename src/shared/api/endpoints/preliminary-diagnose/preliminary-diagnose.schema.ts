import { z } from 'zod';
import { BaseOptionSchema } from '../../common/autocomplete.schema';

export const PreliminaryDiagnoseOptionSchema = z.object({
	...BaseOptionSchema.shape,
});

export type PreliminaryDiagnoseOption = z.infer<typeof PreliminaryDiagnoseOptionSchema>;

export const PreliminaryDiagnoseWriteSchema = PreliminaryDiagnoseOptionSchema.pick({ name: true });

export type PreliminaryDiagnoseWriteFormValues = z.input<typeof PreliminaryDiagnoseWriteSchema>;
// for API check
export type PreliminaryDiagnoseWritePayload = z.output<typeof PreliminaryDiagnoseWriteSchema>;
