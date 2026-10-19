import { AppRouteHandle } from '~/shared/lib/router';
import { ROUTES } from '~/shared/routes';
import { Layout } from './ui/Layout';

export default Layout;

export { clientLoader } from './api/loader';

export const handle: AppRouteHandle = {
	title: 'Звернення',
	tabs: [
		{ label: 'До звернень', path: '..' },
		{ label: 'Деталі', path: '.' },
		{ label: 'Пацієнт', path: ROUTES.CASE_PATIENT },
		{ label: 'Алерготестування', path: ROUTES.CASE_TESTINGS },
	],
};
