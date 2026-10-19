import { unauthorisedApi } from '~/shared/api';
import { CurrentUser, CurrentUserResponseSchema } from '~/shared/auth';
import { LoginRequest } from './schema';

export const signIn = (data: LoginRequest) =>
	unauthorisedApi.post<CurrentUser>({
		url: '/auth/sign-in',
		data,
		schema: CurrentUserResponseSchema,
	});
