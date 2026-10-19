import { z } from 'zod';

export const CurrentUserResponseSchema = z.object({
	id: z.uuid(),
	firstName: z.string(),
	lastName: z.string(),
	username: z.string(),
	createdAt: z.iso.datetime(),
	updatedAt: z.iso.datetime(),
});
