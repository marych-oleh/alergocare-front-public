import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { authQueryKeys, CurrentUserStore } from '~/shared/auth';
import { PATHS } from '~/shared/routes';
import { signIn } from './api';

export const useLoginMutation = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: signIn,
		onSuccess: (response) => {
			CurrentUserStore.setSession(response);
			queryClient.setQueryData(authQueryKeys.session(), response);

			navigate(PATHS.dashboard.root);
		},
	});
};
