import { AppRouteHandle } from '~/shared/lib/router';
import { ROUTES } from '~/shared/routes';
import { CasesPage } from './ui/CasesPage';

export default CasesPage;

export const handle: AppRouteHandle = {
	title: 'Звернення',
	tabs: [
		{ label: 'Звернення', path: '.' },
		{ label: 'Створити', path: ROUTES.CASE_CREATE },
	],
};
