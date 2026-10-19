import { Tab, Tabs } from '@mui/material';
import Box from '@mui/material/Box';
import { NavLink, useLocation } from 'react-router';
import { HandleRouteTab } from '~/shared/lib/router';

interface Props {
	tabs: HandleRouteTab[];
	basePath: string;
}

export const HeaderTabs = ({ tabs, basePath }: Props) => {
	const { pathname } = useLocation();

	const getFullPath = (tabPath: string) => {
		if (tabPath === '.') return basePath;
		// Ensure we don't double slash
		return `${basePath.replace(/\/$/, '')}/${tabPath}`;
	};

	const activeIndex = tabs.findIndex(
		(tab) => pathname === getFullPath(tab.path)
	);

	return (
		<Tabs
			value={activeIndex !== -1 ? activeIndex : 0}
			variant="scrollable"
			scrollButtons={true}
			sx={{ borderBottom: 1, borderColor: 'divider', maxWidth: '100%' }}
		>
			{tabs.map((tab) => {
				let IconComponent = tab.icon;
				return (
					<Tab
						key={tab.path}
						component={NavLink}
						preventScrollReset
						to={getFullPath(tab.path)}
						icon={IconComponent ? <IconComponent /> : undefined}
						iconPosition="start"
						aria-label={tab.label}
						label={
							<Box
								component="span"
								sx={{
									display: {
										// Hide text on 'xs' if there is an icon
										xs: tab.icon ? 'none' : 'block',
										// Always show text on 'sm' and larger screens
										sm: 'block',
									},
									whiteSpace: 'nowrap',
								}}
							>
								{tab.label}
							</Box>
						}
						sx={{
							textTransform: 'none',
							fontWeight: 500,
							minWidth: { xs: tab.icon ? 50 : 70, sm: 'auto' },
							flexDirection: 'row',
							gap: 1,
							'&.Mui-selected': {
								color: 'primary.main',
							},
							color: 'text.secondary',
							'.MuiTab-icon': {
								mr: 0,
							},
						}}
					/>
				);
			})}
		</Tabs>
	);
};
