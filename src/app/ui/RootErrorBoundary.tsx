import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import TimerOffIcon from '@mui/icons-material/TimerOff';
import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { isAxiosError } from 'axios';
import { isRouteErrorResponse, Link as RouterLink } from 'react-router';
import { isAppError } from '~/shared/api';
import { CurrentUserStore } from '~/shared/auth';
import { PATHS } from '~/shared/routes';

export function RootErrorBoundary({ error }: { error: unknown }) {
	const isLogged = CurrentUserStore.isLoggedIn;

	let message = 'Oops!';
	let details = 'Сталася непередбачена помилка.';
	let stack: string | undefined;

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? '404' : 'Помилка Маршрутизації';
		details =
			error.status === 404 ?
				'Запитувану сторінку не знайдено.'
			:	error.statusText || details;
	} else if (isAxiosError(error) && error.code === 'ERR_NETWORK') {
		message = "Немає зв'язку";
		details =
			"Неможливо з'єднатися з сервером. Перевірте підключення до інтернету.";
	} else if (isAppError(error)) {
		if (error.details?.errorCode === 'unauthorized') {
			return (
				<Container maxWidth="sm" sx={{ pt: 10, textAlign: 'center' }}>
					<TimerOffIcon
						sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }}
					/>
					<Typography variant="h4" component="h1" gutterBottom>
						Сеанс закінчився
					</Typography>
					<Typography variant="body1" color="text.secondary" paragraph>
						Термін дії вашого токена доступу минув або у вас немає дозволу
						на перегляд цієї сторінки.
					</Typography>
					<Button
						component={RouterLink}
						to={PATHS.login}
						replace
						variant="contained"
						size="large"
						sx={{ mt: 2 }}
					>
						Перейти до входу
					</Button>
				</Container>
			);
		}
		message = 'Помилка Сервера';
		details = error.message;
	} else if (import.meta.env.DEV && error instanceof Error) {
		details = error.message;
		stack = error.stack;
	}

	return (
		<Container maxWidth="md" sx={{ pt: 10 }}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					textAlign: 'center',
				}}
			>
				<ErrorOutlineIcon color="error" sx={{ fontSize: 64, mb: 2 }} />
				<Typography variant="h3" component="h1" gutterBottom>
					{message}
				</Typography>
				<Typography variant="h6" color="text.secondary" paragraph>
					{details}
				</Typography>
				{stack && (
					<Paper
						elevation={0}
						sx={{
							width: '100%',
							p: 2,
							mt: 3,
							mb: 3,
							bgcolor: 'white',
							overflowX: 'auto',
							textAlign: 'left',
						}}
					>
						<Typography component="pre" sx={{ m: 0, color: 'black' }}>
							<code>{stack}</code>
						</Typography>
					</Paper>
				)}
				<Button
					component={RouterLink}
					to={isLogged ? PATHS.dashboard.root : PATHS.login}
					replace
					variant="outlined"
					size="large"
					sx={{ mt: 4 }}
				>
					{isLogged ? 'Повернутись до панелі' : 'Перейти до входу'}
				</Button>
			</Box>
		</Container>
	);
}
