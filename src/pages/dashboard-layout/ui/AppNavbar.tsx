import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';
import { useRouteMeta } from '~/shared/lib/router';
import MenuButton from '~/shared/ui/MenuButton/MenuButton';
import { HeaderTabs } from './HeaderTabs';
import SideMenuMobile from './sideMenu/SideMenuMobile';

export default function AppNavbar() {
	const { tabs, tabBasePath } = useRouteMeta();
	const [open, setOpen] = React.useState(false);

	const toggleDrawer = (newOpen: boolean) => () => {
		setOpen(newOpen);
	};

	const theme = useTheme();
	const isScreenGreaterMedium = useMediaQuery(theme.breakpoints.up('md'));

	if (isScreenGreaterMedium) {
		return null;
	}

	return (
		<AppBar
			position="fixed"
			sx={{
				display: { xs: 'auto', md: 'none' },
				boxShadow: 0,
				bgcolor: 'background.paper',
				backgroundImage: 'none',
				borderBottom: '1px solid',
				borderColor: 'divider',
				top: 'var(--template-frame-height, 0px)',
			}}
		>
			<Toolbar
				variant="regular"
				sx={{
					width: '100%',
					padding: '12px',
					flexShrink: 0,
				}}
			>
				<Stack
					direction="row"
					sx={{
						alignItems: 'center',
						justifyContent: 'space-between',
						width: '100%',
						gap: 1,
					}}
				>
					<Box sx={{ flex: '0 1 auto', minWidth: 0 }}>
						{tabs && tabs.length > 0 && (
							<HeaderTabs tabs={tabs} basePath={tabBasePath} />
						)}
					</Box>
					<Box sx={{ flex: '0 0 36px' }}>
						<MenuButton aria-label="menu" onClick={toggleDrawer(true)}>
							<MenuRoundedIcon />
						</MenuButton>
					</Box>

					<SideMenuMobile open={open} toggleDrawer={toggleDrawer} />
				</Stack>
			</Toolbar>
		</AppBar>
	);
}
