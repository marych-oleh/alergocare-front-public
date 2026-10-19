import { redirect } from 'react-router';
import { PATHS } from '~/shared/routes';
import { Route } from '../../+types/root';

export function clientLoader({ request }: Route.ClientLoaderArgs) {
	const url = new URL(request.url);
	const isRootRoute = ['', '/'].includes(url.pathname);

	if (isRootRoute) {
		return redirect(PATHS.dashboard.root);
	} else {
		return null;
	}
}
