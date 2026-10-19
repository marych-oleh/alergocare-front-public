import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';
import { NavLink, useLocation } from 'react-router';
import { mainListItems } from '~/shared/routes';

const AMOUNT_OF_MENU_ITEMS = 4;

export default function BottomAppNavigation() {
	const { pathname } = useLocation();
	const [value, setValue] = React.useState(pathname);
	React.useEffect(() => {
		setValue(pathname);
	}, [pathname]);

	const theme = useTheme();
	const isScreenGreaterMedium = useMediaQuery(theme.breakpoints.up('md'));

	if (isScreenGreaterMedium) {
		return null;
	}

	return (
		<Paper
			sx={{
				position: 'fixed',
				bottom: 0,
				left: 0,
				right: 0,
				display: { xs: 'auto', md: 'none' },
				boxShadow: 0,
				bgcolor: 'background.paper',
				backgroundImage: 'none',
				borderBottom: '1px solid',
				borderColor: 'divider',
			}}
			className="mui-fixed"
			elevation={3}
		>
			<BottomNavigation
				showLabels
				value={value}
				onChange={(event, newValue) => {
					setValue(newValue);
				}}
			>
				{mainListItems.slice(0, AMOUNT_OF_MENU_ITEMS).map((item) => (
					<BottomNavigationAction
						component={NavLink}
						key={item.to}
						value={item.to}
						label={item.text}
						{...item}
					/>
				))}
			</BottomNavigation>
		</Paper>
	);
}
