import { z } from 'zod';
import { BaseOptionSchema } from '../../common/autocomplete.schema';

export const ExaminationOptionSchema = z.object({
	...BaseOptionSchema.shape,
	type: z.string().or(z.literal('number')),
});

export type ExaminationOption = z.infer<typeof ExaminationOptionSchema>;

export const ExaminationWriteSchema = ExaminationOptionSchema.pick({
	name: true,
}).extend({
	type: z
		.array(
			z
				.string()
				.min(1, 'Значення не може бути порожнім')
				.max(100, 'Максимум 100 символів')
		)
		.min(1, 'Обовʼязково вкажіть тип або додайте варіанти'),
});

export type ExaminationWriteFormValues = z.input<typeof ExaminationWriteSchema>;
// for API check
export type ExaminationWritePayload = z.output<typeof ExaminationWriteSchema>;
