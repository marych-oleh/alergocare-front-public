import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import AppNavbar from './AppNavbar';
import Header from './Header';
import { Outlet } from 'react-router';
import BottomAppNavigation from './BottomAppNavigation';
import SideMenu from './sideMenu/SideMenu';

export function DashboardLayout() {
	return (
		<Box sx={{ display: 'flex' }}>
			<SideMenu />
			<AppNavbar />
			<Box
				component="main"
				sx={(theme) => ({
					flexGrow: 1,
					backgroundColor:
						theme.vars ?
							`rgba(${theme.vars.palette.background.defaultChannel} / 1)`
						:	alpha(theme.palette.background.default, 1),
					overflow: 'auto',
					mb: { xs: 7, md: '0px' },
				})}
			>
				<Stack
					spacing={{ xs: 0, md: 2 }}
					sx={{
						alignItems: 'center',
						pb: 1,
						px: { xs: 1, md: 2 },
						mr: { xs: 0, md: 0.3 },
						mt: { xs: 7.5, sm: 8, md: 0 },
					}}
				>
					<Header />
					<Box
						sx={{ width: '100%', maxWidth: { sm: '100%', md: '1820px' } }}
					>
						<Outlet />
					</Box>
				</Stack>
			</Box>
			<BottomAppNavigation />
		</Box>
	);
}
