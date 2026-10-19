import { api } from '../api/api.instance';
import { CurrentUser } from './auth.model';
import { CurrentUserResponseSchema } from './auth.schema';

export const getMe = () =>
	api.get<CurrentUser>({
		url: 'users/me',
		schema: CurrentUserResponseSchema,
	});

export const signOut = () => api.post({ url: '/auth/sign-out' });
