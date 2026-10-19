import Box from '@mui/material/Box';
import { Outlet } from 'react-router';

export const Layout = () => {
	return (
		<Box sx={{ my: { xs: 2, md: 0 } }}>
			<Outlet />
		</Box>
	);
};
