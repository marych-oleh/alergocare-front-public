import LogoutRoundedIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material';
import { useLogoutMutation } from '../../api/logout.mutation';

export const LogoutButton = () => {
	const { mutate: logout, isPending } = useLogoutMutation();

	return (
		<Button
			variant="outlined"
			color="error"
			onClick={() => logout()}
			fullWidth
			startIcon={<LogoutRoundedIcon />}
			loading={isPending}
		>
			{isPending ? 'Вихід...' : 'Вийти'}
		</Button>
	);
};
