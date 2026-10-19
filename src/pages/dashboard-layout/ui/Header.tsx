import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useRouteMeta } from '~/shared/lib/router';
import { HeaderTabs } from './HeaderTabs';

export default function Header() {
	const { tabs, tabBasePath } = useRouteMeta();

	const theme = useTheme();
	const isScreenGreaterMedium = useMediaQuery(theme.breakpoints.up('md'));

	if (!isScreenGreaterMedium) {
		return null;
	}

	return (
		<Stack
			direction="row"
			sx={{
				display: { xs: 'none', md: 'flex' },
				width: '100%',
				alignItems: 'center',
				justifyContent: 'space-between',
				maxWidth: { sm: '100%', md: '1820px' },
				pt: 1.5,
			}}
			spacing={1}
		>
			<Box sx={{ flex: '0 1 auto', minWidth: 0 }}>
				{tabs && tabs.length > 0 && (
					<HeaderTabs tabs={tabs} basePath={tabBasePath} />
				)}
			</Box>
		</Stack>
	);
}
