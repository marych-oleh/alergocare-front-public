import { z } from 'zod';
import { CurrentUserResponseSchema } from './auth.schema';

export type CurrentUser = z.infer<typeof CurrentUserResponseSchema>;
