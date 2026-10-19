import { redirect } from 'react-router';
import { PATHS } from '~/shared/routes';

export function clientLoader() {
	return redirect(PATHS.patients.root);
}
