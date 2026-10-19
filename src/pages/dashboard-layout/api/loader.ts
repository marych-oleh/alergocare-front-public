import { redirect, ShouldRevalidateFunctionArgs } from 'react-router';
import { isUnAuthorizedError } from '~/shared/api';
import { authQueryKeys, CurrentUserStore, getMe } from '~/shared/auth';
import { queryClient } from '~/shared/queryClient';
import { PATHS } from '~/shared/routes';
import { Route } from '../+types';

export function shouldRevalidate(args: ShouldRevalidateFunctionArgs) {
	return false;
}

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
	if (CurrentUserStore.isInitialized) {
		if (!CurrentUserStore.isLoggedIn) return redirect(PATHS.login);
		return null;
	}

	try {
		const user = await queryClient.ensureQueryData({
			queryKey: authQueryKeys.session(),
			queryFn: getMe,
		});

		CurrentUserStore.setSession(user);

		return null;
	} catch (error) {
		if (isUnAuthorizedError(error)) {
			CurrentUserStore.clearSession();

			return redirect(PATHS.login);
		}
		throw error;
	}
}
