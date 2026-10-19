import { useMutation } from '@tanstack/react-query';
import { CurrentUserStore, signOut } from '~/shared/auth';
import { PATHS } from '~/shared/routes';

export const useLogoutMutation = () => {
	return useMutation({
		mutationFn: signOut,
		meta: { skipGlobalInvalidation: true },
		onSettled: () => {
			CurrentUserStore.clearSession();

			// Hard redirect instantly wipes the JS environment
			// and guarantees a completely fresh state.
			window.location.href = PATHS.login;
		},
	});
};
