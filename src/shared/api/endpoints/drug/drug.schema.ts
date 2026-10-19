import { z } from 'zod';
import { BaseOptionSchema } from '../../common/autocomplete.schema';

export const DrugCategoryOptionSchema = z.object({
	...BaseOptionSchema.shape,
	parentId: z.uuid().nullable(),
});

export const DrugCategoryTreeSchema = z.object({
	id: z.uuid(),
	name: z.string('Назва обовʼязкова').min(2),
	get children() {
		return z.array(DrugCategoryTreeSchema);
	},
});

export const DrugCategoryWriteSchema = DrugCategoryOptionSchema.pick({
	name: true,
	parentId: true,
});

export const DrugOptionSchema = z.object({
	...BaseOptionSchema.shape,
	categoryId: z.uuid('Оберіть категорію препарату'),
});

export const DrugWriteSchema = DrugOptionSchema.pick({
	name: true,
	categoryId: true,
});
