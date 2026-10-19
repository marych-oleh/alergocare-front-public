import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { setFormErrorsFromServer } from '~/shared/lib/errors';
import { EditableField } from '~/shared/ui/EditableField/EditableField';
import { RHFTextField } from '~/shared/ui/rhf/RHFTextField';
import { useLoginMutation } from '../api/mutation';
import { LoginRequest, LoginRequestSchema } from '../api/schema';

export const LoginForm = () => {
	const { handleSubmit, setError, control } = useForm<LoginRequest>({
		resolver: zodResolver(LoginRequestSchema),
	});
	const { mutate: login, isPending } = useLoginMutation();

	const onSubmit = (data: LoginRequest) => {
		login(data, {
			onError: (error) => setFormErrorsFromServer(error, setError),
		});
	};

	return (
		<Box
			component="form"
			onSubmit={handleSubmit(onSubmit)}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				width: '100%',
				gap: 2,
			}}
		>
			<EditableField
				control={control}
				required
				disableBackground
				name="username"
				label="Логін"
				renderEditMode={(field) => (
					<RHFTextField
						{...field}
						type="text"
						name="username"
						autoComplete="username"
						autoFocus
						variant="outlined"
					/>
				)}
			/>
			<EditableField
				control={control}
				required
				disableBackground
				name="password"
				label="Пароль"
				renderEditMode={(field) => (
					<RHFTextField
						{...field}
						placeholder="••••••"
						type="password"
						id="password"
						autoComplete="current-password"
						variant="outlined"
					/>
				)}
			/>

			<Button
				type="submit"
				fullWidth
				variant="contained"
				color="secondary"
				loading={isPending}
			>
				{isPending ? 'Вхід...' : 'Ввійти'}
			</Button>
		</Box>
	);
};
