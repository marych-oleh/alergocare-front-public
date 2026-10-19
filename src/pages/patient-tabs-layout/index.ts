import { AppRouteHandle } from '~/shared/lib/router';
import { ROUTES } from '~/shared/routes';
import { Layout } from './ui/Layout';

export default Layout;

export { clientLoader } from './api/loader';

export const handle: AppRouteHandle = {
	title: 'Пацієнт',
	tabs: [
		{ label: 'До пацієнтів', path: '..' },
		{ label: 'Пацієнт', path: '.' },
		{ label: 'Звернення', path: ROUTES.PATIENT_CASES },
	],
};
