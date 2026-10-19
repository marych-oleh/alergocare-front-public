import Typography, { TypographyProps } from '@mui/material/Typography';
import { useRouteMeta } from '~/shared/lib/router';

export default function AppTitle({ sx, ...props }: TypographyProps) {
	const { title } = useRouteMeta();

	return (
		<>
			<Typography
				variant="h4"
				component="h2"
				{...props}
				sx={{ color: 'text.primary', ...sx }}
			>
				{title ?? 'Alergocare'}
			</Typography>
			<title>{title ?? 'Alergocare'}</title>
		</>
	);
}
