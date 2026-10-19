import { z } from 'zod';

export const LoginRequestSchema = z.object({
	username: z.string().min(1, "Логін обов'язковий"),
	password: z.string().min(8, 'Пароль має бути не менше 8 символів'),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;
