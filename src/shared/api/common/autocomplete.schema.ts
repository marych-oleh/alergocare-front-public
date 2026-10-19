import { z } from 'zod';

export const BaseOptionSchema = z.object({
	id: z.uuid(),
	name: z.string('Назва обовʼязкова').min(2),
});

export type BaseOption = z.infer<typeof BaseOptionSchema> & {
	id?: string;
	inputValue?: string;
};

export const BaseOptionMutateSchema = z.object({
	name: z.string().min(2).max(100),
});

export type BaseOptionMutate = z.infer<typeof BaseOptionMutateSchema>;
