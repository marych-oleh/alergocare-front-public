import BarChartIcon from '@mui/icons-material/BarChart';
import CasesIcon from '@mui/icons-material/Cases';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { PATHS } from './consts';

export const mainListItems = [
	{
		text: 'Пацієнти',
		icon: <PeopleAltIcon />,
		to: PATHS.patients.root,
	},
	{
		text: 'Звернення',
		icon: <CasesIcon />,
		to: PATHS.cases.root,
	},
	{
		text: 'Статистика',
		icon: <BarChartIcon />,
		to: PATHS.statistics.root,
	},
];

// export const secondaryListItems = [
// 	{ text: 'Settings', icon: <SettingsRoundedIcon /> },
// 	{ text: 'About', icon: <InfoRoundedIcon /> },
// 	{ text: 'Feedback', icon: <HelpRoundedIcon /> },
// ];
