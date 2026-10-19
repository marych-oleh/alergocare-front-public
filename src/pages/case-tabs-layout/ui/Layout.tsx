import Box from '@mui/material/Box';
import { Outlet } from 'react-router';
import { Route } from '../+types';

export const Layout = ({ params }: Route.ComponentProps) => {
	return (
		<Box sx={{ my: { xs: 2, md: 0 } }}>
			<Outlet />
		</Box>
	);
};
