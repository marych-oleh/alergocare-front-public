import { Box, CircularProgress } from '@mui/material';

export default function Loader() {
	return (
		<Box
			sx={{
				width: '100%',
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<CircularProgress sx={{ width: '50%', height: '50%' }} />
		</Box>
	);
}
