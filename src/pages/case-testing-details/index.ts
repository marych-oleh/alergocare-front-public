import { AppRouteHandle } from '~/shared/lib/router';
import { CaseTestingDetailsPage } from './ui/CaseTestingDetailsPage';

export default CaseTestingDetailsPage;

export const handle: AppRouteHandle = {
	tabs: [{ label: 'До алерготестувань', path: '..' }],
};
