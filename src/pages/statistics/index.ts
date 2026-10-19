import AssessmentIcon from '@mui/icons-material/Assessment';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import GroupsIcon from '@mui/icons-material/Groups';
import MedicationIcon from '@mui/icons-material/Medication';
import ScienceIcon from '@mui/icons-material/Science';
import { AppRouteHandle } from '~/shared/lib/router';
import { ROUTES } from '~/shared/routes';
import { StatisticsPage } from './ui/StatisticsPage';

export default StatisticsPage;

export const handle: AppRouteHandle = {
	title: 'Статистика',
	tabs: [
		{ label: 'Загальне', path: '.', icon: AssessmentIcon },
		{
			label: 'Препарати',
			path: ROUTES.STATISTICS_DRUG_PREFIX,
			icon: MedicationIcon,
		},
		{
			label: 'Тестування',
			path: ROUTES.STATISTICS_TESTING_PREFIX,
			icon: ScienceIcon,
		},
		{
			label: 'Симптоми',
			path: ROUTES.STATISTICS_SYMPTOM_PREFIX,
			icon: CoronavirusIcon,
		},
		{
			label: 'Демографія',
			path: ROUTES.STATISTICS_DEMOGRAPHICS_PREFIX,
			icon: GroupsIcon,
		},
	],
};
