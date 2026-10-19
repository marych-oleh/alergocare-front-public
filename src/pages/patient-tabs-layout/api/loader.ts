import { redirect } from 'react-router';
import { toast } from 'sonner';
import { isAppError } from '~/shared/api';
import { queryClient } from '~/shared/queryClient';
import { PATHS } from '~/shared/routes';
import { Route } from '../+types';
import { prefetchPatient } from './queries';

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
	return prefetchPatient(queryClient, params.patientID).catch((err) => {
		if (isAppError(err)) {
			toast.error(err.message);
		} else {
			toast.error('Невідома помилка');
		}
		return redirect(PATHS.cases.root);
	});
}
