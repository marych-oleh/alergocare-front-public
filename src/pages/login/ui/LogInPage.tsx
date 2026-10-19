import { Card as MuiCard, Stack, styled, Typography } from '@mui/material';
import { ColorModeSelect } from '~/shared/ui/colorMode/ColorModeSelect';
import { LoginForm } from './LoginForm';

const Card = styled(MuiCard)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	alignSelf: 'center',
	width: '100%',
	padding: theme.spacing(4),
	gap: theme.spacing(2),
	margin: 'auto',
	[theme.breakpoints.up('sm')]: {
		maxWidth: '450px',
	},
	boxShadow:
		'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
	...theme.applyStyles('dark', {
		boxShadow:
			'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
	}),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
	minHeight: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
	padding: theme.spacing(2),
	[theme.breakpoints.up('sm')]: {
		padding: theme.spacing(4),
	},
}));

export function LogInPage() {
	return (
		<SignInContainer direction="column" justifyContent="space-between">
			<ColorModeSelect
				sx={{ position: 'fixed', top: '1rem', right: '1rem' }}
			/>
			<Card variant="outlined">
				<Typography
					component="h1"
					variant="h4"
					sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
				>
					Вхід
				</Typography>
				<LoginForm />
			</Card>
		</SignInContainer>
	);
}
